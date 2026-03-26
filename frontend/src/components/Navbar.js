import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, Menu, X, Search, Heart, Shield, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { NotificationCenter } from './NotificationCenter';
import { CurrencySelector } from './CurrencySelector';

// Ceylon Canvas Logo Component - Antique Brass CC with Lotus
const CeylonCanvasLogo = ({ size = 'default' }) => {
  const logoUrl = "https://static.prod-images.emergentagent.com/jobs/d89ac9f5-827b-4b7b-af63-873f102d6314/images/a152a79648d3052ef61cf0cefec6120574e5354bee1651458df389b98909377a.png";
  const sizes = {
    small: 'h-10 w-10',
    default: 'h-14 w-14',
    large: 'h-16 w-16'
  };
  return (
    <img 
      src={logoUrl} 
      alt="Ceylon Canvas" 
      className={`${sizes[size]} object-contain`}
    />
  );
};

export const Navbar = () => {
  const { user, isAuthenticated, logout, isArtist, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/gallery?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="nav-logo">
            <CeylonCanvasLogo />
            <div className="flex flex-col">
              <span className="font-heading text-xl font-semibold text-[#0F3057] tracking-tight">Ceylon Canvas</span>
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#5C636A]">Art Marketplace</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/gallery" className="font-body text-sm font-medium text-[#1A1D20] link-underline" data-testid="nav-gallery">
              Gallery
            </Link>
            <Link to="/artists" className="font-body text-sm font-medium text-[#1A1D20] link-underline" data-testid="nav-artists">
              Artists
            </Link>
            <Link to="/auctions" className="font-body text-sm font-medium text-[#1A1D20] link-underline" data-testid="nav-auctions">
              Auctions
            </Link>
            <Link to="/about" className="font-body text-sm font-medium text-[#1A1D20] link-underline" data-testid="nav-about">
              About
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-body text-sm font-medium text-[#1A1D20] link-underline cursor-pointer">
                Learn
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/education">Education Hub</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/education/beginner">Beginner Guides</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/education/collector">Collector Knowledge</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/world-art">World Art Cities</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/art-stories">Art Stories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/styles">Art Styles</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/education/paths">Learning Paths</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-body text-sm font-medium text-[#1A1D20] link-underline cursor-pointer">
                Services
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/investment-guide">Investment Guide</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/private-services">Private Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/how-it-works">How It Works</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/referral-program">Referral Program</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Currency Selector */}
            <CurrencySelector />

            {/* Search */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="p-2 hover:bg-[#F0F0EA] rounded-sm transition-colors"
              data-testid="nav-search-btn"
            >
              <Search className="h-5 w-5 text-[#1A1D20]" />
            </button>

            {isAuthenticated ? (
              <>
                {/* Messages */}
                <Link to="/messages" className="p-2 hover:bg-[#F0F0EA] rounded-sm transition-colors" data-testid="nav-messages">
                  <MessageCircle className="h-5 w-5 text-[#1A1D20]" />
                </Link>

                {/* Notifications */}
                <NotificationCenter />

                {/* Wishlist */}
                <Link to="/wishlist" className="p-2 hover:bg-[#F0F0EA] rounded-sm transition-colors" data-testid="nav-wishlist">
                  <Heart className="h-5 w-5 text-[#1A1D20]" />
                </Link>

                {/* Cart */}
                <Link to="/cart" className="p-2 hover:bg-[#F0F0EA] rounded-sm transition-colors relative" data-testid="nav-cart">
                  <ShoppingCart className="h-5 w-5 text-[#1A1D20]" />
                  {itemCount > 0 && (
                    <span className="notification-badge" data-testid="cart-badge">{itemCount}</span>
                  )}
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-[#F0F0EA] rounded-sm transition-colors" data-testid="nav-user-menu">
                      <User className="h-5 w-5 text-[#1A1D20]" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-3 py-2">
                      <p className="font-medium text-sm">{user?.name}</p>
                      <p className="text-xs text-[#5C636A]">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" data-testid="nav-dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/messages" data-testid="nav-messages-menu">Messages</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" data-testid="nav-orders">My Orders</Link>
                    </DropdownMenuItem>
                    {isArtist && (
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard/artworks" data-testid="nav-my-artworks">My Artworks</Link>
                      </DropdownMenuItem>
                    )}
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="text-[#0F3057] font-medium" data-testid="nav-admin">
                            <Shield className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-[#9E2A2B]" data-testid="nav-logout">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" data-testid="nav-login">
                  <Button variant="ghost" className="font-body text-sm">Sign In</Button>
                </Link>
                <Link to="/register" data-testid="nav-register">
                  <Button className="btn-primary rounded-sm">Join Now</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-[#E5E5DF]">
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artworks, artists, or styles..."
                className="flex-1 px-4 py-3 border border-[#E5E5DF] rounded-sm font-body text-sm focus:outline-none focus:border-[#0F3057]"
                autoFocus
                data-testid="search-input"
              />
              <Button type="submit" className="btn-primary rounded-sm" data-testid="search-submit">
                Search
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E5DF]" data-testid="mobile-menu">
          <div className="px-6 py-6 space-y-4">
            <Link to="/gallery" className="block font-body text-base py-2" onClick={() => setMobileMenuOpen(false)}>
              Gallery
            </Link>
            <Link to="/artists" className="block font-body text-base py-2" onClick={() => setMobileMenuOpen(false)}>
              Artists
            </Link>
            <Link to="/auctions" className="block font-body text-base py-2" onClick={() => setMobileMenuOpen(false)}>
              Auctions
            </Link>
            <Link to="/about" className="block font-body text-base py-2" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            
            <div className="border-t border-[#E5E5DF] pt-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="block font-body text-base py-2" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/messages" className="block font-body text-base py-2" onClick={() => setMobileMenuOpen(false)}>
                    Messages
                  </Link>
                  <Link to="/cart" className="block font-body text-base py-2" onClick={() => setMobileMenuOpen(false)}>
                    Cart {itemCount > 0 && `(${itemCount})`}
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="block font-body text-base py-2 text-[#0F3057] font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="block font-body text-base py-2 text-[#9E2A2B]">
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="btn-primary w-full rounded-sm">Join Now</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
