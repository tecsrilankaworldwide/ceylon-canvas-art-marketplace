import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, removeFromCart, clearCart, checkout, loading } = useCart();
  const [checkingOut, setCheckingOut] = React.useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleRemove = async (artworkId) => {
    try {
      await removeFromCart(artworkId);
      toast.success('Removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to checkout');
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    setCheckingOut(true);
    try {
      const result = await checkout();
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Checkout failed');
    } finally {
      setCheckingOut(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="cart-page">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
          <div className="empty-state py-20">
            <ShoppingCart className="h-16 w-16 text-[#5C636A] mb-4" />
            <h2 className="font-heading text-2xl text-[#0F3057] mb-2">Please Sign In</h2>
            <p className="font-body text-[#5C636A] mb-6">Sign in to view your cart and checkout.</p>
            <Link to="/login" state={{ from: { pathname: '/cart' } }}>
              <Button className="btn-primary rounded-sm" data-testid="cart-login">Sign In</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="cart-page">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-medium text-[#0F3057]">Shopping Cart</h1>
            <p className="font-body text-[#5C636A] mt-1">{cart.items.length} item{cart.items.length !== 1 ? 's' : ''}</p>
          </div>
          {cart.items.length > 0 && (
            <Button variant="ghost" onClick={handleClearCart} className="text-[#9E2A2B]" data-testid="clear-cart">
              Clear Cart
            </Button>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="skeleton h-32 rounded-sm" />
            ))}
          </div>
        ) : cart.items.length === 0 ? (
          <div className="empty-state py-20">
            <ShoppingCart className="h-16 w-16 text-[#5C636A] mb-4" />
            <h2 className="font-heading text-2xl text-[#0F3057] mb-2">Your Cart is Empty</h2>
            <p className="font-body text-[#5C636A] mb-6">Discover beautiful artworks and add them to your cart.</p>
            <Link to="/gallery">
              <Button className="btn-primary rounded-sm flex items-center gap-2" data-testid="browse-gallery">
                <ArrowLeft className="h-4 w-4" />
                Browse Gallery
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div 
                  key={item.artwork_id} 
                  className="flex gap-4 p-4 bg-white border border-[#E5E5DF] rounded-sm"
                  data-testid={`cart-item-${item.artwork_id}`}
                >
                  <Link to={`/artwork/${item.artwork_id}`} className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.artwork_image || 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg'}
                      alt={item.artwork_title}
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/artwork/${item.artwork_id}`}>
                      <h3 className="font-heading text-lg font-medium text-[#0F3057] hover:underline line-clamp-1">
                        {item.artwork_title}
                      </h3>
                    </Link>
                    <p className="font-body text-sm text-[#5C636A]">{item.artist_name}</p>
                    <p className="font-body text-lg font-semibold text-[#0F3057] mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.artwork_id)}
                    className="p-2 text-[#9E2A2B] hover:bg-red-50 rounded-sm self-start"
                    data-testid={`remove-${item.artwork_id}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#F5F5F0] p-6 rounded-sm sticky top-28">
                <h2 className="font-heading text-xl font-medium text-[#0F3057] mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-[#5C636A]">Subtotal</span>
                    <span className="font-medium">{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-[#5C636A]">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-[#E5E5DF] pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-body font-semibold">Total</span>
                    <span className="font-body text-xl font-semibold text-[#0F3057]">
                      {formatPrice(cart.total)}
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="btn-accent w-full rounded-sm flex items-center justify-center gap-2"
                  data-testid="checkout-btn"
                >
                  {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Link to="/gallery" className="block text-center mt-4">
                  <Button variant="ghost" className="font-body text-sm text-[#0F3057]">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
