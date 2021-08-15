const install = (Vue, vm) => {
  vm.$u.api = {
    getBanners: (params = {}) => vm.$u.get('/banners', params),
    getSettings: (params = {}) => vm.$u.get('/settings', params)
  }
}

export default { install }
