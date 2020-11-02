<template>
	<view class="timeline">
		<view class="container">		
			<view v-for="(item,i) in imgsArr" :key="i">
				<view class="timeline-item" v-if="i%2==0">
					<view class="timeline-img-left flex">
						<view class="border-box"></view>
						<view class="time-txt">{{item.date}}</view>
					</view>	
					<view class="timeline-content js--fadeInLeft">
						<image :src="item.resArr[0]" mode="widthFix" @tap="toPhoto(item)"></image>
					</view>
				</view>
						
				<view class="timeline-item" v-else>	
					<view class="timeline-img-left flex">	
						<view class="border-box"></view>
						<view class="time-txt">{{item.date}}</view>
					</view>	
					<view class="timeline-content js--fadeInRight">							
						<image :src="item.resArr[0]" mode="widthFix" @tap="toPhoto(item)"></image>
					</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import http from '@/utils/request.js'
	export default {
		name: 'auxograph',
		props: {
			imgsArr: {}
		},
		data() {
			return {
				pathUrl:http.config.imgUrl
			}
		},
		
		methods: {
			toPhoto(arr){	
				var time = arr.date.split(' ');
				var str = time[0].split('-');
				var date = str[0] + str[1] + str[2];
				this.$api.deviceGetImage({ 
					device: {
					            deviceId: arr.deviceId
					        },
					        time:date
				}).then(res => {
					var Arrimgs = new Array();
					res.data.data.forEach(item => {
						Arrimgs.push(item.url);
					});
					getApp().globalData.photoImgs=Arrimgs;
					uni.navigateTo({
						url: '/pageA/photoAlbum'
					});
				});
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	$primary: #4ABA8A;
	$dark-primary: #4ABA8A;
	$light-primary: #4ABA8A;
	$text: #FFFFFF;
	$primary-text: #212121;
	$secondary-text: #757575;
	$accent: #FF4081;

	section {
		padding: 100px 0;
	}

	html,
	body {
		overflow-x: hidden;
	}

	body {
		font-family: 'Roboto';
		font-size: 17px;
		font-weight: 400;
		background-color: #eee;
	}

	h1 {
		font-size: 200%;
		text-transform: uppercase;
		letter-spacing: 3px;
		font-weight: 400;
	}

	header {
		background: $primary;
		color: $text;
		padding: 150px 0;

		p {
			font-family: 'Allura';
			color: rgba(255, 255, 255, .2);
			margin-bottom: 0;
			font-size: 60px;
			margin-top: -30px;

		}
	}

	.timeline {
		position: relative;

		&::before {
			content: '';
			background: $light-primary;
			width: 2px;
			height: 95%;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.timeline-item {
		width: 100%;
		margin: 70rpx 0;

		&:nth-child(even) {

			.timeline-content {
				float: right;
			

				.date {
					right: auto;
					left: 0;
				}			
			}
		}

		&::after {
			content: '';
			display: block;
			clear: both;
		}
	}
	.timeline-content {
		position: relative;
		width: 45%;
		border-radius: 4px;
	}

	.timeline-img-left{
		position: absolute;
		left: 50%;
		margin-top: 25px;
		margin-left: -15px;
	}
	.timeline-img-right{
		position: absolute;
		right: 46%;
		margin-top: 25px;
		margin-left: -15px;
	}
	.border-box{
		width:100rpx;
		border-top:1px solid #4ABA8A;
	}
	a {
		background: $primary;
		color: $text;
		padding: 8px 20px;
		text-transform: uppercase;
		font-size: 14px;
		margin-bottom: 20px;
		margin-top: 10px;
		display: inline-block;
		border-radius: 2px;
		box-shadow: 0 1px 3px -1px rgba(0, 0, 0, .6);

		&:hover,
		&:active,
		&:focus {
			background: darken($primary, 10%);
			color: $text;
			text-decoration: none;
		}

	}

	.timeline-card {
		padding: 0 !important;

		p {
			padding: 0 20px;
		}

		a {
			margin-left: 20px;
		}
	}

	.timeline-item {
		.timeline-img-header {
			background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .4)), url('https://picsum.photos/1000/800/?random') center center no-repeat;
			background-size: cover;
		}
	}

	.timeline-img-header {

		height: 200px;
		position: relative;
		margin-bottom: 20px;

		h2 {
			color: $text;
			position: absolute;
			bottom: 5px;
			left: 20px;
		}
	}

	blockquote {
		margin-top: 30px;
		color: $secondary-text;
		border-left-color: $primary;
		padding: 0 20px;
	}

	.date {
		background: $accent;
		display: inline-block;
		color: $text;
		padding: 10px;
		position: absolute;
		top: 0;
		right: 0;
	}
	.time-txt{
		position: relative;
		top:-10px;
		padding:0 30rpx
	}
</style>
