<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight  + 'px' }" 
			scroll-y="true" enable-back-to-top="true" style="background-color: #EEEEEE;"
			@scrolltolower="changeList"
			refresher-enabled="true"
			:refresher-triggered="triggered"
			@refresherrefresh="getList"
			>
			<view  style="margin: 18rpx;background-color: #FFFFFF;border-radius: 10rpx;" @tap="showFarm()">
				<view class="flex" style="padding: 14rpx;">
					<image src="../../static/images/timgQ5KMALQZ.jpg" style="width: 250rpx;height: 250rpx;border-radius: 10rpx;" mode="aspectFill"></image>
					<view class="flex bg-personal" style="flex: 1;padding: 30rpx;flex-direction: column;letter-spacing: 8rpx;overflow: hidden;">
						<view class="text-h3">绵阳九汇生态农场</view>
						<view class="font-size-12 text-overflows" >主营业务：农家乐旅游、苹果和梨种等多种项目</view>
						<view class="font-size-12 text-overflows color-grey">绵阳市江油市xx区xx路xx号</view>
						<view class="flex font-size-12 text-overflows color-grey">
								<image class="img-size" src="../../static/imgs/nearby.png"></image>
								22km
						</view>
						<view class="font-size-12 text-bottom-right">
								在种项目  4个
						</view>
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
		showFarm(){
			uni.navigateTo({
				url:"farmFactionalism?id="+ 1 +"&name=" + '九汇生态农场',
			})
		},
		changeList(){
			console.log(this.page++)
		}
	}
};
</script>

<style lang="scss" scoped>
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
.text-overflows{
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.color-grey{
	color: #8C8C8C;
}
.img-size {
	width: 30rpx;
	height: 34rpx;
	position: relative;
	margin: auto 10rpx auto 0;
}
.text-bottom-right{
	position: absolute;
	bottom: 15rpx;
	right: 0;
}
</style>
