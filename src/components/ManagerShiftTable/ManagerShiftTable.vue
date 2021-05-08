<template>
  <div class="pa-5">
    <v-sheet tile class="d-flex">
      <CreateShift btn-color="primary"></CreateShift>
    </v-sheet>
    <v-sheet>
      <v-data-table
          :headers="headers"
          :items="shiftListData"
          :items-per-page="20"
          class="elevation-1"
      >
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

  </div>

</template>

<script>
import {deleteShift, getShiftList} from "@/api/shift";
import CreateShift from "@/components/CreateShiftDialog/CreateShiftDialog";


import {ShiftListToTableData} from "@/utils/shift"
import AllocateShiftDialog from "@/components/AllocateShiftDialog/AllocateShiftDialog";

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
    getShiftList().then((resp) => {
      const data = resp.data
      this.rawData = data
      this.shiftListData = ShiftListToTableData(data)
    })

  },
  data() {
    return {
      headers,
      shiftListData: [],
      dialog: false,
      rawData: [],
    }
  },
  methods: {
    deleteItem(item) {
      this.$confirm({
        title: "Delete Shift?",
        message: "Are you sure you want to delete this shift?"
      }).then(() => {
        deleteShift(item.id).then(() => {
          this.$alert("Deleted Successfully")
          window.location.reload()
        }).catch(() => {
          this.$alert("Something wrong")
        })
      }).catch(() => {
      })
    },

  }
}
</script>

<style scoped>

</style>