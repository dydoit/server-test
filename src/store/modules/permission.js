import {asyncRoutes, constRoutes} from '@/router'

// 根据路由meta.role确定当前用户拥有访问权限
function hasPermission(roles, route) {
  if(route.meta && route.meta.roles) {
    let role = roles[0]
    let isFlag = route.meta.roles.includes(role)
    return isFlag
    // return roles.some(role =>route.meta.roles.includes(role))
  } else {
    // 如果没有设置roles则无需判断，即可访问
    return true
  }
}
// 递归过滤AsyncRoutes路由表
export function filterAsyncRoutes(routes, roles) {
  const res = []
  console.log('routes', routes)
  routes.forEach(route => {
    const tmp = {...route}
    // 如果用户有访问权限则加入结果路由表
    if(hasPermission(roles, tmp)) {
      // 如果存在子路由则递归过滤
      if(tmp.children) {
        debugger
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }

  })
  console.log('res', res)
  return res;
}
const state = {
  routes: [], // 完整路由表
  addRoutes: [] // 用户可访问路由表
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    // addRoutes是用户可以访问的权限页面
    state.addRoutes = routes
    // routes是完整的路由表
    state.routes = constRoutes.concat(routes)
  }
}
const actions = {
  // 动态路由生成
  generateRoutes({commit}, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      // 管理员拥有完整访问权限
      if(roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      }else {
        // 根据角色过滤处理
        console.log('asyncRoutes', asyncRoutes)
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes)
    })
  }
}
export default {
  namespaced: true,
  state, mutations,actions
}
