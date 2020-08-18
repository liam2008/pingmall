import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyload from 'vue-lazyload'

Vue.config.productionTip = false

//配置mint-ui
import { Actionsheet, DatetimePicker } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(DatetimePicker.name, DatetimePicker);

//配置图片懒加载
import loading from './common/images/loading.gif'
Vue.use(lazyload, {
  loading
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
