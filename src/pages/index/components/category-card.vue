<template>
  <view class="category-card" :class="{ cardClass }" :style="{ backgroundImage: extra }" @click="onCardClick">
    <image class="icon" :src="icon" />
    <text class="name">{{ name }}</text>
    <view class="services" :style="{ gridTemplateColumns: `repeat(${columns}, auto)` }">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'category-card',
  props: {
    cardClass: {
      type: String,
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
