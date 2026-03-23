import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Palette, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFB] flex" data-testid="login-page">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-12">
            <Palette className="h-8 w-8 text-[#0F3057]" />
            <div className="flex flex-col">
              <span className="font-heading text-xl font-semibold text-[#0F3057] tracking-tight">Ceylon Canvas</span>
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#5C636A]">Art Marketplace</span>
            </div>
          </Link>

          <h1 className="font-heading text-3xl font-medium text-[#0F3057]">Welcome Back</h1>
          <p className="font-body text-[#5C636A] mt-2">Sign in to continue to Ceylon Canvas</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="form-label">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1"
                data-testid="login-email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="form-label">Password</label>
                <Link to="/forgot-password" className="font-body text-xs text-[#0F3057] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                  data-testid="login-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C636A]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full rounded-sm"
              data-testid="login-submit"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="font-body text-sm text-[#5C636A] text-center mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#0F3057] font-medium hover:underline" data-testid="register-link">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/2097218/pexels-photo-2097218.jpeg"
          alt="Art Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F3057]/40" />
        <div className="absolute inset-0 flex items-end p-12">
          <div>
            <h2 className="font-heading text-3xl font-medium text-white">Discover Authentic Sri Lankan Art</h2>
            <p className="font-body text-white/80 mt-2 max-w-md">
              Connect with talented artists and find unique pieces that tell stories of Ceylon's rich heritage.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
