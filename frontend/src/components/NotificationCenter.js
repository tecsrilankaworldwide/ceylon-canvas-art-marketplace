import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, MessageCircle, Gavel, ShoppingBag, 
  Star, BadgeCheck, X, Check, Trash2 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification
} from '../services/api';

const NotificationIcon = ({ type }) => {
  const icons = {
    message: <MessageCircle className="h-4 w-4 text-[#0F3057]" />,
    bid: <Gavel className="h-4 w-4 text-[#E5A93C]" />,
    outbid: <Gavel className="h-4 w-4 text-[#9E2A2B]" />,
    purchase: <ShoppingBag className="h-4 w-4 text-[#2D5A43]" />,
    commission: <Star className="h-4 w-4 text-[#B64E33]" />,
    review: <Star className="h-4 w-4 text-[#E5A93C]" />,
    verification: <BadgeCheck className="h-4 w-4 text-[#2D5A43]" />
  };
  return icons[type] || <Bell className="h-4 w-4 text-[#5C636A]" />;
};

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unread_count || 0);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await markNotificationRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteNotification(id);
      const notification = notifications.find(n => n.id === id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      if (notification && !notification.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          className="p-2 hover:bg-[#F0F0EA] rounded-sm transition-colors relative"
          data-testid="notification-bell"
        >
          <Bell className="h-5 w-5 text-[#1A1D20]" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#B64E33] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0" data-testid="notification-popover">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E5E5DF]">
          <h3 className="font-heading text-lg font-medium text-[#0F3057]">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllRead}
              className="text-xs text-[#0F3057] hover:text-[#0F3057]"
            >
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-[400px]">
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-spin h-6 w-6 border-2 border-[#0F3057] border-t-transparent rounded-full mx-auto" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-10 w-10 text-[#5C636A]/20 mx-auto mb-2" />
              <p className="font-body text-sm text-[#5C636A]">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E5DF]">
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  to={notification.link || '#'}
                  onClick={() => {
                    if (!notification.is_read) {
                      handleMarkRead(notification.id, { preventDefault: () => {}, stopPropagation: () => {} });
                    }
                    setOpen(false);
                  }}
                  className={`block p-4 hover:bg-[#F5F5F0] transition-colors ${!notification.is_read ? 'bg-[#F5F5F0]/50' : ''}`}
                  data-testid={`notification-${notification.id}`}
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-full ${!notification.is_read ? 'bg-[#0F3057]/10' : 'bg-[#F5F5F0]'}`}>
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-body text-sm ${!notification.is_read ? 'font-medium text-[#1A1D20]' : 'text-[#5C636A]'}`}>
                        {notification.title}
                      </p>
                      <p className="font-body text-xs text-[#5C636A] mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="font-body text-[10px] text-[#5C636A]/70 mt-1">
                        {formatTime(notification.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!notification.is_read && (
                        <button
                          onClick={(e) => handleMarkRead(notification.id, e)}
                          className="p-1 hover:bg-[#E5E5DF] rounded-sm"
                          title="Mark as read"
                        >
                          <Check className="h-3 w-3 text-[#5C636A]" />
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDelete(notification.id, e)}
                        className="p-1 hover:bg-[#E5E5DF] rounded-sm"
                        title="Delete"
                      >
                        <Trash2 className="h-3 w-3 text-[#5C636A]" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-2 border-t border-[#E5E5DF]">
            <Link
              to="/notifications"
              onClick={() => setOpen(false)}
              className="block text-center font-body text-sm text-[#0F3057] hover:underline py-2"
            >
              View all notifications
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
