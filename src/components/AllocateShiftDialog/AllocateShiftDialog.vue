<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        >
          Allocate Shift
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Select a staff</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-select
                    v-model="select"
                    :items="item"
                    label="Select a staff"
                    persistent-hint
                    return-object
                    single-line
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="handleSelectItem(item)"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {allocateShift, getAvailableStaff} from "../../api/shift";
import {mapState} from "vuex";


export default {
  name: "AllocateShiftDialog",

  computed: {
    ...mapState({
      id: state => state.user.id,
      shiftId: state => state.shift.staffId
    }),
  },

  mounted() {
    getAvailableStaff(this.shiftId).then(r => {
      const data = r.data
      console.log(data)
      this.item = data
    });
  },

  data: () => ({
      dialog: false,

      select: false,

      item: [
        {
          text: "Jack Ma",
          value: 1
        }
      ],
    }),


  methods: {
    handleSelectItem(item) {
      console.log(item.valueOf())
      const staffId = item.valueOf()
      const allocateParam = {
        // shiftId,
        staffId
      }

      allocateShift(allocateParam).then((res) => {
        if (res.code === 200) {
          alert("Allocate successfully, request sent")
        }
        this.dialog = false
        window.location.reload()
      })
    }
  }

}
</script>

<style scoped>

</style>