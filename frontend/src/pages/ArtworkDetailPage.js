import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, Eye, ChevronLeft, ChevronRight, ShoppingCart, Gavel, MessageSquare, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useRealTime } from '../context/WebSocketContext';
import { getArtwork, getArtworkBids, placeBid, addToWishlist, removeFromWishlist, getWishlist, createCommission, createConversation } from '../services/api';
import { ReviewSection } from '../components/ReviewSection';
import { ShareButton } from '../components/ShareButton';

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  const { formatPrice, currency, getSymbol } = useCurrency();
  
  const [artwork, setArtwork] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [bidding, setBidding] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [messagingLoading, setMessagingLoading] = useState(false);
  const [liveBidUpdate, setLiveBidUpdate] = useState(null);
  
  // Commission form state
  const [commissionForm, setCommissionForm] = useState({
    title: '',
    description: '',
    budget_min: '',
    budget_max: '',
    deadline: ''
  });

  // Real-time bid updates
  const { subscribe, subscribeToAuction, isConnected } = useRealTime();

  // Subscribe to bid updates for this artwork
  useEffect(() => {
    if (artwork?.is_auction) {
      subscribeToAuction(id);
      
      const unsubscribe = subscribe('bid_update', (data) => {
        if (data.artwork_id === id) {
          setLiveBidUpdate(data);
          // Update artwork with new bid
          setArtwork(prev => prev ? {
            ...prev,
            current_bid: data.current_bid,
            bid_count: data.bid_count
          } : prev);
          // Add new bid to list
          setBids(prev => [{
            bidder_name: data.bidder_name,
            amount: data.current_bid,
            created_at: data.created_at
          }, ...prev]);
          
          // Flash animation for new bid
          setTimeout(() => setLiveBidUpdate(null), 3000);
        }
      });
      
      return unsubscribe;
    }
  }, [artwork?.is_auction, id, subscribe, subscribeToAuction]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const artworkData = await getArtwork(id);
        setArtwork(artworkData);
        
        if (artworkData.is_auction) {
          const bidsData = await getArtworkBids(id);
          setBids(bidsData);
        }
        
        if (isAuthenticated) {
          const wishlist = await getWishlist();
          setIsWishlisted(wishlist.items?.some(item => item.id === id));
        }
      } catch (error) {
        console.error('Error loading artwork:', error);
        toast.error('Failed to load artwork');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, isAuthenticated]);

  const getTimeRemaining = (endDate) => {
    if (!endDate) return null;
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Auction Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add to wishlist');
      navigate('/login');
      return;
    }
    
    try {
      if (isWishlisted) {
        await removeFromWishlist(id);
        setIsWishlisted(false);
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(id);
        setIsWishlisted(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add to cart');
      navigate('/login');
      return;
    }
    
    if (artwork.is_auction) {
      toast.error('Auction items cannot be added to cart');
      return;
    }
    
    setAddingToCart(true);
    try {
      await addToCart(artwork.id);
      toast.success('Added to cart');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handlePlaceBid = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to place a bid');
      navigate('/login');
      return;
    }
    
    const amount = parseFloat(bidAmount);
    const minBid = artwork.current_bid || artwork.price;
    
    if (isNaN(amount) || amount <= minBid) {
      toast.error(`Bid must be higher than ${formatPrice(minBid)}`);
      return;
    }
    
    setBidding(true);
    try {
      await placeBid(artwork.id, amount);
      toast.success('Bid placed successfully!');
      
      // Refresh data
      const [artworkData, bidsData] = await Promise.all([
        getArtwork(id),
        getArtworkBids(id)
      ]);
      setArtwork(artworkData);
      setBids(bidsData);
      setBidAmount('');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to place bid');
    } finally {
      setBidding(false);
    }
  };

  const handleCommissionSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to request a commission');
      navigate('/login');
      return;
    }
    
    try {
      await createCommission({
        artist_id: artwork.artist_id,
        title: commissionForm.title,
        description: commissionForm.description,
        budget_min: parseFloat(commissionForm.budget_min),
        budget_max: parseFloat(commissionForm.budget_max),
        deadline: commissionForm.deadline || null,
        reference_images: []
      });
      toast.success('Commission request sent!');
      setCommissionForm({ title: '', description: '', budget_min: '', budget_max: '', deadline: '' });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to send commission request');
    }
  };

  const handleMessageArtist = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to message this artist');
      navigate('/login');
      return;
    }
    
    if (user?.id === artwork?.artist_user_id) {
      toast.error("You can't message yourself");
      return;
    }

    setMessagingLoading(true);
    try {
      // Create conversation with reference to this artwork
      const conversation = await createConversation(artwork.artist_user_id, artwork.id);
      navigate(`/messages/${conversation.id}`);
    } catch (error) {
      toast.error('Failed to start conversation');
    } finally {
      setMessagingLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="skeleton aspect-artwork rounded-sm" />
            <div className="space-y-4">
              <div className="skeleton h-8 w-1/3" />
              <div className="skeleton h-12 w-2/3" />
              <div className="skeleton h-24 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!artwork) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-[#0F3057] mb-4">Artwork Not Found</h1>
          <Link to="/gallery">
            <Button className="btn-primary rounded-sm">Back to Gallery</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="artwork-detail-page">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 font-body text-sm text-[#5C636A] hover:text-[#0F3057] mb-8"
          data-testid="back-button"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-artwork bg-[#F5F5F0] overflow-hidden rounded-sm">
              <img
                src={artwork.images?.[selectedImage] || 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg'}
                alt={artwork.title}
                className="w-full h-full object-cover"
                data-testid="artwork-main-image"
              />
              
              {/* Image Navigation */}
              {artwork.images?.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => prev === 0 ? artwork.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => prev === artwork.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {artwork.is_auction && <span className="badge-auction">Auction</span>}
                {artwork.is_digital && <Badge variant="secondary">Digital</Badge>}
                {!artwork.is_available && <span className="badge-sold">Sold</span>}
              </div>

              {/* Views */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 px-3 py-1 rounded-sm">
                <Eye className="h-4 w-4 text-[#5C636A]" />
                <span className="font-body text-sm text-[#5C636A]">{artwork.views} views</span>
              </div>
            </div>

            {/* Thumbnails */}
            {artwork.images?.length > 1 && (
              <div className="flex gap-3 mt-4">
                {artwork.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 ${selectedImage === index ? 'border-[#0F3057]' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Artist */}
            <Link 
              to={`/artist/${artwork.artist_id}`} 
              className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33] font-semibold hover:underline"
              data-testid="artist-link"
            >
              {artwork.artist_name}
            </Link>

            {/* Title */}
            <h1 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-2" data-testid="artwork-title">
              {artwork.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mt-4 font-body text-sm text-[#5C636A]">
              {artwork.medium && <span>{artwork.medium}</span>}
              {artwork.dimensions && <span>• {artwork.dimensions}</span>}
              {artwork.year_created && <span>• {artwork.year_created}</span>}
            </div>

            {/* Price/Bid Section */}
            <div className="mt-8 p-6 bg-[#F5F5F0] rounded-sm">
              {artwork.is_auction ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-sm text-[#5C636A]">Current Bid</span>
                    {artwork.auction_end_date && (
                      <div className="flex items-center gap-2 text-[#B64E33]">
                        <Clock className="h-4 w-4" />
                        <span className="font-body text-sm font-medium auction-timer">
                          {getTimeRemaining(artwork.auction_end_date)}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="price-display text-4xl text-[#0F3057]" data-testid="current-bid">
                    {formatPrice(artwork.current_bid || artwork.price)}
                  </p>
                  <p className="font-body text-sm text-[#5C636A] mt-1">
                    {artwork.bid_count} bid{artwork.bid_count !== 1 ? 's' : ''} • Starting {formatPrice(artwork.price)}
                  </p>
                  
                  {artwork.is_available && (
                    <div className="mt-6">
                      <label className="form-label">Your Bid</label>
                      <div className="flex gap-3">
                        <Input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder={`Min: ${formatPrice((artwork.current_bid || artwork.price) + 1)}`}
                          className="flex-1"
                          data-testid="bid-input"
                        />
                        <Button 
                          onClick={handlePlaceBid} 
                          disabled={bidding}
                          className="btn-accent rounded-sm flex items-center gap-2"
                          data-testid="place-bid-btn"
                        >
                          <Gavel className="h-4 w-4" />
                          {bidding ? 'Placing...' : 'Place Bid'}
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <span className="font-body text-sm text-[#5C636A]">Price</span>
                  <p className="price-display text-4xl text-[#0F3057] mt-1" data-testid="artwork-price">
                    {formatPrice(artwork.price)}
                  </p>
                  
                  {artwork.is_available && (
                    <Button 
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className="btn-accent rounded-sm w-full mt-6 flex items-center justify-center gap-2"
                      data-testid="add-to-cart-btn"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {addingToCart ? 'Adding...' : 'Add to Cart'}
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={handleWishlist}
                className="flex-1 flex items-center justify-center gap-2"
                data-testid="wishlist-btn"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#B64E33] text-[#B64E33]' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </Button>
              <ShareButton 
                title={artwork.title}
                description={`${artwork.title} by ${artwork.artist_name} - ${artwork.description?.slice(0, 100)}...`}
              />
              
              {/* Message Artist Button */}
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleMessageArtist}
                disabled={messagingLoading}
                data-testid="message-artist-btn"
              >
                <MessageCircle className="h-4 w-4" />
                {messagingLoading ? 'Starting...' : 'Ask Question'}
              </Button>
              
              {/* Commission Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2" data-testid="commission-btn">
                    <MessageSquare className="h-4 w-4" />
                    Commission
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-xl">Request Commission</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="form-label">Title</label>
                      <Input
                        value={commissionForm.title}
                        onChange={(e) => setCommissionForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Family Portrait"
                        data-testid="commission-title"
                      />
                    </div>
                    <div>
                      <label className="form-label">Description</label>
                      <Textarea
                        value={commissionForm.description}
                        onChange={(e) => setCommissionForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what you'd like..."
                        rows={4}
                        data-testid="commission-description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Budget Min ($)</label>
                        <Input
                          type="number"
                          value={commissionForm.budget_min}
                          onChange={(e) => setCommissionForm(prev => ({ ...prev, budget_min: e.target.value }))}
                          placeholder="500"
                          data-testid="commission-budget-min"
                        />
                      </div>
                      <div>
                        <label className="form-label">Budget Max ($)</label>
                        <Input
                          type="number"
                          value={commissionForm.budget_max}
                          onChange={(e) => setCommissionForm(prev => ({ ...prev, budget_max: e.target.value }))}
                          placeholder="2000"
                          data-testid="commission-budget-max"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Deadline (Optional)</label>
                      <Input
                        type="date"
                        value={commissionForm.deadline}
                        onChange={(e) => setCommissionForm(prev => ({ ...prev, deadline: e.target.value }))}
                        data-testid="commission-deadline"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleCommissionSubmit} className="btn-primary rounded-sm" data-testid="submit-commission">
                      Send Request
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-4">About This Artwork</h3>
              <p className="font-body text-[#5C636A] leading-relaxed" data-testid="artwork-description">
                {artwork.description}
              </p>
            </div>

            {/* Tags */}
            {artwork.tags?.length > 0 && (
              <div className="mt-6">
                <h4 className="font-body text-xs tracking-[0.2em] uppercase text-[#5C636A] mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/gallery?search=${tag}`}
                      className="px-3 py-1 bg-[#F5F5F0] text-[#5C636A] font-body text-sm hover:bg-[#E5E5DF] transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Bid History */}
            {artwork.is_auction && bids.length > 0 && (
              <div className="mt-8 pt-8 border-t border-[#E5E5DF]">
                <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-4">Bid History</h3>
                <div className="space-y-3">
                  {bids.slice(0, 5).map((bid, index) => (
                    <div key={bid.id} className="flex items-center justify-between py-2 border-b border-[#E5E5DF]">
                      <div>
                        <span className="font-body text-sm font-medium">{bid.bidder_name}</span>
                        {index === 0 && <Badge className="ml-2 text-[10px]">Highest</Badge>}
                      </div>
                      <span className="font-body text-sm font-semibold text-[#0F3057]">
                        {formatPrice(bid.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <ReviewSection artworkId={artwork.id} artworkTitle={artwork.title} />
        </div>
      </div>
    </main>
  );
};

export default ArtworkDetailPage;
