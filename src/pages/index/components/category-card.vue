<template>
  <view
    class="card"
    :style="{ backgroundImage: `url(https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/bg-${alias}.png)` }"
    @click="onCardClick"
  >
    <image
      class="icon"
      :src="`https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-${alias}.png`"
      mode="aspectFit"
    />
    <view class="name">{{ name }}</view>
    <view class="wrapper">
      <view class="services" :style="{ gridTemplateColumns: `repeat(${columns}, auto)` }">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'category-card',
  props: {
    name: {
      type: String,
      required: true
    },
    alias: {
      type: String,
      required: true
    },
    columns: {
      type: Number,
      default: 2
    }
  },
  methods: {
    onCardClick() {
      uni.navigateTo({ url: `/pages/category/category?name=${this.name}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 330rpx;
  height: 320rpx;

  background-color: #fff;
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto 288rpx;

  box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 10rpx;
  padding: 50rpx 40rpx 0 40rpx;
  display: flex;
  flex-direction: column;

  .icon {
    width: 50rpx;
    height: 50rpx;
  }

  .name {
    margin-top: 20rpx;
    letter-spacing: 1rpx;
    font-size: 28rpx;
    font-weight: bold;
  }

  .wrapper {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;

    .services {
      width: 100%;
      color: $u-content-color;
      font-size: 24rpx;
      letter-spacing: 1rpx;
      display: grid;
      row-gap: 14rpx;
    }
  }
}
</style>
