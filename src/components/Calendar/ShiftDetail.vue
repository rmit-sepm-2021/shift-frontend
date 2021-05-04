<template>

  <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
  >
    <v-card
        color="grey lighten-4"
        min-width="350px"
        flat
    >
      <v-toolbar
          :color="selectedEvent.color"
          dark
      >
        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-if=" selectedEvent.status==='Not allocated'">

          <span>Allocate a staff</span>
          <v-btn icon @click="openDialog()">
            <v-icon>fa-plus-circle</v-icon>
          </v-btn>
        </template>

      </v-toolbar>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            disabled
        >
          <v-text-field
              v-model.trim="selectedEvent.staffName"
              label="Staff Name"
              required
          ></v-text-field>

          <v-row>
            <v-col cols="12"
                   md="6">
              <v-text-field
                  v-model.trim="selectedEvent.status"
                  label="Status"
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12"
                   md="6">
              <v-text-field
                  v-model.trim="selectedEvent.duration"
                  label="Duration (hours)"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  v-model.trim="selectedEvent.startTime"
                  label="Start Time"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  v-model.trim="selectedEvent.endTime"
                  label="End Time"
              ></v-text-field>
            </v-col>
          </v-row>


          <v-row>
            <v-col cols="12"
                   md="6">
              <v-text-field
                  v-model.trim="selectedEvent.managerName"
                  label="Created by"
              ></v-text-field>
            </v-col>
            <v-col cols="12"
                   md="6">
              <v-text-field
                  v-model.trim="selectedEvent.createdTime"
                  label="Created Time"
              ></v-text-field>
            </v-col>

          </v-row>
          <v-textarea
              v-model.trim="selectedEvent.description"
              label="Description"
          ></v-textarea>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
            text
            color="secondary"
            @click="selectedOpen = false"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
        v-model="allocateShiftDialog"
        persistent
        max-width="600px"
    >
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
              @click="allocateShiftDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="handleSelectItem"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-menu>

</template>

<script>

import {allocateShift, getAvailableStaff} from "../../api/shift";

export default {
  name: "ShiftDetail",
  props: {
    // selected action data
    selectedEvent: Object,
    // selectedOpen: Boolean,
    selectedElement: null,

  },
  data: () => ({
    valid: true,
    allocateShiftDialog: false,
    selectedOpen: false,

    select: {},

    item: []
  }),

  mounted(){
    console.log(this.selectedEvent)


  },

  methods: {
    openDialog() {
      this.allocateShiftDialog=

          getAvailableStaff(this.selectedEvent.id).then(r => {
            const data = r.data
            console.log(data)
            this.item = data.map(i=>({
              text: i['name'],
              value: i['id']
            }))
          });
    },

    handleSelectItem() {

      const staffId = this.select.value
      const shiftId = this.selectedEvent.id
      const allocateParam = {
        shiftId,
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

//  todo add more actions like change shift
}
</script>

<style scoped>

</style>



