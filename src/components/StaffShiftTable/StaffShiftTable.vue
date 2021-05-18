<template>
  <div class="pa-5">
    <v-data-table
        :headers="headers"
        :items="shiftListData"
        :items-per-page="20"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>Current shifts</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <span>Accept your allocation</span>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-if="item['status']==='Waiting for approval'"
                class="mr-4"
                @click="handleAccept(item)"
                v-bind="attrs"
                v-on="on"
            >
              fa-check
            </v-icon>
          </template>
        </v-tooltip>
        <v-dialog
            v-model="dialog"
            width="500"
            v-if="item.status==='Waiting for approval'"
        >

          <template v-slot:activator="{ on:dialog, attrs }">
            <v-tooltip bottom>
              <span>Reject your allocation</span>
              <template v-slot:activator="{ on:tooltip }">
                <v-icon

                    v-bind="attrs"
                    v-on="{...tooltip,...dialog}"
                >
                  fa-times
                </v-icon>
              </template>
            </v-tooltip>
          </template>
          <v-card>
            <v-card-title class="headline  lighten-2">
              Please input reject reason
            </v-card-title>
            <div class="pa-5">
              <v-textarea outlined clearable label="Reason for rejection" v-model="reason"></v-textarea>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  text
                  @click="handleReject(item)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--          Personal emeracy-->
        <v-dialog
            v-model="dialog"
            width="500"
            v-if="item.status==='Allocated'"
        >

          <template v-slot:activator="{ on:dialog, attrs }">
            <v-tooltip bottom>
              <span>Cancel your allocation</span>
              <template v-slot:activator="{ on:tooltip }">
                <v-btn color="error">
                  <v-icon

                      v-bind="attrs"
                      v-on="{...tooltip,...dialog}"
                  >
                    fa-times
                  </v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </template>
          <v-card>
            <v-card-title class="headline  lighten-2">
              Please input cancel allocation reason
            </v-card-title>
            <div class="pa-5">
              <v-textarea outlined clearable label="Reason for cancel" v-model="reason"></v-textarea>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  text
                  @click="handleCancel(item)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.status="{ item }">
          <span class="red--text">{{ item.status }}
          </span>
      </template>
    </v-data-table>

    <v-data-table
        :headers="aheader"
        :items="shiftListData2"
        :items-per-page="20"
        class="elevation-1 mt-16"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>History shifts</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:item.status="{ item }">
          <span class="red--text">{{ item.status }}
          </span>
      </template>
    </v-data-table>
    <div id="myChart" :style="{width: '300px', height: '400px'}"></div>
  </div>
</template>

<script>
import {acceptAllocation, getShiftListByStaffId, rejectAllocation} from "@/api/shift";


import {ShiftListToTableData} from "@/utils/shift"
import {postMessage} from "@/api/message";
import {mapState} from "vuex";
import {generateAcceptHtml, generateCancelHtml, generateRejectHtml} from "@/utils/message";
import dialogMessage from "@/utils/dialogMessage";
import {getWorkload} from "@/api/staff";


const historyHeader = [
  {
    text: 'Title', value: 'title'
  },

  {
    text: 'Manager', value: 'managerName'
  },
  {
    text: 'Created time', value: 'createdTime'
  },
  {
    text: 'Start time', value: 'startTime'
  },
  {
    text: 'End time', value: 'endTime'
  },
  {
    text: 'Location', value: 'location'
  },
  {
    text: 'Description', value: 'description'
  },
  {
    text: 'Status', value: 'status'
  },
  {
    text: 'Created time', value: 'createdTime'
  },

]
const headers = [
  ...historyHeader,


  {text: 'Actions', value: 'actions', sortable: false},
]
export default {
  name: "StaffShiftTable",
  async mounted() {
    //load data
    getWorkload(this.id).then(r => {
      this.workload = r.data
      this.setupWorkloadPie()
    });
    getShiftListByStaffId(this.id).then((resp) => {
      const data = resp.data
      const historyData = []
      this.shiftListData = ShiftListToTableData(data.filter(i => i.statusStr === 'Waiting for approval' || i.statusStr === 'In progress' || i.statusStr === 'Allocated'))
      for (const datum of data) {
        if (datum.status !== "Allocated" && datum.status !== "In progress") {
          historyData.push(datum);
        }
        this.shiftListData2 = ShiftListToTableData(historyData)
      }
    })

  },
  computed: {
    ...mapState({
      id: state => state.user.id,
    }),
  },
  data() {
    return {
      reason: '',
      headers,
      dialog: false,
      workload: {
        workload: 0,
        workingLimit: 0,
      },
      aheader: historyHeader,
      shiftListData: [],
      shiftListData2: [],
    }
  },
  methods: {
    setupWorkloadPie() {
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      myChart.setOption({
        title: {
          text: "Workload situation"
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Workload',
            type: 'pie',
            radius: ['20%', '60%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center',

            },
            labelLine: {
              show: false
            },
            data: [
              {value: this.workload.workload, name: 'Current Workload'},
              {value: this.workload.workingLimit - this.workload.workload, name: 'Remaining Workload'},
            ]
          }
        ]
      });
    },
    handleAccept(item) {
      let failed = false
      console.log(item)
      this.$confirm({
        title: "Confirm Allocation",
        message: "Are you sure you want to accept this allocation?"
      }).then(async () => {
        const param = {
          id: item.id
        }
        await acceptAllocation(param).then(r => {
          console.log(r)
          this.$alert(dialogMessage.alert.success.AcceptAllocation)
          item.status = "Allocated"
        }).catch(r => {
          console.log(r)
          this.$alert(dialogMessage.alert.error.Common)
        })
        if (failed) {
          return
        }
        const param2 =
            {
              "senderId": item.staffId,
              "receiverId": item.managerId,
              "content": generateAcceptHtml(item),
              "type": 1,
              "senderRole": 0
            }
        await postMessage(param2).then(r => {
          console.log(r)
        }).catch(r => {
          console.log(r)
        })
      })


    },


    handleReject(item) {


      const param = {
        id: item.id,
        reason: this.reason
      }

      this.$confirm({
        title: "Reject Allocation",
        message: "Are you sure you want to reject the allocation?"
      }).then(() => {
        rejectAllocation(param).then(r => {
          console.log(r)
          const param = {
            "senderId": item.staffId,
            "receiverId": item.managerId,
            "content": generateRejectHtml(item, this.reason),
            "type": 2,
            "senderRole": 0
          }
          item.status = "Rejected"
          postMessage(param).then(r => {
            console.log(r)
          }).catch(r => {
            console.log(r)
          })
          this.dialog = false
        }).catch(r => {
          console.log(r)
          this.$alert(dialogMessage.alert.error.Common)
          this.dialog = false
        })
      })

    },
    handleCancel(item) {

      const param = {
        id: item.id,
        reason: this.reason
      }

      this.$confirm({
        title: "Cancel Allocation",
        message: "Are you sure you want to cancel this allocation?"
      }).then(() => {
        rejectAllocation(param).then(r => {
          console.log(r)
          const param = {
            "senderId": item.staffId,
            "receiverId": item.managerId,
            "content": generateCancelHtml(item, this.reason),
            "type": 3,
            "senderRole": 0
          }
          item.status = "Canceled"
          postMessage(param).then(r => {
            console.log(r)
          }).catch(r => {
            console.log(r)
          })
          this.dialog = false
        }).catch(r => {
          console.log(r)
          this.$alert(dialogMessage.alert.error.Common)
          this.dialog = false
        })
      })

    }
  }
}
</script>

<style scoped>

</style>