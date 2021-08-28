<template>
  <view class="footer">
    <view class="left" @click="$emit('call')">
      <image class="icon" src="/static/images/icon-contact.png" />
      <text class="text">联系客服</text>
    </view>
    <view class="right" @click="$emit('reserve')">
      <image class="icon" src="/static/images/icon-btn-reserve.png" />
      <text class="text">点击预约</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'service-footer'
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #3a4152;
  color: #fff;
  z-index: 0;
  letter-spacing: 2rpx;
  position: relative;
  overflow: hidden;

  .icon {
    width: 40rpx;
    height: 38rpx;
  }

  .text {
    margin-left: 12rpx;
  }

  .left {
    height: 100rpx;
    width: 375rpx;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .right {
    overflow: hidden;
    flex: 1;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
}

.footer::before {
  content: '';
  width: 375rpx;
  height: 375rpx;
  position: absolute;
  left: 0rpx;
  top: -137rpx;
  border-radius: 0 50% 50% 0;
  background-image: linear-gradient(45deg, #ff743c, #ff1c3d);
  z-index: 1;
}
</style>
