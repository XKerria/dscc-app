import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/cars', { params })
  }
}
