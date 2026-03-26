import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

// Ceylon Canvas Logo for Footer (dark theme)
const CeylonCanvasLogoDark = () => {
  const logoUrl = "https://static.prod-images.emergentagent.com/jobs/d89ac9f5-827b-4b7b-af63-873f102d6314/images/d1a3c6ea800436ea22d0d254298a7517618686f71f9f3179bc3f906c135748a4.png";
  return (
    <img 
      src={logoUrl} 
      alt="Ceylon Canvas" 
      className="h-10 w-10 object-contain"
    />
  );
};

export const Footer = () => {
  return (
    <footer className="footer-section" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <CeylonCanvasLogoDark />
              <div className="flex flex-col">
                <span className="font-heading text-xl font-semibold text-white tracking-tight">Ceylon Canvas</span>
                <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#E5A93C]">Art Marketplace</span>
              </div>
            </Link>
            <p className="font-body text-sm text-[rgba(253,253,251,0.7)] leading-relaxed mb-6">
              Connecting Sri Lankan artists with art collectors worldwide. Discover authentic Ceylon art from traditional to contemporary.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-sm transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-sm transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-sm transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-body font-semibold text-xs tracking-[0.2em] uppercase text-white mb-6">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/gallery" className="footer-link text-sm">Browse Gallery</Link></li>
              <li><Link to="/artists" className="footer-link text-sm">Featured Artists</Link></li>
              <li><Link to="/auctions" className="footer-link text-sm">Live Auctions</Link></li>
              <li><Link to="/gallery?category=traditional" className="footer-link text-sm">Traditional Art</Link></li>
              <li><Link to="/gallery?is_digital=true" className="footer-link text-sm">Digital Art</Link></li>
            </ul>
          </div>

          {/* For Artists */}
          <div>
            <h4 className="font-body font-semibold text-xs tracking-[0.2em] uppercase text-white mb-6">For Artists</h4>
            <ul className="space-y-3">
              <li><Link to="/register" className="footer-link text-sm">Become a Seller</Link></li>
              <li><Link to="/about" className="footer-link text-sm">Artist Guidelines</Link></li>
              <li><Link to="/about" className="footer-link text-sm">Commission Work</Link></li>
              <li><Link to="/about" className="footer-link text-sm">Pricing Guide</Link></li>
              <li><Link to="/about" className="footer-link text-sm">Success Stories</Link></li>
            </ul>
          </div>

          {/* Collectors */}
          <div>
            <h4 className="font-body font-semibold text-xs tracking-[0.2em] uppercase text-white mb-6">Collectors</h4>
            <ul className="space-y-3">
              <li><Link to="/investment-guide" className="footer-link text-sm">Investment Guide</Link></li>
              <li><Link to="/private-services" className="footer-link text-sm">Private Services</Link></li>
              <li><Link to="/how-it-works" className="footer-link text-sm">How It Works</Link></li>
              <li><Link to="/collections" className="footer-link text-sm">Collections</Link></li>
              <li><Link to="/styles" className="footer-link text-sm">Art Styles</Link></li>
              <li><Link to="/regions" className="footer-link text-sm">Art Destinations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-body font-semibold text-xs tracking-[0.2em] uppercase text-white mb-6">Learn</h4>
            <ul className="space-y-3">
              <li><Link to="/education" className="footer-link text-sm">Education Hub</Link></li>
              <li><Link to="/education/beginner" className="footer-link text-sm">Beginner Guides</Link></li>
              <li><Link to="/education/collector" className="footer-link text-sm">Collector Knowledge</Link></li>
              <li><Link to="/world-art" className="footer-link text-sm">World Art Cities</Link></li>
              <li><Link to="/art-stories" className="footer-link text-sm">Art Stories</Link></li>
              <li><Link to="/education/paths" className="footer-link text-sm">Learning Paths</Link></li>
              <li><Link to="/referral-program" className="footer-link text-sm">Referral Program</Link></li>
              <li><Link to="/track-order" className="footer-link text-sm">Track Order</Link></li>
              <li><Link to="/help" className="footer-link text-sm">Help Center</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-[rgba(253,253,251,0.5)]">
              © {new Date().getFullYear()} Ceylon Canvas Art Marketplace. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/legal/terms-of-service" className="font-body text-xs text-[rgba(253,253,251,0.5)] hover:text-white transition-colors">Terms</Link>
              <Link to="/legal/privacy-policy" className="font-body text-xs text-[rgba(253,253,251,0.5)] hover:text-white transition-colors">Privacy</Link>
              <Link to="/legal" className="font-body text-xs text-[rgba(253,253,251,0.5)] hover:text-white transition-colors">Legal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
