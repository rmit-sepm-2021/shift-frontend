import request from "@/utils/request";

const api = {
    GetShiftList: "/shift",
    GetShiftListByStaffId: "/shift/staff/"//+staffId,

}

export async function getShiftList() {
    return request.get(api.GetShiftList)
}

export async function getShiftListByStaffId(staffId) {
    return request.get(api.GetShiftListByStaffId + staffId)
}
