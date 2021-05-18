<template>
  <div class="pa-5">
    <v-sheet tile class="d-flex">

    </v-sheet>
    <v-sheet>
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
            <v-toolbar-title>Shifts</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <CreateShift btn-color="primary"></CreateShift>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-toolbar-items class="d-flex justify-center">
            <template v-if="item.status==='Not allocated'">
              <v-tooltip bottom>
                <span>Allocate this shift</span>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                      class="mr-1"
                      v-bind="attrs"
                      v-on="on"
                      @click="dialog=true"
                  >
                    fa-calendar-plus
                  </v-icon>
                  <AllocateShiftDialog v-model="dialog" :shift-id="item.id" :shift="item"></AllocateShiftDialog>
                </template>
              </v-tooltip>
              <v-divider
                  vertical
                  class="ma-2"
              ></v-divider>
            </template>
            <v-tooltip bottom>
              <span>Delete this shift</span>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteItem(item)"
                >
                  fa-trash
                </v-icon>
              </template>
            </v-tooltip>
          </v-toolbar-items>

        </template>
      </v-data-table>
    </v-sheet>
    <div id="main" :style="{width: '300px', height: '350px'}"></div>
  </div>

</template>

<script>
import {deleteShift, getShiftList} from "@/api/shift";
import CreateShift from "@/components/CreateShiftDialog/CreateShiftDialog";
import {getAllStaff} from "@/api/user"
import {ShiftListToTableData} from "@/utils/shift"
import AllocateShiftDialog from "@/components/AllocateShiftDialog/AllocateShiftDialog";
import dialogMessage from "@/utils/dialogMessage";
import {getWorkload} from "@/api/staff";

const headers = [
  {
    text: 'Title', value: 'title'
  },
  {
    text: 'Staff', value: 'staffName'
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
  {text: 'Actions', value: 'actions', sortable: false},
]

export default {
  name: "ManagerShiftTable",
  components: {CreateShift, AllocateShiftDialog},
  async mounted() {


    //load data
    let staffIdList = []
    // let allWorkload = 0
    // let allWorkLimit = 0
    await getShiftList().then((resp) => {
      const data = resp.data
      this.rawData = data
      for (const datum of data) {
        staffIdList.push(datum['staffId'])
      }
      this.shiftListData = ShiftListToTableData(data)
    })
    await getAllStaff().then(res => {
      const data = res.data
      return data
    }).then(data => {
      for (const datum of data) {
        getWorkload(datum['id']).then(res => {
          const data = res.data
          this.workload.workload += data['workload']
          this.workload.workingLimit += data['workingLimit']
          let myChart = this.$echarts.init(document.getElementById('main'));
          myChart.setOption({
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
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },

                labelLine: {
                  show: false
                },
                data: [
                  {value: this.workload.workload, name: 'Current All Staff Workload'},
                  {value: this.workload.workingLimit, name: 'Remaining All Staff Workload'},
                ]
              }
            ]
          });

        })
      }
    })


  },
  data() {
    return {
      headers,
      shiftListData: [],
      dialog: false,
      rawData: [],
      workload: {
        workload: 0,
        workingLimit: 0,
      }
    }
  },
  methods: {
    deleteItem(item) {
      this.$confirm({
        title: "Delete Shift?",
        message: "Are you sure you want to delete this shift?"
      }).then(() => {
        deleteShift(item.id).then(() => {
          this.$alert(dialogMessage.alert.success.DeleteShift)
          window.location.reload()
        }).catch(() => {
          this.$alert(dialogMessage.alert.error.Common)
        })
      }).catch(() => {
      })
    },

  }
}
</script>

<style scoped>

</style>