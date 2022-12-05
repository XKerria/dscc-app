export default {
  //发送给朋友
  onShareAppMessage(res) {
    return {
      title: 'DSCC超跑俱乐部',
      imageUrl: '/static/images/share.png',
      path: '/pages/guide/guide'
    }
  },
  //分享到朋友圈
  onShareTimeline(res) {
    return {
      title: 'DSCC超跑俱乐部',
      imageUrl: '/static/images/share.png',
      path: '/pages/guide/guide'
    }
  }
}
