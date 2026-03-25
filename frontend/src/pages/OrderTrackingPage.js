import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle, MapPin, Clock, 
  Search, ArrowRight, Box, Plane, Shield, Phone,
  ExternalLink, AlertCircle, Home, ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Status configuration
const statusConfig = {
  placed: { icon: Package, color: 'bg-[#5C636A]', label: 'Order Placed', textColor: 'text-[#5C636A]' },
  confirmed: { icon: CheckCircle, color: 'bg-[#0F3057]', label: 'Confirmed', textColor: 'text-[#0F3057]' },
  processing: { icon: Box, color: 'bg-[#E5A93C]', label: 'Processing', textColor: 'text-[#E5A93C]' },
  shipped: { icon: Truck, color: 'bg-[#2D5A43]', label: 'Shipped', textColor: 'text-[#2D5A43]' },
  out_for_delivery: { icon: MapPin, color: 'bg-[#0F3057]', label: 'Out for Delivery', textColor: 'text-[#0F3057]' },
  delivered: { icon: Home, color: 'bg-[#2D5A43]', label: 'Delivered', textColor: 'text-[#2D5A43]' },
  cancelled: { icon: AlertCircle, color: 'bg-[#9E2A2B]', label: 'Cancelled', textColor: 'text-[#9E2A2B]' }
};

const OrderTrackingPage = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      setTrackingInput(orderId);
      fetchTrackingData(orderId);
    }
  }, [orderId]);

  const fetchTrackingData = async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to track your order');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/orders/${id}/tracking`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Order not found. Please check your order ID.');
        }
        if (response.status === 403) {
          throw new Error('You do not have permission to view this order.');
        }
        throw new Error('Failed to fetch tracking data');
      }
      
      const data = await response.json();
      setTrackingData(data);
    } catch (err) {
      setError(err.message);
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      fetchTrackingData(trackingInput.trim());
    }
  };

  const currentStatus = trackingData ? (statusConfig[trackingData.status] || statusConfig.placed) : null;
  const statusOrder = ['placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
  const currentStatusIndex = trackingData ? statusOrder.indexOf(trackingData.status) : -1;

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="order-tracking-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F3057] via-[#1A4A7A] to-[#0F3057] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Package className="h-16 w-16 text-[#E5A93C] mx-auto mb-6" />
          <h1 className="font-heading text-4xl lg:text-5xl text-white mb-4">Track Your Order</h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Enter your order ID to see real-time updates on your artwork's journey to you.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter Order ID (e.g., abc12345-...)"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="flex-1 h-14 bg-white border-0 text-lg"
                data-testid="tracking-input"
              />
              <Button 
                type="submit" 
                className="h-14 px-8 bg-[#E5A93C] hover:bg-[#D49A2E] text-[#0A1015]"
                disabled={loading}
                data-testid="track-btn"
              >
                {loading ? (
                  <span className="animate-pulse">Tracking...</span>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Track
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Error State */}
      {error && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-red-50 border border-red-200 p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-700 font-medium">{error}</p>
              {!isAuthenticated && (
                <Link to="/login" className="inline-flex items-center gap-2 mt-4 text-[#0F3057] hover:underline">
                  Log in to track your orders
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Tracking Results */}
      {trackingData && (
        <>
          {/* Current Status Card */}
          <section className="py-8">
            <div className="max-w-4xl mx-auto px-6">
              <div className={`${currentStatus.color} text-white p-8 -mt-8 relative z-10 shadow-xl`}>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="p-4 bg-white/20 rounded-full">
                    {React.createElement(currentStatus.icon, { className: "h-10 w-10" })}
                  </div>
                  <div className="flex-1">
                    <p className="text-white/70 text-sm uppercase tracking-wider">Current Status</p>
                    <p className="font-heading text-3xl" data-testid="current-status">{currentStatus.label}</p>
                    {trackingData.estimated_delivery && (
                      <p className="text-white/80 mt-2">
                        Estimated Delivery: <strong>{new Date(trackingData.estimated_delivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong>
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-sm">Order ID</p>
                    <p className="font-mono">{trackingData.order_id?.slice(0, 8)}</p>
                  </div>
                </div>

                {/* Tracking Number */}
                {trackingData.tracking_number && (
                  <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-white/70 text-sm">Tracking Number</p>
                      <p className="font-mono text-lg" data-testid="tracking-number">{trackingData.tracking_number}</p>
                      {trackingData.carrier && (
                        <p className="text-white/70 text-sm">via {trackingData.carrier}</p>
                      )}
                    </div>
                    {trackingData.tracking_url && (
                      <a 
                        href={trackingData.tracking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-[#0F3057] px-6 py-3 font-medium hover:bg-white/90 transition-colors"
                        data-testid="track-external-btn"
                      >
                        Track on {trackingData.carrier}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Visual Progress Bar */}
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="font-heading text-2xl text-[#0F3057] mb-8">Shipping Progress</h2>
              
              <div className="hidden md:block mb-12">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-6 left-0 right-0 h-1 bg-[#E5E5DF]"></div>
                  <div 
                    className="absolute top-6 left-0 h-1 bg-[#2D5A43] transition-all duration-500"
                    style={{ width: `${Math.max(0, (currentStatusIndex / (statusOrder.length - 1)) * 100)}%` }}
                  ></div>
                  
                  {statusOrder.map((status, index) => {
                    const config = statusConfig[status];
                    const Icon = config.icon;
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    
                    return (
                      <div key={status} className="relative z-10 flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isCompleted ? 'bg-[#2D5A43] text-white' : 'bg-[#E5E5DF] text-[#5C636A]'
                        } ${isCurrent ? 'ring-4 ring-[#2D5A43]/30 scale-110' : ''}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className={`mt-3 text-sm text-center max-w-[80px] ${isCompleted ? 'text-[#0F3057] font-medium' : 'text-[#5C636A]'}`}>
                          {config.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Timeline */}
              <div className="bg-white border border-[#E5E5DF]">
                <div className="p-4 bg-[#F5F5F0] border-b border-[#E5E5DF]">
                  <h3 className="font-medium text-[#0F3057]">Order Timeline</h3>
                </div>
                {trackingData.timeline?.map((event, index) => {
                  const config = statusConfig[event.status] || statusConfig.placed;
                  const Icon = config.icon;
                  const isLast = index === trackingData.timeline.length - 1;
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex gap-4 p-6 ${!isLast ? 'border-b border-[#E5E5DF]' : ''}`}
                      data-testid={`timeline-event-${event.status}`}
                    >
                      <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${config.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <p className="font-medium text-[#0F3057]">{event.title}</p>
                            <p className="text-sm text-[#5C636A] mt-1">{event.description}</p>
                          </div>
                          <div className="text-right text-sm text-[#5C636A]">
                            <p>{new Date(event.timestamp).toLocaleDateString()}</p>
                            <p>{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Order Items */}
          {trackingData.artworks?.length > 0 && (
            <section className="py-12 bg-[#F5F5F0]">
              <div className="max-w-4xl mx-auto px-6">
                <h2 className="font-heading text-2xl text-[#0F3057] mb-6">Items in This Order</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {trackingData.artworks.map((artwork) => (
                    <div key={artwork.id} className="bg-white border border-[#E5E5DF] p-4 flex gap-4">
                      {artwork.image && (
                        <img 
                          src={artwork.image} 
                          alt={artwork.title}
                          className="w-24 h-24 object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-[#0F3057]">{artwork.title}</p>
                        <p className="text-sm text-[#5C636A]">by {artwork.artist_name}</p>
                        <Link 
                          to={`/artwork/${artwork.id}`}
                          className="text-sm text-[#2D5A43] hover:underline mt-2 inline-flex items-center gap-1"
                        >
                          View Artwork
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Features Section - Show when no tracking data */}
      {!trackingData && !error && (
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <h2 className="font-heading text-3xl text-[#0F3057] text-center mb-12">Premium Shipping Experience</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2D5A43] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl text-[#0F3057] mb-3">Fully Insured</h3>
                <p className="text-[#5C636A]">Every artwork is fully insured during transit for complete peace of mind.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E5A93C] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Box className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl text-[#0F3057] mb-3">Museum-Grade Packaging</h3>
                <p className="text-[#5C636A]">Custom packaging designed to protect fine art during international shipping.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0F3057] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl text-[#0F3057] mb-3">Global Delivery</h3>
                <p className="text-[#5C636A]">We ship worldwide with trusted carriers and white-glove service options.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-12 bg-[#0F3057]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl text-white mb-4">Need Help With Your Order?</h2>
          <p className="text-white/70 mb-8">Our dedicated support team is here to assist you with any questions.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0F3057] px-6 py-3 font-medium hover:bg-white/90 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Contact Support
            </Link>
            <Link 
              to="/profile"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 font-medium hover:bg-white/10 transition-colors"
            >
              View All Orders
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderTrackingPage;
