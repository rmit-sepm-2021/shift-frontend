import router from './router'
import auth from '@/utils/auth'

const loginRoutePath = '/login'
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.path !== loginRoutePath && !auth.isLogged()) {
        next({path: loginRoutePath})
    } else {
        next()
    }
})