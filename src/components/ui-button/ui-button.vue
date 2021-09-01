<template>
  <button class="ui-button" @click="(e) => $emit('click', e)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ui-button'
}
</script>

<style lang="scss" scoped>
.ui-button {
  width: 100%;
  height: 88rpx;
  border-radius: 44rpx;
  box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
  background-image: $bg-btn;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32rpx;
  letter-spacing: 2rpx;
  color: #fff;
}
</style>
