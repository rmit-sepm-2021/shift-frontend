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
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-sheet>
  </div>

</template>

<script>
import {deleteShift, getShiftList} from "@/api/shift";
import CreateShift from "@/components/CreateShiftDialog/CreateShiftDialog";

// import {firstWordUpperCase} from "@/utils/str";
import {ShiftListToTableData} from "@/utils/shift"



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
  components: {CreateShift},
  async mounted() {
    //load data
    getShiftList().then((resp) => {
      const data = resp.data
      this.shiftListData = ShiftListToTableData(data)
    })

  },
  data() {
    return {
      headers,
      shiftListData: [],
    }
  },
  methods: {
    deleteItem(item) {
      console.log(item)
      console.log(this.shiftListData.indexOf(item))
      if (!confirm("Are you sure you want to delete this shift?")) {
        return
      }
      deleteShift(item.id).then(() => {
        alert("Deleted Successfully")
        window.location.reload()
      }).catch(() => {
        alert("Something wrong")
      })
    },
  }
}
</script>

<style scoped>

</style>