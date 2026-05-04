Page({
  data: {
    statusBarHeight: 20,
    messageCount: 6,
    currentStep: 1,
    stepsData: [
      {
        id: 1,
        title: "Demande bien reçue et en cours de traitement",
        heroType: 'operator',
        message: "Votre demande a été enregistrée. nous allons vous confirmer l’envoi d’une ambulance dans quelques minutes."
      },
      {
        id: 2,
        title: "Ambulance en route",
        heroType: 'ambulance',
        message: "votre ambulance est en route. nous sommes à vos cotés."
      },
      {
        id: 3,
        title: "Ces contacts sont au courant de votre urgence",
        heroType: 'operator',
        message: "nous avons informé vos contacts. ils seront tenus au courant de chaque étape de votre prise en charge."
      },
      {
        id: 4,
        title: "Ambulance est arrivé chez vous",
        heroType: 'ambulance',
        message: "l'ambulance est arrivée pour vous prendre en charge. nous sommes là pour vous."
      },
      {
        id: 5,
        title: "En route vers hôpital EL MANSOUR",
        heroType: 'operator',
        message: "vous êtes en route vers l'hôpital. nous allons nous occuper de votre admission."
      },
      {
        id: 6,
        title: "Vous êtes admis à l’ hôpital",
        heroType: 'operator',
        message: "vous êtes maintenant pris en charge à l'hôpital el mansour"
      }
    ]
  },

  onLoad: function() {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    });
  },

  onBackTap: function() {
    wx.reLaunch({ url: '../home/home' });
  },

  onStepTap: function(e) {
    const step = parseInt(e.currentTarget.dataset.step);
    
    if (step === 6) {
      this.setData({ currentStep: 6 });
      setTimeout(() => {
        wx.navigateTo({
          url: '../urgence-paiement/urgence-paiement'
        });
      }, 800);
    } else if (step > this.data.currentStep) {
      this.setData({
        currentStep: step
      });
    }
    
    if (wx.vibrateShort) wx.vibrateShort();
  },

  onNavTap: function(e) {
    const action = e.detail.action;
    if (action === 'home') {
      wx.reLaunch({ url: '../home/home' });
    } else if (action === 'emergency') {
      wx.redirectTo({ url: '../urgence/urgence' });
    }
  }
});
