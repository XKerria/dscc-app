<template>
  <view class="page sales">
    <block v-for="item of sales" :key="item.id">
      <view class="item">
        <rich-text :nodes="item.content" />
      </view>
    </block>
  </view>
</template>

<script>
import saleApi from '@/api/sale'
import htmlUtils from '@/utils/html'

export default {
  name: 'sales',
  data() {
    return {
      sales: []
    }
  },
  onLoad() {
    saleApi.index().then((data) => {
      this.sales = data.map((i) => ({ ...i, nodes: htmlUtils.parse(i.content) }))
      console.log(this.sales)
    })
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
