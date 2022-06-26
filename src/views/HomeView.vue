<template>
    
    <el-container>
      <el-header height="80px">
        <!-- 使用elementUI的layout布局，左中右布局 -->
        <el-row :gutter="20">
          <el-col :span="4"> <img class="logo" src="../assets/logo.png" alt="logo">
          
          </el-col>
          <el-col :span="16"><h2>后台系统</h2></el-col>
          <el-col class="btn-text" :span="4"><el-button type="text">Tina</el-button></el-col>
        </el-row>

        <div>
         
        </div>

      </el-header>
      <el-container>
        <el-aside width="200px">
           <el-menu
              router
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              :default-active="active"
              text-color="#fff"
 
            >
              <el-menu-item v-for="item in list" :key="item.path" :index="item.path">
                <el-icon><icon-menu /></el-icon>
                <span>{{item.meta.title}}</span>
              </el-menu-item>

            </el-menu>
           
          </el-aside>

        <el-main> 
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useRouter,useRoute} from "vue-router"


export default defineComponent({
  name: 'HomeView',
  components: {
    
  },
  setup(){
    const router = useRouter()
    const route = useRoute()
    const list  = router.getRoutes().filter(item => item.meta.isShow)
    console.log(list);
    return {
      list,
      active:route.path  // 获取当前的路径 ，设置路径对应的列表菜单被选中
    }
  }
});
</script>

<style lang="scss" scoped>
  .logo{
    height: 80px;
    -webkit-user-drag: none;
  }
  h2{
    text-align: center;
    color: #fff;
    line-height: 80px;
  }
  .el-header{
    background-color: #545c64;
  }
  .btn-text{
    text-align: right;
    line-height: 80px;
  }
  .el-button--text{
    color: white;
  }
  .btn-text:hover{
    color: rgb(73, 160, 227);
  }

  .el-aside{
    .el-menu{
      height: calc(100vh - 80px);

    }
  }
  .el-main{
      height: calc(100vh - 80px);
      overflow-y: auto;
  }
</style>
