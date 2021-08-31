<template>
  <view class="footer" @click="$emit('call')">
    <image class="icon" src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-contact.png" />
    <text class="text">联系客服</text>
  </view>
</template>

<script>
export default {
  name: 'jump-to'
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 0;
  letter-spacing: 2rpx;
  overflow: hidden;
  background-image: linear-gradient(45deg, #ff743c, #ff1c3d);

  .icon {
    width: 40rpx;
    height: 38rpx;
  }

  .text {
    margin-left: 12rpx;
  }
}
</style>
