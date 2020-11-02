<style scoped>
.tabbarMain{
	height: 188upx;
	position: fixed;
	z-index: 50;
	width: 750upx;
	flex: 1;
	bottom: 0;
}
.tabbarMainIphone{
	height: 256upx;
	padding-bottom: 64upx;
}
.tabBtnMina{
	width: 750upx;
	height: 100rpx;
	position: absolute;
	z-index:2;
	bottom:0;
	flex-direction: row;
	/* #ifndef */
	padding-bottom: constant(safe-area-inset-top);
	padding-bottom: env(safe-area-inset-top);
	/* #endif */
	display: flex;
}
.tabBtnMinaIphone{
	height: 156upx;
	padding-bottom: 64upx;
}
.imgse{
	width: 48upx;
	height: 48upx;
}
.imgsAi{
	width: 80rpx;
	height: 80rpx;
}
.txtBtn{
	font-size: 22upx;
	color: #666666;
}
.txtBtnSel{
	font-size: 22upx;
	color: #49BA89;
}
.itmMain{
	width: 250upx;
	/* width: 150upx; */
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
}
.imgseTs{
	width: 150upx;
	height: 140upx;
	margin-bottom: 90upx;
	position: relative;
	z-index:1;
	bottom: 0upx;
}

.btnfixMin{
	width: 750upx;
	height: 178upx;
	position: absolute;
	z-index:1;
	bottom:0;
}
.btnfixMinIphone{
	bottom:64upx;
}
.fixTpm{
	width: 150upx;
	height: 140upx;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index:0;
}
.imgseTsAnds{
	width: 150upx;
	height: 150upx;
	position: fixed;
	z-index:1;
	bottom: 10upx;
	left: 50%;
	border-radius: 150upx;
	transform: translateX(-50%);
}
</style>


<!-- 
    此版本需要注意
		1、如果此项目有地图模块功能的话   整个底部建议使用<cover-view><cover-image>进行标签改版      或者判断如果当前点击等于地图模块功能时候，却换成<cover-view><cover-image>进行原生渲染
 -->
 
<template>
	
	<view class="tabbarMain" :class="[flagTypeInfo? 'tabbarMainIphone':'']">
		<!-- <image src="/static/nav_btn.png" :fade-show='false' class="btnfixMin"  :class="[flagTypeInfo? 'btnfixMinIphone':'']" mode=""></image> -->
		<view class="tabBtnMina"  :class="[flagTypeInfo? 'tabBtnMinaIphone':'']" mode="" style="background-color: #F8FAFB;">
			<view class="itmMain" @click.stop="switchTabFunc(0, '/pages/monitor/monitor')">
				<image class="imgse" :fade-show='false' v-if="active!=0" src="/static/imgs/detection.png"></image>
				<image class="imgse" :fade-show='false' v-if="active===0" src="/static/imgs/detection-1.png"></image>
				<text class="txtBtn" :class="{'txtBtnSel' :active==0}">监测预警</text>
			</view>
			<template v-if=" roleCode == 'ADMIN'">
				<view class="itmMain" @click.stop="switchTabFunc(1, '/pages/marketManagement/marketManagement')">
					<image class="imgse" :fade-show='false' v-if="active!=1" src="/static/imgs/equipment-management-1.png"></image>
					<image class="imgse" :fade-show='false' v-if="active===1" src="/static/imgs/equipment-management.png"></image>
					<text class="txtBtn" :class="{'txtBtnSel' :active==1}">集市管理</text>
				</view>
				<view class="itmMain" @click.stop="switchTabFunc(2, '/pages/factionalism/factionalismList' )">
					<image class="imgse" :fade-show='false' v-if="active!=2" src="/static/imgs/nearby.png"></image>
					<image class="imgse" :fade-show='false' v-if="active===2" src="/static/imgs/nearby1.png"></image>
					<text class="txtBtn" :class="{'txtBtnSel' :active==2}">圈子活动</text>
				</view>
			</template>
			<template v-else>
				<view class="itmMain" @click.stop="switchTabFunc(1, '/pages/farm/farmList')">
					<image class="imgse" :fade-show='false' v-if="active!=1" src="/static/imgs/equipment-management-1.png"></image>
					<image class="imgse" :fade-show='false' v-if="active===1" src="/static/imgs/equipment-management.png"></image>
					<text class="txtBtn" :class="{'txtBtnSel' :active==1}">设备管理</text>
				</view>
				<view class="itmMain" @click.stop="switchTabFunc(2, '/pages/personal/allNearTheEquipment'  )">
					<image class="imgse" :fade-show='false' v-if="active!=2" src="/static/imgs/nearby.png"></image>
					<image class="imgse" :fade-show='false' v-if="active===2" src="/static/imgs/nearby1.png"></image>
					<text class="txtBtn" :class="{'txtBtnSel' :active==2}">附近设备</text>
				</view>
			</template>
			
			<view class="itmMain" @click.stop="switchTabFunc(3, '/pages/personal/personal')">
				<image class="imgse" :fade-show='false' v-if="active!=3" src="/static/imgs/my.png"></image>
				<image class="imgse" :fade-show='false' v-if="active===3" src="/static/imgs/my-1.png"></image>
				<text class="txtBtn" :class="{'txtBtnSel' :active==3}">用户中心</text>
			</view>
		</view>
		
	</view>
</template>

<script>
export default{
	data(){
		return{
			active: Number, // 当亲选择那个按钮
			platforms: '', // 终端调整兼容
			leftWidth: 0, // 安卓 端使用
			flagTypeInfo: false, // 检测当前是否是IPHONE 异形屏幕
			roleCode: uni.getStorageSync('XYZNUserInfo').roleCode,
		}
	},
	mounted() {
		this.flagTypeInfo = this.$is_bang;
		let tempSystem = uni.getSystemInfoSync()
		this.platforms = tempSystem.platform
		
		this.$nextTick(()=>{
			// #ifdef APP-NVUE || APP-PLUS || APP-PLUS-NVUE ||APP-VUE
			if(this.platforms == 'android'){
				let temp = this.$refs.leftWidth
				this.leftWidth = tempSystem.screenWidth / 2
			}
			// #endif
			this.active = this.actives
		})
	},
	props:{
		actives:{
			type: Number,
			default: 0
		}
	},
	inject:['_mainFuncInit'], // 父级传递过来的函数
	methods:{
		/**
		 * @name 初始化当前点击索引
		 * 解决初始化闪烁图标问题
		 * */ 
		getSetting(numbers){
			this.active = numbers || 0
		},
		/**
		 * @name tab点击事件
		 * @param {number} index 当前点击的索引
		 * @param {string} Urls 当前点击带进来的链接
		 * */ 
		switchTabFunc(index, Urls) {
			if (index != this.active) {
				uni.setStorageSync('setStatusIndexFunc', index)
				// this._mainFuncInit() // 回调父级函数
				uni.reLaunch({
					url:Urls,
				})
				this.active = index;
			} 
			
		}
	}
}
</script>
