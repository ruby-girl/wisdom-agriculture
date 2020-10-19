<template>
	<view class="flex justify-content-flex-justify flex-wrap img-container">
		<view v-for="(item,i) in imgArr" :key="i" class="img-box" :style="{background: 'url('+item+')',backgroundSize:'100% 100%'}" @tap="showImg(i)">
		</view>
	</view>
</template>

<script>
	import http from '@/utils/request.js'
	export default {
		data() {
			return {
				pathUrl:http.config.imgUrl,
				imgArr:[]
			}
		},
		onLoad(option){	
			this.imgArr=getApp().globalData.photoImgs
		},
		
		methods: {
			showImg(index){
				let list = new Array()
				this.imgArr.forEach(item => {
					list.push(item)
				})
				uni.previewImage({
					urls:list,
					current:index,
				})
			}
		}}
</script>

<style scoped>
	.img-container{
		padding: 30rpx;
	}
	.img-box{
		width: 100%;
		height:350rpx; 
		/* background: #fff !important; */
		margin-bottom: 30rpx;
		border-radius: 6px;
	}
</style>
