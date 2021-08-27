import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/tickets', { params })
  },
  store(data) {
    return axios.post('/tickets', data)
  }
}
