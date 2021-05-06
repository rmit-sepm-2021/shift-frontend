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
       <!-- id="draw-border" -->
       <div  style="display:flex;justify-content:space-around;margin-top:10px">
         <el-button type="primary" @click="showUpdateUserInformationOfView">change information</el-button>
         <!-- <button class="btn one" type="primary" @click="showUpdateUserInformationOfView">change information</button> -->
         <el-button type="danger" @click="showUpdatePasswordOfView">change password</el-button>
       </div>
     </el-card>
  </div>
      <el-dialog
        title="info"
        :visible.sync="dialogVisible"
        width="40%"
        style="top:50px;left:200px">
      
      <div>
        <table >
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
      <el-dialog
        title="change password"
        :visible.sync="passwordDialogVisible"
        width="40%"
        style="top:50px;left:200px">
        <div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="230px" class="demo-ruleForm">
            <el-form-item label="Please enter your password" prop="oldPass">
              <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Please enter your new password" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Please confirm the new password" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">submit</el-button>
              <el-button @click="resetForm('ruleForm')">reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      
  
  </div>
</template>

<script>
import {mapState} from "vuex"
import {getStaffInfo, updateStaffInfo} from "@/api/staff"
// import {updateStaffPass} from "@/api/staff"
export default {
  name: "profile",
  data() {
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        } else if (value !== this.password) {
          callback(new Error('Password input error!'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your new password'));
        } else if (value == this.password) {
          callback(new Error('The new password is the same as the original password!'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password agian'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Inconsistent passwords entered twice!'));
        } else {
          callback();
        }
      };

    return {
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
      passwordDialogVisible:false,
      

      ruleForm: {
          pass: '',
          checkPass: '',
          oldPass:'',
          
        },
      rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: validatePass1, trigger: 'blur' }
          ]
        }
      };

        
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
    submitForm() {
      const param ={
        // ruleForm:this.ruleForm,
        password:this.ruleForm.pass
      }
      console.log(param);
      updateStaffInfo(param).then(resp => {
        console.log(resp);
        if (resp) {
          this.passwordDialogVisible = false;
          this.initUser();
        }
        // else {
        //      console.log('error submit!!');
        //      this.dialogVisible = false;
        //      return false;
        //   }
      })
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     this.ruleForm.staffId = this.user.id;
        //    updateStaffPass(param).then (resp=>{
        //      if(resp){
        //        this.dialogVisible = false;
        //        this.initUser();
        //      }
        //    })
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    showUpdatePasswordOfView(){
      this.passwordDialogVisible = true

    },
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
          this.password=data.password;
         
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
/* #neon-btn{
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background-color: black;
} */
.btn{
  border:1px solid;
  background-color: transparent;
  text-transform: uppercase;
  font-size: 14px;
  padding: 10px 20px;
  font-weight: 300;
}
.one{
  color:#569ff8;
}
.btn:hover{
  color: white;
  border: 0;
}
.one:hover{
  background-color: #569ff8;
  /* -webkit-box-shadow: 10px 10px 99px 6px rgba(86,159,248,1);
  -moz-box-shadow: 10px 10px 99px 6px rgba(86,159,248,1);
  box-shadow: 10px 10px 99px 6px rgba(86,159,248,1); */
}

button {
  border: 0;
  background-color: none;
  text-transform: uppercase;
  color: rgb(120, 128, 148);
  font-weight: bold;
  position: relative;
  outline: none;
  padding: 10px 20px;
  box-sizing: border-box;
}
button::before,button::after{
  box-sizing: inherit;
  position: absolute;
  content: '';
  border: 2px solid transparent;
  width: 0;
  height: 0;
}
button::after{
  bottom: 0;
  right: 0;
}
button::before{
  top:0;
  left: 0;
}
button:hover::before,button:hover::after{
  width: 100%;
  height: 100%;
}
button:hover::before{
  border-top-color: rgb(120,128,148);
  border-right-color: rgb(120, 128, 148);
  transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
}
button:hover::after{
  border-bottom-color: rgb(120, 128, 148);
  border-left-color: rgb(120, 128, 148);
  transition:border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
}

</style>
