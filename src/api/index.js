import api from './ajax'

//首页/api
export const getHomeCasual = () => api.get('/api/homecasual');
export const getHomeNav = () => api.get('/api/homenav');
export const getHomeShopList = () => api.get('/api/homeshoplist');

//推荐
export const getRecommendShopList = (params) => api.get('/api/recommendshoplist', params);

//搜索
export const getSearchGoods = () => api.get('/api/searchgoods');

/* 用户相关 */

//短信验证码
export const getPhoneCode = (phone) => api.get('/api/users/send_code', { phone });

//手机验证码登录
export const phoneCodeLogin = (phone, code) => api.post('/api/users/login_code', { phone, code });

//用户密码登录
export const pwdLogin = (name, pwd, captcha) => api.post('/api/users/login_pwd', { name, pwd, captcha });

//获取用户信息
export const getUserInfo = () => api.get('/api/users/user_info');

//退出登录
export const getLogout = () => api.get('/api/users/logout');

//修改用户信息
export const changeUserInfo = (
    user_id,
    user_name,
    user_phone,
    user_sex,
    user_address,
    user_birthday,
    user_sign
) => api.post('/api/users/change_user_info',
    {
        user_id,
        user_name,
        user_phone,
        user_sex,
        user_address,
        user_birthday,
        user_sign
    });

//添加到购物车
export const addGoodsToCart = (
    user_id,
    goods_id,
    goods_name,
    thumb_url,
    buy_count,
    is_pay,
    price
) => api.post('/api/add_shop_cart',
    {
        user_id,
        goods_id,
        goods_name,
        thumb_url,
        buy_count,
        is_pay,
        price
    });

    
//请求购物车数量
export const getUserCartGoods = () => api.get('/api/user_cart_goods');