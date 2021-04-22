<template>
  <div>

    <v-sheet tile height="54" class="d-flex">


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
          class="mr-4"
          color="grey darken-2"
          @click="setToday"
      >
        Today
      </v-btn>
      <v-toolbar-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <FreeTimeDialog v-if="!isManager"></FreeTimeDialog>


    </v-sheet>
    <v-sheet height="600">

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
  </div>
</template>

<script>
import FreeTimeDialog from "@/components/FreeTimeDialog/FreeTimeDialog";
import {mapGetters, mapState} from "vuex";
import {getFreeTime} from "@/api/availableTime"

let moment = require('moment');

export default {
  components: {FreeTimeDialog},

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
    freeTime: [],
    // end
    // current time line
    ready: false,
    // end
    type: "week",
    types: ["month", "week","day"],
    mode: "stack",
    weekday: [1, 2, 3, 4, 5, 6, 0],
    value: "",
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  }),

  mounted() {
    // current time
    this.ready = true
    this.scrollToTime()
    this.updateTime()
    // end
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
      console.log(res)
    })
  },
  computed: {
    // current time
    nowY () {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
    },
    cal () {
      return this.ready ? this.$refs.calendar : null
    },
    // end
    ...mapState({
      id: state => state.user.id
    }),

    ...mapGetters([
      'isManager',
    ]),
    events() {
      return [
        //     {
        //   name: "My free time",
        //   start: moment().toDate(),
        //   end: moment().add(7, "days").toDate(),
        //   color: "green",
        //   timed: true,
        // }, {
        //   name: "My free tim2e",
        //   start: moment().toDate(),
        //   end: moment().add(7, "days").toDate(),
        //   color: "green",
        //   timed: true,
        // }
      ]
    },
  },
  methods: {
    viewDay ({ date }) {
      this.value = date
      this.type = 'day'
    },
    setToday () {
      this.value = ''
    },
    intervalStyle(interval) {
      // console.log(interval)

      const mInterval = moment(interval.date + " " + interval.time)
      for (const time of this.freeTime) {

        if (mInterval.isBetween(time.startTime, time.endTime,null,'[]')) {
          // console.log(mInterval.format())
          // console.log(time.startTime.format())
          // console.log(time.endTime.format())
          return {
            backgroundColor: '#99FFCC'
          }
        }
      }
      return {backgroundColor: undefined}


    },
    getEvents() {
      //start, end
      // const events = [];
      // console.log({start})
      // const min = new Date(`${start.date}T00:00:00`);
      // const max = new Date(`${end.date}T23:59:59`);
      // const days = (max.getTime() - min.getTime()) / 86400000;
      // const eventCount = this.rnd(days, days + 20);
      //
      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0;
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      //   const second = new Date(first.getTime() + secondTimestamp);
      //
      //   events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     timed: !allDay,
      //   });
      // }
      //
      // this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  //  current time
    getCurrentTime () {
      return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
    },
    scrollToTime () {
      const time = this.getCurrentTime()
      const first = Math.max(0, time - (time % 30) - 30)

      this.cal.scrollToTime(first)
    },
    updateTime () {
      setInterval(() => this.cal.updateTimes(), 60 * 1000)
    },
    //end
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