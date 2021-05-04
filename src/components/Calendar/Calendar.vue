<template>
  <div class="pa-5">

    <v-sheet tile height="54" class="d-flex">
      <template v-if="!isManager">
        <FreeTimeDialog class="ma-2"></FreeTimeDialog>
      </template>
      <template v-else>
        <CreateShift btn-color="primary" class="ma-2"></CreateShift>
      </template>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="type"
      ></v-select>
      <v-btn
          outlined
          class="ma-2"
          color="grey darken-2"
          @click="setToday"
      >
        Today
      </v-btn>
      <v-toolbar-title class="ma-2" v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>


    </v-sheet>
    <v-sheet height="700">

      <v-calendar
          :interval-style="intervalStyle"
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @change="getEvents"
          interval-minutes="30"
          interval-count="48"
          @click:more="viewDay"
          @click:date="viewDay"
          @click:event="showEvent"
      >
        <template v-slot:day-body="{ date, week }">
          <div
              class="v-current-time"
              :class="{ first: date === week[0].date }"
              :style="{ top: nowY }"
          ></div>
        </template>
      </v-calendar>
    </v-sheet>
    <ShiftDetail :selected-element="selectedElement"
                 :selected-event="selectedEvent"
    ></ShiftDetail>

  </div>
</template>

<script>
import FreeTimeDialog from "@/components/FreeTimeDialog/FreeTimeDialog";
import {mapGetters, mapState} from "vuex";
import {getFreeTime} from "@/api/availableTime"
import {getShiftList} from "@/api/shift";
import ShiftDetail from "@/components/Calendar/ShiftDetail";
import CreateShift from "@/components/CreateShiftDialog/CreateShiftDialog";

let moment = require('moment');
const colors = [
  "blue",
  "indigo",
  "deep-purple",
  "cyan",
  "green",
  "orange",
  "grey darken-1",
]
const shiftListToEvents = (list) => {
  let events = []
  for (const datum of list) {
    const mStartTime = moment(datum['startTime']), mEndTime = moment(datum['endTime']),
        mCreatedTime = moment(datum['createdTime'])

    events.push({
      name: datum['staffName'] ? datum['staffName'] + ": " + datum['title'] : datum['title'],
      start: mStartTime.toDate(),
      end: mEndTime.toDate(),
      staffName: datum['staffName'],
      managerName: datum['managerName'],
      location: datum['managerName'],
      description: datum['description'],
      startTime: mStartTime.format("LLL"),
      endTime: mEndTime.format("LLL"),
      duration: Math.abs(mStartTime.diff(mEndTime, 'hours')),
      createdTime: mCreatedTime.format("LLL"),
      id: datum['id'],
      status: datum['statusStr'],
      color: colors[datum['id'] % colors.length],
      timed: true,
    })
  }
  return events
}
export default {
  components: {
    FreeTimeDialog, ShiftDetail, CreateShift
  },
  data: () => ({
    //free-time
    freeTime: [],
    // end
    // current time line
    ready: false,
    // end
    type: "week",
    types: ["month", "week", "day"],
    mode: "stack",
    weekday: [1, 2, 3, 4, 5, 6, 0],
    value: "",
    events: [],
    // selected action data
    selectedEvent: {},
    selectedElement: null,
  }),

  mounted() {
    // current time
    this.ready = true
    this.scrollToTime()
    this.updateTime()
    // end
    if (!this.isManager) {
      const param = {
        staffId: this.id
      }
      getFreeTime(param).then(res => {
        const data = res.data
        const tmp = []
        for (const time of data) {
          tmp.push({
            startTime: moment(time.startTime),
            endTime: moment(time.endTime)
          })

        }
        this.freeTime = tmp

      })
    } else {
      getShiftList().then(resp => {
        const data = resp.data
        this.events = shiftListToEvents(data)
      })
    }
  },
  computed: {
    // current time
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
    },
    cal() {
      return this.ready ? this.$refs.calendar : null
    },
    // end
    ...mapState({
      id: state => state.user.id
    }),
    ...mapGetters([
      'isManager',
    ]),

  },
  methods: {
    viewDay({date}) {
      this.value = date
      this.type = 'day'
    },
    setToday() {
      this.value = ''
    },
    intervalStyle(interval) {

      const mInterval = moment(interval.date + " " + interval.time)
      for (const time of this.freeTime) {
        if (mInterval.isBetween(time.startTime, time.endTime, null, '[]')) {
          return {
            backgroundColor: '#99FFCC'
          }
        }
      }
      return {backgroundColor: undefined}

    },
    getEvents() {
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    //  current time
    getCurrentTime() {
      return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
    },
    scrollToTime() {
      const time = this.getCurrentTime()
      const first = Math.max(0, time - (time % 30) - 30)

      this.cal.scrollToTime(first)
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000)
    },
    //select event
    showEvent({nativeEvent, event}) {
      // const open = () => {
      //   this.selectedEvent = event
      //   this.selectedElement = nativeEvent.target
      // }
      //
      // if (this.selectedOpen) {
      //   this.selectedOpen = false
      //   setTimeout(open, 10)
      // } else {
      //   open()
      // }
      console.log({event})
      this.selectedEvent = event
      this.selectedElement = nativeEvent.target
      nativeEvent.stopPropagation()
    },
  },
};
</script>

<style scoped lang="scss">
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
</style>

