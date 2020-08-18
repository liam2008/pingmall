<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
      class="fix"
    ></ly-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import LyTab from 'ly-tab'

export default {
  name: 'Home',
  data() {
    return {
      selectedId: 0,
      items: [
        { label: '热门' },
        { label: '服饰' },
        { label: '鞋包' },
        { label: '母婴' },
        { label: '百货' },
        { label: '食品' },
        { label: '内衣' },
        { label: '男装' },
        { label: '电器' }
      ],
      options: {
        activeColor: '#e9232c'
      },
      // 二级路由路径
      subRouteUrl: [
        '/home/hot',
        '/home/dress',
        '/home/box',
        '/home/mbaby',
        '/home/general',
        '/home/food',
        '/home/shirt',
        '/home/man',
        '/home/ele'
      ]
    }
  },
  components: {
    'ly-tab': LyTab.LyTab
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(item, index) {
      // console.log(item, index);
      this.$router.replace(this.subRouteUrl[index])
    }
  }
}
</script>
<style lang='scss'>
.ly-tab-list {
  padding: 15px 10px;
}
.fix {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
</style>

<style lang='scss' scoped>
.home {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
}
</style>
