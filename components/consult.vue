<template>
	<view class="list-item">
		<view class="flex" style="margin-top: 20rpx;">
			<view class="item-box bg"><image src="../static/imgs/Check-wikipedia.png" mode="widthFix" @tap="click(0,'查百科')"></image></view>
			<view class="item-box bg"><image src="../static/imgs/for-experts.png" mode="widthFix" @tap="click(1,'找专家')"></image></view>
			<view class="item-box bg"><image src="../static/imgs/The-consulting.png" mode="widthFix" @tap="click(2,'看咨询')"></image></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'consult',
		props: {
			itemObject: {
			      type: Object,
			      default: function() {		      
			      }
			}
		},	
		data() {
			return {
				
			}
		},
		methods: {
			click(index,name){
				this.$emit('click',index,name);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-item{
		border-radius: 8px;
		margin-bottom: 20rpx;
	}
	.title > image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 5px;
	}
	.item-box {
		margin: auto;
	}
	
	.positon-box {
		position: relative;
		top: -80rpx;
		z-index: 1011;
		padding: 0 30rpx;
	
		.position-num {
			font-size: 28px;
			font-weight: bold;
			color: #49ba89;
			text-align: center;
		}
	}
	.bg {
		background-color: #ffffff;
		width: 32%;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		
	}
</style>
