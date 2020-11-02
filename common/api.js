import http from '@/utils/request.js'

// 登录
export const login = (data) => {
	return http.request({
		baseUrl:getApp().globalData.baseUrl2,
		url: 'tracing/api/user/login',
		method: 'post',
		data,
	})
}

// 获取验证码
export const captcha = (data) => {
	return http.request({
		baseUrl:getApp().globalData.baseUrl3,
		url: 'tools/api/sms/send',
		method: 'post',
		data,
	})
}

// 查询地块数量
export const  massifCount= (data) => {
	return http.request({
		url: 'tracing/api/massif/count',
		method: 'post'
	})
}
// 查询农场数量
export const  farmCount= (data) => {
	return http.request({
		url: 'tracing/api/farm/count',
		method: 'post'
	})
}
// 农场列表
export const farmList= (data) => {
	return http.request({
		url: 'tracing/api/farm/list',
		method: 'post',
		data:data
	})
}
// 获取农场详情
export const  selectFarmId= (data) => {
	return http.request({
		url: 'tracing/api/farm/selectFarmId',
		method: 'post',
		data:data
	})
}
// 添加农场
export const  insertFarm= (data) => {
	return http.request({
		url: 'tracing/api/farm/insert',
		method: 'post',
		data:data
	})
}
// 编辑农场
export const  updateFarm= (data) => {
	return http.request({
		url: 'tracing/api/farm/update',
		method: 'post',
		data:data
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

// 添加设备
export const  insertDevice= (data) => {
	return http.request({
		url: 'tracing/api/device/insert',
		method: 'post',
		data:data
	})
}
// 添加地块
export const  massifSave= (data) => {
	return http.request({
		url: 'tracing/api/massif/save',
		method: 'post',
		data:data
	})
}
// 编辑地块
export const updateMassif= (data) => {
	return http.request({
		url: 'tracing/api/massif/update',
		method: 'post',
		data:data
	})
}
// 获取未绑定地块设备列表
export const  devicegetNoBangAll= (data) => {
	return http.request({
		url: 'tracing/api/device/getAll',
		method: 'post',
		data:data
	})
}
// 根据农场id获取地块列表
export const  massifGetMassif= (data) => {
	return http.request({
		url: 'tracing/api/massif/getMassif',
		method: 'post',
		data:data
	})
}
// 获取地块列表
export const  selectMassif= (data) => {
	return http.request({
		url: 'tracing/api/massif/getList',
		method: 'post',
		data:data
	})
}
//删除地块
export const  deleteMassif= (data) => {
	return http.request({
		url: 'tracing/api/massif/delete',
		method: 'post',
		data:data
	})
}
// 根据地块ID查询相关详情
export const  massifGetOne= (data) => {
	return http.request({
		url: 'tracing/api/massif/getOne',
		method: 'post',
		data:data
	})
}
//获取地块详情
export const  selectIdAll= (data) => {
	return http.request({
		url: 'tracing/api/massif/selectIdAll',
		method: 'post',
		data:data
	})
}

// TAB 获取设备列表
export const  deviceGetListData = (data) => {
	return http.request({
		url: 'tracing/api/device/getListData',
		method: 'post',
		data:data
	})
}
// T获取设备详情
export const  deviceGetOneData= (data) => {
	return http.request({
		url: 'tracing/api/device/getOneData',
		method: 'post',
		data:data
	})
}
// 编辑设备
export const  updateDevice= (data) => {
	return http.request({
		url: 'tracing/api/device/update',
		method: 'post',
		data:data
	})
}
// 首页监测
export const  massifGetMassifData= (data) => {
	return http.request({
		url: 'tracing/api/massif/getMassifData',
		method: 'post',
		data:data
	})
}

// 根据多个条件获取农场信息
export const  farmGetOne= (data) => {
	return http.request({
		url: 'tracing/api/farm/getOne',
		method: 'post',
		data:data
	})
}
// 监测详情==监控等数据
export const  monitor= (data) => {
	return http.request({
		url: 'tracing/api/massif/monitor',
		method: 'post',
		data:data
	})
}

// 监测详情==监控等数据
export const  massifMonitor= (data) => {
	return http.request({
		url: 'tracing/api/massif/massifMonitor',
		method: 'post',
		data:data
	})
}
// 预警列表
export const  warnGetList= (data) => {
	return http.request({ 
		url: 'tracing/api/warn/getList',
		method: 'post',
		data:data
	})
}
// 预警列表 设置开关
export const  updateOpening= (data) => {
	return http.request({ 
		url: 'tracing/api/warning/updateOpening',
		method: 'post',
		data:data
	})
}
// 预警列表 设置值
export const  warnUpdate= (data) => {
	return http.request({ 
		url: 'tracing/api/warn/update',
		method: 'post',
		data:data
	})
}
// 7日温度数据
export const  findRangeData= (data) => {
	return http.request({ 
		url: 'tracing/api/device/findRangeData',
		method: 'post',
		data:data
	})
}
//获取用户下所有预警
export const  warnMsgGetAll= (data) => {
	return http.request({ 
		url: 'tracing/api/warnMsg/getAll',
		method: 'post',
		data:data
	})
}


//获取用户下所有病虫害
export const  findPests= (data) => {
	return http.request({ 
		url: 'tracing/api/massif/findPests',
		method: 'post',
		data:data
	})
}
//获取农场下所有病虫害
export const  massifFindFarmPests= (data) => {
	return http.request({ 
		url: 'tracing/api/massif/findFarmPests',
		method: 'post',
		data:data
	})
}
//获取农场下所有地块
export const  massifSelectFarmId= (data) => {
	return http.request({ 
		url: 'tracing/api/massif/selectFarmId',
		method: 'post',
		data:data
	})
}
//获取农场下所有预警
export const  massifFindFarmId= (data) => {
	return http.request({ 
		url: 'tracing/api/massif/findFarmId',
		method: 'post',
		data:data
	})
}
//获取用户OPENID
export const  decodeUserInfo= (data) => {
	return http.request({ 
		url: 'tracing/api/wXLoginController/decodeUserInfo',
		method: 'post',
		data:data
	})
}

export const  likes= (data) => {
	return http.request({ 
		url: 'tracing/api/massif/likes',
		method: 'post',
		data:data
	})
}
// 查看点赞状态
export const  getLikes= (data) => {
	return http.request({ 
		url: 'tracing/api/massif/state',
		method: 'post',
		data:data
	})
}
//查询设备数量和在线设备数量
export const  deviceCount= () => {
	return http.request({ 
		url: 'tracing/api/device/count',
		method: 'post'
	})
}
//通过SN查询设备名
export const findDeviceName= (data) => {
	return http.request({
		url: 'tracing/api/deviceSn/getOne',
		method: 'post',
		data:data
	})
}
//删除设备
export const  deleteDevice= (data) => {
	return http.request({ 
		url: 'tracing/api/device/deleteDevice',
		method: 'post',
		data:data
	})
}

//大气湿度7日数据
export const  atmosphericHumidity= (data) => {
	return http.request({ 
		url: 'tracing/api/device/atmosphericHumidity',
		method: 'post',
		data:data
	})
}
//土壤温度7日数据
export const  soilTemperature= (data) => {
	return http.request({ 
		url: 'tracing/api/device/soilTemperature',
		method: 'post',
		data:data
	})
}
//土壤湿度7日数据
export const  soilHumidity= (data) => {
	return http.request({ 
		url: 'tracing/api/device/soilHumidity',
		method: 'post',
		data:data
	})
}
//获取小程序码
export const  getUnlimited= (data) => {
	return http.request({ 
		url: 'tracing/api/wXLoginController/getUnlimited',
		method: 'post',
		data:data
	})
}
// 第二版***********************************
//查询附近100公里内的设备
export const  deviceGetScope= (data) => {
	return http.request({ 
		url: 'tracing/api/device/getScope',
		method: 'post',
		data:data
	})
}

// 查询设备状态
export const  findNearby= (data) => {
	return http.request({ 
		url: 'tracing/api/user/findNearby',
		method: 'post',
		data:data
	})
}
// 开关附近功能
export const  updateNearby= (data) => {
	return http.request({ 
		url: 'tracing/api/farm/updateNearby',
		method: 'post',
		data:data
	})
}
//7日数据
export const  getScopeData= (data) => {
	return http.request({ 
		url: 'tracing/api/device/getScopeData',
		method: 'post',
		data:data
	})
}
//删除农场
export const  deleteFarm= (data) => {
	return http.request({ 
		url: 'tracing/api/farm/deleteFarm',
		method: 'post',
		data:data
	})
}
// 员工列表
export const  hireGetList= (data) => {
	return http.request({ 
		url: 'tracing/api/hire/getList',
		method: 'post',
		data:data
	})
}
// 添加员工
export const  hireInsert= (data) => {
	return http.request({ 
		url: 'tracing/api/hire/insert',
		method: 'post',
		data:data
	})
}
// 删除员工
export const  hireDelete= (data) => {
	return http.request({ 
		url: 'tracing/api/hire/delete',
		method: 'post',
		data:data
	})
}
//修改害虫预警开关
export const  updatePests= (data) => {
	return http.request({ 
		url: 'tracing/api/pests/updatePests',
		method: 'post',
		data:data
	})
}
//根据地块获取设备
export const  massifGetDeviceList= (data) => {
	return http.request({ 
		url: 'tracing/api/massif/getDeviceList',
		method: 'post',
		data:data
	})
}
//根据设备id解除绑定
export const  deviceUnbind= (data) => {
	return http.request({ 
		url: 'tracing/api/device/unbind',
		method: 'post',
		data:data
	})
}
//根据设备id删除设备
export const  deviceDelete= (data) => {
	return http.request({ 
		url: 'tracing/api/device/delete',
		method: 'post',
		data:data
	})
}
//生长监测通过设备id查询设备数据
export const  deviceGetPresentData= (data) => {
	return http.request({ 
		url: 'tracing/api/device/getPresentData',
		method: 'post',
		data:data
	})
}
//生长监测通过设备id查询直播
export const  deviceGetLivePath= (data) => {
	return http.request({ 
		url: 'tracing/api/device/getLivePath',
		method: 'post',
		data:data
	})
}
//获取生长历程图片
export const  deviceetScopeImage= (data) => {
	return http.request({ 
		url: 'tracing/api/device/getScopeImage',
		method: 'post',
		data:data
	})
}
// 获取附近设备总开关状态
export const  userFindNearby= (data) => {
	return http.request({ 
		url: 'tracing/api/user/findNearby',
		method: 'post',
		data:data
	})
}
// 修改附近设备总开关状态
export const  userUpdateNearby= (data) => {
	return http.request({ 
		url: 'tracing/api/user/updateNearby',
		method: 'post',
		data:data
	})
}
// 根据指定日期返回成长历程图
export const deviceGetImage= (data) => {
	return http.request({
		url: 'tracing/api/device/getImage',
		method: 'post',
		data:data
	})
}

//
export const getConfig= (data) => {
	return http.request({
		baseUrl: getApp().globalData.baseUrl3,
		url: 'tracing/api/oss/getConfig',
		method: 'post',
		data:data
	})
}

// 监测7日数据及设备数据
export const deviceGetDetails= (data) => {
	return http.request({
		url: 'tracing/api/device/getDetails',
		method: 'post',
		data:data
	})
}
