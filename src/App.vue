<script>
import { mapActions } from 'vuex'

export default {
  onLaunch: function() {
    this.init()
    this.loadWechat()
  },
  methods: {
    ...mapActions('glob', ['init']),
    ...mapActions('auth', ['loadWechat'])
  }
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import '@/assets/styles/fonts.scss';
@import '@/assets/styles/common.scss';
</style>
