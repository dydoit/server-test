import router from './router'
import store from './store'
const whiteList = ['/login'] // 无需令牌白名单
router.beforeEach(async (to, from , next) => {
  if(window.isLogin) {
    if(to.path == '/login') {
      next({path: '/'})
    }else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if(hasRoles) {
        next()
      }else {
        const {roles} = await store.dispatch('user/getInfo')
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
        router.addRoutes(accessRoutes)
        next({replace:true})
      }
    }
  }else {
    // 用户无令牌
    if(whiteList.indexOf(to.path)!==-1) {
      // 白名单路由放过
      next()
    } else {
      // 重定向至登录页
     // next(`/login?redirect=${to.path}`)
     next('/login')
    }
  }
})
