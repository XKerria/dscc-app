import bannerApi from '@/api/banner'
import settingApi from '@/api/setting'
import categoryApi from '@/api/category'
import vehicleApi from '@/api/vehicle'
import couponApi from '@/api/coupon'
import staffApi from '@/api/staff'

const state = () => ({
  banners: [],
  settings: [],
  categories: [],
  vehicles: [],
  services: [],
  coupons: [],
  staffs: []
})

const getters = {
  guides: (state) => state.banners.filter((i) => i.type === 'guide'),
  banners: (state) => state.banners.filter((i) => i.type === 'banner'),
  setting: (state) => (name) => state.settings.find((i) => i.name === name)?.value ?? null,
  category: (state) => (name) => state.categories.filter((i) => i.name === name)?.[0]?.value ?? null
}

const mutations = {
  set_banners(state, payload) {
    state.banners = payload
  },
  set_settings(state, payload) {
    state.settings = payload
  },
  set_categories(state, payload) {
    state.categories = payload
  },
  set_services(state, payload) {
    state.services = payload
  },
  set_coupons(state, payload) {
    state.coupons = payload
  },
  set_vehicles(state, payload) {
    state.vehicles = payload
  },
  set_staffs(state, payload) {
    state.staffs = payload
  }
}

const actions = {
  loadBanners({ commit }) {
    bannerApi.index().then((data) => {
      commit('set_banners', data)
    })
  },
  loadSettings({ commit }) {
    settingApi.index().then((data) => {
      commit('set_settings', data)
    })
  },
  loadCategories({ commit }) {
    categoryApi.index({ with: 'services' }).then((data) => {
      commit('set_categories', data)
      let services = []
      data.forEach((i) => {
        services = services.concat(i.services)
      })
      commit('set_services', services)
    })
  },
  loadCoupons({ commit }) {
    couponApi.index().then((data) => {
      commit('set_coupons', data)
    })
  },
  loadVehicles({ commit }) {
    vehicleApi.index().then((data) => {
      const vehicles = data.map((i) => ({ ...i, label: i.name, value: i.name, extra: i.id }))
      commit('set_vehicles', vehicles)
    })
  },
  loadStaffs({ commit }) {
    staffApi.index().then((data) => {
      commit('set_staffs', data)
    })
  },
  init({ dispatch }) {
    dispatch('loadBanners')
    dispatch('loadSettings')
    dispatch('loadCategories')
    dispatch('loadCoupons')
    dispatch('loadVehicles')
    dispatch('loadStaffs')
  }
}

export default { namespaced: true, state, getters, mutations, actions }
