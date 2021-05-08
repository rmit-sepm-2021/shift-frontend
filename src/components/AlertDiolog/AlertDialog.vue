<template>
  <v-dialog
      v-model="show"
      width="500"
      transition="dialog-top-transition"
  >
    <v-card>
      <v-card-title>
        <v-icon large>
          fa-exclamation-circle
        </v-icon>
      </v-card-title>
      <v-card-text class="pa-5 text-lg-h6" v-text="message">
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="show=false"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AlertDialog",
  props: {
    message: String,
    // show:Boolean,
    ok: Function,
  },
  data: () => ({
    show: true
  })

}
</script>

<style scoped>

</style>