import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setCart({ items: [], total: 0 });
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.get(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (artworkId, quantity = 1) => {
    if (!token) return;
    
    try {
      const response = await axios.post(`${API}/cart/add`, 
        { artwork_id: artworkId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (artworkId) => {
    if (!token) return;
    
    try {
      const response = await axios.delete(`${API}/cart/${artworkId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    if (!token) return;
    
    try {
      const response = await axios.delete(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const checkout = async () => {
    if (!token) return;
    
    try {
      const response = await axios.post(`${API}/checkout`, 
        { origin_url: window.location.origin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      clearCart,
      checkout,
      refreshCart: fetchCart,
      itemCount: cart.items.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
