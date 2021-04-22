import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../components/Calendar/Calendar'
import Login from "@/components/Login/Login";
import BasicLayout from "@/layouts/BasicLayout"
import Profile from '../components/Profile/Profile'

Vue.use(VueRouter)

const routes = [
    //Dashboard
    {
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: 'dashboard',
                component: Calendar,
                meta: {
                    title: 'Dashboard'
                }
            },
        ]
    },

    //login
    {
        path: '/login',
        component: Login,
        meta: {
            title: 'Login'
        }
    },
    //profile
    {
        path:'/profile',
        name:"profile",
        component:Profile
      }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
