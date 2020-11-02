<template>
	<view class="bodys" v-bind:style="{height:windowHeight + 'px',backgroundImage:'url(' + backgroundImageUrl+ ')',backgroundSize:'100%'}" style="">
		<!-- <view class="flex top">
			<text class="text-serch">当前农作物：{{ text }}</text>
			<view class="text-but" @tap="SwitchCrops()">切换作物</view>
		</view> -->
		<view class="flex">
			<view class="item-box">
				<view class="flex justify-content-flex-justify item-jt align-items-center">
					<image src="../../static/imgs/recognition-disease-entities.png" mode="heightFix" @tap="scan('entities')" v-bind:style="{height:windowHeight/2 - 40 + 'px'}" style="margin:0 auto;"></image>
				</view>
				<view class="flex justify-content-flex-justify item-jt align-items-center">
					<image src="../../static/imgs/recognition-diseases-pests.png" mode="heightFix" @tap="scan('pests')"  v-bind:style="{height:windowHeight/2 - 40 + 'px'}" style="margin:0 auto;"></image>
				</view>
			</view>
		</view>
		<consult v-on:click='click' ></consult>
	</view>
</template>

<script>
import http from '@/utils/request.js'
import consult from '@/components/consult.vue'
export default {
	data() {
		return {
			text: '草莓',
			avatarUrl: null,
			isLogin: false,
			windowHeight:300,
			backgroundImageUrl: http.config.baseUrl + 'upload/beijing.png',
		};
	},
	components: {
		consult,
	},
	onLoad() {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		let _this = this;
		uni.getStorage({
			key: 'XYZNUserInfo',
			success: function(res) {
				_this.isLogin = true;
				getApp().globalData.isLogin = true;
				_this.user = {
					nickName: res.data.nickName || '',
					phone: res.data.phone || '',
					avatarUrl: res.data.avatarUrl
				};
				_this.getCount();
			},
			fail: function() {
				_this.isLogin = false;
				getApp().globalData.isLogin = false;
			}
		});
	},
	onShareAppMessage: function() {
		return {
			title: '星鸦智农',
			desc: '',
			path: 'pages/aiRecognition/aiRecognition'
		};
	},
	onShow() {
		if (!this.isLogin) {
			//每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
			this.isLogin = getApp().globalData.isLogin;
			if (this.isLogin) {
				this.getCount();
			}
		} else {
			this.getCount();
		}
	},
	methods: {
		
		SwitchCrops() {
			// 切换作物
			if (!this.isLogin) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}
			uni.showToast({
				title: '暂未开放',
				icon: 'none'
			});
		},
		
		scan(e) {
			// 识别病虫/病种
			if (!this.isLogin) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}
			if (e != 'pests'){
				uni.showToast({
					title: '暂未开放',
					icon: 'none'
				});
				return
			}
			var that = this;
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					uni.showLoading({
					    title: '识别中'
					});
					var tempFilePaths = res.tempFilePaths;
					uni.uploadFile({
						url: http.config.baseUrl+'api/ai/pests', 
						filePath: tempFilePaths[0],
						name: 'file',
						header:{
							'token': uni.getStorageSync('XYZNUserInfo').token 
						},
						success: (uploadFileRes) => {
							var list = JSON.parse(uploadFileRes.data)
							var array = list.data.result;
							if (list.data.result.length > 3) {
								array = array.slice(0,3);
							}
							console.log(uploadFileRes)
							uni.navigateTo({
							    url: './identifyResults?iamge='+tempFilePaths + '&item=' + encodeURIComponent(JSON.stringify(array))
							});
						}
					});
						
				},
				fail: function(res) {
					uni.showToast({
						title: '请求超时，请重试',
						icon: 'none'
					});
				}
				
			});
		},

		click(index,name) {
			// 查百科
			if (!this.isLogin) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}
			uni.showToast({
				title: name + '暂未开放',
				icon: 'none'
			});
		},
	
		getCount() {
			this.$api.massifCount().then(res => {
				this.nums = res.data.data;
			});
		},
	}
};
</script>

<style lang="scss" scoped>
	
.top {
	padding: 30rpx 0 30rpx 40rpx;
}
.text-serch {
	background-color: #ffffff;
	height: 100%;
	width: 75%;
	padding: 12rpx 0 12rpx 40rpx;
	border-radius: 10rpx;
	font-size: 18rpx;
	color: #999999;
}
.text-but {
	width: 25%;
	text-align: center;
	color: #17bb89;
	font-size: 28rpx;
}
.title > image {
	width: 36rpx;
	height: 36rpx;
	margin-right: 5px;
}
.item-box {
	margin: auto;
}

.positon-box {
	position: relative;
	top: -80rpx;
	z-index: 1011;
	padding: 0 30rpx;

	.position-num {
		font-size: 28px;
		font-weight: bold;
		color: #49ba89;
		text-align: center;
	}
}
.bg {
	background-color: #ffffff;
	width: 32%;
	border-radius: 10rpx;
	display: flex;
	justify-content: center;
}
</style>
