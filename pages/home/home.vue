<template name="components">
	<view>
		<cu-custom bgColor="bg-yellow">
				<block slot="content">
					有目标
				</block>
			</cu-custom>
		<scroll-view scroll-y class="page">
			
			<view>
				<view class="padding-xl radius shadow bg-red margin-top" @tap="toChild" :data-url="item.url"
				 v-for="(item,index) in list" :key="index">
					<view class="cardTitle">
						<span class="cu-tag light bg-grey">公司</span><span>{{item.title}}</span>
					</view>
					
					<view class="cu-progress round sm striped active">
						<view class="bg-yellow" :style="[{ width:loading?'60%':''}]"></view>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "components",
		data() {
			return {
				loading: '60%',
				list: [{
						title: '索引列表',
						img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
						url: '../plugin/indexes'
					},
					{
						title: '微动画',
						img: 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg',
						url: '../plugin/animation'
					},
					{
						title: '全屏抽屉',
						img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
						url: '../plugin/drawer'
					},
					{
						title: '垂直导航',
						img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
						url: '../plugin/verticalnav'
					}
				]
			};
		},
		methods: {
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.cardTitle {
		color: #fff;
		/* padding: 90upx 60upx; */
		font-size: 38upx;
		font-weight: 300;
		/* transform: skew(-10deg, 0deg); */
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3)
	}


</style>
