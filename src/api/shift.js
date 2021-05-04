import request from "@/utils/request";

const api = {
    GetShiftList: "/api/shift",
    GetShiftListByStaffId: "/api/shift/staff/",//+staffId
    //get shift id
//    ShiftId: '/api/shift/{id}',
    // add new shift
    CreateShift: '/api/shift',
    AcceptAllocation: '/api/staff/accept-allocation',
    RejectAllocation: '/api/staff/reject-allocation',
    GetAvailableStaff:'/api/shift/availableStaff/',//+shiftId
    AllocateShift:'/api/shift/allocation'
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

export async function acceptAllocation(param) {
    return request.post(api.AcceptAllocation, param)
}

export async function rejectAllocation(param) {
    return request.post(api.RejectAllocation, param)
}

export async function getAvailableStaff(shiftId) {
    return request.get(api.GetAvailableStaff + shiftId)
}

export async function allocateShift(param) {
    return request.put(api.AllocateShift ,param)
}