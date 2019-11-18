<template>
	<view class="loginPage bg-gradual-red">
		<!-- <image class="fixed loginBg" src="/static/image/bg.jpg" mode=""></image> -->
		
		<!-- logo -->
		<view class="loginBox">
			<!-- <image class="logo" src="/static/image/login_title.png" mode="aspectFit"></image> -->
      <text class="logo title-text">欢迎光临·人脸轨迹系统</text>
		</view>

		<view class="loginForm flex flex-direction align-center bg-white relative">

      <view class="nav round fz24 text-grey text-bold flex mt50">
				<view class="nav-item round flex justify-center align-center" :class="index==currentTab?'bg-active cur':''" v-for="(item, index) in type" 
				:key="index" @tap="tabSelect(item, index)">
					{{item.label}}
				</view>
			</view>

			<swiper class="swiperContiner w100 mt50" :current="currentTab" @change="switchForm">
				<swiper-item>
						<!-- 登录 -->
						<view class="pl88 pr88">
							<view class="inputItem mt50 itemShadow relative" :class="[currentFocus == 1 ? 'box-color' : '']" >
								<image class="icon1 absolute" src="/static/tabbar/yonghu.png" mode="aspectFit"></image>
								<input @focus="currentFocus = 1" @blur="currentFocus = 0"
								 class="pl70 primary-color h100" type="text" placeholder-class="text-gray" maxlength="11" v-model="loginForm.userName" placeholder="请输入用户名"/>
							</view>
							<view class="inputItem mt50 itemShadow relative" :class="[currentFocus == 2 ? 'box-color' : '']">
								<image class="icon2 absolute" src="/static/tabbar/mima.png" mode="aspectFit"></image>
								<input @focus="currentFocus = 2" @blur="currentFocus = 0" :password="true" class="pl70 h100 primary-color" type="text" maxlength="15" placeholder-class="text-gray" v-model="loginForm.password" placeholder="请输入密码">
							</view>
							<view class="primary-color mt20 fz28 flex justify-end" @tap="resetPassword">
								<text>忘记密码?</text>
							</view>
							<!-- 登录按钮 -->
							<view class="cu-btn round submitBtn lg mt80 mb50 itemShadow shadow-blur" @tap="submit">登录</view>

							<view class="flex justify-center align-center">
								<!-- <image style="width:40upx;height:40upx;" class="mr15" src="/static/tabbar/icon_question.png" mode="aspectFit"></image>  -->
								<text class="text-gray">有问题请大白</text>
							</view>
						</view>
				</swiper-item>


				<!-- 注册 -->
				<swiper-item>
					
					<view class="pl88 pr88">
						<view class="inputItem mt40 itemShadow relative" :class="[currentFocus == 3 ? 'box-color' : '']">
							<image class="icon1 absolute" src="/static/tabbar/yonghu.png" mode="aspectFit"></image>
							<input @focus="currentFocus = 3" @blur="currentFocus = 0"
							class="pl70 h100 primary-color" type="text" placeholder-class="text-gray" maxlength="30" v-model="registerForm.userName" placeholder="请输入用户名"/>
						</view>
						<view class="inputItem mt40 itemShadow relative pr200" :class="[currentFocus == 4 ? 'box-color' : '']">
							<image class="icon3 absolute" src="/static/tabbar/dunpai.png" mode="aspectFit"></image>
							<input @focus="currentFocus = 4" @blur="currentFocus = 0"
							class="pl70  primary-color h100" type="text" placeholder-class="text-gray" maxlength="30" v-model="registerForm.helloCode" placeholder="请输入邀请码">
							<!-- <view v-show="loginData.showVcode" @click="getVcode()" class='verifyBtn round flex justify-center align-center bg-active shadow-blur'>验证码</view>
							<view v-show="!loginData.showVcode" class='verifyBtn round flex justify-center align-center bg-grey shadow-blur'>{{loginData.timer}}s</view> -->
						</view>
						<view class="inputItem mt40 itemShadow relative" :class="[currentFocus == 5 ? 'box-color' : '']">
							<image class="icon2 absolute" src="/static/tabbar/mima.png" mode="aspectFit" @click="showPassword"></image>
							<input @focus="currentFocus = 5" @blur="currentFocus = 0"
							:password="registerForm.showPassword" class="pl70 h100 primary-color" type="text" placeholder-class="text-gray" maxlength="15" v-model="registerForm.password" placeholder="请输入6~15位数字或字母密码">
						</view>
						
						<view class="cu-btn round submitBtn mt50 mb30 lg bg-cyan itemShadow shadow-blur" @tap="register">注册</view>

						<view class="flex justify-center align-center">
							<!-- <image style="width:38upx;height:38upx;" class="mr15" src="/static/tabbar/icon_question.png" mode="aspectFit"></image>  -->
							<!-- <text class="text-gray">有问题请联系客服</text> -->
						</view>
					</view>

				</swiper-item>
			</swiper>
		
		</view>

	
		<!-- 审核驳回 窗口 -->
		<view class="mask mask-show"  @click="TipPopShow = false" v-if="TipPopShow" @touchmove.stop.prevent="preventTouchMove">
			<image class="qrcodeImg mb25" src="/static/image/qrcode.png" mode=""></image>
			<view class="title">抱歉，你未通过审核，请扫码联系主办方</view>
			<view class="tipBtn bg-active flex align-center justify-center round mt35">确定</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
import api from '@/api/index.js';
import { showMessage } from '@/lib/base.js';
import { isMobile } from '@/lib/reg.js';
import { getStatusBar } from '@/lib/base.js';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      type: [
        { value: 'login', label: '登录', },
        { value: 'register', label: '注册' }
      ],
      TabCur: 'login',
			currentTab: 0,
      loginForm: { // 登录数据
        userName: '',
        password: ''
      },
			registerForm: { // 注册数据
				userName: '',
				helloCode: '', // 邀请码
				password: '',
				showPassword: false, // 显示密码
			}
    }
  },
	onLoad () {
		getStatusBar();
	},
  methods: {
		...mapMutations(['login']),
    // 切换标签
    tabSelect(item, index) {
      this.currentTab = index;
      this.resetForm();
    },
    // 切换表单
    switchForm (e) {
      let currentIndex = e.detail.current;
      this.currentTab = currentIndex;
      this.resetForm();
    },
    // 清空表单
    resetForm () {
      this.loginForm.userName = '';
      this.loginForm.password = '';
      this.loginForm.vPassword = '';
      this.loginForm.vCode = '';
		},
		// 显示密码
		showPassword(){
			this.registerForm.showPassword = !this.registerForm.showPassword
		},
    // 登录
    async submit () {
      if (!this.loginForm.userName) return showMessage('请输入用户名');
      if (!this.loginForm.password) return showMessage('请输入用户密码');
      let params = {
				username: this.loginForm.userName,
				password: this.loginForm.password
			};
      // this.loading = true;
			let res = await api.user.userLogin(params);
			if (res.code === 10000) {
				showMessage('登录成功');
				this.login(res.data);
				uni.navigateBack();
				return
			} else {
				return showMessage(res.msg);
			}
      
      // if (data.code !== 0) {
      //   setTimeout(() => { this.loading = false; }, 300);
      //   return showMessage(data);
      // }
      // this.loginSuccess();	
    },
		// 注册
		async register () {
			let params = {
				userName: this.registerForm.userName,
				password: this.registerForm.password,
				helloCode: this.registerForm.helloCode
			};
			const data = await api.user.userRegister(params)
		}
  },
}
</script>

<style scoped lang="scss">
.loginPage {  min-height: 100vh;	padding-top: 80upx; }

// 导航
.nav { height: 48upx; background-color: #eeeeee; }
.nav-item { width: 107upx; height: 48upx;  }

.swiperContiner { height: 580upx; }
.loginBg {	width: 100%; height: 100%; left: 0; top: 0; z-index: -1; }
.loginBox { width: 100%; margin: 0 auto; }
.logo { width: 750upx; height: 515upx; display: block; margin: 0 auto; }
.title-text{
  line-height: 300upx;text-indent: 50upx;font-size: 50upx;font-family: 'SimHei';
}
// .logoText::first-letter { font-size: 70upx; }

.loginForm { 
	margin: 0 auto; border-radius: 14upx; top: -50upx;
	padding-bottom: 20upx; width: 674upx;

	.icon{	height: 50upx;	width: 50upx;	left: 10upx;	top: 5upx; }
	.icon1 { width: 31upx; height: 52upx; top: 10upx; left: 19upx; }
	.icon2 { width: 37upx; height: 43upx; top: 13upx; left: 16upx; }
	.icon3 { width: 39upx; height: 45upx; top: 13upx; left: 15upx; }
	.inputItem { width: 100%; height: 72upx; display: block; transition: all .3s linear;  }
	.itemShadow {
		box-shadow: 0 1upx 0upx 0upx rgba(0, 0, 0, 0.1); 
	}
	.itemShadow.box-color {
		box-shadow: 0 1upx 0upx 0upx rgba(244, 62, 59, 0.7);
	}
	.from-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.submitBtn {
		width: 100%; height: 80upx;
		background-image: linear-gradient(90deg, #f43f3b 0%, #ec008c 100%), linear-gradient(#ffffff, #ffffff);
    color: #ffffff;
	}
}

.bg-active { background-image: linear-gradient(45deg, #f43f3b, #ec008c); color: #ffffff; }
.primary-color { color: #7B9CFA; }


.pr200 { padding-right: 200upx; }
.verifyBtn { width: 200upx; height: 60upx; top: 5upx; right: 0; position: absolute; }

.mask {
  /* pointer-events: none; */
  position: fixed; z-index: 99999; top: 0; left: 0; right: 0; bottom: 0; height: 100vh; width: 100vw;
  display: flex; flex-direction:column; justify-content: center; align-items: center;	flex-wrap: wrap;
}
.mask.mask-show{	background: rgba(7, 17, 27, .7); }
.title{ color: #fff;	font-size: 28upx; }
.qrcodeImg { width: 175upx; height: 175upx; }
.tipBtn { width: 500upx; height: 68upx; }
</style>
