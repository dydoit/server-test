<template>
  <div class="container-wrapper">
    <h4>欢迎来到铸轩的世界</h4>
    <el-form :model="form" labek-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pass" placeholder="请输入密码"  show-password></el-input>
      </el-form-item>
      <div class="btn-wrapper">
        <el-button type="primary" @click="login">登录</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from "@/utils/auth";
import crypto from 'crypto-browserify'
const md5 = crypto.createHash('md5')
  export default {
    data() {
      return {
        form: {
          name:'',
          pass: ''
        }
      }
    },
    methods: {
      login() {
        let {name:username, pass:password} = this.form
        md5.update(password)
        let md5password = md5.digest('hex')
        this.$store.dispatch('user/login', {username, password:md5password}).then(res => {
          console.log(res)
          // if(!data.error) {
          //   window.isLogin = true
          //   this.$router.push({path: '/home'})
          // }else {
          //   alert(data.msg)
          // }
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .container-wrapper
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 400px
    min-height 200px
    padding 10px 30px
    border 1px solid #ccc
    border-radius 6px
    h4
      text-align center
    .el-button
      width 100%
</style>
