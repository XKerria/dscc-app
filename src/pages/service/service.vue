<template>
  <view class="service">
    <view class="content" @click="onBodyClick">
      <view v-if="service.video_url" class="video">
        <video
          class="video-player"
          loop
          autoplay
          object-fit="cover"
          :src="service.video_url"
          :controls="false"
          :muted="muted"
        ></video>
        <view class="mute">
          <u-icon v-if="muted" name="volume-off-fill" color="#fff" size="32" @click="onMutedClick" />
          <u-icon v-else name="volume-up-fill" color="#fff" size="32" @click="onMutedClick" />
        </view>
      </view>
      <rich-text :nodes="nodes" />
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

    <phone-bind ref="bind" @bind="onPhoneBind" />
  </view>
</template>

<script>
import { mapState } from 'vuex'
import htmlUtils from '@/utils/html'
import PhoneBind from '@/components/common/phone-bind'

export default {
  name: 'service',
  components: { PhoneBind },
  computed: {
    ...mapState('auth', ['user']),
    service() {
      return this.$store.state.glob.services.find((i) => i.name === this.name)
    },
    phone() {
      return this.$store.getters['glob/setting']('客服电话')
    },
    nodes() {
      return this.service && this.service.content ? htmlUtils.parse(htmlUtils.format(this.service.content)) : []
    }
  },
  data() {
    return {
      name: '',
      muted: true
    }
  },
  onLoad(params) {
    this.name = params.name
  },
  methods: {
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
      if (!this.user.phone) {
        this.$refs.bind.show()
      } else {
        uni.navigateTo({ url: `/pages/reserve/reserve?name=${this.name}` })
      }
    },
    onPhoneBind() {
      uni.navigateTo({ url: `/pages/reserve/reserve?name=${this.name}` })
    },
    onMutedClick() {
      this.muted = !this.muted
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

    .video {
      position: relative;
      width: 100%;
      height: 388rpx;
      padding: 30rpx;

      &-player {
        width: 100%;
        height: 100%;
      }
      .mute {
        position: absolute;
        right: 48rpx;
        top: 48rpx;
      }
    }

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
}
</style>
