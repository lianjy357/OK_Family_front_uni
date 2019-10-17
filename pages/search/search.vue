<template>
	<view class="searchPage main-bg flex flex-direction" :style="[{ paddingTop: StatusBar + 'px' }]">
		
		<view class="flex navHeader align-center justify-center" >
			<view class="navItem flex flex-direction align-center justify-center" @tap="currentNav = 1">
				<text class="fz32 text-bold">到店记录</text>
				<view class="border-bottom mt10" :class="[currentNav === 1 ? 'bg-white':'']"></view>
			</view>
			<view class="navItem flex flex-direction align-center justify-center" @tap="currentNav = 2">
				<text class="fz32 text-bold">顾客查询</text>
				<view class="border-bottom mt10" :class="[currentNav === 2 ? 'bg-white':'']"></view>
			</view>
<!-- 			<view class="navItem flex flex-direction align-center justify-center" @tap="currentNav = 3">
				<text class="fz32 text-bold">收款查询1</text>
				<view class="border-bottom mt10" :class="[currentNav === 3 ? 'bg-white':'']"></view>
			</view> -->
		</view>
		
		<view class="searchBar cu-bar search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" confirm-type="search" type="text" v-model="searchKey" placeholder="请输入手机号/会员号/名称"></input>
			</view>
			<view class="action fz32 text-bold" @tap="goSearch">查询</view>
		</view>
		
		<!-- 数据概述 -->
		<view class="data-content bg-gray mt15">
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
						<view class="mt20" v-if="currentNav != 3">
							<text class="fz28 mr20" v-if="item.phone">{{item.phone}}</text>
							<text class="fz28 text-black mr20">{{item.sex}}</text>
							<text>{{item.age}}岁</text>
						</view>
						<view class="mt20" v-if="currentNav != 3">
							<text class="text-orange fz36">{{item.position}}</text>
							<text class="fz28 ml20">第 <text class="text-red fz36 ml5 mr5">{{item.times}}</text> 次进店</text>
						</view>
						
						<view class="mt20" v-if="currentNav == 3">
							<text class="fz28 mr20">最近消费 <text class="fz34 text-red ml10 mr10">{{item.cost}}</text>元</text>
						</view>
						<view class="mt20" v-if="currentNav == 3">
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
	import { userData } from '@/lib/mockdata.js';
	export default {
		data () {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				currentNav: 2,		// 导航栏
				
				searchKey: '',		// 搜索关键字
				
				// 顾客记录
				userList: [],
				pageLoad: false,
			}
		},
		
		mounted () {
			this.dataOnint();
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			// 数据初始化
			dataOnint () {
				this.userList = userData;
				this.pageLoad = true;
			},
			
			// 查看用户详细信息
			goUserDetail (userData, index) {
				this.$store.commit('setCurrentUserData', userData);
				uni.navigateTo({ url: '/pages/userDetail/userDetail' });
			},
			
			// 查询顾客
			goSearch () {
				if (!this.searchKey) {
					return this.userList = userData;
				}
				let searchResult = userData.filter((item) => this.searchKey == item.vipNo);
				searchResult = searchResult.length ? searchResult : userData.filter((item) => item.userName.indexOf(this.searchKey) > -1);
				searchResult = searchResult.length ? searchResult : userData.filter((item) => this.searchKey == item.phone);
				console.log(searchResult);
				this.userList = searchResult; 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchPage { height: 100vh; }
	.navHeader { 
		height: 84upx;  
		.navItem { width: 200upx; height: 84upx; }
		.border-bottom { width: 100upx; height: 4upx; }
	}
	
	.data-content { flex: 1; border-radius: 40upx 40upx 0 0; }
	.scrollContainer.userList {
		height: calc(100vh - 320upx);
		.userItem {	height: 280upx; width: 100%;	}
		.userImgBox { width: 200upx; height: 280upx; max-width: 200upx; flex: 1; }
		.userImg { width: 160upx; height: 160upx; }
		.userMsgBox { flex: 1; }
	}
	
	.noDataIcon { width: 200upx; height: 200upx; }
</style>
