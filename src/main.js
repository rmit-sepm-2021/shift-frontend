import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import './permission' // permission control
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import('./mock.js')
Vue.config.productionTip = true
Vue.use(ElementUI);
new Vue({
    router, store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
