import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Shield, BarChart3, Globe, 
  CheckCircle, ArrowRight, PieChart, Building2,
  Landmark, LineChart, Award, Lock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCurrency } from '../context/CurrencyContext';

const InvestmentGuidePage = () => {
  const { formatPrice } = useCurrency();

  const stats = [
    { value: "164%", label: "Art vs S&P 500 (25yr)", icon: TrendingUp },
    { value: "0.04", label: "Market Correlation", icon: LineChart },
    { value: "$65B", label: "Global Art Market", icon: Globe },
    { value: "300%", label: "Asian Art Growth (10yr)", icon: BarChart3 }
  ];

  const benefits = [
    {
      icon: PieChart,
      title: "Portfolio Diversification",
      description: "Art has near-zero correlation to stocks, bonds, and real estate. When markets panic, art holds steady."
    },
    {
      icon: Shield,
      title: "Wealth Preservation",
      description: "Tangible assets protect against inflation and currency devaluation. Art has preserved wealth for centuries."
    },
    {
      icon: TrendingUp,
      title: "Appreciation Potential",
      description: "Emerging Asian art has appreciated 300% over the past decade. Sri Lankan masters are next."
    },
    {
      icon: Landmark,
      title: "Tax Advantages",
      description: "In many jurisdictions, art offers favorable tax treatment for inheritance and capital gains."
    },
    {
      icon: Lock,
      title: "Private & Portable",
      description: "Unlike real estate, art is movable, private, and not tied to any single economy or government."
    },
    {
      icon: Award,
      title: "Cultural Legacy",
      description: "Build a collection that appreciates in value while contributing to cultural preservation."
    }
  ];

  const process = [
    {
      step: "01",
      title: "Research & Discovery",
      description: "Browse our curated collection of verified Sri Lankan masters. Each artwork includes complete provenance documentation."
    },
    {
      step: "02",
      title: "Due Diligence",
      description: "Review authentication certificates, artist credentials, and market comparables. Our team is available for consultation."
    },
    {
      step: "03",
      title: "Secure Acquisition",
      description: "Purchase through our escrow-protected platform. Pay via bank transfer, card, or cryptocurrency."
    },
    {
      step: "04",
      title: "Delivery & Documentation",
      description: "Museum-grade packaging, insured shipping, and complete ownership documentation delivered to your door."
    }
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="investment-guide-page">
      {/* Hero Section */}
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">
              Investment Guide
            </span>
            <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white leading-tight">
              Art as an 
              <span className="text-[#E5A93C]"> Alternative Asset</span>
            </h1>
            <p className="font-body text-lg text-white/70 mt-6 leading-relaxed">
              For 25 years, fine art has outperformed the S&P 500 by 164%. Discover why sophisticated 
              investors are allocating to emerging Sri Lankan masters.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/gallery">
                <Button className="btn-primary rounded-none px-8 py-6 text-base">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/private-services">
                <Button variant="outline" className="rounded-none px-8 py-6 text-base border-white/30 text-white hover:bg-white/10">
                  Private Advisory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0F3057] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="h-5 w-5 text-[#E5A93C]" />
                  <span className="font-heading text-3xl lg:text-4xl font-medium text-white">{stat.value}</span>
                </div>
                <p className="font-body text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Art Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Why Art Investment</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              The Smart Money Advantage
            </h2>
            <p className="font-body text-[#5C636A] mt-4">
              What UBS, Morgan Stanley, and the world's wealthiest families already know
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-8 border border-[#E5E5DF] hover:border-[#0F3057]/30 transition-colors group">
                <div className="w-14 h-14 bg-[#F5F5F0] flex items-center justify-center mb-6 group-hover:bg-[#0F3057]/10 transition-colors">
                  <benefit.icon className="h-7 w-7 text-[#0F3057]" />
                </div>
                <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-3">{benefit.title}</h3>
                <p className="font-body text-[#5C636A] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sri Lanka Opportunity */}
      <section className="py-20 lg:py-28 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">The Opportunity</span>
              <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
                Why Sri Lankan Art Now
              </h2>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-[#2D5A43] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading text-lg font-medium text-[#0F3057]">2,500 Years of Mastery</h4>
                    <p className="font-body text-[#5C636A] mt-1">An unbroken artistic tradition from ancient Buddhist temples to contemporary galleries worldwide.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-[#2D5A43] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading text-lg font-medium text-[#0F3057]">Dramatically Undervalued</h4>
                    <p className="font-body text-[#5C636A] mt-1">While Chinese and Indian art commands millions, Sri Lankan masterworks remain accessible — for now.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-[#2D5A43] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading text-lg font-medium text-[#0F3057]">Global Recognition Growing</h4>
                    <p className="font-body text-[#5C636A] mt-1">Saatchi Gallery, MoMA, and Singapore National Gallery have all exhibited Sri Lankan artists.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-[#2D5A43] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading text-lg font-medium text-[#0F3057]">Limited Supply</h4>
                    <p className="font-body text-[#5C636A] mt-1">Most masters produce fewer than 20 pieces annually. Scarcity drives long-term appreciation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-[#0A1015] relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg" 
                  alt="Sri Lankan Art" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1015] to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-body text-sm text-white/60 uppercase tracking-wider">Market Insight</p>
                  <p className="font-heading text-2xl text-white mt-2">
                    "Sri Lankan contemporary art is one of the most undervalued segments in the Asian market."
                  </p>
                  <p className="font-body text-white/60 mt-4">— Art Market Intelligence Report, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">The Process</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              From Discovery to Ownership
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <span className="font-heading text-7xl font-medium text-[#E5E5DF]">{item.step}</span>
                <h3 className="font-heading text-xl font-medium text-[#0F3057] mt-4">{item.title}</h3>
                <p className="font-body text-[#5C636A] mt-3">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-12">
                    <ArrowRight className="h-6 w-6 text-[#E5E5DF]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Disclaimer */}
      <section className="py-12 bg-[#0F3057]/5 border-y border-[#E5E5DF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-body text-sm text-[#5C636A]">
            <strong>Investment Disclaimer:</strong> Art should be considered a long-term investment. Past performance 
            does not guarantee future returns. We recommend art comprise no more than 5-10% of a diversified portfolio. 
            Consult with a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#0A1015]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C]">Begin Your Journey</span>
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white mt-4">
            Ready to Build Your Collection?
          </h2>
          <p className="font-body text-white/70 mt-6 max-w-xl mx-auto">
            Join collectors across 40+ countries who understand that the best investments are also the most beautiful.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/gallery">
              <Button className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-8 py-6 text-base font-medium">
                Explore Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/private-services">
              <Button variant="outline" className="rounded-none px-8 py-6 text-base border-white/30 text-white hover:bg-white/10">
                Request Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InvestmentGuidePage;
