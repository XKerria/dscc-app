<template>
  <view class="page user">
    <view class="container main"> </view>
    <ui-footer />
  </view>
</template>

<script>
export default {
  name: 'user'
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
  }
}
</style>
