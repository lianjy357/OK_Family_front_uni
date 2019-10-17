<template>
	<view class="homePage main-bg flex flex-direction" :style="[{ paddingTop: StatusBar + 'px' }]">
		<view class="flex navHeader align-center justify-center" >
			<view class="navItem flex flex-direction align-center justify-center" @tap="switchNav(1)">
				<text class="fz32 text-bold">到店顾客</text>
				<view class="border-bottom mt10" :class="[currentNav === 1 ? 'bg-white':'']"></view>
			</view>
<!-- 			<view class="navItem flex flex-direction align-center justify-center" @tap="switchNav(2)">
				<text class="fz32 text-bold">收款信息</text>
				<view class="border-bottom mt10" :class="[currentNav === 2 ? 'bg-white':'']"></view>
			</view> -->
		</view>
		
		<!-- 数据概述 && 到店顾客 -->
		<view class="data-content bg-gray mt15 pl20 pr20 pt20 pb20">
			<view class="flex justify-center">
				<view class="dataItem text-cut mr10 text-gray flex justify-center align-center">
					今天到店<text class="text-red fz40 text-bold">{{DayPeople}}</text>人次
				</view>
				<view class="dataItem text-cut ml10 text-gray flex justify-center align-center">
					七日内到店<text class="text-red fz40 text-bold">66</text>人次
				</view>
			</view>
			
			<!-- 数据图表 -->
			<view class="qiun-charts" >
				<canvas canvas-id="LineChart" id="LineChart" class="charts" @touchstart="touchLineChart"></canvas>
			</view>
			
			
			<view class="flex pl20 pr20 mt15">
				<view class="searchType pt5 pb5 pl15 pr15 round mr15" :class="[ SearchType == -1 ? 'bg-red':'']" @tap="switchType(-1)">到店顾客</view>
				<view class="searchType pt5 pb5 pl15 pr15 round mr15" :class="[ SearchType == 0 ? 'bg-red':'']" @tap="switchType(0)">顾客</view>
				<view class="searchType pt5 pb5 pl15 pr15 round mr15" :class="[ SearchType == 1 ? 'bg-red':'']" @tap="switchType(1)">会员</view>
				<view v-if="currentNav == 1" class="searchType pt5 pb5 pl15 pr15 round mr15" :class="[ SearchType == 2 ? 'bg-red':'']" @tap="switchType(2)">工作人员</view>
			</view>
			
			<scroll-view scroll-y="true" class="scrollContainer shadow userList pl20 pr20 pt20 pb20">
				
				<view v-for="(item, index) in userList" :key="index" class="userItem flex bg-white radius15 mb20" @tap="goUserDetail(item, index)">
					<view class="userImgBox flex justify-center align-center">
						<image class="userImg round" :src="item.userImg" mode=""></image>
					</view>
					
					<view class="userMsgBox padding">
						<view class="flex justify-between align-center">
							<view>
								<text class="fz36 text-black">{{item.userName}}</text> 
								<text class="fz32 ml10" :class="[item.userType == 1 ? 'text-red' : 'text-blue']">({{item.userTypeName}})</text>
							</view>
							<text v-if="item.vipNo" class="fz20">会员号: <text class="fz24">{{item.vipNo}}</text></text>
						</view>
						<view class="mt5">
							<text class="text-gray fz20">{{item.enterTime}}</text>
						</view>
						<view class="mt20" v-if="currentNav == 1">
							<text class="fz28 mr20" v-if="item.phone">{{item.phone}}</text>
							<text class="fz28 text-black mr20">{{item.sex}}</text>
							<text>{{item.age}}岁</text>
						</view>
						<view class="mt20" v-if="currentNav == 1">
							<text class="text-orange fz36">{{item.position}}</text>
							<text class="fz28 ml20">第 <text class="text-red fz36 ml5 mr5">{{item.times}}</text> 次进店</text>
						</view>
						
						<view class="mt20" v-if="currentNav == 2">
							<text class="fz28 mr20">本次消费 <text class="fz34 text-red ml10 mr10">{{item.cost}}</text>元</text>
						</view>
						<view class="mt20" v-if="currentNav == 2">
							<text class="fz28">付款时间: <text class="fz20 text-gray">{{item.paytime}}</text></text>
						</view>
						
					</view>
				</view>
				
				<view v-if="!userList.length && pageLoad" class="flex flex-direction align-center pt100">
					<image src="/static/img/empty.png" class="noDataIcon" mode=""></image>
					<text class="fz28 text-grey">暂无相关数据~</text>
				</view>
				
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import { DateFormat } from '@/lib/time.js'; 
	import { todayUserData } from '@/lib/mockdata.js';
	
	import uCharts from '@/components/u-charts/u-charts.js';
	
	var LineChart = null;
	export default {
		data () {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				currentNav: 1,		// 导航栏
				
				SearchType: -1,		// 0: 到店顾客 1：会员  2：工作人员  
				
				DayPeople: 0,
				DayCount: '0.00',
				
				// 顾客列表
				userList: [],
				pageLoad: false,
				
				// 图表
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
			}
		},
		onLoad () {
			
		},
		mounted () {
			this.dataOnint();
			this.lineChartOnint();
		},
		methods: {
			
			switchNav (nav) {
				if (this.currentNav == nav) return;
				this.currentNav = nav;
				// switch (nav) {
				// 	case 1:  // 到店顾客
				// 		this.switchType(this.SearchType);
				// 		break;
				// 	case 2: // 收款信息
				// 		let costResult = this.DataToSortTime().filter(item => item.cost && item.cost > 0);
				// 		this.userList = costResult;
				// 		break;
				// }
			},
			
			switchType (type) {
				this.SearchType = type;
				let filterResult;
				switch (type) {
					case -1: // 所有顾客
						this.userList = this.DataToSortTime();
						break;
					case 0: // 顾客	
						filterResult = this.DataToSortTime().filter(item => item.userType == 0);
						this.userList = filterResult;
						break;
					case 1: // 会员
						filterResult = this.DataToSortTime().filter(item => item.userType == 1);
						this.userList = filterResult;
						break;
					case 2: // 工作人员
						filterResult = this.DataToSortTime().filter(item => item.userType == 2);
						this.userList = filterResult;
						break;
				}
			},
			// 数据初始化
			dataOnint () {
				this.userList = this.DataToSortTime();
				this.DayPeople = todayUserData.length;
				let TotalMoney = 0;
				todayUserData.forEach((item, index) => {
					TotalMoney += item.cost;
				});
				this.DayCount = TotalMoney;
				this.pageLoad = true;
			},
			
			// 跳转至用户详情页
			goUserDetail (userData, index) {
				this.$store.commit('setCurrentUserData', userData);
				uni.navigateTo({ url: '/pages/userDetail/userDetail' });
			},
			// 数据的时间最新替换
			DataToSortTime () {
				let todayTimeStr = DateFormat(new Date().getTime(), 'yyyy-MM-dd');
				let data = todayUserData;
				data.forEach(item => {
					item.enterTime = item.enterTime.replace(item.enterTime.substring(0, 10), todayTimeStr);
					item.paytime = item.paytime ? item.paytime.replace(item.paytime.substring(0, 10), todayTimeStr) : void 0;
				});
				return data;
			},
			// 折线图
			lineChartOnint () {
				this.cWidth = uni.upx2px(700);
				this.cHeight = uni.upx2px(300);
				
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

				this.showLine("LineChart", LineData);
		
			},
			
			showLine (canvasId, chartData) {
				LineChart = new uCharts({
					$this:this,
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
			
			touchLineChart (e) {
				LineChart.touchLegend(e);
				LineChart.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			
			// changeData(){
			// 
			// 		let newdata=JSON.parse(this.textarea);
			// 		LineChart.updateData({
			// 			series: newdata.series,
			// 			categories: newdata.categories
			// 		});
			// 
			// }
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.homePage { height: 100vh; }
	.navHeader { 
		height: 84upx;  
		.navItem { width: 200upx; height: 84upx; }
		.border-bottom { width: 100upx; height: 4upx; }
	}
	
	.data-content { 
		flex: 1; border-radius: 40upx 40upx 0 0;
		.dataItem { width: 320upx; height: 94upx; box-shadow: 0 0 12upx 1upx #FCC5DA; border-radius: 20upx;
				vertical-align: text-bottom;
			}
	}
	
	.scrollContainer.userList {
		height: 600upx;
		.userItem {	height: 280upx; width: 100%;	}
		.userImgBox { width: 200upx; height: 280upx; max-width: 200upx; flex: 1; }
		.userImg { width: 160upx; height: 160upx; }
		.userMsgBox { flex: 1; }
	}
	
	.noDataIcon { width: 200upx; height: 200upx; }
	.qiun-charts {	width: 700upx;	height: 300upx;	}
	.charts {	width: 700upx;	height: 300upx;	}
</style>
