import axios from '@/utils/axios'

export default {
  current(code) {
    return axios.get('/users/current', { params: { code } })
  },
  store(data) {
    return axios.post('/users', data)
  },
  update(id, data) {
    return axios.put(`/users/${id}`, data)
  },
  decrypt(data) {
    return axios.post(`/users/decrypt`, data)
  }
}
