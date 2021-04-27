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
        Select an available time
      </v-btn>
     </template>
    <v-card>
      <v-card-title>
        <span class="headline">Select an available time</span>
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
                    :allowed-dates="allowedStartDates"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <!--                start time-->
            <v-col
                cols="6"

            >
              <v-select
                  v-model="startTime"
                  :items="times"
                  :rules="[v => !!v || 'Time is required']"
                  label="Pick a start time"
                  required
              ></v-select>
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
                    :allowed-dates="allowedEndDates"
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
              <v-select
                  v-model="endTime"
                  :items="times"
                  :rules="[v => !!v || 'Time is required']"
                  label="Pick an end time"
                  required
              ></v-select>

            </v-col>
          </v-row>
        </v-container>
        <small>Available time will be indicated in the calendar by green color</small>
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
import {mapState} from "vuex";
import {postFreeTime} from "@/api/availableTime"
import {getTimeOptions} from "@/utils/time"

let moment = require('moment');
export default {
  name: "FreeTimeDialog",
  components: {},
  computed: {
    ...mapState({
      id: state => state.user.id,
    }),
    times: getTimeOptions
  },
  data: () => ({
    //free-time
    startDate: moment().format("YYYY-MM-DD"),
    startTime: "",
    endDate: moment().format("YYYY-MM-DD"),
    endTime: "",
    timePickerMenu: false,
    startTimeMenu: false,
    endTimeMenu: false,
    startDateMenu: false,
    endDateMenu: false,
    dialog: false,
    // end
  }),
  methods: {
    allowedEndDates(date) {
      return moment(date, "YYYY-MM-DD").isBetween(this.startDate, moment().add(2, 'week'), null, '[]')
    },
    allowedStartDates(date) {
      const mDate = moment(date, "YYYY-MM-DD")
      const date2w = moment().add(2, 'week')
      return mDate.isBetween(moment(), date2w) || mDate.isSame(moment())
    },
    allowedMinutes: v => v % 30 === 0,
    handleSelectFreeTime() {
      const startDateTime = this.startDate + " " + this.startTime
      const endDateTime = this.endDate + " " + this.endTime
      const startTimestamp = moment(startDateTime).valueOf()
      const endTimestamp = moment(endDateTime).valueOf()
      if (startTimestamp > endTimestamp) {
        alert("Please select a correct end date time")
        return
      }
      const param = {
        staffId: this.id,
        startTime: startTimestamp,
        endTime: endTimestamp,

      }
      console.log({param})

      postFreeTime(param).then((res) => {
        if (res.code === 500) {
          alert("Add available time failed. Time may be overlap")
        } else {
          window.location.reload()
        }

      })
      this.dialog = false
    }
  }

}
</script>

<style scoped>

</style>