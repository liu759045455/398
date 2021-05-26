import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/protection'
}, {
  path: '/protection',
  name: '连云港徐圩新区环保治理攻坚大队',
  component: () => import('@v/index.vue'),
  children: [{
    path: '/protection',
    redirect: '/protection/index'
  }, {
    path: '/protection/index',
    name: '首页',
    alias: "nav",
    component: () => import('@c/protection/index.vue'),
  }, {
    path: '/protection/situation',
    name: '新区概况',
    alias: "nav",
    component: () => import('@c/protection/situation.vue')
  }, {
    path: '/protection/about',
    name: '关于我们',
    alias: "nav",
    component: () => import('@c/protection/about.vue')
  }, {
    path: '/protection/news',
    name: '新闻中心',
    alias: "nav",
    component: () => import('@c/protection/news.vue'),
    children: [
        {
          path: "/protection/news/great",
          name: "大队新闻",
          component: () => import("@c/news/great.vue"),
          children: [{
            path: "/protection/news",
            name: "正文",
            component: () => import("@c/content/index.vue")
          }, ]
        },
      {
        path: "/protection/news/media",
        name: "媒体报道",
        component: () => import("@c/news/media.vue"),
        children: [{
          path: "/protection/news",
          name: "正文",
          component: () => import("@c/content/index.vue")
        }, ]
      },
      {
        path: "/protection/news/policy",
        name: "政策文件",
        component: () => import("@c/news/policy.vue"),
        children: [{
          path: "/protection/news",
          name: "正文",
          component: () => import("@c/content/index.vue")
        }, ]
      },
    ]
  }, 
  // {
  //   path: '/protection/service',
  //   name: '专班服务',
  //   alias: "nav",
  //   component: () => import('@c/protection/service.vue'),
  //   children: [{
  //     path: "/protection/service/bearfruit",
  //     name: "取得成果",
  //     component: () => import("@c/service/bearfruit.vue"),
  //     children: [{
  //       path: "/protection/service",
  //       name: "正文",
  //       component: () => import("@c/content/index.vue")
  //     }, ]
  //   }, {
  //     path: "/protection/service/disclosure",
  //     name: "信息发布",
  //     component: () => import("@c/service/disclosure.vue"),
  //     children: [{
  //       path: "/protection/service",
  //       name: "正文",
  //       component: () => import("@c/content/index.vue")
  //     }, ]
  //   }]
  // }, 
  
  {
    path: '/protection/party',
    alias: "nav",
    name: '党建工作',
    component: () => import('@c/protection/party.vue'),
    children: [
        {
        path: "/protection/party/index",
        name: "大队党建",
        component: () => import("@c/party/index.vue"),
          children: [
            {
            path: "/protection/party",
            name: "正文",
            component: () => import("@c/content/index.vue")
          }, 
      ]
      }, 
      {
        path: "/protection/party/activities",
        name: "专题活动",
        component: () => import("@c/party/activities.vue"),
        children: [
            {
            path: "/protection/party",
            name: "正文",
            component: () => import("@c/content/index.vue")
          },
       ]
      }, 
  ]
  }, {
    path: '/protection/resources',
    alias: "nav",
    name: '人力资源',
    component: () => import('@c/protection/resources.vue'),
    children: [{
      path: "/protection/resources/training",
      name: "培训发展",
      component: () => import("@c/resources/training.vue"),
      children: [{
        path: "/protection/resources",
        name: "正文",
        component: () => import("@c/content/index.vue")
      }, ]
    }, ]
  }, {
    path: '/protection/search',
    name: '搜索内容',
    component: () => import('@c/search/index.vue')
  }]
}]




// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  routes,
  linkActiveClass: "active-router"
});


export default router