import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer-section" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Palette className="h-8 w-8 text-[#E5A93C]" />
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

          {/* Support */}
          <div>
            <h4 className="font-body font-semibold text-xs tracking-[0.2em] uppercase text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="footer-link text-sm">About Us</Link></li>
              <li><Link to="/about" className="footer-link text-sm">FAQs</Link></li>
              <li><Link to="/about" className="footer-link text-sm">Shipping Info</Link></li>
              <li><Link to="/about" className="footer-link text-sm">Returns Policy</Link></li>
              <li>
                <a href="mailto:hello@ceyloncanvas.com" className="footer-link text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Contact Us
                </a>
              </li>
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
              <Link to="/about" className="font-body text-xs text-[rgba(253,253,251,0.5)] hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="font-body text-xs text-[rgba(253,253,251,0.5)] hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
