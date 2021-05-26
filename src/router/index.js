import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/index',
    component:() => import("@/views/index"),
    children:[
      {
        path: '/index',
        name: 'index',
        component:() => import("@/views/home/index"),
        meta:{name:'首页',banner:true,foot:true}
      },
      {
        path: '/situation',
        name: 'situation',
        component:() => import("@/views/situation/index"),
        meta:{name:'新区概况',banner:true,foot:true}
      },
      {
        path: '/about',
        name: 'about',
        component:() => import("@/views/about/index"),
        meta:{name:'关于我们',banner:true,foot:true}
      },
      {
        path: '/news',
        name: 'news',
        component:() => import("@/views/news/index"),
        meta:{name:'新闻中心',banner:true,foot:true}
      },
      {
        path: '/service',
        name: 'service',
        component:() => import("@/views/service/index"),
        meta:{name:'专班服务',banner:true,foot:true}
    
      },
      {
        path: '/party',
        name: 'party',
        component:() => import("@/views/party/index"),
        meta:{name:'党建工作',banner:true,foot:true}
      },
      {
        path: '/resource',
        name: 'resource',
        component:() => import("@/views/resource/index"),
        meta:{name:'人力资源',banner:true,foot:true}
      },
      // 详情页
      {
        path: '/details',
        name: 'details',
        component:() => import("@/views/dynamic/details"),
        meta:{foot:true}
      },
      // 列表页
      {
        path: '/list',
        name: 'list',
        component:() => import("@/views/dynamic/list"),
      },
      // 搜索页面
      {
        path: '/seach',
        name: 'seach',
        component:() => import("@/views/dynamic/seach"),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  window.scrollTo(0,0);
  if(from.name !== 'seach' && from.name !== 'details'){
    sessionStorage.setItem('history',from.name)
  }
  next()
})
export default router
