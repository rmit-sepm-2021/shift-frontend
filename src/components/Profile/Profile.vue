<template>
  <div>
    <div style="display:flex;justify-content:space-around;margin-top:100px">
      <el-card class="box-card" style="width:400px">
        <div slot="header" class="clearfix">
          <span>name1</span>
        </div>
        <div>
          <div>email:<el-tag></el-tag></div>
          <div>tel:<el-tag></el-tag></div>
          <div>preferredName:<el-tag></el-tag></div>
          <div>address<el-tag></el-tag></div>
        </div>
        <div style="display:flex;justify-content:space-around;margin-top:10px">
        <el-button type="primary" @click="showUpdateUserInformationOfView">change information</el-button>
        </div>
      </el-card>
      <el-dialog
        title="info"
        :visible.sync="dialogVisible"
        width="70%">
       <div>
         <table>
           <tr>
             <td>name:</td>
             <td><el-input ></el-input></td>
           </tr>
           <tr>
             <td>email:</td>
             <td><el-input ></el-input></td>
           </tr>
           <tr>
             <td>tel:</td>
             <td><el-input ></el-input></td>
           </tr>
           <tr>
             <td>preferredName:</td>
             <td><el-input ></el-input></td>
           </tr>
           <tr>
             <td>address:</td>
             <td><el-input ></el-input></td>
           </tr>
         </table>

       </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">cancle</el-button>
          <el-button type="primary" @click="updateUserInformationOfView">update</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

// import {getUserInfo} from "@/api/login.js"

  export default{
    name:"profile",
    data() {
      return{
        user: null,
        user2:null,
        dialogVisible:false
      }
    },
    mounted(){
      this.initUser();
    },
    methods: {
      updateUserInformationOfView(){
        this.getUserInfo('/staff',this.user2).then(resp =>{
          if(resp){
            this.dialogVisible=false;
            this.initUser();
          }
        })
      },
      showUpdateUserInformationOfView(){
        this.dialogVisible=true;
      },
      initUser(){
        this.getUserInfo('/staff').then(resp =>{
          if(resp){
            this.user = resp;
            this.user=Object.assign({},this.user)
          }
        })
      }
    }
  }


</script>

<style>
</style>