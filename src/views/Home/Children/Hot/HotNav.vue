<template>
  <div class="hot-nav">
    <div class="hot-nav-content">
      <div class="nav-content-inner">
        <a href class="inner-item" v-for="(nav,index) in homenav" :key="index">
          <img :src="nav.iconurl" alt />
          <span>{{nav.icontitle}}</span>
        </a>
      </div>
    </div>

    <!--进度条-->
    <div class="hot-nav-bottom">
      <div class="hot-nav-bottom-inner" :style="innerBarStyle"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HotNav',
  data() {
    return {
      screenW:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.documentElement.clientWidth,
      //滚动长度
      scrollCoententW: 720,
      bgBarW: 100,
      //滚动条激活长度
      barXW: 0,
      startX: 0,
      endFlag: 0,
      barMoveWidth: 0
    }
  },
  computed: {
    ...mapState(['homenav']),
    innerBarStyle() {
      return {
        width: `${this.barXW}px`,
        left: `${this.barMoveWidth}px`
      }
    }
  },
  mounted() {
    this.getBottomBarWidth()
    this.bindEvent()
  },
  methods: {
    getBottomBarWidth() {
      const { screenW, scrollCoententW, bgBarW } = this
      this.barXW = bgBarW * (screenW / scrollCoententW)
    },
    bindEvent() {
      this.$el.addEventListener('touchstart', this.handleTouchStart, false)
      this.$el.addEventListener('touchmove', this.handleTouchMove, false)
      this.$el.addEventListener('touchend', this.handleTouchEnd, false)
    },
    //触摸
    handleTouchStart(e) {
      let touch = e.touches[0]
      this.startX = Number(touch.pageX)
    },
    handleTouchMove(e) {
      let touch = e.touches[0]
      let moveWidth = Number(touch.pageX) - this.startX
      this.barMoveWidth = -(
        (this.bgBarW / this.scrollCoententW) * moveWidth -
        this.endFlag
      )
      if (this.barMoveWidth <= 0) {
        this.barMoveWidth = 0
      } else if (this.barMoveWidth >= this.bgBarW - this.barXW) {
        this.barMoveWidth = this.bgBarW - this.barXW
      }
    },
    handleTouchEnd() {
      this.endFlag = this.barMoveWidth
    }
  }
}
</script>
<style lang='scss' scoped>
.hot-nav {
  width: 100%;
  height: 180px;
  position: relative;
  background: #fff;
  padding-bottom: 10px;
  .hot-nav-content {
    width: 100%;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .nav-content-inner {
    width: 720px;
    height: 180px;
    display: flex;
    flex-wrap: wrap;
    .inner-item {
      width: 90px;
      height: 90px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #666;
      img {
        width: 40%;
        margin-bottom: 5px;
      }
    }
  }
  .hot-nav-bottom {
    width: 100px;
    height: 2px;
    background-color: #ccc;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    bottom: 8px;
    .hot-nav-bottom-inner {
      position: absolute;
      left: 0;
      height: 100%;
      background-color: orangered;
      width: 0;
    }
  }
}
</style>
