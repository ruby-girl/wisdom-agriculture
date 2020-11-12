import http from '@/utils/request.js'

// 登录
export const login = (data) => {
	return http.request({
		url: 'tracing/api/user/login',
		method: 'post',
		data,
	})
}
// 获取省
export const  getProvince= (data) => {
	return http.request({
		url: 'tracing/api/city/getProvince',
		method: 'post',
		data:data
	})
}
// 获取市
export const  getCity= (data) => {
	return http.request({
		url: 'tracing/api/city/getCity',
		method: 'post',
		data:data
	})
}
// 获取区
export const  getCounty= (data) => {
	return http.request({
		url: 'tracing/api/city/getCounty',
		method: 'post',
		data:data
	})
}

/*    首页    */
// //轮播封面图
export const  coverAll= (data) => {
	return http.request({
		url: 'marketing/api/cover/all',
		method: 'post',
		data,
	})
}
// 根据定位城市查询推荐农场
export const  farmGetOne= (data) => {
	return http.request({
		url: 'tracing/api/farm/getOne',
		method: 'post',
		data,
	})
}
// 按照类型查询商品
export const  productType = (data) => {
	return http.request({
		url: 'marketing/api/product/type',
		method: 'post',
		data,
	})
}
/*    首页end    */

/*   农场信息   */
// 根据农场id查询设施
export const  farmFarmfacilities = (data) => {
	return http.request({
		url: 'tracing/api/farm/farmfacilities',
		method: 'post',
		data,
	})
}
// 通过农场id查询店铺
export const  MerchantsFindfarm = (data) => {
	return http.request({
		url: 'marketing/api/Merchants/findFarm',
		method: 'post',
		data,
	})
}
// 根据商户id分页查询所有商品
export const  productFindMerchants = (data) => {
	return http.request({
		url: 'marketing/api/product/findMerchants',
		method: 'post',
		data,
	})
}
// 我的收藏夹/购物车
export const  cartGetList= (data) => {
	return http.request({
		url: 'marketing/api/cart/getList',
		method: 'post',
		data,
	})
}
/*   农场信息end   */

/*   圈子   */
// 时间倒序分页查询圈子
export const  circleOrderTime= (data) => {
	return http.request({
		url: 'tracing/api/circle/orderTime',
		method: 'post',
		data,
	})
}
// 通过userId获取用户信息
export const  userFindId= (data) => {
	return http.request({
		url: 'tracing/api/user/findId',
		method: 'post',
		data,
	})
}
/*   圈子end   */

/*   集市   */
// 分页查询所有分类
export const  categoryFindAll= (data) => {
	return http.request({
		url: 'marketing/api/category/findAll',
		method: 'post',
		data,
	})
}

// 通过分类id查询商品
export const  productFindCategory= (data) => {
	return http.request({
		url: 'marketing/api/product/findCategory',
		method: 'post',
		data,
	})
}
// 通过商品id查询封面图
export const  coverFindByidlist= (data) => {
	return http.request({
		url: 'marketing/api/cover/findByIdList',
		method: 'post',
		data,
	})
}
/*   集市end   */

/*   个人中心   */
// 添加收货地址
export const  shoppingAddressInsert= (data) => {
	return http.request({
		url: 'marketing/api/shoppingAddress/insert',
		method: 'post',
		data,
	})
}
/*   个人中心end   */