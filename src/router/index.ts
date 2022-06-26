import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {getRouter} from '../http/api'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:"order"
    // children:[
    //   {
    //     path:'order',
    //     name:'order',
    //     // 你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象的meta属性来实现，
    //     // 并且它可以在路由地址和导航守卫上都被访问到。定义路由的时候你可以这样配置 meta 字段：
    //     meta:{
    //       isShow:true,
    //       title:'订单列表'
    //     },
    //     component: () => import(/* webpackChunkName: "about" */ '../views/OrderView.vue')
    //   },
    //   {
    //     path:'userList',
    //     name:'userList',
    //     meta:{
    //       isShow:true,
    //       title:'用户列表'
    //     },
    //     component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
    //   },{
    //     path:'roleList',
    //     name:'roleList',
    //     meta:{
    //       isShow:true,
    //       title:'角色列表'
    //     },
    //     component: () => import(/* webpackChunkName: "about" */ '../views/RoleView.vue')
    //   },{
    //     path:'authorityList',
    //     name:'authorityList',
    //     meta:{
    //       isShow:false,
    //       title:'权限列表'
    //     },
    //     component: () => import(/* webpackChunkName: "about" */ '../views/AuthorityView.vue')
    //   }
    // ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',

    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由拦截
router.beforeEach(async (to)=>{
  console.log(to.path);
  
  // 如果没有登录只能进入登录界面
  const token:string|null = localStorage.getItem("token")
  if(!token &&to.path!=='/login'){
    
    return '/login'  // 如果用户没有登录，那么用户跳转页面也只能跳转到登录页面
  }else if(to.path!=='login'&&token){ // 如果用户登录并且跳转的页面不是登录页

    // 由于判断函数是每次路由跳转之前都要判断，因此，设置判断，是否已经动态添加了路由，通过路由的router.getRoutes()获取路由信息，判断长度即可
    if(router.getRoutes().length ===3){
      // 动态添加路由
      // 1.获取当前登陆者所拥有的登录权限，和路由信息
      let routerData:any =  await getRouter();   // 设置动态获取请求的数据
      routerData = routerData.data

      routerData.forEach((element:any) => {
        const routerObj:RouteRecordRaw = {
          path:element.name,
          name:element.name,
          meta:element.meta,
          component: () => import(/* webpackChunkName: "[request]" */ `../views/${element.path}.vue`)
        }
        router.addRoute("home",routerObj)  // 向home路由添加子路由
      });
      router.replace(to.path)  // 并且重新渲染刚才要跳转的路由
    }

  }else if(to.path ==='/login'&&token){ // 如果用户登录，就不能跳转登录页面了
    return '/'
  }
})

export default router
