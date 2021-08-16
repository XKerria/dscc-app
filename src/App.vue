<script>
import { mapActions } from 'vuex'

export default {
  onLaunch: function() {
    this.init()
    uni.login().then(([_, res]) => {
      this.login(res)
    })
  },
  methods: {
    ...mapActions('glob', ['init']),
    ...mapActions('auth', ['login'])
  }
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import '@/assets/styles/fonts.scss';
@import '@/assets/styles/common.scss';
</style>
