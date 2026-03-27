# Ceylon Canvas Art Marketplace - PRD

## Overview
Premium Sri Lankan art marketplace connecting local artists with international collectors. Full-stack React + FastAPI + MongoDB application deployed on DigitalOcean.

## Production URL
**Live Site:** http://165.22.109.221

## Login Credentials
- **Owner Account:** `owner@ceyloncanvas.com` / `ceylon2024`
- **Admin Account:** `admin@ceyloncanvas.com` / `admin123`

## What's Been Implemented ✅

### Core Features (DONE)
- User authentication (JWT-based login/register)
- Artist profiles (40 artists seeded)
- Art gallery with filters (50 artworks)
- Live auctions (30 active auctions)
- Bidding system
- Shopping cart & wishlist
- Multi-language support (English, Sinhala, Tamil)
- Currency selector (USD, LKR, EUR, GBP)
- Educational content (Learn section)
- Services page

### Design & Branding (DONE)
- Antique brass CC logo
- Premium dark theme with gold accents
- Responsive navbar with all navigation
- Footer with language selector

### Deployment (DONE - March 27, 2026)
- DigitalOcean Droplet (4GB RAM)
- Docker Compose orchestration
- Nginx reverse proxy with /api routing
- MongoDB database
- GitHub repository: tecsrilankaworldwide/ceylon-canvas-art-marketplace

## Upcoming Tasks (P1)

### 1. Furniture Section (PRIORITY - Tomorrow)
- Backend API endpoints for furniture CRUD
- Categories: Antique, Contemporary, Export, Unique
- Seed data for furniture items
- Frontend pages for furniture browsing
- Filter by style, material, origin

### 2. Bug Fixes
- Eradicate intermittent errors
- Ensure all pages load consistently

### 3. Logo Enhancement
- Add shine/glow highlights to antique brass logo

### 4. Code Refactoring
- Split server.py (~4000 lines) into modular routes:
  - routes/auth.py
  - routes/artworks.py
  - routes/artists.py
  - routes/auctions.py
  - routes/furniture.py (new)

## Future Tasks (P2)

### React Native Mobile App
- Play Store & App Store deployment
- Mirror web functionality

### Domain Setup
- Purchase ceyloncanvas.art domain
- Configure DNS and SSL

### Integrations
- Stripe payments (API key needed)
- Resend email notifications (API key needed)
- Real-time exchange rates
- Push notifications

## Tech Stack
- **Frontend:** React, TailwindCSS, Shadcn/UI
- **Backend:** FastAPI, Python 3.11
- **Database:** MongoDB
- **Deployment:** Docker, Docker Compose, Nginx
- **Hosting:** DigitalOcean Droplet

## Key Files
- `/app/backend/server.py` - Main API (needs refactoring)
- `/app/backend/seed_data.py` - Database seeding
- `/app/frontend/src/App.js` - React router setup
- `/app/frontend/src/context/LanguageContext.js` - Multi-language
- `/app/frontend/nginx.conf` - Nginx config with /api proxy

## Session Notes - March 27, 2026
- Fixed production deployment issues (wrong app was deployed)
- Added nginx /api proxy configuration
- Fixed artwork price model (Optional for auctions)
- Seeded 40 artists, 50 artworks, 30 auctions
- Created new owner account for login
- All core pages working: Home, Gallery, Auctions, Artists
