<template>
	<!-- 添加地址 -->
	<view>
		<view class="container-input">
			<view class="cu-form-group">
				<view class="title">名字</view>
				<input placeholder="收货人" v-model="formData.recipientName" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="+86手机号码" type="number" v-model="formData.recipientPhone" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">所在区域</view>
				<picker mode="multiSelector" @change="MultiChange" :range-key="'name'" @columnchange="MultiColumnChange" :value="multiIndex"
				 :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]].name}}，{{multiArray[1][multiIndex[1]].name}}，{{multiArray[2][multiIndex[2]].name}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" style="position: relative;">
				<view class="title">详细地址</view>
				<textarea auto-height v-model="formData.address" placeholder="详细的地址:如道路、门牌号、小区、楼栋号、单元室等"></textarea>
			</view>
			<view style="border-bottom: 20rpx solid #F5F5F5;"></view>
			<view class="uni-list">
				<view class="uni-list-cell uni-list-cell-pd">
					<view class="uni-list-cell-db">设为默认地址</view>
					<switch @change="changeSW" :checked="formData.preferred" />
				</view>
			</view>
		</view>
		<view v-if="id" class="bottom-lg-btn-red" @click="inDelete">删除</view>
		<view class="bottom-lg-btn" @click="insert">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				formData: {
					userId:uni.getStorageSync('XYZNUserInfo').userId,
				},
				multiIndex: [0, 0, 0],
				multiArray: [],
				provinceCode: '',
				cityCode: '',
				countyCode: '', 
				init: true,
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id;
				this.shoppingAddressFindById();
				
			} else {
				this.getProvinceCode();
			}
		},
		methods: {
			shoppingAddressFindById(){
				this.$api.shoppingAddressFindById({
						id:this.id,
						userId:this.formData.userId,
				}).then(res =>{
					this.formData = res.data.data;
					// 根据code设置省市县默认值 
					this.provinceCode = this.formData.provinceCode;
					this.cityCode = this.formData.cityCode;
					this.countyCode = this.formData.countyCode;
					this.$api.getProvince().then(res => {
						let arr = []
						res.data.data.forEach(item => {
							let obj = {
								name: item.name,
								id: item.code
							}
							arr.push(obj)
						})
						this.multiArray[0] = arr;
						if (this.provinceCode) {
							this.getByProvinceCode(this.provinceCode, this.cityCode)
						} else {
							this.getByProvinceCode(res.data.data[0].code)
						}
					})
				})
			},
			getProvinceCode() { //获取省
				this.$api.getProvince().then(res => {
					let arr = []
					res.data.data.forEach(item => {
						let obj = {
							name: item.name,
							id: item.code
						}
						arr.push(obj)
					})
					this.multiArray[0] = arr;
					this.getByProvinceCode(res.data.data[0].code)
				})
			},
			getByProvinceCode(code, n) { //获取市、、n：有市的默认值
				this.$api.getCity({
					code: code
				}).then(res => {
					let arr = []
					res.data.data.forEach(item => {
						let obj = {
							name: item.name,
							id: item.code
						}
						arr.push(obj)
					})
					this.multiArray[1] = arr;
					if (n) {
						this.getByCityCode(n)
					} else {
						this.getByCityCode(res.data.data[0].code)
					}
			
				})
			},
			getByCityCode(code) { //获取区
				this.$api.getCounty({
					code: code
				}).then(res => {
					let arr = []
					res.data.data.forEach(item => {
						let obj = {
							name: item.name,
							id: item.code
						}
						arr.push(obj)
					})
					this.multiArray[2] = arr;
					if (this.init && this.provinceCode) { //如果有默认值
						let code1 = this.multiArray[0].findIndex((item, i) => {
							return item.id == this.provinceCode
						})
						let code2 = this.multiArray[1].findIndex((item, i) => {
							return item.id == this.cityCode
						})
						let code3 = this.multiArray[2].findIndex((item, i) => {
							return item.id == this.countyCode
						})
						this.multiIndex = [code1, code2, code3]
						this.init = false
					} else if (this.init && !this.provinceCode) {
						this.multiIndex = [0, 0, 0]
						this.init = false
					} else {
						this.multiIndex = [...this.multiIndexsave]
					}
				})
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				this.multiIndex[e.detail.column] = e.detail.value;
				this.multiIndexsave = [...this.multiIndex]
				switch (e.detail.column) {
					case 0:
						this.getByProvinceCode(data.multiArray[0][data.multiIndex[0]].id)
						break;
					case 1:
						this.multiIndex[2] = 0
						this.multiIndexsave = [...this.multiIndex]
						this.getByCityCode(data.multiArray[1][data.multiIndex[1]].id)
						break;
				}
			},
			changeSW(e){
				console.log(e.detail)
				this.formData.preferred = e.detail.value;
			},
			getSelectValue() { //获取所在区域的值
				let code1 = this.multiArray[0].filter((item, i) => {
					return i == this.multiIndex[0]
				})
				let code2 = this.multiArray[1].filter((item, i) => {
					return i == this.multiIndex[1]
				})
				let code3 = this.multiArray[2].filter((item, i) => {
					return i == this.multiIndex[2]
				})
				this.formData.provinceCode = code1[0].id
				this.formData.provinceName = code1[0].name
				this.formData.cityCode = code2[0].id
				this.formData.cityName = code2[0].name
				this.formData.countyCode = code3[0].id
				this.formData.countyName = code3[0].name
			},
			insert(){
				this.getSelectValue();
				var api = '';
				if (this.id) {
					api = 'shoppingAddressUpdate';
				} else {
					api = 'shoppingAddressInsert';
				}
				this.$api[api](this.formData).then(res =>{
					uni.showToast({
						title: '操作成功',
						duration: 2000,
						success() {
							let pages = getCurrentPages(); // 当前页面
							let beforePage = pages[pages.length - 2]; // 前一个页面
							setTimeout(function(){
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
			inDelete(){
				this.$api.shoppingAddressDelete({id:this.id,userId:this.formData.userId}).then(res =>{
					uni.showToast({
						title: '删除成功',
						duration: 2000,
						success() {
							let pages = getCurrentPages(); // 当前页面
							let beforePage = pages[pages.length - 2]; // 前一个页面
							setTimeout(function(){
								uni.navigateBack({
									success: function() {
										beforePage.onLoad(); // 执行前一个页面的onLoad方法
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

<style lang="scss" scoped>
	
	.code-img {
		position: absolute;
		right: 20px;
		bottom: rpx;
		width: 35rpx;
		height: 35rpx;
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
		width: 90%;
		margin: 40rpx auto;
		text-align: center;
		color: #fff;
	}
	.bottom-lg-btn-red {
		background: #FF3855;
		border-radius: 20px;
		padding: 5px 0;
		width: 90%;
		margin: 40rpx auto;
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

	.btn-disabled {
		background: #aaa;
	}

	.unit {
		position: absolute;
		right: 20px;
	}
	
	.cu-form-group picker .picker{
		text-align: left;
	}
</style>
