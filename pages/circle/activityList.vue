<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight  + 'px' }" 
			scroll-y="true" enable-back-to-top="true" 
			@scrolltolower="changeList"
			refresher-enabled="true"
			:refresher-triggered="triggered"
			@refresherrefresh="getList"
			>
			<view class="bg-personal padding-box" style="border-bottom: 1px solid #EEEEEE;padding-bottom: 20rpx;" @tap="detail">
				<image src="../../static/images/timg5ML2TXJY.jpg" style="width: 100%;height: 330rpx;border-radius: 10rpx;" mode="aspectFill"></image>
				<view >
					<view class="font-size-16">水晶甜石榴硬籽</view>
					<view class="flex align-center">
						<view class="flex-1 font-size-14">
							剩余<text style="font-size: 40rpx;">7</text>天
						</view>
						<view class="index-money">
							￥
							<text style="font-size: 45rpx;">12</text>
							<text class="color-grey">/斤</text>
						</view>
					</view>
					
					<view class="flex index-span">
						<image class="img-size" src="../../static/imgs/dingwei@3x.png"></image>
						<text class="color-grey">绵阳&nbsp;农场</text>
						
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	
</template>

<script>
export default {
	data() {
		return {
			windowHeight: 300,
			isLogin: false,
			page:1,
			triggered:false,
			_freshing: false,
		};
	},
	components: {},
	onLoad() {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
	},
	// onShareAppMessage: function() {
	// 	return {
	// 		title: '科维特',
	// 		desc: '',
	// 		path: 'pages/personal/personal'
	// 	}
	// },
	onShow() {
		// if (!this.isLogin) { //每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
		// 	this.isLogin = getApp().globalData.isLogin
		// 	if (this.isLogin) {
		// 		this.getCount()
		// 	}
		// }else{
		// 	this.getCount()
		// }
	},
	methods: {
		getList(){
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
				uni.showToast({
					title:'刷新',
					icon:'none'
				})
			}, 1000);
		},
		detail(){
			uni.navigateTo({
				url:'./activityDetail'
			})
		}
	}
};
</script>

<style lang="less">
page {
	background: #fff;
}
.bg-personal {
	position: relative;
}
.uni-padding-wrap {
	width: 100%;
	padding: 0;
}
.text-h3{
	font-size: 34rpx;
}
.font-size-12{
	font-size: 24rpx;
}
.font-size-14{
	font-size: 28rpx;
}
.font-size-16{
	font-size: 32rpx;
}

.text-overflows{
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.color-grey{
	color: #C2C2C2;
}
.img-size {
	width: 22rpx;
	height: 28rpx;
	position: relative;
	margin: auto 10rpx auto 0;
}
.text-bottom-right{
	position: absolute;
	bottom: 15rpx;
	right: 0;
}
.index-money {
	color: #ff0001;
}
.padding-box {
	padding: 8px 15px;
	align-items: center;
	justify-content: center;
}

</style>
