const baseUrl = process.env.VUE_APP_BASE_URL

const install = (Vue, vm) => {
  Vue.prototype.$u.http.setConfig({
    baseUrl: `${baseUrl}/api/app`,
    loadingText: '努力加载中~',
    loadingTime: 800,
    header: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
}

export default {
  install
}
