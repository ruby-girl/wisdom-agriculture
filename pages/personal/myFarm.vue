<!--我的农场 -->
<template>
	<view class="workOrder">
		<view class="top equipmentManagement-title flex  align-items-center justify-content-flex-justify">
			<view style="font-size: 16px;font-weight: bold;" class="flex  align-items-center">
				<image style="height:20px" src="../../static/imgs/farm-management-2.png" mode=""></image>
				<text>我的农场</text>
			</view>
			<view class="equipmentManagement-btn" @click="toAdd">
				<image src="../../static/imgs/add.png" mode=""></image>
				<text>添加</text>
			</view>
		</view>
		<scroll-view v-bind:style="{height:windowHeight+'px'}" class="list-container" scroll-y="true" refresher-enabled="true"
		 refresher-background="#eee" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
		 @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
		 @scrolltolower="loadingData">
			<view class="list-item" :style="{'margin-top':index==0?true:false}" v-for="(item,index) in newsList" :key="index"
			 @tap="toDetail(item.farmId)">
				<view class="flex align-items-center justify-content-flex-justify">
					<text class="item-title">{{item.farmName}}</text>
					<!-- <view class="del-box" @click.stop="delFarm(item.farmId)">删除</view> -->
					<!-- <image class="jt-img" src="../../static/imgs/arrows.png" mode="aspectFill"></image> -->
				</view>
				<view style="line-height:35px;">
					<image style="width:17px;height:20px;" src="../../static/imgs/location-2.png"></image>
					<text>{{item.provinceName}}{{item.cityName}}{{item.countyName}}{{item.address||''}}</text>
				</view>
				<view class="flex align-items-center justify-content-flex-justify">
					<view class="item-type-box flex align-items-center justify-content-flex-justify">
						<view class="flex align-items-center">
							<image class="item-icon" src="../../static/imgs/land-management.png" mode="aspectFill"></image>
							<text>地块</text>
						</view>
						<text>{{item.massifCount}}</text>
					</view>
					<view class="flex item-type-box align-items-center justify-content-flex-justify">
						<view class="">
							<image class="item-icon" src="../../static/imgs/warning.png" mode="aspectFill"></image>
							<text>预警</text>
						</view>
						<text style="color:red;">{{item.waringCount}}</text>
					</view>
				</view>
				<!-- <view class="item-content">
					{{item.introduce||''}}
				</view> -->
			</view>
			<view class="loading-more">{{contentdown}}</view>
		</scroll-view>
		 <popup content='该农场下的地块和设备也会全部删除,是否继续？' align='center' cancelText="我再想想" :show='popupShow' :showCancel='true' confirmText='确定'
		  @confirm="confirmFunc" @close="closePopup" />
	</view>
</template>

<script>
	import popup from "@/components/neil-modal/neil-modal.vue"
	import {
		throttle
	} from "@/utils/index.js"
	export default {
		data() {
			return {
				orderList: [],
				newsList: [],
				baseId: '',
				page: 1,
				pageSize: 10,
				moreHeight: 30,
				windowHeight: 300,
				contentdown: '',
				newsList: [],
				loadingType: 0,
				triggered: false,
				_freshing: false,
				popupShow:false,
				delID:null
			};
		},
		components: {
			popup
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			this.loadingData = throttle(this.loadingData, 2000);
			this.initData()
			// this.getData()
		},
		methods: {
			delFarm(id){//删除农场
				this.delID=id
				this.popupShow=true
			},
			confirmFunc(){
				let _this=this
				this.$api.deleteFarm({farmId:this.delID}).then(res=>{
					
					uni.showToast({
						title: '删除成功',
						duration: 2000,
						success() {
							_this.popupShow=false
							_this.initData()
						}
					});
				})
			},
			closePopup(){
				this.popupShow=false
			},
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
			toAdd() { //添加农场	
				uni.navigateTo({
					url: 'addMyFarm'
				})
			},
			toDetail(id) { //跳转我的农场详情
				uni.setStorage({
					key: 'farmId',
					data: id,
					success() {
						uni.navigateTo({
							url: 'detailFarm'
						})
					}
				})


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
					pageSize: this.pageSize
				}
				this.$api.farmList({userId:uni.getStorageSync('XYZNUserInfo').userId}).then(res => {
					// this.newsList = this.newsList.concat(res.data.data.farms)
					this.newsList = res.data.data
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
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.workOrder {
		background: #eee;

		.list-container {
			padding: 10rpx 30rpx;
			padding-top: 80rpx;
		}
	}
	.del-box{
		padding:0 15rpx;
		color:red;
	}
	.flex {
		display: flex;
		justify-content: space-between;
	}

	.workOrder {
		height: 100%;

		.top {
			position: fixed;
			width: 100%;
			z-index: 1;
		}
	}

	.box-margin {
		padding-top: 10px;
	}

	.list-item {
		box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
		border-radius: 6px;
		background: #fff;
		padding: 20rpx 15px 20px 15px;
		margin: 20rpx 8rpx 30rpx 8rpx;
	}

	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 50rpx;
		padding-top:20px;
	}

	.content {
		padding: 30rpx;
		overflow-y: auto;
		position: relative;
		padding-top: 200rpx;

		.item {
			padding: 30rpx;
			line-height: 30rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
			margin-bottom: 30rpx;

			.flex {
				margin-bottom: 20rpx;
			}
		}

		.imgIcon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10px;
		}
	}

	.order-title {
		line-height: 20px;
	}

	.small-text {
		color: #999999;
		font-size: 13px;
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

	.line-img {
		width: 20px !important;
		height: 20px !important;
	}

	.jt-img {
		width: 8px !important;
		height: 16px !important;
		margin-left: 5px;
	}

	.item-bottom-box {
		border-top: 1px solid #eee;
		padding-top: 20rpx;
		margin-right: 20rpx;
	}

	.item-bottom-box-left {
		width: 50%;
		padding: 20rpx 20rpx 20rpx 0;
	}

	.item-title {
		font-size: 15px;
		font-weight: bold;
	}

	.item-icon {
		width: 22px !important;
		height: 22px !important;
		margin-right: 5px;
	}

	.item-type-box {
		padding: 5px 30rpx;
		width: 46%;
		background: rgba(249, 249, 249, 1);
		border-radius: 32px;
	}

	.item-content {
		padding-top: 20rpx;
		text-indent: 2em;
		font-size: 13px;
		color: #999;
	}
</style>
