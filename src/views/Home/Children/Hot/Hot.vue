<template>
  <div class="hot">
    <!--轮播图-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../../images/rowing/s1.png" width="100%" alt />
        </div>
        <div class="swiper-slide">
          <img src="../../images/rowing/s2.png" width="100%" alt />
        </div>
        <div class="swiper-slide">
          <img src="../../images/rowing/s3.png" width="100%" alt />
        </div>
        <div class="swiper-slide">
          <img src="../../images/rowing/s4.png" width="100%" alt />
        </div>
        <div class="swiper-slide">
          <img src="../../images/rowing/s5.png" width="100%" alt />
        </div>
        <div class="swiper-slide">
          <img src="../../images/rowing/s6.png" width="100%" alt />
        </div>
        <div class="swiper-slide">
          <img src="../../images/rowing/s7.png" width="100%" alt />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>

    <hot-nav></hot-nav>

    <div class="hot-ad">
      <img src="./../../images/hot_ad/home_ad.gif" alt width="100%" />
    </div>

    <hot-shop-list></hot-shop-list>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

import HotNav from './HotNav'
import HotShopList from './HotShopList'

export default {
  name: 'Hot',
  data() {
    return {}
  },
  components: {
    HotNav,
    HotShopList
  },
  created() {},
  mounted() {
    //请求数据
    this.$store.dispatch('reqHomeCasual')
    this.$store.dispatch('reqHomeNav')
    this.$store.dispatch('reqHomeShopList')

    new Swiper('.swiper-container', {
      loop: true,
      autoplay: true,
      width: window.innerWidth,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
.hot {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  padding-top: 50px;
  overflow-x: hidden;
}
.hot-ad {
  background: #fff;
  margin: 8px 0;
  padding: 5px;
}
</style>
