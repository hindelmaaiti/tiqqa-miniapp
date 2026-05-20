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
    fullName: 'Ahmed Salim',
    phone: '0611996095',
    viewState: 'main' // 'main' or 'details'
  },

  onLoad(options) {
    // Initialize data if needed
  },

  showDetails() {
    this.setData({ viewState: 'details' });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  onBack() {
    if (this.data.viewState === 'details') {
      this.setData({ viewState: 'main' });
    } else {
      wx.navigateBack();
    }
  },

  onReglagesTap() {
    wx.navigateTo({
      url: '/pages/reglages/reglages'
    });
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
  },

  onNavTap(e) {
    const action = e.detail.action;
    if (action === 'home') {
      wx.reLaunch({ url: '../sante/sante' });
    } else if (action === 'emergency') {
      wx.redirectTo({ url: '../urgence/urgence' });
    }
  }
});
