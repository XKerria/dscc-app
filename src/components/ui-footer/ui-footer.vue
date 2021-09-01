<template>
  <view class="ui-footer">
    <view class="wrapper">
      <view v-if="active === 'home'" class="button active">
        <image
          class="icon"
          src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-home.png"
          mode="aspectFit"
        />
        <view class="text">首页</view>
      </view>
      <view v-else class="button" @click="onClick('/pages/index/index')">
        <image
          class="icon"
          src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-home-in.png"
          mode="aspectFit"
        />
        <view class="text">首页</view>
      </view>

      <view v-if="active === 'user'" class="button active">
        <image
          class="icon"
          src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-user.png"
          mode="aspectFit"
        />
        <view class="text">我的</view>
      </view>
      <view v-else class="button" @click="onClick('/pages/user/user')">
        <image
          class="icon"
          src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-user-in.png"
          mode="aspectFit"
        />
        <view class="text">我的</view>
      </view>
    </view>

    <phone-bind ref="bind" @bind="toUserPage" />
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { currentUrl } from '@/utils/page'
import PhoneBind from '@/components/common/phone-bind'

const map = {
  'pages/index/index': 'home',
  'pages/user/user': 'user'
}

export default {
  name: 'ui-footer',
  components: { PhoneBind },
  computed: {
    ...mapState('auth', ['user'])
  },
  data() {
    return {
      active: ''
    }
  },
  created() {
    this.active = map?.[currentUrl()]
  },
  methods: {
    onClick(page) {
      if (page === '/pages/index/index') {
        uni.reLaunch({ url: page })
        return
      }

      uni.navigateTo({ url: page })
    },
    toUserPage() {
      uni.navigateTo({ url: '/pages/user/user' })
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-footer {
  width: 100vw;
  height: 110rpx;
  background-color: #fff;
  position: relative;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);

  .wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

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
}
</style>
