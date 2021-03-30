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
  <!--         <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row> -->
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
