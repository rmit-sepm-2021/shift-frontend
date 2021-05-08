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
          <v-btn icon @click="openDialog">
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
          <v-row>
            <v-col cols="12"  >
              <v-text-field
                  v-model.trim="selectedEvent.location"
                  label="Location"
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
    <AllocateShiftDialog v-model="allocateShiftDialog" :shift="selectedEvent"
                         :shift-id="selectedEvent.id"></AllocateShiftDialog>
  </v-menu>

</template>

<script>

// import {allocateShift, getAvailableStaff} from "@/api/shift";
import AllocateShiftDialog from "@/components/AllocateShiftDialog/AllocateShiftDialog";

export default {
  name: "ShiftDetail",
  props: {
    // selected action data
    selectedEvent: Object,
    // selectedOpen: Boolean,
    selectedElement: null,

  },
  components: {AllocateShiftDialog},
  data: () => ({
    valid: true,
    allocateShiftDialog: false,
    selectedOpen: false,

    select: {},

    item: []
  }),

  methods: {
    openDialog() {
      this.allocateShiftDialog = true;
    }
  }

}
</script>

<style scoped>

</style>



