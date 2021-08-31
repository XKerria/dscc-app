import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import httpApi from '@/common/http.api.js'
import httpInterceptor from '@/common/http.interceptor.js'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue({
  store,
  ...App
})

Vue.use(uView)
Vue.use(httpInterceptor, app)
Vue.use(httpApi, app)

app.$mount()
