<template>
  <v-dialog
      v-model="dialog"
      max-width="500px"
  >
    <template v-slot:activator="{ on, attrs } ">
      <v-btn
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
      >
        Create a new account
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-select
                v-model="role"
                :items="roles"
                :rules="[v => !!v || 'Role is required']"
                label="Role"
                required
            ></v-select>
            <v-text-field
                v-model.trim="name"
                :counter="30"
                :rules="[v => !!v || 'Name is required']"
                label="Name"
                required
            ></v-text-field>

            <v-text-field
                v-model.trim="email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model.trim="password"
                :rules="passwordRules"
                label="Password"
                required
                type="password"
            ></v-text-field>
            <v-text-field
                v-model.trim="rePassword"
                :rules="passwordRules"
                label="Confirm Password"
                type="password"
                required
            ></v-text-field>
            <v-text-field
                v-model.trim="phone"
                :rules="[v => !!v || 'Phone is required']"
                label="Phone"
                required
            ></v-text-field>

            <template v-if="role==='staff'">
              <v-text-field
                  v-model.trim="address"
                  :rules="[v => !!v || 'Address is required']"
                  label="Address"
                  required
              ></v-text-field>
              <v-text-field
                  v-model.trim="workingLimit"
                  :rules="[v => !!v || 'Working limit is required']"
                  label="Working Limit (hours)"
                  required
              ></v-text-field>
            </template>
            <v-btn
                color="error"
                class="mr-4"
                @click="reset"
            >
              Reset Form
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {createManager, createStaff} from "@/api/user";
import {mapState} from "vuex";

const passwordHint = "Passwords should be exactly 8 characters, including upper and lower case letters, digits and at least one special character \n" +
    "out of !, $, *, &, +, ?"
let Mock = require('mockjs')
let Random = Mock.Random
export default {
  name: "NewAccountDialog",
  data: () => ({
    dialog: false,
    valid: true,
    roles: [{
      text: "Staff",
      value: "staff"
    }, {
      text: "Manager",
      value: "manager"
    }],
    formTitle: "Create a new account",

    //  formdata
    name: Random.name(),
    email: Random.email(),
    password: 'Test!123',
    rePassword: "Test!123",
    address: "an address",
    role: "staff",
    workingLimit: 120,
    phone: "996",
    // name: Random.name(),
    // email: "",
    // password: "",
    // rePassword: "",
    // address: "",
    // role: "staff",
    // workingLimit: 120,
    // phone: "",
    passwordRules: [
      v => !!v || 'Password is required',
      v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$*&+?])[A-Za-z\d!$*&+?]{8,}$/.test(v) || 'Password must be valid. ' + passwordHint,
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],

  }),
  computed: {
    ...mapState({
      id: state => state.user.id,
    }),
  },
  methods: {

    save() {
      const isValid = this.$refs.form.validate()
      if (!confirm("Are you sure you want to create this account?")) {
        return;
      }
      if (isValid) {
        const {
          name,
          email,
          password,
          rePassword,
          address,
          role,
          workingLimit,
          phone
        } = this

        let param = {
          name, phone, email, password, createdTime: new Date().valueOf(), creatorId: this.id,
        }
        if (password !== rePassword) {
          alert("Check your password")
          return
        }
        if (role === "staff") {
          param['workingLimit'] = workingLimit
          param['preferredName'] = name
          param['address'] = address
          console.log(param)
          createStaff(param).then(res => {
            if (res.code === 200) {
              alert("Add an account successfully!")
            }
            this.dialog = false
            window.location.reload()
          })
        } else if (role === "manager") {
          console.log(param)
          createManager(param).then(res => {
            if (res.code === 200) {
              alert("Add an account successfully!")
            }
            window.location.reload()
            this.dialog = false
          }).catch(() => {
            alert("Something is wrong")
            this.dialog = false
          })

        } else {
          alert("Please select a role")
          return;
        }
      }

      // alert("Check, check, check!")
      this.$refs.form.resetValidation()
    },
    close() {
      this.dialog = false
    },
    reset() {

      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>

</style>
