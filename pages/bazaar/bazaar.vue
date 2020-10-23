<template>
	<view>
		<scroll-view v-bind:style="{ height: windowHeight + 'px' }" scroll-y="true" enable-back-to-top="true">
			<view class="bg-personal">
				<view class="swiper">
					<image mode="aspectFill" src="../../static/images/index.jpg" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
			<view class="top">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center justify-center" style="padding-bottom: 8rpx;border-bottom: 1px solid #D8D8D8;">
						<view
							class="cu-item font-size-12"
							:class="item.id == TabCur ? 'text-green cur' : ''"
							v-for="(item, index) in tabs"
							:key="index"
							@tap="tabSelect"
							:data-id="item.id"
						>
							{{ item.cateName }}
						</view>
					</view>
				</scroll-view>
			</view>
			<view>
				<view class="Grid" v-if="data.length > 0">
					<view class="Grid-Item" v-for="(item, index) in data" :key='index' @tap='showGoods()'>
						<view class="GSimg" >
							<image class="Image" :src="item.photoUrl" mode="aspectFill"></image>
						</view>
						<view class="text-left">{{item.productName}}</view>
						<view class="text-left index-money">
							￥<text class="font-size-16">{{item.price}}</text>
							<text class="text-gray" style="font-size: 12px;margin-left: 20rpx;">已售{{item.sales}}{{item.unitName}}</text>
						</view>
					</view>
				</view>
				<view v-else>
					<image src="../../static/imgs/No.png" style="width: 100%;"></image>
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
			tabs: [],
			TabCur: 1,
			serch:{
				pageNum:1,
				pageSize:100,
				parentId:1,
			},
			typeSerch:{
				categoryId:'',
				pageNum:1,
				pageSize:100,
			},
			data:[],
		};
	},
	onLoad() {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.isLogin = getApp().globalData.isLogin;
		this.categoryFindAll();
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
		categoryFindAll(){ // 获取商品分类
			this.$api.categoryFindAll(this.serch).then(res => {
				this.tabs = res.data.data.records;
				this.TabCur = res.data.data.records[0].id;
				this.typeSerch.categoryId = res.data.data.records[0].id;
				this.productFindCategory();
			})
		},
		productFindCategory(){ // 根据分类Id查询商品
			this.data = [];
			this.$api.productFindCategory(this.typeSerch).then(res => {
				this.coverFindByidlist(0,res.data.data.records);
			})
		},
		showGoods(){ // 商品详情
			uni.navigateTo({
				url:'./commodityDetails',
			})
		},
		coverFindByidlist(index,array){// 根据商品id查封面图
			if (array.length > 0) {
				this.$api.coverFindByidlist({productId:array[index].productId}).then(res => {
					array[index].photoUrl = res.data.data[0];
					if(++index < array.length){
						this.coverFindByidlist(index,array);
					} else {
						this.data = array;
					}
				})
			}
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.typeSerch.pageNum = 1;
			this.typeSerch.pageSize = 10;
			this.typeSerch.categoryId = e.currentTarget.dataset.id;
			this.productFindCategory();
		},
	}
};
</script>

<style lang="less">
page {
	background: #fff;
}
.bg-personal {
	position: relative;
}
.uni-padding-wrap {
	width: 100%;
	padding: 0;
}
.swiper {
	height: 250rpx;
}
.scroll-view_H {
	white-space: nowrap;
}
.scroll-view-item {
	height: 300rpx;
}
.scroll-view-item_H {
	display: inline-block;
	width: 100%;
	height: 300rpx;
}
.padding-box {
	padding: 8px 15px;
	align-items: center;
	justify-content: center;
	letter-spacing: 5rpx;
}
.index-h3 {
	font-size: 35rpx;
	flex: 1;
	border-left: 3px solid #00ae66;
	padding: 0 15px;
	font-weight: 600;
}
.index-span {
	color: #c2c2c2;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.index-time {
	font-size: 20rpx;
	color: #ff0001;
	position: relative;
	margin: auto 10rpx;
}
.index-money {
	color: #ff0001;
}
.img-right {
	width: 10rpx;
	height: 20rpx;
	position: relative;
	margin: auto 10rpx;
}
.img-size {
	width: 22rpx;
	height: 28rpx;
	position: relative;
	margin: auto 0;
	margin-right: 10rpx;
}
.scroll-view-item_H {
	width: 45%;
}
.scroll-view-item-img {
	border-radius: 18rpx;
	width: 100%;
	height: 70%;
}
.font-size-14 {
	font-size: 28rpx;
}
.font-size-16 {
	font-size: 32rpx;
}
.card-height {
	height: 60rpx;
}
.card {
	margin-top: 30rpx;
	padding-bottom: 30rpx;
	border-bottom: 1px solid #e4e4e4;
}
.Grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-between;
	padding: 10rpx 0;
	.Grid-Item {
		width: 50%;
		padding: 10rpx;
		text-align: center;
		position: relative;
		border: 1px solid #EEEEEE;
		.GSimg {
			.Image {
				height: 400rpx;
			}
		}
		
	}
}
</style>
