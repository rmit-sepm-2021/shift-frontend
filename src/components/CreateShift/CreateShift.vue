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
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  fixed
                  bottom
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
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="staffId"
                          type="long"
                          label="staff_id*"
                          :rules="FieldRequiredRule"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="startTime"
                          type="time"
                          :rules="TimeRules"
                          label="start_time*"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="endTime"
                          type="time"
                          :rules="TimeRules"
                          label="end_time*"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="managerId"
                          type="long"
                          label="manager_id*"
                          :rules="FieldRequiredRule"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          prepend-icon="mdi-map-marker"
                          v-model="locationId"
                          type="long"
                          label="location_id*"
                          :rules="FieldRequiredRule"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="createdTime"
                          type="date"
                          label="created_time*"
                          :rules="FieldRequiredRule"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="status"
                          type="varchar"
                          label="status*"
                          :rules="FieldRequiredRule"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="title"
                          type="varchar"
                          label="title*"
                          :rules="FieldRequiredRule"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="12"
                    >
                      <v-textarea
                          v-model="description"
                          type="longtext"
                          outlined
                          label="Description"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
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
import {createShift} from "@/api/login"
import {mapState} from 'vuex'

export default {
  name: "CreateShift",

  data: () => ({
    dialog: false,
    formTitle: "New Shift Detail",

    TimeRules: [
      v => !! v || 'Time is required',
      v => v <= 4 || 'Standard Duration of a shift is 4h',
    ],

    FieldRequiredRule: [
        v => !! v || 'This field is required'
    ],

  }),

  computed: {
    ...mapState({
      id: state => state.user.id,
    }),
  },

  methods: {
    add() {
      const isValid = this.$refs.form.validate()
      if (!confirm("Are you sure you want to add this shift?")) {
        return;
      }
      if (isValid) {
        const {
          staffId, startTime, endTime, managerId, locationId, createdTime, status, title, description
        } = this
        const createShiftParams = {
          staffId, startTime, endTime, managerId, locationId, createdTime, status, title, description
        }

        createShift(createShiftParams).then(() => {
          // if (res.code === 200) {
          //   alert("Shift successfully added")
          // }
          // this.dialog = false
          // window.location.reload()
        })
      }

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