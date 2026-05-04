const { defaultBottomNavTap } = require('../../utils/defaultNavTap.js');

Page({
  data: {
    paymentMethod: "Tashilate",
    cardNumber: "0598 550 993 34",
    expDate: "21/06/2030",
    cvc: "435",
    billingAddress: "Espèces",
    acceptedCGU: false,
    showModal: false
  },

  onLoad(options) {
    if (options.method) {
      this.setData({ paymentMethod: options.method });
    }
  },

  onBack() {
    wx.navigateBack();
  },
  onNext() {
    this.closeModal(); // On simule la confirmation
  },
  onPrev() {
    wx.navigateTo({ url: '/pages/sante_carte/sante_carte' });
  },

  toggleCGU() {
    this.setData({ acceptedCGU: !this.data.acceptedCGU });
  },

  onConfirmPayment() {
    if (!this.data.acceptedCGU) {
      wx.showToast({
        title: 'Veuillez accepter les CGU',
        icon: 'none'
      });
      return;
    }
    // Afficher le modal au lieu de naviguer directement
    this.setData({ showModal: true });
  },

  closeModal() {
    this.setData({ showModal: false });
    // Naviguer après avoir fermé le modal
    wx.navigateTo({
      url: '/pages/sante_rdv_status/sante_rdv_status'
    });
  },

  onNavTap: defaultBottomNavTap
});
