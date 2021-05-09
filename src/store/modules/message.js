// import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'
//

const user = {
    state: {
        size: 0
    },
    mutations: {
        SET_SIZE: (state, size) => {
            state.size = size
        },
        SIZE_DECREMENT: (state) => {
            state.size = state.size - 1
        },
    },
    actions: {},
    getters: {}
}
export default user
