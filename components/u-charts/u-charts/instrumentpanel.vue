<template>
	<view class="qiun-columns">
		
		<view class="qiun-charts"><canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas></view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-center" style="font-size: 45rpx;color: #4ABA8A;">当前状态-良好</view>
		</view>
	</view>
</template>

<script>
import uCharts from './u-charts.js';
var _self;
var canvaGauge = null;

export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			gaugeWidth: 15,
			categories: [
				{
					value: 0.85,
					color: '#4ABA8A'
				},
				// {
				// 	value: 0.8,
				// 	color: '#f04864'
				// },
				// {
				// 	value: 1,
				// 	color: '#1890ff'
				// }
			],
			series: [
				{
					name: '综合指标',
					data: 0.85
				}
			]
		};
	},
	mounted() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getServerData();
	},
	methods: {
		getServerData() {
			let Gauge = { categories: _self.categories, series: _self.series };
			_self.showGauge('canvasGauge', Gauge);
			// uni.request({
			// 	url: 'https://www.ucharts.cn/data.json',
			// 	data:{
			// 	},
			// 	success: function(res) {
			// 		console.log(res.data.data)
			// 		let Gauge={categories:[],series:[]};
			// 		//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			// 		Gauge.categories=res.data.data.Gauge.categories;
			// 		Gauge.series=res.data.data.Gauge.series;

			// 		_self.showGauge("canvasGauge",Gauge);
			// 	},
			// 	fail: () => {
			// 		_self.tips="网络错误，小程序端请检查合法域名";
			// 	},
			// });
		},
		showGauge(canvasId, chartData) {
			canvaGauge = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'gauge',
				fontSize: 11,
				legend: false,
				title: {
					name: Math.round(chartData.series[0].data * 100),
					color: chartData.categories[0].color,
					fontSize: 30 * _self.pixelRatio,
					offsetY: 50 * _self.pixelRatio //新增参数，自定义调整Y轴文案距离
				},
				subtitle: {
					name: chartData.series[0].name,
					color: chartData.categories[0].color,
					fontSize: 15 * _self.pixelRatio,
					offsetY: -50 * _self.pixelRatio //新增参数，自定义调整Y轴文案距离
				},
				extra: {
					gauge: {
						// type: 'progress',
						width: _self.gaugeWidth * _self.pixelRatio, //仪表盘背景的宽度
						startAngle: 0.75,
						endAngle: 0.25,
						startNumber: 0,
						endNumber: 100,
						labelFormat:function(){
							return ''
						},
						splitLine: {
							fixRadius: '-'+ _self.gaugeWidth * _self.pixelRatio - 10,
							splitNumber: 10,
							width: _self.gaugeWidth * _self.pixelRatio, //仪表盘背景的宽度
							color: chartData.categories[0].color,
							childNumber: 5,
							childWidth: _self.gaugeWidth * 1 * _self.pixelRatio //仪表盘背景的宽度
						},
						pointer: {
							width: _self.gaugeWidth * 0.1 * _self.pixelRatio, //指针宽度
							color: chartData.categories[0].color,
						}
					}
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				duration:2500,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true
			});
		}
	}
};
</script>

<style>
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 750upx;
	height: 400upx;
	background-color: #ffffff;
}

.charts {
	width: 750upx;
	height: 400upx;
	background-color: #ffffff;
}
.qiun-title-dot-center{
		text-align: center;
	}
</style>
