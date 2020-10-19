<template>
	<view class="bodys" v-bind:style="{height:windowHeight + 'px',backgroundImage:'url(../static/imgs/No.png)',backgroundSize:'100%',backgroundRepeat:'no-repeat'}" >
		<tabBar :actives= "3"></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabbar.vue';
export default {
	components:{tabBar},
	data() {
		return {
			windowHeight:'',
		};
	},

	onLoad() {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		let _this = this;
		console.log(this.windowHeight)
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
		
		
	}
};
</script>

<style lang="scss" scoped>
	
.top {
	padding: 30rpx 0 30rpx 40rpx;
}
.text-serch {
	background-color: #ffffff;
	height: 100%;
	width: 75%;
	padding: 12rpx 0 12rpx 40rpx;
	border-radius: 10rpx;
	font-size: 18rpx;
	color: #999999;
}
.text-but {
	width: 25%;
	text-align: center;
	color: #17bb89;
	font-size: 28rpx;
}
.title > image {
	width: 36rpx;
	height: 36rpx;
	margin-right: 5px;
}
.item-box {
	margin: auto;
}

.positon-box {
	position: relative;
	top: -80rpx;
	z-index: 1011;
	padding: 0 30rpx;

	.position-num {
		font-size: 28px;
		font-weight: bold;
		color: #49ba89;
		text-align: center;
	}
}
.bg {
	background-color: #ffffff;
	width: 32%;
	border-radius: 10rpx;
	display: flex;
	justify-content: center;
}
</style>
