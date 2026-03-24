import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Gift, Award, ArrowRight, Copy, Check, 
  Wallet, TrendingUp, Crown, Star, Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { toast } from 'sonner';

const ReferralProgramPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { formatPrice } = useCurrency();
  const [copied, setCopied] = useState(false);
  
  // Mock referral data (would come from API in production)
  const referralCode = user ? `CEYLON-${user.name?.toUpperCase().slice(0, 4) || 'ART'}-${Math.random().toString(36).substr(2, 6).toUpperCase()}` : 'CEYLON-GUEST-XXXXXX';
  const referralLink = `https://ceyloncanvas.com/join?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const tiers = [
    {
      name: "Ambassador",
      referrals: "1-5",
      reward: "5%",
      icon: Star,
      perks: ["5% commission on referral purchases", "Early access to new collections"]
    },
    {
      name: "Patron",
      referrals: "6-15",
      reward: "7.5%",
      icon: Award,
      perks: ["7.5% commission", "Priority customer support", "Exclusive previews"]
    },
    {
      name: "Connoisseur",
      referrals: "16+",
      reward: "10%",
      icon: Crown,
      featured: true,
      perks: ["10% commission", "Private curator access", "VIP event invitations", "Annual art gift"]
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Share Your Link",
      description: "Send your unique referral link to friends, family, and fellow art enthusiasts."
    },
    {
      step: "02", 
      title: "They Discover Art",
      description: "When someone uses your link to create an account, they're tagged as your referral."
    },
    {
      step: "03",
      title: "Earn Rewards",
      description: "Earn commission on every purchase they make for their first year as a collector."
    },
    {
      step: "04",
      title: "Unlock Benefits",
      description: "As your network grows, unlock higher tiers with better rewards and exclusive perks."
    }
  ];

  const stats = [
    { value: "$2.4M", label: "Paid to Ambassadors" },
    { value: "12,000+", label: "Active Referrers" },
    { value: "$850", label: "Avg. Monthly Earnings" },
    { value: "94%", label: "Satisfaction Rate" }
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="referral-program-page">
      {/* Hero Section */}
      <section className="bg-[#0A1015] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#E5A93C]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0F3057]/50 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Gift className="h-8 w-8 text-[#E5A93C]" />
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C]">Referral Program</span>
            </div>
            <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white leading-tight">
              Share the Gift of 
              <span className="text-[#E5A93C]"> Art</span>
            </h1>
            <p className="font-body text-lg text-white/70 mt-6 leading-relaxed">
              Introduce fellow collectors to Sri Lankan masterworks and earn rewards for every 
              purchase they make. Build your network, elevate your tier, unlock exclusive benefits.
            </p>
            
            {isAuthenticated ? (
              <div className="mt-10 p-6 bg-white/5 border border-white/10">
                <p className="font-body text-sm text-white/60 mb-3">Your Personal Referral Link</p>
                <div className="flex gap-3">
                  <Input 
                    value={referralLink}
                    readOnly
                    className="bg-white/10 border-white/20 text-white font-mono text-sm rounded-none"
                  />
                  <Button 
                    onClick={handleCopyLink}
                    className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-6"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
                <p className="font-body text-xs text-white/40 mt-3">
                  Share this link via email, social media, or direct message
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 mt-10">
                <Link to="/register">
                  <Button className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-8 py-6 text-base font-medium">
                    Join Now & Get Your Link
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="rounded-none px-8 py-6 text-base border-white/30 text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0F3057] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <span className="font-heading text-3xl lg:text-4xl font-medium text-white">{stat.value}</span>
                <p className="font-body text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">How It Works</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Four Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <span className="font-heading text-7xl font-medium text-[#E5E5DF]">{item.step}</span>
                <h3 className="font-heading text-xl font-medium text-[#0F3057] mt-4">{item.title}</h3>
                <p className="font-body text-[#5C636A] mt-3">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-12">
                    <ArrowRight className="h-6 w-6 text-[#E5E5DF]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="py-20 lg:py-28 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Reward Tiers</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              The More You Share, The More You Earn
            </h2>
            <p className="font-body text-[#5C636A] mt-4">
              Unlock higher tiers with better commission rates and exclusive perks
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div 
                key={index} 
                className={`p-8 ${tier.featured ? 'bg-[#0F3057] text-white ring-4 ring-[#E5A93C]' : 'bg-white border border-[#E5E5DF]'} relative`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E5A93C] text-[#0A1015] px-4 py-1 text-xs font-body uppercase tracking-wider">
                    Best Value
                  </div>
                )}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto flex items-center justify-center ${tier.featured ? 'bg-[#E5A93C]/20' : 'bg-[#F5F5F0]'} mb-4`}>
                    <tier.icon className={`h-8 w-8 ${tier.featured ? 'text-[#E5A93C]' : 'text-[#0F3057]'}`} />
                  </div>
                  <h3 className={`font-heading text-2xl font-medium ${tier.featured ? 'text-white' : 'text-[#0F3057]'}`}>
                    {tier.name}
                  </h3>
                  <p className={`font-body text-sm mt-2 ${tier.featured ? 'text-white/60' : 'text-[#5C636A]'}`}>
                    {tier.referrals} Successful Referrals
                  </p>
                  <p className={`font-heading text-4xl font-medium mt-4 ${tier.featured ? 'text-[#E5A93C]' : 'text-[#0F3057]'}`}>
                    {tier.reward}
                  </p>
                  <p className={`font-body text-sm ${tier.featured ? 'text-white/60' : 'text-[#5C636A]'}`}>Commission Rate</p>
                </div>
                <ul className="space-y-3">
                  {tier.perks.map((perk, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${tier.featured ? 'text-[#E5A93C]' : 'text-[#2D5A43]'}`} />
                      <span className={`font-body text-sm ${tier.featured ? 'text-white/80' : 'text-[#5C636A]'}`}>
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Options */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Spread the Word</span>
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
            Share Your Way
          </h2>
          <p className="font-body text-[#5C636A] mt-4 max-w-xl mx-auto">
            Use any method you prefer to share your referral link with friends and fellow art lovers
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { name: "Email", icon: "✉️" },
              { name: "WhatsApp", icon: "💬" },
              { name: "LinkedIn", icon: "💼" },
              { name: "Twitter", icon: "🐦" }
            ].map((platform, index) => (
              <button 
                key={index}
                className="p-6 border border-[#E5E5DF] hover:border-[#0F3057] hover:shadow-lg transition-all group"
              >
                <span className="text-3xl block mb-3">{platform.icon}</span>
                <span className="font-body text-sm text-[#0F3057] group-hover:text-[#0F3057]">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-[#F5F5F0]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">FAQ</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How long do I earn commissions from a referral?",
                a: "You earn commissions on all purchases your referral makes during their first 12 months as a collector."
              },
              {
                q: "When and how do I get paid?",
                a: "Commissions are paid monthly via bank transfer or PayPal when your balance exceeds $50."
              },
              {
                q: "Is there a limit to how many people I can refer?",
                a: "No limit! The more collectors you bring to Ceylon Canvas, the higher your tier and rewards."
              },
              {
                q: "Do my referrals get any benefits?",
                a: "Yes! New collectors who join via referral link receive 10% off their first purchase."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white border border-[#E5E5DF]">
                <h4 className="font-heading text-lg font-medium text-[#0F3057]">{faq.q}</h4>
                <p className="font-body text-[#5C636A] mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#0A1015]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Share2 className="h-12 w-12 text-[#E5A93C] mx-auto mb-6" />
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white">
            Start Earning Today
          </h2>
          <p className="font-body text-white/70 mt-6 max-w-xl mx-auto">
            Join thousands of art enthusiasts who earn while sharing their passion for Sri Lankan art.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {isAuthenticated ? (
              <Button 
                onClick={handleCopyLink}
                className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-8 py-6 text-base font-medium"
              >
                {copied ? 'Link Copied!' : 'Copy Your Referral Link'}
                {copied ? <Check className="ml-2 h-5 w-5" /> : <Copy className="ml-2 h-5 w-5" />}
              </Button>
            ) : (
              <Link to="/register">
                <Button className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-8 py-6 text-base font-medium">
                  Create Account & Start Earning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link to="/gallery">
              <Button variant="outline" className="rounded-none px-8 py-6 text-base border-white/30 text-white hover:bg-white/10">
                Browse Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReferralProgramPage;
