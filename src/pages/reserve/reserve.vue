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
        <form-driving ref="form" :service="service" v-if="name === '自驾'" />
        <form-pickup ref="form" :service="service" v-if="name === '接送'" />
        <form-dd ref="form" :service="service" v-if="name === '代驾'" />

        <form-purchase ref="form" :service="service" v-if="name === '商品、奢侈品代购'" />
        <form-delivering ref="form" :service="service" v-if="name === '物品送取'" />
        <form-household ref="form" :service="service" v-if="name === '家政服务'" />

        <form-secretary ref="form" :service="service" v-if="name === '商务、酒会、聚会、娱乐出席'" />

        <form-vehicle ref="form" :service="service" v-if="name === '美容、保养、维修、紧急救援'" />

        <form-hotel ref="form" :service="service" v-if="name === '酒店预订'" />
        <form-ticket ref="form" :service="service" v-if="name === '票务预订'" />
        <form-entertainment ref="form" :service="service" v-if="name === '娱乐预订'" />

        <form-custom ref="form" :service="service" v-if="name === '出行定制'" />
        <form-custom ref="form" :service="service" v-if="name === '接待定制'" />
        <form-custom ref="form" :service="service" v-if="name === '宴会定制'" />
        <form-custom ref="form" :service="service" v-if="name === '求婚定制'" />
        <form-custom ref="form" :service="service" v-if="name === '旅行定制'" />
      </view>

      <view class="tip">{{ service.tip }}</view>
    </view>

    <view class="footer">
      <view class="left" @click="onPhoneClick">
        <image class="icon" src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-contact.png" />
        <text class="text">联系客服</text>
      </view>
      <view class="right" @click="onSubmitClick">
        <image class="icon" src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-btn-reserve.png" />
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

    <u-modal
      v-model="showBack"
      title="提示"
      content="位置信息授权失败"
      confirm-color="#ff1c3d"
      :show-cancel-button="false"
      @confirm="onConfirm"
    />

    <open-setting ref="modal" @fail="onAuthorizeFail" />
  </view>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import reserveApi from '@/api/reserve'
import wxUtils from '@/utils/wechat'
import OpenSetting from '@/components/common/open-setting'

import FormDriving from './components/form-driving.vue'
import FormPickup from './components/form-pickup.vue'
import FormDD from './components/form-designated-driving.vue'
import FormPurchase from './components/form-purchase.vue'
import FormDelivering from './components/form-delivering.vue'
import FormHousehold from './components/form-household.vue'
import FormSecretary from './components/form-secretary.vue'
import FormVehicle from './components/form-vehicle.vue'
import FormHotel from './components/form-hotel.vue'
import FormTicket from './components/form-ticket.vue'
import FormEntertainment from './components/form-entertainment.vue'
import FormCustom from './components/form-custom.vue'

export default {
  name: 'reserve',
  components: {
    OpenSetting,
    FormDriving,
    FormPickup,
    'form-dd': FormDD,
    FormPurchase,
    FormDelivering,
    FormHousehold,
    FormSecretary,
    FormVehicle,
    FormHotel,
    FormTicket,
    FormEntertainment,
    FormCustom
  },
  computed: {
    ...mapState('auth', ['user']),
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
      showBack: false,
      name: '',
      allowed: false
    }
  },
  onLoad(params) {
    this.name = params.name
    uni.setNavigationBarTitle({ title: params.name })
    this.permissionCheck()
  },
  methods: {
    ...mapActions('auth', ['loadTickets', 'loadReserves']),
    onPhoneClick() {
      uni.makePhoneCall({ phoneNumber: this.phone })
    },
    onSubmitClick() {
      this.$refs.form.validate().then((values) => {
        reserveApi
          .store({ ...values, user_id: this.user.id, service_id: this.service.id }, { type: this.service.name })
          .then((reserve) => {
            if (reserve.ticket_id) {
              this.loadTickets()
              this.loadReserves()
            }
            this.show = true
          })
      })
    },
    onConfirm() {
      uni.navigateBack()
    },
    permissionCheck() {
      wxUtils.checkPermission('scope.userLocation').catch(() => {
        wxUtils.authorize('scope.userLocation').catch(() => {
          this.$refs.modal.show()
        })
      })
    },
    onAuthorizeFail() {
      this.showBack = true
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

    .tip {
      margin-top: 20rpx;
      font-size: 24rpx;
      color: $u-type-primary;
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
