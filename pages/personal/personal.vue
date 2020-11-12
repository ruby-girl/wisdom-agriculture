<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true">
			<view class="bg-personal">
				<view v-if="isLogin">
					<view class="user-info text-center flex">
						<view class="text-lg">
							<image style="width:90rpx;height:90rpx;border-radius: 50%;" :src="user.avatarUrl" mode=""></image>
						</view>
						<view style="text-align: left;padding-left:20rpx;line-height: 3;">
							<text style="color:#fff">{{user.nickName||''}}</text>
							<!-- <view style="color:#fff" class="text-gray">{{user.phone||''}}</view> -->
						</view>

					</view>
					<view class="flex justify-content-flex-justify padding-box" style="padding-top: 0;">
						<view class="flex-1" style="border-right: 1px solid #FFFFFF;">
							<view class="position-max">
								{{cart}}
							</view>
							<view class="position-min">
								购物车
							</view>
						</view>
						<view class="flex-1">
							<view class="position-max">
								2
							</view>
							<view class="position-min">
								我的钱包
							</view>
						</view>
					</view>
				</view>
				<view style="padding:40rpx 30rpx 0rpx 30rpx" v-else>
					<view class="login-box" @click="showPopup">
						登录/注册
					</view>
				</view>

			</view>
			<view class="container-input">
				<view>我的项目</view>
				<view class="flex justify-content-flex-justify " style="padding: 20rpx 0;">
					<view class="flex-1 text-center text-gray">
						<image src="../../static/imgs/付款.png" style="width: 50rpx;height: 50rpx;"></image>
						<view>待付款</view>
					</view>
					<view class="flex-1 text-center text-gray">
						<image src="../../static/imgs/待收获.png" style="width: 50rpx;height: 50rpx;"></image>
						<view>待收获</view>
					</view>
					<view class="flex-1 text-center text-gray">
						<image src="../../static/imgs/物流发货.png" style="width: 50rpx;height: 50rpx;"></image>
						<view>待发货</view>
					</view>
					<view class="flex-1 text-center text-gray">
						<image src="../../static/imgs/收货入库.png" style="width: 50rpx;height: 50rpx;"></image>
						<view>待收货</view>
					</view>
					<view class="flex-1 text-center text-gray">
						<image src="../../static/imgs/评价.png" style="width: 50rpx;height: 50rpx;"></image>
						<view>待评价</view>
					</view>
				</view>
				<view class="flex justify-content-flex-justify " style="padding: 20rpx 0;">
					<view class="flex-1 text-center text-gray">
						<image src="../../static/imgs/售后.png" style="width: 50rpx;height: 50rpx;"></image>
						<view>待售后</view>
					</view>
					<view class="flex-1 text-center text-gray"></view>
					<view class="flex-1 text-center text-gray"></view>
					<view class="flex-1 text-center text-gray"></view>
					<view class="flex-1 text-center text-gray"></view>
				</view>
			</view>
			<view class="container-input">
				<form>
					<view class="cu-form-group item-jt" @tap="toAddress">
						<view class="title display-flex align-items-center border-left">
							地址管理
						</view>
						<image src="../../static/imgs/arrows.png" mode=""></image>
					</view>

					<view class="cu-form-group item-jt" @tap="toTerms">
						<view class="title display-flex align-items-center border-left">
							关于我们
						</view>
						<image src="../../static/imgs/arrows.png" mode=""></image>
					</view>
					<view class="cu-form-group item-jt">
						<view class="title display-flex align-items-center border-left">
							意见反馈
						</view>
						<image src="../../static/imgs/arrows.png" mode=""></image>
					</view>
					<view class="cu-form-group item-jt">
						<view class="title display-flex align-items-center border-left">
							使用指南
						</view>
						<image src="../../static/imgs/arrows.png" mode=""></image>
					</view>
				</form>
			</view>
			<button v-if="isLogin" @click="toLogin" class="cu-btn block line-green lg" style="width:90%;margin:60rpx auto">退出</button>
		</scroll-view>
		<popup content='是否跳转到登录页面？' align='center' cancelText="我再看看" :show='popupShow' :showCancel='true' confirmText='确定'
		 @confirm="confirmFunc" @close="closePopup" />
	</view>
</template>

<script>
	import popup from "@/components/neil-modal/neil-modal.vue"
	export default {
		components: {
			popup
		},
		data() {
			return {
				switchB: true,
				windowHeight: 0,
				cart: 0,
				user: {},
				isLogin: false,
				popupShow: false
			};
		},

		onLoad() {
			let _this = this
			this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
			uni.getStorage({
				key: 'XYZNUserInfo',
				success: function(res) {
					_this.isLogin = true
					getApp().globalData.isLogin = true
					_this.user = {
						nickName: res.data.nickName || '',
						phone: res.data.phone || '',
						avatarUrl: res.data.avatarUrl
					}
					// _this.getList()
				},
				fail: function() {
					_this.isLogin = false
					getApp().globalData.isLogin = false
				},
			});
		},
		onShareAppMessage: function() {
			return {
				title: '科维特',
				desc: '',
				path: 'pages/personal/personal'
			}
		},
		onShow() {
			if (!this.isLogin) { //每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
				this.isLogin = getApp().globalData.isLogin
				if (this.isLogin) {
					this.getList()
				}
			} else {
				this.getList()
			}
		},
		methods: {
			closePopup() {
				this.popupShow = false
			},
			toGetNearTheEquipment() {
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pageA/getNearTheEquipment'
				});
			},
			toSetWaring() { //跳转预警设置
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: 'landWaring'
				});
			},
			toMandate() {
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pageA/mandate'
				});
			},
			toAddress(){
				uni.navigateTo({
					url:'/pageD/shippingAddress'
				})
			},
			toTerms(){
				uni.navigateTo({
					url:'/pageA/termsOfService'
				})
			},
			getList() { // 收藏
				this.$api.cartGetList().then(res => {
					this.nums = res.data.data.length;
				}).catch(res => {
					this.isLogin = false
					getApp().globalData.isLogin = false
				})
			},
			toMyFarm() { //跳转我的农场
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}

				uni.navigateTo({
					url: 'myFarm'
				});
			},
			toLandManagement() { //跳转地块管理
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: 'landManagement'
				});
			},
			toLogin() { //退出
				uni.clearStorageSync();
				uni.redirectTo({
					url: '/pages/login/login'
				});
			},
			confirmFunc() {
				this.toLogin()
			},
			showPopup() {
				this.popupShow = true
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #fff;
	}

	.bg-personal {
		height: 300rpx;
		background: #17BB89;
		position: relative;
		z-index: 1;
		border-radius: 0 0 50% 50%;
	}

	.user-info {
		margin: 0 30rpx;
		padding: 40rpx 40rpx 0 40rpx;
		padding-left: 0;

		.text-lg image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.form-input-left {
		text-align: right;
	}

	.title>image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 5px;
	}

	.item-jt>image {
		width: 14rpx;
		height: 28rpx;
	}

	.title>.small-img {
		width: 38rpx;
		height: 38rpx;
		margin-right: 5px;
	}

	.tip-text {
		color: #999999;
		font-size: 14px;
	}

	.item-box {
		width: 45%;
		background: #fff;
		padding: 15rpx;
		border-radius: 6px;
	}

	.positon-box {
		position: relative;
		top: -80rpx;
		z-index: 1011;
		padding: 0 30rpx;

		.position-num {
			font-size: 28px;
			font-weight: bold;
			color: #49BA89;
			text-align: center;
		}
	}

	.container-input {
		padding: 0 30rpx;
		z-index: 11111;
		background: #fff;
		position: relative;
		border-bottom: 10px solid #F5F5F5;
		// top: -40rpx;
	}

	.cu-form-group {
		padding: 1px 0;
	}

	.disabled-txt {
		padding-right: 20rpx;
	}

	.right-jt {
		font-size: 23px;
		color: #828282;
		width: 16px;
	}

	.login-box {
		background: #17BB89;
		padding: 3px 0;
		border-radius: 17px;
		border: 1px solid #fff;
		color: #fff;
		width: 160rpx;
		text-align: center;
	}

	.padding-box {
		position: relative;
		padding: 30rpx;

		.position-min {
			font-size: 24rpx;
			color: #FFFFFF;
			text-align: center;
		}

		.position-max {
			font-size: 34rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}

	.border-left {
		padding-left: 30rpx;
		border-left: 3px solid #00AE66;
	}
</style>
