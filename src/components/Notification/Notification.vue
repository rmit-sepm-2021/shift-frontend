<template>
  <div class="mr-auto ">
    <v-toolbar class="pa-2">
      <v-row>
        <v-col cols="3">
          <v-select
              class="mr-auto"
              :items="inboxOptions"
              label="Message Type"
              outlined
              v-model="type"
              @change="changeMessageType"
              dense
          ></v-select>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-row>
      <v-col cols="6">
        <v-list three-line class="overflow-y-auto inbox-div">
          <v-list-item-group

              active-class="pink--text"

          >
            <template v-for="(item, index) in items">
              <v-list-item :key="item.createdTime" @click="handleSelectItem(item)">

                <template v-slot:default="{  }">

                  <v-icon v-if="item.isRead" class="far fa-circle mr-5"></v-icon>

                  <v-icon v-else class="fas fa-circle mr-5"></v-icon>
                  <v-list-item-content>

                    <v-list-item-title v-text="item.sender"></v-list-item-title>
                    <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.title"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>

                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text v-text="moment(item.createdTime).fromNow() "></v-list-item-action-text>


                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                  v-if="index < items.length - 1"
                  :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>


      </v-col>
      <v-divider
          vertical
      ></v-divider>
      <v-col cols="6" class="py-12 px-4">

        <v-row>
          <template v-if="Object.keys(selectedItem).length === 0">

            <v-container class="d-flex flex-column fill-height justify-center align-center" style="min-height: 200px">

              <v-icon x-large>fa-envelope</v-icon>
              No Message selected
            </v-container>


          </template>
          <template v-else>
            <v-col cols="4">
              <v-avatar color="grey darken-1" size="48">
                <span class="white--text headline">{{ getNameAbbr(selectedItem['sender']) }}</span>
              </v-avatar>
              {{ selectedItem['sender'] }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="5" class="text--secondary">
              {{ moment(selectedItem['createdTime']).format('LLL') }}
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>

              <div v-html="selectedItem.content">
              </div>

            </v-col>
          </template>

        </v-row>


      </v-col>
    </v-row>
    <div id="mount-point"></div>
  </div>


</template>

<script>

import {getNameAbbr} from "@/utils/str"
import {mapMutations, mapState} from "vuex";
import {getMessageListByManagerId, getMessageListByStaffId, setRead} from "@/api/message";

let _ = require('lodash');
let moment = require('moment');
const toItem = (data) => {
  let el = document.createElement('div')
  let tmp = data.map(i => {
    el.innerHTML = i['content']
    console.log()
    let title = ''
    if (i['type'] === 1) {
      title = 'You received an accept allocation message'
    } else if (i['type'] === 2) {
      title = 'You received a reject allocation message'
    } else {
      title = 'You received a shift allocation message'
    }
    return {
      createdTime: i['createdTime'],
      title,
      subtitle: el.textContent,
      sender: i['sender']['name'],
      receiver: i['receiver']['name'],
      isRead: i['isRead'],
      content: i['content'],
      id: i['id'],
    }

  })
  return _.sortBy(tmp, function (i) {
    return -i['createdTime']
  })
}
export default {
  name: "Notification",
  data: () => ({
    rawData: [],
    ba: false,
    inboxOptions: ["Read", "Unread", "All"],
    selectedItem: {},
    messages: [
      {}
    ],
    items: [],
    type: 'All',
  }),
  computed: {
    ...mapState({
      role: state => state.user.role,
      id: state => state.user.id
    }),
  },
  mounted() {
    if (this.role === "STAFF") {
      getMessageListByStaffId(this.id).then(r => {
        const data = r.data
        this.rawData = data
        this.items = toItem(data)
      });
    } else {
      getMessageListByManagerId(this.id).then(r => {
        const data = r.data
        this.rawData = data
        this.items = toItem(data)
      })
    }

  },

  methods: {
    ...mapMutations(['SIZE_DECREMENT']),
    changeMessageType() {

      if (this.items === []) {
        this.items = this.rawData
      }
      if (this.type === 'Unread') {
        this.items = toItem(this.items.filter(i => !i['isRead']))
      } else if (this.type === 'Read') {
        this.items = toItem(this.items.filter(i => i['isRead']))
      } else {
        this.items = toItem(this.items)
      }

    },
    getNameAbbr,
    moment,
    handleSelectItem(item) {
      console.log(item)

      const param = {
        messageId: item['id']
      }
      if (!item['isRead']) {
        item['isRead'] = true
        this.SIZE_DECREMENT()
        setRead(param)
      }

      this.selectedItem = item
    }
  }
}
</script>

<style scoped>
.inbox-div {

  max-height: 700px;
}
</style>