import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/reserves', { params })
  },
  store(data, params) {
    return axios.post('/reserves', data, { params })
  }
}
