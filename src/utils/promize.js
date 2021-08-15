export const chooseImage = (options = {}) => {
  return new Promise((resolve, reject) => {
      uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        sizeType: ['original'],
        ...options,
        success (res) {
          resolve(res)
        },
        fail (e) {
          reject(e)
        }
      })
  })
}
