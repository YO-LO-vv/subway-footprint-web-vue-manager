import http from './http.js'

// // 获取验证码，这个函数指的是使用GET请求请求目标服务器的

// export function getCaptcha() {
//     return http.get("/captcha")
// }  
// // 验证用户名\密码，这里指的是使用POST方法请求Login接口，并携带params对象作为参数。
// export function verifyUserNameAPI(params) {
//     return http.post("/login", params)
// }
// https://thelittlestar.cn:8088/award/getAward?aid=2222
export function getAward(params) {
    return http.post_q("/award/getAward", params)
}

export function getAllSubways(params) {
    return http.get("/Subway/getAllSubways",params)
}

export function getAllAwards(params) {
    return http.post("/award/getAllAwards",params)
}

export function getMerchantAwards(params) {
    return http.post_q("/award/getMerchantAwards", params)
}

export function deleteAward(params) {
    return http.post_q("/award/deleteAward", params)
}

export function addAward(params) {
    return http.post("/award/addAward", params)
}