import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../components/Calendar/Calendar'
import Login from "@/components/Login/Login";
import AccountTable from "@/components/Account/AccountTable";
import BasicLayout from "@/layouts/BasicLayout"
import DeleteShift from "@/components/DeleteShift/DeleteShift";
import Profile from '../components/Profile/Profile'
import ShiftTable from "@/components/ShiftTable/ShiftTable";
import CreateShift from "../components/CreateShift/CreateShift";

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
            {
                path: 'manager/accounts',
                component: AccountTable,
                meta: {
                    title: 'Accounts'
                }
            },
            {
                path: 'manager/shifts',
                component: ShiftTable,
                meta: {
                    title: 'Shifts'
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
    },
    //profile
    {
        path:'/manager/profile',
        name:"profile",
        component:Profile
    },
    {
        path:'/staff/profile',
        name:"profile",
        component:Profile
    },

    //addNewShift
    {
        path: '/createShift',
        component: CreateShift,
        meta: {
            title: 'CreateShift'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
