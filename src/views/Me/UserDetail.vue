<template>
  <div class="user-detail">
    <div class="user-detail-top">基本信息</div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img src="./images/me_icon.png" alt />
      </div>
      <div class="user-item">
        <span>手机</span>
        <span>{{user_phone}}</span>
      </div>
      <div class="user-item" @click="selectSex">
        <span>昵称</span>
        <span>
          <input type="text" v-model="user_name" />
        </span>
      </div>
      <div class="user-item" @click="sheetVisible = true">
        <span>性别</span>
        <span>{{user_sex}}</span>
      </div>
      <div class="user-item">
        <span>常住地</span>
        <span>
          <input type="text" v-model="user_address" />
        </span>
      </div>
      <div class="user-item" @click="$refs.picker.open()">
        <span>生日</span>
        <span>{{user_birthday}}</span>
      </div>
      <div class="user-item">
        <span>个性签名</span>
        <span>
          <input type="text" v-model="user_sign" />
        </span>
      </div>

      <button @click="handleChangeUserInfo">修改</button>
    </div>
    <!--选择性别-->
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <!--选择出生日期-->
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleBirthday"
    ></mt-datetime-picker>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { changeUserInfo } from 'api/index'
import { Toast } from 'mint-ui'
export default {
  name: 'UserDetail',
  data() {
    return {
      actions: [
        { name: '男', method: this.selectSex },
        { name: '女', method: this.selectSex },
      ],
      sheetVisible: false,
      user_name: '',
      user_phone: '',
      user_sex: '',
      user_address: '',
      user_birthday: '',
      user_sign: '',
      startDate: new Date('1970-01-01'),
      endDate: new Date(),
    }
  },
  computed: {
    ...mapState(['userinfo']),
  },
  components: {},
  created() {},
  mounted() {
    this.user_id = this.userinfo['id'] || ''
    this.user_name = this.userinfo['user_name'] || ''
    this.user_phone = this.userinfo['user_phone'] || ''
    this.user_sex = this.userinfo['user_sex'] || ''
    this.user_address = this.userinfo['user_address'] || ''
    this.user_birthday = this.userinfo['user_birthday'] || ''
    this.user_sign = this.userinfo['user_sign'] || ''
  },
  methods: {
    selectSex(props) {
      this.user_sex = props.name
    },
    handleBirthday(data) {
      this.user_birthday = moment(data).format('YYYY年MM月DD日')
    },
    async handleChangeUserInfo() {
      let result = await changeUserInfo(
        this.user_id,
        this.user_name,
        this.user_phone,
        this.user_sex,
        this.user_address,
        this.user_birthday,
        this.user_sign
      )
      if (!result.err_code) {
        this.$store.dispatch('reqUserInfo')
        Toast({
          message: result,
          position: 'center',
          duration: 2000,
        })
        setTimeout(() => {
          this.$router.replace('/me')
        }, 2000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.user-detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  .user-detail-top {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding-left: 10px;
    font-weight: bold;
  }
  .user-detail-group {
    .user-icon {
      height: 60px;
      padding: 0 10px;
      background-color: #fff;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 50px;
        border-radius: 50%;
      }
    }
    .user-item {
      height: 40px;
      padding: 0 10px;
      background-color: #fff;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        border: none;
        outline: none;
        text-align: right;
      }
    }
    button {
      width: 90%;
      height: 40px;
      line-height: 40px;
      background-color: #e9232c;
      text-align: center;
      margin: 20px 5%;
      border: none;
      font-size: 16px;
      color: #fff;
      border-radius: 10px;
    }
  }
  .right-title-color {
    color: #999;
    font-size: 14px;
  }
}
</style>
