<template>
  <view class="list">
    <category-card name="用车服务" alias="using" columns="3">
      <text>自驾</text>
      <text>接送</text>
      <text>代驾</text>
    </category-card>
    <category-card name="助理服务" alias="assistant">
      <text>商品代购</text>
      <text>奢侈品代购</text>
      <text>物品送取</text>
      <text>家政服务</text>
    </category-card>
    <category-card name="秘书服务" alias="secretary">
      <text>商务出席</text>
      <text>酒会出席</text>
      <text>聚会出席</text>
      <text>娱乐出席</text>
    </category-card>
    <category-card name="汽车服务" alias="cars">
      <text>汽车美容</text>
      <text>汽车保养</text>
      <text>汽车维修</text>
      <text>紧急救援</text>
    </category-card>
  </view>
</template>

<script>
import CategoryCard from './category-card.vue'

export default {
  name: 'paid-list',
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
