<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true" style="background-color: #FFFFFF;">
			<view class="top">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center justify-center" style="padding-bottom: 8rpx;">
						<view
							class="cu-item font-size-16"
							:class="item.id == TabCur ? 'text-green cur' : 'text-black'"
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
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center justify-center" style="padding-bottom: 8rpx;">
						<view
							class="cu-item font-size-12"
							:class="item.id == TabListCur ? 'text-black font-size-16' : ''"
							v-for="(item, index) in tabList"
							:key="index"
							@tap="tabListSelect"
							:data-id="item.id"
						>
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
				<view v-if="TabListCur == 1">
					<area-chart ></area-chart>
				</view>
				<view v-else-if="TabListCur == 2">
				</view>
			</view>
			<view v-else-if="TabCur == 2">
				<auxograph :imgsArr="imgsArr" />
			</view>
			<view v-else>
				<view class="Grid">
					<view class="Grid-Item" >
						<view class="GSimg">
							<image class="Image" src="../../static/images/TPG07956984.jpg" mode="aspectFill"></image>
							<view class="GSbottomtitle">1/2</view>
						</view>
						<view class="GStitle">育种</view>
					</view>
					<view class="Grid-Item" >
						<view class="GSimg">
							<image class="Image" src="../../static/images/TPG07956984.jpg" mode="aspectFill"></image>
							<view class="GSbottomtitle">1/2</view>
						</view>
						<view class="GStitle">灌溉</view>
					</view>
				</view>
				
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import AreaChart from '@/components/u-charts/u-charts/area.vue';
	import Auxograph from '@/components/auxograph.vue';
export default {
	components: {
		AreaChart,
		Auxograph,
	},
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
					name: '环境数据'
				},
				{
					id: 2,
					name: '成长过程'
				},
				{
					id: 3,
					name: '农场劳作'
				}
			],
			TabCur: 1,
			tabList: [
				{
					id: 1,
					name: '空间温度'
				},
				{
					id: 2,
					name: '空间湿度'
				},
				{
					id: 3,
					name: '太阳光照度'
				},
				{
					id: 4,
					name: '土壤湿度'
				},
			],
			TabListCur:1,
			imgsArr:[
				{
					date:'2020-1-1',
					resArr:['../../../static/images/u=12638188,2993346786&fm=26&gp=0.jpg']
				},
				{
					date:'2020-1-2',
					resArr:['../../../static/images/u=12638188,2993346786&fm=26&gp=0.jpg']
				},
				{
					date:'2020-1-3',
					resArr:['../../../static/images/u=12638188,2993346786&fm=26&gp=0.jpg']
				},
				{
					date:'2020-1-4',
					resArr:['../../../static/images/u=12638188,2993346786&fm=26&gp=0.jpg']
				},
				{
					date:'2020-1-5',
					resArr:['../../../static/images/u=12638188,2993346786&fm=26&gp=0.jpg']
				},
			],
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
		GetDeviceImageData() {
			//生长历程
			this.$api.GetDeviceImageData({ deviceId: this.deviceId }).then(res => {
				this.imgsArr = res.data.data;
				this.imgsArr.map(item => {
					let f = item.picture.split('[')[1];
					let t = f.split(']')[0];
					let arr = t.split(',');
					arr.forEach((li, n) => {
						if (li.charAt(0) == ' ') {
							li = li.split(' ')[1];
						}
						arr[n] = li;
					});
					item.resArr = arr;
				});
			});
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
		},
		tabListSelect(e){
			this.TabListCur = e.currentTarget.dataset.id;
		},
		onClick (e) {
		        uni.showToast({
		          title: `点击${e.content.text}`,
		          icon: 'none'
		        })
		      },
		      buttonClick (e) {
		        uni.navigateTo({
		        	url:"farmPay",
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
	padding: 10rpx;
	.Grid-Item {
		width: 50%;
		padding: 20rpx;
		text-align: center;
		position: relative;
		.GSimg {
			position: relative;
			.Image {
				height: 300rpx;
				border-radius: 10rpx;
			}
			.GSbottomtitle{
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				color: #FFFFFF;
			}
		}
		
		.GStitle {
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
