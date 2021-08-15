import Axios from 'axios'
import store from '@/store'

const baseUrl = process.env.VUE_APP_API_URL

const axios = Axios.create({
  baseURL: baseUrl
})

const handle = (e) => {
  switch (e.code) {
    case 40101:
      break
    case 422:
      break
    case 500:
      break
    case 40102:
      break
    default:
      break
  }
}

axios.interceptors.request.use(
  (config) => {
    const token = store.getters['auth/accessToken']
    if (!!token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (err) => Promise.reject(err)
)

axios.interceptors.response.use(
  (res) => {
    const type = res.header?.['Content-Type'] ?? ''
    if (type.indexOf('application/json') !== -1) return res.data
    return res
  },
  (err) => {
    let error = { status: 0, message: '服务器未响应', code: 0 }
    if (err.response) error = err.response.data
    handle(error)
    return Promise.reject(error)
  }
)

axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
    let settle = require('axios/lib/core/settle')
    let buildURL = require('axios/lib/helpers/buildURL')
    uni.request({
      method: config.method.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        }
        settle(resolve, reject, response)
      }
    })
  })
}

export default axios
