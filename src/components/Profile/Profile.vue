<template>
  <div>
    <div style="display:flex;justify-content:space-around;margin-top:100px">
      <el-card class="box-card" style="width:400px">
        <div slot="header" class="clearfix">
          <span>{{name_}}</span>

        </div>
        <div>
          <div>email:<el-tag>{{email}}</el-tag></div>
          <div>phone:<el-tag>{{phone}}</el-tag></div>
   
          <div>workingLimit:<el-tag>{{workingLimit}}</el-tag></div>
          <div>address:<el-tag>{{address}}</el-tag></div>
        </div>
        <div style="display:flex;justify-content:space-around;margin-top:10px">
        <el-button type="primary" @click="showUpdateUserInformationOfView">change information</el-button>
        </div>
      </el-card>
      <!-- <el-dialog
        title="info"
        :visible.sync="dialogVisible"
        width="70%"> -->
        <el-card class="box-card" style="width:400px"
        :visible.sync="dialogVisible">
        <div slot="header" class="clearfix">
          <span>{{name_}}</span>

        </div>
        <div>
          <div>email:<el-input v-model="email" :disabled="disabled"></el-input></div>
          <div>phone:<el-input v-model="phone" :disabled="disabled"></el-input></div>
   
          <div>workingLimit:<el-input v-model="workingLimit" :disabled="disabled"></el-input></div>
          <div>address:<el-input v-model="address" :disabled="disabled"></el-input></div>
        </div>
        <div style="display:flex;justify-content:space-around;margin-top:10px">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showUpdateUserInformationOfView">change information</el-button>
          <el-button @click="dialogVisible = false">cancle</el-button>
          <el-button type="primary" @click="updateUserInformationOfView">update</el-button>
        </span>
        
        </div>
        
      </el-card>
       <!-- <div>
         <table>
           <tr>
             <td>name:</td>
             <td><el-input v-model="name_"></el-input></td>
           </tr>
           <tr>
             <td>email:</td>
             <td><el-input v-model="email"></el-input></td>
           </tr>
           <tr>
             <td>phone:</td>
             <td><el-input v-model="phone"></el-input></td>
           </tr>
        
           <tr>
             <td>workingLimit:</td>
             <td><el-input v-model="workingLimit" ></el-input></td>
           </tr>
           <tr>
             <td>address:</td>
             <td><el-input v-model="address" ></el-input></td>
           </tr>
         </table>

       </div> -->
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">cancle</el-button>
          <el-button type="primary" @click="updateUserInformationOfView">update</el-button>
        </span> -->
      <!-- </el-dialog> -->
    </div>
  </div>
</template>

<script>
import {mapState} from  "vuex"
import {getStaffInfo} from "@/api/login"
import {updateStaffInfo} from "@/api/login"

  export default{
    name:"profile",
    data() {
      return{
        disabled:true,
    
        user: null,
        // user2:null,
        name_:"",
        email:"",
        phone:"",
        workingLimit:0,
        address:"",
        dialogVisible:false
      }
    },
    mounted(){
      this.initUser();
    },
    computed: {
      ...mapState({
        id: state => state.user.id,
        // name_: state => state.user.name,
        // email: state => state.user.email,
        // phone: state => state.user.phone,
        // workingLimit: state => state.user.workingLimit,
        // address: state => state.user.address,
      }),
    },
    methods: {
      updateUserInformationOfView(){
        console.log(this.email);
        const param ={
          name_:this.name,
          id:this.id,
          email:this.email,
          phone:this.phone,
          workingLimit:this.workingLimit,
          address:this.address,
        }
     
        updateStaffInfo(param).then(resp =>{
          console.log(resp);

          if(resp){
            this.dialogVisible=false;
            // this.initUser();
          }
        })
      },
      showUpdateUserInformationOfView(){
        // this.dialogVisible=true;
        this.disabled=false;
      },
      initUser(){
        getStaffInfo(this.id).then(resp =>{
          const data=resp.data;
          
          if(data){
            this.name_=data.name;
            this.email=data.email;
            this.phone=data.phone;
            this.workingLimit=data.workingLimit;
            this.address=data.address;
            // this.user = resp;
            this.data=Object.assign({},this.data);
            
          }
         
        })
      }
    }
  }


</script>

<style>
</style>