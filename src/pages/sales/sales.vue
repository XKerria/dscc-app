<template>
  <view class="page sales">
    <block v-for="item of sales" :key="item.id">
      <image class="item" :src="item.cover_url" mode="aspectFill" @click="onSaleClick(item)" />
    </block>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sales',
  computed: {
    ...mapState('glob', ['sales'])
  },
  methods: {
    onSaleClick(item) {
      uni.navigateTo({ url: `/pages/sale/sale?id=${item.id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.sales {
  padding: 30rpx;
  overflow-y: auto;

  .item {
    width: 100%;
    height: 320rpx;
    box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    background-color: #fff;
  }

  .item + .item {
    margin-top: 30rpx;
  }
}
</style>
