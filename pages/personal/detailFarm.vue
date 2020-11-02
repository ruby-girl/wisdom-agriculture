<!-- 农场详情 -->
<template>
	<view class="workOrder">
		<view class="top">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view
						class="cu-item flex-sub"
						:class="item.id == TabCur ? 'text-green cur' : ''"
						v-for="(item, index) in tabs"
						:key="index"
						@tap="tabSelect"
						:data-id="item.id"
					>
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 农场详情 -->
		<view v-show="TabCur == 1">
			<scroll-view v-bind:style="{ height: windowHeight + 'px' }" class="list-container" scroll-y="true">
				<view class="map-container">
					<map style="width:100%;height:300px;" :latitude="latitude" :longitude="longitude" :markers="covers" @callouttap="callouttapFunc">
						<!-- <cover-view slot="callout">
							<block>
								<cover-view class="customCallout" marker-id="1">
									
								</cover-view>
							</block>
						</cover-view> -->
					</map>
					<view class="map-top-box flex align-items-center justify-content-flex-justify">
						<view class="detail-name">
							<view>
								<text style="font-weight: bold;font-size: 16px;">{{ farmDetail.farmName }}</text>
							</view>
							<view class="detail-small-txt">
								<image style="width: 17px;height: 20px;" src="../../static/imgs/location-2.png" mode="aspectFill"></image>
								{{ farmAddress }}
							</view>
						</view>
						<view class="detail-img" @click="editFarm">
							<image src="../../static/imgs/deit.png" mode="aspectFill"></image>
							<view>编辑</view>
						</view>
					</view>
					<view class="map-bottom-box">
						<text style="font-weight: bold;font-size: 16px;">农场负责人</text>
						<view class="flex align-items-center justify-content-flex-justify">
							<view class="detail-name flex align-items-center" style="border:none;">
								<!-- <image style="width: 30px;height: 30px;" src="../../static/imgs/deit.png" mode="aspectFill"></image> -->
								<view class="cu-avatar lg round" :style="{ backgroundImage: 'url(' + masterPicture + ')' }"></view>
								<view style="line-height:18px;margin-left: 5px;">
									<view>{{ farmDetail.master }}</view>
									<view class="detail-small-txt">{{ farmDetail.masterPhone }}</view>
								</view>
							</view>
							<view class="detail-img">
								<image @click="callPhone(farmDetail.masterPhone)" style="width: 30px;height: 30px;" src="../../static/imgs/phone.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="farm-detail-box">
					<view><text style="font-size: 16px;">农场介绍</text></view>
					<view class="detail-small-txt">{{ farmDetail.introduce || '' }}</view>
					<view class="flex align-items-center imgs-box">
						<view v-for="(item, i) in imgArr" :key="i" class="cu-avatar lg" :style="{ backgroundImage: 'url(' + item + ')' }"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-show="TabCur == 2">
			<scroll-view
				v-bind:style="{ height: windowHeight + 'px' }"
				class="list-container"
				scroll-y="true"
				refresher-enabled="true"
				refresher-background="#eee"
				@refresherpulling="onPulling"
				@refresherrefresh="onRefresh"
				@refresherrestore="onRestore"
				@refresherabort="onAbort"
				:refresher-triggered="triggered"
				:refresher-threshold="100"
				@scrolltoupper="scrolltoupper"
				@scrolltolower="loadingData"
			>
				<view class="list-item" v-for="(item, index) in newsList" :key="index" @tap="toUrl(item)"><land-block :itemObject="item" /></view>
				<view class="loading-more">{{ contentdown }}</view>
			</scroll-view>
		</view>
		<view v-bind:style="{ height: windowHeight - 20 + 'px', padding: '10px 0', paddingTop: '100rpx' }" v-show="TabCur == 3">
			<scroll-view v-bind:style="{ height: windowHeight - 50 + 'px', backgroundColor: '#f0f0f0' }" class="list-container-1" scroll-y="true">
				<view style="height: 100%;background-color: #FFFFFF;">
					<template>
						<view class="cu-timeline" v-if="timeList.length > 0">
							<!-- <view class="cu-item text-olive" v-for="(item, i) in timeList" :key="i">
								<text class="small-text">{{ item.creationTime }}</text>
								<text class="small-text">1</text>
								<view class="flex justify-content-flex-justify align-items-center">
									<view class="timeline-box">
										<view style="color:#333">{{ item.farmName }} NO.{{ item.massifNo }} {{item.massifName}} {{item.deviceName}}</view>
										<view style="color:red">{{ item.warningName }}</view>
									</view>
									<navigator class="cu-btn bg-green" :url="'WarningProcessing?item=' + encodeURIComponent(JSON.stringify(item))">查看</navigator>
								</view>
							</view> -->
							<view class="cu-item text-olive" v-for="(item, i) in timeList" :key="i">
								<text class="small-text">{{ item.createTime }}</text>
								<view class="flex  align-items-center">
									<view class="timeline-box">
										<view style="color:#333">{{ item.farmName }} NO.{{ item.massifNo }} {{ item.massifName }}</view>
										<view style="color:red">{{ item.warnName }}</view>
									</view>
									<button size="mini" class="bg-green" @click="showModel(item.warnMessage)">查看</button>
								</view>
							</view>
						</view>
						<view class="loading-more" v-else><image src="../../static/imgs/No.png" mode="aspectFit" style="height: 80%;"></image></view>
					</template>
				</view>
			</scroll-view>
			<popup :content="modelContent" align="center" :show="popupShow" :showCancel="false" confirmText="我知道了" @close="closePopup" />
		</view>
	</view>
</template>

<script>
import QQMapWX from '@/static/qqmap-wx-jssdk.min.js';
import { throttle } from '@/utils/index.js';
import landBlock from '@/components/landBlock.vue';
import popup from '@/components/neil-modal/neil-modal.vue';
var qqmapsdk;
export default {
	components: {
		landBlock,
		popup
	},
	data() {
		return {
			latitude: 39.909,
			longitude: 116.39742,
			covers: [
				{
					latitude: '',
					longitude: ''
				}
			],
			farmDetail: {},
			farmId: '',
			farmAddress: '',
			tabs: [
				{
					id: 1,
					name: '农场信息'
				},
				{
					id: 2,
					name: '地块信息'
				},
				{
					id: 3,
					name: '预警'
				}
			],
			imgUrl: getApp().globalData.imgUrl,
			TabCur: 1,
			WarningTabCur: 1,
			newsList: [],
			page: 1,
			moreHeight: 30,
			windowHeight: 300,
			contentdown: '',
			loadingType: 0,
			triggered: false,
			_freshing: false,
			timeList: [],
			pestsList: [],
			popupShow: false,
			modelContent: '',
			imgArr: [],
			masterPicture: ''
		};
	},
	onLoad(option) {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		qqmapsdk = new QQMapWX({
			key: 'TN7BZ-YJKCP-OMTD3-LQKOM-2C5KZ-AWFUQ'
		});
		let _this = this;
		uni.getStorage({
			key: 'farmId',
			success: function(res) {
				_this.farmId = res.data;
				_this.getFarmDetail();
				_this.getData();
				// _this.massifFindFarmPests();
			}
		});
	},
	mounted() {
		this.loadingData = throttle(this.loadingData, 2000);
	},
	methods: {
		callouttapFunc: function(e) {
			// uni.navigateTo({
			// 	url: 'nearTheEquipment?latitude='+this.latitude+'&longitude='+this.longitude+'&farmId='+this.farmId
			// })
			// uni.navigateTo({
			// 	url: './nearTheEquipment?farmId=' + this.farmId
			// });
		},
		callPhone(phone) {
			if (!phone) return;
			uni.makePhoneCall({
				// 手机号
				phoneNumber: phone
			});
		},
		showModel(txt) {
			this.modelContent = txt;
			this.popupShow = true;
		},

		closePopup() {
			this.popupShow = false;
		},
		onPulling() {},
		onRefresh() {
			if (this._freshing) return;
			this._freshing = true;
			if (!this.triggered) {
				//界面下拉触发，triggered可能不是true，要设为true
				this.triggered = true;
			}
			let _this = this;
			setTimeout(() => {
				this.triggered = false; //触发onRestore，并关闭刷新图标
				this._freshing = false;
				_this.initData();
			}, 1000);
		},
		onRestore() {
			this.triggered = false; // 需要重置
			this._freshing = false;
		},
		onAbort() {
			this.triggered = false; //触发onRestore，并关闭刷新图标
			this._freshing = false;
		},
		initData() {
			this.newsList = [];
			this.page = 1;
			this.loadingType = 1;
			this.contentdown = '';
			this.getData();
		},
		scrolltoupper() {
			console.info('下拉');
		},
		loadingData(e) {
			this.lastTime = e.timeStamp;
			if (this.loadingType) {
				this.page++;
				this.contentdown = '加载中...';
				this.getData();
			}
		},
		warningAll(index, array) {
			//获取农场下所有预警
			this.$api.warnMsgGetAll().then(res => {
				var list = [];
				res.data.data.forEach(items => {
					array.forEach(item => {
						if (items.deviceId == item.deviceId) {
							list.push(items);
						}
					});
				});
				this.timeList = list;
				if (this.timeList.length > 0) {
					this.tabs[2].name = `预警（${this.timeList.length}）`;
				}
				// this.timeList = res.data.data.massifs;
				// if (++index < array.length) {
				// 	this.warningAll(index, array);
				// } else {
				// 	if (this.timeList.length > 0) {
				// 		this.tabs[2].name = `预警（${this.timeList.length}）`;
				// 	}
				// }
			});
		},
		// massifFindFarmPests() {
		// 	// 获取农场下所有病虫害
		// 	let obj = {
		// 		pageNum: 1,
		// 		pageSize: 100,
		// 		farmId: this.farmId
		// 	};
		// 	this.$api.massifFindFarmPests(obj).then(res => {
		// 		this.pestsList = res.data.data.massifs;
		// 		if (this.pestsList.length > 0) {
		// 			this.waningTabs[1].name = `病虫害（${this.pestsList.length}）`;
		// 		}
		// 	});
		// },
		getData() {
			//获取农场下所有地块
			this.$api.massifGetMassif({ farmId: this.farmId }).then(res => {
				this.findMassifIdByDevice(0, res.data.data);
				// this.newsList.forEach((item, i) => {
				// 	if (this.newsList[i].status == 'ONLINE') {
				// 		this.newsList[i].statusTxt = '在线';
				// 	} else if (this.newsList[i].status == 'OFFLINE') {
				// 		this.newsList[i].statusTxt = '离线';
				// 	} else if (this.newsList[i].status == 'UNACTIVE') {
				// 		this.newsList[i].statusTxt = '未激活';
				// 	} else if (this.newsList[i].status == 'DISABLE') {
				// 		this.newsList[i].statusTxt = '禁用';
				// 	}
				// });
			});
		},
		findMassifIdByDevice(index, array) {
			this.$api.monitor({ massifId: array[index].massifId }).then(res => {
				// 产品数据
				array[index].proportion = res.data.data.proportion;
				if (++index < array.length) {
					this.findMassifIdByDevice(index, array);
				} else {
					this.massifGetDeviceList(0, array);
				}
			});
		},
		massifGetDeviceList(index, array) {
			// 根据地块获取设备列表
			this.$api.massifGetDeviceList({ massifId: array[index].massifId }).then(res => {
				array[index].deviceId = res.data.data[0].deviceId;
				if (++index < array.length) {
					this.massifGetDeviceList(index, array);
				} else {
					this.getOneData(0, array);
					this.warningAll(0, array);
				}
			});
		},
		getOneData(index, array) {
			// 根据id获取设备详情
			this.$api.selectDevice({ deviceId: array[index].deviceId }).then(res => {
				if (res.data.data.Details.status == 'ONLINE') {
					array[index].statusTxt = '在线';
				} else if (res.data.data.Details.status == 'OFFLINE') {
					array[index].statusTxt = '离线';
				} else if (res.data.data.Details.status == 'UNACTIVE') {
					array[index].statusTxt = '未激活';
				} else if (res.data.data.Details.status == 'DISABLE') {
					array[index].statusTxt = '禁用';
				}
				if (++index < array.length) {
					this.getOneData(index, array);
				} else {
					this.deviceGetPresentData(0, array);
				}
			});
		},
		deviceGetPresentData(index, array) {
			//根据设备ID拿监测数据
			this.$api.deviceGetPresentData({ deviceId: array[index].deviceId }).then(res => {
				array[index].monitorings = res.data.data;
				if (++index < array.length) {
					this.deviceGetPresentData(index, array);
				} else {
					this.newsList = array;
				}
			});
		},
		getFarmDetail() {
			this.$api
				.farmGetOne({
					farmId: this.farmId
				})
				.then(res => {
					this.farmDetail = res.data.data[0].farm;
					this.masterPicture = res.data.data[0].masterPhotos[0].path;
					this.farmAddress = this.farmDetail.provinceName + this.farmDetail.cityName + this.farmDetail.countyName + (this.farmDetail.address || '');
					let area = this.farmDetail.provinceName + this.farmDetail.cityName + this.farmDetail.countyName;
					if (res.data.data[0].farmPhoto[0].path) {
						this.imgArr = res.data.data.farmPhoto[0].path; //农场图片
					}

					this.atuoGetLocation(this.farmAddress, area);
				});
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
		},
		warningTabSelect(e) {
			this.WarningTabCur = e.currentTarget.dataset.id;
			console.log(this.WarningTabCur == 1);
		},
		atuoGetLocation(addr, area) {
			//根据地址获取经纬度
			let _this = this;
			qqmapsdk.geocoder({
				address: addr,
				complete: res => {
					console.log('dis', res);
					if (res.result) {
						this.latitude = res.result.location.lat;
						this.longitude = res.result.location.lng;
						this.covers = [
							{
								id: 111,
								latitude: this.latitude,
								longitude: this.longitude
								// callout: {
								// 	content: '点击查看附近设备',
								// 	color: '#333333',
								// 	fontSize: 14,
								// 	borderWidth: 1,
								// 	borderRadius: 10,
								// 	borderColor: '#aaaaaa',
								// 	bgColor: '#fff',
								// 	padding: 4,
								// 	anchorY: -10,
								// 	anchorX: 0,
								// 	display: 'ALWAYS',
								// 	textAlign: 'center'
								// }
							}
						];
					} else {
						this.atuoGetLocation(area); //具体位置获取不到经纬度，用省市县地址获取
					}
				}
			});
		},
		dispose(row) {
			// 预警处理
			uni.switchTab({
				url: '../personal/personal'
			});
		},
		editFarm() {
			uni.navigateTo({
				url: 'addMyFarm?id=' + this.farmId
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.workOrder {
	background: #eee;

	.list-container {
		padding: 10rpx 0;
		padding-top: 100rpx;
	}

	.list-containers {
		padding: 10rpx 30rpx;
		padding-top: 100rpx;
	}
	.list-container-1 {
		padding: 10rpx 30rpx;
		padding-top: 0;
	}
}

.flex {
	display: flex;
}

.workOrder {
	height: 100%;

	.top {
		position: fixed;
		background-color: #fff;
		width: 100%;
		z-index: 1;
	}
}

.box-margin {
	padding-top: 10px;
}

.loading-more {
	text-align: center;
	color: #ddd;
	padding-bottom: 50rpx;
	padding-top: 20px;
	height: 100%;
}

.order-title {
	line-height: 20px;
}

.small-text {
	color: #999999;
	font-size: 13px;
}

.state-box {
	position: relative;
	right: -15px;
	padding: 3px 6px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
	background: #49ba89;
	color: #fff;
}

.item-content-box {
	width: 30%;
	text-align: center;

	.item-num {
		font-size: 18px;
		font-weight: bold;
	}
}

.timeline-box {
	text {
		color: red;
	}
}

// 地图CSS
.map-container {
	position: relative;
}

.detail-name {
	width: 75%;
	border-right: 1px solid #eee;
}

.detail-small-txt {
	color: #999;
	font-size: 13px;
}

.detail-img {
	width: 25%;
	text-align: center;
}

.detail-img image,
.detail-name image {
	width: 30rpx;
	height: 30rpx;
}

.detail-box {
	padding: 20rpx;
	background: #fff;
	border-radius: 6px;
}

.color-grey {
	color: #999;
}

.font-size-16 {
	font-size: 15px;
}

.map-top-box {
	position: absolute;
	top: 0;
	width: 96%;
	background: #fff;
	padding: 10rpx 20rpx;
	left: 2%;
	border-radius: 4px;
}

.map-bottom-box {
	position: absolute;
	bottom: 15rpx;
	left: 2%;
	width: 96%;
	background: #fff;
	padding: 10rpx 20rpx;
	border-radius: 4px;
}

.farm-detail-box {
	padding: 20rpx 30rpx;
	background: #fff;

	.detail-small-txt {
		text-indent: 2em;
	}
}

.cu-timeline {
	padding: 30rpx 0;
}

.imgs-box .cu-avatar.lg {
	width: 23%;
	height: 150rpx;
	margin-right: 6px;
}
.cu-nav .cu-items {
	height: 90rpx;
	display: inline-block;
	line-height: 90rpx;
	padding: 0 20rpx;
	white-space: nowrap;
	color: #9a9a9a;
}
.bg-white {
	background-color: #ffffff;
}

.color-black {
	color: #000000 !important;
}
.cu-btn {
	border-radius: 5rpx;
}
</style>
