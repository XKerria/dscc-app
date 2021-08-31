export default {
  openSetting() {
    return new Promise((resolve, reject) => {
      uni.openSetting({
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  },
  checkPermission(scope) {
    return new Promise((resolve, reject) => {
      uni.getSetting({
        success(res) {
          if (res.authSetting[scope]) {
            resolve()
          } else {
            reject()
          }
        },
        fail(e) {
          reject(e)
        }
      })
    })
  },
  authorize(scope) {
    return new Promise((resolve, reject) => {
      uni.authorize({
        scope,
        success() {
          resolve()
        },
        fail(e) {
          reject(e)
        }
      })
    })
  },
  chooseLocation() {
    return new Promise((resolve, reject) => {
      uni.chooseLocation({
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }
}
