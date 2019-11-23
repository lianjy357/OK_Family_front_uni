import Vue from 'vue';
import Vuex from 'vuex';

// import match from './modules/match.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false, // 是否处于登录状态
		userInfo: {}, // 登录用户信息
		member: [ // 成员
			{username: 'lianjy', nickname: '大白'},
			{username: 'wangy', nickname: '小雨'}
		],

		
		OKRType: [
			{type: 0, name: '成员', bgc: 'bg-red', bgc_pro1: 'bg-yellow', bgc_pro2: 'bg-green'},
			{type: 1, name: '家庭', bgc: 'bg-blue', bgc_pro1: 'bg-olive', bgc_pro2: 'bg-green'}
		],
		KRType: [
			{type: 'NUM', name: '数字型', context: '发表公众号5篇文章'},
			{type: 'PER', name: '百分比型', context: '学习视频《小王子》，完成63%进度'},
		]
		
	},
	mutations: {
		// 登录
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
		},
		
	},
	actions: {

	},
	modules:{
		// match
	}
})

export default store
