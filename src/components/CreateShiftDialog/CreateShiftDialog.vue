<template>
  <div>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container>
        <v-row justify="center">
          <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  :color="btnColor"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  :text="text"
              >
                Add New Shift
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="title"
                          type="String"
                          label="Title"
                          :rules="FieldRequiredRule"
                          required
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
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
                            @click:minute="$refs.startTimeMenu.save(startTime)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>

                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
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
                              label="Pick a created date"
                              prepend-icon="mdi-calendar"
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
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          prepend-icon="mdi-calendar-clock"
                          v-model="duration"
                          type="number"
                          label="Duration (hours)"
                          required
                          max="10"
                          onkeyup= "if(! /^d+$/.test(this.value)){alert('Please input an integer');this.value='';}"
                      ></v-text-field>

                    </v-col>
                    <v-col cols="12">
                      <v-combobox
                          v-model="location"
                          clearable
                          hide-selected
                          :rules="FieldRequiredRule"
                          label="location"
                          :items="locations"
                          :value="location"
                      ></v-combobox>
                    </v-col>

                    <v-col
                        cols="12"
                        md="12"
                    >
                      <v-textarea
                          v-model="description"
                          type="String"
                          outlined
                          label="Description"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    class="mr-4"
                    @click="reset"
                >
                  Reset Form
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    class="mr-4"
                    @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    class="mr-4"
                    @click="add"
                >
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import {createShift} from "@/api/shift"
import {mapState} from 'vuex'
import {getLocationList} from "@/api/location";

let moment = require('moment');

export default {
  name: "CreateShift",
  props: {
    text: Boolean,
    btnColor: String,
  },
  mounted() {

    getLocationList().then(resp => {
      const data = resp.data
      this.locations = data.map(item => item['name'])
    })
  },
  data: () => ({
    dialog: false,
    formTitle: "New Shift",
    startTime: moment().format("HH:mm"),
    startDate: moment().format("YYYY-MM-DD"),
    startTimeMenu: false,
    startDateMenu: false,
    location: "",
    locations: [],
    title: "",
    duration: 4,
    description: "",
    valid: true,
    TimeRules: [
      v => !!v || 'Time is required',
    ],

    FieldRequiredRule: [
      v => !!v || 'This field is required'
    ],

  }),

  computed: {
    ...mapState({
      id: state => state.user.id,
    }),
  },

  methods: {
    allowedStartDates(date) {
      const mDate = moment(date, "YYYY-MM-DD")
      const date2w = moment().add(2, 'week')
      return mDate.isBetween(moment().add(-1, 'day'), date2w, null, '[]') || mDate.isSame(moment())
    },
    add() {
      const isValid = this.$refs.form.validate()


      if (!isValid) {
        alert("Please fill required fields.")
        return;
      }
      const {
        id,
        title,
        description, location
      } = this

      // return;
      const createdTime = new Date().valueOf()
      const startTime = moment(this.startDate + " " + this.startTime).valueOf()
      const endTime = moment(startTime).add(this.duration, 'hour')
      const createShiftParams = {
        startTime, createdTime, title, description, managerId: id
        , location, endTime
      }
      if (startTime.valueOf() <= moment().valueOf()) {
        alert("Please select a correct start date and time")
        return
      }
      createShift(createShiftParams).then((res) => {
        if (res.code === 200) {
          alert("The shift has been created.")
        }
        this.dialog = false
        window.location.reload()
      })


      this.$refs.form.resetValidation()
    },

    reset() {
      this.$refs.form.reset()
    },

    close() {
      this.dialog = false
    },
  }
}
</script>

<style>
</style>
<!-- todo created date need to be delete location. Reset form need be left .Dashboard should have create shifts -->