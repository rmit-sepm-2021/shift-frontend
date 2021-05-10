<template>
  <div>

    <div class="logincard">
      <div class="container d-flex justify-content-center">
        <div class="row mt-5 w-75">
          <div
              class="col-4 bg-cyan rounded-left d-flex flex-column align-items-center text-center  justify-content-around"
          >
            <h2>Hello, friend!</h2>

          </div>
          <div
              class="col-8 shadow-lg d-flex flex-column p-5 rounded-right align-items-center"
          >
            <h1 class="title text-h2">Shift system</h1>
            <div class="d-flex justify-content-center" id="loading">
              <div class="spinner-border d-none" role="status"></div>
            </div>
            <div class="w-75">

              <v-form v-model="valid" ref="form">
                <v-container class="d-flex flex-column align-center mt-16">
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

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import {mapActions} from 'vuex'
import auth from '@/utils/auth.js'
import dialogMessage from "@/utils/dialogMessage";
import '@/assets/boot.css'

export default {
  name: "Login",
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
        }, 1000)
      }).catch(() => {
        this.$alert(dialogMessage.alert.error.Common)
      })
    },
    ...mapActions(['Login']),
  }
}
</script>

<style scoped>
@import url('https://fonts.font.im/css?family=Hanalei+Fill|Roboto+Slab');

.logincard {
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  background-color: #fff;
  display: flex;
  align-items: center;
  font-family: 'Roboto Slab', serif;
}

.bg-cyan {
  background-color: cyan;
}
</style>