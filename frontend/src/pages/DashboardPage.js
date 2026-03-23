import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Image, Gavel, Package, Heart, Settings, Plus, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { getOrders, getMyBids, getMyCommissions, getWishlist } from '../services/api';
import { ArtworkCard } from '../components/ArtworkCard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isArtist, logout } = useAuth();
  
  const [orders, setOrders] = useState([]);
  const [bids, setBids] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [ordersData, bidsData, commissionsData, wishlistData] = await Promise.all([
          getOrders(),
          getMyBids(),
          getMyCommissions(),
          getWishlist()
        ]);
        
        setOrders(ordersData);
        setBids(bidsData);
        setCommissions(commissionsData);
        setWishlist(wishlistData.items || []);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="dashboard-page">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-[#E5E5DF]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#0F3057] flex items-center justify-center">
              <span className="font-heading text-2xl text-white">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <h1 className="font-heading text-2xl font-medium text-[#0F3057]">{user?.name}</h1>
              <p className="font-body text-sm text-[#5C636A]">{user?.email}</p>
              {isArtist && (
                <Badge className="mt-1 bg-[#E5A93C] text-[#0A1015]">Artist</Badge>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            {isArtist && (
              <Link to="/dashboard/artworks/new">
                <Button className="btn-primary rounded-sm flex items-center gap-2" data-testid="add-artwork">
                  <Plus className="h-4 w-4" />
                  Add Artwork
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2" data-testid="logout">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-8 flex-wrap">
            <TabsTrigger value="orders" className="flex items-center gap-2" data-testid="tab-orders">
              <Package className="h-4 w-4" />
              Orders ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="bids" className="flex items-center gap-2" data-testid="tab-bids">
              <Gavel className="h-4 w-4" />
              My Bids ({bids.length})
            </TabsTrigger>
            <TabsTrigger value="commissions" className="flex items-center gap-2" data-testid="tab-commissions">
              <Image className="h-4 w-4" />
              Commissions ({commissions.length})
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2" data-testid="tab-wishlist">
              <Heart className="h-4 w-4" />
              Wishlist ({wishlist.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2" data-testid="tab-settings">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Orders */}
          <TabsContent value="orders">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton h-24 rounded-sm" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="empty-state py-16">
                <Package className="h-12 w-12 text-[#5C636A] mb-4" />
                <h3 className="font-heading text-xl text-[#0F3057] mb-2">No Orders Yet</h3>
                <p className="font-body text-[#5C636A] mb-4">You haven't made any purchases yet.</p>
                <Link to="/gallery">
                  <Button className="btn-primary rounded-sm">Browse Gallery</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border border-[#E5E5DF] rounded-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-body text-xs text-[#5C636A]">Order #{order.id.slice(0, 8)}</p>
                        <p className="font-body text-sm">{formatDate(order.created_at)}</p>
                      </div>
                      <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {order.artworks?.map((artwork) => (
                        <Link key={artwork.id} to={`/artwork/${artwork.id}`} className="flex items-center gap-3">
                          <img src={artwork.image} alt={artwork.title} className="w-16 h-16 object-cover rounded-sm" />
                          <div>
                            <p className="font-body text-sm font-medium">{artwork.title}</p>
                            <p className="font-body text-sm text-[#0F3057]">{formatPrice(artwork.price)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E5E5DF] flex justify-between">
                      <span className="font-body text-sm text-[#5C636A]">Total</span>
                      <span className="font-body font-semibold text-[#0F3057]">{formatPrice(order.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Bids */}
          <TabsContent value="bids">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton h-20 rounded-sm" />
                ))}
              </div>
            ) : bids.length === 0 ? (
              <div className="empty-state py-16">
                <Gavel className="h-12 w-12 text-[#5C636A] mb-4" />
                <h3 className="font-heading text-xl text-[#0F3057] mb-2">No Bids Yet</h3>
                <p className="font-body text-[#5C636A] mb-4">You haven't placed any bids on auctions.</p>
                <Link to="/auctions">
                  <Button className="btn-primary rounded-sm">View Auctions</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bids.map((bid) => (
                  <Link 
                    key={bid.id} 
                    to={`/artwork/${bid.artwork_id}`}
                    className="block bg-white border border-[#E5E5DF] rounded-sm p-4 hover:border-[#0F3057] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-body text-sm text-[#5C636A]">{formatDate(bid.created_at)}</p>
                        <p className="font-heading text-lg font-medium text-[#0F3057]">
                          Your Bid: {formatPrice(bid.amount)}
                        </p>
                      </div>
                      <span className="font-body text-xs text-[#5C636A]">View Artwork →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Commissions */}
          <TabsContent value="commissions">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton h-28 rounded-sm" />
                ))}
              </div>
            ) : commissions.length === 0 ? (
              <div className="empty-state py-16">
                <Image className="h-12 w-12 text-[#5C636A] mb-4" />
                <h3 className="font-heading text-xl text-[#0F3057] mb-2">No Commission Requests</h3>
                <p className="font-body text-[#5C636A] mb-4">You haven't requested any commissions yet.</p>
                <Link to="/artists">
                  <Button className="btn-primary rounded-sm">Find Artists</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {commissions.map((commission) => (
                  <div key={commission.id} className="bg-white border border-[#E5E5DF] rounded-sm p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading text-lg font-medium text-[#0F3057]">{commission.title}</h3>
                      <Badge className={getStatusColor(commission.status)}>
                        {commission.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="font-body text-sm text-[#5C636A] mb-3">{commission.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="font-body">
                        <span className="text-[#5C636A]">Artist:</span> {commission.artist_name}
                      </span>
                      <span className="font-body">
                        <span className="text-[#5C636A]">Budget:</span> {formatPrice(commission.budget_min)} - {formatPrice(commission.budget_max)}
                      </span>
                      <span className="font-body">
                        <span className="text-[#5C636A]">Requested:</span> {formatDate(commission.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="skeleton aspect-artwork rounded-sm" />
                ))}
              </div>
            ) : wishlist.length === 0 ? (
              <div className="empty-state py-16">
                <Heart className="h-12 w-12 text-[#5C636A] mb-4" />
                <h3 className="font-heading text-xl text-[#0F3057] mb-2">Wishlist Empty</h3>
                <p className="font-body text-[#5C636A] mb-4">Save artworks you love to your wishlist.</p>
                <Link to="/gallery">
                  <Button className="btn-primary rounded-sm">Explore Gallery</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="max-w-2xl">
              <div className="bg-white border border-[#E5E5DF] rounded-sm p-6 mb-6">
                <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Name</label>
                    <p className="font-body">{user?.name}</p>
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <p className="font-body">{user?.email}</p>
                  </div>
                  <div>
                    <label className="form-label">Account Type</label>
                    <p className="font-body">{isArtist ? 'Artist' : 'Collector'}</p>
                  </div>
                  <div>
                    <label className="form-label">Member Since</label>
                    <p className="font-body">{formatDate(user?.created_at)}</p>
                  </div>
                </div>
              </div>
              
              {isArtist && (
                <Link to="/dashboard/artist-profile">
                  <Button className="btn-primary rounded-sm" data-testid="edit-artist-profile">
                    Edit Artist Profile
                  </Button>
                </Link>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default DashboardPage;
