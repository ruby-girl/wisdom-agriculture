<template>
	<!-- 添加地块 -->
	<view>
		<view class="cu-form-group" style="position: relative;">
			<view class="title">
				<text class="text-red" style="position: absolute;left: -7px;">*</text>选择农场
			</view>
			<picker @change="pickerChange($event)" :value="farmValue" :range="farmList" range-key="farmName">
				<view class="">{{farmList[farmValue].farmName}}</view>
			</picker>
		</view>
		
		<view class="cu-form-group">
			<view class="title"><text class="text-red" style="position: absolute;left: -7px;">*</text>地块编号</view>
			<input placeholder="输入地块编号" v-model="obj.massifNo" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">地块名称</view>
			<input placeholder="输入地块名称" v-model="obj.massifName" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关联作物</view>
			<input placeholder="输入作物名称" v-model="obj.crops" name="input"></input>
		</view>
		<view class="cu-form-group" style="position: relative;">
			<view class="title">作物周期</view>
			<input placeholder="输入作物周期" v-model="obj.cycle" type="number" name="input"></input>
			<text class="unit">天</text>
		</view>
		<!-- <view class="cu-form-group" style="padding-bottom:0;height:40rpx">
			<view class="title">关联设备</view>
		</view>
		<view class="cu-form-group" style="border-top:none;" v-if="devicegetList.length>0">
			<view class="flex flex-wrap container-input">
				<view v-bind:class="{'btn-box':true,'btn-box-action':item.isChecked}" @click="setAction(i)" :key="i" v-for="(item,i) in devicegetList">
					{{item.deviceName}}
				</view>
			</view>
		</view>
		<view class="cu-form-group" style="border-top:none;" v-if="obj.massifId">
			<view class="title">是否关联</view>
			<switch @change="changeSwitch" :class="switchB?'checked':''" :checked="switchB?true:false" color="red"></switch>
		</view> -->
		<view :class="{'bottom-lg-btn':true}" @click="insertMassif">保存</view>
		<view v-if="obj.massifId" class="bottom-lg-btn" style="background: #fff;color:#000;" @click="delMassif">删除地块</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content" style="color:#333">遇到了点小问题</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view style="text-align: center;background: #fff;padding:0 10rpx">
					<view style="font-size: 30rpx;color:#666">地块关联设备时不能删除地块。</view>
					<view style="font-size: 30rpx;color:#666">请先解除设备关联</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action" style="text-align: center;margin:0 auto;color:#49BA89">
						<view class="action margin-0" @tap="hideModal">我知道了</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				farmList: [],
				farmValue: 0,
				list: [{
					name: 'option1',
					id: 1
				}, {
					name: 'option2',
					id: 2
				}],
				obj: {
					massifName: '', //地块名
					massifNo: '', //地块编号
					crops: '', //作物
					// cycle: '', //预计作物周期
					massifId: '', //地块ID
					// deviceId:[]//设备数组
				},
				devicegetList: [], //设备列表
				switchB: true, //是否关联设备
				modalName: ''
			}
		},
		onLoad(option) {
			this.getFarmData();
			if (option.massifId) {
				this.obj.massifId = option.massifId;
				uni.setNavigationBarTitle({
					title:"编辑地块"
				});
				this.massifGetOne();
			}
		},
		methods: {
			hideModal(){
				this.modalName = null
			},
			delMassif() { //删除地块
				// if (this.switchB&&this.obj.devices.length>0) {
				// 	this.modalName = 'DialogModal1'
				// 	return
				// }			
				this.$api.deleteMassif({
					massifId: this.obj.massifId
				}).then(res => {
					uni.showToast({
						title: '删除成功',
						duration: 2000,
						success() {
							let pages = getCurrentPages(); // 当前页面
							let beforePage = pages[pages.length - 2]; // 前一个页面
							setTimeout(function(){
								uni.navigateBack({
									success: function() {
										beforePage.onLoad(); // 执行前一个页面的onLoad方法
									}
								});
							},2000)
						}
					});
				})
			},
			changeSwitch(e) {
				this.switchB = e.detail.value
				if(!this.switchB&&this.devicegetList.length>0){
					this.obj.relation=0
					this.devicegetList.forEach((item, i) => {
						this.devicegetList[i].isChecked = false
					})
				}else{
					this.obj.relation=1
				}
			},
			getLandDetail(id,devicegetList) {//详情		  
				this.$api.selectIdAll({massifId:id}).then(res => {
					this.obj = res.data.data
					this.obj.massifId=id
					if(this.obj.relation==1){//是否关联了设备
						this.switchB=true
					}else{
						this.switchB=false
					}
					let deviceId=[]
					this.obj.devices.forEach((item, i) => {
						deviceId.push(item.deviceId)
						this.obj.devices[i].isChecked = true
						devicegetList.push(this.obj.devices[i])
					})
					delete this.obj.creationTime
					this.obj.deviceId=deviceId
					this.devicegetList=[...devicegetList]
				})
			},
			getOptionValue() {
				let _this = this
				let arr = this.farmList.filter((item, i) => {
					return i == _this.farmValue
				})
				this.obj.farmId = arr[0].farmId
			},
			insertMassif() { //添加地快
				if (!this.obj.massifName) {
					uni.showToast({
						title: '请输入地块名称',
						icon: 'none'
					})
					return
				}
				if (!this.obj.massifNo) {
					uni.showToast({
						title: '请输入地块编号',
						icon: 'none'
					})
					return
				}
				this.getOptionValue()
				let api;
				if(!this.obj.massifId){
					 api='massifSave'
				}else api='updateMassif';
				let postData={...this.obj}
				delete postData.devices
				this.$api[api](postData).then(res => {
					if (this.obj.massifId) {
						uni.showToast({
							title: '编辑成功',
							duration: 2000,
							success() {
								setTimeout(function(){
									let pages = getCurrentPages(); // 当前页面
									let beforePage = pages[pages.length - 2]; // 前一个页面
									uni.navigateBack({
										success: function() {
											beforePage.onLoad(); // 执行前一个页面的onLoad方法
										}
									});
								},2000)
							}
						});
					} else {
						uni.showToast({
							title: '添加成功',
							duration: 2000,
							success() {
								setTimeout(function(){
									let pages = getCurrentPages(); // 当前页面
									let beforePage = pages[pages.length - 2]; // 前一个页面
									uni.navigateBack({
										success: function() {
											beforePage.onLoad(); // 执行前一个页面的onLoad方法
										}
									});
								},2000)
							}
						});
					}
				})
			},
			massifGetOne(){ // 根据地块id获取详情
				var that = this;
				this.$api.massifGetOne({massifId:this.obj.massifId}).then(res => {
					this.obj = res.data.data;
					this.farmList.forEach(function(item, index){
						if (item.farmId == res.data.data.farmId) {
							that.farmValue = index;
						}
					})
					
				})
			},
			// devicegetNoBangAll() { //获获取未绑定地块设备列表
			// 	this.$api.devicegetNoBangAll().then(res => {
			// 		res.data.data.devices.forEach((item, i) => {
			// 			res.data.data.devices[i].isChecked = false
			// 		})
			// 		let devicegetList = res.data.data.devices
			// 		if(this.obj.massifId){//如果是编辑
			// 			// this.getLandDetail(this.obj.massifId,devicegetList)//获取地块详情
			// 		}else{
			// 			this.devicegetList=devicegetList
			// 			// if(this.devicegetList.length<1){
			// 			// 	uni.showToast({
			// 			// 		title: '当前无可用设备，无法添加地块',
			// 			// 		icon: 'none'
			// 			// 	})
			// 			// 	this.btnDisabled=true
			// 			// }else{
			// 			// 	this.btnDisabled=false
			// 			// }
			// 		}
			// 	})
			// },
			pickerChange(e) { //选择农场
				this.farmValue = e.target.value
			},
			setAction(i) {
				if(!this.switchB){
					return
				}
				let devicegetList=[...this.devicegetList]			
				devicegetList[i].isChecked = !devicegetList[i].isChecked
				this.devicegetList=devicegetList
				let arr = this.devicegetList.filter(item => {
					return item.isChecked
				})
				let ids = arr.map(item => {
					return item.deviceId
				})
				this.obj.deviceId = ids
			},
			getFarmData() { //获取农场下拉数据
				let obj = {
					pageNum: 1,
					pageSize: 100
				}
				this.$api.farmList({userId:uni.getStorageSync('XYZNUserInfo').userId}).then(res => {
					this.farmList = res.data.data
				})
			}
		}
	}
</script>

<style scoped>
	.code-img {
		position: absolute;
		right: 20px;
		bottom: rpx;
		width: 35rpx;
		height: 35rpx;
	}

	.cu-form-group picker::after {
		background: url(../../static/imgs/land-management.png) no-repeat;
		background-size: 50%;
		    width: 50px;
		    height: 50px;
		    background-position: center;
	}

	.uni-input {
		line-height: 18rpx;
		padding-left: 0;
	}

	.title {
		width: 180rpx;
	}

	.bottom-lg-btn {
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width: 80%;
		margin: 40rpx auto;
		text-align: center;
		color: #fff;
	}

	.btn-box {
		border: 1px solid #eee;
		padding: 4px 8px;
		border-radius: 4px;
		margin: 20rpx 30rpx 20rpx 0;
	}

	.btn-box-action {
		border: 1px solid #00AE66;
		color: #00AE66;
	}
	.btn-disabled{
		background: #aaa;
	}
	.unit{
		position: absolute;
		right: 20px;
	}
</style>
