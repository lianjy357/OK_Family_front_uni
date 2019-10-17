<template>
	<view class="userDetailPage bg-white">
		<view class="fixed" style="z-index: 99;">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<!-- <block slot="content">亿创课</block> -->
			</cu-custom>
		</view>
		
		<view class="userDetail-content">
			<view class="relative userHead">
				<image class="userImg" :src="userMsg.userImg" mode="" @tap="previewImg"></image>
				<view class="userTag absolute flex pl20">
					<view class="userHeadimg flex justify-center align-center">
						<image class="round img" :src="userMsg.userImg" mode="" @tap="previewImg"></image>
					</view>
					
					<view class="userHeadmsg pt20 pb20 pl10 pr20">
						<view class="fz32 text-white">{{userMsg.userName}}</view>
						<view class="flex mt20">
							<view class="padding-xs bg-white flex justify-center align-center mr10 radius10">{{userMsg.sex}}</view>
							<view class="padding-xs bg-white flex justify-center align-center radius10">{{userMsg.age}}岁</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 到店记录 -->
			<view class="mt130">
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles text-red"></text>
						<text class="text-xl text-bold">到店记录</text>
					</view>
				</view>
				
				<view class="pl30 pr30 pb30 solid-bottom">
					<view class="fz28 mb10">到店次数：<text class="fz32 text-black">{{userMsg.times}}</text></view>
					<view class="fz28 mb10">进店位置：<text class="fz32 text-black">{{userMsg.position}}</text></view>
					<view class="fz28 mb10">本次进店时间：<text class="fz32 text-black">{{userMsg.enterTime}}</text></view>
				</view>
			</view>
			<!-- end 到店记录 -->
			
			<!-- 消费记录 -->
			<view>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles text-red"></text>
						<text class="text-xl text-bold">消费记录</text>
					</view>
				</view>
				
				<view class="payRecord flex pl30 pr30 pb30 solid-bottom">
					<view class="payRecordImg flex justify-center align-center">
						<image class="round img" :src="userMsg.userImg" mode="" @tap="previewImg"></image>
					</view>
					<view class="payRecordMsg pl30">
						<view class="mt10 fz32">{{userMsg.userName}}</view>
						<view class="mt10 fz28">支付: <text class="text-red fz32">{{userMsg.cost}}</text></view>
						<view class="mt10 fz28">支付时间: {{userMsg.paytime}}</view>
						<view class="mt10 fz28">共在本店消费 <text class="fz32 ml5 mr5 text-red">{{userMsg.totalCost}}</text>元</view>
					</view>
				</view>
			</view>
			<!-- end 消费记录 -->
			
			<!-- 人物画像 -->
			<view>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles text-red"></text>
						<text class="text-xl text-bold">人物画像</text>
					</view>
				</view>
				
				<view class="userDrawer flex justify-center align-center pl30 pr30 pb30 solid-bottom">
					<view class="relative">
						<image v-if="userMsg.sex == '男'" class="img" src="/static/img/man.png" mode=""></image>
						<image v-else class="img" src="/static/img/women.png" mode=""></image>
						
						<view class="utag utag-1 absolute padding-xs radius5">{{userMsg.userName}}</view>
						<view class="utag utag-2 absolute padding-xs radius5">{{userMsg.age}}岁</view>
						<view class="utag utag-3 absolute padding-xs radius5">{{userMsg.sex}}</view>
						<view class="utag utag-4 absolute padding-xs radius5">到店{{userMsg.times}}次</view>
						
					</view>
				</view>
			</view>
			<!-- end 人物画像 -->
			
			
			
		</view>

	</view>
</template>

<script>
	export default {
		data () {
			return {
	
			}
		},
		
		onLoad () {
			console.log(this.userMsg);
		},
		computed: {
			userMsg () {
				return this.$store.state.currentUserData;
			}
		},
		methods: {
			// 图片预览
			previewImg () {
				let urls = [this.userMsg.userImg]
				uni.previewImage({ current: 0, urls: urls });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mt130 { margin-top: 130upx; }
	.userDetailPage { min-height: 100vh; }
	.userDetail-content { 
		.userHead { height: 400upx; width: 100%; }
		.userImg { width: 100%; height: 400upx; }
		.userTag { 
			height: 200upx; width: 520upx; right: 0; bottom: -100upx; background-color: #DB0E28; 
			border-radius: 20upx 0 0 20upx; box-shadow: 0 0 16upx 2upx rgba(219, 14, 40, 0.7);
			.userHeadimg {	
				width: 160upx; height: 200upx; max-width: 160upx; min-width: 160upx; flex: 1;
				.img { width: 140upx; height: 140upx; }
			}
			.userHeadmsg { height: 200upx; flex: 1; }
		}
		
		// 消费记录
		.payRecord { 
			height: 230upx; width: 100%; 
			.payRecordImg { 
				height: 100%; width: 140upx; flex: 1; max-width: 140upx; min-width: 140upx; 
				.img { width: 140upx; height: 140upx; }
			}
			.payRecordMsg { flex: 1; height: 100%; }
		}
		
		// 人物画像
		.userDrawer {
			height: 420upx; width: 100%;
			.img { width: 260upx; height: 260upx; }
			.utag { box-shadow: 0 0 10upx 2upx rgba(84, 152, 228, 0.7); }
			.utag-1 { top: 0; left: -100upx; }
			.utag-2 { top: 0; right: -100upx; }
			.utag-3 { bottom: 0; right: -100upx; }
			.utag-4 { bottom: 0; left: -100upx; }
		}
		 
	}
	
	
</style>
