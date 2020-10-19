<template>
	<view>
		<view  style="margin: 18rpx;background-color: #FFFFFF;border-radius: 10rpx;" @tap="getSite">
			<view class="flex" style="padding: 14rpx;align-items: center;">
				<image src="../../static/imgs/nearby1.png" style="width: 90rpx;height: 90rpx;border-radius: 10rpx;" mode="aspectFill"></image>
				<view class="flex bg-personal" style="flex: 1;padding: 30rpx;flex-direction: column;overflow: hidden;">
					<view >
						<text class="font-size-14" style="font-weight: 600;margin-right: 20rpx;">名字</text><text>1995087xxxx</text>
					</view>
					<view class="font-size-12 color-grey" >四川省绵阳市江油市 四川省绵阳市江油市xx街xx号</view>
					<view class="font-size-12 color-green">收货不便时，可选择暂存服务</view>
				</view>
				<image src="../../static/imgs/arrows.png" class="img-right"></image>
			</view>
		</view>
		<view  style="margin: 18rpx;background-color: #FFFFFF;border-radius: 10rpx;">
			<view class="flex" style="padding: 14rpx;">
				<image src="../../static/images/timg3RV2I4X0.jpg" style="width: 200rpx;height: 200rpx;border-radius: 10rpx;" mode="aspectFill"></image>
				<view class="flex bg-personal" style="flex: 1;padding:0 30rpx;flex-direction: column;overflow: hidden;">
					<view class="flex">
						<text class="flex-1 font-size-14" style="font-weight: 600;margin-right: 20rpx;">名字</text>
						<text >￥20</text>
					</view>
					<view class="flex margin-box">
						<text class="flex-1 "  style="font-size: 22rpx;">
							<text style="background-color: #EEEEEE;padding: 6rpx 15rpx;">重量（不含箱）：5斤</text>
						</text>
						<text class=" font-size-12 color-grey">x1</text>
					</view>
					<view class="flex font-size-12 color-grey margin-box" >
							<image class="img-size" src="../../static/imgs/dingwei@3x.png"></image>
							<text class="color-grey" style="align-items: baseline">绵阳  庆丰收农场</text>
					</view>
				</view>
			</view>
			<view class="flex text-center pading-boxs align-center" >
				<view class="flex-1">购买数量</view>
				<view class="flex-1">
					<number-box :value="1" :min="1"></number-box>
				</view>
			</view>
			<view class="flex text-center pading-boxs">
				<view class="flex-1">
					配送方式 <text class="color-grey" style="position: absolute;margin-left: 20rpx;">普通配送</text>
				</view>
				<view class="flex-1">快递 免邮</view>
			</view>
			<view class="flex text-center pading-boxs">
				<view class="flex-1">支付方式</view>
				<view class="flex-1">
					微信
					<image src="../../static/imgs/arrows.png" class="img-right1"></image>
				</view>
			</view>
		</view>
		<view class="flex" style="position: fixed;bottom: 0;background-color: #FFFFFF;width: 100%;">
			<view class="flex flex-1 font-size-16 justify-center align-center">合计：￥20.00</view>
			<view class="font-size-16 uni-tab__cart-button-right" style="color: #FFFFFF;background-color: #00AE66;padding: 20rpx 80rpx;" @tap="Pay">提交订单</view>
		</view>
	</view>
</template>

<script>
	import numberBox from '@/components/uni-number-box/uni-number-box.vue';
export default {
	components:{numberBox},
	data() {
		return {
			windowHeight: 300,
			isLogin: false,
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
			TabCur: 3,
			commend: false,
			kwt:[
				{
					text:'天后开启项目',
					numberColor: '#ffa200',
					number:10,
				}
			],
			options: [
				{
					icon: 'chat',
					text: '联系商家'
				}, 
				{
					icon: 'star',
					text: '收藏',
					// info: 2,
					// infoBackgroundColor:'#007aff',
					infoColor:"red"
				}, 
				
				{
					icon: 'compose',
					text: '评论',
					// info: 2
				}],
			buttonGroup: [
				{
					text: '参与项目',
					backgroundColor: '#4ABA8A',
					color: '#fff'
				}
			],
			
		};
	},
	components: {},
	onLoad(option) {
		var _self = this;
		_self.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		_self.isLogin = getApp().globalData.isLogin;
		console.log(option);
		
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
		getSite(){
			wx.chooseAddress({
			  success (res) {
			    console.log(res.userName)
			    console.log(res.postalCode)
			    console.log(res.provinceName)
			    console.log(res.cityName)
			    console.log(res.countyName)
			    console.log(res.detailInfo)
			    console.log(res.nationalCode)
			    console.log(res.telNumber)
			  }
			})
		},
		Pay(){
			wx.requestPayment({
			  timeStamp: '',
			  nonceStr: '',
			  package: '',
			  signType: 'MD5',
			  paySign: '',
			  success (res) { },
			  fail (res) { }
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
.img-right {
	width: 18rpx;
	height: 24rpx;
	position: relative;
	margin: auto 10rpx;
}
.img-right1{
	width: 15rpx;
	height: 21rpx;
	position: relative;
	left: 30rpx;
	// margin: auto 10rpx;
}
.margin-box{
	margin: 10rpx 0;
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
	// position: relative;
	margin: auto 10rpx auto 0;
	// top: 6rpx;
}
.text-bottom-right {
	position: absolute;
	bottom: 15rpx;
	right: 0;
}
.color-green{
	color: #4ABA8A;
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

.pading-boxs{
	padding: 30rpx 0;
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
.detaile{
	display: flex;
	margin: 60rpx 15px;
	// border: 1px solid;
	flex-wrap: wrap;
	.detaile-li{
		width: 50%;
		padding: 20rpx 20rpx;
		font-size: 24rpx;
		border: 1px solid #B5B5B5;
		text-align: center;
	}
}

.Grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-between;
	padding: 10rpx 0;
	.Grid-Item {
		width: 50%;
		padding: 10rpx;
		text-align: center;
		position: relative;
		.GSimg {
			.Image {
				height: 600rpx;
			}
		}
		.GStoptitle {
			position: absolute;
			top: 25rpx;
			right: 20rpx;
			width: 45rpx;
			height: 45rpx;
		}
		.GSbottomtitle {
			.Image {
				width: 54rpx;
				height: 44rpx;
				margin: 0 10rpx 0 0;
				position: relative;
				top: 10rpx;
			}
			position: absolute;
			bottom: 30rpx;
			left: 30rpx;
			color: #ffffff;
			font-size: 34rpx;
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
	position: absolute;
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
.top_box {
	width: 100rpx;

	position: absolute;
	z-index: 2;
	top: 60rpx;
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
