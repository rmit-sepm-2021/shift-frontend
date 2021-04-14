import axios from "axios";
import {getToken} from "./auth";

export const BASE_URL = "http://localhost:8090";

let headers = {'content-type': 'application/json'}
let INSTANCE = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers,
});
INSTANCE.interceptors.request.use(
    config => {
        const token = getToken()
        if (token) {
            config.headers.authorization = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaWFuZyIsImV4cCI6MTU4NzIyNDM0NSwiaWF0IjoxNTg3MjE3MTQ1fQ.GvHmecWhnJSQp5pq9ccGLOok1DmYle55u3k7ZcJSvyJJAfb9BZushjvKa6vEdwLQvcmIBpKu0QrINUZIkvD_rQ"
function request(url, params, method) {

    return new Promise((resolve, reject) => {
        let data = {}

        if (method === 'post' || method === 'put') {
            data = {data: params}
        }
        if (method === 'get' || method === 'delete') {
            data = {params}
        }
        url = BASE_URL + url
        INSTANCE({url, method, ...data}).then((res) => {
            console.log(res)
            resolve(res['data'])
        }).catch((err) => {
            console.log(err)
            reject(err)
        }).finally(() => {

        })


    })
}

function get(url, params) {
    return request(url, params, 'get')
}

function put(url, params) {
    return request(url, params, 'put')
}

function delete_(url, params) {
    return request(url, params, 'delete')
}

function post(url, params) {
    return request(url, params, 'post')
}

function upload(url, formData, msg, method) {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            timeout: 10000,
        },
    }
    formData.append("data", JSON.stringify(msg))
    if (method === "post") {
        return axios.post(BASE_URL + url, formData, config).then(res => {
            console.log(res)
            return res.data.data
        }).catch(err => {
            console.log(err)
        });
    } else {
        return axios.put(BASE_URL + url, formData, config).then(res => {
            console.log(res)
            return res.data.data
        }).catch(err => {
            console.log(err)
        });
    }

}

export default {
    get, upload, post, delete_, put
}

//async function getList(url) {
//     let data = [];
//     let response = await INSTANCE
//         .get(url)
//         .then((res) => {
//             console.log(res);
//             data = res.data.data;
//             data.map((item) => {
//                 item["editable"] = false;
//                 item["checked"] = false;
//                 return null;
//             });
//             return data;
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// function request(url,params,method) {
//
//     return response;
// }
//
// /**
//  * @param  {String } url :api url
//  * @param  {Object } item : like {username: 123, password:123}
//  */
// export async function updateOne(url, item) {
//     await INSTANCE
//         .put(url, item)
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }
// /**
//  * @param  {String} url
//  * @param  {Object} param such as {userId : 1}
//  */
// export async function deleteOne(url, param) {
//     url = BASE_URL + url;
//     // NOTE: @RequestParam
//     await INSTANCE
//         .delete(url, { params: param })
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }
//     return new Promise ((resolve ,reject)=>{
//         let data={}
//
//
// export async function createOne(url, obj) {
//     const params = obj;
//     INSTANCE
//         .post(url, params)
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }
// /**
//  * @param  {String} url :(api/user/1)
//  */
// export async function getOne(url) {
//     let data = [];
//     let response = await INSTANCE
//         .get(url, "")
//         .then((res) => {
//             console.log(res);
//             data = res.data.data;
//             data["editable"] = false;
//             return data;
//         })
//         .catch((err) => {
//             console.error(err);
//         });
//
//     return response;
//
//     })
// }