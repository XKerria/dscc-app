<template>
  <view class="form-driving">
    <view v-if="car" class="car">
      <image class="image" :src="car.image" mode="aspectFill" />
      <view class="logo-wrapper">
        <image class="logo" :src="car.logo" mode="aspectFit" />
      </view>
      <view class="rent">
        <text class="number" space="nbsp">￥{{ car.rent }}</text>
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
        <u-form-item label="使用车型" prop="car">
          <u-input
            v-model="model.car"
            placeholder="请输入"
            type="select"
            @click="showCars = true"
            :select-open="showCars"
          />
          <u-select :list="cars" v-model="showCars" confirm-color="#ff1c3d" @confirm="onCarSelect" />
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
          <u-input v-model="model.duration" placeholder="请输入" type="number" />
          <template v-slot:right>
            <text>天</text>
          </template>
        </u-form-item>
        <u-form-item label="单价" v-if="car">
          <text class="number placeholder">￥{{ car.rent }}</text>
        </u-form-item>
        <u-form-item label="总价">
          <text class="number">￥{{ total }}</text>
        </u-form-item>
        <u-form-item label="备注" prop="remark">
          <u-input v-model="model.remark" type="textarea" height="60" placeholder="备注" maxlength="255" auto-height />
        </u-form-item>
        <u-form-item label="优惠券" prop="remark" :border-bottom="false" right-icon="arrow-right">
          <text class="number">500元现金抵扣券</text>
        </u-form-item>
      </u-form>
    </view>
  </view>
</template>

<script>
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
  car: [{ required: true, message: '必选' }],
  time: [{ required: true, message: '必选' }],
  duration: [
    { required: true, message: '必填' },
    { type: 'number', message: '数字' },
    { min: 0, max: 365, message: '0 ~ 365' }
  ],
  remark: [{ min: 0, max: 255, message: '长度为 0 ~ 255 字符' }]
}

export default {
  name: 'form',
  computed: {
    cars() {
      return this.$store.state.glob.cars.map((i) => ({ ...i, label: i.name, value: i.name, extra: i.id }))
    },
    total() {
      if (!this.car) return 0
      return Number(this.car.rent) * Number(this.model.duration) || 0
    }
  },
  data() {
    return {
      params,
      showCars: false,
      showTime: false,
      car: null,
      model: {
        name: '',
        phone: '',
        car: '',
        time: '',
        duration: '',
        remark: ''
      }
    }
  },
  onReady() {
    this.$refs.form.setRules(rules)
  },
  methods: {
    validate() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) resolve(this.model)
        })
      })
    },
    onCarSelect([obj]) {
      this.model.car = obj.label
      this.car = this.cars.find((i) => i.id === obj.extra)
    },
    onTimeSelect({ year, month, day, hour, minute }) {
      this.model.time = `${year}-${month}-${day} ${hour}:${minute}`
    }
  }
}
</script>

<style lang="scss" scoped>
.form-driving {
  margin: 50rpx 0;
}

.car {
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
  .rent {
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
