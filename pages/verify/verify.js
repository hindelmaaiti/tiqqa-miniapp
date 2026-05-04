Page({
  data: {
    code: ["", "", "", ""],
    currentIndex: 0,
    seconds: 56,
    timer: null,
    inputFocused: false
  },

  onLoad() {
    this.startTimer();
  },

  onUnload() {
    clearInterval(this.data.timer);
  },

  /* ===== TIMER ===== */
  startTimer() {
    const timer = setInterval(() => {
      let s = this.data.seconds;
      if (s > 0) {
        this.setData({ seconds: s - 1 });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    this.setData({ timer });
  },

  /* ===== KEYPAD CLICK ===== */
  handleKey(e) {
    const key = e.currentTarget.dataset.key;
    let { code, currentIndex } = this.data;

    if (key === "delete") {
      if (currentIndex > 0) {
        currentIndex--;
        code[currentIndex] = "";
      }
    } else {
      if (currentIndex < 4) {
        code[currentIndex] = key;
        currentIndex++;
      }
    }

    this.setData({ code, currentIndex });

    /* CODE COMPLET - Hide keyboard and show button */
    if (currentIndex === 4) {
      const finalCode = code.join("");
      console.log("Code saisi :", finalCode);
      
      // Hide keyboard when all digits entered
      this.setData({ inputFocused: false });
    }
  },

  /* ===== FOCUS CODE INPUT ===== */
  focusCodeInput() {
    this.setData({ inputFocused: true });
  },

  /* ===== VALIDATE CODE ===== */
  handleValidate() {
    const { code, currentIndex } = this.data;

    if (currentIndex < 4) {
      wx.showToast({
        title: "Veuillez entrer les 4 chiffres",
        icon: "none"
      })
      return
    }

    const finalCode = code.join("");
    console.log("Code validé :", finalCode);

    // Dismiss keyboard
    this.setData({ inputFocused: false });

    // Navigate to password page
    wx.navigateTo({
      url: "/pages/password/password"
    })
  }
});