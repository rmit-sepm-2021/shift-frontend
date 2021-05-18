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
          <v-tooltip bottom>
            <span>Deactivate this account</span>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  small
                  class="mr-5"
                  @click="deactivate(item)"
                  v-bind="attrs"
                  v-on="on"
              >
                fa-user-minus
              </v-icon>
            </template>
          </v-tooltip>
          <v-tooltip bottom>
            <span>Update user's working limit</span>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  v-if="item['role']==='Staff'"
                  small
                  @click="changeWorkingLimitAction(item)"
                  v-bind="attrs"
                  v-on="on"
              >
                fa-pencil-alt
              </v-icon>
            </template>
          </v-tooltip>


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
import {deactivateUser, getAllManager, getAllStaff} from '@/api/user'
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
  {
    text: 'Status', value: 'status'
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
      const labels = ['phone', 'name', 'email', 'createdTime', 'status']
      for (const manager of data) {
        let obj = {}
        for (const key of labels) {
          obj[key] = manager[key]
        }
        obj['role'] = "Manager"
        obj['status'] = obj['status'] === 1 ? 'Active' : 'Inactive'
        obj['_id'] = manager['id']
        accounts.push(obj)
      }
    })
    await getAllStaff().then((res) => {
      const data = res.data
      const labels = ['phone', 'name', 'email', 'createdTime', 'address', 'workingLimit', 'status']
      for (const staff of data) {
        let obj = {}
        for (const key of labels) {
          obj[key] = staff[key]
        }
        obj['role'] = 'Staff'
        console.log(obj['status'])
        obj['status'] = obj['status'] === 1 ? 'Active' : 'Inactive'
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
      this.$confirm({
        title: "Update Working Limit",
        message: "Are you sure you want to change working limit?"
      }).then(() => {
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

      })

    },
    deactivate(item) {
      const param = {
        id: item['_id'],
        role: item.role === 'Staff' ? 0 : 1
      }
      this.$confirm({
        title: "Deactivate user?",
        message: "Are you sure you want to deactivate the account?"

      }).then(() => deactivateUser(param)).then(() => {
        item['status'] = 'Inactive'
        this.$alert("The account has been deactivate.")
      })

    },
  },
  computed: {}
}
</script>

<style scoped>

</style>