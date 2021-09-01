<template>
  <u-modal
    v-model="visible"
    :show-title="false"
    :show-cancel-button="false"
    :show-confirm-button="false"
    mask-close-able
  >
    <view class="wrapper">
      <button class="btn" open-type="getPhoneNumber" @getphonenumber="onPhoneClick">
        一键登录
      </button>
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
.wrapper {
  padding: 40rpx;

  .btn {
    box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.1);
    height: 88rpx;
    border-radius: 44rpx;
    background-image: linear-gradient(to right, #ff243d, #ff6b40);
    color: #fff;
    font-size: 32rpx;
    line-height: 1em;
    letter-spacing: 4rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
