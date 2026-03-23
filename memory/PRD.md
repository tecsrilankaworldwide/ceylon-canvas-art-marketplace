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

## What's Been Implemented (Jan 2026)

### Backend (FastAPI + MongoDB)
- ✅ User authentication (register/login/JWT)
- ✅ Artist profiles CRUD
- ✅ Artwork listings CRUD with advanced filters
- ✅ Auction/bidding system
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
- ✅ **Admin Dashboard APIs** (NEW - March 2026)
  - Platform statistics (users, artworks, revenue, orders)
  - User management (list, search, ban/unban, make admin)
  - Artwork moderation (list, search, flag/unflag, delete)
  - Artist verification management
  - Orders overview
  - Revenue chart data
- ✅ **Advanced Artwork Filtering** (NEW - March 2026)
  - Filter by medium (oil, acrylic, watercolor, etc.)
  - Filter by artist
  - Filter by year range
  - Filter by tags
  - Combined filter support

### Frontend (React + Tailwind + Shadcn)
- ✅ Homepage with hero, featured art, categories, artists
- ✅ Gallery page with advanced filters
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
- ✅ Artist Analytics Dashboard
- ✅ Reviews Section on Artwork Pages
- ✅ Social Sharing Buttons
- ✅ Verified Artist Badges
- ✅ **Admin Dashboard** (NEW - March 2026)
  - Overview tab with platform statistics cards
  - Users tab with search, role filter, ban/unban actions
  - Artworks tab with search, status filter, flag/delete actions
  - Artists tab with verification management
  - Orders tab
  - Confirmation dialogs for destructive actions
- ✅ **Enhanced Gallery Filtering** (NEW - March 2026)
  - Hero search bar
  - Collapsible filter sections
  - Category, Medium, Artist dropdowns
  - Auction and Digital checkboxes
  - Price range slider
  - Active filter badges with remove
  - Clear all filters
  - Sort options (Newest, Price, Popular, Name)
  - Grid view toggle

### Design Features
- Cormorant Garamond headings + Manrope body fonts
- Ceylon Sapphire (#0F3057) + Cinnamon Terracotta (#B64E33) brand colors
- Warm canvas light theme
- Gallery-inspired layout
- Artwork hover effects
- Glassmorphism navigation

## Test Credentials
- **Admin User**: admin@ceyloncanvas.com / admin123
- **Regular User**: Can be created via registration

## Prioritized Backlog

### P0 (Critical)
- None - Core MVP complete with admin features

### P1 (Important)
- In-app Messaging System (buyer-artist communication)
- Multi-currency Support (LKR/USD)
- Order tracking with shipping updates

### P2 (Nice to Have)
- Advanced search with AI recommendations
- Virtual gallery view (3D)
- Domain verification for production emails
- Scheduled job for automatic auction end checking

## Architecture

### Backend Structure
```
/app/backend/
├── .env
├── requirements.txt
└── server.py (Contains all routes - recommended for refactoring)
```

### Frontend Structure
```
/app/frontend/src/
├── App.js
├── components/
│   ├── ui/          # Shadcn UI components
│   ├── Navbar.js
│   ├── Footer.js
│   ├── ArtworkCard.js
│   ├── ReviewSection.js
│   └── ...
├── context/
│   ├── AuthContext.js
│   └── CartContext.js
├── pages/
│   ├── AdminDashboardPage.js (NEW)
│   ├── GalleryPage.js (Enhanced)
│   └── ...
└── services/
    └── api.js
```

## Key API Endpoints

### Admin Routes (Requires is_admin: true)
- GET /api/admin/stats - Platform statistics
- GET /api/admin/users - User list with search/filter
- PUT /api/admin/users/{id}/ban - Ban user
- PUT /api/admin/users/{id}/unban - Unban user
- PUT /api/admin/users/{id}/make-admin - Grant admin
- PUT /api/admin/users/{id}/remove-admin - Remove admin
- GET /api/admin/artworks - Artwork list for moderation
- PUT /api/admin/artworks/{id}/flag - Flag artwork
- PUT /api/admin/artworks/{id}/unflag - Unflag artwork
- DELETE /api/admin/artworks/{id} - Delete artwork
- GET /api/admin/artists - Artist list with verification
- PUT /api/admin/artists/{id}/verify - Update verification status
- GET /api/admin/orders - Orders list
- GET /api/admin/revenue-chart - Revenue data for charts

### Gallery/Artwork Routes
- GET /api/artworks - List with filters (category, medium, artist_id, is_auction, is_digital, min_price, max_price, tags, search, sort)
- GET /api/mediums - List of art mediums
- GET /api/categories - List of categories

## 3rd Party Integrations
- Stripe (Payments) - Test key in environment
- Emergent Object Storage (Image Uploads) - Emergent LLM Key
- Resend (Email Notifications) - API Key configured
- GitHub (VCS) - Repository linked

## Next Tasks
1. In-app Messaging System for buyer-artist communication
2. Multi-currency support (LKR/USD conversion)
3. Backend code refactoring (split server.py into routers)
