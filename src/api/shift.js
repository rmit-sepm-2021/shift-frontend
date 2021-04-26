import request from "@/utils/request";

const api = {
    GetShiftList: "/api/shift",
    GetShiftListByStaffId: "/api/shift/staff/",//+staffId
    //get shift id
//    ShiftId: '/api/shift/{id}',
    // add new shift
    CreateShift: '/api/shift'
}

export async function getShiftList() {
    return request.get(api.GetShiftList)
}

export async function getShiftListByStaffId(staffId) {
    return request.get(api.GetShiftListByStaffId + staffId)
}
export async function deleteShift(id) {
    return request.delete_('/api/shift/' + id)
}


export async function createShift(param) {
    return request.post(api.CreateShift, param)
}
