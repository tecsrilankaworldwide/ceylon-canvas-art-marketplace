import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Newspaper, Award, Quote, ArrowRight, ExternalLink, 
  Calendar, Download, Mail, Camera
} from 'lucide-react';
import { Button } from '../components/ui/button';

const PressPage = () => {
  const featuredPress = [
    {
      publication: "Financial Times",
      logo: "FT",
      title: "Sri Lankan Art: The Next Frontier for Serious Collectors",
      excerpt: "Ceylon Canvas is leading the charge to bring Sri Lankan contemporary art to international collectors, with sales up 340% year-over-year.",
      date: "November 2025",
      link: "#"
    },
    {
      publication: "Art Market Monitor",
      logo: "AMM",
      title: "Emerging Markets Report: South Asia's Hidden Gems",
      excerpt: "While Indian art dominates headlines, platforms like Ceylon Canvas are quietly building markets for undervalued Sri Lankan masters.",
      date: "October 2025",
      link: "#"
    },
    {
      publication: "Artnet News",
      logo: "AN",
      title: "Digital Platforms Democratizing Art Collecting in Asia",
      excerpt: "Ceylon Canvas exemplifies how technology is connecting Asian artists with global audiences, cutting out traditional gallery gatekeepers.",
      date: "September 2025",
      link: "#"
    }
  ];

  const pressReleases = [
    {
      date: "December 2025",
      title: "Ceylon Canvas Partners with Singapore Art Museum for Exhibition",
      description: "Landmark collaboration brings 40 Sri Lankan masterworks to Southeast Asia's premier art institution."
    },
    {
      date: "November 2025",
      title: "Platform Surpasses $10M in Artist Payouts",
      description: "Milestone demonstrates growing international demand for authentic Sri Lankan art."
    },
    {
      date: "October 2025",
      title: "Launch of Private Client Services for High-Net-Worth Collectors",
      description: "New tier offers white-glove service, personal curators, and exclusive access."
    },
    {
      date: "September 2025",
      title: "Ceylon Canvas Introduces Live Auction Feature",
      description: "Real-time bidding platform enables collectors worldwide to compete for rare pieces."
    }
  ];

  const awards = [
    {
      year: "2025",
      award: "Best Art E-Commerce Platform",
      organization: "Asian Digital Awards"
    },
    {
      year: "2025",
      award: "Cultural Innovation Award",
      organization: "Sri Lanka Design Council"
    },
    {
      year: "2024",
      award: "Startup of the Year - Arts & Culture",
      organization: "South Asian Business Awards"
    }
  ];

  const stats = [
    { value: "150+", label: "Verified Artists" },
    { value: "40+", label: "Countries Served" },
    { value: "$10M+", label: "Artist Earnings" },
    { value: "5,000+", label: "Artworks Sold" }
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="press-page">
      {/* Hero Section */}
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Newspaper className="h-8 w-8 text-[#E5A93C]" />
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C]">Press & Media</span>
            </div>
            <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white leading-tight">
              Ceylon Canvas in the <span className="text-[#E5A93C]">News</span>
            </h1>
            <p className="font-body text-lg text-white/70 mt-6 leading-relaxed">
              Read what leading publications are saying about our mission to bring Sri Lankan art 
              to the world stage.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#media-kit">
                <Button className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-8 py-6 text-base font-medium">
                  Download Media Kit
                  <Download className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="rounded-none px-8 py-6 text-base border-white/30 text-white hover:bg-white/10">
                  Press Inquiries
                </Button>
              </a>
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
                <span className="font-heading text-3xl lg:text-4xl font-medium text-white">{stat.value}</span>
                <p className="font-body text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Coverage */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Featured Coverage</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              In the Headlines
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPress.map((item, index) => (
              <a 
                key={index} 
                href={item.link}
                className="group block p-8 border border-[#E5E5DF] hover:shadow-xl hover:border-[#0F3057]/30 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[#0A1015] flex items-center justify-center">
                    <span className="font-heading text-sm font-bold text-white">{item.logo}</span>
                  </div>
                  <ExternalLink className="h-5 w-5 text-[#5C636A] group-hover:text-[#0F3057] transition-colors" />
                </div>
                <p className="font-body text-xs text-[#5C636A] uppercase tracking-wider">{item.publication}</p>
                <h3 className="font-heading text-xl font-medium text-[#0F3057] mt-2 group-hover:text-[#B64E33] transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-[#5C636A] mt-3 line-clamp-3">{item.excerpt}</p>
                <p className="font-body text-sm text-[#5C636A] mt-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {item.date}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="py-20 lg:py-28 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Quote className="h-12 w-12 text-[#E5A93C] mx-auto mb-6" />
          <blockquote className="font-heading text-2xl lg:text-3xl text-[#0F3057] leading-relaxed">
            "Ceylon Canvas is not just selling art—they're writing Sri Lanka into the global art 
            market narrative. What they've built is a bridge between ancient artistic traditions 
            and modern collectors."
          </blockquote>
          <div className="mt-8">
            <p className="font-heading text-lg text-[#0F3057]">Maria Chen</p>
            <p className="font-body text-sm text-[#5C636A]">Art Editor, Sotheby's Magazine</p>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Latest News</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
              Press Releases
            </h2>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div key={index} className="p-6 border border-[#E5E5DF] hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-body text-sm text-[#5C636A] flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {release.date}
                    </p>
                    <h3 className="font-heading text-xl font-medium text-[#0F3057] mt-2 group-hover:text-[#B64E33] transition-colors">
                      {release.title}
                    </h3>
                    <p className="font-body text-[#5C636A] mt-2">{release.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#5C636A] group-hover:text-[#0F3057] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 lg:py-28 bg-[#0F3057]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C]">Recognition</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white mt-4">
              Awards & Honors
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="text-center p-8 bg-white/5 border border-white/10">
                <Award className="h-12 w-12 text-[#E5A93C] mx-auto mb-4" />
                <p className="font-body text-sm text-[#E5A93C]">{award.year}</p>
                <h3 className="font-heading text-xl font-medium text-white mt-2">{award.award}</h3>
                <p className="font-body text-sm text-white/60 mt-2">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 lg:py-28" id="media-kit">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33]">Media Kit</span>
              <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-4">
                Resources for Journalists
              </h2>
              <p className="font-body text-[#5C636A] mt-4 leading-relaxed">
                Download our media kit for high-resolution logos, founder photos, platform screenshots, 
                and key facts about Ceylon Canvas.
              </p>
              <div className="mt-8 space-y-4">
                <a href="#" className="flex items-center gap-4 p-4 border border-[#E5E5DF] hover:bg-[#F5F5F0] transition-colors group">
                  <Download className="h-5 w-5 text-[#0F3057]" />
                  <div className="flex-1">
                    <p className="font-heading text-lg text-[#0F3057]">Complete Media Kit</p>
                    <p className="font-body text-sm text-[#5C636A]">ZIP • 15 MB</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#5C636A] group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="flex items-center gap-4 p-4 border border-[#E5E5DF] hover:bg-[#F5F5F0] transition-colors group">
                  <Camera className="h-5 w-5 text-[#0F3057]" />
                  <div className="flex-1">
                    <p className="font-heading text-lg text-[#0F3057]">High-Res Product Photos</p>
                    <p className="font-body text-sm text-[#5C636A]">ZIP • 25 MB</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#5C636A] group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="flex items-center gap-4 p-4 border border-[#E5E5DF] hover:bg-[#F5F5F0] transition-colors group">
                  <Newspaper className="h-5 w-5 text-[#0F3057]" />
                  <div className="flex-1">
                    <p className="font-heading text-lg text-[#0F3057]">Fact Sheet & Key Stats</p>
                    <p className="font-body text-sm text-[#5C636A]">PDF • 2 MB</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#5C636A] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-[#0A1015] flex items-center justify-center">
                <span className="font-heading text-2xl font-semibold text-white">Ceylon<br/>Canvas</span>
              </div>
              <div className="aspect-square bg-[#E5A93C] flex items-center justify-center">
                <span className="font-heading text-2xl font-semibold text-[#0A1015]">CC</span>
              </div>
              <div className="aspect-square bg-[#F5F5F0] flex items-center justify-center col-span-2">
                <p className="font-body text-sm text-[#5C636A] text-center px-4">
                  Platform screenshots and product imagery available in media kit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 lg:py-28 bg-[#0A1015]" id="contact">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Mail className="h-12 w-12 text-[#E5A93C] mx-auto mb-6" />
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white">
            Press Inquiries
          </h2>
          <p className="font-body text-white/70 mt-6 max-w-xl mx-auto">
            For media inquiries, interview requests, or additional information, please contact our communications team.
          </p>
          <div className="mt-10 p-8 bg-white/5 border border-white/10 inline-block">
            <p className="font-body text-sm text-white/60">Media Contact</p>
            <p className="font-heading text-xl text-white mt-2">press@ceyloncanvas.com</p>
            <p className="font-body text-white/60 mt-4">Response within 24 hours</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/about">
              <Button variant="outline" className="rounded-none px-8 py-6 text-base border-white/30 text-white hover:bg-white/10">
                About Ceylon Canvas
              </Button>
            </Link>
            <Link to="/gallery">
              <Button className="bg-[#E5A93C] hover:bg-[#E5A93C]/90 text-[#0A1015] rounded-none px-8 py-6 text-base font-medium">
                View Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PressPage;
