# Ceylon Canvas Art Marketplace - PRD

## Original Problem Statement
Ceylon Canvas Art Marketplace - A marketplace for Sri Lankan traditional and contemporary art connecting Sri Lankan artists with worldwide buyers.

## User Personas
1. **Art Collectors** - Worldwide buyers looking for authentic Sri Lankan art
2. **Sri Lankan Diaspora** - People seeking cultural connection through art
3. **Artists** - Sri Lankan artists wanting to sell their work globally
4. **Art Enthusiasts** - People interested in discovering new art styles

## Core Requirements
- Both digital and physical art marketplace
- Artist profiles and portfolios
- Art listings with bidding/auction AND direct purchase
- Commission requests from artists
- JWT-based authentication
- Stripe payment integration
- Sri Lanka and world market focus

## What's Been Implemented (Jan 2026)

### Backend (FastAPI + MongoDB)
- ✅ User authentication (register/login/JWT)
- ✅ Artist profiles CRUD
- ✅ Artwork listings CRUD with filters
- ✅ Auction/bidding system
- ✅ Direct purchase with cart
- ✅ Commission requests
- ✅ Wishlist functionality
- ✅ Shopping cart
- ✅ Stripe checkout integration
- ✅ Order management
- ✅ Categories and stats APIs
- ✅ Sample data seeding
- ✅ **Image upload to object storage** (NEW)
- ✅ **File download/serve API** (NEW)

### Frontend (React + Tailwind + Shadcn)
- ✅ Homepage with hero, featured art, categories, artists
- ✅ Gallery page with filters (category, price, auction, digital)
- ✅ Artwork detail page with bid/buy functionality
- ✅ Artist profile pages with portfolio
- ✅ Artists listing page
- ✅ Live auctions page
- ✅ User authentication (login/register)
- ✅ Shopping cart with checkout
- ✅ Wishlist management
- ✅ User dashboard (orders, bids, commissions, wishlist)
- ✅ Commission request dialog
- ✅ About page
- ✅ Responsive design
- ✅ Glassmorphism navigation
- ✅ Gallery-aesthetic design with Ceylon cultural elements
- ✅ **Artwork creation form with image upload** (NEW)
- ✅ **ImageUpload component with drag & drop** (NEW)

### Design Features
- Cormorant Garamond headings + Manrope body fonts
- Ceylon Sapphire (#0F3057) + Cinnamon Terracotta (#B64E33) brand colors
- Warm canvas light theme
- Gallery-inspired layout
- Artwork hover effects
- Glassmorphism navigation

## Prioritized Backlog

### P0 (Critical)
- None - Core MVP complete with image upload

### P1 (Important)
- Email notifications for bids/purchases
- Artist verification system
- Order tracking

### P2 (Nice to Have)
- Advanced search with AI recommendations
- Virtual gallery view (3D)
- Artist messaging system
- Reviews and ratings
- Social sharing

## Next Tasks
1. ~~Add image upload functionality using object storage~~ ✅ DONE
2. Implement email notifications for transactions
3. Add artist analytics dashboard
4. Improve auction end handling with notifications
