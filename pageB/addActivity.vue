<template>
	<view>
		<!-- 添加农场 -->
		<scroll-view scroll-y="true">
			<view class="container-input">
				<form>
					<view class="cu-form-group">
						<view class="title">商品名称</view>
						<input class="form-input-left" v-model="postData.farmName" placeholder="请输入商品名称" name="input"></input>
					</view>
					
					<view class="cu-form-group">
						<view class="title">领地数量</view>
						<input v-model="postData.address" class="form-input-left" placeholder="请输入领地数量" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">活动时间</view>
						<!-- <input v-model="postData.master" class="form-input-left" placeholder="请输入农场负责人" name="input"></input> -->
						<picker  class="form-input-left" mode="date" :value="startTime" :start="currentDate" :end="endDate" @change="bindDateChange">
							<view class="">{{startTime}}</view>
						</picker>
						<picker  class="form-input-left" mode="date" :value="endTime" :start="startTime" :end="endDate" @change="bindDateChanges">
							<view class="">{{endTime}}</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">项目价格</view>
						<input v-model="postData.masterPhone"  type="number" class="form-input-left" placeholder="请输入项目价格" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">项目类型</view>
						<input v-model="postData.masterPhone"  type="number" class="form-input-left" placeholder="请输入项目价格" name="input"></input>
					</view>
				</form>
			</view>
			<view class="people-box container-input">
				<view class="cu-form-group">
					<view class="title">填写表格</view>
					<input v-model="postData.masterPhone"  type="number" class="form-input-left" placeholder="请输入项目价格" name="input"></input>
				</view>
			</view>
			<view class="people-box container-input">
				<view class="cu-form-group" >
					<view class="">活动封面</view>
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
			</view>
			<view class="people-box container-input">
				<view class="cu-form-group" >
					<view class="">上传商品详情图片</view>
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
			<button @click="addFunc" class="cu-btn block bg-green margin-tb-sm lg" style="margin:40px 20px 20px 20px">
				预览</button>
			<button  @click="addFunc" class="cu-btn block bg-green margin-tb-sm lg" style="margin:40px 20px 20px 20px">
				确认发布</button>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				index: '',
				startTime: currentDate,
				endTime:'结束时间',
				postData: {
				},
				imgList: [],
				imgList2:[],
				imgArr: [] ,//农场主照片集合
				imgArr2: [] //农场照片集合
			}
		},
		onLoad(option) {
			

		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
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
			bindDateChange: function(e) {
				this.startTime = e.target.value;
			},
			bindDateChanges: function(e) {
				this.endTime = e.target.value;
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			addFunc() {
				// this.$api[api]({farm:this.postData,farmPhoto:this.imgArr2,masterPhoto:this.imgArr}).then(res => {
				// 	uni.showToast({
				// 		title: '发布成功',
				// 		duration: 2000,
				// 		success() {
				// 			setTimeout(function() {
				// 				let pages = getCurrentPages(); // 当前页面
				// 				let beforePage = pages[pages.length - 2]; // 前一个页面
				// 				uni.navigateBack({
				// 					success: function() {
				// 						beforePage.onLoad(); // 执行前一个页面的onLoad方法
				// 					}
				// 				});
				// 			}, 2000)
				// 		}
				// 	});
				// })
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
	.cu-form-group picker::after {
		width: 0;
	}
</style>
