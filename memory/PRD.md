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
- ✅ Auction/bidding system with notifications
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
- ✅ Admin Dashboard APIs (March 2026)
- ✅ **In-app Messaging System** (NEW - March 2026)
  - Conversations CRUD
  - Real-time message sending
  - Message read status
  - Artwork reference in conversations
- ✅ **Notification System** (NEW - March 2026)
  - Create notifications for bids, outbids, messages
  - Mark as read (single/all)
  - Unread count tracking
- ✅ **Multi-currency Support** (NEW - March 2026)
  - USD/LKR exchange rates
  - Currency conversion API
  - Rate: 1 USD = 325 LKR

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
- ✅ Admin Dashboard
- ✅ **Messages Page** (NEW - March 2026)
  - Conversation sidebar with search
  - Chat area with message bubbles
  - Read receipts (checkmarks)
  - "Message Artist" button on artist profiles
  - "Ask Question" button on artwork details
- ✅ **Notification Center** (NEW - March 2026)
  - Bell icon in navbar
  - Notification popover dropdown
  - Mark as read/delete actions
  - Auto-poll for new notifications (30s)
- ✅ **Currency Selector** (NEW - March 2026)
  - USD/LKR dropdown in navbar
  - CurrencyContext for app-wide state
  - Prices update in real-time

## Test Credentials
- **Admin User**: admin@ceyloncanvas.com / admin123
- **Regular User**: Can be created via registration

## Prioritized Backlog

### P0 (Critical)
- None - Core MVP + Messaging + Currency complete

### P1 (Important)
- Order tracking with shipping updates
- Real-time exchange rate API (replace static rates)
- Push notifications (browser/mobile)

### P2 (Nice to Have)
- Advanced search with AI recommendations
- Virtual gallery view (3D)
- Domain verification for production emails
- Scheduled job for automatic auction end checking
- Backend code refactoring (split server.py into routers)

## Architecture

### Backend Structure
```
/app/backend/
├── .env
├── requirements.txt
└── server.py (~3000 lines - recommended for refactoring)
```

### Frontend Structure
```
/app/frontend/src/
├── App.js
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── Navbar.js        # With NotificationCenter & CurrencySelector
│   ├── NotificationCenter.js
│   ├── CurrencySelector.js
│   └── ...
├── context/
│   ├── AuthContext.js
│   ├── CartContext.js
│   └── CurrencyContext.js  # NEW
├── pages/
│   ├── MessagesPage.js     # NEW
│   ├── AdminDashboardPage.js
│   ├── GalleryPage.js
│   └── ...
└── services/
    └── api.js
```

## Key API Endpoints

### Messaging Routes
- GET /api/conversations - List user's conversations
- GET /api/conversations/{id} - Get conversation with messages
- POST /api/conversations - Create new conversation
- POST /api/messages - Send message

### Notification Routes
- GET /api/notifications - List notifications with unread count
- PUT /api/notifications/{id}/read - Mark as read
- PUT /api/notifications/read-all - Mark all as read
- DELETE /api/notifications/{id} - Delete notification

### Currency Routes
- GET /api/currency/rates - Get exchange rates
- GET /api/currency/convert - Convert amount

## 3rd Party Integrations
- Stripe (Payments) - Test key in environment
- Emergent Object Storage (Image Uploads) - Emergent LLM Key
- Resend (Email Notifications) - API Key configured
- GitHub (VCS) - Repository linked

## Next Tasks
1. Order tracking with shipping status updates
2. Real-time exchange rate API integration
3. Backend code refactoring (split server.py)

## Technical Notes
- Currency rates are currently static (1 USD = 325 LKR)
- Notifications auto-poll every 30 seconds
- Seed data artists have placeholder user_ids - messaging works with real users
