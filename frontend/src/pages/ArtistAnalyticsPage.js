import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Eye, DollarSign, Image, Gavel, MessageSquare, 
  Package, ArrowUp, ArrowDown, Plus, BarChart3, Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ArtistAnalyticsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isArtist, token } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [artworkAnalytics, setArtworkAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isArtist) {
      toast.error('Only artists can access analytics');
      navigate('/dashboard');
      return;
    }

    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const [analyticsRes, artworksRes] = await Promise.all([
          axios.get(`${API}/analytics/artist`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API}/analytics/artist/artworks`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setAnalytics(analyticsRes.data);
        setArtworkAnalytics(artworksRes.data);
      } catch (error) {
        console.error('Error loading analytics:', error);
        toast.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, [isAuthenticated, isArtist, navigate, token]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-[#F5F5F0] rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-[#F5F5F0] rounded" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!analytics) return null;

  const { overview, commissions, revenue_chart, recent_bids, top_artworks, recent_orders } = analytics;

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="artist-analytics-page">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-medium text-[#0F3057]">Artist Dashboard</h1>
            <p className="font-body text-[#5C636A] mt-1">Welcome back, {user?.name}</p>
          </div>
          <Link to="/dashboard/artworks/new">
            <Button className="btn-primary rounded-sm flex items-center gap-2" data-testid="add-artwork-btn">
              <Plus className="h-4 w-4" />
              Add New Artwork
            </Button>
          </Link>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-[#E5E5DF]" data-testid="revenue-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-body text-sm font-medium text-[#5C636A]">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-[#2D5A43]" />
            </CardHeader>
            <CardContent>
              <div className="font-heading text-3xl font-medium text-[#0F3057]">
                {formatPrice(overview.total_revenue)}
              </div>
              <p className="font-body text-xs text-[#5C636A] mt-1">
                From {overview.sold_artworks} sold artworks
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E5DF]" data-testid="views-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-body text-sm font-medium text-[#5C636A]">Total Views</CardTitle>
              <Eye className="h-5 w-5 text-[#0F3057]" />
            </CardHeader>
            <CardContent>
              <div className="font-heading text-3xl font-medium text-[#0F3057]">
                {overview.total_views.toLocaleString()}
              </div>
              <p className="font-body text-xs text-[#5C636A] mt-1">
                Across {overview.total_artworks} artworks
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E5DF]" data-testid="bids-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-body text-sm font-medium text-[#5C636A]">Active Bids</CardTitle>
              <Gavel className="h-5 w-5 text-[#E5A93C]" />
            </CardHeader>
            <CardContent>
              <div className="font-heading text-3xl font-medium text-[#0F3057]">
                {overview.total_bids}
              </div>
              <p className="font-body text-xs text-[#5C636A] mt-1">
                On {overview.auction_artworks} auctions
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E5DF]" data-testid="commissions-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-body text-sm font-medium text-[#5C636A]">Commissions</CardTitle>
              <MessageSquare className="h-5 w-5 text-[#B64E33]" />
            </CardHeader>
            <CardContent>
              <div className="font-heading text-3xl font-medium text-[#0F3057]">
                {commissions.pending + commissions.active}
              </div>
              <p className="font-body text-xs text-[#5C636A] mt-1">
                Pipeline: {formatPrice(commissions.pipeline_value)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Charts & Lists */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Chart */}
            <Card className="border-[#E5E5DF]">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-medium text-[#0F3057] flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-48 gap-2">
                  {revenue_chart.map((month, index) => {
                    const maxRevenue = Math.max(...revenue_chart.map(m => m.revenue), 1);
                    const height = (month.revenue / maxRevenue) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex flex-col items-center justify-end h-40">
                          <div 
                            className="w-full max-w-12 bg-[#0F3057] rounded-t transition-all hover:bg-[#1a4a7a]"
                            style={{ height: `${Math.max(height, 4)}%` }}
                            title={`${formatPrice(month.revenue)} (${month.sales} sales)`}
                          />
                        </div>
                        <span className="font-body text-xs text-[#5C636A] mt-2">{month.month.split(' ')[0]}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Artwork Performance Table */}
            <Card className="border-[#E5E5DF]">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-medium text-[#0F3057]">
                  Artwork Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E5E5DF]">
                        <th className="text-left font-body text-xs font-semibold text-[#5C636A] uppercase tracking-wider py-3">Artwork</th>
                        <th className="text-right font-body text-xs font-semibold text-[#5C636A] uppercase tracking-wider py-3">Views</th>
                        <th className="text-right font-body text-xs font-semibold text-[#5C636A] uppercase tracking-wider py-3">Wishlist</th>
                        <th className="text-right font-body text-xs font-semibold text-[#5C636A] uppercase tracking-wider py-3">Price</th>
                        <th className="text-right font-body text-xs font-semibold text-[#5C636A] uppercase tracking-wider py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {artworkAnalytics.slice(0, 10).map((artwork) => (
                        <tr key={artwork.id} className="border-b border-[#E5E5DF] hover:bg-[#F5F5F0]">
                          <td className="py-3">
                            <Link to={`/artwork/${artwork.id}`} className="flex items-center gap-3">
                              <img 
                                src={artwork.image || 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg'} 
                                alt={artwork.title}
                                className="w-10 h-10 object-cover rounded-sm"
                              />
                              <span className="font-body text-sm font-medium text-[#1A1D20] hover:text-[#0F3057]">
                                {artwork.title.length > 25 ? artwork.title.slice(0, 25) + '...' : artwork.title}
                              </span>
                            </Link>
                          </td>
                          <td className="py-3 text-right font-body text-sm">{artwork.views.toLocaleString()}</td>
                          <td className="py-3 text-right font-body text-sm">{artwork.wishlist_count}</td>
                          <td className="py-3 text-right font-body text-sm font-medium text-[#0F3057]">
                            {artwork.is_auction && artwork.current_bid 
                              ? formatPrice(artwork.current_bid)
                              : formatPrice(artwork.price)
                            }
                          </td>
                          <td className="py-3 text-right">
                            {!artwork.is_available ? (
                              <Badge className="bg-[#9E2A2B] text-white">Sold</Badge>
                            ) : artwork.is_auction ? (
                              <Badge className="bg-[#0F3057] text-white">Auction</Badge>
                            ) : (
                              <Badge className="bg-[#2D5A43] text-white">Available</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {artworkAnalytics.length > 10 && (
                  <Link to="/dashboard" className="block text-center mt-4">
                    <Button variant="ghost" className="font-body text-sm text-[#0F3057]">
                      View All Artworks
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity Feed */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <Card className="border-[#E5E5DF] bg-[#0F3057] text-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                    <TrendingUp className="h-8 w-8 text-[#E5A93C]" />
                  </div>
                  <h3 className="font-heading text-2xl font-medium">{overview.rating.toFixed(1)}</h3>
                  <p className="font-body text-sm text-white/70 mt-1">Artist Rating</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
                  <div className="text-center">
                    <p className="font-heading text-xl font-medium">{overview.available_artworks}</p>
                    <p className="font-body text-xs text-white/70">Available</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-xl font-medium">{overview.sold_artworks}</p>
                    <p className="font-body text-xs text-white/70">Sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Bids */}
            <Card className="border-[#E5E5DF]">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-medium text-[#0F3057] flex items-center gap-2">
                  <Gavel className="h-4 w-4" />
                  Recent Bids
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recent_bids.length === 0 ? (
                  <p className="font-body text-sm text-[#5C636A] text-center py-4">No bids yet</p>
                ) : (
                  <div className="space-y-4">
                    {recent_bids.slice(0, 5).map((bid) => (
                      <div key={bid.id} className="flex items-center gap-3">
                        {bid.artwork_image && (
                          <img 
                            src={bid.artwork_image} 
                            alt="" 
                            className="w-10 h-10 object-cover rounded-sm"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-[#1A1D20] truncate">
                            {bid.bidder_name}
                          </p>
                          <p className="font-body text-xs text-[#5C636A] truncate">
                            {bid.artwork_title}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-body text-sm font-semibold text-[#0F3057]">
                            {formatPrice(bid.amount)}
                          </p>
                          <p className="font-body text-xs text-[#5C636A]">
                            {formatTimeAgo(bid.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Commission Summary */}
            <Card className="border-[#E5E5DF]">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-medium text-[#0F3057] flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Commissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-[#5C636A]">Pending</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {commissions.pending}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-[#5C636A]">In Progress</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {commissions.active}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-[#5C636A]">Completed</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {commissions.completed}
                    </Badge>
                  </div>
                </div>
                <Link to="/dashboard" className="block mt-4">
                  <Button variant="outline" className="w-full" data-testid="view-commissions">
                    View All Commissions
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            {recent_orders.length > 0 && (
              <Card className="border-[#E5E5DF]">
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-medium text-[#0F3057] flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Recent Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recent_orders.map((order) => (
                      <div key={order.id} className="flex justify-between items-center py-2 border-b border-[#E5E5DF] last:border-0">
                        <div>
                          <p className="font-body text-sm font-medium">#{order.id.slice(0, 8)}</p>
                          <p className="font-body text-xs text-[#5C636A]">{formatDate(order.created_at)}</p>
                        </div>
                        <p className="font-body text-sm font-semibold text-[#2D5A43]">
                          {formatPrice(order.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArtistAnalyticsPage;
