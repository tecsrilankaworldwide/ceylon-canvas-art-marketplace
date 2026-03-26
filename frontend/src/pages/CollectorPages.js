import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, BookOpen, ShoppingCart, DollarSign, Palette, Shield, Calendar, Search, Gavel, Globe, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { collectorGuides, quickReferenceCards } from '../data/collectorGuides';

// ============================================
// COLLECTOR KNOWLEDGE HUB
// ============================================
export const CollectorHubPage = () => {
  const icons = {
    'Social Skills': BookOpen, 'Buying Guide': ShoppingCart, 'Market Knowledge': DollarSign,
    'Getting Started': Palette, 'Preservation': Shield, 'Events': Calendar,
    'Discovery': Search
  };

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="collector-hub">
      <section className="bg-gradient-to-br from-[#0A1015] via-[#1A365D] to-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/beginner" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6">
            <ChevronLeft className="h-4 w-4" />
            Beginner Guides
          </Link>
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">
            Collectors Knowledge
          </span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">
            The Collector's <span className="text-[#E5A93C]">Handbook</span>
          </h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-2xl">
            Practical wisdom for navigating the art world with confidence — from gallery conversations 
            to building your first collection.
          </p>
          <div className="mt-10 flex gap-8">
            <div className="text-center">
              <p className="text-4xl font-heading text-[#E5A93C]">{collectorGuides.length}</p>
              <p className="text-white/70 text-sm">In-Depth Guides</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-heading text-white">{quickReferenceCards.length}</p>
              <p className="text-white/70 text-sm">Quick References</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-4">Collector Guides</h2>
          <p className="text-[#5C636A] max-w-2xl mb-12">Comprehensive guides covering every aspect of art collecting.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectorGuides.map(guide => {
              const Icon = icons[guide.category] || BookOpen;
              return (
                <Link key={guide.slug} to={`/education/collector/${guide.slug}`} className="bg-white p-6 border border-[#E5E5DF] hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="h-6 w-6 text-[#0F3057]" />
                    <span className="text-xs text-[#5C636A] uppercase tracking-wider">{guide.category}</span>
                  </div>
                  <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33]">{guide.name}</h3>
                  <p className="text-sm text-[#5C636A] mt-2">{guide.description}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-[#5C636A]">
                    <span className="px-2 py-1 bg-[#F5F5F0]">{guide.level}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{guide.readTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-4">Quick Reference Cards</h2>
          <p className="text-[#5C636A] max-w-2xl mb-12">Essential information at a glance — perfect for gallery visits.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {quickReferenceCards.map(card => (
              <Link key={card.slug} to={`/education/reference/${card.slug}`} className="p-6 border-2 border-[#0F3057] hover:bg-[#0F3057] hover:text-white transition-all group">
                <h3 className="font-heading text-2xl text-[#0F3057] group-hover:text-white">{card.name}</h3>
                <p className="text-[#5C636A] group-hover:text-white/70 mt-2">{card.description}</p>
                <p className="text-[#E5A93C] mt-4 font-medium">{card.type === 'timeline' ? 'Timeline' : card.type === 'glossary' ? 'Glossary' : 'Guide'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// COLLECTOR GUIDE - DETAIL
// ============================================
export const CollectorGuidePage = () => {
  const { slug } = useParams();
  const guide = collectorGuides.find(g => g.slug === slug) || collectorGuides[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`collector-${slug}`}>
      <section className="bg-[#0F3057] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/collector" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6">
            <ChevronLeft className="h-4 w-4" />
            Collectors Handbook
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-white/20 text-white text-sm">{guide.category}</span>
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm">{guide.level}</span>
            <span className="text-white/60 text-sm flex items-center gap-1"><Clock className="h-4 w-4" />{guide.readTime}</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{guide.name}</h1>
          <p className="text-white/70 mt-4 max-w-2xl">{guide.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {guide.sections.map((section, i) => (
              <div key={i} className="border-b border-[#E5E5DF] pb-10">
                <h2 className="font-heading text-2xl text-[#0F3057] mb-6">{section.title}</h2>
                {section.content && (
                  <p className="text-[#5C636A] leading-relaxed">{section.content}</p>
                )}
                {section.list && (
                  <ul className="space-y-3">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <span className="w-2 h-2 bg-[#E5A93C] mt-2 shrink-0"></span>
                        <span className="text-[#5C636A]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-[#0F3057]">
            <h3 className="font-heading text-xl text-white">Continue Your Education</h3>
            <p className="text-white/70 mt-2">Explore more guides to build your collector confidence.</p>
            <Link to="/education/collector">
              <Button className="mt-6 bg-[#E5A93C] text-[#0A1015] rounded-none">
                Back to Collectors Handbook
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// QUICK REFERENCE - MOVEMENTS CHEATSHEET
// ============================================
export const MovementsCheatsheetPage = () => {
  const card = quickReferenceCards.find(c => c.slug === 'movements-cheatsheet');
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="movements-cheatsheet">
      <section className="bg-[#0F3057] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/collector" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6">
            <ChevronLeft className="h-4 w-4" />
            Quick Reference
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{card.name}</h1>
          <p className="text-white/70 mt-4">{card.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#E5E5DF] hidden lg:block"></div>
            
            <div className="space-y-6">
              {card.movements.map((movement, i) => {
                const slug = movement.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-history';
                return (
                  <Link key={i} to={`/education/art-history/${slug}`} className="block relative lg:pl-20 group">
                    <div className="hidden lg:block absolute left-6 top-6 w-4 h-4 bg-[#0F3057] border-4 border-[#E5A93C]"></div>
                    <div className="bg-white p-6 border border-[#E5E5DF] hover:shadow-lg hover:border-[#E5A93C] transition-all cursor-pointer">
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33]">{movement.name}</h3>
                        <span className="text-[#E5A93C] font-medium">{movement.years}</span>
                        <span className="px-3 py-1 bg-[#0F3057] text-white text-sm">{movement.oneWord}</span>
                      </div>
                      <p className="text-[#5C636A]"><strong>Key Artist:</strong> {movement.keyArtist}</p>
                      <p className="text-[#5C636A] mt-2"><strong>Spot It:</strong> {movement.spotIt}</p>
                      <p className="text-[#E5A93C] text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Click to learn more →</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// QUICK REFERENCE - COLOR PSYCHOLOGY
// ============================================
export const ColorPsychologyPage = () => {
  const card = quickReferenceCards.find(c => c.slug === 'color-psychology');
  
  const colorHex = {
    Red: '#DC2626', Blue: '#2563EB', Yellow: '#EAB308', Green: '#16A34A',
    Purple: '#9333EA', Orange: '#EA580C', Black: '#1F2937', White: '#F9FAFB', Gold: '#D97706'
  };
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="color-psychology">
      <section className="bg-gradient-to-r from-[#DC2626] via-[#EAB308] via-[#16A34A] via-[#2563EB] to-[#9333EA] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/collector" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Quick Reference
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-white drop-shadow-lg">{card.name}</h1>
          <p className="text-white/90 mt-4 drop-shadow">{card.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {card.colors.map((color, i) => (
              <div key={i} className="border border-[#E5E5DF] overflow-hidden">
                <div className="h-20" style={{ backgroundColor: colorHex[color.color] || '#ccc' }}></div>
                <div className="p-6 bg-white">
                  <h3 className="font-heading text-xl text-[#0F3057]">{color.color}</h3>
                  <p className="text-xs text-[#5C636A] mt-1">{color.warmCool}</p>
                  <p className="text-[#5C636A] mt-3"><strong>Meanings:</strong> {color.meanings}</p>
                  <p className="text-[#5C636A] mt-2 text-sm"><strong>Examples:</strong> {color.examples}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-[#F5F5F0]">
            <p className="text-[#0F3057] font-medium">{card.tip}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// QUICK REFERENCE - FAMOUS TIMELINE
// ============================================
export const FamousTimelinePage = () => {
  const card = quickReferenceCards.find(c => c.slug === 'famous-timeline');
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="famous-timeline">
      <section className="bg-[#0F3057] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/collector" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6">
            <ChevronLeft className="h-4 w-4" />
            Quick Reference
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{card.name}</h1>
          <p className="text-white/70 mt-4">{card.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#E5A93C] hidden md:block"></div>
            
            <div className="space-y-4">
              {card.artists.map((artist, i) => (
                <div key={i} className="relative md:pl-12">
                  <div className="hidden md:block absolute left-2 top-4 w-5 h-5 bg-[#E5A93C] rounded-full"></div>
                  <div className="bg-white p-6 border border-[#E5E5DF]">
                    <div className="flex flex-wrap items-center gap-4">
                      <h3 className="font-heading text-lg text-[#0F3057]">{artist.name}</h3>
                      <span className="text-[#E5A93C] text-sm">{artist.life}</span>
                      <span className="px-2 py-0.5 bg-[#0F3057] text-white text-xs">{artist.movement}</span>
                    </div>
                    <p className="text-[#5C636A] mt-2 text-sm">Known for: {artist.famous}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// QUICK REFERENCE - TERMS POCKET GUIDE
// ============================================
export const TermsPocketGuidePage = () => {
  const card = quickReferenceCards.find(c => c.slug === 'terms-pocket-guide');
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="terms-pocket-guide">
      <section className="bg-[#0F3057] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/collector" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6">
            <ChevronLeft className="h-4 w-4" />
            Quick Reference
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{card.name}</h1>
          <p className="text-white/70 mt-4">{card.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-4">
            {card.terms.map((term, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white border border-[#E5E5DF]">
                <div className="shrink-0">
                  <h3 className="font-heading text-[#0F3057]">{term.term}</h3>
                </div>
                <p className="text-[#5C636A] text-sm">{term.simple}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-[#E5A93C]">
            <h3 className="font-heading text-xl text-[#0A1015]">Pro Tip</h3>
            <p className="text-[#0A1015]/80 mt-2">Save this page to your phone for quick reference during gallery visits!</p>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// QUICK REFERENCE - COMPOSITION RULES
// ============================================
export const CompositionRulesPage = () => {
  const card = quickReferenceCards.find(c => c.slug === 'composition-rules');
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="composition-rules">
      <section className="bg-[#2D5A43] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/collector" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Quick Reference
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{card.name}</h1>
          <p className="text-white/80 mt-4">{card.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-6">
            {card.rules.map((rule, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-[#2D5A43]">
                <h3 className="font-heading text-xl text-[#0F3057]">{rule.name}</h3>
                <p className="text-[#5C636A] mt-2">{rule.description}</p>
                <p className="text-[#2D5A43] mt-3 font-medium">Effect: {rule.effect}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// QUICK REFERENCE - BRUSH STROKES
// ============================================
export const BrushStrokesGuidePage = () => {
  const card = quickReferenceCards.find(c => c.slug === 'brush-strokes-guide');
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="brush-strokes-guide">
      <section className="bg-[#744210] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/collector" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Quick Reference
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{card.name}</h1>
          <p className="text-white/80 mt-4">{card.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-6">
            {card.strokes.map((stroke, i) => (
              <div key={i} className="p-6 bg-white border border-[#E5E5DF]">
                <h3 className="font-heading text-xl text-[#0F3057]">{stroke.type}</h3>
                <p className="text-[#5C636A] mt-2"><strong>Description:</strong> {stroke.description}</p>
                <p className="text-[#5C636A] mt-2"><strong>Meaning:</strong> {stroke.meaning}</p>
                <p className="text-[#744210] mt-2 font-medium">Examples: {stroke.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// QUICK REFERENCE - ROUTER (Generic)
// ============================================
export const QuickReferencePage = () => {
  const { slug } = useParams();
  
  // Route to specific pages based on slug
  if (slug === 'movements-cheatsheet') return <MovementsCheatsheetPage />;
  if (slug === 'color-psychology') return <ColorPsychologyPage />;
  if (slug === 'famous-timeline') return <FamousTimelinePage />;
  if (slug === 'terms-pocket-guide') return <TermsPocketGuidePage />;
  if (slug === 'composition-rules') return <CompositionRulesPage />;
  if (slug === 'brush-strokes-guide') return <BrushStrokesGuidePage />;
  
  // Default fallback
  return <MovementsCheatsheetPage />;
};
