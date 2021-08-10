import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import httpApi from '@/common/http.api.js'
import httpInterceptor from '@/common/http.interceptor.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})

Vue.use(uView)
Vue.use(httpInterceptor, app)
Vue.use(httpApi, app)

app.$mount()
