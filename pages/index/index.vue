<template>
	<view>
		<Home v-if="PageCur=='home'"></Home>
		<Milepost v-if="PageCur=='milepost'"></Milepost>
		<Mine v-if="PageCur=='mine'"></Mine>
		
		<!-- 底部导航栏 -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<!-- OKR -->
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [PageCur=='home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-red':'text-gray'">有目标</view>
			</view>
			
			<!-- MP -->
			<view class="action" @click="NavChange" data-cur="milepost">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/search' + [PageCur == 'milepost'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='milepost'?'text-red':'text-gray'">更专注</view>
			</view>
			
			<!-- 我的 -->
			<view class="action" @click="NavChange" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/mine' + [PageCur == 'mine'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='mine'?'text-red':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
		return {
				PageCur: 'home'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
