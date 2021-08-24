import wechatApi from '@/api/wechat'

const state = () => ({
  wechat: null
})

const mutations = {
  set_wechat(state, payload) {
    state.wechat = payload
  }
}

const actions = {
  loadWechat({ commit }) {
    return new Promise((resolve, reject) => {
      uni
        .login()
        .then(([_, res]) => {
          return wechatApi.current(res.code)
        })
        .then((data) => {
          commit('set_wechat', data)
          resolve()
        })
        .catch((e) => reject(e))
    })
  },
  updateWechat({ state, commit }) {
    return new Promise((resolve, reject) => {
      uni
        .getUserProfile({ desc: '用户注册' })
        .then(([err, res]) => {
          if (err) throw new Error(err.errMsg)
          return wechatApi.update(state.wechat.openid, {
            ...state.wechat,
            ...res.userInfo,
            avatar: res.userInfo.avatarUrl,
            nickname: res.userInfo.nickName
          })
        })
        .then((data) => {
          commit('set_wechat', data)
          resolve(data)
        })
        .catch((e) => reject(e))
    })
  },
  bindPhone({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      wechatApi
        .decrypt({ ...data, session_key: state.wechat.session_key })
        .then((res) => {
          return wechatApi.update(state.wechat.openid, { ...state.wechat, phone: res.phoneNumber })
        })
        .then((res) => {
          commit('set_wechat', res)
          resolve(res)
        })
        .catch((e) => reject(e))
    })
  }
}

export default { namespaced: true, state, mutations, actions }
