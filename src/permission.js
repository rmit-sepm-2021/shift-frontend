import router from './router'

// const loginRoutePath = '/login'
const defaultPath = '/dashboard'
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    // if (to.path !== loginRoutePath && !auth.isLogged()) {
    //     // const loginParams = {
    //     //     email: "mask@test.com", password: "1234567"
    //     // }
    //     // Login(loginParams)
    //     next({path: loginRoutePath})
    //     // next({path: defaultPath})
    // } else if (to.path === '/') {
    //     next({path: defaultPath})
    // } else {
    //     next()
    // }
    if (to.path === '/') {
        next({path: defaultPath})
    } else {
        next()
    }
})