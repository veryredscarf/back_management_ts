export interface ListInit{
  userId:number,
  id:number,
  title:string,
  body:string

}

interface SelectDataInit{
  title:string,
  body:string,
  page:number,   // 分页
  count:number   // 总数
}

export class InitData{
  selectData:SelectDataInit = {
    title:"",
    body:"",
    page:0,
    count:0
  }
  list:[ListInit][] = []  // 由于手动给数据做分页处理，原来的表单数据被手动处理为2维数据

  dataList:ListInit[] =[]
}