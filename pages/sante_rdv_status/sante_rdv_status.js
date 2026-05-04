const { defaultBottomNavTap } = require('../../utils/defaultNavTap.js');

Page({
  data: {
    dateStr: "Mardi 13 avril à 12h",
    address: "60, Avenue Hassan 2, Res Yasmine",
    amount: "150 Dhs",
    paymentMethod: "Espèces",
    status: "RENDEZ VOUS ANNULÉ"
  },
  onBack() {
    wx.navigateBack();
  },
  onPrev() {
    wx.navigateTo({ url: '/pages/sante_paiement_detail/sante_paiement_detail' });
  },
  onNext() {
    wx.showToast({ title: 'Fin du parcours', icon: 'none' });
  },
  onConfirm() {
    wx.showToast({ title: "RDV confirmé", icon: "success" });
  },
  onCancel() {
    wx.showToast({ title: "RDV annulé", icon: "none" });
  },

  onNavTap: defaultBottomNavTap
});
