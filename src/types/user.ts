export interface ListInit{
  id:number,
  nikeName:string,
  userName:string,
  role:RoleInit[],
}
export interface ActiveInit{
  id:number,
  nikeName:string,
  userName:string,
  role:number[],
}

interface RoleInit{
  role:number,
  roleName:string
}

interface SelectDataInit{
  nikeName:string,
  role:number,
}

interface RoleListInit {
  roleName:string,
  roleId:number,
  suthorty:number[]
}
 
export class InitData{
  selectData:SelectDataInit = {
    nikeName:"",
    role:0,
  }
  list:[ListInit][] = []  // 由于手动给数据做分页处理，原来的表单数据被手动处理为2维数据
  listData:[ListInit][] = []
  roleList:RoleListInit[] = []
  active:ActiveInit = {
    id:0,
    nikeName:"",
    userName:"",
    role:[]
  }
  dialogFormVisible = false
}