<template>
  <div class="pa-5">
    <v-sheet tile class="d-flex ">

      <NewAccountDialog></NewAccountDialog>
    </v-sheet>

    <v-sheet>
      <v-data-table
          :headers="headers"
          :items="accounts"
          :items-per-page="20"
          class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
              v-if="item['role']==='Staff'"
              small
              @click="changeWorkingLimitAction(item)"
          >
            fa-pencil-alt
          </v-icon>
        </template>
      </v-data-table>
    </v-sheet>
    <el-dialog :title="form.title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="New working limit (hours)">
          <el-input v-model="form.workingLimit" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="changeWorkingLimit">Save</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {getAllManager, getAllStaff} from '@/api/user'
import {updateWorkingLimit} from '@/api/staff'
import NewAccountDialog from './NewAccountDialog'
import dialogMessage from "@/utils/dialogMessage";

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
  {text: 'Actions', value: 'actions', sortable: false},
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
        obj['_id'] = manager['id']
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
        obj['_id'] = staff['id']

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
      accounts: [], dialogFormVisible: false,
      form: {workingLimit: 40, title: ""}
    }
  },
  methods: {
    changeWorkingLimitAction(item) {
      //item
      this.dialogFormVisible = true
      this.form.id = item['_id']
      this.form.title = `Change ${item['name']}'s working limit`
      this.form.workingLimit = item['workingLimit']
    },
    changeWorkingLimit() {
      if (!confirm("Are you sure you want to change working limit?")) {
        return
      }
      const param = {staffId: this.form.id, workingLimit: this.form.workingLimit}
      if (this.form.workingLimit > 120) {
        this.$alert(dialogMessage.alert.error.LargeWorkingLimit)
        return;
      }
      updateWorkingLimit(param).then((resp) => {
        if (resp.code !== 200) {
          this.$alert(dialogMessage.alert.error.UpdateWorkingLimit)
          return
        }
        this.$alert(dialogMessage.alert.success.ChangeWorkingLimit)

        for (const item of this.accounts) {
          if (item['_id'] === this.form.id && item['role'] === 'Staff') {
            item['workingLimit'] = this.form.workingLimit
            break
          }
        }
        this.dialogFormVisible = false
        // window.location.reload()
      }).catch(() => {
        this.$alert(dialogMessage.alert.error.Common)
      })

    }
  },
  computed: {}
}
</script>

<style scoped>

</style>