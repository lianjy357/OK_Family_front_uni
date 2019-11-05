import Vue from 'vue'
import App from './App'


// 引入vuex 状态库
import store from "./store";
Vue.prototype.$store = store;

import home from './pages/home/home.vue';
Vue.component('Home', home);

import search from './pages/search/search.vue';
Vue.component('Search', search);

import mine from './pages/mine/mine.vue';
Vue.component('Mine', mine);

import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('cu-custom', cuCustom);


const app = new Vue({
    ...App
})
app.$mount()
