import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Shield, Eye, Clock, Gem, Users, 
  ArrowRight, CheckCircle, Star, Building2,
  Globe, Phone, Mail, Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const PrivateServicesPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    investmentRange: '',
    interests: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const services = [
    {
      icon: Eye,
      title: "Priority Access",
      description: "View new works 48 hours before public release. First choice on limited pieces from sought-after artists."
    },
    {
      icon: Users,
      title: "Personal Curator",
      description: "A dedicated art advisor who understands your taste, goals, and portfolio. Available via phone, email, or video call."
    },
    {
      icon: Gem,
      title: "Custom Sourcing",
      description: "Looking for something specific? We'll source works from our extended network of artists and private collections."
    },
    {
      icon: Shield,
      title: "Portfolio Review",
      description: "Annual review of your collection's performance, insurance valuations, and strategic recommendations."
    },
    {
      icon: Calendar,
      title: "Private Viewings",
      description: "Exclusive invitations to private exhibitions, artist studio visits, and collector events worldwide."
    },
    {
      icon: Building2,
      title: "Institutional Services",
      description: "Corporate collections, hotel art programs, and institutional acquisitions with volume considerations."
    }
  ];

  const tiers = [
    {
      name: "Collector Circle",
      investment: "$25,000+",
      features: [
        "24-hour priority access to new works",
        "Dedicated account manager",
        "Complimentary shipping worldwide",
        "Annual portfolio review",
        "Invitation to virtual events"
      ],
      cta: "Join Circle"
    },
    {
      name: "Private Client",
      investment: "$100,000+",
      featured: true,
      features: [
        "48-hour priority access (before Circle)",
        "Personal curator relationship",
        "Custom sourcing service",
        "White-glove delivery & installation",
        "Private viewing invitations",
        "Complimentary framing on all works",
        "Quarterly market briefings"
      ],
      cta: "Apply Now"
    },
    {
      name: "Institutional",
      investment: "$500,000+",
      features: [
        "Bespoke collection development",
        "Volume acquisition pricing",
        "Corporate art program management",
        "Tax and estate planning coordination",
        "Museum loan facilitation",
        "Legacy collection planning"
      ],
      cta: "Contact Us"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Thank you! Our private client team will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      investmentRange: '',
      interests: '',
      message: ''
    });
    setSubmitting(false);
  };

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="private-services-page">
      {/* Hero Section */}
      <section className="bg-[#0A1015] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E5A93C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Crown className="h-8 w-8 text-[#E5A93C]" />
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C]">Private Client Services</span>
            </div>
            <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white leading-tight">
              For the Discerning 
              <span className="text-[#E5A93C]"> Collector</span>
            </h1>
            <p className="font-body text-lg text-white/70 mt-6 leading-relaxed">
              Elevated service for collectors who demand more. Personal curation, priority access, 
              and white-glove support for building world-class collections.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Exclusive Services</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Beyond the Gallery
            </h2>
            <p className="font-body text-[#5C636A] mt-4">
              A partnership approach to building your collection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-8 bg-white border border-[#E5E5DF] hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#0F3057] flex items-center justify-center mb-6 group-hover:bg-[#E5A93C] transition-colors">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-3">{service.title}</h3>
                <p className="font-body text-[#5C636A] leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 lg:py-28 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Membership Tiers</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Choose Your Level
            </h2>
            <p className="font-body text-[#5C636A] mt-4">
              Services tailored to your collecting ambitions
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
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className={`font-heading text-2xl font-medium ${tier.featured ? 'text-white' : 'text-[#0F3057]'}`}>
                    {tier.name}
                  </h3>
                  <p className={`font-body text-sm mt-2 ${tier.featured ? 'text-white/60' : 'text-[#5C636A]'}`}>
                    Annual Investment
                  </p>
                  <p className={`font-heading text-3xl font-medium mt-1 ${tier.featured ? 'text-[#E5A93C]' : 'text-[#0F3057]'}`}>
                    {tier.investment}
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${tier.featured ? 'text-[#E5A93C]' : 'text-[#2D5A43]'}`} />
                      <span className={`font-body text-sm ${tier.featured ? 'text-white/80' : 'text-[#5C636A]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full rounded-none py-6 ${
                    tier.featured 
                      ? 'bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015]' 
                      : 'bg-[#0F3057] hover:bg-[#0F3057]/90 text-white'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-[#E5A93C] text-[#E5A93C]" />
            ))}
          </div>
          <blockquote className="font-heading text-2xl lg:text-3xl text-[#0F3057] leading-relaxed">
            "The private client experience transformed how I collect. My curator understands 
            exactly what I'm looking for, and I've built a collection I'm proud to pass down."
          </blockquote>
          <div className="mt-8">
            <p className="font-heading text-lg text-[#0F3057]">Dr. Heinrich Weber</p>
            <p className="font-body text-sm text-[#5C636A]">Private Collector, Zurich</p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 lg:py-28 bg-[#0A1015]" id="apply">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C]">Get Started</span>
              <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white mt-4">
                Request Private Consultation
              </h2>
              <p className="font-body text-white/70 mt-6 leading-relaxed">
                Complete the form and a member of our private client team will contact you 
                within 24 hours to discuss your collecting goals.
              </p>
              
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E5A93C]/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-[#E5A93C]" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-white/60">Direct Line</p>
                    <p className="font-body text-white">+41 44 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E5A93C]/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-[#E5A93C]" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-white/60">Email</p>
                    <p className="font-body text-white">private@ceyloncanvas.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E5A93C]/20 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-[#E5A93C]" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-white/60">Offices</p>
                    <p className="font-body text-white">Colombo • London • Singapore</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm text-white/80 block mb-2">Full Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-none"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-white/80 block mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-none"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm text-white/80 block mb-2">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 234 567 8900"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-none"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-white/80 block mb-2">Country *</label>
                  <Select value={formData.country} onValueChange={(v) => setFormData({...formData, country: v})}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-none">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="switzerland">Switzerland</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="uae">United Arab Emirates</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="font-body text-sm text-white/80 block mb-2">Annual Investment Range *</label>
                <Select value={formData.investmentRange} onValueChange={(v) => setFormData({...formData, investmentRange: v})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-none">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100-250k">$100,000 - $250,000</SelectItem>
                    <SelectItem value="250-500k">$250,000 - $500,000</SelectItem>
                    <SelectItem value="500k+">$500,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-body text-sm text-white/80 block mb-2">Areas of Interest</label>
                <Input
                  value={formData.interests}
                  onChange={(e) => setFormData({...formData, interests: e.target.value})}
                  placeholder="e.g., Contemporary, Traditional, Specific artists..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-none"
                />
              </div>

              <div>
                <label className="font-body text-sm text-white/80 block mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your collecting goals..."
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-none resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none py-6 text-base font-medium"
              >
                {submitting ? 'Submitting...' : 'Request Consultation'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="font-body text-xs text-white/40 text-center">
                By submitting, you agree to our privacy policy. We never share your information.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivateServicesPage;
