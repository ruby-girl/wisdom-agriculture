<!-- 设备列表-->
<template>
	<view class="workOrder">
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true">
			<view style="margin-bottom: 30rpx;">
				<view class="top equipmentManagement-title flex  align-items-center justify-content-flex-justify">
					<view style="font-size: 16px;font-weight: bold;" class="flex  align-items-center">
						<image style="height:24px" src="../../static/imgs/equipmentManagement.png" mode=""></image>
						<text>我的项目</text>
					</view>
					<view class="equipmentManagement-btn" @tap="AddItem">
						<image src="../../static/imgs/add.png" mode=""></image>
						<text>新建</text>
					</view>
				</view>
				<view style="background-color: #FFFFFF;">
					<view class="text-gray" style="position: relative;text-align: right;top: 10rpx;" @tap="toList()">查看更多<uni-icons type="arrowright" color="#ccc"></uni-icons></view>
					<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%;padding:15px;position: relative;">
						<view id="demo1" class="scroll-view-item_H demo-text-1 " @tap="toDetai()">
							<image src="../../static/imgs/The-probe.jpg" class="scroll-view-item-img"  mode="aspectFill"></image>
							<view class="font-size-12 text-gray" style="padding: 0 10rpx;">生态无公害圣女果红</view>
							<view class="flex " style="padding: 0 10rpx;">
								<view class="font-size-12 text-gray flex-1">
									剩余
									<text class="text-red">7</text>
									天
								</view>
								<view class="font-size-12 text-gray">已达成90%</view>
							</view>
						</view>
						<view id="demo1" class="scroll-view-item_H demo-text-1 ">
							<image src="../../static/imgs/The-probe.jpg" class="scroll-view-item-img"  mode="aspectFill"></image>
							<view class="font-size-12 text-gray" style="padding: 0 10rpx;">生态无公害圣女果红</view>
							<view class="flex " style="padding: 0 10rpx;">
								<view class="font-size-12 text-gray flex-1">
									剩余
									<text class="text-red">7</text>
									天
								</view>
								<view class="font-size-12 text-gray">已达成90%</view>
							</view>
						</view>
						<view id="demo1" class="scroll-view-item_H demo-text-1 ">
							<image src="../../static/imgs/The-probe.jpg" class="scroll-view-item-img"  mode="aspectFill"></image>
							<view class="font-size-12 text-gray" style="padding: 0 10rpx;">生态无公害圣女果红</view>
							<view class="flex " style="padding: 0 10rpx;">
								<view class="font-size-12 text-gray flex-1">
									剩余
									<text class="text-red">7</text>
									天
								</view>
								<view class="font-size-12 text-gray">已达成90%</view>
							</view>
						</view>
					</scroll-view>
				</view>
				
			</view>
			<view style="margin-bottom: 30rpx;">
				<view class="top equipmentManagement-title flex  align-items-center justify-content-flex-justify">
					<view style="font-size: 16px;font-weight: bold;" class="flex  align-items-center">
						<image style="height:24px" src="../../static/imgs/equipmentManagement.png" mode=""></image>
						<text>我的圈子</text>
					</view>
					<view class="equipmentManagement-btn" @tap="AddCircle">
						<image src="../../static/imgs/add.png" mode=""></image>
						<text>新建</text>
					</view>
				</view>
				<view class="flex" style="padding: 16rpx 30rpx;flex-direction: column;background-color: #FFFFFF;border-bottom: 1px solid #BFBFBF;">
					<view class="flex" style="align-items:center;margin: 10rpx 0;justify-content: end;">
						<image src="../../static/imgs/The-probe.jpg" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
						<view class="font-size-12" style="margin-left: 28rpx;">种植小能手</view>
					</view>
					<text class="text-gray font-size-12" >
						2020-12-12
					</text>
					<view class="font-size-12 color-grey">项目进行的很顺利，老板人也很好，有问题及时就处理了。收到的苹果也很好，都没有烂 果,而且味道很甜，送了一些给朋友，都说很值。</view>
					<view class="flex" style="flex-wrap: wrap;margin-top: 20rpx;">
						<image src="../../static/imgs/The-probe.jpg" mode="aspectFill" style="width: 30%;height: 140rpx;margin-right: 22rpx;"></image>
						<image src="../../static/imgs/The-probe.jpg" mode="aspectFill" style="width: 30%;height: 140rpx;margin-right: 22rpx;"></image>
						<image src="../../static/imgs/The-probe.jpg" mode="aspectFill" style="width: 30%;height: 140rpx;margin-right: 22rpx;"></image>
					</view>
					<view class="flex " style="margin-top: 30rpx;margin-bottom: 20rpx;">
						<view class="text-gray font-size-12">10分钟前</view>
						<view class="text-gray font-size-12">10分钟前</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<tabbar :actives="2"></tabbar>
	</view>
</template>

<script>
import { throttle } from '@/utils/index.js';
	import tabbar from "@/components/tabbar.vue";
import notLogin from '@/components/notLogin/notLogin.vue';
export default {
	components: {
		notLogin,
		tabbar
	},
	data() {
		return {
			orderList: [],
			newsList: [],
			
			
			page: 1,
			moreHeight: 30,
			windowHeight: 300,
			contentdown: '',
			newsList: [],
			loadingType: 0,
			triggered: false,
			_freshing: false,
			isLogin: false,
			countObj: {}
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
		
		AddItem(){// 新建项目
			uni.navigateTo({
				url:'/pageB/addActivity',
			})
		},
		AddCircle(){// 新建圈子
			uni.navigateTo({
				url:'/pageA/addNetworkVideo?type=image'
			})
		},
		toList(){
			uni.navigateTo({
				url:'/pageB/activityList'
			})
		},
		toDetai(){
			uni.navigateTo({
				url:'/pageB/activityDetail'
			})
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
			let obj = {
				pageNum: this.page,
				pageSize: 6
			};
			this.$api.findByDevice(obj).then(res => {
				this.newsList = this.newsList.concat(res.data.data.devices);
				this.newsList.forEach((item, i) => {
					if (this.newsList[i].status == 'ONLINE') {
						this.newsList[i].statusTxt = '在线';
					} else if (this.newsList[i].status == 'OFFLINE') {
						this.newsList[i].statusTxt = '离线';
					} else if (this.newsList[i].status == 'UNACTIVE') {
						this.newsList[i].statusTxt = '未激活';
					} else if (this.newsList[i].status == 'DISABLE') {
						this.newsList[i].statusTxt = '禁用';
					}
				});
				if (this.page == 1 && this.newsList.length == 0) {
					this.loadingType = 0;
					this.contentdown = '暂无数据';
				} else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length < 3) {
					this.contentdown = '';
					this.loadingType = 0;
				} else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length > 2) {
					this.contentdown = '无更多数据';
					this.loadingType = 0;
				} else if (res.data.data.rowCount == this.newsList.length) {
					this.loadingType = 0;
					this.contentdown = '无更多数据';
				} else {
					this.contentdown = '上拉加载更多';
					this.loadingType = 1;
				}
				if (n) {
					//设备列表请求时间过长，所以放在回调里获取在线数/所有设备
					this.deviceCount();
				}
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
		width: 100%;
	}
}
.box-margin {
	padding-top: 10px;
}
.list-item {
	box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
	border-radius: 6px;
	background: #fff;
	padding: 20rpx 0 20px 10px;
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

.scroll-view_H {
	white-space: nowrap;
}
.scroll-view-item {
	height: 300rpx;
}
.scroll-view-item_H {
	display: inline-block;
	width: 40%;
	border: 1px solid #d8d8d8;
	border-radius: 20rpx;
	margin-right: 5px;
}
.scroll-view-item-img {
	// border-radius: 20rpx;
	border-top-right-radius: 20rpx;
	border-top-left-radius: 20rpx;
	width: 100%;
	height: 210rpx;
}
.font-size-12{
	font-size: 24rpx;
}
</style>
