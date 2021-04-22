import request from "@/utils/request";

export async function getAllStaff(param) {
    return request.get('/staff', param)
}

export async function getAllManager(param) {
    return request.get('/manager', param)
}

export async function createStaff(param) {

    return request.post('/staff', param)
}

export async function createManager(param) {
    return request.post('/manager', param)
}

