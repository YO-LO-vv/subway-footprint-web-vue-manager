<template>
  <div class="ordering">
    <el-button @click="fas">managerToken</el-button>
    <el-button @click="getM">getMerchant</el-button>
    <el-button @click="changeP">getMerchant</el-button>
  </div>
</template>

<script>
import { getMerchant,changePassword } from "../../api/api";

export default {
  setup() {
    const fas = () => {
    //   var key =
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYW5hZ2VySUQiOiJDbGF5IiwiZXhwIjoxNjYyMDIwMzMzLCJhY2NvdW50IjoiQ2xheSJ9.WLQHOMV-_-hC7jSar7k-LvmyjrLYz-DRAQzEicNYjNI";
      var key="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtaWQiOiI5MTk0NDA2NzZAcXEuY29tIiwiZXhwIjoxNjYyMzQ2ODg4fQ.XprNY1F1irrnh9JgSsL4MXCvlQbQgxp9ESCqXsOlJGo"
      localStorage.setItem("token", JSON.stringify(key)); //缓存本地
    };
    const getM = () => {
      getMerchant()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
    const changeP = () => {
      changePassword()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
    return { fas, getM,changeP};
  },
};
</script>

<style></style>
