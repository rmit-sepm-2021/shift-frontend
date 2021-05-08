<template>
  <div>
    <div style="display:flex;justify-content:space-around;margin-top:200px">

      <el-card class="box-card" style="width:400px"
               :visible.sync="dialogVisible">
        <div slot="header" class="clearfix">
          <span>{{ name_ }}</span>

        </div>
        <div>
          <div>Email:
            <el-input v-model="email" :disabled="disabled"></el-input>
          </div>
          <div>Phone:
            <el-input v-model="phone" :disabled="disabled"></el-input>
          </div>

          <div>Working Limit:
            <el-input v-model="workingLimit" disabled></el-input>
          </div>
          <div>Address:
            <el-input v-model="address" :disabled="disabled"></el-input>
          </div>
          <div>Preferred name:
            <el-input v-model="preferredName" :disabled="disabled"></el-input>
          </div>
        </div>
        <div style="display:flex;justify-content:space-around;margin-top:10px">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showUpdateUserInformationOfView" v-if="!show">Edit Profile</el-button>
          <el-button @click="disshowUpdateUserInformationOfView" v-if="show">Cancel</el-button>
          <el-button type="primary" @click="updateUserInformationOfView" v-if="show">Update</el-button>
        </span>

        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import {getStaffInfo, updateStaffInfo} from "@/api/staff"

export default {
  name: "profile",
  data() {
    return {
      show: false,

      disabled: true,

      user: null,
      // user2:null,
      name_: "",
      email: "",
      phone: "",
      workingLimit: 0,
      address: "",
      dialogVisible: false,
      preferredName: ""
    }
  },
  mounted() {
    this.initUser();
  },
  computed: {
    ...mapState({
      id: state => state.user.id,
    }),
  },
  methods: {
    updateUserInformationOfView() {
      console.log(this.id);
      const param = {
        name: this.name,
        id: this.id,
        email: this.email,
        phone: this.phone,
        workingLimit: this.workingLimit,
        address: this.address,
        preferredName: this.preferredName
      }
      //hide button
      this.show = !this.show;
      this.disabled = true;

      updateStaffInfo(param).then(resp => {
        console.log(resp);
        if (resp) {
          this.dialogVisible = false;
          // this.initUser();
        }
      })
    },
    showUpdateUserInformationOfView() {
      // this.dialogVisible=true;
      this.disabled = false;
      this.show = !this.show;

    },
    disshowUpdateUserInformationOfView() {
      this.dialogVisible = false;
      this.disabled = true;
      this.show = !this.show;

    },
    initUser() {
      getStaffInfo(this.id).then(resp => {
        const data = resp.data;

        if (data) {
          this.name_ = data.name;
          this.email = data.email;
          this.phone = data.phone;
          this.workingLimit = data.workingLimit;
          this.address = data.address;
          // this.user = resp;
          this.data = Object.assign({}, this.data);
          this.preferredName = data.preferredName
        }

      })
    }
  }
}


</script>

<style>
</style>