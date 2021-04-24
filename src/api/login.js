import request from "@/utils/request";

const userApi = {
    Login: '/auth/login',
    Logout: '/auth/logout',
    ForgePassword: '/auth/forge-password',
    Register: '/auth/register',
    twoStepCode: '/auth/2step-code',
    SendSms: '/account/sms',
    SendSmsErr: '/account/sms_err',
    // get my info
    UserInfo: '/user/info',
    UserMenu: '/user/nav',
    // add new shift
    CreateShift: '/shift'
}

export async function login(loginParam) {
    return request.post(userApi.Login, loginParam)
}

export async function createShift(param) {
    return request.post(userApi.CreateShift, param)
}
export async function getStaffInfo(id) {
    return request.get('/staff/'+id)
}

export async function updateStaffInfo(param) {
    return request.put('/staff/update',param)
}