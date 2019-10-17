import Vue from 'vue';
import Vuex from 'vuex';

// import match from './modules/match.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false, // 是否处于登录状态
		userInfo: {}, // 登录用户信息
		
		currentUserData: null,		// 当前查看的用户信息
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
		
		setCurrentUserData (state, userData) {
			state.currentUserData = userData;
		}
	},
	actions: {

	},
	modules:{
		// match
	}
})

export default store
