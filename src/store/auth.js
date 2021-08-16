import wechatApi from '@/api/wechat'
import authApi from '@/api/auth'

const state = () => ({
  wechat: null
})

const mutations = {
  set_wechat(state, payload) {
    state.wechat = payload
  }
}

const actions = {
  login({ commit }, obj) {
    return new Promise((resolve, reject) => {
      authApi
        .login(obj)
        .then((data) => {
          commit('set_wechat', data)
          resolve()
        })
        .catch((e) => reject(e))
    })
  }
}

export default { namespaced: true, state, mutations, actions }
