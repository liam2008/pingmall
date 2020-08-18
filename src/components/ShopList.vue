<template>
  <a class="shop-list">
    <div class="img-wrap">
      <img v-lazy="item.thumb_url" alt v-if="item.thumb_url" />
    </div>
    <h4 class="item-title">{{item.goods_name}}</h4>
    <div class="item-bottom">
      <span class="item-price">￥{{item.price}}</span>
      <span class="item-sales">{{item.sales_tip}}</span>
      <button class="item-button" @click="clickCell(item)">加入购物车</button>
    </div>
  </a>
</template>

<script>
export default {
  name: 'ShopList',
  props: {
    item: Object,
    clickCell: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang='scss' scoped>
.shop-list {
  width: 49.5%;
  background: #fff;
  margin-bottom: 15px;
  padding-bottom: 15px;
  &:nth-child(2n-1) {
    margin-right: 1%;
  }
}

.img-wrap {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 50%;
  }

  img[lazy=loaded] {
    width: 100%;
  }
}

.item-title {
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  height: 20px;
  overflow: hidden;
  margin: 5px 0;
  padding: 0 5px;
}

.item-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 6px;
  .item-price {
    flex: 2;
    color: red;
    font-weight: bolder;
    font-size: 12px;
  }
  .item-sales {
    flex: 3;
    font-size: 10px;
    color: #666;
  }
  .item-button {
    flex: 4;
    border: 1px solid orange;
    height: 26px;
    border-radius: 5px;
    background-color: transparent;
    color: red;
  }
  .item-user {
    img {
      width: 30px;
      border-radius: 50%;
      &:nth-child(2) {
        margin-left: -10px;
      }
    }
  }
}
</style>
