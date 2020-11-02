<!-- 识别结果 -->
<template>
	<view class="workOrder" style="background-color: #F5F5F5">
		<view v-bind:style="{height:windowHeight/2 +'px',backgroundColor:'#E5E5E5'}">
			<image :src="iamgrUrl" mode="aspectFit" style="width: 100%;height: 100%;" @tap="showImage(iamgrUrl)"></image>
		</view>
		<view class="list-item" v-bind:style="{height:windowHeight/2 +'px'}">
			<view class="flex" v-bind:style="{height:windowHeight/4 +'px'}" v-if="dataList.length>0">
				<view v-for="(item,i) in dataList" class="item-box bg" :key="i" v-bind:style="{width: 100 / dataList.length + '%'}">
					<text style="font-size: 30rpx;font-weight: bold;">
						{{item.name == '非动物'?'未识别到病虫':item.name}}
					</text>
					<text style="font-size: 25rpx;">
						{{item.name == '非动物'?'':'相似度'}}
					</text>
					<text style="font-size: 25rpx;">
						{{item.num}}
					</text>
				</view>
			</view>
			<button @tap='scan' class="cu-btn block line-white lg" style="width:90%;margin:60rpx auto;background-color: #17BB89;border-radius: 20px;">重新识别</button>
		</view>
	</view>
</template>

<script>
	import {
		throttle
	} from '@/utils/index.js';
	import consult from '@/components/consult.vue';
	import http from '@/utils/request.js';
	export default {
		components: {
			consult,
		},
		data() {
			return {
				orderList: [],
				isLogin: false,
				moreHeight: 30,
				windowHeight: 300,
				dataList: [],
				iamgrUrl: '',

			};
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
			this.isLogin = getApp().globalData.isLogin;
			this.dataList = JSON.parse(decodeURIComponent(option.item));
			this.dataList.forEach(element => {
				if (element.name == '非动物') {
					element.num = ''
				} else {
					element.num = (Number(element.score) * 100).toFixed(2) + '%'
				}
			});
			this.iamgrUrl = option.iamge;
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
				if (this.isLogin) {}
			} else {}
		},
		mounted() {
			this.loadingData = throttle(this.loadingData, 2000);
			// 测试openid
			getApp().globalData.openId = 'XXXXXXXXXXXXX';
		},
		methods: {
			scan() {
				// 识别病虫/病种
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				var that = this;
				wx.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						uni.showLoading({
							title: '识别中'
						});
						var tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: http.config.baseUrl + 'api/ai/pests',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'token': uni.getStorageSync('XYZNUserInfo').token
							},
							success: (uploadFileRes) => {
								var list = JSON.parse(uploadFileRes.data)
								that.dataList = list.data.result;
								if (list.data.result.length > 3) {
									that.dataList = that.dataList.slice(0, 3);
								};
								that.dataList.forEach(element => {
									if (element.name == '非动物') {
										element.num = ''
									} else {
										element.num = (Number(element.score) * 100).toFixed(2) + '%'
									}
								});
								that.iamgrUrl = tempFilePaths;
								uni.hideLoading();
							}
						});

					},
					fail: function(res) {
						uni.showToast({
							title: '请求超时，请重试',
							icon: 'none'
						});
					}

				});
			},
			showImage(src) {
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

	.bg {
		padding: 0 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}
</style>
