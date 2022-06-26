export interface QueryInit{
  id:number,
  authority:string
}
interface ListInit {
  name:string,
  roleId:number,
  viewRole?:string,
  roleList?:ListInit[]
}
export class InitData {
  id:number;
  authority:number[]
  list:ListInit[]=[]
  treeRef:any

  constructor(id:number,authority:string){
    this.id = id
    this.authority = authority.split(',').map(v=>Number(v))

  }

}