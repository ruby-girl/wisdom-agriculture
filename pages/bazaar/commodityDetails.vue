<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true" style="background-color: #FFFFFF;padding-bottom: 50px;">
			<view class="bg-personal">
				<view class="uni-padding-wrap" style="width: 100%;">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
								<swiper-item><image mode="aspectFill" src="../../static/images/index.jpg" style="width: 100%;height: 100%;"></image></swiper-item>
							</swiper>
						</view>
					</view>
				</view>
				<view class="padding-box" style="border-bottom: 1px solid #EEEEEE;">
					<view class="index-money">
						￥
						<text style="font-size: 40rpx;">120</text>
						<!-- <text style="color: #C0C0C0;">/1块地</text> -->
					</view>
					<view class="font-size-16">水晶甜石榴硬籽</view>

					<view class="flex margin-box ">
						<view class="flex-1 font-size-12 text-gray" style="padding: 0;">快递:免运费</view>
						<view class="flex-1 font-size-12 text-gray text-center" style="padding: 0;">月销120笔</view>
						<view class="flex-1 font-size-12 text-gray text-right" style="padding: 0;">四川成都</view>
					</view>
				</view>
				<view class="container-input" >
					<view class="cu-form-group item-jt" >
						<view class="title display-flex align-items-center">
							<image src="../../static/imgs/share.png" mode=""></image>
							<text style="margin-left: 30rpx;">二维码海报</text>
						</view>
						<image src="../../static/imgs/arrows.png" mode=""></image>
					</view>
					<view class=" item-jt" style="margin-bottom: 30rpx;">
						<view class="title display-flex align-items-center">
							<text class="text-gray" style="padding: 0;margin-right: 5px;">服务</text>
							<text style="margin-left: 30rpx;">7天无理由 · 新品 · 72小时内发货</text>
						</view>
					</view>
				</view>	
			</view>
			<!-- <view class="line-gray"></view> -->
			<view class="flex padding-box justify-center text-center">
				<view class="standard" >
					<image src="../../static/images/timg3RV2I4X0.jpg" mode="aspectFill"></image>
					<view class="font-size-12">成长档案</view>
				</view>
				<view class="standard" style="border-left: 1px solid #BFBFBF;">
					<image src="../../static/images/timgQ5KMALQZ.jpg" mode="aspectFill"></image>
					<view class="font-size-12">溯源详情</view>
				</view>
				
			</view>
			<view class="line-gray"></view>
			<view class="top">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center justify-center" style="padding-bottom: 8rpx;border-bottom: 1px solid #D8D8D8;">
						<view
							class="cu-item font-size-16"
							:class="item.id == TabCur ? 'text-green cur' : ''"
							v-for="(item, index) in tabs"
							:key="index"
							@tap="tabSelect"
							:data-id="item.id"
						>
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-if="TabCur == 1">
				<view class="detaile">
					<view class="detaile-li">品牌:</view>
					<view class="detaile-li">石榴</view>
					<view class="detaile-li">种植方式：</view>
					<view class="detaile-li">有机种植</view>

					<view class="detaile-li">储存方式：</view>
					<view class="detaile-li">冷藏</view>
					<view class="detaile-li">分量总数:</view>
					<view class="detaile-li">1000份</view>
					<view class="detaile-li">物流配送：</view>
					<view class="detaile-li">快递邮寄</view>
					<view class="detaile-li">产量预估:</view>
					<view class="detaile-li">300斤</view>
					<view class="detaile-li">最低收益保障：</view>
					<view class="detaile-li">200g/份</view>
					<view class="detaile-li">播种时间：</view>
					<view class="detaile-li">2018年3月</view>
					<view class="detaile-li">每份价格:</view>
					<view class="detaile-li">35元/份</view>
					<view class="detaile-li">收获时间：</view>
					<view class="detaile-li">2020年9月</view>
				</view>
				<view class="line-gray"></view>
				<image src="../../static/images/fsafwa.jpg" style="width: 100%;"></image>
				<image src="../../static/images/fsafwa.jpg" style="width: 100%;"></image>
			</view>
			<view v-else-if="TabCur == 2">
				<view class="flex padding-box justify-center margin-box"><view class="flex index-h3">720度全景展示</view></view>
				<view class="flex padding-box">
					<image src="../../static/images/fsafwa.jpg" mode="aspectFill" style="width: 100%;border-radius: 20rpx;height: 350rpx;"></image>
				</view>
				<view class="line-gray-1"></view>
				<view class="flex padding-box justify-center margin-box"><view class="flex index-h3">详情介绍</view></view>
				<view class="flex padding-box">苹果树是喜低温干燥的温带果树。而绵阳的气候正适合 苹果生长，所以当地产的苹果都又大又甜。</view>
				<view class="flex padding-box"><image src="../../static/images/fsafwa.jpg" mode="aspectFill" style="width: 100%;height: 350rpx;"></image></view>
				<view class="flex padding-box">
					<video
						src="https://6e6f-normal-env-ta6pc-1300924598.tcb.qcloud.la/video-swiper/1589851354869410.mp4?sign=1f636557effa496e074332e3f4b9b8aa&t=1589851461"
						enable-play-gesture="true"
						style="width: 100%;height: 350rpx;"
					></video>
				</view>
				<view class="flex padding-box"><image src="../../static/images/fsafwa.jpg" mode="aspectFill" style="width: 100%;height: 350rpx;"></image></view>
			</view>
			<view v-else>
				<view class="flex" style="padding: 16rpx 30rpx;flex-direction: column;">
					<view class="flex" style="align-items:center;margin: 10rpx 0;">
						<image src="../../static/images/timgQ5KMALQZ.jpg" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
						<view class="font-size-12" style="margin-left: 30rpx;">种植小能手</view>
					</view>
					<text class="color-grey font-size-12">2020-12-12</text>
					<view class="font-size-12 color-grey">
						项目进行的很顺利，老板人也很好，有问题及时就处理了。收到的苹果也很好，都没有烂 果,而且味道很甜，送了一些给朋友，都说很值。
					</view>
					<view class="flex" style="flex-wrap: wrap;margin-top: 20rpx;">
						<image src="../../static/images/timg7FHKTBR0.jpg" mode="aspectFill" style="width: 30%;height: 140rpx;margin-right: 22rpx;"></image>
						<image src="../../static/images/timg7FHKTBR0.jpg" mode="aspectFill" style="width: 30%;height: 140rpx;margin-right: 22rpx;"></image>
						<image src="../../static/images/timg7FHKTBR0.jpg" mode="aspectFill" style="width: 30%;height: 140rpx;margin-right: 22rpx;"></image>
					</view>
				</view>

				<view class="flex" style="padding: 16rpx 30rpx;flex-direction: column;">
					<view class="flex" style="align-items:center;margin: 10rpx 0;">
						<image src="../../static/images/timgQ5KMALQZ.jpg" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
						<view class="font-size-12" style="margin-left: 30rpx;">种植小能手</view>
					</view>
					<text class="color-grey font-size-12">2020-12-12</text>
					<view class="font-size-12 color-grey">
						项目进行的很顺利，老板人也很好，有问题及时就处理了。收到的苹果也很好，都没有烂 果,而且味道很甜，送了一些给朋友，都说很值。
					</view>
					<view class="flex" style="flex-wrap: wrap;margin-top: 20rpx;">
						<image src="../../static/images/timg7FHKTBR0.jpg" mode="aspectFill" style="width: 30%;height: 140rpx;margin-right: 20rpx;"></image>
						<image src="../../static/images/timg7FHKTBR0.jpg" mode="aspectFill" style="width: 30%;height: 140rpx;margin-right: 20rpx;"></image>
						<image src="../../static/images/timg7FHKTBR0.jpg" mode="aspectFill" style="width: 30%;height: 140rpx;margin-right: 20rpx;"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-goods-nav style="position: fixed;bottom: 0;width: 100%;" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
	</view>
</template>

<script>
import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
export default {
	components: { uniGoodsNav },
	data() {
		return {
			windowHeight: 300,
			isLogin: false,
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			duration: 1000,
			active_video: false,
			percent: 0,
			pColoc: '',
			tabs: [
				{
					id: 1,
					name: '项目介绍'
				},
				{
					id: 2,
					name: '农场秀'
				},
				{
					id: 3,
					name: '新农人说'
				}
			],
			TabCur: 1,
			commend: false,
			options: [
				{
					icon: 'shop',
					text: '店铺',
					// info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: 'red'
				},
				{
					icon: 'headphones',
					text: '客服'
				},
				
				{
					icon: 'star',
					text: '收藏',
					// info: 2
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ffa200',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ff0000',
					color: '#fff'
				}
			]
		};
	},
	components: {},
	onLoad(option) {
		var _self = this;
		_self.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		_self.isLogin = getApp().globalData.isLogin;
		console.log(option);
		// setInterval(function(){
		// 	_self.add();
		// },100)
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
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
		},
		onClick(e) {
			uni.showToast({
				title: `点击${e.content.text}`,
				icon: 'none'
			});
		},
		buttonClick(e) {
			uni.navigateTo({
				url: 'farmPay'
			});
		}
	},
	mounted() {}
};
</script>

<style lang="scss" scoped>
.bg-personal {
	position: relative;
}
.swiper {
	height: 700rpx;
}
.uni-padding-wrap {
	width: 100%;
	padding: 0;
}
.scroll-view_H {
	white-space: nowrap;
}
.scroll-view-item {
	height: 300rpx;
}
.scroll-view-item_H {
	display: inline-block;
	width: 35%;
	border: 1px solid #d8d8d8;
	border-radius: 20rpx;
	margin-right: 40rpx;
}

.scroll-view-item-img {
	// border-radius: 20rpx;
	border-top-right-radius: 20rpx;
	border-top-left-radius: 20rpx;
	width: 100%;
	height: 210rpx;
}
.text-h3 {
	font-size: 34rpx;
}
.index-money {
	color: #ff0001;
}
.index-h3 {
	font-size: 35rpx;
	flex: 1;
	border-left: 3px solid #00ae66;
	padding: 0 15px;
	font-weight: 600;
}
.font-size-12 {
	font-size: 24rpx;
}
.font-size-16 {
	font-size: 32rpx;
}
.text-overflows {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.color-grey {
	color: #8c8c8c;
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
	border-bottom: 2px solid #49ba89;
}
.padding-box {
	padding: 8px 15px;
	align-items: center;
	justify-content: center;
	letter-spacing: 5rpx;
}
.margin-box {
	margin: 20rpx 0;
}
.line-height {
	line-height: 60rpx;
	font-weight: 600;
}
.line-gray {
	border-bottom: 16rpx solid #eeeeee;
}
.line-gray-1 {
	border-bottom: 1rpx solid #eeeeee;
	margin-top: 40rpx;
}
.text-red {
	color: #ff0000;
}
.text-gray {
	color: #9a9a9a;
	padding: 10rpx;
}
.standard {
	flex: 1;
	text-align: center;
	margin: 30rpx 0;
	letter-spacing: 8rpx;
	image {
		width: 120rpx;
		height: 120rpx;
		margin: auto;
		border-radius: 50%;
	}
}
.detaile {
	display: flex;
	margin: 60rpx 15px;
	// border: 1px solid;
	flex-wrap: wrap;
	.detaile-li {
		width: 50%;
		padding: 20rpx 20rpx;
		font-size: 24rpx;
		border: 1px solid #b5b5b5;
		text-align: center;
	}
}
.video {
	width: 100%;
	height: 100vh;
	position: relative;
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
	.title>.small-img{
		width: 38rpx;
		height: 38rpx;
		margin-right: 5px;
	}
	.title>image {
		width: 55rpx;
		height: 55rpx;
		margin-right: 5px;
	}
	.item-jt>image {
		width: 14rpx;
		height: 28rpx;
	}
</style>
