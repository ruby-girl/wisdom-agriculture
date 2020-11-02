<!--地块管理-->
<template>
	<view class="workOrder">
		<view class="top equipmentManagement-title flex  align-items-center justify-content-flex-justify">
			<view style="font-size: 16px;font-weight: bold;" class="flex  align-items-center">
				<view style="width: 20px;height: 20px;background-color: #F2EF78;margin-right: 5px;"></view>
				<text>我的地块</text>
			</view>
			<view class="equipmentManagement-btn" @click="toAdd">
				<image src="../../static/imgs/add.png" mode=""></image>
				<text>新增</text>
			</view>
		</view>
		<view >
			<scroll-view v-bind:style="{height:windowHeight- 50 +'px'}" class="list-container" scroll-y="true" refresher-enabled="true"
			 refresher-background="#eee" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
			 @scrolltolower="loadingData">
				<!-- <view class="cu-form-group" v-for="(item,i) in newsList" :key="i" style="padding:20rpx 30rpx;" @click="toDetail(item.massifId)">
					<view>
						<view class="item-title">NO.{{item.massifNo}}  {{item.massifName}}  </view>
						<view class="small-text">{{item.farmName}}</view>
					</view>
					<image class="right-jt" src="../../static/imgs/arrows.png" mode=""></image>
				</view> -->
				<view class="flex align-center card"  v-for="(item,i) in newsList" :key="i" @tap="toDetail(item.massifId)">
					<view class="flex-1 " >
						<text class="flex">NO.{{item.massifNo}}</text>
						<text class="flex text-gray">{{item.massifName}}</text>
					</view>
					<view >
						<view class="flex align-center" style="font-family: Verdana, Geneva, Tahoma, sans-serif;line-height: 0.9;">
							<text style="font-size: 30px;">{{item.proportion.toFixed(0)}}</text>%
						</view>
						<text class="flex text-gray" >已完成</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- <view class="add-box" @click="toAdd">
			<image class="right-jt" src="../../static/imgs/add.png" mode=""></image>
		</view> -->
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
				let obj = {
					pageNum: this.page,
					pageSize: 15
				}
				this.$api.selectMassif(obj).then(res => {
					
					// if (this.page == 1 && this.newsList.length == 0) {
					// 	this.loadingType = 0
					// 	this.contentdown = '暂无数据'
					// } else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length < 3) {
					// 	this.contentdown = ''
					// 	this.loadingType = 0
					// } else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length > 2) {
					// 	this.contentdown = '无更多数据'
					// 	this.loadingType = 0
					// } else if (res.data.data.rowCount == this.newsList.length) {
					// 	this.loadingType = 0
					// 	this.contentdown = '无更多数据'
					// } else {
					// 	this.contentdown = '上拉加载更多'
					// 	this.loadingType = 1
					// }
					this.monitor(0,res.data.data);
				})
			},
			monitor(index,array){
				this.$api.monitor({massifId:array[index].massifId}).then(res => {
					array[index].proportion = res.data.data.proportion;
					array[index].crops = res.data.data.crops;
					if(++index < array.length){
						this.monitor(index,array);
					} else {
						this.newsList = array;
					}
				})
			},
			toAdd(){
				uni.navigateTo({
					url: 'addLand'
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: 'addLand?massifId='+id
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
			background-color: #fff;
			width: 100%;
		}
	}
	.card{
		width: 47%;
		margin: 20rpx 10rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding:20rpx 20rpx;
		float: left;
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
	.equipmentManagement-title {
		padding: 15rpx 30rpx;
		background: #eee;
	
		image {
			width: 24px;
			margin-right: 5px;
		}
	
		.equipmentManagement-btn {
			background: #17BB89;
			padding: 3px 8px;
			border-radius: 17px;
			color: #fff;
	
			image {
				width: 10px;
				height: 10px;
				margin-right: 3px;
			}
		}
	}
</style>
