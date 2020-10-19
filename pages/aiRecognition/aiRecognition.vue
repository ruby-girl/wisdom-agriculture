<template>
	<view class="bodys" v-bind:style="{ height: windowHeight + 'px' }">
		<camera device-position="back"  binderror="error" style="width: 100%; height: 75%;"></camera>
		<view class="bg-black">
			<scroll-view scroll-x class=" nav" enhanced="true">
				<view class="flex text-center justify-center" style="padding-bottom: 8rpx;;width: 190%;">
					<view
						class="cu-item font-size-16"
						:class="item.id == TabCur ? 'text-green cur' : 'text-white'"
						v-for="(item, index) in tabs"
						:key="index"
						@tap="tabSelect"
						:data-id="item.id"
					>
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
			<view class="text-center relative" style="padding: 20px 0;">
				<image src="../../static/imgs/button.png" style="width: 120rpx;height: 120rpx;" @tap="takePhoto"></image>
				<image src="../../static/imgs/xiangce.png" style="width: 80rpx;height: 80rpx;position: absolute;left: 10%;top: 25%;" @tap="selectPhoto"></image>
			</view>
		</view>
	</view>
</template>

<script>
import http from '@/utils/request.js';
import consult from '@/components/consult.vue';
import tabBar from '@/components/tabbar.vue';
export default {
	data() {
		return {
			src:'',
			isLogin: false,
			windowHeight: 300,
			TabCur: 1,
			tabs: [
				{
					id: 1,
					name: '动物识别',
					type: 'animal'
				},
				{
					id: 2,
					name: '植物识别',
					type: 'plant'
				},
				{
					id: 3,
					name: 'logo识别',
					type: 'logo_search'
				},
				{
					id: 4,
					name: '果蔬识别',
					type: 'ingredient'
				},
				{
					id: 5,
					name: '菜品识别',
					type: 'dish_search'
				},
				{
					id: 6,
					name: '红酒识别',
					type: 'red_wine'
				},
				{
					id: 7,
					name: '货币识别',
					type: 'currency'
				},
				{
					id: 8,
					name: '地标识别',
					type: 'landmark'
				}
			]
		};
	},
	components: {
		consult,
		tabBar
	},
	onLoad() {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		let _this = this;
	},
	onShareAppMessage: function() {
		return {
			title: '科维特',
			desc: '',
			path: 'pages/aiRecognition/aiRecognition'
		};
	},
	onShow() {
		if (!this.isLogin) {
			//每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
			this.isLogin = getApp().globalData.isLogin;
			if (this.isLogin) {
				this.getCount();
			}
		} else {
			this.getCount();
		}
	},
	methods: {
		show(){
			uni.request({
			    url: 'http://vod.cn-shanghai.aliyuncs.com', //仅为示例，并非真实接口地址。
				method:'POST',
			    data: {
			        Action: 'GetPlayInfo',
					VideoId: '361a796be226402097f81c2258892668',
			    },
			    // header: {
			    //     // 'custom-header': 'hello' //自定义请求头信息
			    // },
			    success: (res) => {
			        console.log(res.data);
			        // this.text = 'request success';
			    }
			});
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
		},
		takePhoto() {// 拍照
			var that = this;
			const ctx = wx.createCameraContext();
			ctx.takePhoto({
				quality: 'high',
				success: res => {
					that.scan(res.tempImagePath);
					console.log(res)
				}
			});
		},
		selectPhoto(){ // 选择相册
			var that = this;
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					
					var tempFilePaths = res.tempFilePaths;
					console.log(res.tempFilePaths)
					that.scan(tempFilePaths[0]);
				},
				fail: function(res) {
					uni.showToast({
						title: '请求超时，请重试',
						icon: 'none'
					});
				}
			});
		},
		scan(path) { // 上传图片跳转识别结果
			uni.uploadFile({
				url: http.config.baseUrl + 'api/ai/pests',
				filePath: path,
				name: 'file',
				header: {
					token: uni.getStorageSync('XYZNUserInfo').token
				},
				success: uploadFileRes => {
					var list = JSON.parse(uploadFileRes.data);
					var array = list.data.result;
					if (list.data.result.length > 3) {
						array = array.slice(0, 3);
					}
					console.log(uploadFileRes);
					uni.navigateTo({
						url: './identifyResults?iamge=' + tempFilePaths + '&item=' + encodeURIComponent(JSON.stringify(array))
					});
				}
			});
		},
		
	}
};
</script>

<style lang="scss" scoped>
	.relative{
		position: relative;
	}
</style>
