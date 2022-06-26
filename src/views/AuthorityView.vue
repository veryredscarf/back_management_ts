<template>
<el-button type="primary" @click="onSubmit">确认修改</el-button>
  <div>
    <el-tree
      ref="treeRef"
      :data="list"
      show-checkbox
      :check-strictly = "true"
      node-key="roleId"
      :default-checked-keys="authority"
      :props="{
        children:'roleList',
        label:'name'
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import {useRoute} from "vue-router"
import {QueryInit ,InitData } from "../types/authority";
import {getAuthorityList} from "../http/api"

export default defineComponent({

  setup(){
    const route = useRoute()
    console.log(route);
    
    const query:any = route.query
     const data  = reactive(new InitData(query.id,query.authority))

     onMounted(()=>{
      getAuthorityList().then(res=>{
        data.list = res.data 
        console.log("aaa",res);
        
      })
     })

     const onSubmit = ()=>{
      console.log(data.treeRef);
      console.log(data.treeRef.getCheckedKeys());
      
      
     }
    return {
      ...toRefs(data),
      onSubmit
    }
 }
});
</script>

<style scoped>
</style>