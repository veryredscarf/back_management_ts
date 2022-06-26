import $http from "./index";

interface loginData {
  username:string,
  password:string
}


export const login =(data:loginData) => $http({url:"/login",method:"post",data})
export const getList=(data:any) =>$http({url:"/getList",method:"get",data})

// 获取用户列表
export const getUserList=() =>$http({url:"/getUserList",method:"get"})

// 获取角色列表
export const getRoleList=() =>$http({url:"/getRoleList",method:"get"})

// 获取权限列表
export const getAuthorityList=() =>$http({url:"/geTauthority",method:"get"})

// 获取动态路由信息
export const getRouter=() =>$http({url:"/getRouter",method:"get"})


