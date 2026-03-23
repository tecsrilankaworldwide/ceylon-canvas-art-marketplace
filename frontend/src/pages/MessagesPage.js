import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRealTime } from '../context/WebSocketContext';
import { 
  MessageCircle, Send, ArrowLeft, Image, User, 
  Search, MoreVertical, Check, CheckCheck, Wifi, WifiOff
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
import { toast } from 'sonner';
import {
  getConversations,
  getConversation,
  sendMessage
} from '../services/api';

const MessagesPage = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { isConnected, subscribe } = useRealTime();
  
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle real-time incoming messages
  const handleNewMessage = useCallback((message) => {
    // Add to messages if it's for the active conversation
    if (message.conversation_id === conversationId) {
      setMessages(prev => {
        // Check if message already exists
        if (prev.some(m => m.id === message.id)) return prev;
        return [...prev, message];
      });
    }
    
    // Update conversation list
    setConversations(prev => 
      prev.map(c => c.id === message.conversation_id 
        ? { 
            ...c, 
            last_message: message.content, 
            last_message_at: message.created_at,
            unread_count: c.id === conversationId ? 0 : (c.unread_count || 0) + 1
          }
        : c
      ).sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at))
    );
  }, [conversationId]);

  // Subscribe to real-time messages
  useEffect(() => {
    const unsubscribe = subscribe('message', handleNewMessage);
    return unsubscribe;
  }, [subscribe, handleNewMessage]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      loadConversations();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (conversationId && isAuthenticated) {
      loadConversation(conversationId);
    } else {
      setActiveConversation(null);
      setMessages([]);
    }
  }, [conversationId, isAuthenticated]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = async (convId) => {
    try {
      const data = await getConversation(convId);
      setActiveConversation(data);
      setMessages(data.messages || []);
      
      // Update conversations list to mark as read
      setConversations(prev => 
        prev.map(c => c.id === convId ? { ...c, unread_count: 0 } : c)
      );
    } catch (error) {
      console.error('Failed to load conversation:', error);
      toast.error('Failed to load conversation');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const message = await sendMessage({
        conversation_id: conversationId,
        recipient_id: getOtherParticipant()?.id,
        content: newMessage.trim()
      });
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Update conversation in list
      setConversations(prev => 
        prev.map(c => c.id === conversationId 
          ? { ...c, last_message: newMessage.trim(), last_message_at: new Date().toISOString() }
          : c
        ).sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at))
      );
      
      inputRef.current?.focus();
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const getOtherParticipant = () => {
    if (!activeConversation) return null;
    return activeConversation.participants?.find(p => p.id !== user?.id);
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diff < 604800000) return date.toLocaleDateString([], { weekday: 'short' });
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    const otherParticipant = conv.participants?.[0];
    return otherParticipant?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           conv.artwork_title?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]">
        <div className="animate-spin h-8 w-8 border-2 border-[#0F3057] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="messages-page">
      <div className="max-w-6xl mx-auto h-[calc(100vh-5rem)]">
        <div className="flex h-full border-x border-[#E5E5DF]">
          {/* Conversations Sidebar */}
          <aside className={`w-full md:w-80 border-r border-[#E5E5DF] flex flex-col bg-white ${conversationId ? 'hidden md:flex' : 'flex'}`}>
            {/* Header */}
            <div className="p-4 border-b border-[#E5E5DF]">
              <div className="flex items-center justify-between">
                <h1 className="font-heading text-xl font-medium text-[#0F3057]">Messages</h1>
                {isConnected ? (
                  <span className="flex items-center gap-1 text-xs text-[#2D5A43]">
                    <Wifi className="h-3 w-3" />
                    Live
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-[#5C636A]">
                    <WifiOff className="h-3 w-3" />
                  </span>
                )}
              </div>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C636A]" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-[#F5F5F0] border-0"
                  data-testid="conversation-search"
                />
              </div>
            </div>

            {/* Conversations List */}
            <ScrollArea className="flex-1">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-[#5C636A]/30 mx-auto mb-3" />
                  <p className="font-body text-[#5C636A]">No conversations yet</p>
                  <p className="font-body text-sm text-[#5C636A]/70 mt-1">
                    Start a conversation with an artist from their profile
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#E5E5DF]">
                  {filteredConversations.map((conv) => {
                    const other = conv.participants?.[0];
                    const isActive = conv.id === conversationId;
                    
                    return (
                      <Link
                        key={conv.id}
                        to={`/messages/${conv.id}`}
                        className={`block p-4 hover:bg-[#F5F5F0] transition-colors ${isActive ? 'bg-[#F5F5F0]' : ''}`}
                        data-testid={`conversation-${conv.id}`}
                      >
                        <div className="flex gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={other?.avatar_url} />
                            <AvatarFallback className="bg-[#0F3057] text-white">
                              {other?.name?.[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`font-body font-medium truncate ${conv.unread_count > 0 ? 'text-[#0F3057]' : 'text-[#1A1D20]'}`}>
                                {other?.name || 'Unknown User'}
                              </span>
                              <span className="font-body text-xs text-[#5C636A]">
                                {formatTime(conv.last_message_at)}
                              </span>
                            </div>
                            {conv.artwork_title && (
                              <p className="font-body text-xs text-[#B64E33] truncate">
                                Re: {conv.artwork_title}
                              </p>
                            )}
                            <p className={`font-body text-sm truncate mt-0.5 ${conv.unread_count > 0 ? 'text-[#1A1D20] font-medium' : 'text-[#5C636A]'}`}>
                              {conv.last_message || 'No messages yet'}
                            </p>
                          </div>
                          {conv.unread_count > 0 && (
                            <span className="bg-[#B64E33] text-white text-xs font-medium px-2 py-0.5 rounded-full h-fit">
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </aside>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col bg-[#FDFDFB] ${!conversationId ? 'hidden md:flex' : 'flex'}`}>
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-[#E5E5DF] bg-white flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => navigate('/messages')}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={getOtherParticipant()?.avatar_url} />
                    <AvatarFallback className="bg-[#0F3057] text-white">
                      {getOtherParticipant()?.name?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <Link 
                      to={getOtherParticipant()?.is_artist ? `/artist/${getOtherParticipant()?.id}` : '#'}
                      className="font-body font-medium text-[#1A1D20] hover:text-[#0F3057]"
                    >
                      {getOtherParticipant()?.name}
                    </Link>
                    {activeConversation.artwork_title && (
                      <p className="font-body text-xs text-[#5C636A]">
                        Discussing: {activeConversation.artwork_title}
                      </p>
                    )}
                  </div>
                  
                  {activeConversation.artwork_image && (
                    <Link to={`/artwork/${activeConversation.artwork_id}`}>
                      <img 
                        src={activeConversation.artwork_image} 
                        alt="Artwork" 
                        className="h-10 w-10 object-cover rounded-sm"
                      />
                    </Link>
                  )}
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg, idx) => {
                      const isOwn = msg.sender_id === user?.id;
                      const showAvatar = !isOwn && (idx === 0 || messages[idx - 1]?.sender_id !== msg.sender_id);
                      
                      return (
                        <div
                          key={msg.id}
                          className={`flex gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`}
                          data-testid={`message-${msg.id}`}
                        >
                          {!isOwn && showAvatar && (
                            <Avatar className="h-8 w-8 mt-auto">
                              <AvatarImage src={msg.sender_avatar} />
                              <AvatarFallback className="bg-[#5C636A] text-white text-xs">
                                {msg.sender_name?.[0]?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {!isOwn && !showAvatar && <div className="w-8" />}
                          
                          <div className={`max-w-[70%] ${isOwn ? 'order-first' : ''}`}>
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                isOwn 
                                  ? 'bg-[#0F3057] text-white rounded-br-sm' 
                                  : 'bg-[#F5F5F0] text-[#1A1D20] rounded-bl-sm'
                              }`}
                            >
                              <p className="font-body text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                            <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                              <span className="font-body text-[10px] text-[#5C636A]">
                                {formatTime(msg.created_at)}
                              </span>
                              {isOwn && (
                                msg.is_read 
                                  ? <CheckCheck className="h-3 w-3 text-[#2D5A43]" />
                                  : <Check className="h-3 w-3 text-[#5C636A]" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-[#E5E5DF] bg-white">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                      disabled={sending}
                      data-testid="message-input"
                    />
                    <Button 
                      type="submit" 
                      disabled={!newMessage.trim() || sending}
                      className="bg-[#0F3057] hover:bg-[#0F3057]/90"
                      data-testid="send-message-btn"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-[#5C636A]/20 mx-auto mb-4" />
                  <h2 className="font-heading text-xl text-[#0F3057] mb-2">Your Messages</h2>
                  <p className="font-body text-[#5C636A]">
                    Select a conversation to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MessagesPage;
