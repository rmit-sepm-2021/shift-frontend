<template>
  <v-app app color="primary" class="app">
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

          <v-list-item-icon>
            <v-badge color="red" v-if="text==='Notification'&& size!==0" :content="size">
              <v-icon v-text="icon"></v-icon>
            </v-badge>
            <v-icon v-text="icon" v-else></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>


    <v-main class="app">
      <v-snackbar
          v-model="notification.alert"
          top
          color="primary"
          outlined
      >
        You've got <strong v-text="size"/> new notification<span v-if="size>1">s</span>!

        <template v-slot:action="{ attrs }">
          <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="notification.alert = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <!--      Main component-->
      <router-view/>
    </v-main>
  </v-app>

</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import auth from "@/utils/auth";
import {getMessageListByManagerId, getMessageListByStaffId} from "@/api/message";
import * as _ from 'lodash'

export default {
  name: "BasicLayout",
  components: {},
  created() {
    const {Login} = this
    const loginParams = {
      // email: "mask@test.com", password: "123456"
      email: "test@qq.com", password: "Test!123"
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
  mounted() {
    // notification part
    if (this.role === "STAFF") {
      getMessageListByStaffId(this.id).then(r => {
        const data = r.data
        this.setUpNotification(data)
      });
    } else {
      getMessageListByManagerId(this.id).then(r => {
        const data = r.data
        this.setUpNotification(data)
      })
    }
  },
  computed: {
    ...mapState({
      id: state => state.user.id,
    }),
    isManager() {
      if (this.role === "STAFF") {
        return false;
      } else if (this.role === "MANAGER") {
        return true;
      } else {
        this.$alert("Can not know your role.")
        return false;
      }
    },

    ...mapState({
      name: state => state.user.name,
      email: state => state.user.email,
      role: state => state.user.role,
      size: state => state.message.size,
    }),
    ...mapGetters([
      'nameAbbreviation',
      // ...
    ]),
    SideBarLink() {

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
          ["mdi-account", "Profile", "/profile"],
          ["mdi-account-box-multiple", "Account List", "/manager/accounts"],
          ["mdi-timetable", "Shift List", "/manager/shifts"],
        ]
      }
    },
  },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,

    notification: {
      alert: false,
      size: 0,
    },
  }),
  methods: {
    ...mapMutations(['SET_SIZE']),

    setUpNotification(data) {
      const unreadData = _.filter(data, (item => {
        return !item.isRead
      }))
      if (unreadData.length !== 0) {
        this.notification.alert = true
        this.SET_SIZE(unreadData.length)
        this.notification.size = unreadData.length
      }
    },
    loginAsStaff() {
      const {Login} = this
      const loginParams = {
        email: "mask@test.com", password: "Test!123"
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
        email: "test@qq.com", password: "Test!123"
      }
      Login(loginParams).then((res) => {
        console.log(res)
        const data = res['data']
        auth.setToken(data['token'])
        this.$router.push('/')
        window.location.reload()
      })
    },
    ...mapActions(['Login', 'Logout']),
    logout() {
      this.$confirm({
        title: "Logout?",
        message: "Are you sure you want to log out?"
      }).then(() => {
        this.Logout()
        this.$router.push('/login')
      })

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
.app {

}
</style>
