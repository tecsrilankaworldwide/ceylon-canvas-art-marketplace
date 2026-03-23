import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { getWishlist, removeFromWishlist } from '../services/api';
import { ArtworkCard } from '../components/ArtworkCard';

const WishlistPage = () => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const data = await getWishlist();
        setWishlist(data.items || []);
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setLoading(false);
      }
    };
    loadWishlist();
  }, [isAuthenticated]);

  const handleRemove = async (artworkId) => {
    try {
      await removeFromWishlist(artworkId);
      setWishlist(prev => prev.filter(item => item.id !== artworkId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="wishlist-page">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
          <div className="empty-state py-20">
            <Heart className="h-16 w-16 text-[#5C636A] mb-4" />
            <h2 className="font-heading text-2xl text-[#0F3057] mb-2">Please Sign In</h2>
            <p className="font-body text-[#5C636A] mb-6">Sign in to view your wishlist.</p>
            <Link to="/login" state={{ from: { pathname: '/wishlist' } }}>
              <Button className="btn-primary rounded-sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="wishlist-page">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-medium text-[#0F3057]">My Wishlist</h1>
          <p className="font-body text-[#5C636A] mt-1">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton aspect-artwork rounded-sm" />
            ))}
          </div>
        ) : wishlist.length === 0 ? (
          <div className="empty-state py-20">
            <Heart className="h-16 w-16 text-[#5C636A] mb-4" />
            <h2 className="font-heading text-2xl text-[#0F3057] mb-2">Your Wishlist is Empty</h2>
            <p className="font-body text-[#5C636A] mb-6">Save artworks you love to your wishlist.</p>
            <Link to="/gallery">
              <Button className="btn-primary rounded-sm">Explore Gallery</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((artwork) => (
              <ArtworkCard 
                key={artwork.id} 
                artwork={artwork} 
                onWishlistToggle={handleRemove}
                isWishlisted={true}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
