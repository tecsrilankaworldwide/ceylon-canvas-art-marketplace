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
