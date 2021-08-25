import userApi from '@/api/user'

const state = () => ({
  user: null
})

const mutations = {
  set_user(state, payload) {
    state.user = payload
  }
}

const actions = {
  loadUser({ commit }) {
    return new Promise((resolve, reject) => {
      uni
        .login()
        .then(([_, res]) => {
          return userApi.current(res.code)
        })
        .then((data) => {
          commit('set_user', data)
          resolve()
        })
        .catch((e) => reject(e))
    })
  },
  updateUser({ state, commit }) {
    return new Promise((resolve, reject) => {
      uni
        .getUserProfile({ desc: '用户注册', lang: 'zh_CN' })
        .then(([err, res]) => {
          if (err) throw new Error(err.errMsg)
          const data = {
            ...state.user,
            ...res.userInfo,
            avatar: res.userInfo.avatarUrl,
            nickname: res.userInfo.nickName
          }
          if (state.user.id) {
            return userApi.update(state.user.id, data)
          } else {
            return Promise.resolve(data)
          }
        })
        .then((data) => {
          commit('set_user', data)
          resolve(data)
        })
        .catch((e) => reject(e))
    })
  },
  bindPhone({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      userApi
        .decrypt({ ...data, session_key: state.user.session_key })
        .then((res) => {
          if (state.user.id) {
            return userApi.update(state.user.id, { ...state.user, phone: res.phoneNumber })
          } else {
            return userApi.store({ ...state.user, phone: res.phoneNumber })
          }
        })
        .then((res) => {
          commit('set_user', res)
          resolve(res)
        })
        .catch((e) => reject(e))
    })
  }
}

export default { namespaced: true, state, mutations, actions }
