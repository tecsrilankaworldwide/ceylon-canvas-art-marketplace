import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Palette, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isArtist, setIsArtist] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, isArtist);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFB] flex" data-testid="register-page">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg"
          alt="Artwork"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F3057]/40" />
        <div className="absolute inset-0 flex items-end p-12">
          <div>
            <h2 className="font-heading text-3xl font-medium text-white">Join Ceylon Canvas</h2>
            <p className="font-body text-white/80 mt-2 max-w-md">
              Whether you're an artist or collector, become part of our growing community celebrating Sri Lankan art.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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

          <h1 className="font-heading text-3xl font-medium text-[#0F3057]">Create Account</h1>
          <p className="font-body text-[#5C636A] mt-2">Start your journey with Ceylon Canvas</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="form-label">Full Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-1"
                data-testid="register-name"
              />
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1"
                data-testid="register-email"
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10 mt-1"
                  data-testid="register-password"
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

            <div>
              <label className="form-label">Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
                data-testid="register-confirm-password"
              />
            </div>

            <div className="flex items-center space-x-3 py-2">
              <Checkbox 
                id="artist" 
                checked={isArtist} 
                onCheckedChange={setIsArtist}
                data-testid="register-artist-checkbox"
              />
              <label htmlFor="artist" className="font-body text-sm cursor-pointer">
                I'm an artist looking to sell my work
              </label>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full rounded-sm"
              data-testid="register-submit"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="font-body text-xs text-[#5C636A] text-center mt-6">
            By creating an account, you agree to our{' '}
            <Link to="/about" className="text-[#0F3057] hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/about" className="text-[#0F3057] hover:underline">Privacy Policy</Link>
          </p>

          <p className="font-body text-sm text-[#5C636A] text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0F3057] font-medium hover:underline" data-testid="login-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
