import request from "@/utils/request";

const api = {
    UpdateManagerInfo: "/api/manager",
    getManagerInfo: (id) => "/api/manager/" + id,
}

export async function updateManagerInfo(param) {
    return request.put(api.UpdateManagerInfo, param)
}

export async function getManagerInfo(id) {
    return request.get(api.getManagerInfo(id))
}

