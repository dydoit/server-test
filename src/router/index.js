import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)

// 通用页面
export const constRoutes = [
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
          auth: true,
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
          auth: true,
          roles: ['visitor']
        }
      }
    ]
  },
  {
    path: '/shop',
    component: () => import('@/views/Shop.vue'),
    meta: {
      auth: true,
      roles: ['admin']
    }
  }
]
const router = new Router({
  mode: 'history',
  routes: constRoutes

})
export default router
