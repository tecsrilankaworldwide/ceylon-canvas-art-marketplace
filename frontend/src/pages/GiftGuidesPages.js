import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Gift, DollarSign, Calendar, User, Heart, Home, Briefcase, PartyPopper, Cake, Minimize2, Maximize2, Plane, ArrowLeft, ArrowRight, Clock, Lightbulb, CheckCircle2, AlertTriangle, Tag } from 'lucide-react';
import { giftGuides, giftCategories } from '../data/giftGuides';

// Category Icon Mapping
const categoryIcons = {
  'By Budget': DollarSign,
  'By Occasion': Calendar,
  'By Recipient': User
};

const guideIcons = {
  'gifts-under-500': DollarSign,
  'gifts-under-2000': DollarSign,
  'gifts-under-100': Tag,
  'wedding-art-gifts': Heart,
  'housewarming-art-gifts': Home,
  'retirement-art-gifts': Briefcase,
  'corporate-art-gifts': Briefcase,
  'milestone-birthday-art': Cake,
  'art-for-minimalist': Minimize2,
  'art-for-maximalist': Maximize2,
  'art-for-traveler': Plane
};

// Main Hub Page
export const GiftGuidesHubPage = () => {
  const totalGuides = giftGuides.length;
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="gift-guides-hub">
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Education Hub
          </Link>
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/30 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">Art Gift Guides</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">The Gift of <span className="text-[#E5A93C]">Art</span></h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-3xl leading-relaxed">
            Art is a gift that grows in meaning over time. Whether you're shopping by budget, occasion, 
            or recipient personality, these guides help you find the perfect piece.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/10">
              <span className="text-2xl font-heading text-[#E5A93C]">{totalGuides}</span>
              <span className="text-white/70 ml-2 text-sm">Gift Guides</span>
            </div>
            <div className="px-4 py-2 bg-white/10">
              <span className="text-white/70 text-sm">Every budget & occasion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured: Budget Guides */}
      <section className="py-16 lg:py-20 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#2D5A43]">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">Shop by Budget</h2>
              <p className="text-[#5C636A]">Find the perfect gift at every price point</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {giftGuides.filter(g => g.category === 'By Budget').map((guide) => (
              <Link 
                key={guide.slug} 
                to={`/gift-guides/${guide.slug}`}
                className="bg-white border-2 border-[#E5E5DF] hover:border-[#2D5A43] transition-all p-8 text-center group"
                data-testid={`gift-card-${guide.slug}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2D5A43] text-white mb-6">
                  <DollarSign className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#2D5A43] mb-2">{guide.title}</h3>
                <p className="text-2xl font-heading text-[#E5A93C] mb-4">{guide.budget}</p>
                <p className="text-[#5C636A] text-sm">{guide.forWhom}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Occasion Guides */}
      <section className="py-16 lg:py-20 border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#B64E33]">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">Shop by Occasion</h2>
              <p className="text-[#5C636A]">Perfect gifts for life's special moments</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftGuides.filter(g => g.category === 'By Occasion').map((guide) => {
              const GuideIcon = guideIcons[guide.slug] || Gift;
              return (
                <Link 
                  key={guide.slug} 
                  to={`/gift-guides/${guide.slug}`}
                  className="bg-white border border-[#E5E5DF] hover:shadow-xl hover:border-[#B64E33]/30 transition-all group"
                  data-testid={`gift-card-${guide.slug}`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <GuideIcon className="h-8 w-8 text-[#B64E33]" />
                      <span className="flex items-center gap-1 text-sm text-[#5C636A]">
                        <Clock className="h-4 w-4" />
                        {guide.readTime}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33] mb-3">{guide.title}</h3>
                    <p className="text-[#5C636A] text-sm line-clamp-2">{guide.description}</p>
                  </div>
                  <div className="px-6 py-4 bg-[#F5F5F0] border-t border-[#E5E5DF]">
                    <p className="text-xs text-[#B64E33] font-medium">{guide.giftIdeas?.length || guide.sections?.length} curated ideas</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recipient Guides */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#0F3057]">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">Shop by Recipient</h2>
              <p className="text-[#5C636A]">Gifts matched to personality types</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {giftGuides.filter(g => g.category === 'By Recipient').map((guide) => {
              const GuideIcon = guideIcons[guide.slug] || User;
              return (
                <Link 
                  key={guide.slug} 
                  to={`/gift-guides/${guide.slug}`}
                  className="bg-[#0F3057] text-white p-8 hover:bg-[#1A4A7A] transition-colors group"
                  data-testid={`gift-card-${guide.slug}`}
                >
                  <GuideIcon className="h-10 w-10 text-[#E5A93C] mb-4" />
                  <h3 className="font-heading text-xl mb-2">{guide.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{guide.recipient}</p>
                  <p className="text-white/80 text-sm line-clamp-2">{guide.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#E5A93C]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Gift className="h-12 w-12 text-[#0A1015] mx-auto mb-6" />
          <h2 className="font-heading text-3xl text-[#0A1015] mb-4">Give the Gift of Art Today</h2>
          <p className="text-[#0A1015]/70 mb-8">Browse our curated collection of Sri Lankan masterpieces.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 bg-[#0A1015] text-white px-8 py-3 font-medium hover:bg-[#0A1015]/90 transition-colors"
          >
            Shop the Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

// Individual Gift Guide Page
export const GiftGuidePage = () => {
  const { slug } = useParams();
  const guide = giftGuides.find(g => g.slug === slug);
  
  if (!guide) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-[#0F3057] mb-4">Guide Not Found</h1>
          <Link to="/gift-guides" className="text-[#E5A93C] hover:underline">Return to Gift Guides</Link>
        </div>
      </main>
    );
  }

  const guideIndex = giftGuides.findIndex(g => g.slug === slug);
  const prevGuide = guideIndex > 0 ? giftGuides[guideIndex - 1] : null;
  const nextGuide = guideIndex < giftGuides.length - 1 ? giftGuides[guideIndex + 1] : null;
  const GuideIcon = guideIcons[guide.slug] || Gift;

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`gift-page-${slug}`}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1015] via-[#1A2030] to-[#0A1015] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Link to="/gift-guides" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Gift Guides
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-[#E5A93C] text-[#0A1015] text-sm font-medium">{guide.category}</span>
            {guide.budget && (
              <span className="px-3 py-1 bg-white/10 text-white/80 text-sm">{guide.budget}</span>
            )}
            {guide.occasion && (
              <span className="px-3 py-1 bg-white/10 text-white/80 text-sm">{guide.occasion}</span>
            )}
            {guide.recipient && (
              <span className="px-3 py-1 bg-white/10 text-white/80 text-sm">{guide.recipient}</span>
            )}
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" /> {guide.readTime}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <GuideIcon className="h-12 w-12 text-[#E5A93C]" />
            <h1 className="font-heading text-3xl lg:text-5xl font-medium text-white">{guide.title}</h1>
          </div>
          <p className="text-xl text-white/70 leading-relaxed">{guide.description}</p>
          {guide.forWhom && (
            <p className="mt-6 text-[#E5A93C]">Perfect for: {guide.forWhom}</p>
          )}
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {guide.sections.map((section, i) => (
              <div key={i} className="border-b border-[#E5E5DF] pb-12 last:border-0">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 bg-[#E5A93C] text-[#0A1015] flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="font-heading text-xl lg:text-2xl text-[#0F3057] mb-4">{section.heading}</h2>
                    <p className="text-[#3D3D3D] leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Ideas */}
      {guide.giftIdeas && (
        <section className="py-16 lg:py-20 bg-[#F5F5F0]">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-8">
              <Gift className="h-6 w-6 text-[#E5A93C]" />
              <h2 className="font-heading text-2xl text-[#0F3057]">Top Gift Ideas</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {guide.giftIdeas.map((idea, i) => (
                <div key={i} className="bg-white p-6 border border-[#E5E5DF] flex items-start gap-4">
                  <CheckCircle2 className="h-5 w-5 text-[#2D5A43] mt-0.5 flex-shrink-0" />
                  <p className="text-[#3D3D3D]">{idea}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Etiquette Tips */}
      {guide.etiquette && (
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="h-6 w-6 text-[#0F3057]" />
              <h2 className="font-heading text-2xl text-[#0F3057]">Gift Etiquette</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {guide.etiquette.map((tip, i) => (
                <div key={i} className="bg-[#0F3057] p-6 text-white">
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Warnings */}
      {guide.warnings && (
        <section className="py-16 lg:py-20 bg-[#FEF3E7]">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="h-6 w-6 text-[#B64E33]" />
              <h2 className="font-heading text-2xl text-[#0F3057]">Things to Consider</h2>
            </div>
            <div className="space-y-4">
              {guide.warnings.map((warning, i) => (
                <div key={i} className="bg-white p-4 border-l-4 border-[#B64E33]">
                  <p className="text-[#3D3D3D]">{warning}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-12 bg-white border-t border-[#E5E5DF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {prevGuide ? (
              <Link to={`/gift-guides/${prevGuide.slug}`} className="flex items-center gap-3 text-[#0F3057] hover:text-[#E5A93C] transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <div>
                  <p className="text-sm text-[#5C636A]">Previous Guide</p>
                  <p className="font-medium">{prevGuide.title}</p>
                </div>
              </Link>
            ) : <div />}
            {nextGuide ? (
              <Link to={`/gift-guides/${nextGuide.slug}`} className="flex items-center gap-3 text-[#0F3057] hover:text-[#E5A93C] transition-colors text-right">
                <div>
                  <p className="text-sm text-[#5C636A]">Next Guide</p>
                  <p className="font-medium">{nextGuide.title}</p>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#E5A93C]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Gift className="h-12 w-12 text-[#0A1015] mx-auto mb-6" />
          <h2 className="font-heading text-3xl text-[#0A1015] mb-4">Ready to Find the Perfect Gift?</h2>
          <p className="text-[#0A1015]/70 mb-8">Browse our collection of Sri Lankan art treasures.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 bg-[#0A1015] text-white px-8 py-3 font-medium hover:bg-[#0A1015]/90 transition-colors"
          >
            Shop the Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};
