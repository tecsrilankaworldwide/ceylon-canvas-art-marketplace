import React from 'react';
import { BadgeCheck, Shield, Star, Award } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

export const VerifiedBadge = ({ type = 'verified', size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const badges = {
    verified: {
      icon: BadgeCheck,
      color: 'text-[#0F3057]',
      bg: 'bg-[#0F3057]/10',
      label: 'Verified Artist',
      description: 'Identity and portfolio verified by Ceylon Canvas'
    },
    featured: {
      icon: Star,
      color: 'text-[#E5A93C]',
      bg: 'bg-[#E5A93C]/10',
      label: 'Featured Artist',
      description: 'Recognized for exceptional work and sales'
    },
    top_seller: {
      icon: Award,
      color: 'text-[#2D5A43]',
      bg: 'bg-[#2D5A43]/10',
      label: 'Top Seller',
      description: 'One of our top-performing artists'
    },
    trusted: {
      icon: Shield,
      color: 'text-[#B64E33]',
      bg: 'bg-[#B64E33]/10',
      label: 'Trusted Seller',
      description: 'Consistently high-quality service and fast shipping'
    }
  };

  const badge = badges[type] || badges.verified;
  const Icon = badge.icon;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span 
            className={`inline-flex items-center justify-center rounded-full p-1 ${badge.bg} cursor-help`}
            data-testid={`badge-${type}`}
          >
            <Icon className={`${sizeClass} ${badge.color}`} />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="font-semibold text-sm">{badge.label}</p>
          <p className="text-xs text-[#5C636A]">{badge.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const ArtistBadges = ({ badges = [], size = 'md' }) => {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="flex items-center gap-1" data-testid="artist-badges">
      {badges.map((badge, index) => (
        <VerifiedBadge key={index} type={badge} size={size} />
      ))}
    </div>
  );
};

export default VerifiedBadge;
