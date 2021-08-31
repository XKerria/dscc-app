<template>
  <view class="page earning">
    <ui-section>收益计算</ui-section>
    <u-gap height="43" />
    <view class="form">
      <u-form
        ref="form"
        :model="model"
        label-width="150"
        :label-style="{ fontSize: '28rpx', lineHeight: '1em', fontWeight: 'bold' }"
      >
        <u-form-item label="首付金额（含1年保险）" label-width="320" prop="payment">
          <u-input v-model.number="model.payment" placeholder="输入首付金额" type="number" />
          <template v-slot:right>
            <text class="suffix">￥</text>
          </template>
        </u-form-item>
        <u-form-item label="首付比例" prop="percent_payment">
          <u-number-box v-model="model.percent_payment" />
          <template v-slot:right>
            <text class="suffix">%</text>
          </template>
        </u-form-item>
        <u-form-item label="贷款比例" prop="percent_loan">
          <u-number-box v-model="model.percent_loan" />
          <template v-slot:right>
            <text class="suffix">%</text>
          </template>
        </u-form-item>
        <u-form-item label="保险比例" prop="percent_insurance">
          <u-number-box v-model="model.percent_insurance" />
          <template v-slot:right>
            <text class="suffix">%</text>
          </template>
        </u-form-item>
        <u-form-item label="回购比例" prop="percent_repo">
          <u-number-box v-model="model.percent_repo" />
          <template v-slot:right>
            <text class="suffix">%</text>
          </template>
        </u-form-item>
        <u-form-item label="托管比例" prop="percent_trust" :border-bottom="false">
          <u-number-box v-model="model.percent_trust" />
          <template v-slot:right>
            <text class="suffix">%</text>
          </template>
        </u-form-item>
      </u-form>
    </view>
    <u-gap height="50" />
    <button class="btn" @click="submit">计算收益</button>
  </view>
</template>

<script>
import BigNumber from 'bignumber.js'

const rules = {
  payment: [
    { required: true, message: '必填' },
    { type: 'number', min: 0, max: 99999999.99, message: '数字 0 ~ 99,999,999.99' }
  ],
  percent_payment: [
    { required: true, message: '必填' },
    { type: 'integer', min: 0, max: 100, message: '0 ~ 100' }
  ],
  percent_loan: [
    { required: true, message: '必填' },
    { type: 'integer', min: 0, max: 100, message: '0 ~ 100' }
  ],
  percent_insurance: [
    { required: true, message: '必填' },
    { type: 'integer', min: 0, max: 100, message: '0 ~ 100' }
  ],
  percent_repo: [
    { required: true, message: '必填' },
    { type: 'integer', min: 0, max: 100, message: '0 ~ 100' }
  ],
  percent_trust: [
    { required: true, message: '必填' },
    { type: 'integer', min: 0, max: 100, message: '0 ~ 100' }
  ]
}

export default {
  name: 'earning',
  data() {
    return {
      model: {
        payment: 200000,
        percent_payment: 30,
        percent_loan: 70,
        percent_insurance: 3,
        percent_repo: 60,
        percent_trust: 3
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
    submit() {
      this.validate().then((data) => {
        const result = this.compute(data)
        uni.navigateTo({ url: `/pages/income/result?data=${JSON.stringify(result)}` })
      })
    },
    compute({ payment, percent_payment, percent_loan, percent_insurance, percent_repo, percent_trust }) {
      const nPayment = new BigNumber(payment)
      const pPayment = new BigNumber(percent_payment / 100)
      const pLoan = new BigNumber(percent_loan / 100)
      const pInsurance = new BigNumber(percent_insurance / 100)
      const pRepo = new BigNumber(percent_repo / 100)
      const pTrust = new BigNumber(percent_trust / 100)

      const total = nPayment.div(pPayment.plus(pInsurance))
      const loan = total.times(pLoan)
      const trust_monthly = total.times(pTrust)
      const refund_monthly = loan
        .times(0.008)
        .times(36)
        .plus(loan)
        .div(36)
      const income_monthly = trust_monthly.minus(refund_monthly)
      const income_3_years = income_monthly
        .times(36)
        .plus(total.times(pRepo))
        .minus(total.times(pInsurance).times(2))
      const income_rate = income_3_years
        .minus(nPayment)
        .div(3)
        .div(nPayment)

      return {
        income_3_years: income_3_years.toFormat(2),
        total: total.toFormat(2),
        loan: loan.toFormat(2),
        trust_monthly: trust_monthly.toFormat(2),
        refund_monthly: refund_monthly.toFormat(2),
        income_monthly: income_monthly.toFormat(2),
        income_rate: income_rate.times(100).toFormat(2) + '%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.earning {
  padding: 30rpx;

  .form {
    background: #fff;
    border-radius: 10rpx;
    padding: 0 30rpx;

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
