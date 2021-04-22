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
    UserMenu: '/user/nav'
}

export async function login(loginParam) {
    return request.post(userApi.Login, loginParam)
}