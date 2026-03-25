# Ceylon Canvas Art Marketplace - PRD

## Original Problem Statement
Ceylon Canvas Art Marketplace - A marketplace for Sri Lankan traditional and contemporary art connecting Sri Lankan artists with worldwide buyers.

## User Personas
1. **Art Collectors** - Worldwide buyers looking for authentic Sri Lankan art
2. **Sri Lankan Diaspora** - People seeking cultural connection through art
3. **Artists** - Sri Lankan artists wanting to sell their work globally
4. **Art Enthusiasts** - People interested in discovering new art styles
5. **Platform Administrators** - Staff managing users, artworks, and platform operations

## Core Requirements
- Both digital and physical art marketplace
- Artist profiles and portfolios
- Art listings with bidding/auction AND direct purchase
- Commission requests from artists
- JWT-based authentication
- Stripe payment integration
- Sri Lanka and world market focus
- Admin dashboard for platform management

## What's Been Implemented

### Backend (FastAPI + MongoDB)
- ✅ User authentication (register/login/JWT)
- ✅ Artist profiles CRUD
- ✅ Artwork listings CRUD with advanced filters
- ✅ Auction/bidding system with real-time notifications
- ✅ Direct purchase with cart
- ✅ Commission requests
- ✅ Wishlist functionality
- ✅ Shopping cart
- ✅ Stripe checkout integration
- ✅ Order management
- ✅ Categories and stats APIs
- ✅ Sample data seeding
- ✅ Image upload to object storage
- ✅ File download/serve API
- ✅ Email notifications (Resend)
- ✅ Reviews & Ratings System
- ✅ Auction End Handling
- ✅ Admin Dashboard APIs
- ✅ In-app Messaging System
- ✅ Notification System
- ✅ Multi-currency Support (USD/LKR)
- ✅ **WebSocket Real-time Updates** (NEW - March 2026)
  - Connection manager for multiple user sessions
  - Real-time bid updates to all watchers
  - Instant message delivery
  - Push notifications to connected users
  - Auto-reconnect with 5s delay

### Frontend (React + Tailwind + Shadcn)
- ✅ Homepage with hero, featured art, categories, artists
- ✅ Gallery page with advanced filters
- ✅ Artwork detail page with real-time bid updates
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
- ✅ Artist Analytics Dashboard
- ✅ Reviews Section on Artwork Pages
- ✅ Social Sharing Buttons
- ✅ Verified Artist Badges
- ✅ Admin Dashboard
- ✅ Messages Page with real-time delivery
- ✅ Notification Center with live connection indicator
- ✅ Currency Selector (USD/LKR)
- ✅ **WebSocket Integration** (NEW - March 2026)
  - useWebSocket hook for connection management
  - WebSocketContext for app-wide real-time state
  - Toast notifications for new bids/messages
  - Live "connected" indicator in UI
  - Auto-refresh bid prices during auctions

## Test Credentials
- **Admin User**: admin@ceyloncanvas.com / admin123
- **Regular User**: Can be created via registration

## Premium Collector Pages (Completed - Dec 2025)
- ✅ Investment Guide Page - Art as alternative asset, portfolio diversification, Sri Lanka opportunity
- ✅ Private Services Page - White-glove services, membership tiers (Collector Circle, Private Client, Institutional), consultation form
- ✅ Referral Program Page - Share & earn rewards, tier system (Ambassador, Patron, Connoisseur), FAQ
- ✅ Order Tracking Page - Track shipments with timeline, mock tracking demo, shipping features
- ✅ How It Works Page - Collector journey (Discover, Curate, Acquire, Receive), Artist onboarding steps, FAQ
- ✅ Press Page - Featured coverage, press releases, awards, media kit downloads
- ✅ Navbar Services Dropdown - Links to all premium pages
- ✅ Footer Collectors Section - Links to all premium pages + Track Order + Press

## 686+ Dynamic Pages System (Completed - Dec 2025)

### Core Pages (278):
- ✅ **50 Art Style Pages** - /styles/:slug
- ✅ **40 Region/Destination Pages** - /regions/:slug  
- ✅ **40 Collection/Theme Pages** - /collections/:slug
- ✅ **50 Blog/Article Pages** - /blog/:slug
- ✅ **30 Help Center Topics** - /help/:slug
- ✅ **15 Legal Pages** - /legal/:slug
- ✅ **25 Artist Spotlight Pages** - /spotlights/:slug
- ✅ Index + Premium + Core Pages

### Extended Pages (200):
- ✅ **30 Events & Exhibitions** - /events/:slug
- ✅ **30 Techniques & Tutorials** - /techniques/:slug
- ✅ **25 Art History Periods** - /art-history/:slug
- ✅ **20 Price Guides** - /price-guides/:slug
- ✅ **25 Collector Profiles** - /collector-guides/:slug
- ✅ **30 Gallery Partners** - /galleries/:slug
- ✅ **20 Art Materials** - /materials/:slug
- ✅ **20 Career Resources** - /artist-resources/:slug

### Art Education Section (208 NEW):
- ✅ **25 Art Fundamentals** - Elements, principles, composition, color theory (/education/fundamentals/:slug)
- ✅ **40 Masterpiece Analysis** - Mona Lisa, Starry Night, Guernica, etc. (/education/masterpieces/:slug)
- ✅ **30 Art History Comprehensive** - Prehistoric to Contemporary (/education/art-history/:slug)
- ✅ **25 Art Theory** - Formalism, semiotics, aesthetics, philosophy (/education/theory/:slug)
- ✅ **35 Artist Deep Studies** - Leonardo, Picasso, Van Gogh, Basquiat, etc. (/education/artists/:slug)
- ✅ **20 Museum Guides** - Louvre, MoMA, Uffizi, etc. (/education/museums/:slug)
- ✅ **25 Art Appreciation Courses** - Structured learning paths (/education/courses/:slug)
- ✅ **8 Education Hub + Index Pages**

**Message: "Art is not merely instinct or natural talent—it's a profound discipline built upon centuries of accumulated knowledge."**

**GRAND TOTAL: 686+ PAGES**

Data centralized in:
- `/src/data/pagesData.js` - Core page data
- `/src/data/educationData.js` - Education section data

## Prioritized Backlog

### P0 (Critical)
- None - Full feature set complete

### P1 (Important)
- Referral Program Backend (generate unique links, track rewards)
- Order Tracking Backend (shipping timeline/status integration)
- Email Automation Backend (welcome sequences, cart abandonment, post-purchase nurture)
- Real-time exchange rate API (replace static rates)
- Browser push notifications

### P2 (Nice to Have)
- Advanced search with AI recommendations
- Virtual gallery view (3D)
- Refactor server.py (~3077 lines) into modular routers
- Domain verification for production emails
- Scheduled job for automatic auction end checking
- Backend code refactoring (split server.py into routers)

## Architecture

### Backend Structure
```
/app/backend/
├── .env
├── requirements.txt
└── server.py (~3100 lines - includes WebSocket endpoint)
```

### Frontend Structure
```
/app/frontend/src/
├── App.js
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── Navbar.js
│   ├── NotificationCenter.js (WebSocket-enabled)
│   ├── CurrencySelector.js
│   └── ...
├── context/
│   ├── AuthContext.js
│   ├── CartContext.js
│   ├── CurrencyContext.js
│   └── WebSocketContext.js  # NEW
├── hooks/
│   └── useWebSocket.js      # NEW
├── pages/
│   ├── MessagesPage.js (WebSocket-enabled)
│   ├── ArtworkDetailPage.js (real-time bids)
│   └── ...
└── services/
    └── api.js
```

## Key API Endpoints

### WebSocket
- WS /ws/{token} - Real-time connection (bids, messages, notifications)

### Messaging Routes
- GET /api/conversations
- GET /api/conversations/{id}
- POST /api/conversations
- POST /api/messages

### Currency Routes
- GET /api/currency/rates
- GET /api/currency/convert

## 3rd Party Integrations
- Stripe (Payments) - Test key in environment
- Emergent Object Storage (Image Uploads)
- Resend (Email Notifications)
- GitHub (VCS) - Repository: tecsrilankaworldwide/ceylon-canvas-art-marketplace

## GitHub Repository
https://github.com/tecsrilankaworldwide/ceylon-canvas-art-marketplace

## Next Tasks
1. Order tracking with shipping status updates
2. Real-time exchange rate API integration
3. Browser push notifications (optional)

## Technical Notes
- WebSocket auto-reconnects after 5 seconds on disconnect
- Currency rates are static (1 USD = 325 LKR)
- WebSocket uses JWT token for authentication
- Notifications poll every 30s as fallback for non-WebSocket clients
