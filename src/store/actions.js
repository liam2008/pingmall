import {
    getHomeCasual,
    getHomeNav,
    getHomeShopList,
    getRecommendShopList,
    getSearchGoods,
    getUserInfo,
    getLogout,
    getUserCartGoods
} from '../api'

import {
    HOME_CASUAL, HOME_NAV,
    HOME_SHOP_LIST, RECOMMEND_SHOP_LIST,
    SEARCH_GOODS, USER_INFO,
    RESET_USER_INFO, USER_CART_GOODS,
    ADD_CART_GOODS, REDUCE_CART_GOODS,
    SELECTED_ALL_GOODS,SINGLE_SELECTED_GOOD,
    DELE_SINGLE_SELECTED_GOOD
} from './mutations-types'

export default {
    async reqHomeCasual({ commit }) {
        const result = await getHomeCasual();
        commit(HOME_CASUAL, { homecasual: result });
    },
    async reqHomeNav({ commit }) {
        const result = await getHomeNav();
        commit(HOME_NAV, { homenav: result.data });
    },
    async reqHomeShopList({ commit }) {
        const result = await getHomeShopList();
        commit(HOME_SHOP_LIST, { homeshoplist: result['goods_list'] });
    },
    async reqRecommendShopList({ commit }, params) {
        const result = await getRecommendShopList(params);
        commit(RECOMMEND_SHOP_LIST, { recommendshoplist: result });
        params.callback && params.callback();
    },
    async reqSearchGoods({ commit }) {
        const result = await getSearchGoods();
        commit(SEARCH_GOODS, { searchgoods: result.data });
    },
    //同步获取用户信息（把用户信息存到store）首次登录使用
    asyncUserInfo({ commit }, userinfo) {
        commit(USER_INFO, { userinfo });
    },
    //异步获取用户信息 进入app请求
    async reqUserInfo({ commit }) {
        const userinfo = await getUserInfo();
        if (userinfo.id) {
            commit(USER_INFO, { userinfo });
        }
    },
    //异步推出登录
    async reqLogout({ commit }) {
        const result = await getLogout();
        if (!result.err_code) {
            commit(RESET_USER_INFO);
        }
    },
    //异步购物车
    async reqUserCartGoods({ commit }) {
        const result = await getUserCartGoods();
        if (!result.err_code) {
            commit(USER_CART_GOODS, { usercartgoods: result });
        }
    },
    //单个商品加减
    updateGoodsCount({ commit }, { index, isAdd }) {
        if (isAdd) {
            commit(ADD_CART_GOODS, { index });
        } else {
            commit(REDUCE_CART_GOODS, { index });
        }
    },
    //是否选中所有商品
    selectedAll({ commit }, { isSelectedAll }) {
        commit(SELECTED_ALL_GOODS, { isSelectedAll });
    },
    //单选商品
    singleSelectedGood({ commit }, { index }) {
        commit(SINGLE_SELECTED_GOOD, { index });
    },
    //删除购物车商品
    deleSingleSelectedGood({ commit }, { index }) {
        commit(DELE_SINGLE_SELECTED_GOOD, { index }); 
    },
}