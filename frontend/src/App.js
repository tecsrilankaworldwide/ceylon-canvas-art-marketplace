import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
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
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            {/* Grain Texture Overlay */}
            <div className="grain-overlay" />
            <AppRoutes />
            <Toaster position="top-right" richColors />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
