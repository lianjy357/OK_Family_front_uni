import Vue from 'vue'
import App from './App'


// 引入vuex 状态库
import store from "./store";
Vue.prototype.$store = store;

import home from './pages/home/home.vue';
Vue.component('Home', home);

import milepost from './pages/milepost/milepost.vue';
Vue.component('Milepost', milepost);

import mine from './pages/mine/mine.vue';
Vue.component('Mine', mine);

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const msg = (title, duration=1500, mask=false, icon='none')=>{
  //统一提示方便全局修改
  if(Boolean(title) === false){
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon
  });
}

const prePage = ()=>{
  let pages = getCurrentPages();
  let prePage = pages[pages.length - 2];
  // #ifdef H5
  return prePage;
  // #endif
  return prePage.$vm;
}

Vue.prototype.$api = {msg, prePage};

const app = new Vue({
    ...App
})
app.$mount()
