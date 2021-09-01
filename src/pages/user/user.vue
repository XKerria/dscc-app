<template>
  <page-arc>
    <user-panel>
      <button v-if="!user.phone" class="btn-login" open-type="getPhoneNumber" @getphonenumber="onLoginClick">
        登录
      </button>
    </user-panel>

    <view class="panel panel-points" v-if="user.points">
      <view class="panel-points-title">会员积分</view>
      <text class="panel-points-points">{{ user.points }}</text>
    </view>

    <u-gap height="50" v-if="user.points" />

    <view class="panel panel-actions">
      <action v-if="user.vip" icon="member" @click="onVipClick">会员中心</action>
      <action icon="coupon" @click="onWalletClick">我的券包</action>
      <action icon="clock" @click="onReservesClick">我的预约</action>
      <action icon="service" @click="onPhoneClick">联系客服</action>
      <action icon="user" @click="onInfoClick">信息设置</action>
    </view>

    <u-gap height="50" />

    <contact-card class="panel" />

    <u-toast ref="toast" />

    <template v-slot:footer>
      <ui-footer />
    </template>
  </page-arc>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Action from './components/action.vue'
import UserPanel from '@/components/common/user-panel.vue'
import ContactCard from '@/components/common/contact-card.vue'

export default {
  name: 'user',
  components: { Action, UserPanel, ContactCard },
  computed: {
    ...mapState('auth', ['user']),
    phone() {
      return this.$store.getters['glob/setting']('客服电话')
    }
  },
  methods: {
    ...mapActions('auth', ['updateUser', 'bindPhone']),
    onInfoClick() {
      if (!this.user.phone) {
        this.$refs.toast.show({ title: '请登录', type: 'warning' })
        return
      }
      uni.navigateTo({ url: '/pages/user/info' })
    },
    onVipClick() {
      if (!this.user.phone) {
        this.$refs.toast.show({ title: '请登录', type: 'warning' })
        return
      }
      uni.navigateTo({ url: '/pages/user/vip' })
    },
    onWalletClick() {
      if (!this.user.phone) {
        this.$refs.toast.show({ title: '请登录', type: 'warning' })
        return
      }
      uni.navigateTo({ url: '/pages/user/wallet' })
    },
    onReservesClick() {
      if (!this.user.phone) {
        this.$refs.toast.show({ title: '请登录', type: 'warning' })
        return
      }
      uni.navigateTo({ url: '/pages/user/reserves' })
    },
    onPhoneClick() {
      uni.makePhoneCall({ phoneNumber: this.phone })
    },
    onLoginClick(e) {
      if (e.detail)
        this.bindPhone(e.detail).then(() => {
          this.$refs.toast.show({ title: '登录成功', type: 'success' })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-login {
  height: 40rpx;
  border-radius: 20rpx;
  background-color: #fff;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
  color: $u-type-primary;
  font-size: 24rpx;
  line-height: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.panel-points {
  position: relative;
  z-index: 4;
  height: 160rpx;
  border-radius: 10rpx;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
  padding: 30rpx;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff;
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto 112rpx;
  background-image: url('https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/bg-member.png');

  &-title {
    position: absolute;
    font-size: 28rpx;
    line-height: 1em;
    letter-spacing: 2rpx;
    font-weight: bold;
    top: 30rpx;
    left: 30rpx;
  }

  &-points {
    font-family: 'Bebas Neue';
    font-size: 48rpx;
    line-height: 1em;
    letter-spacing: 3rpx;
    color: $u-type-primary;
    font-weight: 500;
  }
}

.panel-actions {
  position: relative;
  z-index: 4;
  border-radius: 10rpx;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
</style>
