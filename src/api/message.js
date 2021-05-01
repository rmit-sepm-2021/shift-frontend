import request from "@/utils/request";

const api = {
    PostMessage: '/api/message',
    GetMessageListByStaffId: (id) => `/api/staff/${id}/message`,
    GetMessageListByManagerId: (id) => `/api/manager/${id}/message`
}

export async function postMessage(param) {
    return request.post(api.PostMessage, param)
}

export async function getMessageListByStaffId(id) {
    return request.get(api.GetMessageListByStaffId(id))
}

export async function getMessageListByManagerId(id) {
    return request.get(api.GetMessageListByManagerId(id))
}