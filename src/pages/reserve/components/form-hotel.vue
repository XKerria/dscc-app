<template>
  <u-form :model="model" ref="form" label-width="180">
    <u-form-item label="您的称呼" prop="name">
      <u-input v-model="model.name" placeholder="请输入" maxlength="32" clearable />
    </u-form-item>
    <u-form-item label="您的电话" prop="phone">
      <u-input v-model="model.phone" placeholder="请输入" maxlength="11" type="number" />
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
    <u-form-item label="合作酒店" prop="partner">
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
    <u-form-item label="指定酒店" prop="location">
      <u-input :value="model.location.name" placeholder="请选择" type="select" @click="onLocationClick" />
    </u-form-item>
    <u-form-item label="身份证号" prop="idcard">
      <u-input v-model="model.idcard" placeholder="请输入" maxlength="18" type="idcard" />
    </u-form-item>
    <u-form-item label="入住时间" prop="start">
      <u-input
        v-model="model.start"
        placeholder="请选择"
        type="select"
        @click="showStart = true"
        :select-open="showStart"
      />
      <u-picker
        v-model="showStart"
        mode="time"
        confirm-color="#ff1c3d"
        placeholder="请选择"
        :params="params"
        @confirm="onStartSelect"
      />
    </u-form-item>
    <u-form-item label="离店时间" prop="end">
      <u-input v-model="model.end" placeholder="请选择" type="select" @click="showEnd = true" :select-open="showEnd" />
      <u-picker
        v-model="showEnd"
        mode="time"
        confirm-color="#ff1c3d"
        placeholder="请选择"
        :params="params"
        @confirm="onEndSelect"
      />
    </u-form-item>
    <u-form-item label="预约房型" prop="room">
      <u-input v-model="model.room" placeholder="请输入" maxlength="32" clearable />
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
  staff_id: [{ required: true, message: '必选' }],
  partner: [],
  location: [],
  idcard: [
    { required: true, message: '必填' },
    {
      pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      message: '身份证号格式错误'
    }
  ],
  start: [{ required: true, message: '必选' }],
  end: [],
  room: [{ min: 0, max: 255, message: '长度为 0 ~ 255 字符' }],
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
    ...mapState('glob', ['vehicles']),
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
      showStart: false,
      showEnd: false,
      showTickets: false,
      staff: null,
      model: {
        name: '',
        phone: '',
        staff_id: '',
        partner: '',
        location: null,
        idcard: '',
        start: '',
        end: '',
        room: '',
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
    onStartSelect({ year, month, day, hour, minute }) {
      this.model.start = `${year}-${month}-${day} ${hour}:${minute}`
    },
    onEndSelect({ year, month, day, hour, minute }) {
      this.model.end = `${year}-${month}-${day} ${hour}:${minute}`
    },
    onLocationClick() {
      const thiz = this
      uni.chooseLocation({
        success(res) {
          thiz.model.location = res
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
