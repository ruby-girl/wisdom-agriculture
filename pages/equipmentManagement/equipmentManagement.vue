<!-- 设备列表-->
<template>
	<view class="workOrder">
		<view v-if="isLogin">
			<view class="top equipmentManagement-title flex  align-items-center justify-content-flex-justify">
				<view style="font-size: 16px;font-weight: bold;" class="flex  align-items-center">
					<image style="height:24px" src="../../static/imgs/equipmentManagement.png" mode=""></image>
					<text>
						在线设备
						<text v-show="countObj.deviceCount > 0">{{ countObj.statusCount }}/{{ countObj.deviceCount }}</text>
					</text>
				</view>
				<view class="equipmentManagement-btn" @click="toAdd">
					<image src="../../static/imgs/add.png" mode=""></image>
					<text>添加</text>
				</view>
			</view>
		<!-- 	<scroll-view
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
			> -->
			<scroll-view
				v-bind:style="{ height: windowHeight + 'px' }"
				class="list-container"
				scroll-y="true"
				enable-back-to-top="true"
			>
				<view class="list-item" :style="{ 'margin-top': index == 0 ? true : false }" v-for="(item, index) in newsList" :key="index">
					<view class="">
						<view class="flex align-items-center justify-content-flex-justify">
							<view class="">
								<text>SN:{{ item.deviceSn || '' }}</text>
								<text>{{ item.deviceName || '' }}</text>
							</view>
							<view>
								<image v-if="item.Details.status == 'ONLINE'" class="line-img" src="../../static/imgs/online.png" mode="aspectFill"></image>
								<image v-else class="line-img" src="../../static/imgs/offline.png" mode="aspectFill"></image>
								<text :style="{ color: item.statusTxt == '在线' ? '#49BA89' : '#E50C05' }">{{ item.statusTxt || '' }}</text>
								<image class="jt-img" src="../../static/imgs/arrows.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view class="item-bottom-box">
						<view class="flex align-items-center justify-content-flex-justify">
							<view class="item-bottom-box-left" style="border-right:1px solid #eee;">
								<view class="flex align-items-center justify-content-flex-justify"><view>版本信息</view></view>
								<view>{{ item.Details.firmwareVersion }}</view>
								<!-- <text>已是最新版本</text> -->
							</view>
							<!-- 报红 -->
							<view style="padding-left:20rpx;color:red" class="flex align-items-flex-start justify-content-flex-justify item-bottom-box-left">
								<view>
									<view>设备状态</view>
									<view v-if="item.statusTxt !== '在线'">故障码</view>
								</view>
								<view>
									<view v-if="item.statusTxt == '在线'" style="color:#333">正常</view>
									<view v-else>{{ item.statusTxt }}</view>
									<view v-if="item.statusTxt !== '在线'">XXX</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" style="padding: 10rpx;border-top: 1px solid #E5E5E5;">
						<view class="flex align-items-center justify-content-flex-justify">
							<view class="text-center flex-1 small-text " style="border-right: 1px solid #E5E5E5;" @tap="show(false, item.deviceId)">解绑</view>
							<view class="text-center flex-1 small-text" @tap="toDetail(item.deviceId)">换绑</view>
							<view class="text-center flex-1" style="border-left: 1px solid #E5E5E5;font-size: 12px;color: #E50C05;" @tap="show(true, item.deviceId)">删除</view>
						</view>
					</view>
				</view>
				<view class="loading-more">{{ contentdown }}</view>
			</scroll-view>
		</view>
		<view v-else><not-login /></view>
		<popup :content="textMsg" align="center" cancelText="我再想想" :show="popupShow" :showCancel="true" confirmText="确定" @confirm="confirmFunc()" @close="closePopup" />
	</view>
</template>

<script>
import popup from '@/components/neil-modal/neil-modal.vue';
import { throttle } from '@/utils/index.js';
import notLogin from '@/components/notLogin/notLogin.vue';
export default {
	components: {
		notLogin,
		popup
	},
	data() {
		return {
			orderList: [],
			newsList: [],
			baseId: '',
			obj: {
				baseId: '',
				organUserId: '',
				plantingBatchStatus: '' //批次状态
			},
			listObj: {
				plantingBatchId: '', //批次ID
				timeType: '', //时间
				workOrderStatus: '', //工单状态
				initiatorId: '' //发起人
			},
			page: 1,
			moreHeight: 30,
			windowHeight: 300,
			contentdown: '',
			newsList: [],
			loadingType: 0,
			triggered: false,
			_freshing: false,
			isLogin: false,
			countObj: {},
			popupShow: false,
			textMsg: '',
			deviceId: '',
			type: ''
		};
	},
	onLoad(option) {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
	},
	onShareAppMessage: function() {
		return {
			title: '星鸦智农',
			desc: '',
			path: 'pages/equipmentManagement/equipmentManagement'
		};
	},
	onShow() {
		if (!this.isLogin) {
			//每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
			this.isLogin = getApp().globalData.isLogin;
			if (this.isLogin) {
				this.initData(1);
			}
		} else {
			this.initData(1);
		}
	},
	mounted() {
		this.loadingData = throttle(this.loadingData, 2000);
	},
	methods: {
		show(num, id) {
			this.popupShow = true;
			this.deviceId = id;
			this.type = num;
			if (num) {
				this.textMsg = '删除设备会清除该设备所有数据,确认删除么？';
			} else {
				this.textMsg = '解绑设备会解除与现有地块的绑定,确认解绑么？';
			}
		},
		confirmFunc() {
			var api = '';
			var that = this;
			if (this.type) {
				api = 'deviceDelete';
			} else {
				api = 'deviceUnbind';
			}
			this.$api[api]({ deviceId: this.deviceId }).then(res => {
				uni.showToast({
					title: '成功',
					success() {
						that.initData();
					}
				});
			});
		},
		closePopup() {
			this.popupShow = false;
		},
		deviceCount() {
			//获取在线数/所有设备
			this.$api.deviceCount().then(res => {
				this.countObj = res.data.data;
			});
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
		initData(n) {
			this.newsList = [];
			this.page = 1;
			this.loadingType = 1;
			this.contentdown = '';
			this.getData(n);
		},
		toAdd() {
			//添加设备页面
			uni.navigateTo({
				url: 'addEquipment'
			});
		},
		toDetail(id) {
			//跳转详情
			uni.navigateTo({
				url: 'addEquipment?deviceId=' + id
			});
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
		getData(n) {
			this.$api.deviceGetListData().then(res => {
				res.data.data.forEach(item =>{
					if(item.status=='ONLINE'){
						item.statusTxt='在线'
					}else if(item.status=='OFFLINE'){
						item.statusTxt='离线'
					}else if(item.status=='UNACTIVE'){
						item.statusTxt='未激活'
					}else if(item.status=='DISABLE'){
						item.statusTxt='禁用'
					}
				});
				this.newsList = res.data.data
			});
		},
		
	}
};
</script>

<style lang="scss" scoped>
page,
.workOrder {
	background: #eee;

	.list-container {
		padding: 10rpx 30rpx;
		padding-top: 80rpx;
	}
}

.flex {
	display: flex;
	justify-content: space-between;
}

.workOrder {
	height: 100%;
	.top {
		position: fixed;
		width: 100%;
		z-index: 1;
	}
}
.box-margin {
	padding-top: 10px;
}
.list-item {
	box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
	border-radius: 6px;
	background: #fff;
	padding: 20rpx 20rpx 0 20rpx;
	margin: 20rpx 8rpx 30rpx 8rpx;

	image {
		width: 28px;
		height: 28px;
		margin-right: 20rpx;
		position: relative;
		top: 3px;
	}
}

.loading-more {
	text-align: center;
	color: #ddd;
	padding-bottom: 50rpx;
	padding-top: 20px;
}

.content {
	padding: 30rpx;
	overflow-y: auto;
	position: relative;
	padding-top: 200rpx;

	.item {
		padding: 30rpx;
		line-height: 30rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
		margin-bottom: 30rpx;

		.flex {
			margin-bottom: 20rpx;
		}
	}

	.imgIcon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10px;
	}
}

.order-title {
	line-height: 20px;
}
.small-text {
	color: #999999;
	font-size: 13px;
}
.equipmentManagement-title {
	padding: 15rpx 30rpx;
	background: #eee;
	image {
		width: 24px;
		margin-right: 5px;
	}
	.equipmentManagement-btn {
		background: #17bb89;
		padding: 3px 8px;
		border-radius: 17px;
		color: #fff;
		image {
			width: 10px;
			height: 10px;
			margin-right: 3px;
		}
	}
}
.line-img {
	width: 20px !important;
	height: 20px !important;
}
.jt-img {
	width: 8px !important;
	height: 16px !important;
	margin-left: 5px;
}
.item-bottom-box {
	border-top: 1px solid #eee;
	padding-top: 20rpx;
	margin-right: 20rpx;
}
.item-bottom-box-left {
	width: 50%;
	padding: 20rpx 20rpx 20rpx 0;
}
</style>
