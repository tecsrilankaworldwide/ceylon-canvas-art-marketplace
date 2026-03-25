import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home, Sofa, Bed, Briefcase, UtensilsCrossed, DoorOpen, Bath, ChefHat, Maximize2, LayoutGrid, Building, MoveVertical, Palette, Layers, Sparkles, ArrowLeft, ArrowRight, Clock, Lightbulb, CheckCircle2 } from 'lucide-react';
import { artForSpaceGuides, spaceCategories } from '../data/artForSpace';

// Category Icon Mapping
const categoryIcons = {
  'By Room': Home,
  'By Space': LayoutGrid,
  'By Style': Palette
};

const guideIcons = {
  'art-living-room': Sofa,
  'art-bedroom': Bed,
  'art-home-office': Briefcase,
  'art-dining-room': UtensilsCrossed,
  'art-entryway': DoorOpen,
  'art-bathroom': Bath,
  'art-kitchen': ChefHat,
  'art-small-spaces': Maximize2,
  'art-open-floor-plan': LayoutGrid,
  'art-rental-apartment': Building,
  'art-high-ceilings': MoveVertical,
  'art-modern-home': Layers,
  'art-traditional-home': Home,
  'art-eclectic-home': Sparkles
};

// Main Hub Page
export const ArtForSpaceHubPage = () => {
  const totalGuides = artForSpaceGuides.length;
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="art-for-space-hub">
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Education Hub
          </Link>
          <span className="inline-block px-4 py-1.5 bg-[#7C3A5A]/30 text-[#D4A5A5] font-body text-xs tracking-[0.2em] uppercase mb-6">Art for Your Space</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">The Art of <span className="text-[#D4A5A5]">Decorating</span></h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-3xl leading-relaxed">
            Practical guides for displaying art in every room, space type, and interior style. 
            Learn the rules the professionals use — and when to break them.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/10">
              <span className="text-2xl font-heading text-[#D4A5A5]">{totalGuides}</span>
              <span className="text-white/70 ml-2 text-sm">Detailed Guides</span>
            </div>
            <div className="px-4 py-2 bg-white/10">
              <span className="text-2xl font-heading text-[#D4A5A5]">3</span>
              <span className="text-white/70 ml-2 text-sm">Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {spaceCategories.map((cat) => {
        const Icon = categoryIcons[cat.name] || Home;
        const categoryGuides = artForSpaceGuides.filter(g => g.category === cat.name);
        return (
          <section key={cat.slug} className="py-16 lg:py-20 border-b border-[#E5E5DF]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#7C3A5A]">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">{cat.name}</h2>
                  <p className="text-[#5C636A]">{cat.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {categoryGuides.map((guide) => {
                  const GuideIcon = guideIcons[guide.slug] || Home;
                  return (
                    <Link 
                      key={guide.slug} 
                      to={`/art-for-space/${guide.slug}`}
                      className="bg-white border border-[#E5E5DF] hover:shadow-xl hover:border-[#7C3A5A]/30 transition-all group"
                      data-testid={`space-card-${guide.slug}`}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <GuideIcon className="h-8 w-8 text-[#7C3A5A]" />
                          <span className="flex items-center gap-1 text-sm text-[#5C636A]">
                            <Clock className="h-4 w-4" />
                            {guide.readTime}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#7C3A5A] mb-3">{guide.title}</h3>
                        <p className="text-[#5C636A] text-sm line-clamp-2">{guide.description}</p>
                      </div>
                      <div className="px-6 py-4 bg-[#F5F5F0] border-t border-[#E5E5DF]">
                        <p className="text-xs text-[#7C3A5A] font-medium">{guide.sections.length} sections • {guide.tips.length} pro tips</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 bg-[#7C3A5A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Ready to Transform Your Space?</h2>
          <p className="text-white/70 mb-8">Find the perfect piece for your home in our curated collection.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 bg-white text-[#7C3A5A] px-8 py-3 font-medium hover:bg-white/90 transition-colors"
          >
            Browse the Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

// Individual Guide Page
export const ArtForSpacePage = () => {
  const { slug } = useParams();
  const guide = artForSpaceGuides.find(g => g.slug === slug);
  
  if (!guide) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-[#0F3057] mb-4">Guide Not Found</h1>
          <Link to="/art-for-space" className="text-[#7C3A5A] hover:underline">Return to Art for Your Space</Link>
        </div>
      </main>
    );
  }

  const guideIndex = artForSpaceGuides.findIndex(g => g.slug === slug);
  const prevGuide = guideIndex > 0 ? artForSpaceGuides[guideIndex - 1] : null;
  const nextGuide = guideIndex < artForSpaceGuides.length - 1 ? artForSpaceGuides[guideIndex + 1] : null;
  const GuideIcon = guideIcons[guide.slug] || Home;

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`space-page-${slug}`}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#7C3A5A] via-[#5A2D42] to-[#0A1015] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Link to="/art-for-space" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Art for Your Space
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm">{guide.category}</span>
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" /> {guide.readTime}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <GuideIcon className="h-12 w-12 text-[#D4A5A5]" />
            <h1 className="font-heading text-3xl lg:text-5xl font-medium text-white">{guide.title}</h1>
          </div>
          <p className="text-xl text-white/70 leading-relaxed">{guide.description}</p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {guide.sections.map((section, i) => (
              <div key={i} className="border-b border-[#E5E5DF] pb-12 last:border-0">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 bg-[#7C3A5A] text-white flex items-center justify-center font-bold flex-shrink-0">
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

      {/* Pro Tips */}
      <section className="py-16 lg:py-20 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="h-6 w-6 text-[#E5A93C]" />
            <h2 className="font-heading text-2xl text-[#0F3057]">Pro Tips</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {guide.tips.map((tip, i) => (
              <div key={i} className="bg-white p-6 border border-[#E5E5DF]">
                <CheckCircle2 className="h-5 w-5 text-[#2D5A43] mb-3" />
                <p className="text-[#3D3D3D] text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-white border-t border-[#E5E5DF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {prevGuide ? (
              <Link to={`/art-for-space/${prevGuide.slug}`} className="flex items-center gap-3 text-[#0F3057] hover:text-[#7C3A5A] transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <div>
                  <p className="text-sm text-[#5C636A]">Previous Guide</p>
                  <p className="font-medium">{prevGuide.title}</p>
                </div>
              </Link>
            ) : <div />}
            {nextGuide ? (
              <Link to={`/art-for-space/${nextGuide.slug}`} className="flex items-center gap-3 text-[#0F3057] hover:text-[#7C3A5A] transition-colors text-right">
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

      {/* More Guides */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl text-[#0F3057] mb-8">More {guide.category} Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {artForSpaceGuides
              .filter(g => g.category === guide.category && g.slug !== guide.slug)
              .slice(0, 3)
              .map((g) => {
                const GIcon = guideIcons[g.slug] || Home;
                return (
                  <Link 
                    key={g.slug} 
                    to={`/art-for-space/${g.slug}`}
                    className="bg-white border border-[#E5E5DF] p-6 hover:shadow-lg transition-shadow"
                  >
                    <GIcon className="h-6 w-6 text-[#7C3A5A] mb-3" />
                    <h3 className="font-heading text-lg text-[#0F3057] hover:text-[#7C3A5A]">{g.title}</h3>
                    <p className="text-sm text-[#5C636A] mt-2">{g.readTime}</p>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#7C3A5A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Find Your Perfect Piece</h2>
          <p className="text-white/70 mb-8">Browse our gallery for art that transforms any space.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 bg-white text-[#7C3A5A] px-8 py-3 font-medium hover:bg-white/90 transition-colors"
          >
            Explore the Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};
