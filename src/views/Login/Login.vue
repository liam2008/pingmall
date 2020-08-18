<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/lk_logo_sm.png" alt width="250" />
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current: loginMode}" @click="dealLoginMode(true)">验证码登录</a>
          <a href="javascript:;" :class="{current: !loginMode}" @click="dealLoginMode(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current: loginMode}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <button
                v-if="!countDown"
                class="get-verification"
                :class="{phone_right: phoneRight}"
                @click.prevent="getVerifyCode()"
              >获取验证码</button>
              <button v-else disabled="disabled" class="get-verification">已发送({{countDown}}s)</button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login-hint">
              温馨提示：未注册撩课帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="用户名/手机/邮箱" v-model="user_name" />
              </section>
              <section class="login-verification">
                <input type="password" maxlength="18" placeholder="密码" v-if="pwdMode" v-model="pwd" />
                <input type="text" maxlength="18" placeholder="密码" v-else v-model="pwd" />
                <div class="switch-show">
                  <img
                    @click.prevent="dealPwdMode(false)"
                    :class="{on: pwdMode}"
                    src="./images/hide_pwd.png"
                    alt
                    width="20"
                  />
                  <img
                    @click.prevent="dealPwdMode(true)"
                    :class="{on: !pwdMode}"
                    src="./images/show_pwd.png"
                    alt
                    width="20"
                  />
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img
                  ref="captcha"
                  class="get-verification"
                  alt="captcha"
                  @click.prevent="getCaptcha()"
                />
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login()">登录</button>
        </form>
        <button class="login-back" @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from './../../config/constans'
import { getPhoneCode, phoneCodeLogin, pwdLogin } from 'api/index'
import { Toast } from 'mint-ui'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      loginMode: true, //true 验证码登录
      phone: '',
      countDown: 0,
      pwdMode: true, //true 密文
      pwd: '',
      code: '',
      user_name: '',
      userInfo: {},
      captcha: '' //图形验证码
    }
  },
  computed: {
    phoneRight() {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
    }
  },
  components: {},
  created() {},
  mounted() {
    this.$refs.captcha.src = `${BASE_URL}/api/users/captcha`
  },
  methods: {
    ...mapActions(['asyncUserInfo']),
    dealLoginMode(loginMode) {
      this.loginMode = loginMode
    },
    async getVerifyCode() {
      if (this.phoneRight) {
        this.countDown = 5
        this.intervalId = setInterval(() => {
          if (this.countDown <= 0) {
            clearInterval(this.intervalId)
          } else {
            this.countDown--
          }
        }, 1000)
        let result = await getPhoneCode(this.phone)
        console.log(result)
        if (result.err_code === 0) {
          Toast({
            message: result.message,
            position: 'center',
            duration: 2000
          })
          return
        }
      } else {
          Toast('请输入正确手机号')
      }
    },
    dealPwdMode(flag) {
      this.pwdMode = flag
    },
    getCaptcha() {
      this.$refs.captcha.src = `${BASE_URL}/api/users/captcha?time=${new Date().getTime()}`
    },
    async login() {
      //登录模式
      let result
      if (this.loginMode) {
        //手机登录
        //验证手机
        if (!this.phone) {
          Toast('请输入手机号码')
          return
        } else if (!this.phoneRight) {
          Toast('手机号码不正确')
          return
        }

        //验证验证码
        if (!this.code) {
          Toast('请输入验证码')
          return
        } else if (!/^\d{6}$/.test(this.code)) {
          Toast('验证码6位数数字')
          return
        }

        result = await phoneCodeLogin(this.phone, this.code)
      } else {
        //账号密码登录
        //验证有户名
        if (!this.user_name) {
          Toast('请输入用户名手机邮箱')
          return
        } else if (!this.pwd) {
          Toast('请输入密码')
          return
        } else if (!this.captcha) {
          Toast('请输入验证码')
        }

        //用户名和密码登录
        result = await pwdLogin(this.user_name, this.pwd, this.captcha)
      }
      if (result.err_code === 1) {
        this.userInfo = {
          message: '登录失败，手机或者验证码不正确'
        }
      } else {
         this.userInfo = result
      }

      if (this.userInfo.id) {
        this.asyncUserInfo(this.userInfo)
        this.$router.back()
      } else {
        Toast(this.userInfo.message)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../common/style/mixins';
.login-container {
  width: 100%;
  height: 100%;
  background: #fff;
  .login-inner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
    .login-header {
      .login-logo {
        font-size: 40px;
        font-weight: bold;
        color: mediumpurple;
        text-align: center;
      }
      .login-header-title {
        padding-top: 40px;
        padding-bottom: 10px;
        text-align: center;
        & > a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.current {
            color: mediumpurple;
            font-weight: 700;
            border-bottom: 2px solid mediumpurple;
          }
        }
      }
    }
  }

  .login-content {
    & > form {
      & > div {
        display: none;
        &.current {
          display: block;
        }
        input {
          width: 100%;
          height: 100%;
          padding-left: 8px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-radius: 4px;
          outline: 0;
          font: 400 14px Arial;
          &:focus {
            border: 1px solid mediumpurple;
          }
        }
        .login-message {
          position: relative;
          margin-top: 16px;
          height: 48px;
          font-size: 14px;
          background: #fff;
          .get-verification {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            border: 0;
            color: #ccc;
            font-size: 14px;
            background: transparent;
            &.phone_right {
              color: purple;
            }
          }
        }

        .login-verification {
          position: relative;
          margin-top: 16px;
          height: 48px;
          font-size: 14px;
          background: #fff;
          .switch-show {
            position: absolute;
            right: 10px;
            top: 12px;
            img {
              display: none;
            }
            img.on {
              display: block;
            }
          }
        }

        .login-hint {
          margin-top: 12px;
          color: #999;
          font-size: 12px;
          line-height: 20px;
          & > a {
            color: mediumpurple;
          }
        }
      }
    }

    .login-submit {
      display: block;
      width: 100%;
      height: 42px;
      margin-top: 30px;
      border-radius: 4px;
      background: mediumpurple;
      color: #fff;
      text-align: center;
      font-size: 16px;
      line-height: 42px;
      border: 0;
    }

    .login-back {
      display: block;
      width: 100%;
      height: 42px;
      margin-top: 15px;
      border-radius: 4px;
      background: transparent;
      border: 1px solid mediumpurple;
      color: mediumpurple;
      text-align: center;
      font-size: 16px;
      line-height: 42px;
    }
  }
}
</style>
