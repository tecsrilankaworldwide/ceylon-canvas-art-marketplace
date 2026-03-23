import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Eye } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useCurrency } from '../context/CurrencyContext';

export const ArtworkCard = ({ artwork, onWishlistToggle, isWishlisted = false, compact = false }) => {
  const { formatPrice } = useCurrency();

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
          <div className={compact ? "aspect-square" : "aspect-artwork"}>
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
              <span className={`badge-auction ${compact ? 'text-[8px] px-1.5 py-0.5' : ''}`}>Auction</span>
            )}
            {artwork.is_digital && !compact && (
              <Badge variant="secondary" className="text-[10px] font-semibold tracking-wider">Digital</Badge>
            )}
            {!artwork.is_available && (
              <span className={`badge-sold ${compact ? 'text-[8px] px-1.5 py-0.5' : ''}`}>Sold</span>
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
              className={`absolute top-3 right-3 ${compact ? 'p-1.5' : 'p-2'} bg-white/90 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity`}
              data-testid={`wishlist-btn-${artwork.id}`}
            >
              <Heart 
                className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} ${isWishlisted ? 'fill-[#B64E33] text-[#B64E33]' : 'text-[#1A1D20]'}`} 
              />
            </button>
          )}

          {/* Auction Timer */}
          {artwork.is_auction && artwork.auction_end_date && !compact && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-sm">
              <Clock className="h-3 w-3 text-[#0F3057]" />
              <span className="font-body text-xs font-medium auction-timer">
                {getTimeRemaining(artwork.auction_end_date)}
              </span>
            </div>
          )}

          {/* Views */}
          {!compact && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="h-3 w-3 text-[#5C636A]" />
              <span className="font-body text-xs text-[#5C636A]">{artwork.views || 0}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className={compact ? "pt-2 pb-1" : "pt-4 pb-2"}>
        {!compact && (
          <Link to={`/artist/${artwork.artist_id}`} className="font-body text-xs text-[#5C636A] tracking-wider uppercase hover:text-[#0F3057] transition-colors">
            {artwork.artist_name}
          </Link>
        )}
        <Link to={`/artwork/${artwork.id}`}>
          <h3 className={`font-heading ${compact ? 'text-sm' : 'text-lg'} font-medium text-[#1A1D20] ${compact ? '' : 'mt-1'} hover:text-[#0F3057] transition-colors line-clamp-1`}>
            {artwork.title}
          </h3>
        </Link>
        <div className={`flex items-baseline justify-between ${compact ? 'mt-1' : 'mt-2'}`}>
          <div>
            {artwork.is_auction ? (
              <div>
                {!compact && <span className="font-body text-xs text-[#5C636A]">Current Bid</span>}
                <p className={`price-display ${compact ? 'text-sm' : 'text-lg'} text-[#0F3057]`}>
                  {formatPrice(artwork.current_bid || artwork.price)}
                </p>
              </div>
            ) : (
              <p className={`price-display ${compact ? 'text-sm' : 'text-lg'} text-[#0F3057]`}>
                {formatPrice(artwork.price)}
              </p>
            )}
          </div>
          {artwork.is_auction && artwork.bid_count > 0 && !compact && (
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
