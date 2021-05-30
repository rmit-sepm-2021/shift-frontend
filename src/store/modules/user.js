// import storage from 'store'
import {login} from '@/api/login'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'
//

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
