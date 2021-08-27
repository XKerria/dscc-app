<template>
  <view class="vip">
    <rich-text :nodes="nodes" />
  </view>
</template>

<script>
import { mapState } from 'vuex'
import htmlUtils from '@/utils/html'

export default {
  name: 'vip',
  computed: {
    ...mapState('auth', ['user']),
    nodes() {
      return this.user && this.user.vip ? htmlUtils.parse(htmlUtils.format(this.user.vip.desc)) : []
    }
  }
}
</script>

<style lang="scss" scoped>
.vip {
  width: 100vw;
  min-height: 100vh;
}
</style>
