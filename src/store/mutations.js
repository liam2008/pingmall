import vue from 'vue'
import {
    HOME_CASUAL, HOME_NAV, HOME_SHOP_LIST,
    RECOMMEND_SHOP_LIST, SEARCH_GOODS,
    USER_INFO, RESET_USER_INFO,
    USER_CART_GOODS, ADD_CART_GOODS,
    REDUCE_CART_GOODS, SELECTED_ALL_GOODS,
    SINGLE_SELECTED_GOOD,DELE_SINGLE_SELECTED_GOOD
} from './mutations-types'

export default {
    [HOME_CASUAL](state, { homecasual }) {
        state.homecasual = homecasual
    },
    [HOME_NAV](state, { homenav }) {
        state.homenav = homenav
    },
    [HOME_SHOP_LIST](state, { homeshoplist }) {
        state.homeshoplist = homeshoplist
    },
    [RECOMMEND_SHOP_LIST](state, { recommendshoplist }) {
        state.recommendshoplist = state.recommendshoplist.concat(recommendshoplist)
    },
    [SEARCH_GOODS](state, { searchgoods }) {
        state.searchgoods = searchgoods
    },
    [USER_INFO](state, { userinfo }) {
        state.userinfo = userinfo
    },
    [RESET_USER_INFO](state) {
        state.userinfo = {}
    },
    [USER_CART_GOODS](state, { usercartgoods }) {
        state.usercartgoods = usercartgoods
    },
    [ADD_CART_GOODS](state, { index }) {
        state.usercartgoods[index].buy_count++;
    },
    [REDUCE_CART_GOODS](state, { index }) {
        state.usercartgoods[index].buy_count--;
        if (state.usercartgoods[index].buy_count <= 0) {
            state.usercartgoods.splice(index, 1);
        }
    },
    [SELECTED_ALL_GOODS](state, { isSelectedAll }) {
        state.usercartgoods.forEach((goods, index) => {
            if (goods.checked) {
                goods.checked = isSelectedAll
            } else {
                vue.set(goods, 'checked', isSelectedAll);
            }
        });
    },
    [SINGLE_SELECTED_GOOD](state, { index }) {
        let good = state.usercartgoods[index];
        if (good.checked) {
            good.checked = !good.checked
        } else {
            vue.set(good, 'checked', true);
        }
    },
    [DELE_SINGLE_SELECTED_GOOD](state, { index }) {
        state.usercartgoods.splice(index, 1);
    }
}