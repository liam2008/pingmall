<template>
  <div class="search">
    <search-nav :showSearchPanel="showSearchPanel" />
    <div class="shop">
      <div class="menu-wrapper">
        <ul>
          <!-- current -->
          <li
            class="menu-item"
            v-for="(goods,index) in searchgoods"
            :key="index"
            :class="{current:index === currentIndex}"
            @click="clickLeftItem(index)"
            ref="menuList"
          >
            <span>{{goods.name}}</span>
          </li>
        </ul>
      </div>
      <div class="shop-wrapper">
        <ul ref="shopsParent">
          <li
            class="shop-li"
            v-for="(goods,index) in searchgoods"
            :key="index"
            :class="{'last':index === searchgoods.length-1}"
          >
            <div class="shops-title">
              <h4>{{goods.name}}</h4>
              <a href>查看更多 ></a>
            </div>
            <ul class="phone-type" v-if="goods.tag === 'phone'">
              <li v-for="(phone,index) in goods.category" :key="index">
                <img v-lazy="phone.icon" alt />
              </li>
            </ul>
            <ul class="shops-items">
              <li v-for="(items,key) in goods.items" :key="key">
                <img v-lazy="items.icon" alt class="img-wrap" />
                <span>{{items.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--搜索面板-->
    <search-panel v-if="isShow" :showSearchPanel="showSearchPanel" />
  </div>
</template>

<script>
import SearchNav from './Children/SearchNav'
import SearchPanel from './Children/SearchPanel'
import { mapState } from 'vuex'

import BScroll from 'better-scroll'

export default {
  name: 'search',
  data() {
    return {
      scrollY: 0,
      rightLiTops: [],
      isShow: false,
    }
  },
  computed: {
    ...mapState(['searchgoods']),
    currentIndex() {
      const { scrollY, rightLiTops } = this
      return rightLiTops.findIndex((LiTop, index) => {
        this._leftScroll(index)
        return scrollY >= LiTop && scrollY < rightLiTops[index + 1]
      })
    },
  },
  components: {
    SearchNav,
    SearchPanel,
  },
  created() {},
  mounted() {
    this.$store.dispatch('reqSearchGoods')
  },
  methods: {
    _initBScroll() {
      //左边
      this.leftScroll = new BScroll('.menu-wrapper', {
        scrollY: true,
        click: true, //可以监听点击事件
        tap: true,
        bounce: false,
      })

      //右边
      this.rightScroll = new BScroll('.shop-wrapper', {
        //不用在data中定义，直接定义全局
        scrollY: true,
        // click: true,
        probeType: 3,
        bounce: false,
      })

      this.rightScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)
      })
    },
    _initRightLiTops() {
      const tempArr = []
      let top = 0
      tempArr.push(top)

      //遍历标签高度
      let allLis = this.$refs.shopsParent.getElementsByClassName('shop-li')
      Array.prototype.slice.call(allLis).forEach((li, index) => {
        //字节列表，或者用for
        top += li.clientHeight /* clientHeight */
        tempArr.push(top)
      })
      this.rightLiTops = tempArr
    },
    clickLeftItem(index) {
      this.scrollY = this.rightLiTops[index]
      this.$nextTick(() => {
        this.rightScroll.scrollTo(0, -this.scrollY, 300)
      })
    },
    _leftScroll(index) {
      let menuList = this.$refs.menuList[index]
      this.$nextTick(() => {
        this.leftScroll.scrollToElement(menuList, 300, 0, -100)
      });
    },
    // 1.5 是否显示搜索面板
    showSearchPanel(flag) {
      this.isShow = flag
    },
  },
  watch: {
    searchgoods() {
      this.$nextTick(() => {
        this._initBScroll()
        //位置
        this._initRightLiTops()
      })
    },
  },
}
</script>
<style lang='scss' scoped>
@import '../../common/style/mixins';
.search {
  width: 100%;
  height: 100%;
  .shop {
    position: absolute;
    display: flex;
    top: 60px;
    left: 0;
    bottom: 60px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      background-color: #e0e0e0;
      width: 80px;
      .menu-item {
        width: 100%;
        height: 60px;
        background-color: #fafafa;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: lighter;
        color: #666;
        &.current {
          position: relative;
          color: #e02e24;
          &::before {
            content: '';
            background-color: #e02e24;
            width: 4px;
            height: 30px;
            position: absolute;
            left: 0;
          }
        }
      }
    }

    .shop-wrapper {
      flex: 1;
      // overflow-y: scroll;
      // &::-webkit-scrollbar {
      //   display: none;
      // }

      .shop-li.last {
        padding-bottom: 220px;
      }

      .shops-title {
        flex-direction: row;
        display: flex;
        padding: 0 10px;
        height: 44px;
        align-items: center;
        justify-content: space-between;
        color: #999;
        a {
          color: #999;
          text-decoration: none;
          font-weight: lighter;
        }
      }

      .shops-items {
        display: flex;
        flex-wrap: wrap;
        li {
          display: flex;
          flex-direction: column;
          width: 33.3%;
          height: 90px;
          justify-content: center;
          align-items: center;
          color: #333;
          font-size: 14px;
          font-weight: lighter;
          img {
            width: 60%;
            height: 60%;
            margin-bottom: 5px;
          }
        }
      }

      .phone-type {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        @include border-bottom-1px(#ccc);
        margin-bottom: 15px;
        li {
          width: 33.3%;
          display: flex;
          justify-self: center;
          align-items: center;
          margin: 5px 0;
          img {
            width: 70%;
          }
        }
      }
    }
  }
}
</style>
