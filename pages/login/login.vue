<template>
	<view class="padding-login">
		<view class="title-y">
			欢迎登录/注册科维特！
		</view>
		<view class="border-bottom">
			<view class="cu-form-group">
				<input @input="onInput" type="number" placeholder="请输入手机号码" name="input"></input>
			</view>
		</view>
		<view class="border-bottom">
			<view class="cu-form-group">
				<input placeholder="请输入验证码" name="input" @input="captchaInput"></input>
				<button class='cu-btn line-green' :disabled="disabled" @click="codeClick">{{btnTitle}}{{txt}}</button>
			</view>
		</view>
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" style="margin-top:100rpx" open-type="getUserInfo"
		 lang="zh_CN" @getuserinfo="onGotUserInfo" withCredentials="true">
			登录/注册</button>
		<view class="auto-bottom">
			注册即为同意<text class="agreement" @click="toTermsOfService">《科维特用户使用协议》</text>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello',
				obj: {
					username: '',
					password: ''
				},
				headPortrait: '',
				name: '',
				disabled: false,
				btnTitle: "获取验证码",
				txt: '',
				user:{
					nickName:'',
					avatarUrl:''
				}
			}
		},
		onShareAppMessage: function() {
			return {
				title: '科维特',
				desc: '',
				path: '/pages/login/login'
			}
		},
		onShow() {
			// uni.hideHomeButton()
		},
		onBackPress(e) {
			// return true 表示禁止默认返回
			return false
		},
		methods: {
			toTermsOfService(){			
				uni.navigateTo({
					url:'/pageA/termsOfService'
				})	
			},
			onInput(e) {
				this.obj.username = e.detail.value
			},
			captchaInput(e){
				this.obj.password = e.detail.value
			},
			// 手动授权方法
			onGotUserInfo(e) {
				if (!this.obj.username) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (!this.obj.password) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				let _this=this
				wx.login({
					success(res) {
						if (res.code) {
							//发起网络请求
							var code = res.code
							// 这里通过code获取openid
							// getApp().globalData.openId='XXXXXXXXXXXXX'
							// 获取微信用户信息
							wx.getUserInfo({
								success: function(res) {
									var userInfo = res.userInfo
									_this.user.nickName = userInfo.nickName //昵称
									_this.user.avatarUrl = userInfo.avatarUrl //头像
									_this.userLogin()
								},
								fail: res => {
									console.info('失败')
									// 获取失败的去引导用户授权 
								}
							})
						} else {

						}
					}
				})
			},
			codeClick() {
				//点击发送验证码		     
				let _this = this
				if (!this.obj.username) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				this.disabled = true
				this.$api.captcha({
					phone: this.obj.username
				}).then(res => {
					console.log('1',res)
					if (res.data.stateCode == 200) {
						this.btnTitle = 60
						this.txt = '秒后获取'
						let timer = setInterval(function() {
							if (_this.btnTitle == 1) {
								clearInterval(timer)
								_this.btnTitle = '获取验证码'
								_this.txt = ''
								_this.disabled = false
							} else {
								_this.btnTitle = _this.btnTitle - 1
							}
						}, 1000)
					} else {
						this.btnTitle = 180
						this.txt = '秒后获取'
						let timer = setInterval(function() {
							if (_this.btnTitle == 1) {
								clearInterval(timer)
								_this.btnTitle = '获取验证码'
								_this.txt = ''
								_this.disabled = false
							} else {
								_this.btnTitle = _this.btnTitle - 1
							}
						}, 1000)
					}
				})
			},
			userLogin() {
				let that = this;
				this.$api.login(this.obj).then(res => {		
					let obj = {
						token: res.data.token,					
						nickName: this.user.nickName,
						avatarUrl: this.user.avatarUrl,
						phone: this.obj.username,
						cookie: res.cookies[0],
					}
					uni.setStorage({
						key: 'XYZNUserInfo',
						data: obj,
						success() {
							uni.showToast({
								title: '登录成功',
								icon: 'success',
								success() {
									uni.switchTab({
										url: '../personal/personal'
									});
								}
							})
						}
					})
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #fff;
	}

	.text-margin {
		margin-left: 5px;
		font-size: 15px;
	}

	.border-bottom {
		border-bottom: 1px solid #eee;
		padding: 5px 0;

		.uni-input-placeholder {
			font-size: 16px;
		}

		.iconfont {
			position: relative;
			top: 2px;
		}
	}

	.padding-login {
		padding: 0 60rpx;
	}

	.color-green {
		color: #00AE66;
	}

	.logo-box {
		width: 200rpx;
		height: 200rpx;
		margin: 0 auto;
	}

	.title-y {
		text-align: left;
		margin: 80rpx 0;
		font-size: 42rpx;
		font-weight: bold;
		color:#333;
		font-family:PingFang SC;
	}

	.auto-bottom {
		padding-top: 30vh;
		text-align: center;

		.agreement {
			color: #0FD4FF;
		}
	}
	.cu-form-group{
		min-height:80rpx;
		padding:0;
	}
	.cu-btn::after{
		border-radius: 30px !important;
	}
</style>
