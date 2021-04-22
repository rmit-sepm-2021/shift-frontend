import Vue from 'vue'
import VueRouter from 'vue-router'
import CalendarDemo from '../components/CalendarDemo/CalendarDemo'
import Login from "@/components/Login/Login";
import BasicLayout from "@/layouts/BasicLayout"
import DeleteShift from "@/components/DeleteShift/DeleteShift";
Vue.use(VueRouter)

const routes = [
    //Dashboard
    {
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: 'dashboard',
                component: CalendarDemo,
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
    //login
    {
        path: '/deleteShift',
        component: DeleteShift,
        meta: {
            title: 'Del shift'
        }
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
