<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <TabBar v-show="$route.meta.showBottomTabBar"></TabBar>
  </div>
</template>

<script>
//引入字体图标
import '@/common/css/style.css'
import 'mint-ui/lib/style.css'
import TabBar from '@/components/TabBar/TabBar'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    TabBar
  },
  created() {
    //获取用户信息
    this.$store.dispatch('reqUserInfo');
  },
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
#app {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: relative;
}
</style>
