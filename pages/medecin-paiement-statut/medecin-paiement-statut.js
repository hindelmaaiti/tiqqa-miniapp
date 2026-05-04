const { defaultBottomNavTap } = require('../../utils/defaultNavTap.js');

Page({
  onBack() {
    wx.navigateBack({ delta: 1 });
  },

  onModifierRdv() {
    wx.reLaunch({
      url: '/pages/medecin-domicile/medecin-domicile'
    });
  },

  onAnnulerRemboursement() {
    wx.navigateTo({
      url: '/pages/medecin-rdv-annule/medecin-rdv-annule'
    });
  },

  onNavTap: defaultBottomNavTap,

  onHeroCta() {
    wx.showToast({ title: 'Accéder bientôt', icon: 'none' });
  }
});
