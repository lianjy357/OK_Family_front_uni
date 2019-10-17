<template>
	<view class="analysisPage">
		
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-red"></text>
				<text class="text-xl text-bold">近七日到店人次</text>
			</view>
		</view>
		
		<view class="qiun-charts" >
			<canvas canvas-id="LineChart" id="LineChart" class="charts" @touchstart="touchLineChart"></canvas>
		</view>
		
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-red"></text>
				<text class="text-xl text-bold">24小时到店人次分布</text>
			</view>
		</view>
		
		<view class="qiun-charts" >
			<canvas canvas-id="LineChartScroll" id="LineChartScroll" class="charts" disable-scroll=true @touchstart="touchLineScroll" @touchmove="moveLineScroll" @touchend="touchEndLineScroll"></canvas>
		</view>
		
		
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-red"></text>
				<text class="text-xl text-bold">顾客年龄分布情况</text>
			</view>
		</view>
		
		
		<view class="qiun-charts-ring" >
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts-ring" @touchstart="touchRing"></canvas>
		</view>
		


	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import { DateFormat } from '@/lib/time.js'; 
	var LineChart = null;
	var LineChartScroll = null;
	var canvaRing = null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:''
			}
		},
		onLoad() {
			this.cWidth = uni.upx2px(700);
			this.cHeight = uni.upx2px(300);
			this.LineChartOnint();
			
			this.LineChartScrollOnint();
			
			this.RingOnint();
		},
		methods: {
			/**
			 * 七日到店人数
			 */
			LineChartOnint(){
				let currentDay = new Date().getTime();
				let categories = [];
				
				for (let i = 6; i >= 0; i--) {
					let tempTime = currentDay - i * 24 * 60 * 60 * 1000;
					categories.push(DateFormat(tempTime, 'MM-dd'));
				}
				
				let LineData = { 
					categories: categories,
					series:[
						{ 
							name: '到店人数', 
							data: [4, 10, 9, 15, 8, 20, 11],
						}
					],
				};
				this.showLineChart("LineChart", LineData);
			},
			showLineChart (canvasId, chartData){
				LineChart = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					padding:[15,20,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					dataLabel:true,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
            boundaryGap:'justify'
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						format:(val)=>{return val.toFixed(0)+'人'}
					},
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						line:{
							type: 'curve'
						}
					}
				});
				
			},
			touchLineChart(e) {
				LineChart.touchLegend(e);
				LineChart.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			
			
			/**
			 * 24时人次分布
			 */
			LineChartScrollOnint () {
				let currentDay = new Date().getTime();
				let categories = [
					"01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
					 "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
					 "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
					 "19:00", "20:00", "21:00", "22:00", "23:00", "24:00",
				];
				

				
				let LineData = { 
					categories: categories,
					series:[
						{ 
							name: '到店人数', 
							data: [0, 0, 0, 0, 0, 0, 1, 3, 1, 2, 3, 5, 0, 1, 1, 1, 2, 1, 3, 5, 3, 1, 0, 0],
						}
					],
				};
				this.showLineChartScroll("LineChartScroll", LineData);
			},
			showLineChartScroll (canvasId, chartData) {
				LineChartScroll = new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:5,
					},
					dataLabel:true,
					dataPointShape:true,
					dataPointShapeType:'hollow',
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid:false,
						type:'grid',
						gridType:'dash',
						itemCount:4,
						scrollShow:true,
						scrollAlign:'left'
					},
					yAxis: {
						//disabled:true
						gridType:'dash',
						splitNumber:8,
						splitNumber:5,
						format:(val)=>{return val.toFixed(0)+'人'}//如不写此方法，Y轴刻度默认保留两位小数
					},
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					},
				});
			},
			
			touchLineScroll(e){
				LineChartScroll.scrollStart(e);
			},
			moveLineScroll(e) {
				LineChartScroll.scroll(e);
			},
			touchEndLineScroll(e) {
				LineChartScroll.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				LineChartScroll.touchLegend(e);
				LineChartScroll.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			
			/**
			 * 顾客年龄分布
			 */
			RingOnint () {
				let Ring={
					series:[
						{ name: '10~20岁', data: 10, },
						{ name: '20~30岁', data: 50, },
						{ name: '30~40岁', data: 72, },
						{ name: '40~50岁', data: 31, },
						{ name: '50~60岁', data: 18, },
						{ name: '60~70岁', data: 9, },
					],
				};
				this.showRing("canvasRing", Ring);
			},
			showRing (canvasId, chartData) {
				let ringWidth = uni.upx2px(700);
				let ringHeight = uni.upx2px(500);
				canvaRing = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					padding:[5,5,5,5],
					legend:{
						show:true,
						position:'right',
						float:'center',
						itemGap:10,
						padding:5,
						lineHeight:26,
						margin:5,
						//backgroundColor:'rgba(41,198,90,0.2)',
						//borderColor :'rgba(41,198,90,0.5)',
						borderWidth :1
					},
					background:'#FFFFFF',
					pixelRatio: this.pixelRatio,
					series: chartData.series,
					animation: false,
					width: ringWidth * this.pixelRatio,
					height: ringHeight * this.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
					extra: {
						pie: {
							border:true,
              borderColor:'#FFFFFF',
              borderWidth:1
						}
					},
				});
			},
			touchRing(e){
				canvaRing.touchLegend(e, {
					animation : false
				});
				canvaRing.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
				
		}
	}
</script>

<style scoped lang="scss">
	.analysisPage { min-height: 100vh; background-color: #FFFFFF; }
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 700upx;
		height: 300upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 700upx;
		height: 300upx;
		background-color: #FFFFFF;
	}
	.qiun-charts-ring { width: 700upx; height: 500upx;	background-color: #FFFFFF; }
	.charts-ring { width: 700upx; height: 500upx;	background-color: #FFFFFF; }
</style>
