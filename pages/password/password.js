Page({

  data: {
    phoneNumber: '',
    maskedPhone: '',
    password: '',
    confirmPassword: ''
  },

  onLoad(options) {
    if (options.phone) {
      const phone = options.phone
      this.setData({
        phoneNumber: phone,
        maskedPhone: this.maskPhone(phone)
      })
    }
  },

  // Mask phone number (+212 6******75)
  maskPhone(phone) {
    if (phone.length < 4) return phone

    const start = phone.substring(0, 4)
    const end = phone.substring(phone.length - 2)
    return start + '******' + end
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  onConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    })
  },

  handleValidate() {

  if (!this.data.password || !this.data.confirmPassword) {
    wx.showToast({
      title: 'Veuillez remplir les champs',
      icon: 'none'
    })
    return
  }

  if (this.data.password !== this.data.confirmPassword) {
    wx.showToast({
      title: 'Les mots de passe ne correspondent pas',
      icon: 'none'
    })
    return
  }

  // ✅ Ila kolchi mzyan -> nmchi l page success
  wx.navigateTo({
    url: '/pages/success/success'
  })
}

})