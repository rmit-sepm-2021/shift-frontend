import request from "@/utils/request";

export async function getAllStaff(param) {
    return request.get('/api/staff', param)
}

export async function getAllManager(param) {
    return request.get('/api/manager', param)
}

export async function createStaff(param) {

    return request.post('/api/staff', param)
}

export async function createManager(param) {
    return request.post('/api/manager', param)
}

