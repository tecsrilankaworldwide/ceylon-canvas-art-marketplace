import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Heart, CreditCard, Truck, Shield, 
  ArrowRight, Users, Palette, Award, Globe,
  CheckCircle, Play, Eye, Lock
} from 'lucide-react';
import { Button } from '../components/ui/button';

const HowItWorksPage = () => {
  const forCollectors = [
    {
      step: "01",
      icon: Search,
      title: "Discover",
      description: "Browse our curated collection of authenticated Sri Lankan art. Filter by style, medium, price, or artist to find pieces that resonate with you.",
      details: ["Advanced search & filters", "Detailed artwork provenance", "Artist background stories"]
    },
    {
      step: "02",
      icon: Heart,
      title: "Curate",
      description: "Save artworks to your wishlist, compare pieces, and take your time. Our team is available for personalized recommendations.",
      details: ["Save favorites to wishlist", "Request private viewings", "Get curator consultations"]
    },
    {
      step: "03",
      icon: CreditCard,
      title: "Acquire",
      description: "Purchase securely via card, bank transfer, or cryptocurrency. All transactions are protected with escrow until delivery confirmation.",
      details: ["Multiple payment options", "Escrow protection", "Transparent pricing"]
    },
    {
      step: "04",
      icon: Truck,
      title: "Receive",
      description: "Museum-grade packaging, full insurance, and real-time tracking. White-glove delivery available with professional installation.",
      details: ["Insured worldwide shipping", "Real-time tracking", "Installation assistance"]
    }
  ];

  const forArtists = [
    {
      step: "01",
      icon: Palette,
      title: "Apply",
      description: "Submit your portfolio for review. We look for technical excellence, authentic voice, and commitment to the craft."
    },
    {
      step: "02",
      icon: Shield,
      title: "Verify",
      description: "Our team verifies your credentials, reviews your body of work, and conducts a video interview to understand your artistic journey."
    },
    {
      step: "03",
      icon: Eye,
      title: "List",
      description: "Once approved, list your artworks with professional photography guidance. Set your prices and manage your inventory."
    },
    {
      step: "04",
      icon: Award,
      title: "Sell",
      description: "When a collector purchases your work, we handle payment processing, packaging guidelines, and shipping coordination."
    }
  ];

  const trustFeatures = [
    {
      icon: Shield,
      title: "Authentication Guarantee",
      description: "Every artwork is verified by our expert team. We provide certificates of authenticity signed by the artist."
    },
    {
      icon: Lock,
      title: "Secure Transactions",
      description: "SSL encryption, escrow protection, and PCI-compliant payment processing keep your information safe."
    },
    {
      icon: Globe,
      title: "Worldwide Insurance",
      description: "Full insurance coverage from our gallery to your doorstep. Peace of mind on every shipment."
    },
    {
      icon: Users,
      title: "Direct Artist Connection",
      description: "Message artists directly, request commissions, and build relationships with the creators you admire."
    }
  ];

  const faqs = [
    {
      q: "How do you verify artwork authenticity?",
      a: "Every artist undergoes a rigorous verification process including portfolio review, video interview, and credential verification. Each artwork ships with a signed certificate of authenticity and detailed provenance documentation."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, bank transfers, PayPal, and cryptocurrency (BTC, ETH). For purchases over $10,000, we offer payment plans."
    },
    {
      q: "How is shipping handled?",
      a: "We use museum-grade packaging and partner with specialized art couriers. All shipments are fully insured and include real-time tracking. Delivery typically takes 7-14 days depending on destination."
    },
    {
      q: "Can I return an artwork?",
      a: "Yes, we offer a 14-day return policy. If the artwork doesn't match the description or arrives damaged, we provide a full refund including return shipping costs."
    },
    {
      q: "How do artists get paid?",
      a: "Artists receive payment within 7 business days of delivery confirmation. We transfer directly to their bank account after deducting our 15% commission."
    },
    {
      q: "Do you offer framing services?",
      a: "Yes, we partner with professional framers who specialize in fine art. Framing options are available at checkout, or you can request custom framing for any purchase."
    }
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="how-it-works-page">
      {/* Hero Section */}
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">
              How It Works
            </span>
            <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white leading-tight">
              Art Collecting, <span className="text-[#E5A93C]">Simplified</span>
            </h1>
            <p className="font-body text-lg text-white/70 mt-6 leading-relaxed">
              Whether you're a seasoned collector or discovering art for the first time, 
              we've made the journey from discovery to ownership seamless and secure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link to="/gallery">
                <Button className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-8 py-6 text-base font-medium">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="rounded-none px-8 py-6 text-base border-white/30 text-white hover:bg-white/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Collectors */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">For Collectors</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Your Journey to Ownership
            </h2>
            <p className="font-body text-[#5C636A] mt-4">
              Four simple steps from discovery to your doorstep
            </p>
          </div>

          <div className="space-y-16">
            {forCollectors.map((step, index) => (
              <div 
                key={index} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-heading text-6xl font-medium text-[#E5E5DF]">{step.step}</span>
                    <div className="w-14 h-14 bg-[#0F3057] flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl lg:text-3xl font-medium text-[#0F3057]">{step.title}</h3>
                  <p className="font-body text-lg text-[#5C636A] mt-4 leading-relaxed">{step.description}</p>
                  <ul className="mt-6 space-y-3">
                    {step.details.map((detail, dIndex) => (
                      <li key={dIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-[#2D5A43]" />
                        <span className="font-body text-[#5C636A]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} aspect-[4/3] bg-[#F5F5F0] relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <step.icon className="h-20 w-20 text-[#E5E5DF] mx-auto" />
                      <p className="font-heading text-xl text-[#E5E5DF] mt-4">{step.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 lg:py-28 bg-[#0F3057]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C]">See It in Action</span>
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white mt-4">
            Watch How Collectors Use Ceylon Canvas
          </h2>
          <div className="mt-12 aspect-video bg-[#0A1015] relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-[#E5A93C] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-[#0A1015] ml-1" />
              </div>
            </div>
            <p className="absolute bottom-6 left-6 font-body text-sm text-white/60">2:30 min</p>
          </div>
        </div>
      </section>

      {/* For Artists */}
      <section className="py-20 lg:py-28 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">For Artists</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Share Your Art with the World
            </h2>
            <p className="font-body text-[#5C636A] mt-4">
              Join our community of verified Sri Lankan artists
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forArtists.map((step, index) => (
              <div key={index} className="bg-white p-8 border border-[#E5E5DF]">
                <span className="font-heading text-5xl font-medium text-[#E5E5DF]">{step.step}</span>
                <div className="w-12 h-12 bg-[#0F3057] flex items-center justify-center mt-4 mb-4">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-medium text-[#0F3057]">{step.title}</h3>
                <p className="font-body text-[#5C636A] mt-3">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register">
              <Button className="bg-[#0F3057] hover:bg-[#0F3057]/90 text-white rounded-none px-8 py-6 text-base">
                Apply as an Artist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Trust & Security</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Buy with Confidence
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#2D5A43] flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-3">{feature.title}</h3>
                <p className="font-body text-[#5C636A]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-[#F5F5F0]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">FAQ</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-white border border-[#E5E5DF]">
                <h4 className="font-heading text-lg font-medium text-[#0F3057]">{faq.q}</h4>
                <p className="font-body text-[#5C636A] mt-3">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#0A1015]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white">
            Ready to Begin Your Collection?
          </h2>
          <p className="font-body text-white/70 mt-6 max-w-xl mx-auto">
            Join thousands of collectors worldwide who have discovered the beauty of Sri Lankan art
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
                Private Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
