import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home/Home.vue');
const Recommend = () => import('../views/Recommend/Recommend.vue');
const Search = () => import('../views/Search/Search.vue');
const Me = () => import('../views/Me/Me.vue');
const Cart = () => import('../views/Cart/Cart.vue');
const Login = () => import('../views/Login/Login.vue');

import Hot from '../views/Home/Children/Hot/Hot.vue'
import Box from '../views/Home/Children/Box.vue'
import Dress from '../views/Home/Children/Dress.vue'
import Ele from '../views/Home/Children/Ele.vue'
import Food from '../views/Home/Children/Food.vue'
import General from '../views/Home/Children/General.vue'
import Man from '../views/Home/Children/Man.vue'
import Mbaby from '../views/Home/Children/Mbaby.vue'
import Shirt from '../views/Home/Children/Shirt.vue'
import MeSetting from '../views/Me/MeSetting.vue'
import UserDetail from '../views/Me/UserDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/me_setting',
    name: 'MeSetting',
    component: MeSetting
  },
  {
    path: '/user_detail',
    name: 'UserDetail',
    component: UserDetail
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home',
        redirect: '/home/hot'
      },
      {
        path: 'hot',
        component: Hot,
        meta: {
          showBottomTabBar: true
        }
      },
      {
        path: 'Box',
        component: Box
      },
      {
        path: 'Dress',
        component: Dress
      },
      {
        path: 'Ele',
        component: Ele
      },
      {
        path: 'Food',
        component: Food
      },
      {
        path: 'General',
        component: General
      },
      {
        path: 'Man',
        component: Man
      },
      {
        path: 'Mbaby',
        component: Mbaby
      },
      {
        path: 'Shirt',
        component: Shirt
      }
    ]
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    meta: {
      showBottomTabBar: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      showBottomTabBar: true
    }
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
    meta: {
      showBottomTabBar: true
    }
  },
  {
    path: '/chat',
    name: 'Cart',
    component: Cart,
    meta: {
      showBottomTabBar: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
