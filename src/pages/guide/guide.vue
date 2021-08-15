<template>
  <view class="guide">
    <swiper class="swiper" @change="onSwiperChange" autoplay :interval="5000">
      <block v-for="item of guides" :key="item.id">
        <swiper-item>
          <view class="banner" :style="{ backgroundImage: `url(${item.image})` }"></view>
        </swiper-item>
      </block>
    </swiper>
    <view class="indicators">
      <block v-for="(item, index) of guides" :key="index">
        <view class="indicator" :class="{ active: current === index }"></view>
      </block>
    </view>
    <view class="wrapper">
      <view class="enter" @tap="onTap">
        <text class="dscc" decode>DSCC&nbsp;</text>
        <text>超跑俱乐部</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  computed: {
    ...mapGetters('glob', ['guides'])
  },
  data() {
    return {
      current: 0
    }
  },
  methods: {
    onSwiperChange(e) {
      this.current = e.detail.current
    },
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

  .indicators {
    position: absolute;
    bottom: 70rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .indicator {
      box-sizing: border-box;
      width: 16rpx;
      height: 16rpx;
      border-radius: 8rpx;
      transition-property: all;
      transition-duration: 0.3s;
      background-color: #bebebe;
    }

    .indicator + .indicator {
      margin-left: 10rpx;
    }

    .active {
      width: 64rpx;
      background-color: $u-type-primary;
    }
  }

  .wrapper {
    position: absolute;
    bottom: 166rpx;
    width: 100%;
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
