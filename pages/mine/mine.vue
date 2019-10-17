<template>
  <view class="selfPage">
		<image class="selfPage-bgImg" src="/static/img/bg.png" mode=""></image>
		<!-- 导航栏状态栏 -->
    <cu-custom bgColor="text-white" :isBack="false">
			<block slot="content"><text class="text-bold fz40">我的</text></block>
		</cu-custom>

    <!-- 页面主体 -->
    <view class="selfContainer relative">

      <view class="top">
        <!-- <view class="cu-avatar xl round image" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view> -->
        <view class="cu-avatar xl round image">
          <image class="avatar-img round" :src="headImg" mode=""></image>
        </view>
        <view class="name">昵称</view>
      </view>
      <!--  -->

      <!--  -->
      <view class="relative scroll-container margin-top">
      <scroll-view scroll-y="true" class="scroll-rank">
        <view class="cu-list menu sm-border">
          <!-- <view class="cu-item" @click="clickList" data-bar="info" :class="true?'arrow':''">
            <view class="content flex align-center">
              <text class="cuIcon-text fz48 mr10 text-purple" style="width: auto;"></text>
							<text class="text-grey">我的订单</text>
            </view>
          </view> -->
          <!-- <view class="cu-item" @click="clickList" data-bar="exercise" :class="true?'arrow':''">
            <view class="content flex align-center">
              <text class="cuIcon-friendadd fz48 mr10 text-cyan" style="width: auto;"></text>
							<text class="text-grey">分享</text>
            </view>
          </view> -->
          <!-- <view class="cu-item" @click="clickList" data-bar="games" :class="true?'arrow':''">
            <view class="content">
							<text class="cuIcon-expressman fz48 mr10 text-red" style="width: auto;"></text>
              <text class="text-grey">上门服务</text>
            </view>
          </view> -->
					<view class="cu-item" @click="clickList" data-bar="analysis" :class="true?'arrow':''">
					  <view class="content">
							<text class="cuIcon-rank fz48 mr10 text-red" style="width: auto;"></text>
					    <text class="text-grey">数据分析</text>
					  </view>
					</view>
          <view class="cu-item" @click="clickList" data-bar="setup" :class="true?'arrow':''">
            <view class="content flex align-center">
              <text class="cuIcon-settings fz48 mr10 text-grey" style="width: auto;"></text>
							<text class="text-grey">设置</text>
            </view>
          </view>
          <view class="cu-item" @click="clickList" data-bar="changePassword" :class="true?'arrow':''">
            <view class="content flex align-center">
              <text class="cuIcon-unlock fz48 mr10 text-green" style="width: auto;"></text>
							<text class="text-grey">修改密码</text>
            </view>
          </view>
					<view class="cu-item" @click="clickList" data-bar="feedback" :class="true?'arrow':''">
					  <view class="content flex align-center">
					    <text class="cuIcon-edit fz48 mr10 text-pink" style="width: auto;"></text>
					    <text class="text-grey">意见反馈</text>
					  </view>
					</view>
					<view class="cu-item" @click="clickList" data-bar="about" :class="true?'arrow':''">
					  <view class="content flex align-center">
					    <!-- <image src="/static/image/icon_Complaint.png" class="png mr10" mode="aspectFit"></image> -->
					    <text class="cuIcon-group fz48 mr10 text-blue" style="width: auto;"></text>
							<text class="text-grey">关于我们</text>
					  </view>
					</view>
          <view class="cu-item" @click="clickLogout" :class="true?'arrow':''">
            <view class="content flex align-center">
              <text class="cuIcon-pullleft fz48 mr10" style="color: #7180EE; width: auto;"></text>
							<text class="text-grey">退出登录</text>
            </view>
          </view>
        </view>
      </scroll-view>
      </view>
      
    </view>
		

    <!-- 弹窗提示 -->
		<view class="cu-modal" :class="modalName ?'show':''" @click="modalName = false" @touchmove.stop="">
			<view class="cu-dialog tipModal" @click.stop="">
				<view class="bg-white radius10 tipModal flex flex-direction justify-end">
					<view class="flex-1 flex flex-direction justify-center align-center">
						<image class="icon-tip" src="/static/tabbar/icon_notice.png" mode=""></image>
						<text class="fz30 margin-top-xs">是否退出登录</text>
					</view>
					<view class="bg-gradual-btn flex">
            <view class="cu-btn flex-sub item-ok" @tap="gotoLogin">退出</view>
            <view class="cu-btn flex-sub item-can" @tap="modalName = false">取消</view>
          </view>
				</view>
		
			</view>
		</view>
		<!-- end弹窗提示 -->


  </view>
</template>

<script>

  export default {
    data () {
			return {
        headImg: '' || '/static/image/icon_head.png', // 头像
        modalName: false, // 显示模态框
			}
    },
    created() {

    },
 
    methods: {
      // 触发按钮
      clickList(e) {
        uni.navigateTo({
          url: '/pages/mine/' + e.currentTarget.dataset.bar
        })
      },
      // 退出登录
      clickLogout() {
        this.modalName = true;
      },
      // 确认退出
      async gotoLogin() {
         uni.reLaunch({
           url: '/pages/login/login'
         })
      }
    }
  }
</script>

<style lang="scss" scoped>
.avatar-img { width: 128upx; height: 120upx; }
.selfPage { min-height: 100vh; background: #F3F3F3; }
.selfPage-bgImg { width: 100%; height: 672upx; position: fixed; top: 0; left: 0;  }

.selfContainer {
  top: 20upx; margin: 0 auto; z-index: 2;
   border-radius: 12upx; overflow: hidden;
}
.scroll-container {
  height: calc(70vh - 120upx);
  .scroll-rank{ height:100%; }
}
.top{
  margin-bottom:20upx;
  text-align: center;
  .image{
    border: 5upx solid #fff;
  }
  .name{
    color: #fff;
    font-size: 35upx;
  }
}
.showBox{
  overflow: hidden; margin-right: 30upx; margin-left: 30upx; border-radius: 20upx;
  padding: 20upx 0upx;
  background-color: #fff;
  .table{
    display: table;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    .table-tr{
      // border-right: 1upx solid #dadada;
      display: table-row;
      border-bottom:0;
      .table-td{
        display: table-cell;
        vertical-align:middle;
        border-top: 0;
        border-right: 1upx solid #dadada;
        border-bottom: 1upx solid #dadada;
        border-left: 0;
      }
      .table-td:last-child{
        border-right: none;
        // border-bottom: none;
      }
      .table-bottom{
        border-bottom: none;
      }
      
      .item-title{
        font-weight: bold;
        font-size: 35upx;
        
      }
      .munber{
        font-weight: bold;
        font-size: 55upx;
      }
      .text{
        font-size: 25upx;
      }
      .table-img{
        width: 70upx;
        height: 40upx;
      }
      .paihang-munber{
        font-weight: bold;
        font-size: 55upx;
        color: #faa005;
        margin-top:30upx;
      }
    }
  }
  
}
// 弹窗提示

.tipModal { width: 600upx; height: 300upx; } 
.bg-gradual-btn { 
	background-blend-mode: normal, normal;
}
.icon-tip { width: 100upx; height: 100upx; }
.flex-1 { flex: 1; }
.item-ok{
  height: 100upx;
  background-image: linear-gradient(90deg, rgba(116, 174, 255, 0.473) 0%, rgba(135, 115, 237, 0.384) 100%), linear-gradient(#ffffff, #ffffff);
  line-height: 100upx;
	color: rgb(255, 0, 0);

  text-align: center;
}
.item-can{
  text-align: center;
  height: 100upx;
	line-height: 100upx;
}
</style>
