<template>
  <view class="page coupons">
    <view class="main">
      <block v-for="item of coupons" :key="item.id">
        <view class="coupon" :style="{ backgroundImage: `url(${bg})` }" @click="onCouponClick(item)">
          <view class="left">
            <view>
              <text class="unit">￥</text>
              <text class="value num">{{ item.value }}</text>
            </view>
            <view class="remark">{{ item.remark }}</view>
          </view>
          <view class="right">
            <view class="title">{{ item.title }}</view>
            <view class="duration">{{ duration(item) }}</view>
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

      <phone-bind ref="bind" />
      <u-toast ref="toast" />
    </view>

    <ui-footer />
  </view>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import PhoneBind from '@/components/common/phone-bind'
import dayjs from 'dayjs'
import ticketApi from '@/api/ticket'

export default {
  name: 'coupons',
  components: { PhoneBind },
  computed: {
    ...mapGetters('glob', ['setting']),
    ...mapState('glob', ['coupons']),
    ...mapState('auth', ['user', 'tickets']),
    bg() {
      return this.setting('优惠券背景')
    }
  },
  data() {
    return {
      partnerId: null
    }
  },
  onLoad(options) {
    const url = decodeURIComponent(options.q)
    this.partnerId = url.split('=')?.[1] ?? ''
  },
  methods: {
    ...mapActions('auth', ['loadTickets']),
    duration(coupon) {
      return (
        dayjs().format('YYYY-MM-DD') +
        ' 至 ' +
        dayjs()
          .add(coupon.expire, coupon.expire_unit)
          .format('YYYY-MM-DD')
      )
    },
    onCouponClick(coupon) {
      this.$u.throttle(() => this.obtain(coupon), 1000)
    },
    obtain(coupon) {
      if (!this.user || !this.user.phone) {
        this.$refs.bind.show()
        return
      }

      const ticket = this.tickets.find((i) => {
        return i.user_id === this.user.id && i.coupon_id === coupon.id && i.partner_id === this.partnerId
      })

      if (ticket) {
        this.$refs.toast.show({
          title: '已领取过',
          type: 'error',
          duration: 1000
        })
        return
      }

      ticketApi
        .store({
          user_id: this.user.id,
          coupon_id: coupon.id,
          partner_id: this.partnerId
        })
        .then(() => {
          this.loadTickets()
          this.$refs.toast.show({
            title: '领取成功',
            type: 'success',
            duration: 980
          })
        })
        .catch((e) => {
          if (e.code === 500 && e.exception.code === '23000') {
            this.$refs.toast.show({
              title: '已领取过',
              type: 'error'
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.coupons {
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
    padding: 40rpx;
    overflow-y: auto;

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

        .duration {
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
}

.num {
  font-family: 'Bebas Neue';
}
</style>
