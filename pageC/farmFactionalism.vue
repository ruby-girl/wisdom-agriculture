<template>
	<page-meta><navigation-bar :title="Title" front-color="#000000" background-color="#FFFFFF" :color-animation-duration="1000" color-animation-timing-func="linear" /></page-meta>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true" style="background-color: #FFFFFF;">
			<view class="flex padding-box justify-center ">
				<view class="flex index-h3 " style="align-items: baseline;">
					绵阳古法种植无籽苹果
					<view class="index-time">(20份)</view>
				</view>
			</view>
			<view class=" index-span font-size-12 text-right" style="position: relative;top: -10px;right: 15px;">
				距成熟还有
				<text class=" color-red font-size-16">120</text>
				天
			</view>

			<view class="flex align-center margin-box bg-1 color-1">
				你有一条待处理信息
				<image src="../static/imgs/arrows.png" mode="" class="img-right"></image>
			</view>
			<view class="line-gray"></view>
			<view class="bg-personal">
				<view class="flex padding-box">
					<image class="images" src="../static/images/cfdffd.jpg" mode="aspectFill"></image>
					<image class="images" src="../static/images/cfdffd.jpg" mode="aspectFill"></image>
					<image class="images" src="../static/images/cfdffd.jpg" mode="aspectFill"></image>
				</view>
				<view class="flex font-size-12 right-card" style="top: 38rpx;">
					<image src="../static/imgs/location.png" style="width: 50rpx;height: 50rpx;"></image>
					<text style="padding: 0 12rpx;">农场社区(63人)</text>
				</view>
			</view>
			<view class="line-gray"></view>
			<view>
				<view class="text-h1 text-green margin-box flex justify-center">综合农场指标</view>
				<Line-chart></Line-chart>
				<view >
					<arc-chart style="width: 50%;float: left;margin-bottom: 30rpx;"></arc-chart>
					<arc-chart style="width: 50%;float: left;margin-bottom: 30rpx;"></arc-chart>
					<arc-chart style="width: 50%;float: left;margin-bottom: 30rpx;"></arc-chart>
					<arc-chart style="width: 50%;float: left;margin-bottom: 30rpx;"></arc-chart>
					<view style="clear: both;"></view>
				</view>
			</view>
			<view class="line-gray"></view>
			<view class="bg-personal">
				<view class="flex font-size-12 right-card" style="top: 45rpx;">
					<image src="../static/imgs/location.png" style="width: 50rpx;height: 50rpx;"></image>
					<text style="padding: 0 12rpx;">历史追溯</text>
				</view>
				<view class="flex font-size-12 right-card" style="top: 125rpx;" @tap="video()">
					<image src="../static/imgs/location.png" style="width: 50rpx;height: 50rpx;"></image>
					<text style="padding: 0 12rpx;">领地直播</text>
				</view>
				<image src="../static/images/u=12638188,2993346786&fm=26&gp=0.jpg" mode="aspectFill" style="width: 100%;height:700rpx;"></image>
			</view>
			<video class="videos"  v-if="active_video" :src="videoSrc" enable-play-gesture="true" autoplay="true">
				<view class="top">
					<cover-view class="top_box">
						<cover-view class="top" @tap="closeVideo">
							<icon type="clear" size="26"/>
						</cover-view>
					</cover-view>
				</view>
			</video>
			
		</scroll-view>
		
	</view>
</template>

<script>
	
import LineChart from '@/components/u-charts/u-charts/instrumentpanel.vue'	
import ArcChart from '@/components/u-charts/u-charts/arc.vue'	
export default {
	components: {
		LineChart,
		ArcChart,
	},
	data() {
		return {
			windowHeight: 300,
			isLogin: false,
			active_video: false,
			Title: '',
			videoSrc:'',
			
		};
	},
	components: {},
	onLoad(option) {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
		console.log(option);
		this.Title = option.name;
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
		video(){
			this.active_video = true;
			this.videoSrc = 'http://pili-live-hls.tree-iot.com/zhslive/6008317A708CC1.m3u8';
		},
		closeVideo(){ // 关闭抖音视频模式
			this.active_video = false;
			this.videoSrc = '';
		},
	},
	mounted() {}
};
</script>

<style lang="scss" scoped>
.bg-personal {
	position: relative;
}
.img-right {
	width: 18rpx;
	height: 24rpx;
	position: absolute;
	// margin: auto 10rpx;
	right: 10rpx;
}
.text-h1{
	font-size: 50rpx;
}
.text-h3 {
	font-size: 34rpx;
}
.index-h3 {
	font-size: 34rpx;
	flex: 1;
	border-left: 3px solid #00ae66;
	padding-left: 30rpx;
	font-weight: 600;
}
.color-red {
	color: #ff0000;
}
.font-size-12 {
	font-size: 24rpx;
}
.font-size-14 {
	font-size: 28rpx;
}
.font-size-16 {
	font-size: 32rpx;
}
.line-gray {
	border-bottom: 16rpx solid #eeeeee;
}
.color-grey {
	color: #8c8c8c;
}
.color-1 {
	color: #ff8847;
}
.bg-1 {
	background-color: #fce8d8;
}
.images {
	width: 100rpx;
	height: 100rpx;
	margin-right: 20rpx;
	border-radius: 50%;
}
.img-size {
	width: 25rpx;
	height: 34rpx;
	position: relative;
	margin: auto 10rpx auto 0;
	top: 6rpx;
}
.text-bottom-right {
	position: absolute;
	bottom: 15rpx;
	right: 0;
}
.text-green {
	color: #49ba89;
}
.padding-box {
	padding: 8px 15px;
	letter-spacing: 5rpx;
}
.margin-box {
	padding: 8px 15px;
	letter-spacing: 5rpx;
}
.line-height {
	line-height: 60rpx;
	font-weight: 600;
}

.text-red {
	color: #ff0000;
}
.text-gray {
	color: #9a9a9a;
	padding: 10rpx;
}
.right-card{
	position: absolute;
	align-items: center;
	background-color: #4ABA8A;
	color: #FFFFFF;
	border-top-left-radius: 30rpx;
	border-bottom-left-radius: 30rpx;
	padding: 6rpx 14rpx;
	z-index: 1;
	right: 0;
}
.videos{
	position: fixed;
	top: 0;
	width: 100%;
	height: 100vh;
	z-index: 10;
}
.top_box{
	width: 100rpx;
	
	position: absolute;
	z-index: 2;
	top: 0;
	right: 12rpx;
	display: flex;
	flex-direction: column;
	
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 37rpx;
	}
}
</style>
