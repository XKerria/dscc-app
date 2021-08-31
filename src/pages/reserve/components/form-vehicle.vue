<template>
  <u-form :model="model" ref="form" label-width="180">
    <u-form-item label="您的称呼" prop="name">
      <u-input v-model="model.name" placeholder="请输入" maxlength="32" clearable />
    </u-form-item>
    <u-form-item label="您的电话" prop="phone">
      <u-input v-model="model.phone" placeholder="请输入" maxlength="11" type="number" />
    </u-form-item>
    <u-form-item label="您的车型" prop="vehicle">
      <u-input v-model="model.vehicle" placeholder="请输入" maxlength="255" />
    </u-form-item>
    <u-form-item label="服务项目" prop="item">
      <u-input
        class="input"
        v-model="model.item"
        placeholder="请输入"
        type="select"
        @click="showItems = true"
        :select-open="showItems"
      />
      <u-select v-model="showItems" confirm-color="#ff1c3d" :list="items" @confirm="onItemSelect" />
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
  vehicle: [
    { required: true, message: '必填' },
    { max: 255, message: '长度不超过 255' }
  ],
  item: [{ required: true, message: '必选' }],
  time: [{ required: true, message: '必选' }],
  remark: [{ min: 0, max: 255, message: '长度为 0 ~ 255 字符' }],
  staff_id: [{ required: true, message: '必选' }],
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
    items() {
      return this.service.items.map((i) => ({ label: i, value: i }))
    }
  },
  data() {
    return {
      params,
      showItems: false,
      showTime: false,
      showTickets: false,
      staff: null,
      model: {
        name: '',
        phone: '',
        vehicle: '',
        item: '',
        time: '',
        remark: '',
        ticket_id: ''
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
          if (valid) resolve(this.model)
        })
      })
    },
    onItemSelect([obj]) {
      this.model.item = obj.label
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
