<template>
  <view class="page sale">
    <image class="image" v-if="sale" :src="sale.image_url" mode="widthFix" />
  </view>
</template>

<script>
export default {
  name: 'sales',
  computed: {
    sale() {
      return this.$store.state.glob.sales.find((i) => i.id === this.id) || null
    }
  },
  data() {
    return {
      id: ''
    }
  },
  onLoad(options) {
    this.id = options.id
  }
}
</script>

<style lang="scss" scoped>
.sale {
  overflow-y: auto;

  .image {
    width: 100%;
    height: auto;
  }
}
</style>
