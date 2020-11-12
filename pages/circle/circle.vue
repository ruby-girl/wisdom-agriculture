<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true">
			<view v-for="(item, index) in newsList" class="flex" style="position: relative;padding: 16rpx 30rpx;flex-direction: column;background-color: #FFFFFF;border-bottom: 1px solid #BFBFBF;">
				<view class="flex" style="align-items:center;margin: 10rpx 0;justify-content: end;">
					<image :src="item.avatar" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;"></image>
					<view class="font-size-12" style="margin-left: 28rpx;">{{item.nickName}}</view>
				</view>
				<text class="text-gray font-size-12" >
					{{item.creationTime}}
				</text>
				<view class="font-size-12 color-grey">{{item.content}}</view>
				<view class="flex" style="flex-wrap: wrap;margin-top: 20rpx;">
					<image @tap="showImg(item.path)" v-for="(li,i) in item.path" :src="li" mode="aspectFill" v-bind:style="{width:100/item.path.length - 4 + '%', height:210/(item.path.length > 3? 3:item.path.length) + 'px'}" style="height: 140rpx;margin-right: 22rpx;"></image>
				</view>
				<view class="flex align-center" style="margin-top: 30rpx;margin-bottom: 20rpx;">
					<view class="flex-1 text-gray font-size-12">{{item.time}}</view>
					<view class="text-gray font-size-12">
						<uni-icons type="heart" size="22" color="gary" style="margin-right: 20rpx;"></uni-icons>
						<!-- <uni-icons type="heart-filled" size="22" color="gary" style="margin-right: 20rpx;"></uni-icons> -->
						<uni-icons type="chat" size="20" color="gary" style="margin-right: 20rpx;"></uni-icons>
					</view>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			windowHeight: 300,
			isLogin: false,
			pageNum:1,
			pageSize:100,
			newsList:[],
		
		};
	},
	components: {},
	onLoad() {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
		this.circleOrderTime();
	},
	// onShareAppMessage: function() {
	// 	return {
	// 		title: '科维特',
	// 		desc: '',
	// 		path: 'pages/personal/personal'
	// 	}
	// },
	onShow() {
		// if (!this.isLogin) { //每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
		// 	this.isLogin = getApp().globalData.isLogin
		// 	if (this.isLogin) {
		// 		this.getCount()
		// 	}
		// }else{
		// 	this.getCount()
		// }
	},
	methods: {
		circleOrderTime(){
			this.$api.circleOrderTime({
				pageNum:this.pageNum,
				pageSize:this.pageSize,
			}).then(res =>{
				res.data.data.circleDtos.forEach(item => {
					item.time = this.getTimes(item.creationTime);
				})
				this.userFindId(0,res.data.data.circleDtos);
			})
		},
		
		userFindId(index,array){
			this.$api.userFindId({userId:array[index].uid}).then(res =>{
				array[index].nickName = res.data.data.nickName;
				array[index].avatar = res.data.data.avatar;
				if (++index < array.length) {
					this.userFindId(index,array);
				} else {
					this.newsList = array;
				}
			})
		},
		showImg(array){
			uni.previewImage({
				urls: array,
				longPressActions: {
					// itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function(data) {
						// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
		},
		getTimes(date){ // 时间前
			var date1= date.replace(/-/g,'/');  //开始时间
			var date2 = new Date();    //结束时间
			var date3 = date2.getTime() - new Date(date1.replace(/-/g,'/')).getTime();   //时间差的毫秒数 
			
			//计算出相差天数
			var days=Math.floor(date3/(24*3600*1000))
			 
			//计算出小时数
			var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
			var hours=Math.floor(leave1/(3600*1000))
			//计算相差分钟数
			var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
			var minutes=Math.floor(leave2/(60*1000))
			//计算相差秒数
			var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
			var seconds=Math.round(leave3/1000)
			var time = '';
			if (days > 0) {
				return days+'天前';
			} else if (hours > 0){
				return hours+'小时前';
			} else if (minutes > 0){
				return minutes+'分钟前';
			} else {
				return seconds + '秒前';
			}
		},
		
	}
};
</script>

<style lang="less" >
	page{
		background: #fff;
	}

.text-gray {
	color: #9a9a9a;
	// padding: 10rpx;
}
.font-size-10{
	font-size: 22rpx;
}
.font-size-12{
	font-size: 24rpx;
}
.font-size-14{
	font-size: 28rpx;
}
.font-size-16{
	font-size: 32rpx;
}
.card-height{
	height: 60rpx;
}

</style>
