<template>
	<view class="bodys" v-bind:style="{height:windowHeight - 11 + 'px'}" >
		<view  style="margin: 20rpx;background-color: #FFFFFF;border-radius: 10rpx;" @tap="getSite">
			<view class="flex" style="padding: 14rpx;align-items: center;">
				<image src="../static/imgs/location.png" style="width: 90rpx;height: 90rpx;border-radius: 10rpx;" mode="aspectFill"></image>
				<view class="flex bg-personal" style="flex: 1;padding: 30rpx;flex-direction: column;overflow: hidden;border-right: 1px solid #DCDCDC;">
					<view >
						<text class="font-size-14" style="font-weight: 600;margin-right: 20rpx;">名字</text><text>1995087xxxx</text>
					</view>
					<view class="font-size-12 color-grey" >四川省绵阳市江油市 四川省绵阳市江油市xx街xx号</view>
				</view>
				<view style="padding: 20rpx;color: #00AE66;" @tap="edit">
					编辑
				</view>
			</view>
		</view>
		<view @tap="ToAdd" class="bottom-lg-btn">新增收货地址</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			windowHeight:'',
		};
	},

	onLoad() {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		let _this = this;
		console.log(this.windowHeight)
	},
	// onShareAppMessage: function() {
	// 	return {
	// 		title: '科维特',
	// 		desc: '',
	// 		path: 'pages/aiRecognition/aiRecognition'
	// 	};
	// },
	onShow() {
		// if (!this.isLogin) {
		// 	//每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
		// 	this.isLogin = getApp().globalData.isLogin;
		// 	if (this.isLogin) {
		// 		this.getCount();
		// 	}
		// } else {
		// 	this.getCount();
		// }
	},
	methods: {
		ToAdd(){
			uni.navigateTo({
				url:'./addshippingAddress'
			})
		},
		edit(){
			uni.navigateTo({
				url:'./addshippingAddress'
			})
		}
		
	}
};
</script>

<style lang="scss" scoped>
	.bg-personal {
		position: relative;
	}

	.bottom-lg-btn {
		position: fixed;
		bottom: 5%;
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width: 90%;
		margin-left: 5%;
		text-align: center;
		color: #fff;
	}
</style>
