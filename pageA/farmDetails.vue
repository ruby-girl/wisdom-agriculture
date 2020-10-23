<template>
	<page-meta><navigation-bar :title="Title" front-color="#000000" background-color="#FFFFFF" :color-animation-duration="1000" color-animation-timing-func="linear" /></page-meta>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true" style="background-color: #FFFFFF;">
			<view class="bg-personal" style="margin-bottom: 150rpx;">
				<image :src="data.bgUrl" style="width: 100%;height: 500rpx;"></image>
				<view class="bg-img" v-if="data">
					<view style="letter-spacing: 8rpx;text-align: center;">
						<image class="img-size" src="../static/imgs/dingwei@3x.png"></image>
						{{data.provinceName}}{{data.cityName}}
					</view>
					<!-- <view class="font-size-12 text-center" style="margin: 20rpx 0;font-weight: 600;">主营业务：农家乐旅游、苹果和梨种植农场</view> -->
					<view class="font-size-12" style="height: 230rpx;overflow: auto;margin-top: 20rpx;">{{ data.introduce }}</view>
				</view>
			</view>

			<view class="top">
				<scroll-view scroll-x class="bg-white nav" enhanced="true">
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
				<view class="flex padding-box justify-center margin-box"><view class="flex index-h3">发起的项目</view></view>
				<view class="page-section-spacing  " style="padding-bottom: 30rpx;">
					<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%;margin: 0 15px;">
						<view id="demo1" class="scroll-view-item_H demo-text-1 " v-for="(item , index) in project" :key="index">
							<image :src="item.photoUrl" class="scroll-view-item-img"  mode="aspectFill"></image>
							<view class="font-size-12 " style="padding: 0 10rpx;">{{item.title}}</view>
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
				<view class="flex padding-box justify-center margin-box"><view class="flex index-h3">发起的活动</view></view>
				<view class="page-section-spacing  " style="padding-bottom: 30rpx;">
					<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%;margin: 0 15px;">
						<view id="demo1" class="scroll-view-item_H demo-text-1 " v-for="(item , index) in activities" :key="index">
							<image :src="item.photoUrl" class="scroll-view-item-img"  mode="aspectFill"></image>
							<view class="font-size-12 " style="padding: 0 10rpx;">{{item.title}}</view>
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
				<view class="flex padding-box justify-center margin-box"><view class="flex index-h3">集市售卖</view></view>
				<view class="page-section-spacing  " style="padding-bottom: 30rpx;">
					<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%;margin: 0 15px;">
						<view id="demo1" class="scroll-view-item_H demo-text-1 " v-for="(item , index) in sell" :key="index">
							<image :src="item.photoUrl" class="scroll-view-item-img"  mode="aspectFill"></image>
							<view class="font-size-12 " style="padding: 0 10rpx;">{{item.title}}</view>
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
				<view class="flex padding-box justify-center margin-box"><view class="flex index-h3">720度全景展示</view></view>
				<view class="flex padding-box"><image src="../static/images/fsafwa.jpg" mode="widthFix" style="width: 100%;border-radius: 20rpx;"></image></view>
				<view class="flex line-gray"></view>
				<view class="flex padding-box justify-center margin-box"><view class="flex index-h3">详情介绍</view></view>
				<view class=" padding-box">
					<view class="standard" v-for="(item, index) in facility" :key="index">
						<image :src="'../static/imgs/'+ item.name +'@2x.png'"></image>
						<view class="font-size-12">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="Grid">
					<view class="Grid-Item" @tap="showVideo(0)">
						<view class="GSimg"><image class="Image" src="../static/images/TPG07956984.jpg" mode="aspectFill"></image></view>
						<image class="GStoptitle" src="../static/imgs/视频@2x.png"></image>
						<view class="GSbottomtitle">
							<image class="Image" src="../static/imgs/心@2x.png"></image>
							170
						</view>
					</view>
					<view class="Grid-Item" @tap="showVideo(1)">
						<view class="GSimg"><image class="Image" src="../static/images/TPG07956984.jpg" mode="aspectFill"></image></view>
						<image class="GStoptitle" src="../static/imgs/视频@2x.png"></image>
						<view class="GSbottomtitle">
							<image class="Image" src="../static/imgs/心1@2x.png"></image>
							170
						</view>
					</view>
					<view class="Grid-Item" @tap="showVideo(2)">
						<view class="GSimg"><image class="Image" src="../static/images/TPG07956984.jpg" mode="aspectFill"></image></view>
						<image class="GStoptitle" src="../static/imgs/视频@2x.png"></image>
						<view class="GSbottomtitle">
							<image class="Image" src="../static/imgs/心1@2x.png"></image>
							170
						</view>
					</view>
				</view>
				<view v-if="active_video">
					<view class="uni-padding-wrap" style="width: 100%;padding: 0;">
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper class="swiper" @change="changefun" @animationfinish="animationfinishfun" :current="current" :circular="true" :vertical="true">
									<swiper-item v-for="(item, index) in PayVideo">
										<view class="swiper-item uni-bg-red" >
											<video
												:custom-cache="false"
												loop="true"
												class="video"
												:id="'id' + index"
												:enable-play-gesture="true"
												:enable-progress-gesture="true"
												:controls="false"
												:src="item.video_path"
												:show-center-play-btn="false"
											></video>
										</view>
									</swiper-item>
								</swiper>
							</view>
						</view>
					</view>
					<view v-if="is_active">
						<view class="top">
							<cover-view class="top_box">
								<cover-view class="top" @tap="closeVideo">
									<!-- <cover-image class="t_img" src="../static/imgs/ai.png" mode=""></cover-image> -->
									<icon type="clear" size="26"/>
								</cover-view>
							</cover-view>
						</view>
						<view class="left">
							<cover-view class="left_box">
								<cover-view class="ke">
									<cover-image src="../static/imgs/dingwei@3x.png"></cover-image>
									<cover-view>大家来买</cover-view>
								</cover-view>
								<cover-view class="ren">@李老板</cover-view>
								<cover-view class="ke_context">最新水果出场，求采购</cover-view>
								<!--  <cover-view class="auto">
				                    <cover-image src="../static/video/10.png"></cover-image>
				                    <cover-view> 光良 童话</cover-view>
				                </cover-view> -->
							</cover-view>
						</view>
						<view class="right">
							<cover-view class="right_box  ">
								<!-- <cover-view class="top1">
				                    <cover-image class="avatar_img" :src="PayVideo[index].avatar_url" mode=""></cover-image>
				                    <cover-image class="add_img" src="../static/video/1.png" mode=""></cover-image>
				                </cover-view>
				                <cover-view class="top2">
				                    <cover-image class="t_img" src="../static/video/2.png" mode=""></cover-image>
				                    <cover-view class="font_t">397</cover-view>
				                </cover-view>
				                <cover-view class="top2">
				                    <cover-image class="t_img" src="../static/video/8.png" mode=""></cover-image>
				                    <cover-view class="font_t">397</cover-view>
				                </cover-view>
				                <cover-view class="top2">
				                    <cover-image class="t_img" src="../static/video/3.png" mode=""></cover-image>
				                    <cover-view class="font_t">397</cover-view>
				                </cover-view> -->
								<cover-view class="top2" @tap="changeCommend">
									<cover-image v-if="commend" class="t_img" src="../static/imgs/心1@2x.png" mode=""></cover-image>
									<cover-image v-else class="t_img" src="../static/imgs/心@2x.png" mode=""></cover-image>
									<cover-view class="font_t">点赞</cover-view>
								</cover-view>
							</cover-view>
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
			active_video:false,
			Title: '', // 农场名
			id:'', // 农场id
			data:{}, // 农场信息
			activities:[], // 发起的活动
			project:[], // 发起的项目
			sell:[], // 集市售卖
			facility:[],// 设施
			tabs: [
				{
					id: 1,
					name: '详情'
				},
				{
					id: 2,
					name: '视频'
				}
			],
			TabCur: 1,
			text:
				'生态农场位于绵阳市江油市xxx路xx号，企业始创于 20xx年，公司先后投入上亿元建设农业基地和与景区 相关配套设施，为发展观光农业旅游奠定了良好的基础，景天生态农业基地占地总面积达1050亩',
			commend:false,
			data: [
				{
					id: 41,
					title: '好纠结',
					like_nums: 0,
					user_id: 10002,
					goods_id: 10073,
					nick_name: '测试1',
					avatar_url: 'http://live.bjgs.top/default/avatar_url.png',
					islive: 0,
					live_id: 0,
					room_id: 0,
					online_num: 0,
					img_path: 'http://live.bjgs.top/uploads/20200605162614bad357185.jpg',
					video_path: 'https://v-cdn.zjol.com.cn/276985.mp4',
					distance: '1.8km'
				},
				{
					id: 16,
					title: '',
					like_nums: 1,
					user_id: 10004,
					goods_id: 0,
					nick_name: '测试3',
					avatar_url: 'http://live.bjgs.top/default/avatar_url.png',
					islive: 0,
					live_id: 0,
					room_id: 0,
					online_num: 0,
					img_path: 'http://live.bjgs.top/uploads/202006031018539ebae5959.png',
					video_path: 'https://6e6f-normal-env-ta6pc-1300924598.tcb.qcloud.la/video-swiper/1589851354869410.mp4?sign=1f636557effa496e074332e3f4b9b8aa&t=1589851461',
					distance: '1.8km'
				},
				
				
				
			],
			index_: 1,
			index: '1',
			is_active: true,
			active: 2,
			PayVideo: [],
			current_i: 2,
			_arr: [],
			len: 0,
			current:0,
			
		};
	},
	components: {},
	onLoad(option) {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
		this.Title = option.name;
		this.id = option.id;
		this.getData();
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
		getData(){ // 获取农场信息
			this.$api.farmGetOne({farmId:this.id}).then(res =>{
				this.data = res.data.data[0].farm;
				this.data.bgUrl =  res.data.data[0].farmPhotos[0].path;
				this.farmFarmfacilities();
				this.MerchantsFindfarm();
			})
		},
		farmFarmfacilities(){ // 获取农场设施
			this.$api.farmFarmfacilities({farmId:this.id}).then(res =>{
				this.facility = res.data.data;
			})
		},
		MerchantsFindfarm(){ // 获取店铺信息
			this.$api.MerchantsFindfarm({farmId:this.id}).then(res =>{
				this.productType(res.data.data.merchantId);
				this.productFindMerchants(0,res.data.data.merchantId);
				this.productFindMerchants(1,res.data.data.merchantId);
			})
		},
		productType(id){ // 获取活动
			this.$api.productType(
			{
				type:'seckill',
				merchantId:id,
				pageNum:1,
				pageSize:100,
				parentId:0,
			}
			).then(res => {
				this.coverFindByidlist(1,0,res.data.data.records);
			})
		},
		productFindMerchants(number,id){ // 获取项目/集市售卖
			this.$api.productFindMerchants({
				"pageNum":1,
				"pageSize":100,
				"merchantId":id,
				"parentId":number
			}).then(res => {
				if (number) {
					this.coverFindByidlist(2,0,res.data.data.records);
				} else {
					this.coverFindByidlist(3,0,res.data.data.records);
				}
			})
		},
		coverFindByidlist(num,index,array){// 根据商品id查封面图
			if (array.length > 0) {
				this.$api.coverFindByidlist({productId:array[index].productId}).then(res => {
					array[index].photoUrl = res.data.data[0];
					if(++index < array.length){
						this.coverFindByidlist(index,array);
					} else {
						if (num == 1) {
							this.activities  = array;
						}
						if (num == 2) {
							this.sell = array;
						}
						if (num == 3) {
							this.project = array;
						}
					}
				})
			}
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
		},
		changeCommend(){
			this.commend = !this.commend;
		},
		showVideo(index) { // 开始抖音模式视频播放
			this.active_video = true;
			if (this.PayVideo.length > 0) {
				this.is_active = true;
				this.PayVideo[index]['istrue'] = true;
			} else {
				this.PayVideo = PayVideo;
			}
			
			this.current = index;
			this.$nextTick(function() {
				let videoContext = uni.createVideoContext('id' + index);
				videoContext.play();
			});
		},
		closeVideo(){ // 关闭抖音视频模式
			this.active_video = false;
			this.is_active = false;
			
			this.PayVideo[this.current]['istrue'] = false;
			let videoContext = uni.createVideoContext('id' + this.current);
			// videoContext.stop();
			videoContext.pause();
			// this.PayVideo = [];
			// uni.clearStorageSync();
		},
		changefun(e) { // 上下滑动切换视频
			this.is_active = false;
			let current = e.detail.current;
			let { len, PayVideo, active, _arr, t, index_ } = this;
			console.log(PayVideo, index_);
			let videoContext = uni.createVideoContext('id' + index_);
			videoContext.pause();

			this.PayVideo = PayVideo;
		},
		animationfinishfun(e) {
			let { index_, len, PayVideo, active, _arr, t } = this;
			let current = e.detail.current;

			this.is_active = true;

			PayVideo[current]['istrue'] = true;
			this.PayVideo = PayVideo;
			let videoContext = uni.createVideoContext('id' + index_);
			
			videoContext.pause();
			videoContext = uni.createVideoContext('id' + current);
			videoContext.play();
			this.index_ = current;
			if (PayVideo.length == len) {
				return;
			}
			this.PayVideo.push(_arr[active]);
			this.active += 1;
		},
		
	},
	mounted() {
		uni.setStorageSync('video', this.data);
		
		let ind = 1;
		this.index = ind;
		const video = uni.getStorageSync('video');
		const len = video.length;
		let b_arr = [];
		let s_arr = [];
		video.forEach((res, index) => {
			if (ind <= index) {
				b_arr.push(res);
			} else {
				s_arr.push(res);
			}
		});
		let _arr = b_arr.concat(s_arr.reverse());
		_arr = _arr.map(res => {
			res['istrue'] = false;
			return res;
		});
		_arr[0]['istrue'] = true;
		const PayVideo = [_arr[len - 1], _arr[0], _arr[1]];
		this.PayVideo = PayVideo;
		this._arr = _arr;
		this.len = len;
		this.$nextTick(function() {
			let videoContext = uni.createVideoContext('id' + ind);
			// videoContext.play();
		});
	}
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
.Grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-between;
	padding: 10rpx 0;
	.Grid-Item {
		width: 33%;
		padding: 0rpx;
		text-align: center;
		position: relative;
		.GSimg {
			.Image {
				height: 400rpx;
			}
		}
		.GStoptitle {
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			width: 35rpx;
			height: 35rpx;
		}
		.GSbottomtitle {
			
			position: absolute;
			bottom: 20rpx;
			left: 15rpx;
			color: #ffffff;
			font-size: 28rpx;
			.Image {
				width: 41rpx;
				height: 33rpx;
				margin: 0 10rpx 0 0;
				position: relative;
				top: 10rpx;
			}
		}
	}
}
.circle {
	background: rgba(34, 34, 34, 0.4);

	border-radius: 50%;
	z-index: 2;
	height: 70px;
	width: 70px;
	position: fixed;
	top: 0;

	bottom: 441rpx;
	left: 31rpx;

	margin: auto;

	.red {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		z-index: 3;
		height: 35px;
		width: 35px;
	}
}

.swiper {
	height: 100vh;
	position: fixed;
	top: 0;
	width: 100%;
	.swiper-item {
		height: 100vh;
		position: relative;
	}

	.uni-bg-red {
		background: red;
	}

	.uni-bg-green {
		background: green;
	}

	.uni-bg-blue {
		background: blue;
	}
}

.video {
	width: 100%;
	height: 100vh;
	position: relative;
}

.left_box {
	position: fixed;
	bottom: 60rpx;
	left: 24rpx;

	.ke_context {
		width: 516rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		word-break: break-all;
		word-wrap: break-word;
		white-space: pre-line;
		white-space: normal;
		text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
	}

	.ren {
		margin: 20rpx 0;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
	}

	.auto {
		display: flex;
		align-items: center;
		width: 310rpx;
		height: 60rpx;
		margin-top: 24rpx;
		opacity: 1;
		border-radius: 8rpx;
		padding-left: 10rpx;

		cover-view {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 90px;
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
		}

		cover-image {
			margin-right: 10rpx;
			height: 28rpx;
			width: 26rpx;
		}
	}

	.ke {
		display: flex;
		align-items: center;
		width: 310rpx;
		height: 60rpx;
		background: rgba(0, 0, 0, 0.3);
		opacity: 1;
		border-radius: 8rpx;
		padding-left: 10rpx;

		cover-view {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 90px;
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
		}

		cover-image {
			margin-right: 10rpx;
			height: 40rpx;
			width: 40rpx;
		}
	}
}

.H_T {
	z-index: 2;
	width: 100%;
	display: flex;
	box-sizing: border-box;
	position: absolute;
	padding: 0 30rpx;
	background: transparent;
	justify-content: space-between;

	.back {
		height: 48rpx;
		width: 48rpx;
	}

	.search {
		height: 48rpx;
		width: 48rpx;
	}
}

.right_box {
	width: 100rpx;

	position: absolute;
	z-index: 2;
	bottom: 60rpx;
	right: 12rpx;
	display: flex;
	flex-direction: column;

	.top1 {
		position: relative;
		height: 124rpx;

		.avatar_img {
			width: 98rpx;
			height: 98rpx;
			border-radius: 50%;
		}

		.add_img {
			position: absolute;
			z-index: 99;
			width: 48rpx;
			height: 48rpx;
			bottom: 10rpx;
			left: 0;
			right: 0;
			margin: 0 auto;
		}
	}

	.top2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 37rpx;

		.t_img {
			height: 72rpx;
			width: 90rpx;
			margin-bottom: 10rpx;
		}

		.font_t {
			font-size: 26rpx;
			font-family: SF Pro Text;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);

			text-shadow: 0px 1rpx 1rpx rgba(0, 0, 0, 0.4);
			text-align: center;
		}
	}
	
}
.top_box{
	width: 100rpx;
	
	position: fixed;
	z-index: 2;
	top: 10rpx;
	right: 12rpx;
	display: flex;
	flex-direction: column;
	
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 37rpx;
		
		.t_img {
			height: 72rpx;
			width: 72rpx;
			margin-bottom: 10rpx;
		}
	}
}
</style>
