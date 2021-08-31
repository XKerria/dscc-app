<template>
  <view class="card">
    <view class="wrapper">
      <view class="qr">
        <image class="qr-image" :src="setting('客服二维码')" />
        <view class="qr-angle tl"></view>
        <view class="qr-angle tr"></view>
        <view class="qr-angle bl"></view>
        <view class="qr-angle br"></view>
      </view>
    </view>
    <view class="wrapper">
      <view class="contact">
        <view>微信扫码咨询</view>
        <view style="margin-top: 46rpx;">{{ setting('客服人员') }}</view>
        <view>{{ setting('客服电话') }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'card',
  computed: {
    ...mapGetters('glob', ['setting'])
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 300rpx;

  background-color: #fff;
  background-image: url('https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/bg-contact.png');
  background-size: 630rpx 223rpx;
  background-repeat: no-repeat;
  background-position: center;

  border-radius: 10rpx;
  box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;

  .wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.qr {
  box-sizing: border-box;
  padding: 20rpx;
  position: relative;

  &-image {
    width: 200rpx;
    height: 200rpx;
    box-shadow: 0 0 20rpx 0 rgba(255, 28, 61, 0.2);
    border-radius: 10rpx;
  }

  &-angle {
    box-sizing: border-box;
    width: 30rpx;
    height: 30rpx;
    border: 6rpx solid $u-type-primary;
    position: absolute;
  }

  .tl {
    top: 0;
    left: 0;
    border-top-left-radius: 10rpx;
    border-right: none;
    border-bottom: none;
  }

  .tr {
    top: 0;
    right: 0;
    border-top-right-radius: 10rpx;
    border-left: none;
    border-bottom: none;
  }

  .bl {
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 10rpx;
    border-right: none;
    border-top: none;
  }

  .br {
    bottom: 0;
    right: 0;
    border-bottom-right-radius: 10rpx;
    border-left: none;
    border-top: none;
  }
}

.contact {
  width: 100%;
  height: 100%;
  font-family: 'fzzzhjt';
  color: $u-type-primary;
  font-size: 32rpx;
  letter-spacing: 2rpx;
  line-height: 50rpx;
  font-weight: bold;
}
</style>
