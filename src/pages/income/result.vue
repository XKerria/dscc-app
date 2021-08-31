<template>
  <view class="page result">
    <ui-section>收益计算</ui-section>
    <u-gap height="43" />
    <view class="cells">
      <view class="header">
        <view class="title">三年总收益</view>
        <view class="total">
          <text class="num">{{ income_3_years }}</text>
          <text class="unit">元</text>
        </view>
      </view>
      <u-cell-group :border="false" :arrow="false">
        <u-cell-item title="车辆总价" border-top :arrow="false" :title-style="style" :value-style="style">
          {{ total }}
        </u-cell-item>
        <u-cell-item title="贷款总额" :arrow="false" :title-style="style" :value-style="style">
          {{ loan }}
        </u-cell-item>
        <u-cell-item title="月托管额" :arrow="false" :title-style="style" :value-style="style">
          {{ trust_monthly }}
        </u-cell-item>
        <u-cell-item title="月还款额" :arrow="false" :title-style="style" :value-style="style">
          {{ refund_monthly }}
        </u-cell-item>
        <u-cell-item title="月收益" :arrow="false" :title-style="style" :value-style="style">
          {{ income_monthly }}
        </u-cell-item>
        <u-cell-item title="投资回报率" :border-bottom="false" :arrow="false" :title-style="style" :value-style="style">
          {{ income_rate }}
        </u-cell-item>
      </u-cell-group>
    </view>
    <u-gap height="50" />
    <button class="btn" @click="back">重新计算</button>
  </view>
</template>

<script>
export default {
  name: 'earning',
  data() {
    return {
      income_3_years: 0,
      total: 0,
      loan: 0,
      trust_monthly: 0,
      refund_monthly: 0,
      income_monthly: 0,
      income_rate: 0,

      style: {
        fontSize: '28rpx',
        lineHeight: '1em',
        letterSpacing: '1rpx',
        fontWeight: 'bold',
        color: '#333',
        padding: '16rpx 0'
      }
    }
  },
  onLoad(options) {
    const data = JSON.parse(options.data)

    this.income_3_years = data.income_3_years
    this.total = data.total
    this.loan = data.loan
    this.trust_monthly = data.trust_monthly
    this.refund_monthly = data.refund_monthly
    this.income_monthly = data.income_monthly
    this.income_rate = data.income_rate
  },
  methods: {
    back() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  padding: 30rpx;

  .cells {
    background: #fff;
    border-radius: 10rpx;
    padding: 0 30rpx;

    .header {
      text-align: center;
      padding-top: 50rpx;
      padding-bottom: 30rpx;

      .title {
        font-size: 32rpx;
        letter-spacing: 1rpx;
        font-weight: bold;
        margin-bottom: 40rpx;
      }

      .total {
        line-height: 1em;
        letter-spacing: 3rpx;
        color: $u-type-primary;
        font-family: 'Bebas Neue';

        .num {
          font-size: 100rpx;
        }

        .unit {
          font-size: 32rpx;
          margin-left: 12rpx;
        }
      }
    }

    .suffix {
      font-size: 28rpx;
      line-height: 1em;
      font-weight: bold;
      color: #333;
    }
  }

  .btn {
    background-image: linear-gradient(to right, #ff243d, #ff6b40);
    color: #fff;
    border: none;
    border-radius: 10rpx;
  }
}
</style>
