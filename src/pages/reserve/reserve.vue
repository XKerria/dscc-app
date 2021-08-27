<template>
  <view class="reserve">
    <view class="form">
      <form-driving ref="form" v-if="name === '自驾'" />
      <form-pickup ref="form" v-if="name === '接送'" />
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
    onPhoneClick() {
      uni.makePhoneCall({ phoneNumber: this.phone })
    },
    onSubmitClick() {
      this.$refs.form.validate().then((values) => {
        reserveApi.store({ ...values, service_id: this.service.id }, { type: this.service.name }).then(() => {
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
  background-color: #f7f7f7;

  .form {
    flex: 1;
    padding: 0 30rpx;
    overflow-y: auto;
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
