<template>
  <view class="reserve">
    <view class="main">
      <view class="service" v-if="service.name !== '自驾'">
        <image class="service-icon" :src="service.icon_url" mode="aspectFit" />
        <view class="service-text">
          <view class="service-text-name">{{ service.name }}</view>
          <view class="service-text-intro">{{ service.intro }}</view>
        </view>
      </view>

      <view class="form">
        <form-driving ref="form" v-if="name === '自驾'" />
        <form-pickup ref="form" v-if="name === '接送'" />
      </view>
    </view>

    <view class="footer">
      <view class="left" @click="onPhoneClick">
        <image class="icon" src="/static/images/icon-contact.png" />
        <text class="text">联系客服</text>
      </view>
      <view class="right" @click="onSubmitClick">
        <image class="icon" src="/static/images/icon-btn-reserve.png" />
        <text class="text">确认预约</text>
      </view>
    </view>

    <u-modal
      v-model="show"
      title="提示"
      content="预约成功，请等待客服反馈"
      confirm-color="#ff1c3d"
      :show-cancel-button="false"
      @confirm="onConfirm"
    />
  </view>
</template>

<script>
import { mapActions } from 'vuex'
import reserveApi from '@/api/reserve'
import FormDriving from './components/form-driving.vue'
import FormPickup from './components/form-pickup.vue'

export default {
  name: 'reserve',
  components: {
    FormDriving,
    FormPickup
  },
  computed: {
    service() {
      return this.$store.state.glob.services.find((i) => i.name === this.name)
    },
    phone() {
      return this.$store.getters['glob/setting']('客服电话')
    }
  },
  data() {
    return {
      show: false,
      name: ''
    }
  },
  onLoad(params) {
    this.name = params.name
    uni.setNavigationBarTitle({ title: params.name })
  },
  methods: {
    ...mapActions('auth', ['loadTickets']),
    onPhoneClick() {
      uni.makePhoneCall({ phoneNumber: this.phone })
    },
    onSubmitClick() {
      this.$refs.form.validate().then((values) => {
        reserveApi.store({ ...values, service_id: this.service.id }, { type: this.service.name }).then((reserve) => {
          if (reserve.ticket_id) this.loadTickets()
          this.show = true
        })
      })
    },
    onConfirm() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.reserve {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
    overflow-y: auto;
    padding: 30rpx;

    .service {
      padding: 26rpx 0;
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;
      background-color: #fff;
      box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
      border-radius: 10rpx;

      &-icon {
        height: 50rpx;
        width: 50rpx;
        margin: 0 50rpx;
      }

      &-text {
        flex: 1;
        padding-right: 50rpx;

        &-name {
          font-size: 32rpx;
        }
        &-intro {
          margin-top: 10rpx;
          font-size: 24rpx;
          color: #666;
        }
      }
    }

    .form {
      flex: 1;
      padding: 0 30rpx;
      overflow-y: auto;
      background-color: #fff;
      border-radius: 10rpx;
      box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
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
