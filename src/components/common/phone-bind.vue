<template>
  <u-modal v-model="visible" title="登录" :show-cancel-button="false" :show-confirm-button="false" mask-close-able>
    <view class="register">
      <u-button type="primary" shape="circle" open-type="getPhoneNumber" @getphonenumber="onPhoneClick">
        一键登录
      </u-button>
    </view>
  </u-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'phone-bind',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    ...mapActions('auth', ['bindPhone']),
    show() {
      this.visible = true
    },
    onPhoneClick(e) {
      if (e.detail) {
        this.bindPhone(e.detail).then(() => {
          this.visible = false
          this.$emit('bind')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  padding: 40rpx;
}
</style>
