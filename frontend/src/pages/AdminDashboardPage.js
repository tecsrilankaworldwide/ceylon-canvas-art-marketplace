import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, Image, BarChart3, Shield, Search, 
  Ban, CheckCircle, XCircle, Flag, Trash2, 
  TrendingUp, DollarSign, Package, AlertTriangle,
  ChevronLeft, ChevronRight, BadgeCheck, Eye, Mail
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import AdminAutomationPanel from '../components/AdminAutomationPanel';
import {
  getAdminStats,
  getAdminUsers,
  getAdminArtworks,
  getAdminArtists,
  getAdminOrders,
  getRevenueChart,
  banUser,
  unbanUser,
  makeAdmin,
  removeAdmin,
  flagArtwork,
  unflagArtwork,
  adminDeleteArtwork,
  verifyArtist
} from '../services/api';

const StatCard = ({ icon: Icon, label, value, subValue, trend, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-[#0F3057]/10 text-[#0F3057]",
    green: "bg-[#2D5A43]/10 text-[#2D5A43]",
    orange: "bg-[#B64E33]/10 text-[#B64E33]",
    gold: "bg-[#E5A93C]/10 text-[#E5A93C]"
  };

  return (
    <div className="bg-white border border-[#E5E5DF] p-6" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-[#5C636A] mb-1">{label}</p>
          <p className="font-heading text-3xl font-medium text-[#0F3057]">{value}</p>
          {subValue && (
            <p className="font-body text-sm text-[#5C636A] mt-1">{subValue}</p>
          )}
        </div>
        <div className={`p-3 rounded-sm ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3">
          <TrendingUp className="h-3 w-3 text-[#2D5A43]" />
          <span className="font-body text-xs text-[#2D5A43]">{trend}</span>
        </div>
      )}
    </div>
  );
};

const AdminDashboardPage = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filters
  const [userSearch, setUserSearch] = useState('');
  const [userRole, setUserRole] = useState('all');
  const [artworkSearch, setArtworkSearch] = useState('');
  const [artworkStatus, setArtworkStatus] = useState('all');
  const [artistSearch, setArtistSearch] = useState('');
  const [artistVerification, setArtistVerification] = useState('all');
  
  // Pagination
  const [userPage, setUserPage] = useState(0);
  const [artworkPage, setArtworkPage] = useState(0);
  const [artistPage, setArtistPage] = useState(0);
  const [userTotal, setUserTotal] = useState(0);
  const [artworkTotal, setArtworkTotal] = useState(0);
  const [artistTotal, setArtistTotal] = useState(0);
  const pageSize = 10;
  
  // Dialogs
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, item: null });
  const [verifyDialog, setVerifyDialog] = useState({ open: false, artist: null });
  const [verifyStatus, setVerifyStatus] = useState('verified');
  const [verifyBadges, setVerifyBadges] = useState([]);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
      toast.error('Admin access required');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadStats();
      loadRevenueData();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (activeTab === 'users' && isAdmin) {
      loadUsers();
    }
  }, [activeTab, userSearch, userRole, userPage, isAdmin]);

  useEffect(() => {
    if (activeTab === 'artworks' && isAdmin) {
      loadArtworks();
    }
  }, [activeTab, artworkSearch, artworkStatus, artworkPage, isAdmin]);

  useEffect(() => {
    if (activeTab === 'artists' && isAdmin) {
      loadArtists();
    }
  }, [activeTab, artistSearch, artistVerification, artistPage, isAdmin]);

  useEffect(() => {
    if (activeTab === 'orders' && isAdmin) {
      loadOrders();
    }
  }, [activeTab, isAdmin]);

  const loadStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const loadRevenueData = async () => {
    try {
      const data = await getRevenueChart(30);
      setRevenueData(data.data || []);
    } catch (error) {
      console.error('Failed to load revenue data:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const params = { skip: userPage * pageSize, limit: pageSize };
      if (userSearch) params.search = userSearch;
      if (userRole !== 'all') params.role = userRole;
      
      const data = await getAdminUsers(params);
      setUsers(data.users || []);
      setUserTotal(data.total || 0);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadArtworks = async () => {
    try {
      const params = { skip: artworkPage * pageSize, limit: pageSize };
      if (artworkSearch) params.search = artworkSearch;
      if (artworkStatus !== 'all') params.status = artworkStatus;
      
      const data = await getAdminArtworks(params);
      setArtworks(data.artworks || []);
      setArtworkTotal(data.total || 0);
    } catch (error) {
      console.error('Failed to load artworks:', error);
    }
  };

  const loadArtists = async () => {
    try {
      const params = { skip: artistPage * pageSize, limit: pageSize };
      if (artistSearch) params.search = artistSearch;
      if (artistVerification !== 'all') params.verification_status = artistVerification;
      
      const data = await getAdminArtists(params);
      setArtists(data.artists || []);
      setArtistTotal(data.total || 0);
    } catch (error) {
      console.error('Failed to load artists:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const data = await getAdminOrders({ limit: 20 });
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const handleConfirmAction = async () => {
    const { action, item } = confirmDialog;
    try {
      switch (action) {
        case 'ban':
          await banUser(item.id);
          toast.success('User banned successfully');
          loadUsers();
          break;
        case 'unban':
          await unbanUser(item.id);
          toast.success('User unbanned successfully');
          loadUsers();
          break;
        case 'makeAdmin':
          await makeAdmin(item.id);
          toast.success('User is now an admin');
          loadUsers();
          break;
        case 'removeAdmin':
          await removeAdmin(item.id);
          toast.success('Admin privileges removed');
          loadUsers();
          break;
        case 'flag':
          await flagArtwork(item.id);
          toast.success('Artwork flagged');
          loadArtworks();
          break;
        case 'unflag':
          await unflagArtwork(item.id);
          toast.success('Artwork unflagged');
          loadArtworks();
          break;
        case 'deleteArtwork':
          await adminDeleteArtwork(item.id);
          toast.success('Artwork deleted');
          loadArtworks();
          loadStats();
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Action failed');
    }
    setConfirmDialog({ open: false, action: null, item: null });
  };

  const handleVerifyArtist = async () => {
    try {
      await verifyArtist(verifyDialog.artist.id, {
        status: verifyStatus,
        badges: verifyBadges
      });
      toast.success(`Artist ${verifyStatus === 'verified' ? 'verified' : 'status updated'}`);
      loadArtists();
      loadStats();
    } catch (error) {
      toast.error('Failed to update artist verification');
    }
    setVerifyDialog({ open: false, artist: null });
    setVerifyStatus('verified');
    setVerifyBadges([]);
  };

  const openVerifyDialog = (artist) => {
    setVerifyDialog({ open: true, artist });
    setVerifyStatus(artist.verification_status || 'pending');
    setVerifyBadges(artist.badges || []);
  };

  const toggleBadge = (badge) => {
    setVerifyBadges(prev => 
      prev.includes(badge) 
        ? prev.filter(b => b !== badge)
        : [...prev, badge]
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]">
        <div className="animate-spin h-8 w-8 border-2 border-[#0F3057] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="admin-dashboard">
      {/* Header */}
      <section className="bg-[#0A1015] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-[#E5A93C]" />
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C] font-semibold">
              Admin Panel
            </span>
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-medium text-white">
            Platform Dashboard
          </h1>
          <p className="font-body text-base text-white/70 mt-2">
            Manage users, artworks, and monitor platform performance
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#F5F5F0] p-1 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white" data-testid="tab-overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-white" data-testid="tab-users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="artworks" className="data-[state=active]:bg-white" data-testid="tab-artworks">
              <Image className="h-4 w-4 mr-2" />
              Artworks
            </TabsTrigger>
            <TabsTrigger value="artists" className="data-[state=active]:bg-white" data-testid="tab-artists">
              <BadgeCheck className="h-4 w-4 mr-2" />
              Artists
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-white" data-testid="tab-orders">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="automation" className="data-[state=active]:bg-white" data-testid="tab-automation">
              <Mail className="h-4 w-4 mr-2" />
              Automation
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {stats && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    icon={Users}
                    label="Total Users"
                    value={stats.total_users.toLocaleString()}
                    subValue={`${stats.total_artists} artists`}
                    color="blue"
                  />
                  <StatCard
                    icon={Image}
                    label="Total Artworks"
                    value={stats.total_artworks.toLocaleString()}
                    color="green"
                  />
                  <StatCard
                    icon={DollarSign}
                    label="Total Revenue"
                    value={`$${stats.total_revenue.toLocaleString()}`}
                    subValue={`$${stats.platform_fees.toLocaleString()} fees`}
                    color="gold"
                  />
                  <StatCard
                    icon={Package}
                    label="Total Orders"
                    value={stats.total_orders.toLocaleString()}
                    color="orange"
                  />
                </div>

                {/* Alerts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.pending_verifications > 0 && (
                    <div className="bg-[#E5A93C]/10 border border-[#E5A93C]/30 p-4 flex items-center gap-4">
                      <BadgeCheck className="h-8 w-8 text-[#E5A93C]" />
                      <div>
                        <p className="font-body font-medium text-[#1A1D20]">
                          {stats.pending_verifications} Pending Verifications
                        </p>
                        <p className="font-body text-sm text-[#5C636A]">
                          Artists awaiting verification review
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="ml-auto"
                        onClick={() => { setActiveTab('artists'); setArtistVerification('pending'); }}
                        data-testid="view-pending-verifications"
                      >
                        Review
                      </Button>
                    </div>
                  )}
                  {stats.flagged_artworks > 0 && (
                    <div className="bg-[#9E2A2B]/10 border border-[#9E2A2B]/30 p-4 flex items-center gap-4">
                      <AlertTriangle className="h-8 w-8 text-[#9E2A2B]" />
                      <div>
                        <p className="font-body font-medium text-[#1A1D20]">
                          {stats.flagged_artworks} Flagged Artworks
                        </p>
                        <p className="font-body text-sm text-[#5C636A]">
                          Content requiring moderation
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="ml-auto"
                        onClick={() => { setActiveTab('artworks'); setArtworkStatus('flagged'); }}
                        data-testid="view-flagged-artworks"
                      >
                        Review
                      </Button>
                    </div>
                  )}
                </div>

                {/* Revenue Chart Placeholder */}
                <div className="bg-white border border-[#E5E5DF] p-6">
                  <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-4">
                    Revenue Overview (Last 30 Days)
                  </h3>
                  {revenueData.length > 0 ? (
                    <div className="h-64 flex items-end gap-1">
                      {revenueData.map((day, i) => {
                        const maxRevenue = Math.max(...revenueData.map(d => d.revenue)) || 1;
                        const height = (day.revenue / maxRevenue) * 100;
                        return (
                          <div 
                            key={i} 
                            className="flex-1 bg-[#0F3057]/20 hover:bg-[#0F3057]/40 transition-colors relative group"
                            style={{ height: `${Math.max(height, 2)}%` }}
                          >
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#0A1015] text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              ${day.revenue.toLocaleString()} ({day.orders} orders)
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-[#5C636A]">
                      No revenue data available
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C636A]" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={userSearch}
                    onChange={(e) => { setUserSearch(e.target.value); setUserPage(0); }}
                    className="pl-10"
                    data-testid="user-search"
                  />
                </div>
                <Select value={userRole} onValueChange={(v) => { setUserRole(v); setUserPage(0); }}>
                  <SelectTrigger className="w-40" data-testid="user-role-filter">
                    <SelectValue placeholder="Filter role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="artist">Artists</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <div className="bg-white border border-[#E5E5DF] overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F5F5F0]">
                    <tr>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">User</th>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Role</th>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Orders</th>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Spent</th>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Joined</th>
                      <th className="px-4 py-3 text-right font-body text-xs uppercase tracking-wider text-[#5C636A]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5DF]">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-[#F5F5F0]/50" data-testid={`user-row-${u.id}`}>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-body font-medium text-[#1A1D20]">{u.name}</p>
                            <p className="font-body text-sm text-[#5C636A]">{u.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 flex-wrap">
                            {u.is_admin && <Badge className="bg-[#0F3057]">Admin</Badge>}
                            {u.is_artist && <Badge variant="outline">Artist</Badge>}
                            {u.is_banned && <Badge variant="destructive">Banned</Badge>}
                            {!u.is_admin && !u.is_artist && !u.is_banned && <Badge variant="secondary">User</Badge>}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-body text-sm">{u.order_count || 0}</td>
                        <td className="px-4 py-3 font-body text-sm">${(u.total_spent || 0).toLocaleString()}</td>
                        <td className="px-4 py-3 font-body text-sm text-[#5C636A]">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            {!u.is_banned ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmDialog({ open: true, action: 'ban', item: u })}
                                disabled={u.is_admin || u.id === user?.id}
                                data-testid={`ban-user-${u.id}`}
                              >
                                <Ban className="h-4 w-4 text-[#9E2A2B]" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmDialog({ open: true, action: 'unban', item: u })}
                                data-testid={`unban-user-${u.id}`}
                              >
                                <CheckCircle className="h-4 w-4 text-[#2D5A43]" />
                              </Button>
                            )}
                            {!u.is_admin ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmDialog({ open: true, action: 'makeAdmin', item: u })}
                                disabled={u.is_banned}
                                data-testid={`make-admin-${u.id}`}
                              >
                                <Shield className="h-4 w-4 text-[#0F3057]" />
                              </Button>
                            ) : u.id !== user?.id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmDialog({ open: true, action: 'removeAdmin', item: u })}
                                data-testid={`remove-admin-${u.id}`}
                              >
                                <XCircle className="h-4 w-4 text-[#B64E33]" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-[#5C636A]">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {userTotal > pageSize && (
                <div className="flex items-center justify-between">
                  <p className="font-body text-sm text-[#5C636A]">
                    Showing {userPage * pageSize + 1} - {Math.min((userPage + 1) * pageSize, userTotal)} of {userTotal}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserPage(p => Math.max(0, p - 1))}
                      disabled={userPage === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserPage(p => p + 1)}
                      disabled={(userPage + 1) * pageSize >= userTotal}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Artworks Tab */}
          <TabsContent value="artworks">
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C636A]" />
                  <Input
                    placeholder="Search artworks or artist..."
                    value={artworkSearch}
                    onChange={(e) => { setArtworkSearch(e.target.value); setArtworkPage(0); }}
                    className="pl-10"
                    data-testid="artwork-search"
                  />
                </div>
                <Select value={artworkStatus} onValueChange={(v) => { setArtworkStatus(v); setArtworkPage(0); }}>
                  <SelectTrigger className="w-40" data-testid="artwork-status-filter">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Artworks</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Artworks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artworks.map((artwork) => (
                  <div 
                    key={artwork.id} 
                    className="bg-white border border-[#E5E5DF] overflow-hidden"
                    data-testid={`artwork-card-${artwork.id}`}
                  >
                    <div className="aspect-square relative bg-[#F5F5F0]">
                      {artwork.images?.[0] ? (
                        <img 
                          src={artwork.images[0]} 
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="h-12 w-12 text-[#5C636A]/30" />
                        </div>
                      )}
                      {artwork.is_flagged && (
                        <div className="absolute top-2 right-2 bg-[#9E2A2B] text-white px-2 py-1 text-xs font-body uppercase tracking-wider">
                          Flagged
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-lg font-medium text-[#0F3057] truncate">{artwork.title}</h3>
                      <p className="font-body text-sm text-[#5C636A]">{artwork.artist_name}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-body font-semibold">${artwork.price?.toLocaleString()}</span>
                        <div className="flex items-center gap-1 text-[#5C636A]">
                          <Eye className="h-4 w-4" />
                          <span className="font-body text-sm">{artwork.views || 0}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {!artwork.is_flagged ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setConfirmDialog({ open: true, action: 'flag', item: artwork })}
                            data-testid={`flag-artwork-${artwork.id}`}
                          >
                            <Flag className="h-4 w-4 mr-1" />
                            Flag
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setConfirmDialog({ open: true, action: 'unflag', item: artwork })}
                            data-testid={`unflag-artwork-${artwork.id}`}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Unflag
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[#9E2A2B] hover:bg-[#9E2A2B]/10"
                          onClick={() => setConfirmDialog({ open: true, action: 'deleteArtwork', item: artwork })}
                          data-testid={`delete-artwork-${artwork.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {artworks.length === 0 && (
                  <div className="col-span-full py-12 text-center text-[#5C636A]">
                    No artworks found
                  </div>
                )}
              </div>

              {/* Pagination */}
              {artworkTotal > pageSize && (
                <div className="flex items-center justify-between">
                  <p className="font-body text-sm text-[#5C636A]">
                    Showing {artworkPage * pageSize + 1} - {Math.min((artworkPage + 1) * pageSize, artworkTotal)} of {artworkTotal}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setArtworkPage(p => Math.max(0, p - 1))}
                      disabled={artworkPage === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setArtworkPage(p => p + 1)}
                      disabled={(artworkPage + 1) * pageSize >= artworkTotal}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Artists Tab */}
          <TabsContent value="artists">
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C636A]" />
                  <Input
                    placeholder="Search artists..."
                    value={artistSearch}
                    onChange={(e) => { setArtistSearch(e.target.value); setArtistPage(0); }}
                    className="pl-10"
                    data-testid="artist-search"
                  />
                </div>
                <Select value={artistVerification} onValueChange={(v) => { setArtistVerification(v); setArtistPage(0); }}>
                  <SelectTrigger className="w-40" data-testid="artist-verification-filter">
                    <SelectValue placeholder="Verification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Artists</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Artists Table */}
              <div className="bg-white border border-[#E5E5DF] overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F5F5F0]">
                    <tr>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Artist</th>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Status</th>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Badges</th>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Artworks</th>
                      <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Rating</th>
                      <th className="px-4 py-3 text-right font-body text-xs uppercase tracking-wider text-[#5C636A]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5DF]">
                    {artists.map((artist) => (
                      <tr key={artist.id} className="hover:bg-[#F5F5F0]/50" data-testid={`artist-row-${artist.id}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#F5F5F0] overflow-hidden">
                              {artist.avatar_url ? (
                                <img src={artist.avatar_url} alt={artist.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#5C636A]">
                                  {artist.name?.[0]?.toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-body font-medium text-[#1A1D20]">{artist.name}</p>
                              <p className="font-body text-sm text-[#5C636A]">{artist.location || 'No location'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            variant={
                              artist.verification_status === 'verified' ? 'default' :
                              artist.verification_status === 'rejected' ? 'destructive' : 'secondary'
                            }
                            className={artist.verification_status === 'verified' ? 'bg-[#2D5A43]' : ''}
                          >
                            {artist.verification_status || 'pending'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 flex-wrap">
                            {artist.badges?.map((badge) => (
                              <Badge key={badge} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                            {(!artist.badges || artist.badges.length === 0) && (
                              <span className="text-[#5C636A] text-sm">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-body text-sm">{artist.artwork_count || 0}</td>
                        <td className="px-4 py-3 font-body text-sm">
                          {artist.rating ? `${artist.rating.toFixed(1)} / 5` : '-'}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openVerifyDialog(artist)}
                            data-testid={`verify-artist-${artist.id}`}
                          >
                            <BadgeCheck className="h-4 w-4 mr-1" />
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {artists.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-[#5C636A]">
                          No artists found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {artistTotal > pageSize && (
                <div className="flex items-center justify-between">
                  <p className="font-body text-sm text-[#5C636A]">
                    Showing {artistPage * pageSize + 1} - {Math.min((artistPage + 1) * pageSize, artistTotal)} of {artistTotal}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setArtistPage(p => Math.max(0, p - 1))}
                      disabled={artistPage === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setArtistPage(p => p + 1)}
                      disabled={(artistPage + 1) * pageSize >= artistTotal}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="bg-white border border-[#E5E5DF] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F5F5F0]">
                  <tr>
                    <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Order ID</th>
                    <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Customer</th>
                    <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Items</th>
                    <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Total</th>
                    <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Status</th>
                    <th className="px-4 py-3 text-left font-body text-xs uppercase tracking-wider text-[#5C636A]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5DF]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#F5F5F0]/50" data-testid={`order-row-${order.id}`}>
                      <td className="px-4 py-3 font-mono text-sm">{order.id?.slice(0, 8)}...</td>
                      <td className="px-4 py-3 font-body text-sm">{order.user_email}</td>
                      <td className="px-4 py-3 font-body text-sm">{order.items?.length || 0} items</td>
                      <td className="px-4 py-3 font-body font-semibold">${(order.total || 0).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <Badge 
                          variant={order.status === 'completed' ? 'default' : 'secondary'}
                          className={order.status === 'completed' ? 'bg-[#2D5A43]' : ''}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-body text-sm text-[#5C636A]">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-[#5C636A]">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation">
            <AdminAutomationPanel />
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => !open && setConfirmDialog({ open: false, action: null, item: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              {confirmDialog.action === 'ban' && `Are you sure you want to ban ${confirmDialog.item?.name}? They will not be able to log in.`}
              {confirmDialog.action === 'unban' && `Are you sure you want to unban ${confirmDialog.item?.name}?`}
              {confirmDialog.action === 'makeAdmin' && `Are you sure you want to make ${confirmDialog.item?.name} an admin?`}
              {confirmDialog.action === 'removeAdmin' && `Are you sure you want to remove admin privileges from ${confirmDialog.item?.name}?`}
              {confirmDialog.action === 'flag' && `Are you sure you want to flag "${confirmDialog.item?.title}"?`}
              {confirmDialog.action === 'unflag' && `Are you sure you want to unflag "${confirmDialog.item?.title}"?`}
              {confirmDialog.action === 'deleteArtwork' && `Are you sure you want to delete "${confirmDialog.item?.title}"? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog({ open: false, action: null, item: null })}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmAction}
              variant={confirmDialog.action === 'deleteArtwork' || confirmDialog.action === 'ban' ? 'destructive' : 'default'}
              data-testid="confirm-action-btn"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verify Artist Dialog */}
      <Dialog open={verifyDialog.open} onOpenChange={(open) => !open && setVerifyDialog({ open: false, artist: null })}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Artist: {verifyDialog.artist?.name}</DialogTitle>
            <DialogDescription>
              Update verification status and assign badges
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="font-body text-sm font-medium mb-2 block">Verification Status</label>
              <Select value={verifyStatus} onValueChange={setVerifyStatus}>
                <SelectTrigger data-testid="verify-status-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-body text-sm font-medium mb-2 block">Badges</label>
              <div className="flex flex-wrap gap-2">
                {['verified', 'featured', 'top_seller', 'trusted'].map((badge) => (
                  <Button
                    key={badge}
                    variant={verifyBadges.includes(badge) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleBadge(badge)}
                    className={verifyBadges.includes(badge) ? 'bg-[#0F3057]' : ''}
                    data-testid={`badge-${badge}`}
                  >
                    {badge.replace('_', ' ')}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setVerifyDialog({ open: false, artist: null })}>
              Cancel
            </Button>
            <Button onClick={handleVerifyArtist} className="bg-[#0F3057]" data-testid="save-verification-btn">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AdminDashboardPage;
