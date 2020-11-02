<template>
	<!-- 详细预警设置 -->
	<view>	
		<view class="cu-form-group">
			<view class="title">最低预警值</view>
			<input placeholder="低于此值时预警通知" v-model="obj.lowest" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">最高预警值</view>
			<input placeholder="高于此值时预警通知" v-model="obj.highest" name="input"></input>
		</view>
		<view class="bottom-lg-btn" @click="setFunc">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{
					lowest:'',
					highest:'',
					warningId:''
				},
				deviceId:''
				}
		},
		onLoad(option) {
			this.obj.warnId=option.warnId
			this.obj.lowest=option.low
			this.obj.highest=option.high
			this.deviceId=option.deviceId
			this.obj.open = true;
		},
		methods: {
			setFunc(){
				if(!this.obj.lowest||!this.obj.highest){
					uni.showToast({
						title: '请输入预警值',
						icon: 'none'
					})
					return
				}
				let _this=this
				this.$api.warnUpdate(this.obj).then(res=>{
					uni.showToast({
						title: '设置成功',
						duration: 2000,
						success() {
							setTimeout(function(){
								let pages = getCurrentPages(); // 当前页面
								let beforePage = pages[pages.length - 2]; // 前一个页面
								uni.navigateBack({
									success: function() {
										beforePage.onLoad({deviceId:_this.deviceId}); // 执行前一个页面的onLoad方法
									}
								});
							},2000)
						}
					});
				})
			}
		}
	}
</script>

<style scoped>
	.code-img {
		position: absolute;
		right: 20px;
		bottom: rpx;
		width: 35rpx;
		height: 35rpx;
	}

	.cu-form-group picker::after {
		line-height: 50rpx;
	}

	.uni-input {
		line-height: 18rpx;
		padding-left: 0;
	}

	.title {
		width: 180rpx;
	}

	.bottom-lg-btn {
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width: 80%;
		margin: 60rpx auto;
		text-align: center;
		color: #fff;
	}
	.btn-box {
		border: 1px solid #eee;
		padding: 4px 8px;
		border-radius: 4px;
		margin: 20rpx 30rpx 20rpx 0;
	}
	
	.btn-box-action {
		border: 1px solid #00AE66;
		color: #00AE66;
	}
</style>
