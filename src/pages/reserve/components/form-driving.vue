<template>
  <view class="form-driving">
    <view v-if="vehicle" class="vehicle">
      <image class="image" :src="vehicle.image_url" mode="aspectFill" />
      <view class="logo-wrapper">
        <image class="logo" :src="vehicle.logo_url" mode="aspectFit" />
      </view>
      <view class="price">
        <text class="number" space="nbsp">￥{{ vehicle.day_price }}</text>
        <text space="nbsp"> / 天</text>
      </view>
    </view>
    <view class="form">
      <u-form :model="model" ref="form" label-width="180">
        <u-form-item label="您的称呼" prop="name">
          <u-input v-model="model.name" placeholder="请输入" maxlength="32" clearable />
        </u-form-item>
        <u-form-item label="您的电话" prop="phone">
          <u-input v-model="model.phone" placeholder="请输入" maxlength="11" type="number" />
        </u-form-item>
        <u-form-item label="使用车型" prop="vehicle">
          <u-input
            v-model="model.vehicle"
            placeholder="请输入"
            type="select"
            @click="showVehicles = true"
            :select-open="showVehicles"
          />
          <u-select :list="vehicles" v-model="showVehicles" confirm-color="#ff1c3d" @confirm="onVehicleSelect" />
        </u-form-item>
        <u-form-item label="预约时间" prop="time">
          <u-input
            v-model="model.time"
            placeholder="请输入"
            type="select"
            @click="showTime = true"
            :select-open="showTime"
          />
          <u-picker
            v-model="showTime"
            mode="time"
            confirm-color="#ff1c3d"
            placeholder="请选择"
            :params="params"
            @confirm="onTimeSelect"
          />
        </u-form-item>
        <u-form-item label="预约时长" prop="duration">
          <!-- <u-input v-model.number="model.duration" placeholder="请输入" type="number" /> -->
          <u-number-box v-model="model.duration" />
          <template v-slot:right>
            <text>天</text>
          </template>
        </u-form-item>
        <u-form-item label="单价" v-if="vehicle">
          <text class="number placeholder">￥{{ vehicle.day_price }}</text>
        </u-form-item>
        <u-form-item label="总价">
          <text class="number">￥{{ total }}</text>
        </u-form-item>
        <u-form-item label="备注" prop="remark">
          <u-input v-model="model.remark" type="textarea" height="60" placeholder="备注" maxlength="255" auto-height />
        </u-form-item>
        <u-form-item label="优惠券" prop="remark" :border-bottom="false">
          <u-input
            v-model="model.ticket"
            placeholder="请选择"
            type="select"
            @click="onTicketClick"
            :select-open="showTickets"
          />
          <u-select :list="tickets" v-model="showTickets" confirm-color="#ff1c3d" @confirm="onTicketSelect" />
        </u-form-item>
      </u-form>
    </view>

    <u-toast ref="toast" />
  </view>
</template>

<script>
import { mapState } from 'vuex'

const params = {
  year: true,
  month: true,
  day: true,
  hour: true,
  minute: true
}

const rules = {
  name: [
    { required: true, message: '必填' },
    { min: 2, max: 32, message: '长度为 2 ~ 32 字符' }
  ],
  phone: [
    { required: true, message: '必填' },
    { pattern: /^1[3-9][0-9]{9}$/, message: '手机号格式错误' }
  ],
  vehicle: [{ required: true, message: '必选' }],
  time: [{ required: true, message: '必选' }],
  duration: [
    { required: true, message: '必填' },
    { type: 'integer', min: 1, max: 365, message: '整数 1 ~ 365' }
  ],
  remark: [{ min: 0, max: 255, message: '长度为 0 ~ 255 字符' }]
}

const units = { 代金券: '￥' }

export default {
  name: 'form',
  computed: {
    ...mapState('auth', ['user']),
    vehicles() {
      return this.$store.state.glob.vehicles.map((i) => ({ ...i, label: i.name, value: i.name, extra: i.id }))
    },
    tickets() {
      return this.$store.state.auth.tickets.map((i) => ({
        ...i,
        label: `${units[i.coupon.type]}${i.coupon.value} ${i.coupon.type}（${i.partner.name}）`,
        value: i.id,
        extra: i.id
      }))
    },
    total() {
      if (!this.vehicle) return 0
      return Math.round(Number(this.vehicle.day_price) * Number(this.model.duration)) || 0
    }
  },
  data() {
    return {
      params,
      showVehicles: false,
      showTime: false,
      showTickets: false,
      vehicle: null,
      ticket: null,
      model: {
        name: '',
        phone: '',
        vehicle: '',
        ticket: '',
        time: '',
        duration: 3,
        remark: ''
      }
    }
  },
  onReady() {
    this.$refs.form.setRules(rules)
    if (this.user.phone) this.model.phone = this.user.phone
    if (this.user.nickname) this.model.name = this.user.nickname
  },
  methods: {
    validate() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve({ ...this.model, duration: this.model.duration + '天' })
          }
        })
      })
    },
    onVehicleSelect([obj]) {
      this.model.vehicle = obj.label
      this.vehicle = this.vehicles.find((i) => i.id === obj.extra)
    },
    onTimeSelect({ year, month, day, hour, minute }) {
      this.model.time = `${year}-${month}-${day} ${hour}:${minute}`
    },
    onTicketClick() {
      if (!this.tickets.length) {
        this.$refs.toast.show({ title: '对不起，您暂时没有优惠券', type: 'warning' })
        return
      }
      this.showTickets = true
    },
    onTicketSelect([obj]) {
      this.model.ticket = obj.label
      this.ticket = this.tickets.find((i) => i.id === obj.extra)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-driving {
  margin: 50rpx 0;
}

.vehicle {
  box-sizing: border-box;
  padding: 20rpx 30rpx;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.1);
  border-radius: 10rpx;

  margin: 50rpx 0;
  background-color: #fff;

  .image {
    width: 230rpx;
    height: 100rpx;
  }
  .logo-wrapper {
    box-sizing: border-box;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    padding: 15rpx;
    box-shadow: 0 0 19rpx 0 rgba(0, 0, 0, 0.1);
    .logo {
      width: 100%;
      height: 100%;
    }
  }
  .price {
    margin-left: 20rpx;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: var(--color-text);
  }
}

.form {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 0 30rpx;
  box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.1);
}

.number {
  font-size: 36rpx;
  font-family: 'Bebas Neue';
  color: #c91f21;
  letter-spacing: 2rpx;
}

.placeholder {
  color: $u-tips-color;
}
</style>
