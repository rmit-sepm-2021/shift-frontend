<template>
  <div>
    <v-sheet tile class="d-flex">
      <v-btn>Add a new shift</v-btn>
    </v-sheet>
    <v-sheet>
      <v-data-table
          :headers="headers"
          :items="shiftListData"
          :items-per-page="20"
          class="elevation-1"
      ></v-data-table>
    </v-sheet>
  </div>

</template>

<script>
import {getShiftList} from "@/api/shift";

// import {firstWordUpperCase} from "@/utils/str";

let moment = require('moment')

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
]

export default {
  name: "ShiftTable",
  components: {},
  async mounted() {
    //load data
    getShiftList().then((resp) => {
      const data = resp.data
      for (const datum of data) {
        datum['createdTime'] = moment(datum['createdTime']).format("YYYY-MM-DD")

        datum['startTime'] = moment(datum['startTime']).format("YYYY-MM-DD HH:mm")
        datum['endTime'] = moment(datum['endTime']).format("YYYY-MM-DD HH:mm")
      }
      this.shiftListData = data
    })

  },
  data() {
    return {
      headers,
      shiftListData: [],
    }
  },
}
</script>

<style scoped>

</style>