import { apiRequest } from './client';

/**
 * Rooms API Service
 */
export const roomApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const queryString = query.toString();
    return apiRequest(`/rooms${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id, coords = {}) => {
    const query = new URLSearchParams();
    if (coords.userLat) query.append('userLat', coords.userLat);
    if (coords.userLng) query.append('userLng', coords.userLng);
    const queryString = query.toString();
    return apiRequest(`/rooms/${id}${queryString ? `?${queryString}` : ''}`);
  },

  create: async (roomData) => {
    return apiRequest('/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData)
    });
  },

  update: async (id, roomData) => {
    return apiRequest(`/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(roomData)
    });
  },

  delete: async (id) => {
    return apiRequest(`/rooms/${id}`, {
      method: 'DELETE'
    });
  },

  addReview: async (id, reviewData) => {
    return apiRequest(`/rooms/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }
};

/**
 * Authentication API Service
 */
export const authApi = {
  register: async (userData) => {
    const res = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (res.token) {
      localStorage.setItem('rf_token', res.token);
    }
    return res;
  },

  login: async (credentials) => {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res.token) {
      localStorage.setItem('rf_token', res.token);
    }
    return res;
  },

  demoLogin: async (type = 'seeker') => {
    const res = await apiRequest('/auth/demo-login', {
      method: 'POST',
      body: JSON.stringify({ type })
    });
    if (res.token) {
      localStorage.setItem('rf_token', res.token);
    }
    return res;
  },

  getMe: async () => {
    return apiRequest('/auth/me');
  },

  updateProfile: async (profileData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  logout: () => {
    localStorage.removeItem('rf_token');
    localStorage.removeItem('rf_user');
  }
};

/**
 * Saved / Wishlist API Service
 */
export const savedApi = {
  getAll: async () => {
    return apiRequest('/saved');
  },

  toggle: async (roomId) => {
    return apiRequest(`/saved/${roomId}`, {
      method: 'POST'
    });
  },

  remove: async (roomId) => {
    return apiRequest(`/saved/${roomId}`, {
      method: 'DELETE'
    });
  },

  clear: async () => {
    return apiRequest('/saved', {
      method: 'DELETE'
    });
  }
};

/**
 * Visits & Tours API Service
 */
export const visitApi = {
  book: async (visitData) => {
    return apiRequest('/visits', {
      method: 'POST',
      body: JSON.stringify(visitData)
    });
  },

  getMy: async () => {
    return apiRequest('/visits/my');
  },

  updateStatus: async (id, status) => {
    return apiRequest(`/visits/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }
};

/**
 * Messaging API Service
 */
export const messageApi = {
  send: async (msgData) => {
    return apiRequest('/messages', {
      method: 'POST',
      body: JSON.stringify(msgData)
    });
  },

  getMy: async () => {
    return apiRequest('/messages');
  }
};

/**
 * Flatmates API Service
 */
export const flatmateApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val && val !== 'All' && val !== 'all') {
        query.append(key, val);
      }
    });
    const queryString = query.toString();
    return apiRequest(`/flatmates${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return apiRequest(`/flatmates/${id}`);
  },

  create: async (data) => {
    return apiRequest('/flatmates', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};

/**
 * Locations & Commute API Service
 */
export const locationApi = {
  getLocalities: async () => {
    return apiRequest('/locations/localities');
  },

  getLandmarks: async () => {
    return apiRequest('/locations/landmarks');
  },

  calculateCommute: async (data) => {
    return apiRequest('/locations/commute', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  checkHealth: async () => {
    return apiRequest('/health');
  }
};
