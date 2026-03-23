import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Instagram, Globe, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArtworkCard } from '../components/ArtworkCard';
import { getArtist, getArtistArtworks } from '../services/api';

const ArtistProfilePage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [artistData, artworksData] = await Promise.all([
          getArtist(id),
          getArtistArtworks(id)
        ]);
        setArtist(artistData);
        setArtworks(artworksData);
      } catch (error) {
        console.error('Error loading artist:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB]">
        <div className="h-64 skeleton" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="skeleton w-32 h-32 rounded-full -mt-16" />
          <div className="skeleton h-8 w-48 mt-4" />
          <div className="skeleton h-4 w-64 mt-2" />
        </div>
      </main>
    );
  }

  if (!artist) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-[#0F3057] mb-4">Artist Not Found</h1>
          <Link to="/artists">
            <Button className="btn-primary rounded-sm">View All Artists</Button>
          </Link>
        </div>
      </main>
    );
  }

  const availableArtworks = artworks.filter(a => a.is_available && !a.is_auction);
  const auctionArtworks = artworks.filter(a => a.is_available && a.is_auction);
  const soldArtworks = artworks.filter(a => !a.is_available);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="artist-profile-page">
      {/* Cover Image */}
      <div className="h-64 lg:h-80 relative">
        <img
          src={artist.cover_image || 'https://images.pexels.com/photos/2097218/pexels-photo-2097218.jpeg'}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Back Button */}
        <Link 
          to="/artists"
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-sm font-body text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          All Artists
        </Link>
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative -mt-16 lg:-mt-20 pb-8 border-b border-[#E5E5DF]">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white overflow-hidden bg-[#F5F5F0] shadow-lg">
              <img
                src={artist.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
                alt={artist.name}
                className="w-full h-full object-cover"
                data-testid="artist-avatar"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057]" data-testid="artist-name">
                {artist.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                {artist.location && (
                  <div className="flex items-center gap-1 text-[#5C636A]">
                    <MapPin className="h-4 w-4" />
                    <span className="font-body text-sm">{artist.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-[#E5A93C] text-[#E5A93C]" />
                  <span className="font-body text-sm font-medium">{artist.rating?.toFixed(1) || '0.0'}</span>
                </div>
                <span className="font-body text-sm text-[#5C636A]">
                  {artist.total_sales || 0} sales
                </span>
              </div>

              {/* Specialties */}
              {artist.specialties?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {artist.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-[#F5F5F0] text-[#5C636A] font-body text-xs tracking-wider uppercase"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {artist.social_links?.instagram && (
                <a 
                  href={`https://instagram.com/${artist.social_links.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#F5F5F0] hover:bg-[#E5E5DF] rounded-sm transition-colors"
                >
                  <Instagram className="h-5 w-5 text-[#0F3057]" />
                </a>
              )}
              {artist.social_links?.website && (
                <a 
                  href={artist.social_links.website.startsWith('http') ? artist.social_links.website : `https://${artist.social_links.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#F5F5F0] hover:bg-[#E5E5DF] rounded-sm transition-colors"
                >
                  <Globe className="h-5 w-5 text-[#0F3057]" />
                </a>
              )}
              <Link 
                to={`/artwork/${artworks[0]?.id}`}
                className="p-3 bg-[#F5F5F0] hover:bg-[#E5E5DF] rounded-sm transition-colors"
              >
                <Mail className="h-5 w-5 text-[#0F3057]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bio */}
        {artist.bio && (
          <div className="py-8 border-b border-[#E5E5DF]">
            <h2 className="font-heading text-xl font-medium text-[#0F3057] mb-4">About</h2>
            <p className="font-body text-[#5C636A] leading-relaxed max-w-3xl" data-testid="artist-bio">
              {artist.bio}
            </p>
          </div>
        )}

        {/* Artworks */}
        <div className="py-12">
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="available" data-testid="tab-available">
                Available ({availableArtworks.length})
              </TabsTrigger>
              <TabsTrigger value="auctions" data-testid="tab-auctions">
                Auctions ({auctionArtworks.length})
              </TabsTrigger>
              <TabsTrigger value="sold" data-testid="tab-sold">
                Sold ({soldArtworks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="available">
              {availableArtworks.length === 0 ? (
                <div className="empty-state py-16">
                  <p className="font-body text-[#5C636A]">No available artworks at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {availableArtworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="auctions">
              {auctionArtworks.length === 0 ? (
                <div className="empty-state py-16">
                  <p className="font-body text-[#5C636A]">No active auctions.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {auctionArtworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="sold">
              {soldArtworks.length === 0 ? (
                <div className="empty-state py-16">
                  <p className="font-body text-[#5C636A]">No sold artworks yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {soldArtworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default ArtistProfilePage;
