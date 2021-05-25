<template>

  <v-card
      max-width="888"
      class="mx-auto mt-16"
  >
    <v-list two-line>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text--secondary text-uppercase text-caption">Name</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-if="!update" v-text="info.name"/>
            <v-text-field v-else
                          v-model="form.name"
                          required
                          :rules="rules.required"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text--secondary text-uppercase text-caption">Email</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-if="!update" v-text="info.email"/>
            <v-text-field v-else
                          :rules="rules.email"
                          v-model="form.email"
                          required

            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text--secondary text-uppercase text-caption">Phone</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-if="!update" v-text="info.phone"/>
            <v-text-field v-else
                          v-model="form.phone"
                          required
                          :rules="rules.required"
            />
          </v-list-item-content>
        </v-list-item>
        <template v-if="role==='STAFF'">
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text--secondary text-uppercase text-caption">Working limit</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="info.workingLimit"/>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text--secondary text-uppercase text-caption">Address</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-if="!update" v-text="info.address"/>
              <v-text-field v-else
                            v-model="form.address"
                            required
                            :rules="rules.required"
              />
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text--secondary text-uppercase text-caption">Preferred Name</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-if="!update" v-text="info.preferredName"/>
              <v-text-field v-else
                            v-model="form.preferredName"
                            required
                            :rules="rules.required"
              />
            </v-list-item-content>
          </v-list-item>
        </template>



      </v-form>
    </v-list>

  </v-card>


</template>

<script>
import {mapState} from "vuex"
import {getStaffInfo, updateStaffInfo} from "@/api/staff"
import {getManagerInfo, updateManagerInfo} from "@/api/manager"

const passwordHint = "Passwords should be exactly 8 characters, including upper and lower case letters, digits and at least one special character \n" +
    "out of !, $, *, &, +, ?"
export default {
  name: "profile",
  data() {
    return {
      labelPosition: 'right',
      update: false,
      dialog: false,
      info: {
        name: "",
        email: "",
        phone: "",
        workingLimit: 0,
        address: "",
        preferredName: "",
        password: "",
      },
      form: {
        name: "",
        email: "",
        phone: "",
        address: "",
        preferredName: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      valid: true,
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        required: [value => !!value || 'Required.'],
        password: [
          v => !!v || 'Password is required',
          v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$*&+?])[A-Za-z\d!$*&+?]{8,}$/.test(v) || 'Password must be valid. ' + passwordHint,
        ],
      }
    };


  },
  mounted() {
    this.initUser();
  },
  computed: {
    ...mapState({
      id: state => state.user.id,
      role: state => state.user.role,
    }),
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    submitNewPassword() {
      if (this.form.password !== this.info.password) {
        alert(`Old password is not correct${this.form.password}.${this.info.password}`)
        return
      }

      if (this.form.newPassword !== this.form.confirmPassword) {
        alert("New password is not same as confirm password.")
        return
      }
      const param = {
        id: this.id,
        password: this.form.newPassword
      }
      if (this.role.toLowerCase() === "staff") {
        updateStaffInfo(param).then(resp => {
          if (resp) {
            alert("Password has been updated.")
            this.dialog = false;
            this.initUser();
          }
        })
      } else {
        updateManagerInfo(param).then(resp => {
          if (resp) {
            alert("Password has been updated.")
            this.dialog = false;
            this.initUser();
          }
        })
      }


    },

    submitNewInfo() {

      if (this.validate() === false) {
        alert("Please fill required field.")
        return
      }
      const param = {
        ...this.form, password: null
      }
      this.update = false;
      if (this.role.toLowerCase() === "staff") {
        updateStaffInfo(param).then(resp => {
          if (resp) {
            alert("Profile has been updated.")
            this.initUser();
          }
        })
      } else {
        updateManagerInfo(param).then(resp => {
          if (resp) {
            alert("Profile has been updated.")
            this.initUser();
          }
        })
      }


    },
    initUser() {
      if (this.role.toLowerCase() === "staff") {
        getStaffInfo(this.id).then(resp => {
          const data = resp.data;
          if (data) {
            this.info = {...data}
            this.form = {...data}
            this.form.password = ""
          }
        })
      } else {
        getManagerInfo(this.id).then(resp => {
          const data = resp.data;
          console.log(data)
          if (data) {
            this.info = {...data}
            this.form = {...data}
            this.form.password = ""
          }
        })
      }

    }

  }
}


</script>

<style>

</style>

