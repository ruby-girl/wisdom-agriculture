<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true" style="background-color: #FFFFFF;padding-bottom: 50px;">
			<view class="bg-personal">
				<image @tap="showImg(cover)" :src="cover[0]" style="width: 100%;height: 400rpx;" mode="aspectFill"></image>
				<view class="padding-box">
					<view>{{data.productName}}</view>
					<view class="index-money">
						￥
						<text style="font-size: 40rpx;">{{data.price}}</text>
						<text style="color: #C0C0C0;">/{{data.unitName}}</text>
					</view>
					<view><progress style="flex: 1;" :percent="(data.sales/data.stock).toFixed(0)" border-radius="100" stroke-width="8"
						 :activeColor="pColoc" backgroundColor="#C9EEDE" /></view>
					<view class="flex margin-box ">
						<view class="flex-1 font-size-12" style="line-height:56rpx;">
							当前进度
							<text style="color: #FF9700;">{{(data.sales/data.stock).toFixed(0)}}%</text>
						</view>
						<view class="font-size-12">
							剩余领地
							<text class="font-size-16" style="color: #FF9700;">{{data.stock - data.sales}}</text>
							{{data.unitName}}
						</view>
					</view>
				</view>
			</view>
			<view class="line-gray"></view>
			<view class="flex padding-box justify-center text-center">
				<view class="standard">
					<image src="../static/images/timg3RV2I4X0.jpg" mode="aspectFill"></image>
					<view class="font-size-12">领地直播</view>
				</view>
				<view class="standard" style="border-left: 1px solid #BFBFBF;" @tap="ToDetail(data.massifId)">
					<image src="../static/images/timg3RV2I4X0.jpg" mode="aspectFill"></image>
					<view class="font-size-12">溯源详情</view>
				</view>
			</view>
			<view class="line-gray"></view>
			<!-- <view class="" style="margin: 8px 15px;">
				<view style="border-radius: 10rpx;">
					<view class="flex justify-center" style="margin: 30rpx 0;">
						<image src="../static/images/people.jpg" style="width: 180rpx;height: 180rpx;border-radius: 10rpx;" mode="aspectFill"></image>
						<view class="flex bg-personal justify-center flex-direction-column" style="flex: 1;padding:  10rpx 0 10rpx 30rpx;letter-spacing: 8rpx;overflow: hidden;">
							<view class="font-size-12 ">
								农&nbsp;场&nbsp;主：
								<text class="font-size-12 " style="letter-spacing: 0;">李老板</text>
							</view>
							<view class="font-size-12 text-overflows ">
								资&nbsp;&nbsp;&nbsp;&nbsp;历：
								<text class="font-size-12 " style="letter-spacing: 0;">八年种植苹果、梨的经验</text>
							</view>
							<view class="font-size-12 text-overflows ">
								农场位置：
								<text class="font-size-12 " style="letter-spacing: 0;">绵阳市江油市xx区xx路xx号</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="line-gray"></view> -->
			<view class="top">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center justify-center" style="padding-bottom: 8rpx;border-bottom: 1px solid #D8D8D8;">
						<view class="cu-item font-size-16" :class="item.id == TabCur ? 'text-green cur' : ''" v-for="(item, index) in tabs"
						 :key="index" @tap="tabSelect" :data-id="item.id">
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-if="TabCur == 1">
				<view class="detaile">
					<view class="detaile-li">
						品牌:
					</view>
					<view class="detaile-li">
						{{data.crops}}
					</view>
					<view class="detaile-li">
						种植方式：
					</view>
					<view class="detaile-li">
						有机种植
					</view>
					<view class="detaile-li">
						储存方式：
					</view>
					<view class="detaile-li">
						冷藏
					</view>
					<view class="detaile-li">
						分量总数:
					</view>
					<view class="detaile-li">
						{{data.stock}}{{data.unitName}}
					</view>
					<view class="detaile-li">
						物流配送：
					</view>
					<view class="detaile-li">
						快递邮寄
					</view>
					<view class="detaile-li">
						播种时间：
					</view>
					<view class="detaile-li">
						{{data.startTime}}
					</view>
					<view class="detaile-li">
						每份价格:
					</view>
					<view class="detaile-li">
						{{data.price}}元/{{data.unitName}}
					</view>
					<view class="detaile-li">
						收获时间：
					</view>
					<view class="detaile-li">
						{{data.stopTime}}
					</view>
				</view>
				<view class="line-gray"></view>
				<image v-for="(item,index) in details" :key="index" :src="item.detailsPath" @tap="showImg(details,1)" mode="widthFix"
				 style="width: 100%;"></image>
				<!-- <image src="../static/images/fsafwa.jpg" style="width: 100%;"></image> -->
				<!-- <view class="flex line-gray"></view>
				<view class="flex padding-box justify-center margin-box"><view class="flex index-h3">相关推荐</view></view>
				<view class="page-section-spacing  " style="padding-bottom: 30rpx;">
					<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%;margin: 0 15px;">
						<view id="demo1" class="scroll-view-item_H demo-text-1 ">
							<image src="../static/images/u=3182281012,3984649657&fm=26&gp=0.jpg" class="scroll-view-item-img" mode="aspectFill"></image>
							<view class="font-size-12 " style="padding: 0 10rpx;">南瓜节游园活动</view>
							<view class="flex ">
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
						<view id="demo1" class="scroll-view-item_H demo-text-1 ">
							<image src="../static/images/u=12638188,2993346786&fm=26&gp=0.jpg" class="scroll-view-item-img" mode="aspectFill"></image>
							<view class="font-size-12 " style="padding: 0 10rpx;">夏至赏桃活动</view>
							<view class="flex ">
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
						<view id="demo1" class="scroll-view-item_H demo-text-1 ">
							<image src="../static/images/u=1878396425,457522588&fm=26&gp=0.jpg" class="scroll-view-item-img" mode="aspectFill"></image>
							<view class="font-size-12 " style="padding: 0 10rpx;">春之采花活动</view>
							<view class="flex ">
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
						<view id="demo1" class="scroll-view-item_H demo-text-1 ">
							<image src="../static/images/u=2192420015,3569094498&fm=26&gp=0.jpg" class="scroll-view-item-img" mode="aspectFill"></image>
							<view class="font-size-12 " style="padding: 0 10rpx;">丰收采摘活动</view>
							<view class="flex ">
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
				</view> -->
			</view>
			<view v-else-if="TabCur == 2">
				<!-- <view class="flex padding-box justify-center margin-box"><view class="flex index-h3">720度全景展示</view></view>
				<view class="flex padding-box"><image src="../static/images/fsafwa.jpg" mode="aspectFill" style="width: 100%;border-radius: 20rpx;height: 350rpx;"></image></view>
				<view class="line-gray-1"></view> -->
				<view class="flex padding-box justify-center margin-box">
					<view class="flex index-h3">详情介绍</view>
				</view>
				<view class="flex padding-box">
					{{farm.farm.introduce}}
				</view>
				<view class="flex padding-box" v-for="(item,index) in farm.masterPhotos">
					<image @tap="showImg(farm.masterPhotos,2)" :src="item.path" mode="aspectFill" style="width: 100%;height: 350rpx;"></image>
				</view>
				<!-- <view class="flex padding-box"><video src="https://6e6f-normal-env-ta6pc-1300924598.tcb.qcloud.la/video-swiper/1589851354869410.mp4?sign=1f636557effa496e074332e3f4b9b8aa&t=1589851461" enable-play-gesture="true" style="width: 100%;height: 350rpx;"></video></view> -->
				<!-- <view class="flex padding-box"><image src="../static/images/fsafwa.jpg" mode="aspectFill" style="width: 100%;height: 350rpx;"></image></view> -->
			</view>
			<view v-else>
				<view class="flex" style="padding: 16rpx 30rpx;flex-direction: column;" v-for="(item,index) in circle" :key="index">
					<view class="flex" style="align-items:center;margin: 10rpx 0;">
						<image :src="item.avatar" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
						<view class="font-size-12" style="margin-left: 30rpx;">{{item.nickName}}</view>
					</view>
					<text class="color-grey font-size-12">
						{{item.creationTime}}
					</text>
					<view class="font-size-12 color-grey">{{item.content}}</view>
					<view class="flex" style="flex-wrap: wrap;margin-top: 20rpx;">
						<image @tap="showImg(item.path)" v-for="(li,i) in item.path" :src="li" mode="aspectFill" v-bind:style="{width:100/item.path.length - 4 + '%', height:210/(item.path.length > 3? 3:item.path.length) + 'px'}"
						 style="height: 140rpx;margin-right: 22rpx;"></image>

					</view>
				</view>


			</view>
		</scroll-view>
		<uni-goods-nav style="position: fixed;bottom: 0;width: 100%;" :kwt="kwt" :options="options" :buttonGroup="buttonGroup"
		 @click="onClick" @buttonClick="buttonClick" />
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				data: {}, // 商品数据
				cover: [], // 商品封面
				details: [], // 商品详情图
				farm: [], // 农场信息
				circle: [], // 新农人说
				productId: '',
				windowHeight: 300,
				isLogin: false,
				active_video: false,
				percent: 0,
				pColoc: '',
				tabs: [{
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
				kwt: [{
					text: '天后开启项目',
					numberColor: '#ffa200',
					number: 10,
				}],
				options: [{
						icon: 'chat',
						text: '联系商家'
					},
					{
						icon: 'star',
						text: '收藏',
						// info: 2,
						// infoBackgroundColor:'#007aff',
						infoColor: "red"
					},

					{
						icon: 'compose',
						text: '评论',
						// info: 2
					}
				],
				buttonGroup: [{
					text: '参与项目',
					backgroundColor: '#4ABA8A',
					color: '#fff'
				}],

			};
		},
		components: {},
		onLoad(option) {
			var _self = this;
			_self.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
			_self.isLogin = getApp().globalData.isLogin;
			_self.productId = option.id;
			_self.productFindId();
			_self.coverFindByidlist();
			_self.detailsFindByIdDetail();
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
			// add() {
			// 	if (this.percent == 100) {
			// 		this.percent = 0;
			// 	} else {
			// 		this.percent++;
			// 		if (this.percent < 20) {
			// 			console.log(this.percent);
			// 		}
			// 		this.pColoc = '#FF0001';
			// 		if ((this.percent >= 20) & (this.percent < 50)) {
			// 			this.pColoc = '#FF9700';
			// 		}
			// 		if (this.percent >= 50) {
			// 			this.pColoc = '#4ABA8A';
			// 		}
			// 	}
			// },
			productFindId() { //商品详情
				this.$api.productFindId({
					"productId": this.productId
				}).then(res => {

					this.massifGetOne(res.data.data)
				})
			},
			coverFindByidlist() { // 获取封面图
				this.$api.coverFindByidlist({
					productId: this.productId
				}).then(res => {
					this.cover = res.data.data;
				})
			},
			detailsFindByIdDetail() { // 获取详情图
				this.$api.detailsFindByIdDetail({
					productId: this.productId
				}).then(res => {
					this.details = res.data.data;
				})
			},
			massifGetOne(array) { // 获取农场id
				this.$api.massifGetOne({
					massifId: array.massifId
				}).then(res => {
					array.crops = res.data.data.crops;
					this.data = array;
					this.farmGetOne(res.data.data.farmId);
				})
			},
			farmGetOne(id) { // 获取农场详情
				this.$api.farmGetOne({
					farmId: id
				}).then(res => {
					this.farm = res.data.data[0];
					this.circleOrderTime(this.farm.farm.userId);
				})
			},
			circleOrderTime(id) { // 获取圈子
				this.$api.circleOrderTime({
					uid: id,
					pageNum: 1,
					pageSize: 100,
				}).then(res => {
					this.userFindId(0, res.data.data.circleDtos);
				})
			},
			userFindId(index, array) { // 获取用户
				this.$api.userFindId({
					userId: array[index].uid
				}).then(res => {
					array[index].nickName = res.data.data.nickName;
					array[index].avatar = res.data.data.avatar;
					if (++index < array.length) {
						this.userFindId(index, array);
					} else {
						this.circle = array;
					}
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			showImg(array, num) {
				var list = new Array();
				if (num == 1) {
					array.forEach(item => {
						list.push(item.detailsPath)
					})
				} else if (num == 2) {
					array.forEach(item => {
						list.push(item.path)
					})
				} else {
					list = array;
				}
				uni.previewImage({
					urls: list,
					longPressActions: {
						// itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			ToDetail(id) {
				uni.navigateTo({
					url: './traceabilityDetails?id=' + id,
				})
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				if (!this.isLogin){
					uni.showToast({
						title:'请登录',
						icon:'none'
					})
					return
				}
				uni.navigateTo({
					url: "farmPay",
				})
			}
		},
		mounted() {}
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
		border-bottom: 16rpx solid #EEEEEE;
	}

	.line-gray-1 {
		border-bottom: 1rpx solid #EEEEEE;
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
			border: 1px solid #B5B5B5;
			text-align: center;
		}
	}

	.video {
		width: 100%;
		height: 100vh;
		position: relative;
	}
</style>
