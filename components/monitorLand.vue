<template>
	<view class="list-item">
		<view class="flex  align-items-center justify-content-flex-justify">
		
				
				<view class="item-title" style="flex:1">
					<view class="flex  align-items-center">
						<image class="land-img" src="../static/imgs/location.png" mode=""></image>
						<view class="">
							<view class="order-title" style="font-weight: bold;">NO.{{itemObject.massifNo}}</view>
							<view class="order-title small-text">{{itemObject.massifName}}</view>
							<view class="order-title small-text">{{itemObject.address}}</view>
						</view>
					</view>
					
					<view class="" style="padding-left:20rpx;line-height: 80rpx;">
						绑定设备
					</view>
					<view class="flex  align-items-center" style="padding-left:20rpx" v-if="itemObject.device.length>0">
						<view class="equi-item" v-for="(item,i) in itemObject.device" :key="i">
							<view :class="{'color-lv':item.statusTxt=='在线'?true:false}">
								<view>
									{{item.deviceName}}
								</view>
								<view>
									{{item.statusTxt}}
								</view>
							</view>
						</view>
					</view>
					<view v-else style="font-size: 20rpx;color:#B8B8B8;padding-left:20rpx">
						无
					</view>
				</view>
		
			<view>
				<view class="pie" v-if="itemObject.proportion<10">
					<view class="pie-txt">
						<text>
							{{itemObject.proportion}}%
						</text>
						<view class="">
							{{itemObject.crop}}
						</view>
					</view>
					<view class="pie-cycle" :style="{'transform':'rotate(.0' + Math.floor(itemObject.proportion) +'turn)'}"></view>
				</view>
				<view class="pie" v-else-if="itemObject.proportion<50">
					<view class="pie-txt">
						<text>
							{{itemObject.proportion}}%
						</text>
						<view class="">
							{{itemObject.crop}}
						</view>
					</view>
					<view class="pie-cycle" :style="{'transform':'rotate(.'+ Math.floor(itemObject.proportion) +'turn)'}"></view>
				</view>
				<view class="pie-big" v-else-if="itemObject.proportion<100">
					<view class="pie-txt">
						<text>
							{{itemObject.proportion}}%
						</text>
						<view class="">
							{{itemObject.crop}}
						</view>
					</view>
					<view class="pie-cycle" :style="{'transform':'rotate(.'+Math.floor(itemObject.proportion)/10+'turn)'}"></view>
				</view>
				<view class="pie-big-end" v-else-if="itemObject.proportion==100">
					<view class="pie-txt">
						<text>
							已成熟
						</text>
						<view class="">
							{{itemObject.crop}}
						</view>
					</view>
					<view class="pie-cycle" :style="{'transform':'rotate(1turn)'}"></view>
				</view>
				<view style="text-align: center;">生长进度</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'monitorLand',
		props: {
			itemObject: {
				type: Object,
				default: function() {
					return {
						proportion: '0'
					};
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	image {
		width: 28px;
		height: 28px;
		margin-right: 20rpx;
		position: relative;
		top: 3px;
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
		font-size: 20rpx;
		line-height: 24rpx;
	}

	.list-item {
		background: #fff;
		border-radius: 8px;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}

	.state-box {
		position: relative;
		padding: 3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		right: -20rpx;
		background: #49BA89;
		color: #fff;
	}

	.state-box-error {
		position: relative;
		padding: 3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		right: -20rpx;
		background: #FDB523;
		color: #fff;
	}

	.item-content-box {
		width: 32%;
		text-align: center;

		.item-num {
			font-size: 18px;
			font-weight: bold;
		}
	}

	.small-txt {
		font-size: 12px;
	}

	.pie {
		width: 200rpx;
		height: 200rpx;
		position: relative;
		border-radius: 50%;
		background: #C0EDDA;
		text-align: center;
		background-image: linear-gradient(to right, transparent 50%, #4ABA8A 0);
	}
	.pie-big{
		width: 200rpx;
		height: 200rpx;
		position: relative;
		border-radius: 50%;
		background: #4ABA8A;
		text-align: center;
		background-image: linear-gradient(to right, transparent 50%, #C0EDDA 0);
	}
	.pie-big-end{
		width: 200rpx;
		height: 200rpx;
		position: relative;
		border-radius: 50%;
		background: #FEB624;
		text-align: center;
		background-image: linear-gradient(to right, transparent 50%, #FEB624 0);
	}
	.pie-big .pie-cycle {
		display: block;
		margin-left: 50%;
		height: 100%;
		border-radius: 0 100% 100% 0/50%;
		background-color: inherit;
		transform-origin: left;
		// transform: rotate(.2turn);
	}
	.pie-cycle {
		display: block;
		margin-left: 50%;
		height: 100%;
		border-radius: 0 100% 100% 0/50%;
		background-color: inherit;
		transform-origin: left;
		// transform: rotate(.2turn);
	}
	.pie-txt{
		position: absolute;
		width:100%;
		height: 100%;
		text-align: center;
		padding-top: 60rpx;
		left:0;
		top:0;
		color:#fff;
		line-height: 40rpx;
		z-index: 111111;
	}
	.equi-item{
		width:25%;
		text-align: center;
		font-size: 14rpx;
	}
	.equi-item view{
		font-size: 20rpx;
		color:#B8B8B8;
	}
	.color-lv view{
		color:#49BA89 !important;
	}
</style>
