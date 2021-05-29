import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../components/Calendar/Calendar'
import Login from "@/components/Login/Login";
import AccountTable from "@/components/Account/AccountTable";
import BasicLayout from "@/layouts/BasicLayout"

import Profile from '../components/Profile/Profile'
import ShiftTable from "@/components/ManagerShiftTable/ManagerShiftTable";
import CreateShift from "../components/CreateShiftDialog/CreateShiftDialog";
import Notification from "@/components/Notification/Notification";
import StaffShiftTable from "@/components/StaffShiftTable/StaffShiftTable";
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
                path: '/notification',
                component: Notification,
                meta: {
                    title: 'Notification'
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
            {
                path: 'staff/shifts',
                component: StaffShiftTable,
                meta: {
                    title: 'Shifts'
                }
            },
            //profile
            {
                path: 'profile',
                name: "profile",
                component: Profile,
                meta: {
                    title: 'Profile'
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
    routes
})

export default router
