<template>
  <!-- 新增OKR页面 -->
  <view>
    <cu-custom bgColor="bg-yellow" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">新增</block>
		</cu-custom>

    <form>
      <view class="cu-form-group">
				<view class="title">目标</view>
				<input name="input" v-model="formInfo.title"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">描述</view>
				<input name="input" placeholder="你为什么会制定这个目标？" v-model="formInfo.describe"></input>
			</view>
      <view class="cu-form-group" data-url="/pages/family/family" :data-data="formInfo.person" @click="navClick">
				<view class="title">负责人</view>
				<view class="pickerRun">
					<view class="pickerRunshow">
						<text v-if="!formInfo.person">请选择</text>
						<text v-else v-for="(item,index) in member" :key="index">
							<text :class="formInfo.person.indexOf(item.username)>=0 ? 'margin-left-sm': ''">{{formInfo.person.indexOf(item.username)>=0 ? item.nickname : ''}}</text>
						</text>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">开始时间</view>
				<picker mode="date" :value="formInfo.startDate" :start="startDate" :end="endDate" @change="pickerstartDate">
					<view class="picker">
						{{formInfo.startDate?formInfo.startDate:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">结束时间</view>
				<picker mode="date" :value="formInfo.endDate" :start="startDate" :end="endDate" @change="pickerendDate">
					<view class="picker">
						{{formInfo.endDate?formInfo.endDate:'请选择'}}
					</view>
				</picker>
			</view>
    </form>

		<form>
			<view class="margin-top"></view>

			<view class="cu-form-group" v-for="(item,index) in formInfo.KR" :key="index">
				<view class="title">KR{{index + 1}}</view>
				<view class="pickerRun">
					<view class="pickerRunshow">
						{{item.title}}
					</view>
				</view>
			</view>
			<!-- add -->
			<view class="cu-form-group" data-url="/pages/home/OKRaddKR" :data-data="formInfo.KR" @click="navClick">
				<view class="title">+添加关键结果</view>
				<view class="pickerRun">
					<view class="pickerRunshow">
						新增
					</view>
				</view>
			</view>

		</form>

		<form>
			<view class="cu-form-group margin-top">
				<view class="title">OKR类型</view>
				<picker @change="pickerOKRType" :value="formInfo.type" :range="OKRType" range-key="name">
					<view class="picker">
						{{formInfo.type>-1?OKRType[formInfo.type].name:'请选择'}}
					</view>
				</picker>
			</view>
		</form>

  </view>
</template>

<script>
import { mapState } from 'vuex';  
export default {
	data(){
		return{
			formInfo: {
				type: 0,
				title: '',
				describe: '',
				startDate: this.getDate('start'),
				endDate: this.getDate('appoint'),
				progress: '30',
				person: ['lianjy','wangy'],
				KR: [
					{title: '达到一定效果的时候', progress: '30', type: 'NU', numOpen: '0', numOut: '80' },
					{title: '达到一定效果的时候', progress: '60', type: 'NU', numOpen: '0', numOut: '80' },
					{title: '达到一定效果的时候', progress: '80', type: 'NU', numOpen: '0', numOut: '80' }
				]
			},
		}
	},
	computed: {
		...mapState(['OKRType','member']),
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods:{
		// 选择开始时间
		pickerstartDate(e){
			this.formInfo.startDate = e.detail.value
		},
		// 选择结束时间
		pickerendDate(e) {
			this.formInfo.endDate = e.detail.value
		},
		// 选择OKR类型
		pickerOKRType(e){
			this.formInfo.type = e.detail.value
		},
		// 点击调转事件
		navClick(val){
			console.log(val.currentTarget.dataset.url + '?data=' + JSON.stringify(val.currentTarget.dataset.data))
			uni.navigateTo({
				url: val.currentTarget.dataset.url + '?data=' +  JSON.stringify(val.currentTarget.dataset.data)
			})
			
		},
		// 获取时间周期
		getDate(type) {
			if (type === 'appoint'){ // 指定时间
				var date = new Date();
				date.setMonth(date.getMonth() + 3);
			} else {
				var date = new Date();
			}
			
			
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
					year = year - 0;
			} else if (type === 'end') {
					year = year + 5;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
}
</script>

<style lang="scss" scoped>
.cu-form-group{
	.pickerRun{
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		padding-right: 40rpx;
		overflow: hidden;
		position: relative;
		display: block;
		.pickerRunshow{
			line-height: 100rpx;
			font-size: 28rpx;
			-o-text-overflow: ellipsis;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 100%;
			text-align: right;
		}
		.pickerRunshow::after{
			font-family: cuIcon;
			display: block;
			content: "\E6A3";
			position: absolute;
			font-size: 34rpx;
			color: #8799a3;
			line-height: 100rpx;
			width: 60rpx;
			text-align: center;
			top: 0;
			bottom: 0;
			right: -20rpx;
			margin: auto;
		}
	}
}

</style>