import axios from '@/utils/axios'

export default {
  store(data, params) {
    return axios.post('/reserves', data, { params })
  }
}
