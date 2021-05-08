<template>
  <v-select

      :items="timeOpts"
      :rules="[v => !!v || 'Time is required']"
      :label="label"
      required
      v-bind:value="value"
      v-on:change="onChange"
  ></v-select>
</template>

<script>
export default {
  name: "Timepicker",
  props: {
    label: String,
    value: String,
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    timeOpts() {
      const opts = []
      for (let i = 0; i < 24; i++) {
        if (i < 10) {
          opts.push(`0${i}:00`)
          opts.push(`0${i}:30`)
        } else {
          opts.push(`${i}:00`)
          opts.push(`${i}:30`)
        }
      }

      return opts
    },
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    }
  }


}
</script>

<style scoped>

</style>