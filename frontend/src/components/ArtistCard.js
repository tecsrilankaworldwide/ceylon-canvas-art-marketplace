import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { ArtistBadges } from './VerifiedBadge';

export const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card bg-white border border-[#E5E5DF] overflow-hidden" data-testid={`artist-card-${artist.id}`}>
      {/* Cover Image */}
      <div className="h-32 overflow-hidden">
        <img
          src={artist.cover_image || 'https://images.pexels.com/photos/2097218/pexels-photo-2097218.jpeg'}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="absolute -top-10 left-6">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-[#F5F5F0]">
            <img
              src={artist.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="pt-12">
          <div className="flex items-center gap-2">
            <Link to={`/artist/${artist.id}`}>
              <h3 className="font-heading text-xl font-medium text-[#1A1D20] hover:text-[#0F3057] transition-colors">
                {artist.name}
              </h3>
            </Link>
            <ArtistBadges badges={artist.badges} size="sm" />
          </div>
          
          {artist.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-[#5C636A]" />
              <span className="font-body text-xs text-[#5C636A]">{artist.location}</span>
            </div>
          )}

          {/* Specialties */}
          {artist.specialties && artist.specialties.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {artist.specialties.slice(0, 3).map((specialty, index) => (
                <span 
                  key={index}
                  className="font-body text-[10px] px-2 py-1 bg-[#F5F5F0] text-[#5C636A] tracking-wider uppercase"
                >
                  {specialty}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E5E5DF]">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-[#E5A93C] text-[#E5A93C]" />
              <span className="font-body text-sm font-medium">{artist.rating?.toFixed(1) || '0.0'}</span>
            </div>
            <span className="font-body text-xs text-[#5C636A]">
              {artist.total_sales || 0} sales
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
