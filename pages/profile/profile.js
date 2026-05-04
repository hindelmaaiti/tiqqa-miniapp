Page({
  data: {
    activeTab: 'profil',
    showModal: false,
    user: {
      nom: '',
      prenom: '',
      email: 'example@gmail.com',
      dob: '',
      phone: '06'
    },
    memberInfo: {
      nom: '',
      prenom: '',
      relationship: '',
      phone: ''
    },
    fullName: 'Ahmed Salim'
  },

  onLoad(options) {
    // Initialize data if needed
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`user.${field}`]: value
    });
  },

  onMemberInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`memberInfo.${field}`]: value
    });
  },

  openModal() {
    this.setData({ showModal: true });
  },

  closeModal() {
    this.setData({ showModal: false });
  },

  onDeleteContact() {
    wx.showModal({
      title: 'Supprimer',
      content: 'Voulez-vous supprimer ce contact ?',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: 'Contact supprimé', icon: 'success' });
        }
      }
    });
  },

  onValider() {
    if (this.data.showModal) {
      wx.showToast({
        title: 'Membre mis à jour',
        icon: 'success'
      });
      this.closeModal();
    } else {
      wx.showToast({
        title: 'Profil mis à jour',
        icon: 'success'
      });
    }
  }
});
