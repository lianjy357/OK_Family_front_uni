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

const app = new Vue({
    ...App
})
app.$mount()
