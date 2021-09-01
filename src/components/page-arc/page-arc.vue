<template>
  <view class="page-arc">
    <view class="content">
      <view class="arc"></view>
      <view class="default">
        <slot></slot>
      </view>
    </view>

    <view class="footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ui-arc'
}
</script>

<style lang="scss" scoped>
.page-arc {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;

    .arc {
      position: absolute;
      width: 100vw;
      height: 330rpx;
      top: 0;
      left: 0;
      right: 0;
      z-index: 0;
    }

    .arc::after {
      content: '';
      position: absolute;
      z-index: -1;
      bottom: 0;
      left: calc(50% - 1500rpx);
      width: 3000rpx;
      height: 3000rpx;
      border-radius: 50%;
      background-image: linear-gradient(to bottom, #ff6137 2670rpx, #ff2e3b);
      overflow: hidden;
    }

    .default {
      position: relative;
      z-index: 1;
      padding: 0 30rpx;
    }
  }
}
</style>
