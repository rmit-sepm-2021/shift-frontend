<template>
  <div class="">
    <v-row class="ma-3 row">
      <v-col cols="2">
        <template v-if="!isManager">
          <FreeTimeDialog></FreeTimeDialog>
        </template>
        <template v-else>
          <CreateShift btn-color="primary"/>
        </template>
      </v-col>
      <v-col cols="6">
        <v-btn icon class="" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn
            outlined
            color="grey darken-2"
            @click="setToday"
        >
          Today
        </v-btn>
        <span class="text-md-h6 " v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </span>
      </v-col>

      <v-col cols="3">
        <v-select
            v-model="type"
            :items="types"
            dense
            hide-details
            class="cal-type"
            label="Type"
        >
          <template v-slot:selection="{ item }">
            <v-icon left>{{ item.icon }}</v-icon>
            <span>    {{ item.text }}</span>
          </template>
          <template v-slot:item="{ item }">
            <v-icon left>{{ item.icon }}</v-icon>
            <span>    {{ item.text }}</span>
          </template>
        </v-select>
      </v-col>


    </v-row>


    <v-calendar
        class="cal"
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
    <ShiftDetail :selected-element="selectedElement"
                 :selected-event="selectedEvent"
    />
    <v-snackbar
        v-model="snackbar"
        top
        color="primary"
        outlined
    >
      Green color indicates available time in the calendar

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>
import FreeTimeDialog from "@/components/FreeTimeDialog/FreeTimeDialog";
import {mapGetters, mapState} from "vuex";
import {getFreeTime} from "@/api/availableTime"
import {getShiftList, getShiftListByStaffId} from "@/api/shift";
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
    snackbar:true,
    //free-time
    freeTime: [],
    // end
    // current time line
    ready: false,
    // end
    type: "week",
    types: [
      {text: "Month", value: "month", icon: "fa-calendar-alt"},
      {
        text: "Week",
        value: "week",
        icon: "fa-calendar-week"
      },
      {text: "Day", value: "day", icon: "fa-calendar-day"}],
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
      getShiftListByStaffId(this.id).then(resp => {
        const data = resp.data
        this.events = shiftListToEvents(data)
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

.cal-type {
  max-height: 100px;
}

.cal {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  max-height: 85%;
  z-index: 0;
}

.row {
  min-height: 20%;
  z-index: 50 !important;
}
</style>

