<template>
  <v-dialog
      v-model="dialog"
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
            @click="handleCancel"
        >
          Cancel
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="handleConfirm"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {allocateShift, getAvailableStaff} from "@/api/shift";
import {postMessage} from '@/api/message'
import {mapState} from "vuex";
import {generateAllocateMessageHtml} from '@/utils/message'
import dialogMessage from "@/utils/dialogMessage";

export default {
  name: "AllocateShiftDialog",

  props: {
    dialog: Boolean,
    shiftId: Number,
    shift: {
      //name is title
      title: String,
      description: String,
      startTime: String,
      endTime: String,
      manageName: String,
      id: Number,
      location: String,
    },
  },
  model: {
    prop: 'dialog',
    event: 'change',
  },
  data: () => ({
    select: '',
    item: [],
  }),
  computed: {
    ...mapState({
      id: state => state.user.id,
    }),
  },
  mounted() {
    console.log(this.shift)
    getAvailableStaff(this.shiftId).then(r => {
      const data = r.data
      this.item = data.map(i => ({
        text: i['name'],
        value: i['id']
      }))
    });
  },
  methods: {
    handleCancel() {
      this.$emit('change', false)
    },
    handleConfirm() {
      if (this.item.length === 0) {
        this.$alert("There is no available staff.")
        return
      }

      if (typeof (this.select.value) !== 'number') {
        this.$alert("Please select a staff.")
        return
      }
      const staffId = this.select.value
      const shiftId = this.shiftId
      const allocateParam = {
        shiftId,
        staffId
      }
      const staffName = this.select.text
      const content = generateAllocateMessageHtml({...this.shift, staffName})
      const messageParam = {
        senderId: this.id,
        receiverId: staffId,
        senderRole: 1,
        content,
        type: 0
      }
      this.$confirm(
          {
            title: "Allocate Shift?",
            message: `Are you sure you want to allocate this shift to ${staffName}?`
          }).then(() => {
        allocateShift(allocateParam).then((res) => {
          if (res.code === 200) {
            this.$alert(dialogMessage.alert.success.AllocateShift)
          }
          this.$emit('change', false)
          window.location.reload()
        }).catch(r => {
          console.log(r)
        }).then(() => postMessage(messageParam))
      })

    }
  }
}
</script>

<style scoped>

</style>