<template>
	<view style="padding-top:20%;text-align: center;">
		<image src="@/static/imgs/no-login.png" alt="" mode="widthFix"/>
		<view  class="not-login-text">账号未登录，无法查看</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.not-login-text{
	padding-top:40rpx;
	color:#999;
	text-align: center;
}
</style>
