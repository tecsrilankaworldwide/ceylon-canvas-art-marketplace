import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gavel, Users, Image, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ArtworkCard } from '../components/ArtworkCard';
import { ArtistCard } from '../components/ArtistCard';
import { getFeaturedArtworks, getActiveAuctions, getArtists, getCategories, getStats, seedData } from '../services/api';

const HomePage = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ artists: 0, artworks: 0, sold: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featured, activeAuctions, artistsList, categoriesData, statsData] = await Promise.all([
          getFeaturedArtworks(6),
          getActiveAuctions(4),
          getArtists({ limit: 4 }),
          getCategories(),
          getStats()
        ]);
        
        setFeaturedArtworks(featured);
        setAuctions(activeAuctions);
        setArtists(artistsList);
        setCategories(categoriesData.categories || []);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const categoryImages = {
    painting: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg',
    sculpture: 'https://images.pexels.com/photos/12047518/pexels-photo-12047518.jpeg',
    digital: 'https://images.unsplash.com/photo-1766801848077-31bd1900efcc?w=800',
    photography: 'https://images.pexels.com/photos/2097218/pexels-photo-2097218.jpeg',
    traditional: 'https://images.unsplash.com/photo-1720945489924-19b707539b3a?w=800'
  };

  return (
    <main className="pt-20" data-testid="home-page">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Hero Section */}
      <section className="hero-section relative" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2097218/pexels-photo-2097218.jpeg"
            alt="Art Gallery"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 flex items-center min-h-[90vh]">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-[#B64E33] font-semibold">
              Sri Lankan Art • Worldwide
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-[#0F3057] mt-4 leading-tight">
              Discover the Soul of<br />
              <span className="italic">Ceylon Through Art</span>
            </h1>
            <p className="font-body text-base lg:text-lg text-[#5C636A] mt-6 leading-relaxed max-w-lg">
              Connect with Sri Lanka's finest artists. From traditional masterpieces to contemporary digital art, 
              find pieces that tell stories of an ancient civilization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link to="/gallery" data-testid="hero-explore-btn">
                <Button className="btn-accent rounded-sm flex items-center gap-2 w-full sm:w-auto">
                  Explore Gallery <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/artists" data-testid="hero-artists-btn">
                <Button variant="outline" className="rounded-sm border-[#0F3057] text-[#0F3057] hover:bg-[#0F3057] hover:text-white w-full sm:w-auto">
                  Meet Our Artists
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0A1015] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-[#E5A93C]" />
                <span className="font-heading text-3xl lg:text-4xl font-medium text-white">{stats.artists}+</span>
              </div>
              <span className="font-body text-xs tracking-wider uppercase text-white/60">Artists</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Image className="h-5 w-5 text-[#E5A93C]" />
                <span className="font-heading text-3xl lg:text-4xl font-medium text-white">{stats.artworks}+</span>
              </div>
              <span className="font-body text-xs tracking-wider uppercase text-white/60">Artworks</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-[#E5A93C]" />
                <span className="font-heading text-3xl lg:text-4xl font-medium text-white">{stats.sold}+</span>
              </div>
              <span className="font-body text-xs tracking-wider uppercase text-white/60">Sold</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 lg:py-24 bg-[#FDFDFB]" data-testid="featured-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33] font-semibold">Curated Selection</span>
              <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-2">Featured Artworks</h2>
            </div>
            <Link to="/gallery" className="hidden sm:flex items-center gap-2 font-body text-sm font-medium text-[#0F3057] link-underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton aspect-artwork rounded-sm" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtworks.map((artwork, index) => (
                <div key={artwork.id} className={`animate-fade-in-up animation-delay-${(index + 1) * 100}`}>
                  <ArtworkCard artwork={artwork} />
                </div>
              ))}
            </div>
          )}
          
          <Link to="/gallery" className="sm:hidden flex items-center justify-center gap-2 font-body text-sm font-medium text-[#0F3057] mt-8">
            View All Artworks <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-[#F5F5F0]" data-testid="categories-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33] font-semibold">Browse By Style</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-2">Art Categories</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.slice(0, 4).map((category, index) => (
              <Link 
                key={category.id} 
                to={`/gallery?category=${category.id}`}
                className="category-card relative h-64 lg:h-80 rounded-sm overflow-hidden"
                data-testid={`category-${category.id}`}
              >
                <img
                  src={categoryImages[category.id] || categoryImages.painting}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="font-heading text-xl lg:text-2xl font-medium text-white">{category.name}</h3>
                  <span className="font-body text-xs text-white/70 tracking-wider uppercase mt-1 block">
                    Explore Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      {auctions.length > 0 && (
        <section className="py-16 lg:py-24 bg-[#0A1015]" data-testid="auctions-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Gavel className="h-5 w-5 text-[#E5A93C]" />
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C] font-semibold">Live Now</span>
                </div>
                <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white">Active Auctions</h2>
              </div>
              <Link to="/auctions" className="hidden sm:flex items-center gap-2 font-body text-sm font-medium text-white/80 hover:text-white link-underline">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {auctions.map((artwork) => (
                <div key={artwork.id} className="bg-white rounded-sm overflow-hidden">
                  <ArtworkCard artwork={artwork} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Artists */}
      <section className="py-16 lg:py-24 bg-[#FDFDFB]" data-testid="artists-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33] font-semibold">Meet The Creators</span>
              <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-2">Featured Artists</h2>
            </div>
            <Link to="/artists" className="hidden sm:flex items-center gap-2 font-body text-sm font-medium text-[#0F3057] link-underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#0F3057]" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white">
            Ready to Share Your Art with the World?
          </h2>
          <p className="font-body text-base text-white/80 mt-4 max-w-2xl mx-auto">
            Join Ceylon Canvas and connect with art collectors globally. 
            Showcase your work, set your prices, and grow your artistic career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/register" data-testid="cta-register">
              <Button className="bg-[#E5A93C] text-[#0A1015] hover:bg-[#d4992f] font-semibold tracking-wider uppercase text-xs px-8 py-4 rounded-sm">
                Become an Artist
              </Button>
            </Link>
            <Link to="/about" data-testid="cta-learn-more">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0F3057] rounded-sm px-8 py-4">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
