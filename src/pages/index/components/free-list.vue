<template>
  <view class="list">
    <category-card name="预订服务" alias="reserve">
      <text>酒店预订</text>
      <text>票务服务</text>
      <text>娱乐预订</text>
    </category-card>
    <category-card name="定制服务" alias="custom">
      <text>出行定制</text>
      <text>旅行定制</text>
      <text>接待定制</text>
      <text>宴会定制</text>
      <text>求婚定制</text>
    </category-card>
  </view>
</template>

<script>
import CategoryCard from './category-card.vue'

export default {
  name: 'free-list',
  components: { CategoryCard }
}
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 30rpx;
}
</style>
