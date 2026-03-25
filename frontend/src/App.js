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
import { VocabularyPage, CompositionStudyPage, CollectionStudyPage, ManifestoPage, VocabularyIndexPage, CompositionIndexPage, FamousCollectionsIndexPage, ManifestosIndexPage } from './pages/MoreEducationPages';
import { 
  BeginnerGuidesHubPage, 
  SimpleArtGuidesIndexPage, ArtistIntentionsIndexPage, FiveQuestionsIndexPage, 
  EmotionsInArtIndexPage, CommonSymbolsIndexPage, ArtHistorySimpleIndexPage, FamousPaintingsSimpleIndexPage,
  SimpleArtGuidePage, ArtistIntentionsPage, FiveQuestionsPage, 
  EmotionsPage, SymbolsPage, ArtHistorySimplePage, FamousPaintingsSimplePage 
} from './pages/BeginnerGuidePages';
import {
  PracticeHubPage, LookAtPaintingIndexPage, LookAtPaintingPage, 
  CompareArtworksIndexPage, CompareArtworksPage,
  SpotTechniqueIndexPage, SpotTechniquePage,
  WalkthroughsIndexPage, WalkthroughPage,
  ArtByMoodIndexPage, ArtByMoodPage
} from './pages/PracticePages';
import {
  CollectorHubPage, CollectorGuidePage, QuickReferencePage
} from './pages/CollectorPages';
import {
  LearningPathsHubPage, LearningPathPage
} from './pages/LearningPathPages';

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
      
      {/* Art Vocabulary - 50 pages */}
      <Route path="/education/vocabulary" element={<Layout><VocabularyIndexPage /></Layout>} />
      <Route path="/education/vocabulary/:slug" element={<Layout><VocabularyPage /></Layout>} />
      
      {/* Composition Studies - 30 pages */}
      <Route path="/education/composition" element={<Layout><CompositionIndexPage /></Layout>} />
      <Route path="/education/composition/:slug" element={<Layout><CompositionStudyPage /></Layout>} />
      
      {/* Famous Collections - 20 pages */}
      <Route path="/education/famous-collections" element={<Layout><FamousCollectionsIndexPage /></Layout>} />
      <Route path="/education/famous-collections/:slug" element={<Layout><CollectionStudyPage /></Layout>} />
      
      {/* Art Manifestos - 15 pages */}
      <Route path="/education/manifestos" element={<Layout><ManifestosIndexPage /></Layout>} />
      <Route path="/education/manifestos/:slug" element={<Layout><ManifestoPage /></Layout>} />
      
      {/* BEGINNER GUIDES - Art Appreciation Made Simple (~190 pages) */}
      <Route path="/education/beginner" element={<Layout><BeginnerGuidesHubPage /></Layout>} />
      
      {/* How to Read Any Painting - 20 pages */}
      <Route path="/education/beginner/read-art" element={<Layout><SimpleArtGuidesIndexPage /></Layout>} />
      <Route path="/education/beginner/read-art/:slug" element={<Layout><SimpleArtGuidePage /></Layout>} />
      
      {/* What Artists Really Mean - 30 pages */}
      <Route path="/education/beginner/artist-intent" element={<Layout><ArtistIntentionsIndexPage /></Layout>} />
      <Route path="/education/beginner/artist-intent/:slug" element={<Layout><ArtistIntentionsPage /></Layout>} />
      
      {/* 5 Questions for Any Art - 20 pages */}
      <Route path="/education/beginner/five-questions" element={<Layout><FiveQuestionsIndexPage /></Layout>} />
      <Route path="/education/beginner/five-questions/:slug" element={<Layout><FiveQuestionsPage /></Layout>} />
      
      {/* Emotions in Art Decoded - 25 pages */}
      <Route path="/education/beginner/emotions" element={<Layout><EmotionsInArtIndexPage /></Layout>} />
      <Route path="/education/beginner/emotions/:slug" element={<Layout><EmotionsPage /></Layout>} />
      
      {/* Common Symbols Explained - 30 pages */}
      <Route path="/education/beginner/symbols" element={<Layout><CommonSymbolsIndexPage /></Layout>} />
      <Route path="/education/beginner/symbols/:slug" element={<Layout><SymbolsPage /></Layout>} />
      
      {/* Art History Made Simple - 20 pages */}
      <Route path="/education/beginner/history-simple" element={<Layout><ArtHistorySimpleIndexPage /></Layout>} />
      <Route path="/education/beginner/history-simple/:slug" element={<Layout><ArtHistorySimplePage /></Layout>} />
      
      {/* Famous Paintings Explained Simply - 25 pages */}
      <Route path="/education/beginner/famous-simple" element={<Layout><FamousPaintingsSimpleIndexPage /></Layout>} />
      <Route path="/education/beginner/famous-simple/:slug" element={<Layout><FamousPaintingsSimplePage /></Layout>} />
      
      {/* PRACTICE & INTERACTIVE GUIDES (~80 pages) */}
      <Route path="/education/practice" element={<Layout><PracticeHubPage /></Layout>} />
      
      {/* Look at This Painting - 20 exercises */}
      <Route path="/education/practice/look-at" element={<Layout><LookAtPaintingIndexPage /></Layout>} />
      <Route path="/education/practice/look-at/:slug" element={<Layout><LookAtPaintingPage /></Layout>} />
      
      {/* Compare Two Artworks - 15 comparisons */}
      <Route path="/education/practice/compare" element={<Layout><CompareArtworksIndexPage /></Layout>} />
      <Route path="/education/practice/compare/:slug" element={<Layout><CompareArtworksPage /></Layout>} />
      
      {/* Spot the Technique - 15 challenges */}
      <Route path="/education/practice/spot-technique" element={<Layout><SpotTechniqueIndexPage /></Layout>} />
      <Route path="/education/practice/spot-technique/:slug" element={<Layout><SpotTechniquePage /></Layout>} />
      
      {/* Step-by-Step Walkthroughs - 5 complete guides */}
      <Route path="/education/practice/walkthroughs" element={<Layout><WalkthroughsIndexPage /></Layout>} />
      <Route path="/education/practice/walkthroughs/:slug" element={<Layout><WalkthroughPage /></Layout>} />
      
      {/* Art by Mood - 8 mood collections */}
      <Route path="/education/practice/mood" element={<Layout><ArtByMoodIndexPage /></Layout>} />
      <Route path="/education/practice/mood/:slug" element={<Layout><ArtByMoodPage /></Layout>} />
      
      {/* COLLECTOR'S KNOWLEDGE (~16 pages) */}
      <Route path="/education/collector" element={<Layout><CollectorHubPage /></Layout>} />
      <Route path="/education/collector/:slug" element={<Layout><CollectorGuidePage /></Layout>} />
      
      {/* Quick Reference Cards - 6 cards */}
      <Route path="/education/reference/:slug" element={<Layout><QuickReferencePage /></Layout>} />
      
      {/* LEARNING PATHS - Guided Journeys */}
      <Route path="/education/paths" element={<Layout><LearningPathsHubPage /></Layout>} />
      <Route path="/education/paths/:slug" element={<Layout><LearningPathPage /></Layout>} />
      
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
