import request from "@/utils/request";

export async function getStaffInfo(id) {
    return request.get('/api/staff/' + id)
}

export async function updateStaffInfo(param) {
    return request.put('/api/staff', param)
}
export async function updateStaffInfoP(param) {
    return request.put('/api/staff', param)
}
// export async function updateStaffPass(param) {
//     return request.put('/api/staff', param)
// }
// export async function updatePass(param) {
//     return request.put('/api/auth/pass', param)
// }

export async function updateWorkingLimit(param) {
    return request.put('/api/working-limit', param)
}