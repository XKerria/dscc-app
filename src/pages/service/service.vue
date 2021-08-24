<template>
  <view class="service">
    <view class="content" @click="onBodyClick">
      <image class="image" :src="service.image" mode="widthFix" />
    </view>
    <view class="footer">
      <view class="left" @click="onCallClick">
        <image class="icon" src="/static/images/icon-contact.png" />
        <text class="text" v-if="name === '自驾'">订车专线</text>
        <text class="text" v-else>联系客服</text>
      </view>
      <view class="right" @click="onAppClick" v-if="name === '自驾'">
        <image class="icon" src="/static/images/icon-miniprogram.png" />
        <text class="text">更多车型</text>
      </view>
      <view class="right" @click="onReserveClick" v-else>
        <image class="icon" src="/static/images/icon-btn-reserve.png" />
        <text class="text">点击预约</text>
      </view>
    </view>

    <u-modal v-model="show" title="登录" :show-cancel-button="false" :show-confirm-button="false">
      <view class="register">
        <u-button type="primary" shape="circle" open-type="getPhoneNumber" @getphonenumber="onPhoneClick">
          一键登录
        </u-button>
      </view>
    </u-modal>
  </view>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'service',
  computed: {
    ...mapState('auth', ['wechat']),
    service() {
      return this.$store.state.glob.services.find((i) => i.name === this.name)
    },
    phone() {
      return this.$store.getters['glob/setting']('客服电话')
    }
  },
  data() {
    return {
      name: '',
      show: false
    }
  },
  onLoad(params) {
    this.name = params.name
  },
  methods: {
    ...mapActions('auth', ['bindPhone']),
    onCallClick() {
      uni.makePhoneCall({ phoneNumber: this.phone })
    },
    onAppClick() {
      uni.navigateToMiniProgram({ appId: 'wxd3f015dca219b365' })
    },
    onBodyClick() {
      if (this.name !== '自驾') return
      this.toReserve()
    },
    onReserveClick() {
      this.toReserve()
    },
    toReserve() {
      if (!this.wechat.phone) {
        this.show = true
      } else {
        uni.navigateTo({ url: `/pages/reserve/reserve?name=${this.name}` })
      }
    },
    onPhoneClick(e) {
      console.log(e)
      if (e.detail) {
        this.bindPhone(e.detail).then(() => {
          uni.navigateTo({ url: `/pages/reserve/reserve?name=${this.name}` })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.service {
  background-color: #f7f7f7;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;

  .content {
    flex: 1;
    overflow-y: auto;

    .image {
      width: 100vw;
      height: 100%;
    }
  }

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

  .register {
    padding: 40rpx;
  }
}
</style>
