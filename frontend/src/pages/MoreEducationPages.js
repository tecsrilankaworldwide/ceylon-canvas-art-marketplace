import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { artVocabulary, compositionStudies, famousCollections, artManifestos } from '../data/educationData';

// Art Vocabulary Page
export const VocabularyPage = () => {
  const { slug } = useParams();
  const term = artVocabulary.find(v => v.slug === slug) || artVocabulary[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`vocabulary-${slug}`}>
      <section className="bg-[#0F3057] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/education/vocabulary" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6"><ChevronLeft className="h-4 w-4" />Art Vocabulary</Link>
          <span className="block text-[#E5A93C] text-sm uppercase tracking-wider mb-4">Origin: {term.origin}</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">{term.term}</h1>
          <p className="font-body text-xl text-white/80 mt-6 italic">"{term.definition}"</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg">
          <h2 className="font-heading text-2xl text-[#0F3057]">Understanding {term.term}</h2>
          <p className="text-[#5C636A]">This term is essential for any serious student of art. Understanding {term.term.toLowerCase()} helps you see what masters like Rembrandt, Vermeer, and Caravaggio were actually doing—and why their work still captivates us centuries later.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10">How Artists Use This</h2>
          <p className="text-[#5C636A]">When you recognize {term.term.toLowerCase()} in a painting, you're seeing deliberate choices made by trained artists. This wasn't accidental or instinctive—it was the application of deep knowledge.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10">Examples in Famous Works</h2>
          <p className="text-[#5C636A]">Look for {term.term.toLowerCase()} in works throughout art history, from Renaissance masterpieces to contemporary art. Once you know what to look for, you'll see it everywhere.</p>
        </div>
      </section>
    </main>
  );
};

// Composition Study Page
export const CompositionStudyPage = () => {
  const { slug } = useParams();
  const study = compositionStudies.find(c => c.slug === slug) || compositionStudies[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`composition-${slug}`}>
      <section className="bg-[#0A1015] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/education/composition" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6"><ChevronLeft className="h-4 w-4" />Composition Studies</Link>
          <span className="block text-[#E5A93C] text-sm uppercase tracking-wider mb-4">{study.type}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{study.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6">Examples: {study.examples.join(', ')}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg">
          <h2 className="font-heading text-2xl text-[#0F3057]">What Is {study.name}?</h2>
          <p className="text-[#5C636A]">Composition is the invisible architecture of great art. {study.name} is one of the fundamental tools artists use to organize visual elements and guide the viewer's experience.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10">Why It Works</h2>
          <p className="text-[#5C636A]">This isn't arbitrary—it's based on how human perception works. Artists like {study.examples[0]} understood this deeply and used it to create images that feel "right" even to viewers who can't articulate why.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10">Analyzing Master Examples</h2>
          <p className="text-[#5C636A]">Study works by {study.examples.join(' and ')} to see this principle in action. Notice how they solve the same compositional problems in different ways while achieving similar visual harmony.</p>
        </div>
      </section>
    </main>
  );
};

// Famous Collection Page
export const CollectionStudyPage = () => {
  const { slug } = useParams();
  const collection = famousCollections.find(c => c.slug === slug) || famousCollections[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`collection-study-${slug}`}>
      <section className="bg-[#0A1015] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/education/famous-collections" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6"><ChevronLeft className="h-4 w-4" />Famous Collections</Link>
          <span className="block text-[#E5A93C] text-sm uppercase tracking-wider mb-4">{collection.location} • {collection.period}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{collection.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6">Highlights: {collection.highlights}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg">
          <h2 className="font-heading text-2xl text-[#0F3057]">About This Collection</h2>
          <p className="text-[#5C636A]">{collection.name} in {collection.location} represents one of the world's most important gatherings of {collection.period} art. Understanding how this collection was assembled reveals as much about art history as the works themselves.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10">Must-See Works</h2>
          <p className="text-[#5C636A]">The collection is particularly renowned for works by {collection.highlights}. These pieces represent the pinnacle of artistic achievement and reward careful, extended viewing.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10">Visiting Tips</h2>
          <p className="text-[#5C636A]">Don't try to see everything in one visit. Focus on a few works, spend time with them, and return to see others. Great art reveals itself slowly to patient viewers.</p>
        </div>
      </section>
    </main>
  );
};

// Art Manifesto Page
export const ManifestoPage = () => {
  const { slug } = useParams();
  const manifesto = artManifestos.find(m => m.slug === slug) || artManifestos[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`manifesto-${slug}`}>
      <section className="bg-[#0F3057] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/education/manifestos" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6"><ChevronLeft className="h-4 w-4" />Art Manifestos</Link>
          <span className="block text-[#E5A93C] text-sm uppercase tracking-wider mb-4">{manifesto.year} • {manifesto.movement}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{manifesto.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6">By {manifesto.author}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg">
          <h2 className="font-heading text-2xl text-[#0F3057]">Historical Context</h2>
          <p className="text-[#5C636A]">In {manifesto.year}, {manifesto.author} published this manifesto that would define the {manifesto.movement} movement. It wasn't just a statement of aesthetic preferences—it was a revolutionary declaration about the nature and purpose of art.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10">Key Ideas</h2>
          <p className="text-[#5C636A]">The {manifesto.name} challenged existing artistic conventions and proposed radical new approaches that would influence generations of artists. Understanding these ideas helps us appreciate both the art they inspired and their continuing relevance.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10">Legacy</h2>
          <p className="text-[#5C636A]">The influence of {manifesto.movement} extends far beyond the visual arts, affecting literature, music, architecture, and design. These ideas continue to shape contemporary art and culture.</p>
        </div>
      </section>
    </main>
  );
};

// Index Pages for new categories
export const VocabularyIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="vocabulary-index">
    <section className="bg-[#0F3057] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Art Vocabulary</h1><p className="text-white/70 mt-2">Master {artVocabulary.length} essential art terms</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">{artVocabulary.map(v => (<Link key={v.slug} to={`/education/vocabulary/${v.slug}`} className="p-4 border border-[#E5E5DF] hover:shadow-lg hover:border-[#0F3057]/30 transition-all"><h2 className="font-heading text-lg text-[#0F3057]">{v.term}</h2><p className="text-sm text-[#5C636A] mt-1 line-clamp-2">{v.definition}</p><span className="text-xs text-[#E5A93C] mt-2 block">Origin: {v.origin}</span></Link>))}</div></section>
  </main>
);

export const CompositionIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="composition-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Composition Studies</h1><p className="text-white/70 mt-2">Master {compositionStudies.length} composition techniques</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{compositionStudies.map(c => (<Link key={c.slug} to={`/education/composition/${c.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><span className="text-xs text-[#B64E33] uppercase tracking-wider">{c.type}</span><h2 className="font-heading text-xl text-[#0F3057] mt-2">{c.name}</h2><p className="text-sm text-[#5C636A] mt-2">Examples: {c.examples.join(', ')}</p></Link>))}</div></section>
  </main>
);

export const FamousCollectionsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="famous-collections-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Famous Art Collections</h1><p className="text-white/70 mt-2">Explore {famousCollections.length} world-renowned collections</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">{famousCollections.map(c => (<Link key={c.slug} to={`/education/famous-collections/${c.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><div className="flex justify-between items-start"><div><h2 className="font-heading text-xl text-[#0F3057]">{c.name}</h2><p className="text-sm text-[#5C636A]">{c.location}</p></div><span className="text-xs text-[#E5A93C] bg-[#E5A93C]/10 px-2 py-1">{c.period}</span></div><p className="text-sm text-[#5C636A] mt-4">{c.highlights}</p></Link>))}</div></section>
  </main>
);

export const ManifestosIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="manifestos-index">
    <section className="bg-[#0F3057] py-16"><div className="max-w-7xl mx-auto px-6"><Link to="/education" className="text-[#E5A93C] text-sm hover:underline">← Education Hub</Link><h1 className="font-heading text-4xl text-white mt-4">Art Manifestos</h1><p className="text-white/70 mt-2">Study {artManifestos.length} revolutionary art manifestos</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6"><div className="space-y-4">{artManifestos.map(m => (<Link key={m.slug} to={`/education/manifestos/${m.slug}`} className="flex items-center justify-between p-6 border border-[#E5E5DF] hover:shadow-lg transition-all"><div><h2 className="font-heading text-xl text-[#0F3057]">{m.name}</h2><p className="text-sm text-[#5C636A]">{m.author} • {m.movement}</p></div><span className="text-2xl font-heading text-[#E5E5DF]">{m.year}</span></Link>))}</div></div></section>
  </main>
);
