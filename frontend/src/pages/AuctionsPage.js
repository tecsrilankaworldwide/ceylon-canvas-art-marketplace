import React, { useState, useEffect } from 'react';
import { Gavel, Clock } from 'lucide-react';
import { ArtworkCard } from '../components/ArtworkCard';
import { getActiveAuctions } from '../services/api';

const AuctionsPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuctions = async () => {
      setLoading(true);
      try {
        const data = await getActiveAuctions(50);
        setAuctions(data);
      } catch (error) {
        console.error('Error loading auctions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAuctions();
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="auctions-page">
      {/* Header */}
      <section className="bg-[#0A1015] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-2">
            <Gavel className="h-6 w-6 text-[#E5A93C]" />
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C] font-semibold">
              Bid Now
            </span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white mt-2">
            Live Auctions
          </h1>
          <p className="font-body text-base text-white/70 mt-4 max-w-xl">
            Discover unique Sri Lankan artworks available for bidding. Place your bid and own a piece of Ceylon's artistic heritage.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Info Banner */}
        <div className="bg-[#F5F5F0] p-6 rounded-sm mb-8">
          <div className="flex items-start gap-4">
            <Clock className="h-6 w-6 text-[#0F3057] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-heading text-lg font-medium text-[#0F3057]">How Auctions Work</h3>
              <p className="font-body text-sm text-[#5C636A] mt-1">
                Place your bid on any active auction. The highest bidder when the timer ends wins the artwork. 
                You'll be notified if someone outbids you, giving you a chance to bid higher.
              </p>
            </div>
          </div>
        </div>

        {/* Auctions Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton aspect-artwork rounded-sm" />
            ))}
          </div>
        ) : auctions.length === 0 ? (
          <div className="empty-state py-20">
            <Gavel className="h-12 w-12 text-[#5C636A] mb-4" />
            <h3 className="font-heading text-2xl text-[#0F3057] mb-2">No Active Auctions</h3>
            <p className="font-body text-[#5C636A]">Check back soon for new auction listings.</p>
          </div>
        ) : (
          <>
            <p className="font-body text-sm text-[#5C636A] mb-6">{auctions.length} active auction{auctions.length !== 1 ? 's' : ''}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {auctions.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AuctionsPage;
