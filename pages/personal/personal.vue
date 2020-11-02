<template> 
	<view>
		<view class="bg-personal">
			<view class="user-info text-center flex" v-if="isLogin">
				<view class="text-lg">
					<image style="width:90rpx;height:90rpx;border-radius: 50%;" :src="user.avatarUrl" mode=""></image>
				</view>
				<view style="text-align: left;padding-left:20rpx">
					<!-- <text style="color:#fff">{{user.nickName||''}}</text> -->
					<text style="color:#fff">{{userCode}}</text>
					<view style="color:#fff" class="text-gray">{{user.phone||''}}</view>
				</view>
			</view>
			<view style="padding:40rpx 30rpx" v-else>
				<view class="login-box" @click="showPopup">
					登录/注册
				</view>
			</view>
		</view>
		<view class="bg-personal" style="margin-bottom: 140rpx;" :class="[userCode == 'ADMIN'?'height_225':'height_30']">
			<view class="flex justify-content-flex-justify positon-box">
				<view class="item-box" @click="toMyFarm">
					<view class="flex justify-content-flex-justify item-jt align-items-center">
						<view class="title display-flex align-items-center">
							<image src="../../static/imgs/farm-management.png" mode=""></image>我的农场
						</view>
						<image src="../../static/imgs/arrows.png" mode=""></image>
					</view>
					<view class="position-num">
						{{nums.farmCount}}
					</view>
				</view>
				<view class="item-box" @click="toLandManagement()">
					<view class="flex justify-content-flex-justify item-jt align-items-center">
						<view class="title display-flex align-items-center">
							<image src="../../static/imgs/dikuai.png" mode=""></image>我的地块
						</view>
						<image src="../../static/imgs/arrows.png" mode=""></image>
					</view>
					<view class="position-num">
						{{nums.massifCount}}
					</view>
				</view>
			</view>
			<view v-show="userCode == 'ADMIN'" class="flex justify-content-flex-justify positon-box " style="margin-top: 20rpx;">
				<view class="item-box" @tap="toFarmVideo">
					<view class="flex justify-content-flex-justify item-jt align-items-center">
						<view class="title display-flex align-items-center">
							<image src="../../static/imgs/farm-management.png" mode=""></image>农场视频
						</view>
						<image src="../../static/imgs/arrows.png" mode=""></image>
					</view>
					<view class="position-num">
						{{nums.farmCount}}
					</view>
				</view>
				<view class="item-box" @tap="toEquipmentMannagement">
					<view class="flex justify-content-flex-justify item-jt align-items-center">
						<view class="title display-flex align-items-center">
							<image src="../../static/imgs/dikuai.png" mode=""></image>设备管理
						</view>
						<image src="../../static/imgs/arrows.png" mode=""></image>
					</view>
					<view class="position-num">
						{{nums.massifCount}}
					</view>
				</view>
			</view>
		</view>
		<view class="container-input">
			<form>
				<view class="cu-form-group item-jt">
					<view class="title display-flex align-items-center">
						<image src="../../static/imgs/tip.png" mode=""></image>版本更新
					</view>
					<text class="tip-text">当前1.1.0</text>
				</view>
				<view class="cu-form-group item-jt" @click="toSetWaring">
					<view class="title display-flex align-items-center">
						<image src="../../static/imgs/warning.png" mode=""></image>预警设置
					</view>
					<image src="../../static/imgs/arrows.png" mode=""></image>
				</view>
				<view class="cu-form-group item-jt" @click="toMandate">
					<view class="title display-flex align-items-center">
						<image class="small-img" src="../../static/imgs/shouquan.png" mode=""></image>授权
					</view>
					<image src="../../static/imgs/arrows.png" mode=""></image>
				
				</view>
				<view class="cu-form-group item-jt" @click="toUs">
					<view class="title display-flex align-items-center">
						<image src="../../static/imgs/about.png" mode=""></image>关于我们
					</view>
					<image src="../../static/imgs/arrows.png" mode=""></image>

				</view>
				<view class="cu-form-group item-jt justify-center" v-if="isLogin" @click="toLogin">
					<view class="title display-flex align-items-center">
						退出当前账号
					</view>
				</view>
			</form>
		</view>
		<!-- <button v-if="isLogin" @click="toLogin" class="cu-btn block line-green lg" style="width:90%;margin:60rpx auto">退出</button> -->
		<popup content='是否跳转到登录页面？' align='center' cancelText="我再看看" :show='popupShow' :showCancel='true' confirmText='确定'
		 @confirm="confirmFunc" @close="closePopup" />
		 <tabbar :actives="3"></tabbar>
	</view>
</template>

<script>
	import popup from "@/components/neil-modal/neil-modal.vue"
	import tabbar from "@/components/tabbar.vue"
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
				popupShow: false,
				userCode: uni.getStorageSync('XYZNUserInfo').roleCode,
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
					url: '/pageA/impowerList'
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
				uni.navigateTo({
					url: './farmVideo'
				});
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
					this.nums.massifCount = res.data.data;
				}).catch(res=>{
					console.info('没登录')
					this.isLogin = false
					getApp().globalData.isLogin = false
				});
				this.$api.farmCount().then(res => {
					this.nums.farmCount = res.data.data
				}).catch(res =>{
					console.info('没登录')
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
		height: 250rpx;
		background: #17BB89;
		position: relative;
		z-index: 1;
	}
	.height_225{
		height: 225rpx ;
	}
	.height_30{
		height: 30rpx ;
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
		top: -40rpx;
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
