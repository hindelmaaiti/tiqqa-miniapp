Page({
  data: {
    code: ['', '', '', ''],
    currentIndex: 0,
    inputFocused: true
  },

  handleKey(e) {
    const key = e.currentTarget.dataset.key
    let { code, currentIndex } = this.data

    if (key === 'delete') {
      if (currentIndex > 0) {
        currentIndex--
        code[currentIndex] = ''
      }
    } else {
      if (currentIndex < 4) {
        code[currentIndex] = key
        currentIndex++
      }
    }

    this.setData({
      code,
      currentIndex,
      inputFocused: currentIndex < 4
    })
  },

  handleValidate() {
    const enteredCode = this.data.code.join('')

    if (enteredCode.length === 4) {
      wx.navigateTo({
        url: '/pages/password/password'   
      })
    }
  }
})