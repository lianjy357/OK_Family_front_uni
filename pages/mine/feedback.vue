<template>
  <view>
    <cu-custom bgColor="bg-gradual-red" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">意见反馈</block>
    </cu-custom>
    
    
    <view class="">
			<!-- <view class="updataTitle">您的投诉建议</view> -->
			<view class="padding-xs margin-text">
        <textarea placeholder-class="placeholderhelpText" class="helpText" placeholder="请输入文字……" v-model="text"/>
        <view>
					<button class="cu-btn block bg-button margin-tb-sm lg" :disabled="isDisabled" @click="checkUpdata">提交</button>
				</view>

			</view>
		</view>


  </view>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

.helpText{
  margin: 0 auto;
  background-color: #fff;
}
.bg-button{
  background-image: linear-gradient(90deg, #f43f3b 0%, #ec008c 100%), linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  color: #FFFFFF;
}
</style>