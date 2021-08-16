import axios from '@/utils/axios'

export default {
  login(data) {
    return axios.post('/auth/login', data)
  }
}
