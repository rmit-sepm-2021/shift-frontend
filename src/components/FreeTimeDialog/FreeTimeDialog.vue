<template>
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
        Select a free time
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Select a free time</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <!--         start date       -->
            <v-col
                cols="6"

            >
              <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="startDate"
                      label="Pick a start date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="startDate"
                    @input="startDateMenu = false"
                    :allowed-dates="allowedDates"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <!--                start time-->
            <v-col
                cols="6"

            >
              <v-menu
                  ref="startTimeMenu"
                  v-model="startTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="startTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="startTime"
                      label="Pick a start time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                    v-if="startTimeMenu"
                    v-model="startTime"
                    full-width
                    format="24hr"
                    @click:minute="$refs.startTimeMenu.save(startTime)"
                    :allowed-minutes="allowedMinutes"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <!--      end date          -->
            <v-col
                cols="12"
                sm="4"
                md="6"
            >
              <v-menu
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="endDate"
                      label="Pick a end date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="endDate"
                    @input="endDateMenu = false"
                    :allowed-dates="allowedDates"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <!--                end time-->
            <!--                TODO started here-->
            <v-col
                cols="12"
                sm="4"
                md="6"
            >

              <v-menu
                  ref="endTimeMenu"
                  v-model="endTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="endTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="endTime"
                      label="Pick an end time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                    v-if="endTimeMenu"
                    v-model="endTime"
                    full-width
                    format="24hr"
                    @click:minute="$refs.endTimeMenu.save(endTime)"
                    :allowed-minutes="allowedMinutes"
                ></v-time-picker>
              </v-menu>
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
          Close
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="handleSelectFreeTime"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
let moment = require('moment');
export default {
  name: "FreeTimeDialog",
  data: () => ({
    //free-time
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    startTime: moment().format("HH:mm"),
    endTime: moment().format("HH:mm"),
    timePickerMenu: false,
    startTimeMenu: false,
    endTimeMenu: false,
    startDateMenu: false,
    endDateMenu: false,
    dialog: false,
    // end
  }),
  methods: {
    allowedDates(date) {
      return moment(date, "YYYY-MM-DD").isBetween(moment(), moment().add(2, 'week'))
    },
    allowedMinutes: v => v % 30 === 0,
    handleSelectFreeTime() {
      console.log(this.datePicker)
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>