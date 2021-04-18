<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-alert
          :value="loginAlert"
          border="top"
          dismissible
          type="success"
          transition="scale-transition"
      >
        Login Successfully!
      </v-alert>
      <v-alert
          :value="validateAlert"
          border="top"
          dismissible
          type="error"
          transition="scale-transition"
      >
        Please enter correct email or password
      </v-alert>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="10"
              label="E-mail"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Password"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
          color="success"
          class="mr-4"
          @click="handleSubmit"
      >
        Login
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import {mapActions} from 'vuex'
import auth from '@/utils/auth.js'

export default {
  name: "Login.vue",
  computed: {},
  data() {
    return {
      loginAlert: false,
      validateAlert: false,
      valid: true,
      email: 'mask@test.com',
      password: '123456',

      passwordRules: [
        v => !!v || 'Password is required',
        // v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$*&+?])[A-Za-z\d!$*&+?]{8,}$/.test(v) || 'Password must be valid'
      ],

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    handleSubmit(e) {

      e.preventDefault()

      const {
        Login, email, password
      } = this
      const loginParams = {
        email, password
      }

      if (!this.$refs.form.validate()) {
        this.validateAlert = !this.validateAlert
        return
      }
      Login(loginParams).then((res) => {
        console.log(res)
        const data = res.data
        this.loginAlert = !this.loginAlert
        auth.setToken(data['token'])
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      })
    },
    ...mapActions(['Login']),
  }
}
</script>

<style scoped>

</style>