const { register } = require('../../utils/api');

Page({
  data: {
    firstName: '',
    lastName: '',
    phone: '',
    cin: '',
    email: '',
    password: '',
    operatorLogo: '/assets/default-sim.png',
    selectedOperator: '',
    acceptTerms: false
  },

  onFirstNameInput(e) {
    this.setData({ firstName: e.detail.value });
  },

  onLastNameInput(e) {
    this.setData({ lastName: e.detail.value });
  },

  onPhoneInput(e) {
    const value = e.detail.value;
    let logo = '/assets/default-sim.png';
    let operator = '';

    if (value.startsWith('06') || value.startsWith('07')) {
      logo = '/assets/iam.png';
      operator = 'IAM';
    } else if (value.startsWith('05')) {
      logo = '/assets/orange.png';
      operator = 'Orange';
    } else if (value.startsWith('08')) {
      logo = '/assets/inwi.png';
      operator = 'Inwi';
    }

    this.setData({
      phone: value,
      operatorLogo: logo,
      selectedOperator: operator
    });
  },

  onCinInput(e) {
    this.setData({ cin: e.detail.value });
  },

  onEmailInput(e) {
    this.setData({ email: e.detail.value });
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  onTermsChange(e) {
    const values = e.detail.value || [];
    this.setData({ acceptTerms: values.includes('accepted') });
  },

  openSimSelector() {
    wx.showActionSheet({
      itemList: ['IAM', 'Orange', 'Inwi'],
      success: (res) => {
        let logo = '/assets/default-sim.png';
        let operator = '';

        if (res.tapIndex === 0) {
          logo = '/assets/iam.png';
          operator = 'IAM';
        } else if (res.tapIndex === 1) {
          logo = '/assets/orange.png';
          operator = 'Orange';
        } else if (res.tapIndex === 2) {
          logo = '/assets/inwi.png';
          operator = 'Inwi';
        }

        this.setData({
          operatorLogo: logo,
          selectedOperator: operator
        });
      }
    });
  },

  goToVerification() {
    const {
      firstName,
      lastName,
      phone,
      cin,
      email,
      password,
      selectedOperator,
      acceptTerms
    } = this.data;

    if (!firstName || !lastName || !phone || !cin || !email || !password) {
      wx.showToast({
        title: 'Veuillez remplir tous les champs',
        icon: 'none'
      });
      return;
    }

    if (!acceptTerms) {
      wx.showToast({
        title: 'Veuillez accepter les conditions',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: 'Inscription...' });
    register({
      username: phone,
      email,
      nom: lastName,
      prenom: firstName,
      password,
      telephone: phone,
      operateur: (selectedOperator || '').toLowerCase(),
      cin
    })
      .then(() => {
        wx.hideLoading();
        wx.showToast({
          title: 'Compte cree avec succes',
          icon: 'success'
        });
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/verify/verify'
          });
        }, 500);
      })
      .catch((error) => {
        wx.hideLoading();
        wx.showToast({
          title: error.message || 'Inscription impossible',
          icon: 'none'
        });
      });
  }
});
