import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useWebSocket } from '../hooks/useWebSocket';
import { toast } from 'sonner';

const WebSocketContext = createContext(null);

export const useRealTime = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useRealTime must be used within WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [bidUpdates, setBidUpdates] = useState({});
  const [newMessages, setNewMessages] = useState([]);

  // Event listeners that components can subscribe to
  const [listeners, setListeners] = useState({
    notification: [],
    message: [],
    bid_update: []
  });

  const handleMessage = useCallback((data) => {
    console.log('WebSocket message received:', data);

    switch (data.type) {
      case 'notification':
        // Add to notifications list
        setNotifications(prev => [data.data, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show toast notification
        toast(data.data.title, {
          description: data.data.message,
          action: data.data.link ? {
            label: 'View',
            onClick: () => window.location.href = data.data.link
          } : undefined
        });
        
        // Notify listeners
        listeners.notification.forEach(callback => callback(data.data));
        break;

      case 'message':
        // Add to new messages
        setNewMessages(prev => [...prev, data.data]);
        
        // Show toast for new message
        toast('New Message', {
          description: `${data.data.sender_name}: ${data.data.content.slice(0, 50)}...`,
          action: {
            label: 'Reply',
            onClick: () => window.location.href = `/messages/${data.data.conversation_id}`
          }
        });
        
        // Notify listeners
        listeners.message.forEach(callback => callback(data.data));
        break;

      case 'bid_update':
        // Update bid data
        setBidUpdates(prev => ({
          ...prev,
          [data.data.artwork_id]: data.data
        }));
        
        // Notify listeners
        listeners.bid_update.forEach(callback => callback(data.data));
        break;

      default:
        console.log('Unknown WebSocket message type:', data.type);
    }
  }, [listeners]);

  const { isConnected, send } = useWebSocket(
    isAuthenticated ? token : null,
    handleMessage
  );

  // Subscribe to events
  const subscribe = useCallback((eventType, callback) => {
    setListeners(prev => ({
      ...prev,
      [eventType]: [...(prev[eventType] || []), callback]
    }));

    // Return unsubscribe function
    return () => {
      setListeners(prev => ({
        ...prev,
        [eventType]: (prev[eventType] || []).filter(cb => cb !== callback)
      }));
    };
  }, []);

  // Subscribe to auction updates
  const subscribeToAuction = useCallback((artworkId) => {
    if (isConnected) {
      send({ type: 'subscribe_auction', artwork_id: artworkId });
    }
  }, [isConnected, send]);

  // Clear new message when viewed
  const clearNewMessage = useCallback((messageId) => {
    setNewMessages(prev => prev.filter(m => m.id !== messageId));
  }, []);

  // Mark notification as read locally
  const markNotificationRead = useCallback((notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  // Get latest bid for an artwork
  const getLatestBid = useCallback((artworkId) => {
    return bidUpdates[artworkId];
  }, [bidUpdates]);

  return (
    <WebSocketContext.Provider value={{
      isConnected,
      notifications,
      unreadCount,
      newMessages,
      bidUpdates,
      subscribe,
      subscribeToAuction,
      clearNewMessage,
      markNotificationRead,
      getLatestBid,
      send
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
