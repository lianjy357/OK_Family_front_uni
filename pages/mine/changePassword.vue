<template>
  <view>
    <cu-custom bgColor="bg-gradual-red" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">修改密码</block>
    </cu-custom>
    <view>
      <!--  -->
      <form>

        <view class="cu-form-group margin-top">
          <view class="title">原密码</view>
          <input :password="true" type="text" maxlength="15" v-model="resetForm.password" placeholder="请输入6~15位数字或字母密码"></input>
        </view>

        <view class="cu-form-group">
          <view class="title">新密码</view>
          <input :password="true" type="text" maxlength="15" v-model="resetForm.password" placeholder="请输入6~15位数字或字母密码"></input>
        </view>

        <view class="cu-form-group">
          <view class="title">再次确认</view>
          <input :password="true" type="text" maxlength="15" v-model="resetForm.password" placeholder="再次确认新密码"></input>
        </view>
        
      </form>

      <view class="margin-top">
        <view class="cu-btn block bg-button margin-tb-sm lg" :disabled="false" @click="upData">重 置</view>
      </view>

      <!-- 弹窗提示 -->
      <view class="cu-modal" :class="modalName ?'show':''" @click="modalName = false" @touchmove.stop="">
        <view class="cu-dialog tipModal" @click.stop="">
          <view class="bg-white radius10 tipModal flex flex-direction justify-end">
            <view class="flex-1 flex flex-direction justify-center align-center">
              <image class="icon-tip" src="/static/image/icon_notice.png" mode=""></image>
              <text class="fz30 margin-top-xs">密码修改成功！</text>
            </view>
            <view class="cu-btn bg-gradual-btn lg" @tap="gotoLogin">我知道了</view>
          </view>
      
        </view>
      </view>
      <!-- end弹窗提示 -->

    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      resetForm: {
        password: ''
      },
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.bg-button{
  background-image: linear-gradient(90deg, #f43f3b 0%, #ec008c 100%), linear-gradient(#ffffff, #ffffff);
	background-blend-mode: normal, normal;
	color: #FFFFFF;
}
</style>