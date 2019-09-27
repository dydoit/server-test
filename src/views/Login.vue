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
        this.$http.post('http://localhost:3000/login', {
          username,
          password
        }).then(res =>{
          let {data} = res
          if(!data.error) {
            this.$router.push({
              path: this.$route.query.redirect || '/'
            })
          }else {
            alert(data.msg)
          }
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
