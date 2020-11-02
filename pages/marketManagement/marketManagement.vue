<template>
	<view>
		<view class="bg-personal">
			<view class="user-info text-center flex align-center" v-if="isLogin">
				<image style="width:90rpx;height:90rpx;border-radius: 50%;" :src="user.avatarUrl" mode=""></image>
				<view style="text-align: left;padding-left:20rpx;align-items: center;">
					<view style="color:#fff">绵阳九汇农场</view>
				</view>
			</view>
			<view style="padding:40rpx 30rpx" v-else>
				<view class="login-box" @click="showPopup">
					登录/注册
				</view>
			</view>
			<view class="flex justify-content-flex-justify positon-box">
				<view class="flex-1" style="border-right: 1px solid #FFFFFF;">
					<view class="position-max">
						1
					</view>
					<view class="position-min">
						今日订单
					</view>
				</view>
				<view class="flex-1" >
					<view class="position-max">
						2
					</view>
					<view class="position-min">
						今日成交
					</view>
				</view>
			</view>
		</view>
		
		<view class="container-input">
			<view class="flex justify-content-flex-justify positon-box">
				<view class="flex-1" >
					<view class="position-max">
						1
					</view>
					<view class="position-min">
						今日订单
					</view>
				</view>
				<view class="flex-1" >
					<view class="position-max">
						2
					</view>
					<view class="position-min">
						今日成交
					</view>
				</view>
			</view>
		</view>
		<tabbar :actives="1"></tabbar>
	</view>
</template>

<script>
	import popup from "@/components/neil-modal/neil-modal.vue";
	import tabbar from "@/components/tabbar.vue";
	export default {
		data() {
			return {
				switchB: true,
				nums: {
					massifCount:'-',
					farmCount:'-'
				},
				user: {},
				isLogin: false,
				popupShow: false
			};
		},
		components: {
			popup,
			tabbar
		},
		onLoad() {
			let _this = this
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
					 _this.getCount()
				},
				fail: function() {
					_this.isLogin = false
					getApp().globalData.isLogin = false
				},
			});
		},
		onShareAppMessage: function() {
			return {
				title: '星鸦智农',
				desc: '',
				path: 'pages/personal/personal'
			}
		},
		onShow() {
			if (!this.isLogin) { //每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
				this.isLogin = getApp().globalData.isLogin
				if (this.isLogin) {
					this.getCount()
				}
			}else{
				this.getCount()
			}
		},
		methods: {
			closePopup() {
				this.popupShow = false
			},
			toGetNearTheEquipment(){
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
			toMandate(){
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
			toFarmVideo(){
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				// uni.navigateTo({
				// 	url: '/pageA/mandate'
				// });
			},
			toEquipmentMannagement(){
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/equipmentManagement/equipmentManagement'
				});
			},
			getCount() {
				this.$api.massifCount().then(res => {
					this.nums = res.data.data;
				}).catch(res=>{
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
			toUs(){
				uni.navigateTo({
					url: 'aboutUs'
				});			
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-personal {
		// height: 250rpx;
		background: #17BB89;
		position: relative;
		z-index: 1;
	}

	.user-info {
		margin: 0 30rpx;
		padding: 40rpx;
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
	.title>.small-img{
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
		padding: 30rpx;
		
		.position-min {
			font-size: 28rpx;
			color: #FFFFFF;
			text-align: center;
		}
		
		.position-max{
			font-size: 25px;
			color: #FFFFFF;
			text-align: center;
		}
	}

	.container-input {
		padding: 0 30rpx;
		z-index: 11111;
		background: #fff;
		position: relative;
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
</style>
