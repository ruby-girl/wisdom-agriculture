<template>
	<div>
		<view style="font-size: 14px;padding-bottom:10rpx;">
			<text style="font-weight: bold;width:50%;text-align:left;display: inline-block;">{{title}}变化记录</text>
			<text class="item-num" style="width:50%;text-align: right;display: inline-block;color:#999;font-size:13px">最近7日数据</text>
		</view>
		<canvas v-if="canvasId" :id="canvasId" disable-scroll="true" :canvasId="canvasId" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"
		 @error="error">
		</canvas>
		<image :src="imgSrc" style="width: 750rpx;height: 500rpx;"></image>
	</div>
</template>

<script>
	import uCharts from './u-charts.js';
	var canvases = {};
	
	export default {
		props: {
			chartType: {
				required: true,
				type: String,
				default: 'column'
			},
			canvasId: {
				type: String,
				default: 'u-canvas',
			},
			cWidth: {
				default: 375,
			},
			cHeight: {
				default: 250,
			},
			pixelRatio: {
				type: Number,
				default: 1,
			},
			max:{
				type:Number,
			},
			min:{
				type:Number,
			},
			title:{type: String,default: '1'},
			opts:{},
			unit:{}
		},
		mounted() {			
			this.init(this.opts,this.unit)
		},
		data(){
			return{
				imgSrc:''
			}
		},
		methods: {
			init(opts,unit) {
				this.opts=opts
				switch (this.chartType) {
					case 'column':
						this.initColumnChart();
						break;
					case 'line':
						this.initLineChart(unit);
						break;
					default:
						break;
				}
			},
			initColumnChart() {
				canvases[this.canvasId] = new uCharts({
					$this: this,
					canvasId: this.canvasId,
					type: 'column',
					legend: true,
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					animation: true,
					categories: this.opts.categories,
					series: this.opts.series,
					enableScroll: false,
					xAxis: {
						disableGrid: true,
						itemCount: 8,
						scrollShow: false
					},
					yAxis: {
						//disabled:true
						
					},
					dataLabel: true,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						column: {
							type: 'group',
						}
					}
				});
			},
			initLineChart(unit) {
				canvases[this.canvasId] = new uCharts({
					$this: this,
					canvasId: this.canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show:false
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					categories: this.opts.categories,
					series: this.opts.series,
					animation: true,
					enableScroll: true,
					xAxis: {
						type: 'grid',
						gridColor: '#fff',
						gridType: 'dash',
						dashLength: 4,
						itemCount: 7,
						scrollShow: false,
						rotateLabel:true			
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#999',
						splitNumber: 5,
						max:this.max,
						min:this.min,
						format: (val) => {
							return val.toFixed(0) + unit
						}
					},
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});
				let _this=this
				canvases[this.canvasId].addEventListener('renderComplete', () => {//监控图表渲染完成
										setTimeout(function(){//延迟一定时间执行
											uni.canvasToTempFilePath({//将图表转成图片
												x: 0,
												y: 0,
												width:375*2,
												height:250*2,
												fileType:'png',
												canvasId:_this.canvasId,
												success: function(res) {
												  _this.imgSrc=res.tempFilePath;
												 },
												 fail:function(res){
												 }
											},_this);
										},100);
								});
			},
			// 这里仅作为示例传入两个参数，cid为canvas-id,newdata为更新的数据，需要更多参数请自行修改
			changeData(cid,newdata) {
				canvases[cid].updateData({
					series: newdata.series,
					categories: newdata.categories
				});
			},
			touchStart(e) {
				canvases[this.canvasId].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
				canvases[this.canvasId].scrollStart(e);
			},
			touchMove(e) {
				canvases[this.canvasId].scroll(e);
			},
			touchEnd(e) {
				canvases[this.canvasId].scrollEnd(e);
			},
			error(e) {
				console.log(e)
			}
		},
	};
</script>

<style scoped>
	.charts {
		width: 100%;
		height: 100%;
		flex: 1;
		background-color: #FFFFFF;
	}
	canvas{
		    position: absolute;
		    width: 100%;
		    right: -900px;
		    top: -600px;
		}
		.item-num {
			font-size: 16px;
			font-weight: bold;
		}
</style>
