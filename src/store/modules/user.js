// import storage from 'store'
import {login} from '@/api/login'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'
//
import auth from "@/utils/auth";

const user = {
    state: {
        id: 0,
        token: '',
        name: '',
        email: '',
        // role : STAFF|MANAGER
        role: '',
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ROLE: (state, role) => {
            state.role = role
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        },
        SET_USER: (state, user) => {
            Object.assign(state, user)
        },
        LOGOUT: (state) => {
            Object.assign(state, {})
        },
    },
    actions: {
        Login({commit}, param) {
            return new Promise((resolve, reject) => {
                login(param).then(response => {
                    console.log(response)
                    const data = response.data
                    commit('SET_USER', data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })

            })

        },
        Logout({commit}) {
            return new Promise((resolve) => {
                auth.logout()
                commit('LOGOUT')
                resolve()
            })
        }
    },
    getters: {
        nameAbbreviation: state => {
            const arr = state.name.split(" ");
            let Abbr = '';
            for (const i of arr) {
                Abbr += i[0]
            }
            return Abbr
        },
        isManager: (state) => state.role === "MANAGER"
    }
}
export default user
// const user = {
//     state: {
//         token: '',
//         name: '',
//         welcome: '',
//         avatar: '',
//         roles: [],
//         info: {}
//     },
//
//     mutations: {
//         SET_TOKEN: (state, token) => {
//             state.token = token
//         },
//         SET_NAME: (state, { name, welcome }) => {
//             state.name = name
//             state.welcome = welcome
//         },
//         SET_AVATAR: (state, avatar) => {
//             state.avatar = avatar
//         },
//         SET_ROLES: (state, roles) => {
//             state.roles = roles
//         },
//         SET_INFO: (state, info) => {
//             state.info = info
//         }
//     },
//
//     actions: {
//
//         Login ({ commit }, userInfo) {
//             return new Promise((resolve, reject) => {
//                 login(userInfo).then(response => {
//                     const result = response.result
//                     storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
//                     commit('SET_TOKEN', result.token)
//                     resolve()
//                 }).catch(error => {
//                     reject(error)
//                 })
//             })
//         },
//
//
//         GetInfo ({ commit }) {
//             return new Promise((resolve, reject) => {
//                 getInfo().then(response => {
//                     const result = response.result
//
//                     if (result.role && result.role.permissions.length > 0) {
//                         const role = result.role
//                         role.permissions = result.role.permissions
//                         role.permissions.map(per => {
//                             if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
//                                 const action = per.actionEntitySet.map(action => { return action.action })
//                                 per.actionList = action
//                             }
//                         })
//                         role.permissionList = role.permissions.map(permission => { return permission.permissionId })
//                         commit('SET_ROLES', result.role)
//                         commit('SET_INFO', result)
//                     } else {
//                         reject(new Error('getInfo: roles must be a non-null array !'))
//                     }
//
//                     commit('SET_NAME', { name: result.name, welcome: welcome() })
//                     commit('SET_AVATAR', result.avatar)
//
//                     resolve(response)
//                 }).catch(error => {
//                     reject(error)
//                 })
//             })
//         },
//
//         // 登出
//         Logout ({ commit, state }) {
//             return new Promise((resolve) => {
//                 logout(state.token).then(() => {
//                     commit('SET_TOKEN', '')
//                     commit('SET_ROLES', [])
//                     storage.remove(ACCESS_TOKEN)
//                     resolve()
//                 }).catch(() => {
//                     resolve()
//                 }).finally(() => {
//                 })
//             })
//         }
//
//     }
// }
//