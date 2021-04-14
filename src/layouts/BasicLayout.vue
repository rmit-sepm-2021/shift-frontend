<template>
  <v-app app color="primary" dark>
    <v-main>
      <v-navigation-drawer v-model="drawer" app width="15%">
        <v-sheet color="grey lighten-4" class="pa-4">
          <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
          <div>john@vuetifyjs.com</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item v-for="[icon, text] in links" :key="icon" link>
            <!-- <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon> -->

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar short>
        <v-tab href="/calendarDemo"> Calendar Demo </v-tab>
        <v-tab href="#two"> Profile </v-tab>
        <v-tab href="#three"> fuck </v-tab>
      </v-app-bar>
      <v-container class="py-8 px-6" fluid>
        <slot></slot>
      </v-container>
      <v-footer padless>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>RMIT-students</strong>
        </v-col>
      </v-footer>
    </v-main>
  </v-app>

</template>

<script>
export default {
  name: "blank-layout",
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Profile"],
      ["mdi-send", "User"],
      ["mdi-delete", "Time"],
      ["mdi-alert-octagon", "Shift"],
    ],
  }),
};
</script>

<style>
</style>
