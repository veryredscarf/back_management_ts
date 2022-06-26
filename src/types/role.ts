export interface ListInit{
  roleName:string,
  roleId:number,
  authority:number[],
}



interface SelectDataInit{
  roleName:string,
  roleId:number,
}

export class InitData{
  selectData:SelectDataInit = {
    roleName:"",
    roleId:0,
  }
  list:ListInit[] = []  // 由于手动给数据做分页处理，原来的表单数据被手动处理为2维数据
  listData:[ListInit][] = []

  dialogFormVisible = false
  isAdd = false
}