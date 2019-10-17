import Vue from 'vue';

const isType = Type => target => `[object ${Type}]` === Object.prototype.toString.call(target);

// 判断是否是数组
export const IsArray = isType('Array');

// 判断是否是字符串
export const IsString = isType('String');

// 判断是否是对象
export const IsObject = isType('Object');


// 错误提示
export const showMessage = (message, duration = 1500) => {
  uni.showToast({
    title: message || '服务繁忙', icon: 'none', duration: duration
  });
};


// 获取状态栏高度
export const getStatusBar = () => {
	console.log('run');
	let e = uni.getSystemInfoSync();
		
	// #ifndef MP
	Vue.prototype.StatusBar = e.statusBarHeight;
	console.log(Vue.prototype.StatusBar);
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


// 监听网络状态
export const listenNetworkStatus = () => {
  // 监听网络变化
  uni.onNetworkStatusChange(function (res) {
  	console.log(res);
  	if (!res.isConnected || res.networkType === 'none') {
  		Vue.prototype.hasNetWork = false;
  		return uni.showToast({ title: '无法连接到网络，请检查网络设置', icon: 'none' });
  	} 
  	Vue.prototype.hasNetWork = true;
  	if (res.networkType !== 'wifi' && res.networkType !== 'ethernet') {
  		return uni.showToast({ title: '当前使用的是手机流量，请注意', icon: 'none' });
  	}
  });
  // 获取当前网络
  uni.getNetworkType({
  	success: function (res) {
  		console.log(res);
  		if (res.networkType === 'none') {
  			Vue.prototype.hasNetWork = false;
  			return uni.showToast({ title: '无法连接到网络，请检查网络设置', icon: 'none' });
  		} 
  		Vue.prototype.hasNetWork = true;
  		if (res.networkType !== 'wifi' && res.networkType !== 'ethernet') {
  			return uni.showToast({ title: '当前使用的是手机流量，请注意', icon: 'none' });
  		}
  	}
  });
};