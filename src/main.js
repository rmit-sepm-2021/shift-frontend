import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import './permission' // permission control
import('./mock.js')
Vue.config.productionTip = true

new Vue({
    router, store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
