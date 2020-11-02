<template>
	<view class="list-item">
		<view class="flex  align-items-center justify-content-flex-justify">
			<view class="flex  align-items-center">
				<image class="land-img" src="../static/imgs/location.png" mode=""></image>
				<view class="item-title">
					<view class="order-title">NO.{{itemObject.massifNo}}</view>
					<view class="order-title small-text">{{itemObject.massifName}}</view>
				</view>
			</view>
			<view class="state-box" v-if="itemObject.statusTxt=='在线'">
				{{itemObject.statusTxt}}
			</view>
			<view class="state-box-error" v-else-if="itemObject.statusTxt!=='-'">
				{{itemObject.statusTxt}}
			</view>
		</view>
		<view class="box-margin flex  align-items-center flex-wrap">
			<view class="item-content-box">
				<view class="item-num">
					{{itemObject.proportion||'-'}}<span class="small-txt">%</span>
				</view>
				<text class="small-text">{{itemObject.crops}}</text>
			</view>
			<view class="item-content-box" v-for="(item,i) in itemObject.monitorings" :key="i">
				<view class="item-num">
					{{item.value||'-'}}<span class="small-txt">{{item.unit}}</span>
				</view>
				<text class="small-text">{{item.operation}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'landBlock',
		props: {
			itemObject: {
			      type: Object,
			      default: function() {		      
			        return {proportion:'0'};
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
	.small-text{
		color:#999999;
		font-size: 13px;
	}
	.list-item{
		background: #fff;
		border-radius: 8px;
		padding:20rpx;
		margin-bottom: 20rpx;
	}
	.state-box {
		position: relative;
		padding:3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		right:-20rpx;
		background: #49BA89;
		color:#fff;
	}
	.state-box-error{
		position: relative;
		padding:3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		right:-20rpx;
		background: #FDB523;
		color:#fff;
	}
	.item-content-box{
		width:32%;
		text-align: center;
		.item-num{
			font-size: 18px;
			font-weight: bold;
		}
	}
	.small-txt{
		font-size: 12px;
	}
</style>
