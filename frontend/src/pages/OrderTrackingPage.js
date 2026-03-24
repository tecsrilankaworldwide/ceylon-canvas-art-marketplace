import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle, MapPin, Clock, 
  Search, ArrowRight, Box, Plane, Shield, Phone
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../context/AuthContext';

const OrderTrackingPage = () => {
  const { isAuthenticated } = useAuth();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [searching, setSearching] = useState(false);

  // Mock tracking data for demonstration
  const mockTrackingData = {
    orderNumber: "CC-2024-78542",
    artwork: "Sunset Over Sigiriya",
    artist: "Pradeep Chandrasekara",
    status: "in_transit",
    estimatedDelivery: "December 28, 2025",
    shippingMethod: "White-Glove Delivery",
    timeline: [
      {
        status: "Order Placed",
        date: "Dec 15, 2025",
        time: "10:30 AM",
        location: "Colombo, Sri Lanka",
        completed: true
      },
      {
        status: "Authentication Complete",
        date: "Dec 16, 2025",
        time: "2:15 PM",
        location: "Ceylon Canvas HQ",
        completed: true
      },
      {
        status: "Museum-Grade Packaging",
        date: "Dec 17, 2025",
        time: "11:00 AM",
        location: "Colombo, Sri Lanka",
        completed: true
      },
      {
        status: "Shipped - In Transit",
        date: "Dec 18, 2025",
        time: "8:45 AM",
        location: "Colombo International Airport",
        completed: true,
        current: true
      },
      {
        status: "Customs Clearance",
        date: "Pending",
        time: "",
        location: "Destination Country",
        completed: false
      },
      {
        status: "Out for Delivery",
        date: "Pending",
        time: "",
        location: "Local Courier",
        completed: false
      },
      {
        status: "Delivered",
        date: "Est. Dec 28",
        time: "",
        location: "Your Address",
        completed: false
      }
    ]
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTrackingResult(mockTrackingData);
    setSearching(false);
  };

  const getStatusIcon = (status) => {
    if (status.includes("Order")) return Package;
    if (status.includes("Authentication")) return Shield;
    if (status.includes("Packaging")) return Box;
    if (status.includes("Shipped") || status.includes("Transit")) return Plane;
    if (status.includes("Customs")) return MapPin;
    if (status.includes("Delivery")) return Truck;
    if (status.includes("Delivered")) return CheckCircle;
    return Clock;
  };

  const features = [
    {
      icon: Shield,
      title: "Authentication Certificate",
      description: "Every artwork ships with a signed certificate of authenticity from the artist."
    },
    {
      icon: Box,
      title: "Museum-Grade Packaging",
      description: "Acid-free materials, custom crating, and climate-controlled containers."
    },
    {
      icon: Plane,
      title: "Insured Worldwide Shipping",
      description: "Full insurance coverage from our door to yours, with real-time tracking."
    },
    {
      icon: Truck,
      title: "White-Glove Delivery",
      description: "Professional art handlers deliver and can assist with installation."
    }
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="order-tracking-page">
      {/* Hero Section */}
      <section className="bg-[#0A1015] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Truck className="h-8 w-8 text-[#E5A93C]" />
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C]">Order Tracking</span>
            </div>
            <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white leading-tight">
              Track Your <span className="text-[#E5A93C]">Masterpiece</span>
            </h1>
            <p className="font-body text-lg text-white/70 mt-6">
              Follow your artwork's journey from our gallery to your collection
            </p>

            {/* Tracking Form */}
            <form onSubmit={handleTrack} className="mt-10">
              <div className="flex gap-3 max-w-xl mx-auto">
                <Input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter order number (e.g., CC-2024-78542)"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-none py-6"
                />
                <Button 
                  type="submit"
                  disabled={searching}
                  className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-8"
                >
                  {searching ? (
                    <div className="animate-spin h-5 w-5 border-2 border-[#0A1015] border-t-transparent rounded-full" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="font-body text-xs text-white/40 mt-3">
                Find your order number in your confirmation email or dashboard
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Tracking Result */}
      {trackingResult && (
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            {/* Order Summary */}
            <div className="bg-[#F5F5F0] p-6 lg:p-8 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="font-body text-sm text-[#5C636A]">Order Number</p>
                  <p className="font-heading text-xl font-medium text-[#0F3057]">{trackingResult.orderNumber}</p>
                </div>
                <div className="lg:text-right">
                  <p className="font-body text-sm text-[#5C636A]">Estimated Delivery</p>
                  <p className="font-heading text-xl font-medium text-[#2D5A43]">{trackingResult.estimatedDelivery}</p>
                </div>
              </div>
              <div className="border-t border-[#E5E5DF] mt-6 pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <p className="font-body text-sm text-[#5C636A]">Artwork</p>
                    <p className="font-heading text-lg text-[#0F3057]">{trackingResult.artwork}</p>
                    <p className="font-body text-sm text-[#5C636A]">by {trackingResult.artist}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm text-[#5C636A]">Shipping Method</p>
                    <p className="font-heading text-lg text-[#0F3057]">{trackingResult.shippingMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <h3 className="font-heading text-2xl font-medium text-[#0F3057] mb-8">Shipment Timeline</h3>
              
              <div className="space-y-0">
                {trackingResult.timeline.map((event, index) => {
                  const Icon = getStatusIcon(event.status);
                  return (
                    <div key={index} className="relative pl-12 pb-8 last:pb-0">
                      {/* Vertical Line */}
                      {index < trackingResult.timeline.length - 1 && (
                        <div className={`absolute left-[18px] top-10 w-0.5 h-full ${event.completed ? 'bg-[#2D5A43]' : 'bg-[#E5E5DF]'}`} />
                      )}
                      
                      {/* Icon */}
                      <div className={`absolute left-0 w-9 h-9 rounded-full flex items-center justify-center ${
                        event.current 
                          ? 'bg-[#E5A93C] ring-4 ring-[#E5A93C]/20' 
                          : event.completed 
                            ? 'bg-[#2D5A43]' 
                            : 'bg-[#E5E5DF]'
                      }`}>
                        <Icon className={`h-4 w-4 ${event.completed || event.current ? 'text-white' : 'text-[#5C636A]'}`} />
                      </div>
                      
                      {/* Content */}
                      <div className={`${event.current ? 'bg-[#E5A93C]/10 -ml-4 p-4' : ''}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h4 className={`font-heading text-lg ${event.completed || event.current ? 'text-[#0F3057]' : 'text-[#5C636A]'}`}>
                            {event.status}
                            {event.current && <span className="ml-2 text-xs bg-[#E5A93C] text-[#0A1015] px-2 py-0.5 rounded-full">Current</span>}
                          </h4>
                          <p className="font-body text-sm text-[#5C636A]">
                            {event.date} {event.time && `at ${event.time}`}
                          </p>
                        </div>
                        <p className="font-body text-sm text-[#5C636A] mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Support CTA */}
            <div className="mt-12 p-6 border border-[#E5E5DF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0F3057]/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-[#0F3057]" />
                </div>
                <div>
                  <p className="font-heading text-lg text-[#0F3057]">Need Assistance?</p>
                  <p className="font-body text-sm text-[#5C636A]">Our shipping specialists are here to help</p>
                </div>
              </div>
              <Button className="bg-[#0F3057] hover:bg-[#0F3057]/90 text-white rounded-none">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Shipping Features */}
      <section className={`py-20 lg:py-28 ${trackingResult ? 'bg-[#F5F5F0]' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Our Promise</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Museum-Quality Shipping
            </h2>
            <p className="font-body text-[#5C636A] mt-4">
              We treat every artwork as the valuable piece it is
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0F3057] flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-3">{feature.title}</h3>
                <p className="font-body text-[#5C636A]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logged In Users - Recent Orders */}
      {isAuthenticated && !trackingResult && (
        <section className="py-16 border-t border-[#E5E5DF]">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h3 className="font-heading text-2xl font-medium text-[#0F3057] mb-8">Your Recent Orders</h3>
            <div className="space-y-4">
              <div className="p-6 border border-[#E5E5DF] hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="font-heading text-lg text-[#0F3057]">Sunset Over Sigiriya</p>
                    <p className="font-body text-sm text-[#5C636A]">Order #CC-2024-78542</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-sm">In Transit</span>
                    <Button 
                      variant="outline" 
                      className="rounded-none"
                      onClick={() => {
                        setTrackingNumber('CC-2024-78542');
                        setTrackingResult(mockTrackingData);
                      }}
                    >
                      Track Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/dashboard">
                <Button variant="outline" className="rounded-none">
                  View All Orders
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#0A1015]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white">
            Ready to Add to Your Collection?
          </h2>
          <p className="font-body text-white/70 mt-6 max-w-xl mx-auto">
            Discover authenticated Sri Lankan masterworks with worldwide shipping
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/gallery">
              <Button className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-8 py-6 text-base font-medium">
                Browse Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="rounded-none px-8 py-6 text-base border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderTrackingPage;
