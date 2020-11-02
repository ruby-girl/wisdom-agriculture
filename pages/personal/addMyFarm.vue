<template>
	<view>
		<!-- 添加农场 -->
		<scroll-view scroll-y="true">
			<view class="container-input">
				<form>
					<view class="cu-form-group">
						<view class="title">农场名称</view>
						<input class="form-input-left" v-model="postData.farmName" placeholder="请输入农场名称" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">农场区域</view>
						<picker mode="multiSelector" @change="MultiChange" :range-key="'name'" @columnchange="MultiColumnChange" :value="multiIndex"
						 :range="multiArray">
							<view class="picker">
								{{multiArray[0][multiIndex[0]].name}}，{{multiArray[1][multiIndex[1]].name}}，{{multiArray[2][multiIndex[2]].name}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">农场地址</view>
						<input v-model="postData.address" class="form-input-left" placeholder="请输入农场详细地址" name="input"></input>
					</view>
				</form>
			</view>
			<view class="people-box container-input">
				<view class="cu-form-group">
					<view class="title">农场负责人</view>
					<input v-model="postData.master" class="form-input-left" placeholder="请输入农场负责人" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系电话</view>
					<input v-model="postData.masterPhone" class="form-input-left" placeholder="请输入联系电话" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">负责人照片</view>
				</view>
				<view>
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
							<image :src="item" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg($event,1)" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="chooseType(1)" v-if="imgList.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-form-group" style="border-top:1px solid #eee;">
					<view class="title">农场介绍</view>
				</view>
				<view>
					<textarea v-model="postData.introduce" placeholder="请输入农场介绍" maxlength="100"></textarea>
				</view>
				<view class="cu-form-group">
					<view class="title">农场照片</view>
				</view>
				<view>
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList2" :key="index" :data-url="imgList2[index]">
							<image :src="item" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg($event,2)" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="chooseType(2)" v-if="imgList2.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			<button :disabled="disabled" @click="addFunc" class="cu-btn block bg-green margin-tb-sm lg" style="margin:40px 20px 20px 20px">
				{{btnTxt}}</button>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnTxt: '添加农场',
				index: '',
				
				landList: [],
				disabled: false,
				landId: '', //选择的地块ID
				landIdArr: [],
				breedList: [], //作物列表
				breed: '0', //作物值
				planName: '',
				multiIndex: [0, 0, 0],
				multiArray: [],
				location: {},
				postData: {
					farmId: ''
				},
				provinceCode: '',
				cityCode: '',
				countyCode: '', 
				
				init: true,
				multiIndexsave: [],
				imgUrl: getApp().globalData.imgUrl,
				imgList: [],
				imgList2:[],
				imgArr: [] ,//农场主照片集合
				imgArr2: [] //农场照片集合
			}
		},
		onLoad(option) {
			if (option.img) {
				this.uploadImg(option.img, option.photoType)
			} else {
				if (option.id) {
					this.postData.farmId = option.id
					uni.setNavigationBarTitle({
						title: "编辑农场"
					})
					this.btnTxt = '保存';
					this.getFarm();
				} else {
					this.getProvinceCode()
				}
			}

		},
		methods: {
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
			getFarm() { //如果为编辑，获取农场详情
				this.$api.farmGetOne({
					farmId: this.postData.farmId
				}).then(res => {
					this.postData = res.data.data[0].farm;
					// 根据code设置省市县默认值 
					this.provinceCode = this.postData.provinceCode;
					this.cityCode = this.postData.cityCode;
					this.countyCode = this.postData.countyCode;
					if(res.data.data[0].masterPhotos[0].path){
						this.imgArr.push(res.data.data[0].masterPhotos[0].path);
						this.imgList.push(res.data.data[0].masterPhotos[0].path); 
					}
					if(res.data.data[0].farmPhotos[0].path){
						this.imgArr2.push(res.data.data[0].farmPhotos[0].path);
						this.imgList2.push(res.data.data[0].farmPhotos[0].path);
					}
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
					// this.$api.districts({
					// 	parent: 86
					// }).then(res => {
					// 	let arr = []
					// 	res.data.data.forEach(item => {
					// 		let obj = {
					// 			name: item.name,
					// 			id: item.code
					// 		}
					// 		arr.push(obj)
					// 	})
					// 	this.multiArray[0] = arr;
					// 	let code;
					// 	if (this.provinceCode) {
					// 		this.getByProvinceCode(this.provinceCode, this.cityCode)
					// 	} else {
					// 		this.getByProvinceCode(res.data.data[0].code)
					// 	}

					// })
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
			chooseType(n){
				// let _this =this;			
				// wx.showActionSheet({
				//   itemList: ['拍照','从手机相册选择'],
				//   success (res) {
				// 	  if(res.tapIndex  == 0){
				// 		  uni.navigateTo({
				// 		  	url:'cameraModel?person=true&photoType='+n
				// 		  })
				// 	  }else{
						  this.chooseImage(n);
				// 	  }
				//   },
				//   fail (res) {
				//     console.log(res.errMsg)
				//   }
				// })
			},
			chooseImage(n) {
				let num;
				if(n==1){
					num=1
				}else{
					num=4
				}
				uni.chooseImage({
					count: num, //默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						let that = this
						res.tempFilePaths.forEach(item => {
							// that.uploadImg(item,n)
							uni.saveFile({
							      tempFilePath: item,
							      success: function (res) {
							        // var savedFilePath = res.savedFilePath;
									that.uploadImg(res.savedFilePath,n)
							      }
							});
						});
					}
				});
			},
			uploadImg(url,n) {
				let that = this
				let URLPath = getApp().globalData.baseUrl + 'api/farm/masterPhotoUpload';
				
				wx.uploadFile({
					url: URLPath,
					filePath: url,
					name: 'file',
					header: {
						'token': uni.getStorageSync('XYZNUserInfo').token,
					},
					success: function(resData) {
						let data = JSON.parse(resData.data).data
						if(n==1){
							that.imgList = that.imgList.concat( data)
							that.imgArr.push(data)
						}else{
							that.imgList2 = that.imgList2.concat( data)
							that.imgArr2.push(data)
						}
					},
					fail:function(res) {
						console.log(res);
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e,n) {
				uni.showModal({
					title: '删除',
					content: '确定要删除此图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							if(n==1){
								this.imgArr.splice(e.currentTarget.dataset.index, 1)
								this.imgList.splice(e.currentTarget.dataset.index, 1)
							}else{
								this.imgArr2.splice(e.currentTarget.dataset.index, 1)
								this.imgList2.splice(e.currentTarget.dataset.index, 1)
							}
						}
					}
				})
			},
			test() {
				if (!this.postData.farmName) {
					uni.showToast({
						title: '请输入农场名称',
						icon: 'none'
					})
					return false
				}
				return true
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
				this.postData.provinceCode = code1[0].id
				this.postData.provinceName = code1[0].name
				this.postData.cityCode = code2[0].id
				this.postData.cityName = code2[0].name
				this.postData.countyCode = code3[0].id
				this.postData.countyName = code3[0].name
			},
			addFunc() {
				if (!this.test()) return
				this.getSelectValue()
				// let masterPicture=this.imgArr2.join()
				// let picture=this.imgArr.join()
				// this.postData.farmPhoto = this.imgArr2;
				// this.postData.masterPhoto = this.imgArr;
				let api;
				if (!this.postData.farmId) {
					api = 'insertFarm'
				} else api = 'updateFarm';
				console.log(this.postData);
				this.$api[api]({farm:this.postData,farmPhoto:this.imgArr2,masterPhoto:this.imgArr}).then(res => {
					if (this.postData.farmId) {
						uni.showToast({
							title: '编辑成功',
							duration: 2000,
							success() {
								setTimeout(function() {
									let pages = getCurrentPages(); // 当前页面
									let beforePage = pages[pages.length - 2]; // 前一个页面
									uni.navigateBack({
										success: function() {
											beforePage.onLoad(); // 执行前一个页面的onLoad方法
										}
									});
								}, 2000)
							}
						});
					} else {
						setTimeout(function() {
							let pages = getCurrentPages(); // 当前页面
							let beforePage = pages[pages.length - 2]; // 前一个页面
							uni.navigateBack({
								success: function() {
									beforePage.onLoad(); // 执行前一个页面的onLoad方法
								}
							});
						}, 2000)
					}

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	background-color:#fff;
	// }
	.form-input-left {
		text-align: left;
	}

	.container-input {
		padding: 0 25rpx !important;
		background: #fff;
	}

	.cu-form-group {
		padding: 1px 0;
	}

	.disabled-txt {
		padding-right: 20rpx;
	}

	.right-jt {
		font-size: 23px;
		color: #828282;

	}

	.people-box {
		margin: 30rpx 0;
	}

	.item-border {
		border-top: 16rpx solid #eee;
		background: #fff;
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

	.picker {
		text-align: left !important
	}

	.title-txt {
		font-size: 17px;
		font-weight: bold;

	}

	.shu-box {
		height: 20px;
		width: 4px;
		background: #00AE66;
		margin-right: 20rpx;
	}

	.title-height {
		height: 90rpx;
		padding: 30rpx;
		border-bottom: 1px solid #eee;
		background: #fff;
	}

	.cu-form-group .title {
		width: 180rpx;
	}
</style>
