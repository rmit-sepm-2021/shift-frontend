import request from "@/utils/request";
const api={
    GetLocationList:'/api/location'
}
export async function getLocationList() {
    return request.get(api.GetLocationList)
}