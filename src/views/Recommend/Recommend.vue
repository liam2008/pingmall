<template>
  <div class="recommend-container">
    <ul class="recommend" v-if="userinfo.id && recommendshoplist.length > 0">
      <shop-list
        tag="li"
        v-for="(item,index) in recommendshoplist"
        :key="index"
        :item="item"
        :clickCell="dealClickCell"
      ></shop-list>
    </ul>
    <select-login v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import ShopList from 'components/ShopList'
import SelectLogin from './../Login/SelectLogin'
import { Indicator, Toast } from 'mint-ui'
import { addGoodsToCart } from 'api/index'

export default {
  name: 'Recommend',
  data() {
    return {
      curPage: 1,
      pageSize: 20,
    }
  },
  computed: {
    ...mapState(['recommendshoplist', 'userinfo']),
  },
  components: {
    ShopList,
    SelectLogin,
  },
  created() {},
  mounted() {
    Indicator.open('正在加载数据')
    this.$store.dispatch('reqRecommendShopList', {
      curPage: this.curPage,
      pageSize: this.pageSize,
      callback: () => {
        Indicator.close()
      },
    })
  },
  methods: {
    _initScroll() {
      this.listScroll = new BScroll('.recommend-container', {
        scrollY: true,
        probeType: 3,
      })

      this.listScroll.on('touchEnd', (pos) => {
        //监听上拉
        console.log(pos.y)
        if (pos.y >= 50) {
          console.log('下拉刷新')
        }

        //监听下拉
        if (pos.y <= this.listScroll.maxScrollY - 20) {
          Indicator.open('正在加载数据')
          this.$store.dispatch('reqRecommendShopList', {
            curPage: this.curPage,
            pageSize: this.pageSize,
            callback: () => {
              Indicator.close()
            },
          })
        }
      })

      this.listScroll.on('scrollEnd', () => {
        this.listScroll.refresh()
      })
    },
    async dealClickCell(goods) {
      console.log(goods)
      let result = await addGoodsToCart(
        this.userinfo.id,
        goods['goods_id'],
        goods['goods_name'],
        goods['thumb_url'],
        goods['buy_count'],
        goods['is_pay'],
        goods['price']
      )
      if (!result.err_code) {
        Toast({
          message: result,
          position: 'center',
          duration: 2000,
        })
      }
    },
  },
  watch: {
    recommendshoplist() {
      this.$nextTick(() => {
        this.curPage += 1
        this._initScroll()
      })
    },
  },
}
</script>
<style lang='scss' scoped>
.recommend-container {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .recommend {
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 60px;
  }
}
</style>
