/**
 * Handler partagé pour la barre du bas (composant bottom-nav-bar ou markup legacy).
 */
function defaultBottomNavTap(e) {
  const action =
    (e.detail && e.detail.action) ||
    (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.action);
  if (action === 'home') {
    wx.reLaunch({ url: '/pages/index/index' });
    return;
  }
  wx.showToast({ title: 'Bientôt disponible', icon: 'none' });
}

module.exports = {
  defaultBottomNavTap
};
