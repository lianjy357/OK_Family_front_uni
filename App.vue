<script>
	import Vue from 'vue'
	import {mapMutations } from 'vuex';
	export default {
		methods: {
			...mapMutations(['login'])
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					console.log(e)
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					console.log(e.statusBarHeight)
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			// 判断用户是否已经登录
			let userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo){
				//更新登陆状态
				this.login(userInfo);
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style lang="scss">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "/static/css/commom.scss";
	
	.main-color { color: #E9102E; }
	.main-bg { background-color: #E9102E; color: #FFFFFF; }
</style>
