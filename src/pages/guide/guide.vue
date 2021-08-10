<template>
  <view class="guide">
    <swiper class="swiper">
      <block v-for="item of banners" :key="item.id">
        <swiper-item>
          <view class="banner" :style="{ backgroundImage: `url(${item.image})` }"></view>
        </swiper-item>
      </block>
    </swiper>
    <view class="wrapper">
      <view class="enter" @tap="onTap">
        <text class="dscc" decode>DSCC&nbsp;</text>
        <text>超跑俱乐部</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      banners: []
    }
  },
  onLoad() {
    this.$u.api.getBanners({ eq: 'type:guide' }).then((data) => {
      this.banners = data
    })
  },
  methods: {
    onTap() {
      uni.redirectTo({ url: '/pages/index/index' })
    }
  }
}
</script>

<style lang="scss" scoped>
.guide {
  width: 100vw;
  height: 100vh;
  position: relative;

  .swiper {
    width: 100vw;
    height: 100vh;

    .banner {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 100vw;
      height: 100vh;
    }
  }

  .wrapper {
    width: 100%;
    position: absolute;
    bottom: 166rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .enter {
      width: 414rpx;
      height: 88rpx;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      border: 1px solid #fff;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 4rpx;
      font-size: 28rpx;

      .dscc {
        letter-spacing: 8rpx;
        font-size: 60rpx;
        font-family: 'Bebas Neue';
      }
    }
  }
}
</style>
