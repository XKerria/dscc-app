<template>
  <view class="card" @click="onClick">
    <image
      class="icon"
      src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-trust.png"
      mode="aspectFit"
    />
    <view class="wrapper">
      <view class="title">托管服务</view>
      <view class="services">
        <block v-for="(item, index) of items" :key="index">
          <view class="service">{{ item }}</view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'trust-card',
  data() {
    return {
      items: ['车辆托管', '收费垫资', '征信代购', '车辆代售库', '收益计算']
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 320rpx;

  background-color: #fff;
  background-image: url('https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/bg-trust.png');
  background-repeat: no-repeat;
  background-size: 349rpx 266rpx;
  background-position: bottom right;

  border-radius: 10rpx;
  padding: 35rpx 20rpx 0 20rpx;

  box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);

  .icon {
    width: 93rpx;
    height: 87rpx;
  }

  .wrapper {
    padding: 0 20rpx;

    .title {
      margin-top: 4rpx;
      letter-spacing: 1rpx;
      font-weight: bold;
      font-size: 28rpx;
      line-height: 1rem;
    }

    .services {
      margin-top: 45rpx;
      display: grid;
      grid-template-columns: repeat(4, auto);
      row-gap: 14rpx;
      font-size: 24rpx;
      color: #666;
      line-height: 1rem;
    }
  }
}
</style>
