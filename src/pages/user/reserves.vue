<template>
  <view class="page reserves">
    <view class="empty" v-if="!reserves.length">您暂时没有预约</view>
    <block v-for="item of reserves" :key="item.id">
      <view class="coupon" :style="{ backgroundImage: `url(${bg})` }">
        <view class="left">
          <view>
            <text class="unit">￥</text>
            <text class="value num">{{ item.coupon.value }}</text>
          </view>
          <view class="remark">{{ item.coupon.remark }}</view>
        </view>
        <view class="right">
          <view class="title">{{ item.coupon.title }}</view>
          <view class="expire">过期时间：{{ item.expired_at }}</view>
          <view class="btn">
            <text>点击领取</text>
            <image
              class="arrow"
              src="https://project-dscc.oss-cn-chengdu.aliyuncs.com/static/images/icon-arrow-right.png"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'reserves',
  computed: {
    ...mapState('auth', ['reserves'])
  }
}
</script>

<style lang="scss" scoped>
.reserves {
  padding: 30rpx;

  .empty {
    width: 100%;
    text-align: center;
    padding: 50rpx;
    font-size: 28rpx;
    color: #999;
    letter-spacing: 2rpx;
  }

  .coupon {
    width: 100%;
    height: 180rpx;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: flex;
    align-items: center;

    .left {
      width: 242rpx;
      text-align: center;
      color: #fff;
      letter-spacing: 3rpx;

      .unit {
        font-size: 30rpx;
      }

      .value {
        font-size: 50rpx;
      }

      .remark {
        margin-top: 16rpx;
        font-size: 24rpx;
      }
    }

    .right {
      flex: 1;
      padding: 0 30rpx;

      .title {
        font-size: 24rpx;
        line-height: 1em;
      }

      .expire {
        margin-top: 17rpx;
        font-size: 20rpx;
        line-height: 1em;
        color: #999;
      }

      .btn {
        margin-top: 23rpx;
        font-size: 24rpx;
        color: $u-type-primary;
        line-height: 1em;
        display: flex;
        align-items: center;

        .arrow {
          margin-left: 10rpx;
          width: 14rpx;
          height: 10rpx;
        }
      }
    }
  }

  .coupon + .coupon {
    margin-top: 40rpx;
  }
}

.num {
  font-family: 'Bebas Neue';
}
</style>
