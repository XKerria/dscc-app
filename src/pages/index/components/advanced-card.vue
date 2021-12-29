<template>
  <view class="card" @click="onClick">
    <image
      class="icon"
      src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-s-高端娱乐.png"
      mode="aspectFit"
    />
    <view class="wrapper">
      <view class="title">高端娱乐</view>
      <view class="services">
        <view class="service">商务接待</view>
        <view class="service">旅游定制</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'trust-card',
  computed: {
    category() {
      const result = this.$store.state.glob.categories.find(i => i.name === '高端娱乐')
      return result ?? null
    },
    services() {
      const result = this.$store.state.glob.services.filter(i => i.category_id === this.category.id)
      return result ?? []
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 320rpx;

  background-color: #fff;
  background-image: url('https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/bg-高端娱乐.png');
  background-repeat: no-repeat;
  background-size: 349rpx 266rpx;
  background-position: bottom right;

  border-radius: 10rpx;
  padding: 35rpx 20rpx 0 20rpx;

  box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);

  .icon {
    width: 93rpx;
    height: 87rpx;
  }

  .wrapper {
    padding: 0 20rpx;

    .title {
      margin-top: 4rpx;
      letter-spacing: 1rpx;
      font-weight: bold;
      font-size: 28rpx;
      line-height: 1rem;
    }

    .services {
      margin-top: 45rpx;
      display: grid;
      grid-template-columns: repeat(4, auto);
      row-gap: 14rpx;
      font-size: 24rpx;
      color: #666;
      line-height: 1rem;
    }
  }
}
</style>
