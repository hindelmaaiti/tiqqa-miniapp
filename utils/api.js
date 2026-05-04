const BASE_URL = 'http://217.182.133.168:16080';

function isDevtools() {
  try {
    const info = wx.getSystemInfoSync();
    return info.platform === 'devtools';
  } catch (e) {
    return false;
  }
}

function shouldUseMockFromError(errMsg) {
  if (!isDevtools()) return false;
  const msg = String(errMsg || '').toLowerCase();
  return (
    msg.includes('valid domain name list') ||
    msg.includes('url not in domain list') ||
    msg.includes('not in domain')
  );
}

function getMockResponse(path, data) {
  if (path === '/api/mobile/v1/auth/login') {
    return {
      status: 'success',
      data: {
        access_token: 'mock_access_token_dev',
        refresh_token: 'mock_refresh_token_dev',
        user: {
          id: 'dev-user',
          telephone: data && data.telephone ? data.telephone : '',
          nom: 'Dev',
          prenom: 'User'
        }
      },
      mock: true
    };
  }

  if (path === '/api/mobile/v1/auth/register') {
    return {
      status: 'success',
      data: {
        id: 'mock-register-dev',
        telephone: data && data.telephone ? data.telephone : ''
      },
      mock: true
    };
  }

  return null;
}

function request(path, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${path}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...headers
      },
      success: (res) => {
        const body = res.data || {};
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
          return;
        }

        const message =
          body.message ||
          body.error ||
          `Erreur API (${res.statusCode})`;
        reject(new Error(message));
      },
      fail: (err) => {
        const errMsg = err && err.errMsg ? err.errMsg : 'Erreur reseau';
        const mockResponse = getMockResponse(path, data);

        if (mockResponse && shouldUseMockFromError(errMsg)) {
          wx.showToast({
            title: 'Mode mock actif (dev)',
            icon: 'none'
          });
          resolve(mockResponse);
          return;
        }

        reject(new Error(errMsg));
      }
    });
  });
}

function normalizePhone(phone) {
  return String(phone || '').replace(/\s+/g, '');
}

function login(telephone, password) {
  return request('/api/mobile/v1/auth/login', 'POST', {
    telephone: normalizePhone(telephone),
    password
  });
}

function register(payload) {
  return request('/api/mobile/v1/auth/register', 'POST', payload);
}

module.exports = {
  BASE_URL,
  login,
  register
};
