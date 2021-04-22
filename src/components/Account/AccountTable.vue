<template>
  <div>
    <v-sheet tile class="d-flex">

      <NewAccountDialog></NewAccountDialog>
    </v-sheet>

    <v-sheet>
      <v-data-table
          :headers="headers"
          :items="accounts"
          :items-per-page="20"
          class="elevation-1"
      ></v-data-table>
    </v-sheet>
  </div>

</template>

<script>
import {getAllManager, getAllStaff} from '@/api/user'
import NewAccountDialog from './NewAccountDialog'
let moment = require('moment')
const headers = [
  {
    text: 'Role', value: 'role'
  },
  {
    text: 'Name', value: 'name'
  },
  {
    text: 'Email', value: 'email'
  },
  {
    text: 'Created time', value: 'createdTime'
  },
  {
    text: 'Address', value: 'address'
  },
  {
    text: 'Working limit', value: 'workingLimit'
  },
]
export default {
  name: "AccountTable",
  components: {NewAccountDialog},
  async mounted() {
    //load data
    let accounts = []
    await getAllManager().then((res) => {
      const data = res.data
      const labels = ['phone', 'name', 'email', 'createdTime']
      for (const manager of data) {
        let obj = {}
        for (const key of labels) {
          obj[key] = manager[key]
        }
        obj['role'] = "Manager"
        obj['_id'] = obj['id']
        accounts.push(obj)
      }
    })
    await getAllStaff().then((res) => {
      const data = res.data
      const labels = ['phone', 'name', 'email', 'createdTime', 'address', 'workingLimit']
      for (const staff of data) {
        let obj = {}
        for (const key of labels) {
          obj[key] = staff[key]
        }
        obj['role'] = 'Staff'
        obj['_id'] = obj['id']
        accounts.push(obj)
      }
      for (const account of accounts) {
        if (account['createdTime']) {
          account['createdTime'] = moment(account['createdTime']).format("MMMM D YYYY")
        }

      }
      this.accounts = accounts
    })

  },
  data() {
    return {
      headers,
      accounts: [],
    }
  },
}
</script>

<style scoped>

</style>