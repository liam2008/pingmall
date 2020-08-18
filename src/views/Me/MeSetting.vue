<template>
  <div class="me-setting">
    <div>
      <me-common-cell left-icon="itlike-3" left-title="免密支付设置" />
      <me-common-cell left-icon="itlike-2" left-title="免拼卡设置" />
      <me-common-cell left-icon="itlike-1" left-title="消息接收设置" />
    </div>

    <div style="margin-top: 10px">
      <me-common-cell left-icon="itlike-4" left-title="免密支付设置" :clickCell="dealClickCell" />
      <me-common-cell left-icon="itlike-5" left-title="设置" :clickCell="dealClickCell" />
    </div>

    <div style="margin-top: 10px">
      <me-common-cell left-icon="itlike-1" left-title="免密支付设置" />
    </div>

    <div class="logout" @click="dealLogout">退出登录</div>
  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import { mapActions } from 'vuex'
import MeCommonCell from './MeCommonCell'

export default {
  name: 'MeSetting',
  data() {
    return {}
  },
  computed: {},
  components: {
    MeCommonCell
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions(['reqLogout']),
    dealClickCell(props) {
      Toast(props)
    },
    dealLogout() {
      MessageBox.confirm('您确定退出？').then(action => {
        if (action === 'confirm') {
          this.reqLogout();
          this.$router.replace('/home');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.me-setting {
  width: 100%;
  height: 100%;
  background-color: #ececec;
  .logout {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
