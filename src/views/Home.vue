<template>
  <div>
    首页
    <router-link to="/shop">shop</router-link>
    <router-link to="/about">about</router-link>
  </div>
</template>

<script>
  export default {
    created() {
      console.log(this.$router)
    }
  }
</script>

<style lang="stylus" scoped>

</style>
