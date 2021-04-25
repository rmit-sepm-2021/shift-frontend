import request from "@/utils/request";
const api={
    GetLocationList:'/location'
}
export async function getLocationList() {
    return request.get(api.GetLocationList)
}