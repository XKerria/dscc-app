import axios from '@/utils/axios'

export default {
  current(code) {
    return axios.get('/wechats/current', { params: { code } })
  },
  update(openid, data) {
    return axios.put(`/wechats/${openid}`, data)
  },
  decrypt(data) {
    return axios.post(`/wechats/decrypt`, data)
  }
}
