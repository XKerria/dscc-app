<template>
  <view class="page info">
    <view class="arc">
      <ui-arc />
    </view>

    <u-gap height="66" />

    <view class="panel panel-base">
      <view class="left">
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
      <view class="right">
        <u-icon name="reload" color="#fff" size="32" @click="onRefreshClick" />
      </view>
    </view>

    <u-gap height="50" />

    <view class="group">
      <u-cell-group>
        <u-cell-item title="性别" :arrow="false">
          <u-icon v-if="1" name="man" />
          <u-icon v-else-if="2" name="woman" />
          <text v-else>未知</text>
        </u-cell-item>
        <u-cell-item title="手机号" :arrow="false" :value="user.phone || '-'" />
        <u-cell-item title="国家" :arrow="false" :value="user.country || '-'" />
        <u-cell-item title="省" :arrow="false" :value="user.province || '-'" />
        <u-cell-item title="城市" :arrow="false" :value="user.city || '-'" />
      </u-cell-group>
    </view>
  </view>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'info',
  computed: {
    ...mapState('auth', ['user'])
  },
  onLoad() {
    console.log('pages/user/info')
  },
  methods: {
    ...mapActions('auth', ['updateUser']),
    onRefreshClick() {
      this.updateUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  position: relative;
  padding: 0 30rpx;

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
    justify-content: space-between;

    .left {
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

    .right {
      text-align: right;
      margin-right: 20rpx;
    }
  }

  .group {
    border-radius: 10rpx;
    overflow: hidden;
  }
}
</style>
