const install = (Vue, vm) => {
  const getBanners = (params = {}) => vm.$u.get('/banners', params)
  vm.$u.api = { getBanners }
}

export default { install }
