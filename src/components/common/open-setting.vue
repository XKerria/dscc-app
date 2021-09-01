<template>
  <u-modal v-model="visible" title="授权" :show-cancel-button="false" :show-confirm-button="false">
    <view class="wrapper">
      <u-button type="primary" shape="circle" @click="onClick">
        位置信息
      </u-button>
    </view>
  </u-modal>
</template>

<script>
import { mapActions } from 'vuex'
import wxUtils from '@/utils/wechat'

export default {
  name: 'open-setting',
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
    onClick(e) {
      wxUtils
        .openSetting()
        .then((res) => {
          const { authSetting } = res
          if (authSetting['scope.userLocation']) {
            this.$emit('success')
          } else {
            this.$emit('fail')
          }
        })
        .catch((e) => {
          this.$emit('fail')
        })
        .finally(() => {
          this.visible = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 40rpx;
}
</style>
