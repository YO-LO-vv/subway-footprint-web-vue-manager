import http from "./http.js";

export function getAward(params) {
  return http.post_q("/award/getAward", params);
}

export function getAllSubways(params) {
  return http.get("/Subway/getAllSubways", params);
}

export function getAllAwards(params) {
  return http.post("/award/getAllAwards", params);
}

export function getMerchantAwards(params) {
  return http.post_q("/award/getMerchantAwards", params);
}

export function deleteAward(params) {
  return http.post_q("/award/deleteAward", params);
}

export function addAward(params) {
  return http.post("/award/addAward", params);
}

export function updateAward(params) {
  return http.post("/award/updateAward", params);
}

export function login(params) {
  return http.post("/manager/login", params);
}

export function getMerchant() {
  return http.post("/merchant/getMerchant");
}

export function getCode(params) {
  return http.post("/merchant/sendRegistEmail", params);
}

export function regist(params) {
  return http.post("/merchant/regist", params);
}

export function changePassword(params) {
  return http.post("/merchant/changePassword", params);
}
