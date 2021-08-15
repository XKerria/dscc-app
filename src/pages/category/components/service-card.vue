<template>
  <view class="card">
    <image class="icon" :src="service.cover" mode="aspectFit" />
    <view class="wrapper">
      <view class="name">{{ service.name }}</view>
      <view class="intro">{{ service.intro }}</view>
    </view>
    <image class="arrow" src="/static/images/icon-right.png" mode="aspectFit" />
  </view>
</template>

<script>
export default {
  name: 'service-card',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.service)
  }
}
</script>

<style lang="scss" scoped>
.card {
  height: 140rpx;
  border-radius: 10rpx;
  box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 30rpx;

  .icon {
    margin-left: 20rpx;
    width: 50rpx;
    height: 50rpx;
  }

  .wrapper {
    flex: 1;
    margin-left: 50rpx;

    .name {
      font-size: 32rpx;
      letter-spacing: 4rpx;
      font-weight: bold;
    }

    .intro {
      margin-top: 10rpx;
      font-size: 24rpx;
      letter-spacing: 1rpx;
      color: $u-content-color;
    }
  }

  .arrow {
    width: 12rpx;
    height: 20rpx;
  }
}
</style>
