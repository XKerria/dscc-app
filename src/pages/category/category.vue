<template>
  <view class="page container category" v-if="category">
    <ui-section>{{ category.name }}</ui-section>
    <u-gap height="20" />
    <view class="intro">{{ category.intro }}</view>
    <u-gap height="60" />
    <block v-for="service of category.services" :key="service.id">
      <view class="service">
        <service-card :service="service" @click="onServiceClick(service)" />
      </view>
    </block>
    <u-gap height="60" />
    <ui-section>更多服务</ui-section>
    <u-gap height="20" />
    <view class="intro">更多服务请扫描二维码咨询</view>
    <u-gap height="60" />
    <contact-card />
    <u-gap height="104" />
  </view>
</template>

<script>
import ServiceCard from './components/service-card.vue'
import ContactCard from '@/components/common/contact-card.vue'

export default {
  name: 'category',
  components: {
    ServiceCard,
    ContactCard
  },
  computed: {
    category() {
      return this.$store.state.glob.categories.find((i) => i.name === this.name)
    }
  },
  data() {
    return {
      name: ''
    }
  },
  onLoad(params) {
    this.name = params.name
  },
  methods: {
    onServiceClick(service) {
      if (service.name === '车辆代售库') {
        uni.navigateTo({ url: `/pages/sales/sales` })
        return
      }
      if (service.name === '收益计算') {
        uni.navigateTo({ url: `/pages/income/compute` })
        return
      }
      uni.navigateTo({ url: `/pages/service/service?name=${service.name}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.intro {
  color: $u-tips-color;
  line-height: 33rpx;
  font-size: 24rpx;
  letter-spacing: 1rpx;
}

.service {
  width: 100%;
}

.service + .service {
  margin-top: 30rpx;
}
</style>
