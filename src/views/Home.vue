<template>
  <div>
    首页 {{$store.getters.roles[0]}}
    <router-link to="/shop" v-show="$store.getters.roles[0]=='admin'">shop</router-link>
    <router-link to="/about">about</router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
