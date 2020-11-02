<!-- 预警处理 -->
<template>
	<view class="workOrder" style="background-color: #F5F5F5">
		<view class="">
			<view class="flex text-center">
				<view class="cu-nav flex-sub" style="color: #17BB89;">
					{{row.msg}}
				</view>
			</view>
		</view>
		<view  v-bind:style="{height:windowHeight - 220 +'px',backgroundColor:'#E5E5E5'}">
			<image :src="row.img" mode="aspectFit" style="width: 100%;height: 100%;" @tap="showImage(row.img)"></image>
		</view>
		<consult v-on:click='click' ></consult>
	</view>
</template>

<script>
import { throttle } from '@/utils/index.js';
import consult from '@/components/consult.vue';
import http from '@/utils/request.js';
export default {
	components: {
		consult,
	},
	data() {
		return {
			orderList: [],
			isLogin:false,
			moreHeight: 30,
			windowHeight: 300,
			row:[],
			
		};
	},
	onLoad(option) {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
		this.row = JSON.parse(decodeURIComponent(option.item));
		// console.log(JSON.parse(decodeURIComponent(option.item)))
		this.row.img = http.config.baseUrl + this.row.picture.substring(1,this.row.picture.length);
	},
	onShareAppMessage: function() {
		return {
			title: '星鸦智农',
			desc: '',
			path: 'pages/monitor/monitor' // 路径，传递参数到指定页面。
		};
	},
	onShow() {
		if (!this.isLogin) {
			//每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
			this.isLogin = getApp().globalData.isLogin;
			if (this.isLogin) {
			}
		} else {
		}
	},
	mounted() {
		this.loadingData = throttle(this.loadingData, 2000);
		// 测试openid
		getApp().globalData.openId = 'XXXXXXXXXXXXX';
	},
	methods: {
		click(index,name) {
			// 查百科
			if (!this.isLogin) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				return
			}
			uni.showToast({
				title: name + '暂未开放',
				icon: 'none'
			});
		},
		showImage(src){
			var list = new Array();
			list.push(src);
			uni.previewImage({
				urls: list,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.workOrder {
	background: #eee;

	.list-container {
		padding: 10rpx 30rpx;
		padding-top: 100rpx;
	}
}

.flex {
	display: flex;
	justify-content: space-between;
}

.workOrder {
	height: 100%;

	.top {
		position: fixed;
		background-color: #fff;
		width: 100%;
		z-index: 1;
	}
}

.box-margin {
	padding-top: 10px;
}

.loading-more {
	text-align: center;
	color: #ddd;
	padding-bottom: 50rpx;
	padding-top: 20px;
}

.order-title {
	line-height: 20px;
}

.small-text {
	color: #999999;
	font-size: 26rpx;
}

.state-box {
	position: relative;
	right: -15px;
	padding: 3px 6px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
	background: #49ba89;
	color: #fff;
}

.item-content-box {
	width: 30%;
	text-align: center;

	.item-num {
		font-size: 18px;
		font-weight: bold;
	}
}

.timeline-box {
	text {
		color: red;
	}
}
.cu-timeline {
	padding: 30rpx 0;
}
.cu-nav,
.cu-items{
	height: 90rpx;
	display: inline-block;
	line-height: 90rpx;
	padding: 0 20rpx;
	white-space: nowrap;
	color: #9A9A9A;
}
	
.color-black{
	color: #000000 !important;
}
</style>
