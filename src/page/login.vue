<template>
  <div>
    <h1 class="title" style="font-size:50px">subway-footprint（商户端）</h1>
    <div class="background">
      <img :src="imgSrc" style="width: 100%; height: 100%" alt=""/>
    </div>
    <div>
      <el-form :model="LoginForm" status-icon :rules="rules" ref="LoginRef" label-width="50px"
               class="registerContainer">
        <h3 class="LoginTitle">登录</h3>
        <el-form-item  label="账户" prop="user">
          <el-input v-model="LoginForm.user" placeholder="请输入用户名或邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="pass">
          <el-input v-model="LoginForm.pass" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {login} from '../../api/api'
import {reactive} from "vue";
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { useRouter } from 'vue-router'
export default {
  name: "login",
  components: {},
  setup() {
    const router = useRouter()
    const validateUser = (rule, value, callback) => {
      if (value == '' || value == undefined || value == null) {
        return callback(new Error('用户名或邮箱不能为空'));
      } else {
        callback();
      }
    }

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }

    const LoginRef = ref(null)
    const LoginForm = reactive({
      user: '',
      pass: '',
    })
    const rules = reactive({
      user: [
        {validator: validateUser, trigger: 'blur'}
      ],
      pass: [
        {validator: validatePass, trigger: 'blur'}
      ],
    })

    const submitForm = () =>{
      LoginRef.value.validate((valid) => {
        if (valid) {
          login({
            account: LoginForm.user,
            password: LoginForm.pass
          }).then((res) => {
              //存储token
            if(res.data.code==200) {
              const tokenStr = res.data.data;
              window.sessionStorage.setItem('tokenStr', tokenStr);
              localStorage.setItem("uid", LoginForm.user);
              ElMessage.success(window.sessionStorage.getItem('tokenStr'));
              console.log(tokenStr)
              ElMessage.success('welcome');
              router.push('/index/toDo');
            }else{
              ElMessage.error(res.data.message);
            }
          }).catch((err) => console.log(err));
        }});
    }

    return {
      router,
      LoginRef,
      LoginForm,
      rules,
      imgSrc: require('/static/background.jpeg'),
      submitForm
    };
  }
};
</script>

<style scoped>
.registerContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 200px 800px auto;
  width: 350px;
  padding: 5px 15px 5px 15px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(109, 101, 101, 0.8);
  box-shadow: 0 0 25px #333131;
  z-index: 1;
  position: absolute;
}

.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.LoginTitle {
  margin: 8px auto 40px auto;
  text-align: center;
}

.title {
  margin: 100px 150px auto;
  z-index: 1;
  position: absolute;
}
</style>
