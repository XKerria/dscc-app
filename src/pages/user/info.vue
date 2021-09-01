<template>
  <page-arc>
    <user-panel>
      <button class="btn" @click="onSyncClick">
        <text>同步信息</text>
      </button>
    </user-panel>

    <view class="group">
      <u-cell-group :border="false">
        <u-cell-item title="性别" :arrow="false">
          <u-icon v-if="1" name="man" />
          <u-icon v-else-if="2" name="woman" />
          <text v-else>未知</text>
        </u-cell-item>
        <u-cell-item title="手机号" :arrow="false" :value="user.phone || '-'" />
        <u-cell-item title="国家" :arrow="false" :value="user.country || '-'" />
        <u-cell-item title="省" :arrow="false" :value="user.province || '-'" />
        <u-cell-item title="城市" :border-bottom="false" :arrow="false" :value="user.city || '-'" />
      </u-cell-group>
    </view>

    <u-gap height="50" v-if="user" />

    <ui-button v-if="user" @click="onLogoutClick">退出登录</ui-button>

    <u-modal
      v-model="show"
      title="提示"
      content="退出后将无法使用预约功能，您确定要退出么？"
      confirm-color="#ff1c3d"
      @confirm="onLogoutConfirm"
    />
  </page-arc>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserPanel from '@/components/common/user-panel.vue'

export default {
  name: 'info',
  components: { UserPanel },
  computed: {
    ...mapState('auth', ['user'])
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    ...mapActions('auth', ['updateUser', 'logout']),
    onSyncClick() {
      this.updateUser()
    },
    onLogoutClick() {
      this.show = true
    },
    onLogoutConfirm() {
      this.logout().then(uni.reLaunch({ url: '/pages/guide/guide' }))
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
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

.group {
  border-radius: 10rpx;
  overflow: hidden;
  box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
}
</style>
