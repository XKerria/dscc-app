<template>
  <view class="ui-footer">
    <view v-if="active === 'home'" class="button active">
      <image class="icon" src="/static/images/icon-home.png" mode="aspectFit" />
      <view class="text">首页</view>
    </view>
    <view v-else class="button" @click="onClick('/pages/index/index')">
      <image class="icon" src="/static/images/icon-home-in.png" mode="aspectFit" />
      <view class="text">首页</view>
    </view>

    <view v-if="active === 'user'" class="button active">
      <image class="icon" src="/static/images/icon-user.png" mode="aspectFit" />
      <view class="text">我的</view>
    </view>
    <view v-else class="button" @click="onClick('/pages/user/user')">
      <image class="icon" src="/static/images/icon-user-in.png" mode="aspectFit" />
      <view class="text">我的</view>
    </view>
  </view>
</template>

<script>
import { currentUrl } from '@/utils/page'

const map = {
  'pages/index/index': 'home',
  'pages/user/user': 'user'
}

export default {
  name: 'ui-footer',
  data() {
    return {
      active: 'home'
    }
  },
  created() {
    this.active = map?.[currentUrl()] ?? 'home'
  },
  methods: {
    onClick(page) {
      if (page === '/pages/index/index') {
        uni.reLaunch({ url: page })
        return
      }
      uni.navigateTo({ url: page })
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-footer {
  width: 100vw;
  height: 110rpx;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-around;

  .button {
    font-size: 20rpx;
    text-align: center;
    letter-spacing: 2rpx;
    color: #999;

    .icon {
      width: 50rpx;
      height: 50rpx;
    }

    .text {
      margin-top: 10rpx;
      line-height: 1em;
    }
  }

  .active {
    color: #333;
  }
}
</style>
