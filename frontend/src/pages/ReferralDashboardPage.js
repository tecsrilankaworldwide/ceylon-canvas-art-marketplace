import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Users, DollarSign, Copy, Check, Share2, Twitter, Facebook, Mail, ArrowRight, Trophy, Star, Crown, Gem, Award } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Tier icons and colors
const tierConfig = {
  Bronze: { icon: Award, color: '#CD7F32', bg: 'bg-[#CD7F32]/10', text: 'text-[#CD7F32]' },
  Silver: { icon: Star, color: '#C0C0C0', bg: 'bg-[#C0C0C0]/10', text: 'text-[#71717A]' },
  Gold: { icon: Trophy, color: '#FFD700', bg: 'bg-[#FFD700]/10', text: 'text-[#B8860B]' },
  Platinum: { icon: Gem, color: '#E5E4E2', bg: 'bg-[#E5E4E2]/20', text: 'text-[#5C636A]' },
  Ambassador: { icon: Crown, color: '#9333EA', bg: 'bg-purple-100', text: 'text-purple-600' }
};

const ReferralDashboardPage = () => {
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReferralStats();
  }, []);

  const fetchReferralStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your referral dashboard');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/referral/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch referral data');
      
      const data = await response.json();
      setReferralData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnTwitter = () => {
    const text = `Join me on Ceylon Canvas - the premium Sri Lankan art marketplace! Use my referral code ${referralData?.code} to get started.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralData?.referral_link)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralData?.referral_link)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = "Join me on Ceylon Canvas!";
    const body = `Hi!\n\nI've been collecting amazing Sri Lankan art on Ceylon Canvas and thought you'd love it too.\n\nUse my referral link to join: ${referralData?.referral_link}\n\nOr use code: ${referralData?.code}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="referral-dashboard-loading">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="referral-dashboard-error">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <Gift className="h-16 w-16 text-[#E5A93C] mx-auto mb-6" />
          <h1 className="font-heading text-3xl text-[#0F3057] mb-4">Referral Program</h1>
          <p className="text-[#5C636A] mb-8">{error}</p>
          <Link to="/login" className="inline-flex items-center gap-2 bg-[#2D5A43] text-white px-6 py-3 hover:bg-[#234935] transition-colors">
            Log In to Continue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  const tier = tierConfig[referralData?.referral_tier] || tierConfig.Bronze;
  const TierIcon = tier.icon;
  const progressPercent = referralData?.next_tier_threshold > 0 
    ? Math.min((referralData.successful_referrals / referralData.next_tier_threshold) * 100, 100)
    : 100;

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="referral-dashboard">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F3057] via-[#1A4A7A] to-[#0F3057] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Gift className="h-16 w-16 text-[#E5A93C] mx-auto mb-6" />
          <h1 className="font-heading text-3xl lg:text-5xl text-white mb-4">Refer Friends, Earn Rewards</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Share the joy of Sri Lankan art with friends and earn credits for every successful referral.
          </p>
        </div>
      </section>

      {/* Referral Code Card */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border-2 border-[#E5E5DF] p-8 -mt-16 relative z-10 shadow-xl">
            <div className="text-center mb-8">
              <p className="text-sm text-[#5C636A] uppercase tracking-wider mb-2">Your Referral Code</p>
              <div className="flex items-center justify-center gap-4">
                <span className="font-heading text-4xl lg:text-5xl text-[#0F3057] tracking-wider" data-testid="referral-code">
                  {referralData?.code}
                </span>
                <button
                  onClick={() => copyToClipboard(referralData?.code)}
                  className="p-3 bg-[#F5F5F0] hover:bg-[#E5E5DF] transition-colors"
                  data-testid="copy-code-btn"
                >
                  {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5 text-[#5C636A]" />}
                </button>
              </div>
            </div>

            {/* Share Link */}
            <div className="bg-[#F5F5F0] p-4 mb-8">
              <p className="text-sm text-[#5C636A] mb-2">Or share your unique link:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralData?.referral_link}
                  className="flex-1 bg-white border border-[#E5E5DF] px-4 py-2 text-sm text-[#3D3D3D]"
                  data-testid="referral-link"
                />
                <button
                  onClick={() => copyToClipboard(referralData?.referral_link)}
                  className="px-4 py-2 bg-[#2D5A43] text-white hover:bg-[#234935] transition-colors"
                  data-testid="copy-link-btn"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-[#5C636A]">Share via:</span>
              <button onClick={shareOnTwitter} className="p-3 bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity" data-testid="share-twitter">
                <Twitter className="h-5 w-5" />
              </button>
              <button onClick={shareOnFacebook} className="p-3 bg-[#4267B2] text-white hover:opacity-90 transition-opacity" data-testid="share-facebook">
                <Facebook className="h-5 w-5" />
              </button>
              <button onClick={shareViaEmail} className="p-3 bg-[#5C636A] text-white hover:opacity-90 transition-opacity" data-testid="share-email">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 text-center" data-testid="stat-total-referrals">
              <Users className="h-8 w-8 text-[#0F3057] mx-auto mb-3" />
              <p className="font-heading text-3xl text-[#0F3057]">{referralData?.total_referrals || 0}</p>
              <p className="text-sm text-[#5C636A]">Total Referrals</p>
            </div>
            <div className="bg-white p-6 text-center" data-testid="stat-successful">
              <Check className="h-8 w-8 text-[#2D5A43] mx-auto mb-3" />
              <p className="font-heading text-3xl text-[#2D5A43]">{referralData?.successful_referrals || 0}</p>
              <p className="text-sm text-[#5C636A]">Successful</p>
            </div>
            <div className="bg-white p-6 text-center" data-testid="stat-pending">
              <Share2 className="h-8 w-8 text-[#E5A93C] mx-auto mb-3" />
              <p className="font-heading text-3xl text-[#E5A93C]">{referralData?.pending_referrals || 0}</p>
              <p className="text-sm text-[#5C636A]">Pending</p>
            </div>
            <div className="bg-white p-6 text-center" data-testid="stat-credits">
              <DollarSign className="h-8 w-8 text-[#B64E33] mx-auto mb-3" />
              <p className="font-heading text-3xl text-[#B64E33]">${referralData?.available_credits?.toFixed(2) || '0.00'}</p>
              <p className="text-sm text-[#5C636A]">Available Credits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Progress */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-[#E5E5DF] p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 ${tier.bg}`}>
                  <TierIcon className={`h-8 w-8 ${tier.text}`} />
                </div>
                <div>
                  <p className="text-sm text-[#5C636A]">Current Tier</p>
                  <p className={`font-heading text-2xl ${tier.text}`} data-testid="current-tier">{referralData?.referral_tier}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#5C636A]">Total Earned</p>
                <p className="font-heading text-2xl text-[#0F3057]">${referralData?.total_rewards_earned?.toFixed(2) || '0.00'}</p>
              </div>
            </div>

            {referralData?.next_tier_threshold < 999 && (
              <div>
                <div className="flex justify-between text-sm text-[#5C636A] mb-2">
                  <span>{referralData?.successful_referrals} successful referrals</span>
                  <span>{referralData?.next_tier_threshold} to next tier</span>
                </div>
                <div className="w-full bg-[#E5E5DF] h-3">
                  <div 
                    className="h-full bg-gradient-to-r from-[#E5A93C] to-[#B64E33] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tier Benefits */}
      <section className="py-12 bg-[#0F3057]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-2xl text-white text-center mb-8">Referral Tiers & Rewards</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { name: 'Bronze', referrals: '0+', reward: '$10' },
              { name: 'Silver', referrals: '5+', reward: '$15' },
              { name: 'Gold', referrals: '15+', reward: '$20' },
              { name: 'Platinum', referrals: '30+', reward: '$25' },
              { name: 'Ambassador', referrals: '50+', reward: '$30' }
            ].map((t) => {
              const config = tierConfig[t.name];
              const TIcon = config.icon;
              const isActive = referralData?.referral_tier === t.name;
              return (
                <div 
                  key={t.name} 
                  className={`p-4 text-center ${isActive ? 'bg-white' : 'bg-white/10'} transition-colors`}
                >
                  <TIcon className={`h-6 w-6 mx-auto mb-2 ${isActive ? config.text : 'text-white/60'}`} />
                  <p className={`font-medium ${isActive ? 'text-[#0F3057]' : 'text-white/80'}`}>{t.name}</p>
                  <p className={`text-xs ${isActive ? 'text-[#5C636A]' : 'text-white/50'}`}>{t.referrals} referrals</p>
                  <p className={`font-heading text-lg mt-2 ${isActive ? config.text : 'text-[#E5A93C]'}`}>{t.reward}/referral</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Referrals */}
      {referralData?.recent_referrals?.length > 0 && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-heading text-2xl text-[#0F3057] mb-6">Recent Referrals</h2>
            <div className="bg-white border border-[#E5E5DF]">
              {referralData.recent_referrals.map((ref, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-[#E5E5DF] last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F5F5F0] flex items-center justify-center">
                      <Users className="h-5 w-5 text-[#5C636A]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#0F3057]">{ref.name}</p>
                      <p className="text-sm text-[#5C636A]">{new Date(ref.joined_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 text-sm ${ref.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {ref.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                    {ref.reward_earned > 0 && (
                      <p className="text-sm text-[#2D5A43] mt-1">+${ref.reward_earned}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#E5A93C]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-[#0A1015] mb-4">Start Sharing Today</h2>
          <p className="text-[#0A1015]/70 mb-8">Every friend you refer brings you closer to Ambassador status!</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 bg-[#0A1015] text-white px-8 py-3 font-medium hover:bg-[#0A1015]/90 transition-colors"
          >
            Browse Art to Share
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ReferralDashboardPage;
