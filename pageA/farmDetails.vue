<template>
	<page-meta>
		<navigation-bar :title="Title" front-color="#000000" background-color="#FFFFFF" :color-animation-duration="1000"
		 color-animation-timing-func="linear" />
	</page-meta>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true" style="background-color: #FFFFFF;">
			<view class="bg-personal" style="margin-bottom: 150rpx;">
				<image :src="data.bgUrl" style="width: 100%;height: 500rpx;"></image>
				
				<view class="bg-img" v-if="JSON.stringify(data) != '{}'">
					<view style="letter-spacing: 8rpx;text-align: center;">
						<image class="img-size" src="../static/imgs/dingwei@3x.png"></image>
						{{data.provinceName}}{{data.cityName}}
					</view>
					<!-- <view class="font-size-12 text-center" style="margin: 20rpx 0;font-weight: 600;">主营业务：农家乐旅游、苹果和梨种植农场</view> -->
					<view class="font-size-12" style="height: 230rpx;overflow: auto;margin-top: 20rpx;">{{ data.introduce }}</view>
				</view>
				<view  style="position: absolute;width: 100%; top: 0;">
					<view class="flex font-size-12 right-card" style="top: 45rpx;" @tap="showHistory">
						<image src="../static/imgs/location.png" style="width: 50rpx;height: 50rpx;"></image>
						<text style="padding: 0 12rpx;">历史追溯</text>
					</view>
					<view class="flex font-size-12 right-card" style="top: 125rpx;" @tap="video()">
						<image src="../static/imgs/location.png" style="width: 50rpx;height: 50rpx;"></image>
						<text style="padding: 0 12rpx;">领地直播</text>
					</view>
				</view>
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
			<view >
				<view v-if="project.length > 0">
					<view class="flex padding-box justify-center margin-box">
						<view class="flex index-h3">发起的项目</view>
					</view>
					<view class="page-section-spacing  " style="padding-bottom: 30rpx;">
						<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%;margin: 0 15px;">
							<view id="demo1" class="scroll-view-item_H demo-text-1 " v-for="(item , index) in project" :key="index" @tap="showFarm(item.productId)">
								<image :src="item.photoUrl" class="scroll-view-item-img" mode="aspectFill"></image>
								<view class="font-size-12 " style="padding: 0 10rpx;">{{item.productName}}</view>
								<view class="flex ">
									<view class="font-size-12 text-gray flex-1">
										剩余
										<text class="text-red">{{item.stock - item.sales}}</text>
										{{item.unitName}}
									</view>
									<view class="font-size-12 text-gray">
										<text class="text-red">￥{{item.price}}</text>
										/{{item.unitName}}
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="flex line-gray"></view>
				</view>
				
				<!-- <view class="flex padding-box justify-center margin-box">
					<view class="flex index-h3">集市售卖</view>
				</view>
				<view class="page-section-spacing  " style="padding-bottom: 30rpx;">
					<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%;margin: 0 15px;">
						<view id="demo1" class="scroll-view-item_H demo-text-1 " v-for="(item , index) in sell" :key="index" @tap="showDetail">
							<image :src="item.photoUrl" class="scroll-view-item-img" mode="aspectFill"></image>
							<view class="font-size-12 " style="padding: 0 10rpx;">{{item.productName}}</view>
							<view class="flex ">
								<view class="font-size-12 text-gray flex-1">
									剩余
									<text class="text-red">{{item.stock - item.sales}}</text>
									{{item.unitName}}
								</view>
								<view class="font-size-12 text-gray">
									<text class="text-red">￥{{item.price}}</text>
									/{{item.unitName}}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="flex line-gray"></view> -->
				<view class="flex padding-box justify-center margin-box">
					<view class="flex index-h3">720度全景展示</view>
				</view>
				<view class="flex padding-box">
					<image src="../static/images/fsafwa.jpg" mode="widthFix" style="width: 100%;border-radius: 20rpx;"></image>
				</view>
				<view v-if="facility.length > 0">
					<view class="flex line-gray"></view>
					<view class="flex padding-box justify-center margin-box">
						<view class="flex index-h3">详情介绍</view>
					</view>
					<view class=" padding-box">
						<view class="standard" v-for="(item, index) in facility" :key="index">
							<image :src="'../static/imgs/'+ item.name +'@2x.png'"></image>
							<view class="font-size-12">{{item.name}}</view>
						</view>
					</view>
				</view>
				
			</view>
			
	</scroll-view>
	</view>
</template>

<script>
	import LineChart from '@/components/u-charts/u-charts/instrumentpanel.vue'	
	import ArcChart from '@/components/u-charts/u-charts/arc.vue'	
	export default {
		components: {
			ArcChart,
			LineChart,
		},
		data() {
			return {
				windowHeight: 300,
				isLogin: false,
				active_video: false,
				Title: '', // 农场名
				id: '', // 农场id
				data: {}, // 农场信息
				activities: [], // 发起的活动
				project: [], // 发起的项目
				sell: [], // 集市售卖
				facility: [], // 设施
				active_video: false,
				videoSrc:'',
				
				commend: false,

				index_: 1,
				index: '1',
				is_active: true,
				active: 2,
				PayVideo: [],
				current_i: 2,
				_arr: [],
				len: 0,
				current: 0,

			};
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
			this.isLogin = getApp().globalData.isLogin;
			this.Title = option.name;
			this.id = option.id;
			this.getData();
		},
		onShareAppMessage: function() {
			return {
				title: '科维特',
				desc: '',
				path: 'pages/personal/personal'
			}
		},
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
			getData() { // 获取农场信息
				this.$api.farmGetOne({
					farmId: this.id
				}).then(res => {
					this.data = res.data.data[0].farm;
					this.data.bgUrl = res.data.data[0].farmPhotos[0].path;
					this.farmFarmfacilities();
					this.MerchantsFindfarm();
				})
			},
			farmFarmfacilities() { // 获取农场设施
				this.$api.farmFarmfacilities({
					farmId: this.id
				}).then(res => {
					this.facility = res.data.data;
				})
			},
			MerchantsFindfarm() { // 获取店铺信息
				this.$api.MerchantsFindfarm({
					farmId: this.id
				}).then(res => {
					this.productFindMerchants(0, res.data.data.merchantId);
					this.productFindMerchants(1, res.data.data.merchantId);
				})
			},
			productFindMerchants(number, id) { // 获取项目/集市售卖
				this.$api.productFindMerchants({
					"pageNum": 1,
					"pageSize": 100,
					product: {
						"merchantId": id,
						"parentId": number
					}
				}).then(res => {
					if (number) {
						this.coverFindByidlist(2, 0, res.data.data.records);
					} else {
						this.coverFindByidlist(3, 0, res.data.data.records);
					}
				})
			},
			coverFindByidlist(num, index, array) { // 根据商品id查封面图
				this.$api.coverFindByidlist({
					productId: array[index].productId
				}).then(res => {
					array[index].photoUrl = res.data.data[0];
					if (++index < array.length) {
						this.coverFindByidlist(num,index,array);
					} else {
						if (num == 1) {
							this.activities = array;
						}
						if (num == 2) {
							this.sell = array;
s							}
						if (num == 3) {
							this.project = array;
							console.log(this.project)
						}
					}
				})
			},
		
			changeCommend() {
				this.commend = !this.commend;
			},
			showDetail(){
				// 集市商品详情
				uni.navigateTo({
					url:'/pages/bazaar/commodityDetails',
				})
			},
			showHistory(){ // 历史追溯
				uni.showToast({
					title:'暂未开放',
					icon:'none'
				})
			},
			video(){ // 打开视频
				this.active_video = true;
				this.videoSrc = 'http://pili-live-hls.tree-iot.com/zhslive/6008317A708CC1.m3u8';
			},
			closeVideo(){ // 关闭抖音视频模式
				this.active_video = false;
				this.videoSrc = '';
			},
			showFarm(id){ // 项目领地详情
				uni.navigateTo({
					url:'/pageC/farmManor?id='+id,
				})
			}

		},
		
	};
</script>

<style lang="scss" scoped>
	.bg-personal {
		position: relative;
	}

	.bg-img {
		width: 90%;
		margin: 0 auto;
		background-color: #ffffff;
		border: 1px solid #eeeeee;
		border-radius: 30rpx;
		padding: 50rpx;
		position: absolute;
		top: 250rpx;
		left: 5%;
		box-shadow: 0px 1px 5px 0px #b8b3b3;
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
	.text-h1{
		font-size: 50rpx;
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
		margin-top: 50rpx;
		border-bottom: 1px solid #d8d8d8;
	}

	.text-red {
		color: #ff0000;
	}

	.text-gray {
		color: #9a9a9a;
		padding: 10rpx;
	}

	.standard {
		width: 25%;
		text-align: center;
		float: left;
		margin: 30rpx 0;
	}

	.standard image {
		width: 90rpx;
		height: 90rpx;
		margin: auto;
	}

	

	
	

	.video {
		width: 100%;
		height: 100vh;
		position: relative;
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
	
</style>
