<template>
  <div>
    <div class="select-box">
       <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nikeName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择" >
            <el-option
               label="全部"
               :value="0"
            />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>


        </el-form-item>
      </el-form>
    </div>

<!-- 表格组件 -->
    <el-table border :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nikeName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色" >
        <template #default="scope">
          <el-button
            v-for=" i in scope.row.role"
            :key="i.role"
            type="text"
            text:true
            size="small"
          >
            {{i.roleName}}
          </el-button>
      </template>
      </el-table-column>
      <el-table-column prop="role" label="操作" >
        <template #default="scope">
          <el-button
            size="small"
            @click="editFun(scope.row)"
          >
        编辑
          </el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
    <!-- 表单弹出框 -->
    <el-dialog v-model="dialogFormVisible" title="编辑信息" >
    <el-form :model="active">
      <el-form-item label="姓名" :label-width="50" >
        <el-input v-model="active.nikeName" autocomplete="off" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色" :label-width="50">
        <el-select multiple v-model="active.role" placeholder="请选择角色"  >
           <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="userChange"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>


</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import {InitData,ListInit} from "../types/user"
import {getUserList,getRoleList} from "../http/api"

export default defineComponent({
  setup(){
    const data = reactive(new InitData())

    onMounted(()=>{
      getUserList().then(res =>{
        data.list = res.data
        data.listData = res.data  // 保存源数据
        console.log(res);
        
      })
      getRoleList().then(res =>{
        data.roleList = res.data
        console.log(res);
        
      })
    })
    const editFun=(row:ListInit)=>{
      data.active = {
        id:row.id,
        userName:row.userName,
        nikeName:row.nikeName,
        role:row.role.map((item:any) => item.role||item.roleId)
      }
      data.dialogFormVisible = true
      

    }
    const userChange =()=>{
      
      const obj:any = data.list.find((v:any)=>v.id === data.active.id)
      obj.nikeName = data.active.nikeName
      obj.role = data.roleList.filter((item:any) =>data.active.role.indexOf(item.roleId) !== -1)
      data.dialogFormVisible = false
    }


    const onSubmit = ()=>{
      let arr:[ListInit][] = []

      if(data.selectData.nikeName||data.selectData.role){
        if(data.selectData.nikeName){        
          arr = data.listData.filter((item:any) => item.nikeName.indexOf(data.selectData.nikeName) !=-1)
        }
        if(data.selectData.role){
          arr = (data.selectData.nikeName?arr:data.listData).filter((item:any) => item.role.find((i:any) => i.role ===data.selectData.role) )
        }
      }else{
        arr = data.listData
      }
      data.list = arr
    }
    return {
      ...toRefs(data),
      onSubmit,
      editFun,
      userChange
    }
 }
});
</script>

<style scoped>
</style>