import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import './permission' // permission control
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import('./mock.js')
import {confirm,_alert} from '@/utils/alert'

Vue.config.productionTip = true
Vue.use(ElementUI);
Vue.prototype.$confirm = confirm;
Vue.prototype.$alert = _alert;
new Vue({
    router, store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
