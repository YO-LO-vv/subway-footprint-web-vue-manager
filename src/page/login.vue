<template>
    <div id="backcont">
        <div class="dz-content">
            <div class="login-cont">
                <div class="dz-title">芝士雪豹 </div>
                <div class="dz-user">
                    <p>账号</p>
                    <el-input v-model="account" placeholder="请输入账号" flex="1"/>
                </div>
                <div class="dz-user">
                    <p>密码</p>
                    <el-input v-model="password" placeholder="请输入密码" flex="1"/>
                </div>

                <div class="reg-view" @click="regi = regi == '登录'? '注册':'登录'"><p>{{regi}}</p></div>

                <el-button v-if="regi == '注册'" type="success" class="login-btn" @click="signin">登录</el-button>
                <el-button v-else type="success" class="login-btn" @click="regis">注册</el-button>
            </div>
        </div>
    </div>
    222
</template>

<script>
import {reactive, toRefs} from 'vue'

export default{
    setup(){
        const user=reactive({
            account:'',
            password:'',
            regi:'注册'
        })

        const signin= ()=>{

        }

         const regis= ()=>{
            
        }
        return{...toRefs(user),signin,regis}
    }
}
</script>

<style>

</style>