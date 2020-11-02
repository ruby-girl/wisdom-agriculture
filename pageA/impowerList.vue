<!--地块管理-->
<template>
	<view class="workOrder">
		<view class="top equipmentManagement-title flex  align-items-center justify-content-flex-justify">
			<view style="font-size: 16px;font-weight: bold;" class="flex  align-items-center">
				<image style="height:24px" src="../static/imgs/shouquan.png" mode=""></image>
				<text>授权列表</text>
			</view>
			<view class="equipmentManagement-btn" @click="toAdd">
				<image src="../static/imgs/add.png" mode=""></image>
				<text>新增</text>
			</view>
		</view>
		<view>
			<scroll-view
				v-bind:style="{ height: windowHeight - 50 + 'px' }"
				class="list-container"
				scroll-y="true"
				refresher-enabled="true"
				refresher-background="#eee"
				@refresherpulling="onPulling"
				@refresherrefresh="onRefresh"
				@refresherrestore="onRestore"
				@refresherabort="onAbort"
				:refresher-triggered="triggered"
				:refresher-threshold="100"
				@scrolltoupper="scrolltoupper"
				@scrolltolower="loadingData"
			>
				<view
					class="cu-form-group"
					v-for="(item, i) in newsList"
					:key="i"
					style="padding:40rpx 30rpx;margin: 20rpx 30rpx;border-radius: 20rpx;box-shadow: 0px 1px 5px 2px #B8B3B3;"
					@click="showPopup(item.staffId)"
				>
					<view class="flex" style="width: 100%;">
						<view class="item-title flex-1">{{ item.staffName }}</view>
						<view class="small-text flex-1">{{ item.staffPhone }}</view>
						<view class="text-red " style="font-size: 12px;">解绑</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<popup
			content="该员工的所有信息将会一并删除,确认解绑么?"
			align="center"
			cancelText="我再想想"
			:show="popupShow"
			:showCancel="true"
			confirmText="确定解绑"
			@confirm="confirmFunc"
			@close="closePopup"
		/>
	</view>
</template>

<script>
import popup from '@/components/neil-modal/neil-modal.vue';
import { throttle } from '@/utils/index.js';
export default {
	components: {
		popup
	},
	data() {
		return {
			newsList: [],
			page: 1,
			moreHeight: 30,
			windowHeight: 300,
			contentdown: '',
			loadingType: 0,
			triggered: false,
			_freshing: false,
			popupShow: false,
			id: ''
		};
	},
	onLoad(option) {
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.loadingData = throttle(this.loadingData, 2000);
		this.initData();
		// this.getData()
	},
	methods: {
		showPopup(id) {
			this.popupShow = true;
			this.id = id;
		},
		closePopup() {
			this.popupShow = false;
		},
		onPulling() {},
		onRefresh() {
			if (this._freshing) return;
			this._freshing = true;
			if (!this.triggered) {
				//界面下拉触发，triggered可能不是true，要设为true
				this.triggered = true;
			}
			let _this = this;
			setTimeout(() => {
				this.triggered = false; //触发onRestore，并关闭刷新图标
				this._freshing = false;
				_this.initData();
			}, 1000);
		},
		onRestore() {
			this.triggered = false; // 需要重置
			this._freshing = false;
		},
		onAbort() {
			this.triggered = false; //触发onRestore，并关闭刷新图标
			this._freshing = false;
		},
		initData() {
			this.newsList = [];
			this.page = 1;
			this.loadingType = 1;
			this.contentdown = '';
			this.getData();
		},
		scrolltoupper() {
			console.info('下拉');
		},
		loadingData(e) {
			this.lastTime = e.timeStamp;
			if (this.loadingType) {
				this.page++;
				this.contentdown = '加载中...';
				this.getData();
			}
		},
		getData() {
			// let obj = {
			// 	pageNum: this.page,
			// 	pageSize: 15
			// }
			this.$api.hireGetList().then(res => {
				this.newsList = res.data.data;

				// if (this.page == 1 && this.newsList.length == 0) {
				// 	this.loadingType = 0
				// 	this.contentdown = '暂无数据'
				// } else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length < 3) {
				// 	this.contentdown = ''
				// 	this.loadingType = 0
				// } else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length > 2) {
				// 	this.contentdown = '无更多数据'
				// 	this.loadingType = 0
				// } else if (res.data.data.rowCount == this.newsList.length) {
				// 	this.loadingType = 0
				// 	this.contentdown = '无更多数据'
				// } else {
				// 	this.contentdown = '上拉加载更多'
				// 	this.loadingType = 1
				// }
			});
		},
		toAdd() {
			uni.navigateTo({
				url: 'mandate'
			});
		},
		confirmFunc(id) {
			let that = this;
			this.$api.hireDelete({ staffId: this.id }).then(res => {
				uni.showToast({
					title: '解绑成功',
					success() {
						setTimeout(function() {
							that.initData();
						}, 1000);
					}
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.workOrder {
	// background: #eee;
}

.flex {
	display: flex;
	justify-content: space-between;
}

.workOrder {
	height: 100%;

	.top {
		background-color: #fff;
		width: 100%;
	}
}
.card {
	width: 47%;
	margin: 20rpx 10rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	padding: 20rpx 20rpx;
	float: left;
}
.box-margin {
	padding-top: 10px;
}

.loading-more {
	text-align: center;
	color: #ddd;
	padding-bottom: 50rpx;
	padding-top: 20px;
}

.order-title {
	line-height: 20px;
}

.small-text {
	color: #999999;
	font-size: 13px;
	line-height: 20px;
}

.state-box {
	position: relative;
	right: -15px;
	padding: 3px 6px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
	background: #49ba89;
	color: #fff;
}

.item-content-box {
	width: 30%;
	text-align: center;

	.item-num {
		font-size: 18px;
		font-weight: bold;
	}
}
.right-jt {
	width: 14rpx;
	height: 28rpx;
}
.item-title {
	font-size: 15px;
	line-height: 20px;
}
.add-box {
	background: #17bb89;
	height: 100rpx;
	width: 100rpx;
	text-align: center;
	border-radius: 50%;
	position: fixed;
	bottom: 80rpx;
	right: 80rpx;
	image {
		width: 60rpx;
		height: 60rpx;
		margin-top: 18rpx;
	}
}
.equipmentManagement-title {
	padding: 15rpx 30rpx;
	// background: #eee;

	image {
		width: 24px;
		margin-right: 5px;
	}

	.equipmentManagement-btn {
		background: #17bb89;
		padding: 3px 8px;
		border-radius: 17px;
		color: #fff;

		image {
			width: 10px;
			height: 10px;
			margin-right: 3px;
		}
	}
}
</style>
