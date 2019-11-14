<template>
  <!-- 家庭成员页面 -->
  <view>
    <cu-custom bgColor="bg-yellow" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">成员</block>
		</cu-custom>
    <checkbox-group class="block" @change="CheckboxChange">
      <view class="margin-top"></view>
      <view class="cu-form-group" v-for="(item,index) in member" :key="index">
        <view class="title">{{item.nickname}}</view>
        <checkbox :class="select.indexOf(item.username)>=0?'checked':''" :checked="select.indexOf(item.username)>=0" :value="item.username"></checkbox>
      </view>
    </checkbox-group>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return{
      select: []
    }
  },
  computed:{
    ...mapState(['member'])
  },
  onLoad(option){
    console.log(option)
    this.select = JSON.parse(option.data)
  },
  methods:{
    // 点击多选框
    CheckboxChange(e){
      this.select = e.detail.value
      this.$api.prePage().formInfo.person = e.detail.value;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>