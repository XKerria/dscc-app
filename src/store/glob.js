import bannerApi from '@/api/banner'
import settingApi from '@/api/setting'
import categoryApi from '@/api/category'

const state = () => ({
  banners: [],
  settings: [],
  categories: []
})

const getters = {
  guides: (state) => state.banners.filter((i) => i.type === 'guide'),
  banners: (state) => state.banners.filter((i) => i.type === 'banner'),
  setting: (state) => (name) => state.settings.filter((i) => i.name === name)?.[0]?.value ?? null,
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
    })
  },
  init({ dispatch }) {
    dispatch('loadBanners')
    dispatch('loadSettings')
    dispatch('loadCategories')
  }
}

export default { namespaced: true, state, getters, mutations, actions }
