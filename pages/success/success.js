Page({
  data: {},

  onLoad() {
    console.log('Page de succès affichée');
  },

  goToHome() {
    wx.reLaunch({
      url: '/pages/home/home'
    });
  }
});
