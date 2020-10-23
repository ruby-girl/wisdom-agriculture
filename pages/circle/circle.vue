<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true">
			<view class="flex padding-box justify-center"  @tap="toActivity">
				<view class="flex index-h3">热门活动</view>
				<view class="flex index-span" >
					查看全部
					<image src="../../static/imgs/arrows.png" mode="" class="img-right"></image>
				</view>
			</view>
			<view class="page-section-spacing  card" >
				<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%;margin: 0 15px;">
					<view id="demo1" class="scroll-view-item_H demo-text-1 " @tap="toDetail">
						<image src="../static/images/u=3182281012,3984649657&fm=26&gp=0.jpg" class="scroll-view-item-img"  mode="aspectFill"></image>
						<view class="font-size-12 " style="padding: 0 10rpx;">南瓜节游园活动</view>
						<view class="flex " style="padding: 0 10rpx;">
							<view class="font-size-12 text-gray flex-1">
								剩余
								<text class="text-red">7</text>
								天
							</view>
							<view class="font-size-12 text-gray">
								<text class="text-red">￥50</text>
								元/位
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="cameras" @tap="add" style="z-index: 1;">
				<uni-icons  type="camera" size="30" ></uni-icons>
			</view>
			<view class="flex padding-box justify-center"  >
				<view class="flex index-h3">田园随想</view>
				<view class="flex index-span" >
					查看全部
					<image src="../../static/imgs/arrows.png" mode="" class="img-right"></image>
				</view>
			</view>
			<view class="flex" style="padding: 16rpx 30rpx;flex-direction: column;border-bottom: 1px solid #BFBFBF;">
				<view class="flex" style="align-items:center;margin: 10rpx 0;">
					<image src="../../static/images/timgQ5KMALQZ.jpg" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
					<view class="font-size-12" style="margin-left: 30rpx;">种植小能手</view>
				</view>
				<text class="text-gray font-size-10" >
					2020-12-12
				</text>
				<view class="font-size-12 color-grey" style="padding: 0 20rpx;">项目进行的很顺利，老板人也很好，有问题及时就处理了。收到的苹果也很好，都没有烂 果,而且味道很甜，送了一些给朋友，都说很值。</view>
				<view class="flex" style="flex-wrap: wrap;margin-top: 20rpx;padding: 0 20rpx;">
					<image src="../../static/images/timg7FHKTBR0.jpg" mode="widthFix" style="width: 30%;margin-right: 22rpx;"></image>
					<image src="../../static/images/timg7FHKTBR0.jpg" mode="widthFix" style="width: 30%;margin-right: 22rpx;"></image>
					<image src="../../static/images/timg7FHKTBR0.jpg" mode="widthFix" style="width: 30%;margin-right: 22rpx;"></image>
				</view>
				<view class="flex align-center" style="margin-top: 30rpx;margin-bottom: 20rpx;">
					<view class="flex-1 text-gray font-size-12">10分钟前</view>
					<view class="text-gray font-size-12">
						<uni-icons type="heart" size="22" color="gary" style="margin-right: 20rpx;"></uni-icons>
						<uni-icons type="chat" size="20" color="gary" style="margin-right: 20rpx;"></uni-icons>
					</view>
				</view>
			</view>
			<view class="flex" style="padding: 16rpx 30rpx;flex-direction: column;border-bottom: 1px solid #BFBFBF;">
				<view class="flex" style="align-items:center;margin: 10rpx 0;">
					<image src="../../static/images/timgQ5KMALQZ.jpg" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
					<view class="font-size-12" style="margin-left: 30rpx;">种植小能手</view>
				</view>
				<text class="text-gray font-size-10" >
					2020-12-12
				</text>
				<view class="font-size-12 color-grey" style="padding: 0 20rpx;">发布专题</view>
				<view class="flex" style="flex-wrap: wrap;margin-top: 20rpx;padding: 0 20rpx;">
					<image src="../../static/images/timg7FHKTBR0.jpg" mode="widthFix" style="width: 100%;"></image>
				</view>
				<view class="flex align-center" style="margin-top: 30rpx;margin-bottom: 20rpx;">
					<view class="flex-1 text-gray font-size-12">15分钟前</view>
					<view class="text-gray font-size-12">
						<uni-icons type="heart" size="22" color="gary" style="margin-right: 20rpx;"></uni-icons>
						<uni-icons type="chat" size="20" color="gary" style="margin-right: 20rpx;"></uni-icons>
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
		toActivity(){ // 活动列表
			uni.navigateTo({
				url:"./activityList"
			})
		},
		add(){ // 发布
			uni.navigateTo({
				url:'./addNetworkVideo'
			})
		},
		toDetail(){
			uni.navigateTo({
				url:'./activityDetail'
			})
		}
		
	}
};
</script>

<style lang="less" >
	page{
		background: #fff;
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
	width: 10rpx;
	height: 20rpx;
	position: relative;
	margin: auto 10rpx;
}
.img-size {
	width: 22rpx;
	height: 28rpx;
	position: relative;
	margin: auto 0;
	margin-right: 10rpx;
}
.text-gray {
	color: #9a9a9a;
	// padding: 10rpx;
}
.font-size-10{
	font-size: 22rpx;
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
.card-height{
	height: 60rpx;
}
.card{
	margin-top: 30rpx;
	padding-bottom: 30rpx;
	border-bottom: 1px solid #E4E4E4;
}
.cameras{
	position: fixed;
	width: 54px;
	height: 54px;
	align-items: center;
	text-align: center;
	bottom: 10rpx;
	right: 10rpx;
	border-radius: 50%;
	background-color:#fff;
	border: 1px solid #EEEEEE;
}
</style>
