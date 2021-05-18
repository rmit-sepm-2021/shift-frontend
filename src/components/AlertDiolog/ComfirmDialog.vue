<template>

  <v-dialog
      v-model="content.show"
      width="500"
      :dark="isDark"
  >
    <v-card>
      <v-card-title class="headline  lighten-2">
        {{ content.title }}
      </v-card-title>
      <v-card-text class="pa-5" v-text="content.message">
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="ok"
        >
          OK
        </v-btn>
        <v-btn
            color="primary"
            text
            @click="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    content: {
      title: String,
      message: String,
      show: Boolean
    },
    ok: Function,
    close: Function,
  },
  data: () => ({
    isDark: false,
  }),
  methods: {}
}
</script>

<style scoped>

</style>