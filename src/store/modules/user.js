import { getToken, setToken, removeToken } from "@/utils/auth";
import axios from 'axios'
// 存储用户令牌和角色信息
const state = {
  token: getToken(),
  roles: []
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录动作  user/login    dispatch('user/login')
  async login({ commit}, userInfo) {
    return new Promise((resolve,reject) => {
      axios.post('http://localhost:3000/login', {
       ...userInfo
      }).then(res => {
        let {data} =res
        if(!data.error) {
          resolve(data)
        }

      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取用户角色等信息
  getInfo({commit, state}) {
    return new Promise((resolve)=>{
      setTimeout(()=>{
        const roles = window.sessionStorage.getItem('role') === 'admin'?['admin']: ['visitor']
        commit('SET_ROLES', roles)
        resolve({roles})
      },1000)
    })
  },
  // 重置令牌
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', []);
      removeToken()
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state, mutations, actions
}
