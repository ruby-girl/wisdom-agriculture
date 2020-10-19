<template>
	<view class="qiun-columns" >
		<view class="qiun-charts3">
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-center">圆弧进度图</view>
		</view>
	</view>
</template>

<script>
	import uCharts from './u-charts.js';
	var _self;
	var canvaArcbar1;
	
	export default {
		data() {
			return {
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				windowWidth:'',
				series: [{
						name: '综合指标',
						data: 0.29,
						color: '#4ABA8A'
					}]
			}
		},
	
		mounted(){
			_self = this;
			this.cWidth3=uni.upx2px(250);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(250);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(24);
			this.windowWidth = uni.getSystemInfoSync().windowWidth; // 屏幕的宽度
			this.getServerData();
		},
		methods: {
			getServerData(){
				let Arcbar1={series:_self.series};
				_self.showArcbar("canvasArcbar1",Arcbar1);
				
			},
			showArcbar(canvasId,chartData){
				canvaArcbar1=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:12	,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					duration:2500,
					// width: _self.cWidth3*_self.pixelRatio,
					width: _self.windowWidth/2,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
					// title: {
					// 	name: chartData.series[0].name,//这里您可以直接给任意字符串
					// 	color: chartData.series[0].color,
					// 	fontSize: 11*_self.pixelRatio
					// },
					subtitle: {
						name: Math.round(chartData.series[0].data*100) + '℃',//这里我自动计算了，您可以直接给任意字符串
						// color:  chartData.series[0].color,
						fontSize: 15*_self.pixelRatio
					},
					extra: {
						arcbar:{
							type:"circle",// 默认半弧default,圆circle
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							backgroundColor:'#A1DBC3',
						}
					},
					
				});
				
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts3 {
		width: 100%;
		height: 280rpx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 100%;
		height: 280rpx;
		background-color: #FFFFFF;
	}
	.qiun-title-dot-center{
		text-align: center;
	}
</style>
