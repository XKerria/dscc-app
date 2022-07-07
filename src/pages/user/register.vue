<template>
  <view class="page register">
    <ui-section>成为会员</ui-section>

    <u-gap height="80"></u-gap>

    <view class="form">
      <u-form :model="form" ref="form" label-width="auto">
        <u-form-item label="您的姓名" prop="remark">
          <u-input v-model="form.remark" placeholder="我们应该怎么称呼您呢？" />
        </u-form-item>
      </u-form>
    </view>

    <u-gap height="80"></u-gap>

    <button
      :disabled="disabled"
      class="btn-register"
      :class="{ 'btn-register-disabled': disabled }"
      open-type="getPhoneNumber"
      @getphonenumber="onLoginClick"
    >
      点击成为会员
    </button>

    <u-toast ref="toast" />
  </view>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import vipApi from '@/api/vip'

export default {
  name: 'register',
  computed: {
    ...mapState('auth', ['user']),
    disabled() {
      return !this.form.remark
    }
  },
  data() {
    return {
      form: {
        remark: ''
      },
      rules: {
        remark: [{ required: true, message: '请输入您的姓名', trigger: ['blur', 'change'] }]
      },
      vip: null
    }
  },
  onLoad() {
    this.load()
  },
  onReady() {
    this.$refs.form.setRules(this.rules)
  },
  methods: {
    ...mapActions('auth', ['bindPhone', 'loadUser']),
    load() {
      vipApi.index().then(res => {
        this.vip = res.find(i => i.name === 'SVIP')
      })
    },
    onLoginClick(e) {
      this.$refs.form.validate(valid => {
        if (!valid) return
        if (e.detail) {
          const extra = { ...this.form, vip_id: this.vip?.id ?? null }
          this.bindPhone({ ...e.detail, extra }).then(() => {
            this.$refs.toast.show({ title: '登录成功', type: 'success' })
            this.loadUser()
            uni.redirectTo({ url: '/pages/index/index' })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  padding: 30rpx 30rpx;

  .btn-register {
    width: 100%;
    height: 88rpx;
    border-radius: 44rpx;
    box-shadow: 0 0 30rpx 0 rgba(0, 0, 0, 0.1);
    background-image: $bg-btn;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    letter-spacing: 2rpx;
    color: #fff;
  }

  .btn-register-disabled {
    background-image: none;
    background-color: #aaa;
  }
}
</style>
