<template>
	<view>
		<view v-if="!obj.deviceId" class="cu-form-group" style="position: relative;">
			<view class="title">设备序列号</view>
			<input placeholder="输入设备名称" v-model="obj.deviceSn" name="input" @input="findDeviceName" :disabled="obj.deviceId"></input>
			<image @click="toScanCode" class="code-img" src="../../static/imgs/qr-code.png" mode="" ></image>
		</view>
		<view v-if="!obj.deviceId" class="cu-form-group">
			<view class="title">设备名称</view>
			<input placeholder="设备名称将自动填入" v-model="obj.deviceName" name="input" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关联地块</view>
			<picker @change="pickerChange($event)" :value="optionValue" :range="massifsList" range-key="massifName">
				<view class="uni-input">{{massifsList[optionValue].massifName}}</view>
			</picker>
		</view>
		<view class="bottom-lg-btn" @click="toAdd">{{btnTxt}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				optionValue: 0,
				obj: {
					deviceName: '',
					massifId: '',
					deviceSn: '',
					deviceId: ''
				},
				massifsList: [],
				btnTxt: '新建设备'
			}
		},
		onLoad(option) {
			if (option.deviceId) {
				this.obj.deviceId = option.deviceId
				this.selectDevice()
				uni.setNavigationBarTitle({
					title: "编辑设备"
				})
				this.btnTxt = '保存';
			} else {
				this.selectMassif();
			}

		},
		methods: {
			toScanCode() { //扫码
				let _this = this
				uni.scanCode({
					success: function(res) {
						_this.obj.deviceSn = res.result
					}
				});
			},
			selectDevice() {
				this.$api.selectDevice({
					deviceId: this.obj.deviceId
				}).then(res => {
					this.obj = res.data.data.device;
					this.selectMassif()
				})
			},
			selectMassif() { //获取地块列表
				this.$api.selectMassif().then(res => {
					this.massifsList = res.data.data
					this.massifsList.unshift({
						massifId: "",
						massifName: "请选择"
					})
					if (this.obj.deviceId) { //如果有设备id,回填地块
						if (this.obj.massifId == undefined) { //如果没有关联地块
							this.optionValue = 0
						} else {
							this.optionValue = this.massifsList.findIndex((item, i) => {
								return item.massifId == this.obj.massifId
							})
						}
					}
				})
			},
			pickerChange(e) {
				this.optionValue = e.target.value
				let arr = this.massifsList.filter((item, i) => {
					return i == e.target.value
				})
				this.obj.massifId = arr[0].massifId
			},
			toAdd() { //添加设备
				if (!this.obj.deviceName) {
					uni.showToast({
						title: '请输入设备名称',
						icon: 'none'
					})
					return
				}
				if (!this.obj.deviceId) {
					if (!this.obj.deviceSn && !this.obj.deviceId) {
						uni.showToast({
							title: '请输入设备序列号',
							icon: 'none'
						})
						return
					}
				}
				let postData;
				postData = { ...this.obj}
				if (!this.obj.massifId) {
					delete postData.massifId
				}
				console.info('postData',postData)
				if (!this.obj.deviceId) {
					this.$api.insertDevice(postData).then(res => {
						this.toastFunc('添加成功')
					})
				} else {
					this.$api.updateDevice(postData).then(res => {
						this.toastFunc('编辑成功')
					})
				}
			},
			toastFunc(title) {
				let _this = this
				uni.showToast({
					title: title,
					duration: 2000,
					success() {
						setTimeout(function() {
							let pages = getCurrentPages(); // 当前页面
							let beforePage = pages[pages.length - 2]; // 前一个页面
							uni.navigateBack({
								success: function() {
									beforePage.onLoad({
										deviceId: _this.obj.deviceId
									}); // 执行前一个页面的onLoad方法
								}
							});
						}, 2000)
					}
				});
			},
			findDeviceName(){// 通过SN带出设备名称
				if (this.obj.deviceSn.length >= 12) {
					this.$api.findDeviceName({
						deviceSn:this.obj.deviceSn
					}).then(res => {
						if (res) {
							this.obj.deviceName = res.data.data.deviceName;
						} else {
							uni.showToast({
								title:res.message,
								icon:none,
							})
						}
					})
				} else {
					this.obj.deviceName = '';
				}
				
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
		margin: 40rpx auto;
		text-align: center;
		color: #fff;
	}
</style>
