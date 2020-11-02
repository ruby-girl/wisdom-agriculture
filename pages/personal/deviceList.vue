<!--地块管理-->
<template>
	<view class="workOrder">
		<view v-bind:style="{height:windowHeight+'px'}">
			<scroll-view v-bind:style="{height:(windowHeight-20)+'px'}" class="list-container" scroll-y="true">
				<view class="list-item margin-top"  v-for="(item,i) in list" :key="i">
					<view class="flex align-items-center justify-content-flex-justify" @tap="toDetail(item.deviceId)">
						<text class="item-title" >{{item.deviceName}}</text>
						<image class="jt-img" src="../../static/imgs/arrows.png" mode="aspectFill"></image>
					</view>
				</view>
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
				massifId:'',
				list: [],
				
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
			this.massifId=option.massifId
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			this.getData()
		},
		methods: {
			findList(){
				this.$api.findMassifIdByDevice({
					massifId:this.massifId,
					pageNum:this.page,
					pageSize:15,
				}).then(res =>{
					this.list = res.data.data;
				})
				
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
				this.list = []
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
					massifId:this.massifId,
				}
				this.$api.massifGetDeviceList(obj).then(res => {
					this.list = res.data.data;
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: 'setTheWarning?deviceId='+id
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
	}
	.border-top{
		border-top:1px solid #eee;
		margin-top:20rpx;
		padding-top:10rpx;
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
		position: relative;
		top:3px;
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
	.item-icon{
		width:22px !important;
		height:22px !important;
		margin-right: 5px;
	}
	.item-type-box{
		padding: 5px 30rpx;
		width:46%;
		background:rgba(249,249,249,1);
		border-radius:32px;
	}
</style>
