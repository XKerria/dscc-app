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
      <jump-to v-if="name === '自驾'" @jump="onJumpClick" @call="onCallClick" />
      <no-reserve v-else-if="['车辆托管', '首付垫资', '征信代购'].includes(name)" @call="onCallClick" />
      <service-footer v-else @reserve="onReserveClick" @call="onCallClick" />
    </view>

    <phone-bind ref="bind" @bind="onPhoneBind" />
  </view>
</template>

<script>
import { mapState } from 'vuex'
import htmlUtils from '@/utils/html'
import PhoneBind from '@/components/common/phone-bind'
import ServiceFooter from './components/footer'
import JumpTo from './components/jump-to'
import NoReserve from './components/no-reserve'

export default {
  name: 'service',
  components: { PhoneBind, ServiceFooter, JumpTo, NoReserve },
  computed: {
    ...mapState('auth', ['user']),
    service() {
      return this.$store.state.glob.services.find((i) => i.name === this.name)
    },
    jumpTo() {
      return this.$store.getters['glob/setting']('关联小程序ID')
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
    onMutedClick() {
      this.muted = !this.muted
    },
    onCallClick() {
      uni.makePhoneCall({ phoneNumber: this.phone })
    },
    onJumpClick() {
      uni.navigateToMiniProgram({ appId: this.jumpTo })
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
      padding: 0 30rpx;

      &-player {
        width: 100%;
        height: 100%;
        border-top-left-radius: 16rpx;
        border-top-right-radius: 16rpx;
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
    width: 100vw;
  }
}
</style>
