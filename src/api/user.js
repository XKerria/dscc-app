import axios from '@/utils/axios'

export default {
  current(code) {
    return axios.get('/users/current', { params: { code } })
  },
  update(openid, data) {
    return axios.put(`/users/${openid}`, data)
  },
  decrypt(data) {
    return axios.post(`/users/decrypt`, data)
  }
}
