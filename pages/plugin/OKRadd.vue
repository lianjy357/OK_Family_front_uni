<template>
  <!-- 新增OKR页面 -->
  <view>
    <cu-custom bgColor="bg-yellow" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">新增</block>
		</cu-custom>
    <form>
      <view class="cu-form-group">
				<view class="title">目标名称</view>
				<input name="input"></input>
			</view>
      <view class="cu-form-group">
				<view class="title">负责人</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
    </form>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>