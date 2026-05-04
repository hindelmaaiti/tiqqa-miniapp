const { defaultBottomNavTap } = require('../../utils/defaultNavTap.js');

Page({
  data: {
    title: "Recapitulatif"
  },

  onBack() {
    wx.navigateBack();
  },
  onNext() {
    this.onGoPaymethod();
  },
  onPrev() {
    wx.navigateTo({ url: '/pages/sante_rdv_status/sante_rdv_status' });
  },

  onGoPaymethod() {
    wx.navigateTo({
      url: "/pages/sante_carte/sante_carte"
    });
  },

  onNavTap: defaultBottomNavTap
});
