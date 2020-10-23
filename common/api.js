import http from '@/utils/request.js'

// 登录
export const login = (data) => {
	return http.request({
		url: ':1022/api/user/login',
		method: 'post',
		data,
	})
}



/*    首页    */
// //轮播封面图
export const  coverAll= (data) => {
	return http.request({
		url: ':1023/api/cover/all',
		method: 'post',
		data,
	})
}

// 根据定位城市查询推荐农场
export const  farmGetOne= (data) => {
	return http.request({
		url: ':1022/api/farm/getOne',
		method: 'post',
		data,
	})
}

// 按照类型查询商品
export const  productType = (data) => {
	return http.request({
		url: ':1023/api/product/type',
		method: 'post',
		data,
	})
}
/*   农场信息   */
// 根据农场id查询设施
export const  farmFarmfacilities = (data) => {
	return http.request({
		url: ':1022/api/farm/farmfacilities',
		method: 'post',
		data,
	})
}
// 通过农场id查询店铺
export const  MerchantsFindfarm = (data) => {
	return http.request({
		url: ':1023/api/Merchants/findFarm',
		method: 'post',
		data,
	})
}

// 根据商户id分页查询所有商品
export const  productFindMerchants = (data) => {
	return http.request({
		url: ':1023/api/product/findMerchants',
		method: 'post',
		data,
	})
}


// 我的收藏夹/购物车
export const  cartGetList= (data) => {
	return http.request({
		url: ':1023/api/cart/getList',
		method: 'post',
		data,
	})
}

/*   集市   */

// 分页查询所有分类
export const  categoryFindAll= (data) => {
	return http.request({
		url: ':1023/api/category/findAll',
		method: 'post',
		data,
	})
}

// 通过分类id查询商品
export const  productFindCategory= (data) => {
	return http.request({
		url: ':1023/api/product/findCategory',
		method: 'post',
		data,
	})
}
// 通过商品id查询封面图
export const  coverFindByidlist= (data) => {
	return http.request({
		url: ':1023/api/cover/findByIdList',
		method: 'post',
		data,
	})
}

