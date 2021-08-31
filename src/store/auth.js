import userApi from '@/api/user'
import ticketApi from '@/api/ticket'
import reserveApi from '@/api/reserve'
import dayjs from 'dayjs'

const units = { 代金券: '￥' }

const state = () => ({
  user: null,
  tickets: [],
  reserves: []
})

const mutations = {
  set_user(state, payload) {
    state.user = payload
  },
  set_tickets(state, payload) {
    state.tickets = payload
  },
  set_reserves(state, payload) {
    state.reserves = payload
  }
}

const actions = {
  loadReserves({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state?.user?.id) return Promise.resolve([])
      reserveApi
        .index({
          compare: `user_id:${state.user.id}`,
          order: 'created_at:desc',
          with: 'service|staff|ticket'
        })
        .then((res) => {
          commit('set_reserves', res)
          resolve(res)
        })
        .catch((e) => reject(e))
    })
  },
  loadTickets({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state?.user?.id && state.user.id) return Promise.resolve([])
      ticketApi
        .index({
          compare: `user_id:${state.user.id}|expired_at:${encodeURIComponent(dayjs().toISOString())},>|used_at:`,
          with: 'partner|coupon'
        })
        .then((res) => {
          const tickets = res.map((i) => ({
            ...i,
            label: `${units[i.coupon.type]}${i.coupon.value} ${i.coupon.type}（${i.partner.name}）`,
            value: i.id
          }))
          commit('set_tickets', tickets)
          resolve(tickets)
        })
        .catch((e) => reject(e))
    })
  },
  loadUser({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      uni
        .login()
        .then(([_, res]) => {
          return userApi.current(res.code)
        })
        .then((data) => {
          commit('set_user', data)
          if (data.id) {
            dispatch('loadReserves')
            dispatch('loadTickets')
          }
          resolve()
        })
        .catch((e) => reject(e))
    })
  },
  updateUser({ state, commit, dispatch }) {
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
            dispatch('loadReserves')
            dispatch('loadTickets')
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
  bindPhone({ state, commit, dispatch }, data) {
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
          if (res?.id) {
            dispatch('loadReserves')
            dispatch('loadTickets')
          }
          resolve(res)
        })
        .catch((e) => reject(e))
    })
  }
}

export default { namespaced: true, state, mutations, actions }
