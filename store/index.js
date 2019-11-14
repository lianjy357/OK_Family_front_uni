import Vue from 'vue';
import Vuex from 'vuex';

// import match from './modules/match.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false, // 是否处于登录状态
		userInfo: {}, // 登录用户信息
		
		OKRInfo: [], // OKR信息
		OKRType: [
			{type: 0, name: '成员', bgc: 'bg-red', bgc_pro1: 'bg-yellow', bgc_pro2: 'bg-green'},
			{type: 1, name: '家庭', bgc: 'bg-blue', bgc_pro1: 'bg-olive', bgc_pro2: 'bg-green'}
		],
		member: [ // 成员
			{username: 'lianjy', nickname: '大白'},
			{username: 'wangy', nickname: '小雨'}
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
