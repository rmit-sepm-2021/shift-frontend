import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CalendarDemo from '../components/CalendarDemo/CalendarDemo'
import Login from "@/components/Login/Login";

Vue.use(VueRouter)

const routes = [
    //Dashboard
    {
        path: '/',
        name: 'Home',
        component: Home,

    },
    {
        path: '/calendarDemo',
        name: "calendar",
        component: CalendarDemo
    },
    {
        path: '/login',
        component: Login,

        meta:{
            title: 'Login'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
