<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true">
			<view class="bg-personal">
				<view class="uni-padding-wrap" style="width: 100%;">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
								<swiper-item><image mode="scaleToFill" src="../../static/imgs/index.png" style="width: 100%;height: 100%;"></image></swiper-item>
								<swiper-item><image mode="scaleToFill" src="../../static/imgs/index.png" style="width: 100%;height: 100%;"></image></swiper-item>
								<swiper-item><image mode="scaleToFill" src="../../static/imgs/index.png" style="width: 100%;height: 100%;"></image></swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<view class="flex padding-box justify-center" @tap="toFarm()">
				<view class="flex index-h3">推荐农场</view>
				<view class="flex index-span" >
					查看全部
					<image src="../../static/imgs/arrows.png" mode="" class="img-right"></image>
				</view>
			</view>
			<view class="page-section-spacing  " style="padding-bottom: 30rpx;border-bottom: 1px solid #E4E4E4;">
				<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%">
					<view id="demo1" class="scroll-view-item_H demo-text-1 " style="margin-left: 30rpx;" @tap="showFarm()">
						<image src="../../static/imgs/The-probe.jpg" class="scroll-view-item-img" mode=""></image>
						<view>绵阳九汇生态农场</view>
						<view class="flex index-span">以种植苹果、梨为主的水果农场</view>
						<view class="flex index-span">
							<image class="img-size" src="../../static/imgs/nearby.png"></image>
							绵阳
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="flex padding-box justify-center">
				<view class="flex index-h3">
					限时秒杀地块
					<view class="index-time">{{remaining}}</view>
				</view>
				<view class="flex index-span">
					查看全部
					<image src="../../static/imgs/arrows.png" mode="" class="img-right"></image>
				</view>
			</view>
			<view class="padding-box" style="padding-bottom: 25rpx;border-bottom: 1px solid #E4E4E4;">
				<view style="padding-bottom: 40rpx">
					<image src="../../static/imgs/The-probe.jpg" style="width: 100%;height: 300rpx;border-radius: 8rpx;"></image>
					<view class="font-size-16 card-height">圣女果新鲜水果10斤保底</view>
					<view class="flex">
						<view class="font-size-14">剩余：220份</view>
						<progress style="flex: 1;"  percent="40" border-radius="10"  stroke-width="8" activeColor="#4ABA8A" backgroundColor="#C9EEDE"/>
					</view>
					<view class="flex index-span font-size-14 card-height">
						<view class="flex-1">
							<image class="img-size" src="../../static/imgs/nearby.png"></image>
							成都 庆丰收农场
						</view>
						<view class="flex">
							<button class="" type="primary" plain="true" style="padding: 2rpx 12rpx;height: min-content;border-radius: 20px;font-size: 24rpx;line-height: 1.5;">认领中</button>
							<view class="flex">
								<view class="index-money" style="position: relative;top:-14rpx;">￥<span style="font-size: 40rpx;">120</span></view>/份
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex padding-box justify-center">
				<view class="flex index-h3">
					精选项目
				</view>
				<view class="flex index-span">
					查看全部
					<image src="../../static/imgs/arrows.png" mode="" class="img-right"></image>
				</view>
			</view>
			<view class="padding-box" style="padding-bottom: 30rpx;border-bottom: 1px solid #E4E4E4;">
				<view style="padding-bottom: 40rpx" @tap="farmManor()">
					<image src="../../static/imgs/The-probe.jpg" style="width: 100%;height: 300rpx;border-radius: 8rpx;"></image>
					<view class="font-size-16 card-height">圣女果新鲜水果10斤保底</view>
					<view class="flex ">
						<view class="font-size-14">剩余：220份</view>
						<progress style="flex: 1;"  percent="40" border-radius="10"  stroke-width="8" activeColor="#4ABA8A" backgroundColor="#C9EEDE"/>
					</view>
					<view class="flex index-span font-size-14 card-height">
						<view class="flex-1">
							<image class="img-size" src="../../static/imgs/nearby.png"></image>
							成都 庆丰收农场
						</view>
						<view class="flex">
							<button class="" type="primary" plain="true" style="padding: 2rpx 12rpx;height: min-content;border-radius: 20px;font-size: 24rpx;line-height: 1.5;">认领中</button>
							<view class="flex">
								<view class="index-money" style="position: relative;top:-14rpx;">￥<span style="font-size: 40rpx;">120</span></view>/份
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<tabBar :actives="0"></tabBar>
		</scroll-view>
	</view>
</template>

<script>
	import tabBar from '@/components/tabbar.vue';
export default {
	components:{tabBar},
	data() {
		return {
			windowHeight: 300,
			isLogin: false,
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			duration: 1000,

			remaining: '', //显示剩余时间
			remainingd: '' //数据返回时间秒
		};
	},
	components: {},
	onLoad() {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
		this.getmsglist(); //第一次加载数据
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
		showFarm(){
			uni.navigateTo({
				url:"/pageA/farmDetails?id="+ 1 +"&name=" + '九汇生态农场',
			})
		},
		toFarm(){
			console.log('111')
			uni.navigateTo({
				url:"../farm/farmList",
			})
		},
		farmManor(){
			
			uni.navigateTo({
				url:"../farm/farmManor",
			})
		},
		getmsglist: function() {
			var _self = this;
			_self.goodsid = uni.getStorageSync('goodsid');

			// console.log(res);
			_self.remainingd = 1000;
			_self.jishiqi(); //执行一次倒计时，因为进入页面有等待

			setInterval(function() {
				_self.jishiqi();
			}, 1000);

			uni.hideLoading(); //关闭加载
		},
		//倒计时计时器
		jishiqi: function() {
			var dj = this.remainingd;
			if (dj <= 0) {
				this.remaining = '已过期';
			} else {
				var ddf = this.djs(dj); //格式化过后的时间
				this.remaining = ddf;
				//当前时间减去时间
				dj = dj - 1;
				this.remainingd = dj;
			}
		},
		//得到的秒换算成时分秒
		djs: function(ms) {
			var h = parseInt(ms / (60 * 60));
			var m = parseInt((ms % (60 * 60)) / 60);
			var s = (ms % (60 * 60)) % 60;
			return h + ':' + m + ':' + s;
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
.swiper {
	height: 500rpx;
}
.scroll-view_H {
	white-space: nowrap;
}
.scroll-view-item {
	height: 300rpx;
}
.scroll-view-item_H {
	display: inline-block;
	width: 100%;
	height: 300rpx;
}
.padding-box {
	padding: 8px 15px;
	align-items: center;
	justify-content: center;
	letter-spacing: 5rpx;
}
.index-h3 {
	font-size: 35rpx;
	flex: 1;
	border-left: 3px solid #00ae66;
	padding: 0 15px;
	font-weight: 600;
}
.index-span {
	color: #c2c2c2;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.index-time {
	font-size: 20rpx;
	color: #ff0001;
	position: relative;
	margin: auto 10rpx;
}
.index-money {
	color: #ff0001;
}
.img-right {
	width: 18rpx;
	height: 24rpx;
	position: relative;
	margin: auto 10rpx;
}
.img-size {
	width: 30rpx;
	height: 34rpx;
	position: relative;
	margin: auto 0;
}
.scroll-view-item_H {
	width: 45%;
}
.scroll-view-item-img {
	border-radius: 18rpx;
	width: 100%;
	height: 70%;
}
.font-size-14{
	font-size: 28rpx;
}
.font-size-16{
	font-size: 32rpx;
}
.card-height{
	height: 60rpx;
}
</style>
