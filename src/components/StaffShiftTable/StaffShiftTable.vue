<template>
  <div class="pa-5">
    <v-sheet tile class="d-flex ">

    </v-sheet>
    <v-sheet>
      <p>Current Shifts</p>
      <v-data-table
          :headers="headers"
          :items="shiftListData"
          :items-per-page="20"
          class="elevation-1"
      >
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
              v-if="item.status!=='Rejected'"
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
        </template>
        <template v-slot:item.status="{ item }">
          <span class="red--text">{{ item.status }}
          </span>
        </template>
      </v-data-table>
    </v-sheet>
    <p>History Shifts</p>
    <v-data-table
        :headers="aheader"
        :items="shiftListData2"
        :items-per-page="20"
        class="elevation-1"
    >

      <template v-slot:item.status="{ item }">
          <span class="red--text">{{ item.status }}
          </span>
      </template>
    </v-data-table>
  </div>

</template>

<script>
import {acceptAllocation, getShiftListByStaffId, rejectAllocation} from "@/api/shift";


import {ShiftListToTableData} from "@/utils/shift"
import {postMessage} from "@/api/message";
import {mapState} from "vuex";
import {generateAcceptHtml, generateRejectHtml} from "@/utils/message";
import dialogMessage from "@/utils/dialogMessage";

const headers = [
  {
    text: 'Title', value: 'title'
  },

  {
    text: 'Manager', value: 'managerName'
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
  {text: 'Actions', value: 'actions', sortable: false},
]

const aheader = [
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

]
export default {
  name: "StaffShiftTable",
  async mounted() {
    //load data

    getShiftListByStaffId(this.id).then((resp) => {
      const data = resp.data
      const historyData = []
      this.shiftListData = ShiftListToTableData(data.filter(i=>i.statusStr==='Waiting for approval'||i.statusStr==='In progress'||i.statusStr==='Allocated'))
      for (const datum of data) {
        if (datum.status !== "Allocated" && datum.status !== "In progress"&& datum.status !== "Waiting for approval") {
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
      aheader,
      shiftListData: [],
      shiftListData2: [],
    }
  },
  methods: {
    async handleAccept(item) {
      let failed = false
      console.log(item)
      if (!confirm("Are you sure you want to accept the allocation?")) {
        return
      }
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


    },


    handleReject(item) {


      const param = {
        id: item.id,
        reason: this.reason
      }
      console.log({param})
      if (!confirm("Are you sure you want to submit the reason to rejection")) {
        return
      }
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
    }
  }
}
</script>

<style scoped>

</style>