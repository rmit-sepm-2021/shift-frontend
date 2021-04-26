import request from "@/utils/request";

export async function postFreeTime(param) {
    return request.post('/api/staff/available-time', param)
}
export async function getFreeTime(param) {
    // {staffId: 0}
    return request.get('/api/staff/available-time', param)
}