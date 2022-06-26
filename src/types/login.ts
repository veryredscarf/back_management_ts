import type { FormInstance } from "element-plus"
import { ref } from "vue"

export interface loginForm {
  username:string,
  password:string
}

export class initData {
  loginForm:loginForm = {
    username : '',
    password: ''
  }
  loginFormRef = ref<FormInstance>()
}
