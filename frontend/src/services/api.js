import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Artworks
export const getArtworks = async (params = {}) => {
  const response = await axios.get(`${API}/artworks`, { params });
  return response.data;
};

export const getFeaturedArtworks = async (limit = 8) => {
  const response = await axios.get(`${API}/artworks/featured`, { params: { limit } });
  return response.data;
};

export const getActiveAuctions = async (limit = 10) => {
  const response = await axios.get(`${API}/artworks/auctions`, { params: { limit } });
  return response.data;
};

export const getArtwork = async (id) => {
  const response = await axios.get(`${API}/artworks/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const createArtwork = async (data) => {
  const response = await axios.post(`${API}/artworks`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateArtwork = async (id, data) => {
  const response = await axios.put(`${API}/artworks/${id}`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const deleteArtwork = async (id) => {
  const response = await axios.delete(`${API}/artworks/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Artists
export const getArtists = async (params = {}) => {
  const response = await axios.get(`${API}/artists`, { params });
  return response.data;
};

export const getArtist = async (id) => {
  const response = await axios.get(`${API}/artists/${id}`);
  return response.data;
};

export const getArtistArtworks = async (id, params = {}) => {
  const response = await axios.get(`${API}/artists/${id}/artworks`, { params });
  return response.data;
};

export const updateArtistProfile = async (data) => {
  const response = await axios.put(`${API}/artists/me`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Bids
export const placeBid = async (artworkId, amount) => {
  const response = await axios.post(`${API}/bids`, 
    { artwork_id: artworkId, amount },
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const getArtworkBids = async (artworkId, limit = 20) => {
  const response = await axios.get(`${API}/artworks/${artworkId}/bids`, {
    params: { limit }
  });
  return response.data;
};

export const getMyBids = async () => {
  const response = await axios.get(`${API}/bids/me`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Commissions
export const createCommission = async (data) => {
  const response = await axios.post(`${API}/commissions`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getMyCommissions = async () => {
  const response = await axios.get(`${API}/commissions/me`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateCommissionStatus = async (id, status) => {
  const response = await axios.put(`${API}/commissions/${id}/status?status=${status}`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Wishlist
export const getWishlist = async () => {
  const response = await axios.get(`${API}/wishlist`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const addToWishlist = async (artworkId) => {
  const response = await axios.post(`${API}/wishlist/${artworkId}`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const removeFromWishlist = async (artworkId) => {
  const response = await axios.delete(`${API}/wishlist/${artworkId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Orders
export const getOrders = async () => {
  const response = await axios.get(`${API}/orders`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Categories
export const getCategories = async () => {
  const response = await axios.get(`${API}/categories`);
  return response.data;
};

// Mediums
export const getMediums = async () => {
  const response = await axios.get(`${API}/mediums`);
  return response.data;
};

// Stats
export const getStats = async () => {
  const response = await axios.get(`${API}/stats`);
  return response.data;
};

// Checkout Status
export const getCheckoutStatus = async (sessionId) => {
  const response = await axios.get(`${API}/checkout/status/${sessionId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Seed Data
export const seedData = async () => {
  const response = await axios.post(`${API}/seed`);
  return response.data;
};

// Reviews
export const getArtworkReviews = async (artworkId, skip = 0, limit = 20) => {
  const response = await axios.get(`${API}/artworks/${artworkId}/reviews`, {
    params: { skip, limit }
  });
  return response.data;
};

export const getArtistReviews = async (artistId, skip = 0, limit = 20) => {
  const response = await axios.get(`${API}/artists/${artistId}/reviews`, {
    params: { skip, limit }
  });
  return response.data;
};

export const createReview = async (data) => {
  const response = await axios.post(`${API}/reviews`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const markReviewHelpful = async (reviewId) => {
  const response = await axios.post(`${API}/reviews/${reviewId}/helpful`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Auction Wins
export const getAuctionWins = async () => {
  const response = await axios.get(`${API}/auctions/wins`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const checkoutAuctionWin = async (winId) => {
  const response = await axios.post(`${API}/auctions/wins/${winId}/checkout`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Analytics
export const getArtistAnalytics = async () => {
  const response = await axios.get(`${API}/analytics/artist`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getArtistArtworkAnalytics = async () => {
  const response = await axios.get(`${API}/analytics/artist/artworks`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Admin APIs
export const getAdminStats = async () => {
  const response = await axios.get(`${API}/admin/stats`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getAdminUsers = async (params = {}) => {
  const response = await axios.get(`${API}/admin/users`, {
    params,
    headers: getAuthHeader()
  });
  return response.data;
};

export const banUser = async (userId) => {
  const response = await axios.put(`${API}/admin/users/${userId}/ban`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const unbanUser = async (userId) => {
  const response = await axios.put(`${API}/admin/users/${userId}/unban`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const makeAdmin = async (userId) => {
  const response = await axios.put(`${API}/admin/users/${userId}/make-admin`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const removeAdmin = async (userId) => {
  const response = await axios.put(`${API}/admin/users/${userId}/remove-admin`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getAdminArtworks = async (params = {}) => {
  const response = await axios.get(`${API}/admin/artworks`, {
    params,
    headers: getAuthHeader()
  });
  return response.data;
};

export const flagArtwork = async (artworkId) => {
  const response = await axios.put(`${API}/admin/artworks/${artworkId}/flag`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const unflagArtwork = async (artworkId) => {
  const response = await axios.put(`${API}/admin/artworks/${artworkId}/unflag`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const adminDeleteArtwork = async (artworkId) => {
  const response = await axios.delete(`${API}/admin/artworks/${artworkId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getAdminArtists = async (params = {}) => {
  const response = await axios.get(`${API}/admin/artists`, {
    params,
    headers: getAuthHeader()
  });
  return response.data;
};

export const verifyArtist = async (artistId, data) => {
  const response = await axios.put(`${API}/admin/artists/${artistId}/verify`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getAdminOrders = async (params = {}) => {
  const response = await axios.get(`${API}/admin/orders`, {
    params,
    headers: getAuthHeader()
  });
  return response.data;
};

export const getRevenueChart = async (days = 30) => {
  const response = await axios.get(`${API}/admin/revenue-chart`, {
    params: { days },
    headers: getAuthHeader()
  });
  return response.data;
};

// Messaging APIs
export const getConversations = async () => {
  const response = await axios.get(`${API}/conversations`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getConversation = async (conversationId) => {
  const response = await axios.get(`${API}/conversations/${conversationId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const createConversation = async (recipientId, artworkId = null) => {
  const params = { recipient_id: recipientId };
  if (artworkId) params.artwork_id = artworkId;
  
  const response = await axios.post(`${API}/conversations`, null, {
    params,
    headers: getAuthHeader()
  });
  return response.data;
};

export const sendMessage = async (data) => {
  const response = await axios.post(`${API}/messages`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const markMessageRead = async (messageId) => {
  const response = await axios.put(`${API}/messages/${messageId}/read`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Notification APIs
export const getNotifications = async (unreadOnly = false) => {
  const response = await axios.get(`${API}/notifications`, {
    params: { unread_only: unreadOnly },
    headers: getAuthHeader()
  });
  return response.data;
};

export const markNotificationRead = async (notificationId) => {
  const response = await axios.put(`${API}/notifications/${notificationId}/read`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await axios.put(`${API}/notifications/read-all`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const deleteNotification = async (notificationId) => {
  const response = await axios.delete(`${API}/notifications/${notificationId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Currency APIs
export const getCurrencyRates = async () => {
  const response = await axios.get(`${API}/currency/rates`);
  return response.data;
};

export const convertCurrency = async (amount, fromCurrency = 'USD', toCurrency = 'LKR') => {
  const response = await axios.get(`${API}/currency/convert`, {
    params: { amount, from_currency: fromCurrency, to_currency: toCurrency }
  });
  return response.data;
};
