<template>
	<view class="">
		<view class="cu-form-group">
			<view class="title">用户名</view>
			<input class="form-input-left" v-model="postData.staffName" placeholder="请输入用户名"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input class="form-input-left" v-model="postData.phone" type="number" placeholder="请输入手机号码"></input>
		</view>
		<view :class="{'bottom-lg-btn':true}" @click="authSave">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				postData:{
					staffName:'',
					phone:''
				}
			}
		},
		
		onShow() {
			
		},
		methods: {
			authSave(){
				this.$api.authSave(this.postData).then(res=>{
					uni.showToast({
						title: '授权成功',
						duration: 2000,
						success() {
							setTimeout(function(){
								let pages = getCurrentPages(); // 当前页面
								let beforePage = pages[pages.length - 2]; // 前一个页面
								uni.navigateBack({
									success: function() {
										beforePage.onLoad(); // 执行前一个页面的onLoad方法
									}
								});
							},2000)
						}
					});
				})
			},
		}}
</script>

<style scoped>
	.cu-form-group picker::after {
		line-height: 50rpx;
	}
	.title {
		width: 180rpx;
	}
	.uni-input {
		line-height: 18rpx;
		padding-left: 0;
	}
	.bottom-lg-btn {
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width: 80%;
		margin: 40rpx auto;
		text-align: center;
		color: #fff;
	}
</style>
