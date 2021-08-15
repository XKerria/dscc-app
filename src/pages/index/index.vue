<template>
  <view class="page index">
    <view class="banner">
      <u-swiper :list="banners" @change="onBannerChange" mode="none" height="320" />
    </view>
    <u-gap height="40" />
    <view class="indicators">
      <block v-for="(item, index) of banners" :key="index">
        <view class="indicator" :class="{ active: banner === index }"></view>
      </block>
    </view>
    <u-gap height="30" />
    <u-tabs
      :list="tabs"
      :current="tab"
      :active-item-style="{ color: '#333' }"
      :bar-style="{ borderRadius: 0, boxShadow: '0 -4rpx 8rpx 0 rgba(201,31,33,0.2)' }"
      @change="onTabChange"
      active-color="#ff1c3d"
      inactive-color="#999"
      bg-color="transparent"
      bar-height="10"
      bar-width="40"
      font-size="40"
      gutter="0"
    ></u-tabs>
    <u-gap height="60" />
    <view class="section-title">托管服务</view>
    <u-gap height="50" />
    <trust-card @click="onCategoryClick('托管服务')" />
    <u-gap height="60" />
    <view class="section-title">二维码</view>
    <u-gap height="50" />
    <contact-card />
    <u-gap height="104" />
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import TrustCard from './components/trust-card.vue'
import ContactCard from '@/components/common/contact-card.vue'

export default {
  components: {
    TrustCard,
    ContactCard
  },
  computed: {
    ...mapGetters('glob', ['banners'])
  },
  data() {
    return {
      banner: 0,
      tabs: [{ name: '有偿服务' }, { name: '无偿服务' }],
      tab: 0
    }
  },
  onShow() {
    uni.hideHomeButton()
  },
  methods: {
    onBannerChange(index) {
      this.banner = index
    },
    onTabChange(index) {
      this.tab = index
    },
    onCategoryClick(name) {
      uni.navigateTo({
        url: `/pages/category/category?name=${name}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  .banner {
    width: 100%;
    height: 320rpx;
    overflow: hidden;
    border-radius: 16rpx;
    box-shadow: 0 16rpx 26rpx 0 rgba(0, 0, 0, 0.3);
  }

  .indicators {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .indicator {
      box-sizing: border-box;
      width: 10rpx;
      height: 10rpx;
      border-radius: 5rpx;
      transition-property: all;
      transition-duration: 0.3s;
      background-color: #bebebe;
    }

    .indicator + .indicator {
      margin-left: 10rpx;
    }

    .active {
      width: 40rpx;
      background-color: $u-type-primary;
    }
  }
}
.section-title {
  letter-spacing: 2rpx;
  font-weight: bold;
  font-size: 40rpx;
}
</style>
