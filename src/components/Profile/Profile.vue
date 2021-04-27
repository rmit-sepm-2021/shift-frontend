<template>
  <div>
   
   
    <!-- <div style="display:flex;justify-content:space-around;margin-top:200px">

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
    </div> -->
  <div style="display:flex;justify-content:space-around;margin-top:200px">
     <el-card class="box-card" style="width:400px">
       <div slot="header" class="clearfix">
         <span>{{ name_ }}</span>
       </div>
       <div>
         
         <div>email:
           <el-tag>{{ email }}</el-tag>
         </div>
         <div>phone:
           <el-tag>{{ phone }}</el-tag>
         </div>

         <div>workingLimit:
           <el-tag>{{ workingLimit }}</el-tag>
         </div>
         <div>address:
           <el-tag>{{ address }}</el-tag>
         </div>
         <div>PreferredName:
           <el-tag>{{ preferredName }}</el-tag>
         </div>
       </div>
       <div style="display:flex;justify-content:space-around;margin-top:10px">
         <el-button type="primary" @click="showUpdateUserInformationOfView">change information</el-button>
       </div>
     </el-card>
  </div>
      <el-dialog
        title="info"
        :visible.sync="dialogVisible"
        width="70%">
      
      <div>
        <table>
          <tr>
            <td>name:</td>
            <td><el-input v-model="name_2"></el-input></td>
          </tr>
          <tr>
            <td>email:</td>
            <td><el-input v-model="email2"></el-input></td>
          </tr>
          <tr>
            <td>phone:</td>
            <td><el-input v-model="phone2"></el-input></td>
          </tr>
          <tr>
            <td>PreferredName:</td>
            <td><el-input v-model="preferredName2" ></el-input></td>
          </tr>
          <tr>
            <td>address:</td>
            <td><el-input v-model="address2" ></el-input></td>
          </tr>
        </table>

      </div> 
      <span slot="footer" class="dialog-footer">
        <el-button @click="disshowUpdateUserInformationOfView">cancle</el-button>
        <el-button type="primary" @click="updateUserInformationOfView">update</el-button>
      </span> 
      </el-dialog>
      
  
  </div>
</template>

<script>
import {mapState} from "vuex"
import {getStaffInfo, updateStaffInfo} from "@/api/staff"

export default {
  name: "profile",
  data() {
    return {
      // show: false,

      // disabled: true,

      // user: null,
      // user2:null,
      name_: "",
      email: "",
      phone: "",
      workingLimit: 0,
      address: "",
      dialogVisible: false,
      preferredName: "",
      name_2: "",
      email2: "",
      phone2: "",
      preferredName2: "",
      address2: "",
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
        name: this.name_2,
        id: this.id,
        email: this.email2,
        phone: this.phone2,
        address: this.address2,
        preferredName: this.preferredName2
      }
      //hide button
      // this.show = !this.show;
      // this.disabled = true;
      alert("Update successful!");

      updateStaffInfo(param).then(resp => {
        console.log(resp);
        if (resp) {
          this.dialogVisible = false;
          this.initUser();
        }
      })
    },
    showUpdateUserInformationOfView() {
      this.dialogVisible=true;
      // this.disabled = false;
      // this.show = !this.show;

    },
    disshowUpdateUserInformationOfView() {
      this.dialogVisible = false;
      // this.disabled = true;
      // this.show = !this.show;
      this.name_2=this.name_;
      this.email2 = this.email;
      this.phone2 = this.phone;
      this.preferredName2 = this.preferredName;
      this.address2 = this.address;
      

    },
    initUser() {
      getStaffInfo(this.id).then(resp => {
        const data = resp.data;

        if (data) {
          this.name_ = data.name;
          this.email = data.email;
          this.phone = data.phone;
          this.workingLimit = data.workingLimit;
          this.preferredName = data.preferredName;
          this.address = data.address;
          // this.user = resp;
          this.data = Object.assign({}, this.data);
          
          this.name_2=this.name_;
          this.email2 = this.email;
          this.phone2 = this.phone;
          this.preferredName2 = this.preferredName;
          this.address2 = this.address;
        }

      })
    }
  }
}


</script>

<style>
</style>