<template>
  <!-- 新增OKR页面 -->
  <view>
    <cu-custom bgColor="bg-yellow" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关键结果</block>
		</cu-custom>

    <form>

      <view class="cu-form-group">
				<view class="title">关键结果</view>
				<input name="input" v-model="KR.title"></input>
			</view>

			<view class="cu-form-group" @click="toggleMask('show')">
				<view class="title">类型选择</view>
				<view class="pickerRun">
					<view class="pickerRunshow" v-for="(item,index) in KRType" :key="index">
						<text v-if="item.type === KR.type">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">目标值</view>
				<input mode="number" name="input" maxlength="2" v-model="KR.endNum" placeholder='根据类型填写数值'></input>
				<text v-if="KR.type === 'PER'">%</text>
			</view>
			<view class="cu-form-group">
				<view class="title">信心值</view>
				<input mode="number" name="input" maxlength="2" v-model="KR.confidenceNum" placeholder='你能做到十分之几的信心(5/10)'></input>
				<text>/10</text>
			</view>

    </form>
    <view class="padding flex flex-direction">
			<button class="cu-btn bg-yellow margin-tb-sm lg" @click="determine">确定</button>
		</view>

    <!-- 弹出面板-类型面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in KRType" :key="index" @click="toggleMask(index)">
					<view class="con">
						<view class="left">
							<text class="title">{{item.name}}</text>
							<text class="time">{{item.context}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>


  </view>
</template>

<script>
import { mapState } from 'vuex';  
export default {
	data(){
		return{
			KR: {
				title: '', // 标题
				progress: 0, // 进度（默认值为0）
				type: 'NUM', // 类型选择
				startNum: 0, // 起始值，默认值为0
				endNum: '', // 目标值
				confidenceNum: '', // 信心指数
			},
			maskState: 0, //优惠券面板显示状态
		}
	},
	computed: {
		...mapState(['KRType','member'])
	},
	methods:{
    // 点击确定键
    determine(){
      if (!this.KR.title){return this.$api.msg('请输入关键结果')}
      if (!this.KR.endNum){return this.$api.msg('请输入目标值')}
      if (!(this.KR.endNum>0)){return this.$api.msg('请输入大于0的目标值')}
      if (!this.KR.confidenceNum){return this.$api.msg('请输入信心指数')}
      if (!(this.KR.confidenceNum>0) || !(this.KR.confidenceNum<=10)){return this.$api.msg('请输入大于0小于10信心指数')}
      this.$api.prePage().formInfo.KR.push(this.KR);
    },
		//显示类型面板
    toggleMask(type){
      let timer = type === 'show' ? 10 : 300;
      let	state = type === 'show' ? 1 : 0;
      this.maskState = 2;
      if (typeof type === 'number') {
        this.KR.type = this.KRType[type].type
      }
      setTimeout(()=>{
        this.maskState = state;
      }, timer)
		},
		stopPrevent(){}
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
/* 上拉框面板 */
.mask{
  display: flex;
  align-items: flex-end;
  position: fixed;
  left: 0;
  top: var(--window-top);
  bottom: 0;
  width: 100%;
  background: rgba(0,0,0,0);
  z-index: 9995;
  transition: .3s;
  
  .mask-content{
    width: 100%;
    min-height: 20vh;
    max-height: 70vh;
    background: #f3f3f3;
    transform: translateY(100%);
    transition: .3s;
    overflow-y:scroll;
  }
  &.none{
    display: none;
  }
  &.show{
    background: rgba(0,0,0,.4);
    
    .mask-content{
      transform: translateY(0);
    }
  }
}
/* 上拉框列表 */
.coupon-item{
  display: flex;
  flex-direction: column;
  margin: 20upx 24upx;
  background: #fff;
  .con{
    display: flex;
    align-items: center;
    position: relative;
    height: 120upx;
    padding: 0 30upx;
    &:after{
      position: absolute;
      left: 0;
      bottom: 0;
      content: '';
      width: 100%;
      height: 0;
      border-bottom: 1px dashed #f3f3f3;
      transform: scaleY(50%);
    }
  }
  .left{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    overflow: hidden;
    height: 100upx;
  }
  .title{
    font-size: 32upx;
    color: #303133;
    margin-bottom: 10upx;
  }
  .time{
    font-size: 24upx;
    color: #909399;
  }
  .right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26upx;
    color: #f8f8f8;
    height: 100upx;
  }
  .price{
    font-size: 44upx;
    color: #fa436a;
    &:before{
      content: '￥';
      font-size: 34upx;
    }
  }
  .tips{
    font-size: 24upx;
    color: #909399;
    line-height: 60upx;
    padding-left: 30upx;
  }
  .circle{
    position: absolute;
    left: -6upx;
    bottom: -10upx;
    z-index: 10;
    width: 20upx;
    height: 20upx;
    background: #f3f3f3;
    border-radius: 100px;
    &.r{
      left: auto;
      right: -6upx;
    }
  }
}
</style>