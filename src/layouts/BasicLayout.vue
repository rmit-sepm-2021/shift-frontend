<template>
  <v-app app color="primary" dark>
    <v-main>
      <v-navigation-drawer v-model="drawer" app width="15%">
        <v-sheet color="grey lighten-4" class="pa-4">
          <router-link :to="{ name: 'profile'}">
            <v-avatar class="mb-4" color="grey darken-1" size="64">
              <span class="white--text headline">{{ nameAbbreviation }}</span>
            </v-avatar>
          </router-link>

          <div>{{ role }}</div>
          <div>{{ name }}</div>
          <div>{{ email }}</div>
        </v-sheet>
        <v-divider></v-divider>
        <v-list>
          <template v-if="isManager">
            <v-list-item @click="switchToStaff">
              <v-list-item-content>
                <v-list-item-title>Switch to Staff</v-list-item-title>

              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item @click="switchToManager">
              <v-list-item-content>
                <v-list-item-title>Switch to Manager</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item v-for="[icon, text,path] in SideBarLink" :key="text" link :to="path">
            <!--            TODO Add icon-->
            <v-list-item-icon>
              <v-badge color="red"  v-if="text==='Notification'" :content="ms"  :value="ms">
                <v-icon v-text="icon"></v-icon>
              </v-badge>
              <v-icon v-text="icon" v-else></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!--      <v-container class="py-8 px-6" fluid>-->
      <!--  -->
      <!--      </v-container>-->
      <router-view/>
    </v-main>
  </v-app>

</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import auth from "@/utils/auth";


export default {
  name: "BasicLayout",
  components: {},
  created() {
    const {Login} = this
    const loginParams = {
      // email: "mask@test.com", password: "123456"
      email: "test@qq.com", password: "123456"
    }
    //TODO start here
    if (!auth.isLogged()) {

      Login(loginParams).then((res) => {

        console.log(res)
        const data = res['data']
        auth.setToken(data['token'])
      })
    }

  },
  computed: {
    isManager() {
      if (this.role === "STAFF") {
        return false;
      } else if (this.role === "MANAGER") {
        return true;
      } else {
        alert("Can not know your role.")
        return false;
      }
    },

    ...mapState({
      name: state => state.user.name,
      email: state => state.user.email,
      role: state => state.user.role,
    }),
    ...mapGetters([
      'nameAbbreviation',
      // ...
    ]),
    SideBarLink() {
      console.log({role: this.role})
      if (this.role === "STAFF") {
        return [
          ["fa-tachometer-alt", "Dashboard", "/dashboard"],
          ["mdi-bell", "Notification", "/notification"],
          ["mdi-account", "Profile", "/profile"],
          ["mdi-timetable", "My Shift", "/staff/shifts"],

        ]
      } else {
        return [
          ["fa-tachometer-alt", "Dashboard", "/dashboard"],
          ["mdi-bell", "Notification", "/notification"],
          // ["mdi-account", "Profile", "/manager/profile"],
          ["mdi-account-box-multiple", "Account List", "/manager/accounts"],
          ["mdi-timetable", "Shift List", "/manager/shifts"],
        ]
      }
    },
  },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    ms:5,
  }),
  methods: {
    loginAsStaff() {
      const {Login} = this
      const loginParams = {
        email: "mask@test.com", password: "123456"
      }

      Login(loginParams).then((res) => {

        console.log(res)
        const data = res['data']
        auth.setToken(data['token'])
        this.$router.push('/')
        window.location.reload()
      })
    },
    loginAsManager() {
      const {Login} = this
      const loginParams = {
        email: "test@qq.com", password: "123456"
      }
      Login(loginParams).then((res) => {
        console.log(res)
        const data = res['data']
        auth.setToken(data['token'])
        this.$router.push('/')
        window.location.reload()
      })
    },
    ...mapActions(['Login']),
    doNothing() {
    },
    switchToStaff() {
      this.loginAsStaff()
    },
    switchToManager() {
      this.loginAsManager()
    },
  }
};
</script>

<style>
</style>
