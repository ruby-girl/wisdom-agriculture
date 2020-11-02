<!--地块管理-->
<template>
	<view class="workOrder">
		<view v-bind:style="{height:windowHeight+'px'}">
			<scroll-view v-bind:style="{height:windowHeight+'px'}" class="list-container" scroll-y="true" refresher-enabled="true"
			 refresher-background="#fff" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
			 @scrolltolower="loadingData">
				<view class="cu-form-group" v-for="(item,i) in newsList" :key="i" style="padding:20rpx 30rpx;" @click="toSet(item.massifId)">
					<view>
						<view class="item-title">NO.{{item.massifNo}}  {{item.massifName}}</view>
						<view class="small-text">预警设置</view>
					</view>
					<image class="right-jt" src="../../static/imgs/arrows.png" mode=""></image>
				</view>
				<view class="loading-more">{{contentdown}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	export default {
		data() {
			return {
				orderList: [],
				list: [{
					name: 'asdasd'
				}, {
					name: 'asdasd'
				}, {
					name: 'asdasd'
				}],
				newsList: [],
				baseId: '',
				obj: {
					baseId: '',
					organUserId: '',
					plantingBatchStatus: '' //批次状态
				},
				listObj: {
					plantingBatchId: '', //批次ID
					timeType: '', //时间
					workOrderStatus: '', //工单状态
					initiatorId: '' //发起人
				},
				page: 1,
				moreHeight: 30,
				windowHeight: 300,
				contentdown: '',
				newsList: [],
				loadingType: 0,
				triggered: false,
				_freshing: false,
				popupShow: false
			};
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			this.loadingData = throttle(this.loadingData, 2000);
			this.initData()
			// this.getData()
		},
		methods: {
			onPulling() {},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				if (!this.triggered) { //界面下拉触发，triggered可能不是true，要设为true  
					this.triggered = true;
				}
				let _this = this
				setTimeout(() => {
					this.triggered = false; //触发onRestore，并关闭刷新图标
					this._freshing = false;
					_this.initData()
				}, 1000)
			},
			onRestore() {
				this.triggered = false; // 需要重置
				this._freshing = false
			},
			onAbort() {
				this.triggered = false; //触发onRestore，并关闭刷新图标
				this._freshing = false;
			},
			initData() {
				this.newsList = []
				this.page = 1
				this.loadingType = 1
				this.contentdown = ''
				this.getData()
			},
			scrolltoupper() {
				console.info('下拉')
			},
			loadingData(e) {
				this.lastTime = e.timeStamp
				if (this.loadingType) {
					this.page++
					this.contentdown = '加载中...'
					this.getData()
				}
			},
			getData() {
			
				this.$api.selectMassif().then(res => {
					this.newsList = res.data.data
					
				})
			},
			toSet(id){
				uni.navigateTo({
					// url: 'setTheWarning?massifId='+id,
					url: 'deviceList?massifId='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.workOrder {
		background: #eee;
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
		padding-top:20px;
	}

	.order-title {
		line-height: 20px;
	}

	.small-text {
		color: #999999;
		font-size: 13px;
		line-height: 20px;
	}

	.state-box {
		position: relative;
		right: -15px;
		padding: 3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		background: #49BA89;
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
	.right-jt {
		width: 14rpx;
		height: 28rpx;
	}
	.item-title{
		font-size: 15px;
		line-height: 20px;
	}
	.add-box{
		background: #17BB89;
		height:100rpx;
		width:100rpx;
		text-align: center;
		border-radius: 50%;
		position: fixed;
		bottom:80rpx;
		right:80rpx;
		image{
			width:60rpx;
			height:60rpx;
			margin-top: 18rpx;
		}
	}
</style>
