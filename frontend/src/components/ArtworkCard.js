import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Eye } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export const ArtworkCard = ({ artwork, onWishlistToggle, isWishlisted = false }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getTimeRemaining = (endDate) => {
    if (!endDate) return null;
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <div className="artwork-card group" data-testid={`artwork-card-${artwork.id}`}>
      <Link to={`/artwork/${artwork.id}`}>
        <div className="relative overflow-hidden bg-[#F5F5F0]">
          <div className="aspect-artwork">
            <img
              src={artwork.images?.[0] || 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg'}
              alt={artwork.title}
              className="artwork-image w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {artwork.is_auction && (
              <span className="badge-auction">Auction</span>
            )}
            {artwork.is_digital && (
              <Badge variant="secondary" className="text-[10px] font-semibold tracking-wider">Digital</Badge>
            )}
            {!artwork.is_available && (
              <span className="badge-sold">Sold</span>
            )}
          </div>

          {/* Wishlist Button */}
          {onWishlistToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onWishlistToggle(artwork.id);
              }}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              data-testid={`wishlist-btn-${artwork.id}`}
            >
              <Heart 
                className={`h-4 w-4 ${isWishlisted ? 'fill-[#B64E33] text-[#B64E33]' : 'text-[#1A1D20]'}`} 
              />
            </button>
          )}

          {/* Auction Timer */}
          {artwork.is_auction && artwork.auction_end_date && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-sm">
              <Clock className="h-3 w-3 text-[#0F3057]" />
              <span className="font-body text-xs font-medium auction-timer">
                {getTimeRemaining(artwork.auction_end_date)}
              </span>
            </div>
          )}

          {/* Views */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye className="h-3 w-3 text-[#5C636A]" />
            <span className="font-body text-xs text-[#5C636A]">{artwork.views || 0}</span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-4 pb-2">
        <Link to={`/artist/${artwork.artist_id}`} className="font-body text-xs text-[#5C636A] tracking-wider uppercase hover:text-[#0F3057] transition-colors">
          {artwork.artist_name}
        </Link>
        <Link to={`/artwork/${artwork.id}`}>
          <h3 className="font-heading text-lg font-medium text-[#1A1D20] mt-1 hover:text-[#0F3057] transition-colors line-clamp-1">
            {artwork.title}
          </h3>
        </Link>
        <div className="flex items-baseline justify-between mt-2">
          <div>
            {artwork.is_auction ? (
              <div>
                <span className="font-body text-xs text-[#5C636A]">Current Bid</span>
                <p className="price-display text-lg text-[#0F3057]">
                  {formatPrice(artwork.current_bid || artwork.price)}
                </p>
              </div>
            ) : (
              <p className="price-display text-lg text-[#0F3057]">
                {formatPrice(artwork.price)}
              </p>
            )}
          </div>
          {artwork.is_auction && artwork.bid_count > 0 && (
            <span className="font-body text-xs text-[#5C636A]">
              {artwork.bid_count} bid{artwork.bid_count !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
