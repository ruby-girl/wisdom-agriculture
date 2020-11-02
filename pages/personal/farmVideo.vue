<!-- 设备列表-->
<template>
	<view class="workOrder">
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true">
			<view style="margin-bottom: 30rpx;">
				<view class="top equipmentManagement-title flex  align-items-center justify-content-flex-justify">
					<view style="font-size: 16px;font-weight: bold;" class="flex  align-items-center">
						<image style="height:24px" src="../../static/imgs/equipmentManagement.png" mode=""></image>
						<text>我的农场视频</text>
					</view>
					<view class="equipmentManagement-btn" @tap="Add">
						<image src="../../static/imgs/add.png" mode=""></image>
						<text>新增</text>
					</view>
				</view>
				<view class="Grid">
					<view class="Grid-Item" @tap="showVideo(0)">
						<view class="GSimg"><image class="Image" src="../../static/imgs/The-probe.jpg" mode="aspectFill"></image></view>
						<image class="GStoptitle" src="../../static/imgs/视频@2x.png"></image>
						<view class="GSbottomtitle">
							<image class="Image" src="../../static/imgs/心@2x.png"></image>
							170
						</view>
					</view>
				</view>
			</view>
			
		</scroll-view>
		
		<!-- <view v-else>
			<not-login />
		</view> -->
	</view>
</template>

<script>
import { throttle } from '@/utils/index.js';
import notLogin from '@/components/notLogin/notLogin.vue';
export default {
	components: {
		notLogin
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
		Add(){// 新建
			uni.navigateTo({
				url: '/pageA/addNetworkVideo?type=video',
			});
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
			// this.$api.findByDevice(obj).then(res => {
			
			// });
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.workOrder {
	background: #fff;

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
	background: #fff;
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

.Grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-between;
	padding: 10rpx 0;
	.Grid-Item {
		width: 33%;
		// padding: 2rpx;
		text-align: center;
		position: relative;
		.GSimg {
			.Image {
				height: 350rpx;
			}
		}
		.GStoptitle {
			position: absolute;
			top: 25rpx;
			right: 20rpx;
			width: 45rpx;
			height: 45rpx;
		}
		.GSbottomtitle {
			.Image {
				width: 38rpx;
				height: 32rpx;
				margin: 0 10rpx 0 0;
				position: relative;
				top: 7rpx;
			}
			position: absolute;
			bottom: 15rpx;
			left: 10rpx;
			color: #ffffff;
			font-size: 28rpx;
		}
	}
}
.font-size-12{
	font-size: 24rpx;
}
</style>
