<template name="components">
  <view>
    <cu-custom bgColor="bg-yellow">
      <block slot="content">有目标</block>
    </cu-custom>
    <scroll-view scroll-y class="page">
      <view>
        <view
          class="margin-bottom"
          @tap="toChild"
          v-for="(item,index) in list"
					:data-index="index"
          :data-data="item"
          :key="index"
        >
          <!-- O -->
          <view class="padding-xl radius" :class="OKRType[item.type].bgc">
            <view>
              <span class="cu-tag light bg-grey">{{OKRType[item.type].name}}</span>
              <span style="padding-left: 20upx;">{{item.startdate}} ~ {{item.enddate}}</span>
            </view>
            <view class="cardTitle">
              <span>{{item.title}}</span>
            </view>
            <view class="cu-progress round sm striped active">
              <view
                :class="OKRType[item.type].bgc_pro1"
                :style="[{ width:item.progress ? item.progress + '%':''}]"
              ></view>
            </view>
          </view>

          <!-- KR -->
          <view class="padding-xs padding-right-xxl padding-left-xxl radius shadow-warp bg-white">
            <view
              class="padding-xs margin-top-xs margin-bottom-xs solids-left"
              v-for="(OR,index) in item.KR"
              :key="index"
            >
              <!-- top -->
              <view class="flex justify-between">
                <view>{{OR.title}}</view>
                <view>{{OR.startnum}} -> {{OR.endnum}}</view>
              </view>
              <!-- progress -->
              <view class="cu-progress round margin-top">
                <view
                  :class="OKRType[item.type].bgc_pro2"
                  :style="[{ width:OR.progress ? OR.progress + '%':''}]"
                >{{OR.progress}}%</view>
              </view>
            </view>
          </view>

        </view>
      </view>
      <view class="cu-tabbar-height"></view>
    </scroll-view>
    <!-- 新增按钮 -->
    <view class="toolbar solid-bottom text-sl padding" @click="add">
      <text class="cuIcon-roundaddfill text-green"></text>
    </view>
    <!-- 新增按钮 -->
  </view>
</template>

<script>
import api from "@/api/index.js";
import { mapState } from "vuex";
export default {
  name: "components",
  data() {
    return {
      list: [
        // {
        // 	type: 1,
        // 	title: '这是目标',
        // 	startDate: '2020-01-01',
        // 	endDate: '2020-03-01',
        // 	progress: '30',
        // 	person: ['大白','小雨'],
        // 	KR: [
        // 		{title: '达到一定效果', progress: '30', type: 'NU', startNum: '0', endNum: '80' }
        // 	]
        // },
        // {
        // 	type: 0,
        // 	title: '这是个人目标',
        // 	startDate: '2020-01-01',
        // 	endDate: '2020-03-01',
        // 	progress: '30',
        // 	person: ['大白'],
        // 	KR: [
        // 		{title: '达到一定效果的时候', progress: '30', type: 'NU', startNum: '0', endNum: '80' },
        // 		{title: '达到一定效果的时候', progress: '60', type: 'NU', startNum: '0', endNum: '80' },
        // 		{title: '达到一定效果的时候', progress: '80', type: 'NU', startNum: '0', endNum: '80' }
        // 	]
        // }
      ]
    };
  },
  computed: {
    ...mapState(["OKRType"])
  },
  mounted() {
    // console.log('zhelikak')
    this.getInfo();
  },
  methods: {
    toChild(e) {
      uni.navigateTo({
        url: '/pages/home/OKRupdate?data=' + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.data))
      });
    },
    // 获取okr信息
    async getInfo() {
      console.log("zheli");
      let params = {};
      let res = await api.okr.getOKRInfo(params);
      if (res.code === 10000) {
        this.list = res.data;
      }
    },
    // 新增OKR
    add() {
      uni.navigateTo({
        url: "/pages/home/OKRadd"
      });
    }
  }
};
</script>

<style>
.page {
  height: calc(100vh - 100upx);
}

.cardTitle {
  color: #fff;
  /* padding: 90upx 60upx; */
  font-size: 38upx;
  font-weight: 300;
  /* transform: skew(-10deg, 0deg); */
  position: relative;
  text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3);
}

/* 工具 */
.toolbar {
  position: fixed;
  right: 30upx;
  bottom: 100upx;
}
</style>
