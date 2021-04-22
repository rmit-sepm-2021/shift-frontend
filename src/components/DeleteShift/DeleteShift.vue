<template>
  <div>
    <input v-model="id">
    <v-btn
        color="success"
        class="mr-4"
        @click="delete_"
    >
      Delete
    </v-btn>
  </div>

</template>

<script>
import {deleteShift} from '@/api/login'
export default {
  name: "DeleteShift",
  data () {
    return {
    id:-1
    }
  },
  methods: {
    delete_ () {
      deleteShift(this.id)
    }
  }
}
</script>


<style scoped>
</style>