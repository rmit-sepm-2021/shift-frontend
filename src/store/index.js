import Vue from 'vue'
import Vuex from 'vuex'

import message from './modules/message'
import user from './modules/user'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user, message
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    plugins: [persistedState()]
})
