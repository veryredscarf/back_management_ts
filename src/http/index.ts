import axios from "axios";
import { ElMessage } from "element-plus";

// 创建http实例
const $http = axios.create({    
  baseURL:'https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api',  // 设置请求的baseurl
  timeout:2000,  // 设置超时时间
  headers:{      // 请求头
    "Content-Type":"application/json;charset=utf-8"
  },

}) 

// 定义枚举，已知后端返回数据的格式
enum MSSG {
  "操作成功" = 200,
  "密码错误" ,
  "账号错误",
  "请求异常"

}

// 请求拦截，在发送请求之前对header，或者数据做进一步处理
$http.interceptors.request.use(config => {
  // 由于ts的数据类型检测 此处会有两个问题， ts中使用的数据要有类型，当数据可能存在为null时，ts编译器会提示出错误
  // 第一，前面在创建实例时，没有添加配置对象，导致config是null
  // 第二则可能是由于前面配置了config，但是没有配置header，
  // 第三则是localStorage.getItem("token")可能取值为null，但是token只能为boolean和string类型
  config.headers = config.headers || {}

  if(localStorage.getItem("token")){
    config.headers.token = localStorage.getItem("token") || ''  // 请求配置token
  }

  return config  // 配置好config之后，需要将config导出去，后续请求才能正确处理

})


// 响应拦截  在情求返回结果时 ,判断请求是否成功 ，主要是对成功做一个处理
$http.interceptors.response.use(res => {

  const code :number = res.data?.code
  if(code!=200){

    ElMessage.error(MSSG[code]) // 并且通过element封装的消息提示，把错误提示出来

    return Promise.reject(res.data)  // 如果状态码不是200，表示请求错误，返回一个promise错误函数，并且把错误数据传出去
  }

  return res.data  // 请求成功，返回数据
  // {
  //   code:200,
  //   data:{},
  //   msg:'请求成功'
  // }
})

export default $http
