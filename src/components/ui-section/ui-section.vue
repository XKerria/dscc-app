<template>
  <view class="ui-section">
    <view class="dot"></view>
    <view class="title">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ui-section'
}
</script>

<style lang="scss" scoped>
.ui-section {
  width: 100%;
  display: flex;
  align-items: center;

  .dot {
    width: 8rpx;
    height: 36rpx;
    background-color: $u-type-primary;
  }

  .title {
    margin-left: 30rpx;
    letter-spacing: 4rpx;
    font-size: 36rpx;
    font-weight: bold;
  }
}
</style>
