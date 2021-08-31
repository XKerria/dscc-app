<template>
  <view class="page user">
    <view class="main">
      <view class="arc">
        <ui-arc />
      </view>

      <u-gap height="66" />

      <view class="panel panel-base">
        <view class="avatar">
          <open-data type="userAvatarUrl"></open-data>
        </view>
        <view class="base">
          <view class="nickname">
            <open-data type="userNickName"></open-data>
          </view>
          <image v-if="user.vip" :src="user.vip.icon_url" class="vip" mode="aspectFit" />
        </view>
      </view>

      <u-gap height="40" v-if="user.points" />
      <view class="panel panel-points" v-if="user.points">
        <view class="panel-points-title">会员积分</view>
        <text class="panel-points-points">{{ user.points }}</text>
      </view>

      <u-gap height="50" />

      <view class="panel panel-actions">
        <action v-if="user.vip" icon="member" @click="onVipClick">会员中心</action>
        <action icon="user" @click="onInfoClick">我的信息</action>
        <action icon="coupon" @click="onWalletClick">我的券包</action>
        <action icon="clock" @click="onReservesClick">我的预约</action>
        <action icon="service" :border-bottom="false" @click="onPhoneClick">联系客服</action>
      </view>

      <u-gap height="50" />

      <contact-card class="panel" />

      <u-gap height="100" />
    </view>

    <ui-footer />
  </view>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Action from './components/action.vue'
import ContactCard from '@/components/common/contact-card.vue'

export default {
  name: 'user',
  components: { Action, ContactCard },
  computed: {
    ...mapState('auth', ['user']),
    phone() {
      return this.$store.getters['glob/setting']('客服电话')
    }
  },
  methods: {
    ...mapActions('auth', ['updateUser']),
    onInfoClick() {
      if (this.user.nickname) {
        uni.navigateTo({ url: '/pages/user/info' })
        return
      }
      this.updateUser().then(() => {
        uni.navigateTo({ url: '/pages/user/info' })
      })
    },
    onVipClick() {
      uni.navigateTo({ url: '/pages/user/vip' })
    },
    onWalletClick() {
      uni.navigateTo({ url: '/pages/user/wallet' })
    },
    onReservesClick() {
      uni.navigateTo({ url: '/pages/user/reserves' })
    },
    onPhoneClick() {
      uni.makePhoneCall({ phoneNumber: this.phone })
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;

  .main {
    position: relative;
    flex: 1;
    padding: 0 30rpx;
    overflow-y: auto;
    overflow-x: hidden;

    .arc {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 0;
    }

    .panel {
      position: relative;
      z-index: 2;
    }

    .panel-base {
      display: flex;
      align-items: center;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 20rpx;
        box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
      }

      .base {
        margin-left: 40rpx;

        .nickname {
          font-size: 36rpx;
          color: #fff;
          font-weight: 500;
          padding: 0 10rpx;
        }

        .vip {
          width: 138rpx;
          height: 57rpx;
        }
      }
    }

    .panel-points {
      position: relative;
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
      border-radius: 10rpx;
      box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
    }
  }
}
</style>
