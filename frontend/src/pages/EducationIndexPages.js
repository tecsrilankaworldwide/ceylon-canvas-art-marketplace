import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Clock, Award, GraduationCap, Building2, Palette, Lightbulb, BookMarked, Grid3X3, Library, FileText, Eye, Heart } from 'lucide-react';
import { artFundamentals, masterpieceAnalysis, artHistoryComprehensive, artTheoryDeep, artistsDeepStudy, museumStudies, artAppreciationCourses, artVocabulary, compositionStudies, famousCollections, artManifestos } from '../data/educationData';
import { simpleArtGuides, artistIntentions, fiveQuestions, emotionsInArt, commonSymbols, artHistorySimple, famousPaintingsSimple } from '../data/beginnerGuides';
import { masterpieceImages, artistImages, artImages } from '../data/artImages';

// Main Education Hub
export const EducationHubPage = () => {
  const beginnerTotal = simpleArtGuides.length + artistIntentions.length + fiveQuestions.length + emotionsInArt.length + commonSymbols.length + artHistorySimple.length + famousPaintingsSimple.length;
  
  const sections = [
    { name: 'Art Fundamentals', count: artFundamentals.length, path: '/education/fundamentals', icon: BookOpen, desc: 'Master the elements and principles' },
    { name: 'Masterpiece Analysis', count: masterpieceAnalysis.length, path: '/education/masterpieces', icon: Image, desc: 'Decode the world\'s greatest works' },
    { name: 'Art History', count: artHistoryComprehensive.length, path: '/education/art-history', icon: Clock, desc: 'Journey through artistic eras' },
    { name: 'Art Theory', count: artTheoryDeep.length, path: '/education/theory', icon: Lightbulb, desc: 'Philosophy and critical thinking' },
    { name: 'Artist Studies', count: artistsDeepStudy.length, path: '/education/artists', icon: Palette, desc: 'Learn from the masters' },
    { name: 'Museum Guides', count: museumStudies.length, path: '/education/museums', icon: Building2, desc: 'Navigate world collections' },
    { name: 'Courses', count: artAppreciationCourses.length, path: '/education/courses', icon: GraduationCap, desc: 'Structured learning paths' },
    { name: 'Art Vocabulary', count: artVocabulary.length, path: '/education/vocabulary', icon: BookMarked, desc: '50 essential art terms' },
    { name: 'Composition Studies', count: compositionStudies.length, path: '/education/composition', icon: Grid3X3, desc: 'Master visual arrangement' },
    { name: 'Famous Collections', count: famousCollections.length, path: '/education/famous-collections', icon: Library, desc: 'World\'s greatest collections' },
    { name: 'Art Manifestos', count: artManifestos.length, path: '/education/manifestos', icon: FileText, desc: 'Revolutionary art writings' },
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="education-hub">
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">Art Education</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">Understand Art <span className="text-[#E5A93C]">Deeply</span></h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-3xl leading-relaxed">
            Art is not merely instinct or natural talent—it's a profound discipline built upon centuries of accumulated knowledge. 
            From color theory to composition, from symbolism to art history, there's a vast subject underneath every masterpiece.
          </p>
          <div className="mt-10 p-6 bg-white/5 border border-white/10 max-w-2xl">
            <p className="text-white/80 italic">"The more you know about art, the more you see. Education transforms passive viewing into active understanding."</p>
          </div>
        </div>
      </section>

      {/* NEW: Beginner Guides Featured Section */}
      <section className="py-16 bg-gradient-to-br from-[#0F3057] via-[#1A365D] to-[#0F3057]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[#E5A93C] text-[#0A1015] text-xs font-bold tracking-wider uppercase mb-4">
                New for Art Lovers
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl text-white mb-4">
                Art Appreciation Made Simple
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                You don't need an art degree to understand paintings. Our new beginner guides give you 
                practical tools to "read" any artwork — no jargon, no pretension, just real insights 
                anyone can use.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm">
                  <span className="text-2xl font-heading text-[#E5A93C]">{beginnerTotal}</span>
                  <span className="text-white/70 ml-2 text-sm">Simple Guides</span>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm">
                  <span className="text-white/70 text-sm">5 min reads</span>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm">
                  <span className="text-white/70 text-sm">Zero jargon</span>
                </div>
              </div>
              <Link 
                to="/education/beginner" 
                className="inline-flex items-center gap-2 bg-[#E5A93C] text-[#0A1015] px-6 py-3 font-medium hover:bg-[#E5A93C]/90 transition-colors"
              >
                <Eye className="h-5 w-5" />
                Start Reading Art Today
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/education/beginner/read-art" className="p-6 bg-white/10 hover:bg-white/20 transition-colors">
                <Eye className="h-8 w-8 text-[#E5A93C] mb-3" />
                <h3 className="text-white font-heading text-lg">How to Read Paintings</h3>
                <p className="text-white/60 text-sm mt-1">{simpleArtGuides.length} guides</p>
              </Link>
              <Link to="/education/beginner/emotions" className="p-6 bg-white/10 hover:bg-white/20 transition-colors">
                <Heart className="h-8 w-8 text-[#E5A93C] mb-3" />
                <h3 className="text-white font-heading text-lg">Emotions in Art</h3>
                <p className="text-white/60 text-sm mt-1">{emotionsInArt.length} guides</p>
              </Link>
              <Link to="/education/beginner/symbols" className="p-6 bg-white/10 hover:bg-white/20 transition-colors">
                <Lightbulb className="h-8 w-8 text-[#E5A93C] mb-3" />
                <h3 className="text-white font-heading text-lg">Common Symbols</h3>
                <p className="text-white/60 text-sm mt-1">{commonSymbols.length} guides</p>
              </Link>
              <Link to="/education/beginner/famous-simple" className="p-6 bg-white/10 hover:bg-white/20 transition-colors">
                <Image className="h-8 w-8 text-[#E5A93C] mb-3" />
                <h3 className="text-white font-heading text-lg">Famous Paintings</h3>
                <p className="text-white/60 text-sm mt-1">{famousPaintingsSimple.length} guides</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-4">In-Depth Education</h2>
          <p className="text-[#5C636A] max-w-3xl mb-12">For those who want to go deeper: comprehensive courses on art history, theory, technique, and more.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, i) => (
              <Link key={i} to={section.path} className="bg-white p-8 border border-[#E5E5DF] hover:shadow-xl hover:border-[#0F3057]/30 transition-all group">
                <div className="w-14 h-14 bg-[#0F3057] flex items-center justify-center mb-6">
                  <section.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33]">{section.name}</h3>
                <p className="text-[#5C636A] mt-2">{section.desc}</p>
                <p className="text-[#E5A93C] font-medium mt-4">{section.count} lessons</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-12">Start Your Journey</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-8 bg-[#0F3057] text-white">
              <span className="text-[#E5A93C] text-sm uppercase tracking-wider">Beginner</span>
              <h3 className="font-heading text-2xl mt-4">New to Art?</h3>
              <p className="text-white/70 mt-4">Start with our simple guides. Learn to read paintings, understand symbols, and appreciate art without the jargon.</p>
              <Link to="/education/beginner" className="inline-block mt-6 text-[#E5A93C] hover:underline">Begin here →</Link>
            </div>
            <div className="p-8 border border-[#E5E5DF]">
              <span className="text-[#B64E33] text-sm uppercase tracking-wider">Intermediate</span>
              <h3 className="font-heading text-2xl text-[#0F3057] mt-4">Ready to Go Deeper?</h3>
              <p className="text-[#5C636A] mt-4">Explore masterpiece analysis, art theory, and the stories behind famous artists and their techniques.</p>
              <Link to="/education/masterpieces" className="inline-block mt-6 text-[#0F3057] hover:underline">Explore masterpieces →</Link>
            </div>
            <div className="p-8 border border-[#E5E5DF]">
              <span className="text-[#2D5A43] text-sm uppercase tracking-wider">Advanced</span>
              <h3 className="font-heading text-2xl text-[#0F3057] mt-4">Serious Student?</h3>
              <p className="text-[#5C636A] mt-4">Dive into art theory, critical frameworks, and the philosophical questions that have shaped art discourse.</p>
              <Link to="/education/theory" className="inline-block mt-6 text-[#0F3057] hover:underline">Study theory →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Fundamentals Index
export const FundamentalsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="fundamentals-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Art Fundamentals</h1><p className="text-white/70 mt-2">{artFundamentals.length} essential concepts every art lover should know</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{artFundamentals.map(f => (<Link key={f.slug} to={`/education/fundamentals/${f.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg hover:border-[#0F3057]/30 transition-all"><span className="text-xs text-[#E5A93C] uppercase tracking-wider">{f.level}</span><h2 className="font-heading text-xl text-[#0F3057] mt-2">{f.name}</h2><p className="text-sm text-[#5C636A] mt-2 line-clamp-2">{f.description}</p></Link>))}</div></section>
  </main>
);

// Masterpieces Index
export const MasterpiecesIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="masterpieces-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Masterpiece Analysis</h1><p className="text-white/70 mt-2">Decode {masterpieceAnalysis.length} of history's greatest artworks</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">{masterpieceAnalysis.map(m => (<Link key={m.slug} to={`/education/masterpieces/${m.slug}`} className="group"><div className="aspect-[4/3] bg-[#F5F5F0] overflow-hidden mb-4"><img src={masterpieceImages[m.slug] || masterpieceImages['default']} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><h2 className="font-heading text-lg text-[#0F3057] group-hover:text-[#B64E33]">{m.name}</h2><p className="text-sm text-[#5C636A]">{m.artist} • {m.year}</p></Link>))}</div></section>
  </main>
);

// Art History Index
export const ArtHistoryIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="art-history-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Art History</h1><p className="text-white/70 mt-2">Journey through {artHistoryComprehensive.length} artistic eras</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6"><div className="space-y-6">{artHistoryComprehensive.map((p, i) => (<Link key={p.slug} to={`/education/art-history/${p.slug}`} className="flex items-center gap-6 p-6 border border-[#E5E5DF] hover:shadow-lg transition-all"><span className="text-4xl font-heading text-[#E5E5DF] w-16">{String(i+1).padStart(2, '0')}</span><div><h2 className="font-heading text-xl text-[#0F3057]">{p.name}</h2><p className="text-sm text-[#5C636A]">{p.era}</p></div></Link>))}</div></div></section>
  </main>
);

// Theory Index
export const TheoryIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="theory-index">
    <section className="bg-[#0F3057] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Art Theory</h1><p className="text-white/70 mt-2">{artTheoryDeep.length} theoretical frameworks for understanding art</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">{artTheoryDeep.map(t => (<Link key={t.slug} to={`/education/theory/${t.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><span className="text-xs text-[#B64E33] uppercase tracking-wider">{t.category}</span><h2 className="font-heading text-xl text-[#0F3057] mt-2">{t.name}</h2><p className="text-sm text-[#5C636A] mt-2">{t.description}</p></Link>))}</div></section>
  </main>
);

// Artists Index
export const ArtistsStudyIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="artists-study-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Artist Deep Studies</h1><p className="text-white/70 mt-2">Learn from {artistsDeepStudy.length} master artists</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">{artistsDeepStudy.map(a => (<Link key={a.slug} to={`/education/artists/${a.slug}`} className="group text-center"><div className="aspect-square bg-[#F5F5F0] overflow-hidden mb-4 group-hover:bg-[#0F3057]/10 transition-colors"><img src={artistImages[a.slug] || artistImages['default']} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><h2 className="font-heading text-lg text-[#0F3057] group-hover:text-[#B64E33]">{a.name}</h2><p className="text-xs text-[#5C636A]">{a.era}</p></Link>))}</div></section>
  </main>
);

// Museums Index
export const MuseumsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="museums-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Museum Guides</h1><p className="text-white/70 mt-2">Navigate {museumStudies.length} world-class collections</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">{museumStudies.map(m => (<Link key={m.slug} to={`/education/museums/${m.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><div className="flex items-center gap-3 mb-4"><Building2 className="h-6 w-6 text-[#0F3057]" /><span className="text-sm text-[#5C636A]">{m.city}</span></div><h2 className="font-heading text-xl text-[#0F3057]">{m.name}</h2><p className="text-sm text-[#5C636A] mt-2">{m.highlights}</p></Link>))}</div></section>
  </main>
);

// Courses Index
export const CoursesIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="courses-index">
    <section className="bg-[#0F3057] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Art Appreciation Courses</h1><p className="text-white/70 mt-2">{artAppreciationCourses.length} structured learning paths</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{artAppreciationCourses.map(c => (<Link key={c.slug} to={`/education/courses/${c.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><div className="flex gap-2 mb-4"><span className="px-2 py-1 bg-[#0F3057]/10 text-[#0F3057] text-xs">{c.level}</span><span className="px-2 py-1 bg-[#E5E5DF] text-[#5C636A] text-xs">{c.duration}</span></div><h2 className="font-heading text-xl text-[#0F3057]">{c.name}</h2></Link>))}</div></section>
  </main>
);
