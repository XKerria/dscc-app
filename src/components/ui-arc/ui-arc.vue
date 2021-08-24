<template>
  <view class="ui-arc">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'ui-arc'
}
</script>

<style lang="scss" scoped>
.ui-arc {
  position: relative;
  width: 100vw;
  height: 330rpx;
  z-index: 1;
}

.ui-arc::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: calc(50% - 1500rpx);
  width: 3000rpx;
  height: 3000rpx;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #ff6137 2670rpx, #ff2e3b);
  overflow: hidden;
}
</style>
