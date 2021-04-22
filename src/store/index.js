import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    plugins: [persistedState()]
})
