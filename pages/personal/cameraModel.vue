<template>
	<view class="cameraModel">
		<view class="camera-img" v-if="urlImg">
			<view class="camera-flag">
				<view class="display-flex justify-content-flex-justify ">

					<text class="iconfont" @click="cancelFun">&#xe62a;</text>
					<text class="iconfont" @click="sureFun">&#xe605;</text>
				</view>
			</view>

			<view class="image-center">
				<cover-image mode="widthFix" :src="urlImg"></cover-image>
			</view>
		</view>
		<view v-else>
			<!-- 	<view class="image-center"> -->
			<camera device-position="back" flash="off" @error="error" class="image-center"></camera>
			<!-- 	</view> -->
			<image src="@/static/imgs/photo.png" @click="takePhoto" class="img-start"></image>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				urlImg: '',
				person: false,
				photoType: ''
			};
		},
		onShow() {
			console.log(11)
		},
		onLoad(option) {
			this.person = option.person
			this.photoType = option.photoType
		},
		methods: {
			takePhoto() {

				const ctx = wx.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.urlImg = res.tempImagePath
					}
				})
			},

			cancelFun() {
				this.urlImg = '';
				this.takePhoto();

			},
			sureFun() {
				let _this = this
				let pages = getCurrentPages(); //获取所有页面栈实例列
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				uni.navigateBack({
					delta: 1,
					success: function() {
						prevPage.onLoad({
							img: _this.urlImg,
							photoType: _this.photoType
						}); // 执行前一个页面的onLoad方法
					}
				});
			},

		}
	}
</script>

<style lang="scss">
	.cameraModel {

		background-color: #000;

		height: 100%;
		width: 100%;

		.image-center {

			width: 100vh;
			height: 50vh;
			position: relative;
			top: 22vh;

		}

		.camera-flag {

			width: 80%;
			left: 0;
			right: 0;
			top: 10px;
			margin: 0 auto;
			position: absolute;

			.iconfont {
				color: #fff;
				font-size: 40rpx;
			}
		}

		.img-start {
			width: 120rpx;
			height: 120rpx;
			position: absolute;
			bottom: 60rpx;
			left: 0;
			right: 0;
			margin: 0 auto;
		}
	}
</style>
