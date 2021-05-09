import router from './router'
import auth from '@/utils/auth.js'

const loginRoutePath = '/login'
const defaultPath = '/dashboard'
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.path !== loginRoutePath && !auth.isLogged()) {
        next({path: loginRoutePath})
        // next({path: defaultPath})
    } else if (to.path === '/') {
        next({path: defaultPath})
    } else {
        next()
    }
    if (to.path === '/') {
        next({path: defaultPath})
    } else {
        next()
    }
})