<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MainTabBar from "./base/maintabbar/MainTabBar";
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style scoped lang="stylus">

</style>
