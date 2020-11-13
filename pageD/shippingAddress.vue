<template>
	<view class="bodys"  style="margin-bottom: 120rpx;">
		<view v-for="(item, index) in dataList"  style="margin: 20rpx;background-color: #FFFFFF;border-radius: 10rpx;" @tap="getSite">
			<view class="flex" style="padding: 24rpx 14rpx;align-items: center;">
				<image src="../static/imgs/location.png" style="width: 90rpx;height: 90rpx;border-radius: 10rpx;" mode="aspectFill"></image>
				<view class="flex bg-personal" style="flex: 1;padding: 10rpx 20rpx;flex-direction: column;overflow: hidden;border-right: 1px solid #DCDCDC;">
					<view >
						<text class="font-size-14" style="font-weight: 600;margin-right: 20rpx;">{{item.recipientName}}</text><text>{{item.recipientPhone}}</text>
					</view>
					<view class="font-size-12 color-grey" >{{item.provinceName}}{{item.cityName}}{{item.countyName}} {{item.address}}</view>
				</view>
				<view style="padding: 20rpx;color: #00AE66;" @tap="edit(item.id)">
					编辑
				</view>
			</view>
		</view>
		<view @tap="ToAdd" class="bottom-lg-btn">新增收货地址</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			windowHeight:'',
			dataList:[],
			data:{
				userId:uni.getStorageSync('XYZNUserInfo').userId,
				pageNum:1,
				pageSize:100,
			}
			
		};
	},

	onLoad() {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
		this.shoppingAddressFindAll();
	},
	// onShareAppMessage: function() {
	// 	return {
	// 		title: '科维特',
	// 		desc: '',
	// 		path: 'pages/aiRecognition/aiRecognition'
	// 	};
	// },
	onShow() {
		// if (!this.isLogin) {
		// 	//每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
		// 	this.isLogin = getApp().globalData.isLogin;
		// 	if (this.isLogin) {
		// 		this.getCount();
		// 	}
		// } else {
		// 	this.getCount();
		// }
	},
	methods: {
		shoppingAddressFindAll(){
			this.$api.shoppingAddressFindAll(this.data).then(res =>{
				this.dataList = res.data.data.records;
			})
		},
		ToAdd(){
			uni.navigateTo({
				url:'./addshippingAddress'
			})
		},
		edit(id){
			uni.navigateTo({
				url:'./addshippingAddress?id=' + id,
			})
		}
		
	}
};
</script>

<style lang="scss" scoped>
	view{
		font-size: 24rpx;
	}
	.bg-personal {
		position: relative;
	}

	.bottom-lg-btn {
		position: fixed;
		bottom: 2%;
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width: 90%;
		margin-left: 5%;
		text-align: center;
		color: #fff;
	}
</style>
