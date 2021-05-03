<template>
  <div class="pa-5">
    <v-sheet tile class="d-flex ">

    </v-sheet>
    <v-sheet>
      <v-data-table
          :headers="headers"
          :items="shiftListData"
          :items-per-page="20"
          class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <span>Accept your allocation</span>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  v-if="item['status']==='Waiting for approved'"
                  class="mr-4"
                  @click="handleAccept(item)"
                  v-bind="attrs"
                  v-on="on"
              >
                fa-check
              </v-icon>
            </template>
          </v-tooltip>
          <v-dialog
              v-model="dialog"
              width="500"
          >
<!--            todo youhave new message in dashborad-->

            <template v-slot:activator="{ on:dialog, attrs }">
              <v-tooltip bottom>
                <span>Reject your allocation</span>
                <template v-slot:activator="{ on:tooltip }">
                  <v-icon

                      v-bind="attrs"
                      v-on="{...tooltip,...dialog}"
                  >
                    fa-times
                  </v-icon>
                </template>
              </v-tooltip>
            </template>
            <v-card>
              <v-card-title class="headline  lighten-2">
                Please input reject reason
              </v-card-title>
              <div class="pa-5">
                <v-textarea outlined clearable label="Reason for rejection" :value="reason"></v-textarea>
              </div>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="handleReject(item)"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.status="{ item }">
          <span class="red--text">{{ item.status }}
          </span>
        </template>
      </v-data-table>
    </v-sheet>

  </div>

</template>

<script>
import {acceptAllocation, getShiftListByStaffId, rejectAllocation} from "@/api/shift";


import {ShiftListToTableData} from "@/utils/shift"
import {postMessage} from "@/api/message";
import {mapState} from "vuex";
import {generateAcceptHtml, generateRejectHtml} from "@/utils/message";

const headers = [
  {
    text: 'Title', value: 'title'
  },

  {
    text: 'Manager', value: 'managerName'
  },

  {
    text: 'Start time', value: 'startTime'
  },
  {
    text: 'End time', value: 'endTime'
  },
  {
    text: 'Location', value: 'location'
  },
  {
    text: 'Description', value: 'description'
  },
  {
    text: 'Status', value: 'status'
  },
  {
    text: 'Created time', value: 'createdTime'
  },
  {text: 'Actions', value: 'actions', sortable: false},
]

export default {
  name: "ManagerShiftTable",
  async mounted() {
    //load data

    getShiftListByStaffId(this.id).then((resp) => {
      const data = resp.data
      this.shiftListData = ShiftListToTableData(data)
    })


  },
  computed: {
    ...mapState({
      id: state => state.user.id,
    }),
  },
  data() {
    return {
      reason: '',
      headers,
      dialog: false,
      shiftListData: [],
    }
  },
  methods: {
    async handleAccept(item) {
      let failed = false
      console.log(item)
      if (!confirm("Are you sure you want to accept the allocation?")) {
        return
      }
      const param = {
        id: item.id
      }
      await acceptAllocation(param).then(r => {
        console.log(r)
        alert("Accept Successfully")
        item.status = "Allocated"
      }).catch(r => {
        console.log(r)
        alert("Something is wrong")
      })
      if (failed) {
        return
      }
      const param2 =
          {
            "senderId": item.staffId,
            "receiverId": item.managerId,
            "content": generateAcceptHtml(item),
            "type": 1,
            "senderRole": 0
          }
      await postMessage(param2).then(r => {
        console.log(r)
      }).catch(r => {
        console.log(r)
      })


    },


    handleReject(item) {

      let shiftId, reason;
      const param = {
        id: shiftId,
        reason
      }
      if (!confirm("Are you sure you want to submit the reason fo rejection")){
        return
      }
        rejectAllocation(param).then(r => {
          console.log(r)
          const param = {
            "senderId": item.staffId,
            "receiverId": item.managerId,
            "content": generateRejectHtml(item, this.reason),
            "type": 2,
            "senderRole": 0
          }
          postMessage(param).then(r => {
            console.log(r)
          }).catch(r => {
            console.log(r)
          })
          this.dialog = false
        }).catch(r => {
          console.log(r)
          alert("Something is wrong")
          this.dialog = false
        })
    }
  }
}
</script>

<style scoped>

</style>