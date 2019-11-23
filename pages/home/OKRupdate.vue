<template>
  <!-- 更新进度OKR页面 -->
  <view>
    <cu-custom bgcolor="bg-yellow" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">更新进度</block>
    </cu-custom>
    <!-- O -->
    <view class="padding-xl radius" :class="OKRType[formInfo.type].bgc">
      <view>
        <span class="cu-tag light bg-grey">{{OKRType[formInfo.type].name}}</span>
        <span style="padding-left: 20upx;">{{formInfo.startdate}} ~ {{formInfo.enddate}}</span>
      </view>
      <view class="cardTitle">
        <span>{{formInfo.title}}</span>
      </view>
      <view class="cu-progress round sm striped active">
        <view
          :class="OKRType[formInfo.type].bgc_pro1"
          :style="[{ width:formInfo.progress ? formInfo.progress + '%':''}]"
        ></view>
      </view>
    </view>

    <view class="cu-card dynamic" v-for="(KR,index) in formInfo.KR" :key="index">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="padding okrbottom">
              <!-- top -->
              <view class="flex justify-between">
                <view>{{KR.title}}</view>
                <view>{{KR.startnum}} -> {{KR.endnum}}</view>
              </view>
              <!-- progress -->
              <view class="cu-progress round margin-top">
                <view
                  :class="OKRType[formInfo.type].bgc_pro2"
                  :style="[{ width:KR.progress ? KR.progress + '%':''}]"
                >{{KR.progress}}%</view>
              </view>
					</view>
				</view>
				<view class="">
					<form>
            <view class="cu-form-group margin-top">
              <view class="title">当前进度</view>
              <input placeholder="填写数值" name="input" v-model="KR.progress"></input>
            </view>
            <view class="cu-form-group">
              <view class="title">信心指数</view>
              <input placeholder="三字标题" name="input"></input>
            </view>
          </form>
				</view>

				
			</view>
		</view>


    <view class="padding flex flex-direction">
      <button class="cu-btn bg-yellow margin-tb-sm lg" @click="determine">确定</button>
    </view>
  </view>
</template>

<script>
import api from "@/api/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      formInfo: {
				type: 0,
				title: '',
				description: '',
				startDate: '',
				endDate: '',
				progress: '0',
				person: [],
				KR: [
					// {title: '达到一定效果的时候', progress: '30', type: 'NU', numOpen: '0', numOut: '80' },
					// {title: '达到一定效果的时候', progress: '60', type: 'NU', numOpen: '0', numOut: '80' },
					// {title: '达到一定效果的时候', progress: '80', type: 'NU', numOpen: '0', numOut: '80' }
				]
      }
    };
  },
  onLoad(option){
    this.formInfo = JSON.parse(decodeURIComponent(option.data))
    console.log(this.formInfo)
  },
  computed: {
    ...mapState(["OKRType", "member", "userInfo"])
  },
  methods: {
    
    // 确认保存
    async determine() {
      this.formInfo["username"] = this.userInfo.username;
      let params = this.formInfo;
      let res = await api.okr.saveOKRInfo(params);
      uni.navigateTo({
        url: "/pages/home/home"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.okrbottom{
  position: relative;
}
.okrbottom:after{
  position: absolute;
	top: 0;
	left: 0;
	box-sizing: border-box;
	width: 200%;
	height: 200%;
	border-bottom: 1upx solid #ddd;
	border-radius: inherit;
	content: " ";
	transform: scale(.5);
	transform-origin: 0 0;
	pointer-events: none
}
</style>