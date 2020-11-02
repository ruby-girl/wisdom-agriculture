<template>
	<page-meta><navigation-bar :title="Title" front-color="#000000" background-color="#FFFFFF" :color-animation-duration="1000" color-animation-timing-func="linear" /></page-meta>
	<view>
		<!-- 添加 -->
		<scroll-view scroll-y="true">
			
			<view class="container-input " >
				<view>
					<textarea v-model="postData.introduce" placeholder="这一刻想法......" maxlength="100" style="width: 100%;padding: 10px;"></textarea>
				</view>
				<view>
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList2" :key="index" :data-url="imgList2[index]">
							<image :src="imgList2[index]" mode="aspectFill"></image>
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
				Title:'',
				btnTxt: '发表',
				type:'',
				index: '',
				disabled: false,
				postData: {
					farmId: ''
				},
				imgList: [],
				imgList2:[],
			}
		},
		onLoad(option) {
			if (option.type == 'video') {
				this.Title = '上传视频'
				this.type = true;
			}
			if (option.type == 'image') {
				this.Title = '发圈'
				this.type = false;
			}

		},
		methods: {
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
				let type = [];
				if (this.type) {
					type = ['video'];
				} else {
					type = ['image'];
				}
				uni.chooseImage({
					count: num, //默认9
					mediaType:type,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						let that = this
						console.log(res)
						res.tempFilePaths.forEach(item => {
							that.uploadImg(item,n)
						});
					}
				});
			},
			uploadImg(url,n) {
				let that = this
				let URLPath = getApp().globalData.baseUrl + 'api/farm/uploadHead';
				wx.uploadFile({
					url: URLPath,
					filePath: url,
					name: 'file',
					header: {
						'token': uni.getStorageSync('XYZNUserInfo').token
					},
					success: function(resData) {
						let data = JSON.parse(resData.data).data
						if(n==1){
							that.imgList = that.imgList.concat(that.imgUrl + data)
							that.imgArr.push(data)
						}else{
							that.imgList2 = that.imgList2.concat(that.imgUrl + data)
							that.imgArr2.push(data)
						}
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
			
			addFunc() {
				if (!this.test()) return
				this.getSelectValue()
				// let masterPicture=this.imgArr2.join()
				// let picture=this.imgArr.join()
				this.postData.picture = this.imgArr2.join()
				this.postData.masterPicture = this.imgArr.join()
				let api;
				if (!this.postData.farmId) {
					api = 'insertFarm'
				} else api = 'updateFarm';
				this.$api[api](this.postData).then(res => {
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
