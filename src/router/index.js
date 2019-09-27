import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)

// 通用页面
const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path:'/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
        name:'Home',
        meta: {
          title: 'Home'
        }
      }
    ]
  }
]
// 权限页面
export const asyncRoutes = [
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    children: [
      {
        path: 'index',
        component:() => import(/* webpackChunkName: "home"*/ '@/views/About.vue'),
        meta: {
          title:'About',
          roles: ['admin', 'editor']
        }
      }
    ]
  }
]
export default new Router({
  mode: 'history',
  routes: constRoutes
})
