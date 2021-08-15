import bannerApi from '@/api/banner'
import settingApi from '@/api/setting'

const state = () => ({
  banners: [],
  settings: []
})

const getters = {
  guides: (state) => state.banners.filter((i) => i.type === 'guide'),
  banners: (state) => state.banners.filter((i) => i.type === 'banner'),
  setting: (state) => (name) => state.settings.filter((i) => i.name === name)?.[0]?.value ?? null
}

const mutations = {
  set_banners(state, payload) {
    state.banners = payload
  },
  set_settings(state, payload) {
    state.settings = payload
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
  init({ dispatch }) {
    dispatch('loadBanners')
    dispatch('loadSettings')
  }
}

export default { namespaced: true, state, getters, mutations, actions }
