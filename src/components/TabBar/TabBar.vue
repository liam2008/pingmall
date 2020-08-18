<template>
  <div class="bottom-tab">
    <span :class="[{active: $route.path.includes('/home')},'tab-item']" @click="switchTo('/home')">
      <img :src="require($route.path.includes('/home')?'assets/img/icon_home_selected.png':'assets/img/icon_home.png')" alt />
      <span>首页</span>
    </span>
    <span :class="[{active: $route.path.includes('/recommend')},'tab-item']" @click="switchTo('/recommend')">
      <img :src="require($route.path.includes('/recommend')?'assets/img/icon_intro_selected.png':'assets/img/icon_intro.png')"  alt />
      <span>推荐</span>
    </span>
    <span :class="[{active: $route.path.includes('/search')},'tab-item']" @click="switchTo('/search')">
      <img :src="require($route.path.includes('/search')?'assets/img/icon_search_selected.png':'assets/img/icon_search.png')" alt />
      <span>搜索</span>
    </span>
    <span :class="[{active: $route.path.includes('/chat')},'tab-item']" @click="switchTo('/chat')">
      <img :src="require($route.path.includes('/chat')?'assets/img/icon_chat_selected.png':'assets/img/icon_chat.png')" alt />
      <span>购物车</span>
    </span>
    <span :class="[{active: $route.path.includes('/me')},'tab-item']" @click="switchTo('/me')">
      <img :src="require($route.path.includes('/me')?'assets/img/icon_mine_selected.png':'assets/img/icon_mine.png')" alt />
      <span>我的</span>
    </span>
  </div>
</template>

<script>

export default {
  name: 'TabBar',
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
      switchTo(path){
        this.$router.replace(path)
      }
  }
}
</script>
<style lang='scss' scoped>
.bottom-tab {
  width: 100%;
  height: 50px;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 999;
  padding:5px 0;
  .tab-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
    img {
      display: inline-block;
      width: 35%;
      margin-bottom: 2px;
    }
  }
  .active{
      color:red;
  }
}
</style>
