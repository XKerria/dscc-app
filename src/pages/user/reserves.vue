<template>
  <view class="page reserves">
    <view class="empty" v-if="!reserves.length">您暂时没有预约</view>
    <block v-for="item of reserves" :key="item.id">
      <view class="reserve">
        <view class="service">{{ item.service.name }}</view>
        <view class="info">
          <text>
            <text>{{ item.name }}</text>
            <text style="margin-left: 12rpx;">{{ item.phone }}</text>
          </text>
          <text>{{ fd(item.created_at) }}</text>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'reserves',
  computed: {
    ...mapState('auth', ['reserves'])
  },
  methods: {
    fd(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    }
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

  .reserve {
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
    padding: 20rpx 30rpx;

    .service {
      font-size: 32rpx;
    }

    .info {
      margin-top: 22rpx;
      text-align: right;
      font-size: 24rpx;
      color: #999;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .reserve + .reserve {
    margin-top: 30rpx;
  }
}

.num {
  font-family: 'Bebas Neue';
}
</style>
