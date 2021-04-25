import request from "@/utils/request";

const api = {
    GetShiftList: "/shift",
    GetShiftListByStaffId: "/shift/staff/",//+staffId
    //get shift id
    ShiftId: '/shift/{id}',
    // add new shift
    CreateShift: '/shift'
}

export async function getShiftList() {
    return request.get(api.GetShiftList)
}

export async function getShiftListByStaffId(staffId) {
    return request.get(api.GetShiftListByStaffId + staffId)
}
export async function deleteShift(id) {
    return request.delete_('/shift/' + id)
}


export async function createShift(param) {
    return request.post(api.CreateShift, param)
}
