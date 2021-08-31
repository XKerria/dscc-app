<template>
  <u-form :model="model" ref="form" label-width="180">
    <u-form-item label="您的称呼" prop="name">
      <u-input v-model="model.name" placeholder="请输入" maxlength="32" clearable />
    </u-form-item>
    <u-form-item label="您的电话" prop="phone">
      <u-input v-model="model.phone" placeholder="请输入" maxlength="11" type="number" />
    </u-form-item>
    <u-form-item label="身份证号" prop="idcard">
      <u-input v-model="model.idcard" placeholder="请输入" maxlength="18" type="idcard" />
    </u-form-item>
    <u-form-item label="您的秘书" prop="staff">
      <view class="staff">
        <image v-if="staff && staff.avatar_url" class="avatar" :src="staff.avatar_url" mode="aspectFill" />
        <u-input
          class="input"
          v-model="model.staff"
          placeholder="请输入"
          type="select"
          @click="showStaffs = true"
          :select-open="showStaffs"
        />
      </view>
      <u-select
        v-model="showStaffs"
        confirm-color="#ff1c3d"
        label-name="name"
        value-name="id"
        :list="staffs"
        @confirm="onStaffSelect"
      />
    </u-form-item>
    <u-form-item label="合作公司" prop="partner">
      <u-input
        class="input"
        v-model="model.partner"
        placeholder="请输入"
        type="select"
        @click="showPartners = true"
        :select-open="showPartners"
      />
      <u-select
        v-model="showPartners"
        confirm-color="#ff1c3d"
        label-name="name"
        value-name="id"
        :list="partners"
        @confirm="onPartnerSelect"
      />
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
  idcard: [
    { required: true, message: '必填' },
    {
      pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      message: '身份证号格式错误'
    }
  ],
  staff_id: [{ required: true, message: '必选' }],
  partner: [],
  time: [{ required: true, message: '必选' }],
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
    staffs() {
      const all = this.$store.state.glob.staffs
      return [{ name: '公司指派', id: '' }, ...all.filter((i) => i.type === this.service.staff_type)]
    },
    partners() {
      const all = this.$store.state.glob.partners
      return all.filter((i) => i.type === this.service.partner_type)
    }
  },
  data() {
    return {
      params,
      showStaffs: false,
      showPartners: false,
      showTime: false,
      showTickets: false,
      staff: null,
      model: {
        name: '',
        phone: '',
        idcard: '',
        staff_id: '',
        partner: '',
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
    onPartnerSelect([obj]) {
      this.model.partner = obj.label
    },
    onStaffSelect([obj]) {
      this.model.staff = obj.label
      this.model.staff_id = obj.value
      this.staff = this.staffs.find((i) => i.id === obj.value)
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
.staff {
  display: flex;
  align-items: center;

  .avatar {
    height: 80rpx;
    width: 80rpx;
    border-radius: 50%;
    margin-right: 16rpx;
  }

  .input {
    flex: 1;
  }
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
