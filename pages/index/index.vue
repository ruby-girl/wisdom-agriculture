<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true">
			<view class="bg-personal">
				<view class="uni-padding-wrap" style="width: 100%;">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
								<swiper-item v-for="(item, index) in swiperList" :key="index">
									<image mode="aspectFill" :src="item" style="width: 100%;height: 100%;"></image>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="flex padding-box justify-center">
					<view class="flex index-h3">农场信息</view>
					<view class="flex index-span" @tap="toList">
						查看更多
						<image src="../../static/imgs/arrows.png" mode="" class="img-right"></image>
					</view>
				</view>
				<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%;margin:8px 15px ;">
					<view  class="scroll-view-item_H demo-text-1 flex " v-for="(item, index) in farm" :key="index"
					 style="height: 320rpx;" @tap="showFarm(item.farm.farmId,item.farm.farmName)">
						<image :src="item.farmPhotos[0].path" style="width: 60%;height: 100%;border-top-left-radius: 10rpx;border-bottom-left-radius: 10rpx;float: left;"
						 mode="aspectFill" ></image>
						<view class="flex bg-personal flex-direction-column" style="width: 40%;padding: 10rpx;background-color: #F5F5F5;height: 100%;font-size: 12px;border-top-right-radius: 10rpx;border-bottom-right-radius: 10rpx;float: left;">
							<span style="white-space: normal;height: 90%;">
							{{item.farm.introduce ?   item.farm.introduce.length > 70 ? item.farm.introduce.slice(0,70)+'...' : item.farm.introduce : ''}}
							</span>
							<button type="primary" style="line-height: 2;" size="mini" @click="showFarm(item.farm.farmId,item.farm.farmName)">查看详情</button>
						</view>
					</view>
				</scroll-view>

			</view>
			<!-- <view class="card">
				<view class="flex padding-box justify-center" >
					<view class="flex index-h3">
						限时秒杀地块
						<view class="index-time">{{ remaining }}</view>
					</view>
					<view class="flex index-span">
						查看全部
						<image src="../../static/imgs/arrows.png" mode="" class="img-right"></image>
					</view>
				</view>
				<view class="page-section-spacing  " style="padding-bottom: 30rpx;">
					<scroll-view class="scroll-view_H " scroll-x="true" bindscroll="scroll" style="width: 100%">
						<view v-for="(item, index) in PREFERENCE" id="demo1" class="scroll-view-item_H demo-text-1 " style="margin-left: 30rpx;" >
							<image src="../../static/images/farmIndex.jpg" class="scroll-view-item-img" mode=""></image>
							<view class="flex align-center">
								<view class="flex-1">{{item.title}}</view>
								<view class="text-gray">
									<text class="text-red">￥</text>
									<text class="text-red" style="font-size: 20px;">{{item.price}}</text>
									/{{item.unitName}}
								</view>
							</view>
							<view class="flex index-span">
								<view class="index-span flex-1">{{item.description}}</view>
								<text class="index-span flex-1 text-right">剩余{{item.stock - item.sales}}{{item.unitName}}</text>
							</view>
							<view class="flex index-span">
								<image class="img-size" src="../../static/imgs/dingwei@3x.png"></image>
								绵阳
							</view>
						</view>
					</scroll-view>
				</view>
			</view> -->
			<view class="card">
				<view class="flex padding-box justify-center">
					<view class="flex index-h3">精选项目</view>
					<view class="flex index-span">
						查看全部
						<image src="../../static/imgs/arrows.png" mode="" class="img-right"></image>
					</view>
				</view>
				<view class="padding-box ">
					<view style="padding-bottom: 40rpx" v-for="(item, index) in Featured" :key="index" @tap="farmManor(item.productId)">
						<image :src="item.path" mode="aspectFill" style="width: 100%;height: 300rpx;border-radius: 8rpx;"></image>
						<view class="font-size-16 card-height">{{item.productName}}</view>
						<view class="flex ">
							<view class="font-size-14">剩余：{{item.stock - item.sales}}{{item.unitName}}</view>
							<progress style="flex: 1;" :percent="(item.sales / item.stock).toFixed(0)" border-radius="100" stroke-width="8"
							 activeColor="#4ABA8A" backgroundColor="#C9EEDE" />
						</view>
						<view class="flex index-span font-size-14 card-height">
							<view class="flex-1">
								<image class="img-size" src="../../static/imgs/dingwei@3x.png"></image>
								成都 庆丰收农场
							</view>
							<view class="flex">
								<button class="" type="primary" plain="true" style="padding: 2rpx 12rpx;height: min-content;border-radius: 20px;font-size: 24rpx;line-height: 1.5;">
									认领中
								</button>
								<view class="flex">
									<view class="index-money" style="position: relative;top:-14rpx;">
										￥
										<span style="font-size: 40rpx;">{{item.price}}</span>
									</view>
									/{{item.unitName}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import QQMapWX from '@/static/qqmap-wx-jssdk.min.js';
	var qqmapsdk;
	export default {
		data() {
			return {
				windowHeight: 300,
				isLogin: false,
				indicatorDots: true,
				swiperList: [],
				autoplay: true,
				interval: 3000,
				duration: 1000,
				text: '爱丽丝飞机喀什吧把监控设备飞机喀什吧垃圾垃圾和尽快哈就是看了根本就考试必备奥啊设备佛教受到波及发布搜啊豆瓣噶奥斯飞机阿萨的划分节哀顺便回复阿斯顿',
				serch: { // 城市
					// cityName:'',
					recommended: true,
				},
				farm: [], // 推荐农村
				PREFERENCE: [], // 秒杀商品
				Featured: [], // 精选商品
				product1: {
					type: 'seckill',
					pageNum: 1,
					pageSize: 100,
					product: {
						parentId: 1,
					}
				},
				product2: {
					type: 'recommend',
					pageNum: 1,
					pageSize: 100,
					product: {
						parentId: 1,
					}
				},
				remaining: '', //显示剩余时间
				remainingd: '' //数据返回时间秒
			};
		},
		components: {},
		onLoad() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
			this.isLogin = getApp().globalData.isLogin;
			this.getmsglist();
			// this.getCity();
			this.coverAll()
			this.getOne();
			// this.productType(this.product1);
			this.productType(this.product2);
		},
		onShareAppMessage: function() {
			return {
				title: '科维特',
				desc: '',
				path: 'pages/personal/personal'
			}
		},
		onShow() {

		},
		methods: {
			getCity() {
				let _this = this;
				// 向用户发起授权请求，弹框提示
				uni.authorize({
					// 获取用户定位信息
					scope: 'scope.userLocation',
					// 用户同意授权执行
					success() {
						// 引入腾讯地图api
						// 实例化API核心类
						qqmapsdk = new QQMapWX({
							// 填写自己的Key值，这个值是与AppID绑定的
							key: 'GFHBZ-JU3CD-NEJ4S-PT3J2-JGFH6-7DBOX'
						});
						//获取位置信息
						uni.getLocation({
							type: 'gcj02',
							success: function(res) {
								_this.longitude = res.longitude.toString();
								_this.latitude = res.latitude.toString();
								//解析经纬度获取城市信息
								uni.request({
									header: {
										'Content-Type': 'application/text'
									},
									url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + _this.latitude + ',' + _this.longitude +
										'&key=GFHBZ-JU3CD-NEJ4S-PT3J2-JGFH6-7DBOX',
									success(re) {
										// _this.serch.cityName = re.data.result.address_component.city;
										_this.serch.cityName = '成都市';
										_this.getOne();
									}
								});
							}
						});
					},
					// 若用户不同意授权，弹框提示
					fail(res) {
						uni.showToast({
							icon: 'none',
							title: '注意：需要获取您的定位授权,否则部分功能将无法使用',
							duration: 2000
						});
					}
				});
			},
			getOne() { // 获取推荐农场
				this.$api.farmGetOne(this.serch).then(res => {
					var list = new Array();
					if (res.data.data.length > 3) {
						list = res.data.data.slice(0, 3);
					} else {
						list = res.data.data;
					}
					this.farm = list;
					// this.farm.farmphotoPath = res.data.data[1].farmPhotos[0].path;
					// this.farm.farmId = res.data.data[1].farm.farmId;
					// this.farm.introduce = res.data.data[1].farm.introduce;
					// this.farm.farmName = res.data.data[1].farm.farmName;
				})
			},
			coverAll() { // 获取轮播
				this.$api.coverAll().then(res => {
					this.swiperList = res.data.data;
				})
			},

			productType(data) { // 推荐/精选商品
				this.$api.productType(data).then(res => {
					// if (data.type == 'seckill') {
					// 	this.PREFERENCE = this.PREFERENCE.concat(res.data.data.records);
					// }
					// if (data.type == 'recommend') {
					// 	this.Featured = this.Featured.concat(res.data.data.records);
					// }
					this.coverFindByidlist(0, res.data.data.records);
				})
			},
			coverFindByidlist(index, array) { // 根据项目商品id查询封面图
				this.$api.coverFindByidlist({
					productId: array[index].productId
				}).then(res => {
					array[index].path = res.data.data[0];
					if (++index < array.length) {
						this.coverFindByidlist(index, array);
					} else {
						this.Featured = this.Featured.concat(array);
					}
				})
			},
			showFarm(id, name) {
				uni.navigateTo({
					url: '/pageA/farmDetails?id=' + id + '&name=' + name,
				});
			},
			toFarm() {
				uni.switchTab({
					url: '../farm/farmList'
				});
			},
			toList(){
				uni.switchTab({
					url:'../farm/farmList'
				})
			},
			farmManor(id) {
				uni.navigateTo({
					url: '/pageC/farmManor?id='+id,
				});
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
		width: 100% !important;
		// border: 1px solid #d8d8d8;
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
		height: 30rpx;
		position: relative;
		margin: auto 0;
		margin-right: 10rpx;
		position: relative;
		top: 2px;
	}

	.scroll-view-item_H {
		width: 45%;
	}

	.scroll-view-item-img {
		border-radius: 18rpx;
		width: 100%;
		height: 70%;
	}

	.font-size-14 {
		font-size: 28rpx;
	}

	.font-size-16 {
		font-size: 32rpx;
	}

	.card-height {
		height: 60rpx;
	}

	.card {
		margin-top: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: 1px solid #e4e4e4;
	}
</style>
