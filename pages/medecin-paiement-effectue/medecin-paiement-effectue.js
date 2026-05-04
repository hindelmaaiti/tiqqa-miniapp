const { defaultBottomNavTap } = require('../../utils/defaultNavTap.js');

Page({
  onBack() {
    wx.navigateBack({ delta: 1 });
  },

  onModifierRdv() {
    wx.navigateTo({
      url: '/pages/medecin-horaire/medecin-horaire'
    });
  },

  onAnnuler() {
    wx.showModal({
      title: 'Annulation',
      content: "Confirmer l'annulation du RDV et la demande de remboursement ?",
      confirmText: 'Confirmer',
      cancelText: 'Fermer',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: 'Demande enregistrée', icon: 'none' });
        }
      }
    });
  },

  onNavTap: defaultBottomNavTap,

  onHeroCta() {
    wx.showToast({ title: 'Accéder bientôt', icon: 'none' });
  }
});
