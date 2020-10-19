<template>
	<view class="qiun-columns">
		<view class=""><view class="qiun-title-dot-light">混合图</view></view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll="true" @touchstart="touchMix" @touchmove="moveMix" @touchend="touchEndMix"></canvas>
		</view>
	</view>
</template>

<script>
import uCharts from './u-charts.js';
var _self;
var canvaMix = null;

export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			windowHeight:'',
			chartData: {
				categories: ['1月份', '2月份', '3月份', '4月份', '5月份', '6月份','7月份','8月份','9月份','10月份','11月份','12月份'],
				series: [
					{
						name: '最高温度',
						data: [70, 50, 85, 130, 64, 88,70, 50, 85, 130, 64, 88],
						type: 'area',
						style: 'curve'
					},
					{
						name: '最低温度',
						data: [30, 40, 45, 90, 34, 48,30, 40, 45, 90, 34, 48],
						type: 'area',
						style: 'curve'
					},
					
				]
			}
		};
	},

	mounted() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		this.getServerData();
	},
	methods: {
		getServerData() {
			_self.showMix('canvasMix', _self.chartData);
		},
		showMix(canvasId, chartData) {
			canvaMix = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'mix',
				fontSize: 11,
				legend: { 
					show: true ,
					position:'top',
					float:'left',
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				enableScroll: true, //开启图表拖拽功能

				xAxis: {
					disableGrid: false,
					type: 'grid',
					gridType: 'dash',
					itemCount: 6,
					scrollShow: true,
					scrollAlign: 'left',
				},
				yAxis: {
					gridType: 'dash',
					splitNumber: 5,
					gridColor:'#ffffff',
					min: 10,
					max: 180,
					format: val => {
						return val.toFixed(0);
					}
				},
				
				width: _self.cWidth * _self.pixelRatio,
				height: _self.windowHeight - 120,
				dataLabel: true,
				dataPointShape: true,
				extra: {
					tooltip: {
						bgColor: '#000000',
						bgOpacity: 0.7,
						gridType: 'dash',
						dashLength: 8,
						// gridColor: '#1890ff',
						fontColor: '#FFFFFF',
						horizentalLine: true,
						xAxisLabel: true,
						yAxisLabel: true,
						labelBgColor: '#DFE8FF',
						labelBgOpacity: 0.95,
						labelAlign: 'left',
						labelFontColor: '#666666'
					}
				}
			});
		},
		touchMix(e) {
			canvaMix.scrollStart(e);
		},
		moveMix(e) {
			canvaMix.scroll(e);
		},
		touchEndMix(e) {
			canvaMix.scrollEnd(e);
			//下面是toolTip事件，如果滚动后不需要显示，可不填写
			canvaMix.showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 100%;
	height: 80vh;
	background-color: #ffffff;
}

.charts {
	width: 100%;
	height: 85vh;
	background-color: #ffffff;
}
</style>
