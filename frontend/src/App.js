import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { WebSocketProvider } from './context/WebSocketContext';
import '@/App.css';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import ArtistProfilePage from './pages/ArtistProfilePage';
import ArtistsPage from './pages/ArtistsPage';
import AuctionsPage from './pages/AuctionsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import DashboardPage from './pages/DashboardPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ArtworkFormPage from './pages/ArtworkFormPage';
import ArtistAnalyticsPage from './pages/ArtistAnalyticsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import MessagesPage from './pages/MessagesPage';
import InvestmentGuidePage from './pages/InvestmentGuidePage';
import PrivateServicesPage from './pages/PrivateServicesPage';
import ReferralProgramPage from './pages/ReferralProgramPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PressPage from './pages/PressPage';
import StylePage from './pages/StylePage';
import RegionPage from './pages/RegionPage';
import CollectionPage from './pages/CollectionPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import HelpCenterPage from './pages/HelpCenterPage';
import HelpTopicPage from './pages/HelpTopicPage';
import LegalIndexPage from './pages/LegalIndexPage';
import LegalPage from './pages/LegalPage';
import ArtistSpotlightPage from './pages/ArtistSpotlightPage';
import { StylesIndexPage, RegionsIndexPage, CollectionsIndexPage, ArtistSpotlightsIndexPage } from './pages/IndexPages';
import { EventPage, TechniquePage, ArtPeriodPage, PriceGuidePage, CollectorProfilePage, GalleryPartnerPage, ArtMaterialPage, CareerResourcePage } from './pages/DynamicPages';
import { EventsIndexPage, TechniquesIndexPage, ArtPeriodsIndexPage, PriceGuidesIndexPage, CollectorProfilesIndexPage, GalleryPartnersIndexPage, ArtMaterialsIndexPage, CareerResourcesIndexPage } from './pages/MoreIndexPages';
import { FundamentalPage, MasterpiecePage, ArtHistoryPage, ArtTheoryPage, ArtistStudyPage, MuseumStudyPage, ArtCoursePage } from './pages/EducationPages';
import { EducationHubPage, FundamentalsIndexPage, MasterpiecesIndexPage, ArtHistoryIndexPage, TheoryIndexPage, ArtistsStudyIndexPage, MuseumsIndexPage, CoursesIndexPage } from './pages/EducationIndexPages';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]">
        <div className="animate-spin h-8 w-8 border-2 border-[#0F3057] border-t-transparent rounded-full" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Layout Component
const Layout = ({ children, showFooter = true }) => {
  return (
    <>
      <Navbar />
      {children}
      {showFooter && <Footer />}
    </>
  );
};

// Auth Layout - No Navbar/Footer
const AuthLayout = ({ children }) => {
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
      <Route path="/artwork/:id" element={<Layout><ArtworkDetailPage /></Layout>} />
      <Route path="/artist/:id" element={<Layout><ArtistProfilePage /></Layout>} />
      <Route path="/artists" element={<Layout><ArtistsPage /></Layout>} />
      <Route path="/auctions" element={<Layout><AuctionsPage /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/investment-guide" element={<Layout><InvestmentGuidePage /></Layout>} />
      <Route path="/private-services" element={<Layout><PrivateServicesPage /></Layout>} />
      <Route path="/referral-program" element={<Layout><ReferralProgramPage /></Layout>} />
      <Route path="/track-order" element={<Layout><OrderTrackingPage /></Layout>} />
      <Route path="/how-it-works" element={<Layout><HowItWorksPage /></Layout>} />
      <Route path="/press" element={<Layout><PressPage /></Layout>} />
      
      {/* Art Styles - 50 pages */}
      <Route path="/styles" element={<Layout><StylesIndexPage /></Layout>} />
      <Route path="/styles/:slug" element={<Layout><StylePage /></Layout>} />
      
      {/* Regions & Destinations - 40 pages */}
      <Route path="/regions" element={<Layout><RegionsIndexPage /></Layout>} />
      <Route path="/regions/:slug" element={<Layout><RegionPage /></Layout>} />
      
      {/* Collections & Themes - 40 pages */}
      <Route path="/collections" element={<Layout><CollectionsIndexPage /></Layout>} />
      <Route path="/collections/:slug" element={<Layout><CollectionPage /></Layout>} />
      
      {/* Blog & Articles - 50 pages */}
      <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:slug" element={<Layout><BlogPostPage /></Layout>} />
      
      {/* Help Center - 30 pages */}
      <Route path="/help" element={<Layout><HelpCenterPage /></Layout>} />
      <Route path="/help/:slug" element={<Layout><HelpTopicPage /></Layout>} />
      
      {/* Legal Pages - 15 pages */}
      <Route path="/legal" element={<Layout><LegalIndexPage /></Layout>} />
      <Route path="/legal/:slug" element={<Layout><LegalPage /></Layout>} />
      
      {/* Artist Spotlights - 25 pages */}
      <Route path="/spotlights" element={<Layout><ArtistSpotlightsIndexPage /></Layout>} />
      <Route path="/spotlights/:slug" element={<Layout><ArtistSpotlightPage /></Layout>} />
      
      {/* Events & Exhibitions - 30 pages */}
      <Route path="/events" element={<Layout><EventsIndexPage /></Layout>} />
      <Route path="/events/:slug" element={<Layout><EventPage /></Layout>} />
      
      {/* Techniques & Tutorials - 30 pages */}
      <Route path="/techniques" element={<Layout><TechniquesIndexPage /></Layout>} />
      <Route path="/techniques/:slug" element={<Layout><TechniquePage /></Layout>} />
      
      {/* Art History & Periods - 25 pages */}
      <Route path="/art-history" element={<Layout><ArtPeriodsIndexPage /></Layout>} />
      <Route path="/art-history/:slug" element={<Layout><ArtPeriodPage /></Layout>} />
      
      {/* Price Guides - 20 pages */}
      <Route path="/price-guides" element={<Layout><PriceGuidesIndexPage /></Layout>} />
      <Route path="/price-guides/:slug" element={<Layout><PriceGuidePage /></Layout>} />
      
      {/* Collector Guides - 25 pages */}
      <Route path="/collector-guides" element={<Layout><CollectorProfilesIndexPage /></Layout>} />
      <Route path="/collector-guides/:slug" element={<Layout><CollectorProfilePage /></Layout>} />
      
      {/* Gallery Partners - 30 pages */}
      <Route path="/galleries" element={<Layout><GalleryPartnersIndexPage /></Layout>} />
      <Route path="/galleries/:slug" element={<Layout><GalleryPartnerPage /></Layout>} />
      
      {/* Art Materials - 20 pages */}
      <Route path="/materials" element={<Layout><ArtMaterialsIndexPage /></Layout>} />
      <Route path="/materials/:slug" element={<Layout><ArtMaterialPage /></Layout>} />
      
      {/* Artist Career Resources - 20 pages */}
      <Route path="/artist-resources" element={<Layout><CareerResourcesIndexPage /></Layout>} />
      <Route path="/artist-resources/:slug" element={<Layout><CareerResourcePage /></Layout>} />
      
      {/* ===== ART EDUCATION SECTION - 200+ pages ===== */}
      <Route path="/education" element={<Layout><EducationHubPage /></Layout>} />
      
      {/* Art Fundamentals - 25 pages */}
      <Route path="/education/fundamentals" element={<Layout><FundamentalsIndexPage /></Layout>} />
      <Route path="/education/fundamentals/:slug" element={<Layout><FundamentalPage /></Layout>} />
      
      {/* Masterpiece Analysis - 40 pages */}
      <Route path="/education/masterpieces" element={<Layout><MasterpiecesIndexPage /></Layout>} />
      <Route path="/education/masterpieces/:slug" element={<Layout><MasterpiecePage /></Layout>} />
      
      {/* Art History Comprehensive - 30 pages */}
      <Route path="/education/art-history" element={<Layout><ArtHistoryIndexPage /></Layout>} />
      <Route path="/education/art-history/:slug" element={<Layout><ArtHistoryPage /></Layout>} />
      
      {/* Art Theory - 25 pages */}
      <Route path="/education/theory" element={<Layout><TheoryIndexPage /></Layout>} />
      <Route path="/education/theory/:slug" element={<Layout><ArtTheoryPage /></Layout>} />
      
      {/* Artist Deep Studies - 35 pages */}
      <Route path="/education/artists" element={<Layout><ArtistsStudyIndexPage /></Layout>} />
      <Route path="/education/artists/:slug" element={<Layout><ArtistStudyPage /></Layout>} />
      
      {/* Museum Studies - 20 pages */}
      <Route path="/education/museums" element={<Layout><MuseumsIndexPage /></Layout>} />
      <Route path="/education/museums/:slug" element={<Layout><MuseumStudyPage /></Layout>} />
      
      {/* Art Appreciation Courses - 25 pages */}
      <Route path="/education/courses" element={<Layout><CoursesIndexPage /></Layout>} />
      <Route path="/education/courses/:slug" element={<Layout><ArtCoursePage /></Layout>} />
      
      {/* Auth Routes - No Layout */}
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
      
      {/* Protected Routes */}
      <Route path="/cart" element={<Layout><CartPage /></Layout>} />
      <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
      <Route path="/checkout/success" element={<Layout showFooter={false}><CheckoutSuccessPage /></Layout>} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout><DashboardPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute>
          <Layout><DashboardPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/artworks/new" element={
        <ProtectedRoute>
          <Layout><ArtworkFormPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/artworks/:id/edit" element={
        <ProtectedRoute>
          <Layout><ArtworkFormPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/analytics" element={
        <ProtectedRoute>
          <Layout><ArtistAnalyticsPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute>
          <Layout><AdminDashboardPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute>
          <Layout showFooter={false}><MessagesPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/messages/:conversationId" element={
        <ProtectedRoute>
          <Layout showFooter={false}><MessagesPage /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CurrencyProvider>
          <CartProvider>
            <WebSocketProvider>
              <div className="App">
                {/* Grain Texture Overlay */}
                <div className="grain-overlay" />
                <AppRoutes />
                <Toaster position="top-right" richColors />
              </div>
            </WebSocketProvider>
          </CartProvider>
        </CurrencyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
