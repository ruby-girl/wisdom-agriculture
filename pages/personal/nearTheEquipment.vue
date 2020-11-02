<template>
	<view class="container-y">
		<map style="width:100%;height:100vh;" scale="6" show-location :latitude="latitude" :longitude="longitude" :markers="covers" @callouttap="callouttapFunc"></map>
		<view class="current-postion">
			<view class="flex align-items-center justify-content-flex-justify">
				<view class="">
					是否共享设备
				</view>
				<switch @change="changeSwitch" :class="switchB?'checked':''" :checked="switchB?true:false" color="#e54d42"></switch>
			</view>
		</view>
	</view>
</template>

<script>
import QQMapWX from '@/static/qqmap-wx-jssdk.min.js';
var qqmapsdk;
export default {
	data() {
		return {
			latitude: 39.909,
			longitude: 116.39742,
			covers: [
				{
					latitude: '',
					longitude: ''
				}
			],
			switchB: false,
			arr: [],
			farmId: ''
		};
	},
	onLoad(option) {
		// this.latitude = option.latitude //这是设备的经纬度
		// this.longitude = option.longitude
		this.farmId = option.farmId; //农场ID
		this.getCity();
		// this.selectFarmId();
	},
	methods: {
		callouttapFunc: function(e) {
			uni.navigateTo({
				url: '../monitor/growthMonitoring?massifId=' + e.markerId
			});
		},
		selectFarmId() {
			this.$api
				.selectFarmId({
					farmId: this.farmId
				})
				.then(res => {
					this.switchB = res.data.data.nearby;
				});
		},
		changeSwitch(e) {
			this.switchB = e.detail.value;
			this.$api.updateNearby({ farmId: this.farmId, nearby: this.switchB }).then(res => {
				uni.showToast({
					title: '设置成功',
					duration: 2000
				});
			});
		},
		getCity() {
			let _this = this;
			// 向用户发起授权请求，弹框提示
			uni.authorize({
				// 获取用户定位信息
				scope: 'scope.userLocation',
				// 用户同意授权执行
				success() {
					// 引入腾讯地图api
					// 实例化API核心类
					qqmapsdk = new QQMapWX({
						// 填写自己的Key值，这个值是与AppID绑定的
						key: 'GFHBZ-JU3CD-NEJ4S-PT3J2-JGFH6-7DBOX'
					});
					//获取位置信息
					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							_this.longitude = res.longitude;
							_this.latitude = res.latitude;
							_this.getEquipment();
						}
					});
				},
				// 若用户不同意授权，弹框提示
				fail(res) {
					uni.showToast({
						icon: 'none',
						title: '注意：需要获取您的定位授权,否则部分功能将无法使用',
						duration: 2000
					});
				}
			});
		},
		getEquipment() {
			// latitude: 22.589762
			// longitude: 113.942510
			this.$api.getNearbyDevice({ latitude: this.latitude, longitude: this.longitude }).then(res => {
				this.arr = res.data.data;
				if (this.arr.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '未查询到设备',
						duration: 2000
					});
					return;
				}
				this.arr.map(item => {
					let obj = {
						id: item.massifId,
						latitude: item.latitude,
						longitude: item.longitude,
						callout: {
							content: `农场名称：${item.farmName}`,
							color: '#333333',
							fontSize: 14,
							borderWidth: 1,
							borderRadius: 10,
							borderColor: '#aaaaaa',
							bgColor: '#fff',
							padding: 4,
							anchorY: -10,
							anchorX: 0,
							display: 'ALWAYS',
							textAlign: 'center'
						}
					};
					this.covers.push(obj);
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.container-y {
	background: #eee;
	height: 100%;
}

.current-postion {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 20px 15px;
	box-sizing: border-box;
	background: #fff;
}
</style>
