<template>
  <div class="search-nav">
    <a href class="search-nav-icon"  @click.prevent="showSearchPanel(true)">
      <span class="search-nav-icon">
        <img src="../images/search.png" alt width="25" />商品搜索
      </span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'SearchNav',
  props: {
    showSearchPanel: Function
  },
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
@import '../../../common/style/mixins';

.search-nav {
  width: 100%;
  height: 60px;
  background: #fff;
  @include border-bottom-1px(#ccc);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;

  .search-nav-icon {
    width: 90%;
    height: 70%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e8e8e8;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    span {
      color: #aaa;
      margin-left: 6px;
      font-size: 18px;
      font-weight: lighter;
    }
  }
}
</style>
