import request from "@/utils/request";

export async function getStaffInfo(id) {
    return request.get('/staff/' + id)
}

export async function updateStaffInfo(param) {
    return request.put('/staff', param)
}

export async function updateWorkingLimit(param) {
    return request.put('/working-limit', param)
}