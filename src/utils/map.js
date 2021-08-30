import QQMapWX from '@/assets/js/qqmap-wx-jssdk.min'

const qqmapKey = process.env.VUE_APP_QQ_MAP_KEY
const map = new QQMapWX({ key: qqmapKey })

export default {
  calculateDistance(options) {
    return new Promise((resolve, reject) => {
      map.calculateDistance({
        ...options,
        success(res) {
          const { status } = res
          if (status === 0) {
            const [result] = res.result.elements
            resolve(result)
          } else {
            reject(res)
          }
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }
}
