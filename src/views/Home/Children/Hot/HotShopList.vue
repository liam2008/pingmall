<template>
  <div class="shop-container" v-if="homeshoplist.length">
    <ul class="shop-list">
      <li class="shop-list-item" v-for="(shop,index) in homeshoplist" :key="index">
        <div class="img-wrap">
          <img v-lazy="shop.image_url" alt :key="shop.image_url" />
        </div>
        <h4 class="list-item-title">{{shop.goods_name}}</h4>
        <div class="list-item-bottom">
          <span class="item-price">￥{{shop.market_price/100}}</span>
          <span class="item-cout">{{shop.sales_tip}}</span>
          <span class="item-user">
            <img :src="user.avatar" v-for="(user,index) in shop.bubble" :key="index" alt />
          </span>
          <span class="item-buy">
            <button>去拼单</button>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HotShopList',
  data() {
    return {}
  },
  computed: {
    ...mapState(['homeshoplist']),
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang='scss' scoped>
.shop-container {
  margin-bottom: 60px;
  background: #f5f5f5;
  .shop-list {
    margin-bottom: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    .shop-list-item {
      list-style: none;
      flex: 1;
      margin-bottom: 20px;

      .img-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        img {
          width: 50%;
        }

        img[lazy='loaded'] {
          width: 100%;
        }
      }
    }

    .list-item-title {
      line-height: 22px;
      width: 94%;
      margin-left: 3%;
      height: 44px;
      overflow: hidden;
      font-weight: bold;
    }
  }
  .list-item-bottom {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .item-price {
      font-size: 18px;
      text-align: center;
      color: red;
      font-weight: bold;
      flex: 1;
    }
    .item-couter {
      flex: 2;
      font-size: 12px;
      color: #ccc;
    }
    .item-user {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      img {
        width: 30px;
        border-radius: 50%;
        &:nth-child(2) {
          margin-left: -6px;
        }
      }
    }
    .item-buy {
      flex: 2;
      button {
        width: 80%;
        border: none;
        height: 34px;
        line-height: 34px;
        color: #fff;
        text-align: center;
        margin-left: 10px;
        background: red;
        border-radius: 8px;
      }
    }
  }
}
</style>
