import axios from '@/utils/axios'

export default {
  store(data) {
    return axios.post('/tickets', data)
  }
}
