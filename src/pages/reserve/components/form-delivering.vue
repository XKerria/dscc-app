<template>
  <u-form :model="model" ref="form" label-width="180">
    <u-form-item label="您的称呼" prop="name">
      <u-input v-model="model.name" placeholder="请输入" maxlength="32" clearable />
    </u-form-item>
    <u-form-item label="您的电话" prop="phone">
      <u-input v-model="model.phone" placeholder="请输入" maxlength="11" type="number" />
    </u-form-item>
    <u-form-item label="预约时间" prop="time">
      <u-input
        v-model="model.time"
        placeholder="请选择"
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
    <u-form-item label="取货地点" prop="from">
      <u-input :value="model.from.name" placeholder="请选择" type="select" @click="onFromClick" />
    </u-form-item>
    <u-form-item label="送达地点" prop="to">
      <u-input v-model="model.to.name" placeholder="请选择" type="select" @click="onToClick" />
    </u-form-item>
    <u-form-item label="服务时长" prop="duration">
      <text class="number">{{ model.duration }}</text>
      <template v-slot:right>
        <text class="placeholder">分钟</text>
      </template>
    </u-form-item>
    <u-form-item label="服务里程" prop="distance">
      <text class="number">{{ model.distance }}</text>
      <template v-slot:right>
        <text class="number placeholder">KM</text>
      </template>
    </u-form-item>
    <u-form-item label="服务费用" prop="total">
      <text class="number">{{ model.total }}</text>
      <template v-slot:right>
        <text class="number placeholder">￥</text>
      </template>
    </u-form-item>
    <u-form-item label="备注" prop="remark">
      <u-input v-model="model.remark" type="textarea" height="60" placeholder="备注" maxlength="255" auto-height />
    </u-form-item>
    <u-form-item label="优惠券" prop="ticket" :border-bottom="false">
      <u-input
        v-model="model.ticket"
        placeholder="请选择"
        type="select"
        @click="onTicketClick"
        :select-open="showTickets"
      />
      <u-select :list="tickets" v-model="showTickets" confirm-color="#ff1c3d" @confirm="onTicketSelect" />
    </u-form-item>

    <u-toast ref="toast" />
  </u-form>
</template>

<script>
import { mapState } from 'vuex'
import mapUtils from '@/utils/map'

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
  time: [{ required: true, message: '必选' }],
  from: [{ required: true, message: '必选' }],
  to: [{ required: true, message: '必选' }],
  duration: [{ required: true, message: '必填' }],
  distance: [{ required: true, message: '必填' }],
  remark: [{ min: 0, max: 255, message: '长度为 0 ~ 255 字符' }],
  ticket: []
}

export default {
  name: 'form',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('auth', ['user', 'tickets']),
    fromto() {
      const { from, to } = this.model
      return { from, to }
    }
  },
  data() {
    return {
      params,
      showTime: false,
      showTickets: false,
      model: {
        name: '',
        phone: '',
        time: '',
        from: null,
        to: null,
        duration: 0,
        distance: 0,
        remark: '',
        ticket_id: ''
      }
    }
  },
  watch: {
    fromto: {
      deep: true,
      handler({ from, to }) {
        if (!from || !to) return
        mapUtils
          .calculateDistance({
            mode: 'driving',
            from,
            to: [to]
          })
          .then((res) => {
            const { distance, duration } = res
            this.model.duration = Math.round(duration / 60)
            this.model.distance = Math.round((distance / 1000) * 100) / 100
          })
      }
    },
    'model.distance'(val) {
      this.model.total = Math.round(Number(this.service?.prices?.km) * Number(val)) || 0
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
            const data = {
              ...this.model,
              duration: this.model.duration + '分钟',
              distance: this.model.distance + '公里'
            }
            resolve(data)
          }
        })
      })
    },
    onTimeSelect({ year, month, day, hour, minute }) {
      this.model.time = `${year}-${month}-${day} ${hour}:${minute}`
    },
    onFromClick() {
      const thiz = this
      uni.chooseLocation({
        success(res) {
          thiz.model.from = res
        }
      })
    },
    onToClick() {
      const thiz = this
      uni.chooseLocation({
        success(res) {
          thiz.model.to = res
        }
      })
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
      this.model.ticket_id = obj.value
      this.ticket = this.tickets.find((i) => i.id === obj.value)
    }
  }
}
</script>

<style lang="scss" scoped>
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
