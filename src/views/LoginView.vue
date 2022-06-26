<template>
  <div class="login-box">

      <el-form
    ref="loginFormRef"
    :model="loginForm"
    status-icon
    :rules="rules"
    label-width="70px"
    class="loginForm"
  >
  
    <h1>后台管理系统</h1>

    <el-form-item label="账号:" prop="userName">
      <el-input v-model="loginForm.userName"  autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码:" prop="passWord">
      <el-input
        v-model="loginForm.passWord"
        type="password"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item>
      <el-button class="sub-btn" type="primary" @click="submitForm(loginFormRef)"
        >登录</el-button
      >

    </el-form-item>
  </el-form>
    
  </div>
</template>

<script lang="ts"> 

// 引入defineComponent的原因  当使用script的语言选择ts时，会默认带入这个对象。这样子是在setup函数中会有很多的智能提示
import { defineComponent, reactive, toRefs } from 'vue'

import  {initData} from "../types/login"  // 引入ts文件规范的数据格式
import type { FormInstance } from "element-plus"

import {login} from "../http/api"

// 引入路由的方法
import { useRouter}  from "vue-router"
 



export default defineComponent({
  setup() {
    const data = reactive(new initData());
    const router = useRouter()  // 返回的是router对象
    const rules ={
        userName:[
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 24, message: '账号长度在6-24之间', trigger: 'blur' },
          
        ],
        passWord:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 24, message: '密码长度在6-24之间', trigger: 'blur'},          
        ]
      }

      const submitForm = (loginFormRef:FormInstance)=>{
        loginFormRef?.validate((valid:boolean)=>{
          if(valid){
            console.log("验证通过");
            login(data.loginForm).then(res => {
              console.log(res);
              // 保存token
              localStorage.setItem("token",res.data.token)
              router.push("/")  // 登录成功返回首页
            })
          }
        })
        console.log();
        
      }

    return {
      ...toRefs(data),
      rules,
      submitForm

    }
  },
})
</script>

<style lang="scss" scoped>
.login-box{
  width: 100%;
  height: 100%;
  background: url("../assets/bg.webp") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding:200px 0 0 0 ;
    .loginForm{
      width: 400px;
      padding: 20px;
      background-color: white;
      border-radius: 20px;
      margin: 0 auto;
      .sub-btn{
        width: 100%;
      }
      h1{
        text-align: center;
        margin: 20px 0;
      }
    }
  
}
</style>
