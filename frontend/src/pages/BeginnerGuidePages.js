import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Eye, Palette, HelpCircle, Heart, Sparkles, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { 
  simpleArtGuides, 
  artistIntentions, 
  fiveQuestions, 
  emotionsInArt, 
  commonSymbols, 
  artHistorySimple, 
  famousPaintingsSimple 
} from '../data/beginnerGuides';

// ============================================
// BEGINNER GUIDES HUB PAGE
// ============================================
export const BeginnerGuidesHubPage = () => {
  const sections = [
    { 
      name: 'How to Read Any Painting', 
      count: simpleArtGuides.length, 
      path: '/education/beginner/read-art', 
      icon: Eye, 
      desc: 'Simple steps anyone can follow',
      color: 'bg-[#0F3057]'
    },
    { 
      name: 'What Artists Really Mean', 
      count: artistIntentions.length, 
      path: '/education/beginner/artist-intent', 
      icon: Lightbulb, 
      desc: 'Why did they paint it that way?',
      color: 'bg-[#B64E33]'
    },
    { 
      name: '5 Questions for Any Art', 
      count: fiveQuestions.length, 
      path: '/education/beginner/five-questions', 
      icon: HelpCircle, 
      desc: 'Simple questions that unlock meaning',
      color: 'bg-[#2D5A43]'
    },
    { 
      name: 'Emotions in Art', 
      count: emotionsInArt.length, 
      path: '/education/beginner/emotions', 
      icon: Heart, 
      desc: 'How artists show feelings',
      color: 'bg-[#7C3A5A]'
    },
    { 
      name: 'Common Symbols Explained', 
      count: commonSymbols.length, 
      path: '/education/beginner/symbols', 
      icon: Sparkles, 
      desc: 'Hidden meanings made simple',
      color: 'bg-[#4A5568]'
    },
    { 
      name: 'Art History Made Simple', 
      count: artHistorySimple.length, 
      path: '/education/beginner/history-simple', 
      icon: BookOpen, 
      desc: 'Every era in plain language',
      color: 'bg-[#744210]'
    },
    { 
      name: 'Famous Paintings Explained', 
      count: famousPaintingsSimple.length, 
      path: '/education/beginner/famous-simple', 
      icon: Palette, 
      desc: 'Masterpieces without the jargon',
      color: 'bg-[#1A365D]'
    },
  ];

  const totalGuides = sections.reduce((sum, s) => sum + s.count, 0);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="beginner-guides-hub">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A1015] via-[#0F3057] to-[#0A1015] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#E5A93C] blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#B64E33] blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <Link to="/education" className="inline-flex items-center gap-2 text-[#E5A93C] hover:text-[#E5A93C]/80 mb-6">
            <ChevronLeft className="h-4 w-4" />
            Education Hub
          </Link>
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">
            For Everyone
          </span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">
            Art Appreciation <span className="text-[#E5A93C]">Made Simple</span>
          </h1>
          <p className="font-body text-lg lg:text-xl text-white/70 mt-6 max-w-3xl leading-relaxed">
            You don't need an art degree to understand paintings. These guides give you simple, practical tools 
            to "read" any artwork — no jargon, no pretension, just real insights anyone can use.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-3xl font-heading text-[#E5A93C]">{totalGuides}</span>
              <span className="text-white/70 ml-2">Simple Guides</span>
            </div>
            <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-3xl font-heading text-white">5 min</span>
              <span className="text-white/70 ml-2">Average Read</span>
            </div>
            <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-3xl font-heading text-white">Zero</span>
              <span className="text-white/70 ml-2">Prior Knowledge Needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl text-[#0F3057] mb-6">You Already Appreciate Art</h2>
              <p className="text-[#5C636A] text-lg leading-relaxed mb-4">
                When you stand before a painting and feel something — curiosity, peace, discomfort, wonder — 
                that's the beginning of appreciation. You don't need to know the "right" answer.
              </p>
              <p className="text-[#5C636A] leading-relaxed mb-4">
                These guides simply give you tools to explore your reactions more deeply. They help you notice 
                things you might miss, ask questions that reveal meaning, and understand why artists made the 
                choices they did.
              </p>
              <p className="text-[#5C636A] leading-relaxed">
                <strong className="text-[#0F3057]">The secret:</strong> Artists want you to feel before you think. 
                Trust your gut, then use these guides to understand why you felt that way.
              </p>
            </div>
            <div className="bg-white p-8 border border-[#E5E5DF]">
              <p className="text-[#0F3057] font-heading text-2xl italic leading-relaxed">
                "Art is not about understanding. Art is about feeling. Understanding comes after — 
                and these guides help you bridge that gap."
              </p>
              <p className="text-[#5C636A] mt-4">— A practical approach to art</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Categories */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-4">Choose Your Starting Point</h2>
          <p className="text-[#5C636A] max-w-2xl mb-12">
            Each category focuses on a different way to engage with art. Start anywhere — they all work independently.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, i) => (
              <Link 
                key={i} 
                to={section.path} 
                className="group bg-white border border-[#E5E5DF] hover:shadow-xl hover:border-[#0F3057]/30 transition-all"
              >
                <div className={`${section.color} p-6`}>
                  <section.icon className="h-10 w-10 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33] transition-colors">
                    {section.name}
                  </h3>
                  <p className="text-[#5C636A] mt-2">{section.desc}</p>
                  <p className="text-[#E5A93C] font-medium mt-4">{section.count} guides</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 bg-[#0F3057]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Not Sure Where to Start?</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Begin with "How to Read a Painting in 5 Minutes" — it's the most popular guide and works with any artwork.
          </p>
          <Link to="/education/beginner/read-art/how-to-read-painting">
            <Button className="bg-[#E5A93C] text-[#0A1015] hover:bg-[#E5A93C]/90 rounded-none px-8 py-6 text-lg">
              Start with the Basics
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

// ============================================
// INDEX PAGES FOR EACH CATEGORY
// ============================================

// Simple Art Guides Index
export const SimpleArtGuidesIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="simple-art-guides-index">
    <section className="bg-[#0F3057] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/beginner" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-4">
          <ChevronLeft className="h-4 w-4" />
          Beginner Guides
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <Eye className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">How to Read Any Painting</h1>
            <p className="text-white/70 mt-1">{simpleArtGuides.length} simple guides for looking at art</p>
          </div>
        </div>
        <p className="text-white/70 max-w-2xl">
          These guides give you a step-by-step approach to understanding any painting. 
          No art history needed — just open eyes and curiosity.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simpleArtGuides.map(guide => (
          <Link 
            key={guide.slug} 
            to={`/education/beginner/read-art/${guide.slug}`} 
            className="p-6 border border-[#E5E5DF] hover:shadow-lg hover:border-[#0F3057]/30 transition-all group"
          >
            <span className="inline-block px-2 py-1 bg-[#0F3057]/10 text-[#0F3057] text-xs uppercase tracking-wider mb-3">
              {guide.level}
            </span>
            <h2 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33] transition-colors">
              {guide.name}
            </h2>
            <p className="text-sm text-[#5C636A] mt-2">{guide.description}</p>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// Artist Intentions Index
export const ArtistIntentionsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="artist-intentions-index">
    <section className="bg-[#B64E33] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/beginner" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ChevronLeft className="h-4 w-4" />
          Beginner Guides
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <Lightbulb className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">What Artists Really Mean</h1>
            <p className="text-white/80 mt-1">{artistIntentions.length} common questions answered</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Ever wondered why Picasso made faces look "weird" or why some paintings are so dark? 
          These guides answer the questions you've always wanted to ask.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-6">
        {artistIntentions.map(intent => (
          <Link 
            key={intent.slug} 
            to={`/education/beginner/artist-intent/${intent.slug}`} 
            className="p-6 border border-[#E5E5DF] hover:shadow-lg hover:border-[#B64E33]/30 transition-all group"
          >
            <h2 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33] transition-colors">
              {intent.name}
            </h2>
            <p className="text-sm text-[#5C636A] mt-2 italic">"{intent.question}"</p>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// Five Questions Index
export const FiveQuestionsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="five-questions-index">
    <section className="bg-[#2D5A43] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/beginner" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ChevronLeft className="h-4 w-4" />
          Beginner Guides
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <HelpCircle className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">5 Questions for Any Art Type</h1>
            <p className="text-white/80 mt-1">{fiveQuestions.length} art types covered</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Standing in front of a painting and not sure what to think? 
          These 5 simple questions work for any type of art and help you discover meaning.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fiveQuestions.map(q => (
          <Link 
            key={q.slug} 
            to={`/education/beginner/five-questions/${q.slug}`} 
            className="p-6 border border-[#E5E5DF] hover:shadow-lg hover:border-[#2D5A43]/30 transition-all group bg-white"
          >
            <span className="inline-block px-2 py-1 bg-[#2D5A43]/10 text-[#2D5A43] text-xs uppercase tracking-wider mb-3">
              {q.type}
            </span>
            <h2 className="font-heading text-xl text-[#0F3057] group-hover:text-[#2D5A43] transition-colors">
              {q.name}
            </h2>
            <div className="mt-4 space-y-1">
              {q.questions.slice(0, 3).map((question, i) => (
                <p key={i} className="text-xs text-[#5C636A]">• {question}</p>
              ))}
              <p className="text-xs text-[#5C636A]">+ 2 more...</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// Emotions in Art Index
export const EmotionsInArtIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="emotions-art-index">
    <section className="bg-[#7C3A5A] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/beginner" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ChevronLeft className="h-4 w-4" />
          Beginner Guides
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <Heart className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">Emotions in Art Decoded</h1>
            <p className="text-white/80 mt-1">{emotionsInArt.length} emotions explained</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Artists use specific visual clues to convey emotions. Learn to recognize these patterns 
          and you'll understand what a painting is "saying" before you read the label.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emotionsInArt.map(e => (
          <Link 
            key={e.slug} 
            to={`/education/beginner/emotions/${e.slug}`} 
            className="p-6 border border-[#E5E5DF] hover:shadow-lg hover:border-[#7C3A5A]/30 transition-all group"
          >
            <span className="inline-block px-3 py-1.5 bg-[#7C3A5A]/10 text-[#7C3A5A] text-sm font-medium mb-3">
              {e.emotion}
            </span>
            <h2 className="font-heading text-lg text-[#0F3057] group-hover:text-[#7C3A5A] transition-colors">
              {e.name}
            </h2>
            <p className="text-sm text-[#5C636A] mt-2">Look for: {e.clues}</p>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// Common Symbols Index
export const CommonSymbolsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="common-symbols-index">
    <section className="bg-[#4A5568] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/beginner" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ChevronLeft className="h-4 w-4" />
          Beginner Guides
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">Common Symbols Explained</h1>
            <p className="text-white/80 mt-1">{commonSymbols.length} symbols decoded</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Throughout history, artists have used symbols to add layers of meaning. 
          Once you know these common symbols, you'll see paintings in a whole new way.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {commonSymbols.map(s => (
          <Link 
            key={s.slug} 
            to={`/education/beginner/symbols/${s.slug}`} 
            className="p-6 border border-[#E5E5DF] hover:shadow-lg hover:border-[#4A5568]/30 transition-all group text-center"
          >
            <h2 className="font-heading text-lg text-[#0F3057] group-hover:text-[#4A5568] transition-colors">
              {s.symbol}
            </h2>
            <p className="text-sm text-[#5C636A] mt-2 line-clamp-2">{s.meaning}</p>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// Art History Simple Index
export const ArtHistorySimpleIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="art-history-simple-index">
    <section className="bg-[#744210] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/beginner" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ChevronLeft className="h-4 w-4" />
          Beginner Guides
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">Art History Made Super Simple</h1>
            <p className="text-white/80 mt-1">{artHistorySimple.length} eras in plain English</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Art history doesn't have to be complicated. Each era had one big idea — 
          understand that, and the art makes sense.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="space-y-4">
          {artHistorySimple.map((era, i) => (
            <Link 
              key={era.slug} 
              to={`/education/beginner/history-simple/${era.slug}`} 
              className="flex items-center gap-6 p-6 border border-[#E5E5DF] hover:shadow-lg hover:border-[#744210]/30 transition-all group"
            >
              <span className="text-4xl font-heading text-[#E5E5DF] group-hover:text-[#744210] transition-colors w-12">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h2 className="font-heading text-xl text-[#0F3057] group-hover:text-[#744210] transition-colors">
                  {era.name}
                </h2>
                <p className="text-sm text-[#5C636A]">{era.era}</p>
              </div>
              <p className="text-sm text-[#5C636A] max-w-xs hidden lg:block">{era.simple}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </main>
);

// Famous Paintings Simple Index
export const FamousPaintingsSimpleIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="famous-paintings-simple-index">
    <section className="bg-[#1A365D] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/beginner" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ChevronLeft className="h-4 w-4" />
          Beginner Guides
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <Palette className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">Famous Paintings Explained Simply</h1>
            <p className="text-white/80 mt-1">{famousPaintingsSimple.length} masterpieces demystified</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Everyone knows these paintings, but what makes them special? 
          Here's the essence of each masterpiece — no art degree required.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {famousPaintingsSimple.map(p => (
          <Link 
            key={p.slug} 
            to={`/education/beginner/famous-simple/${p.slug}`} 
            className="p-6 border border-[#E5E5DF] hover:shadow-lg hover:border-[#1A365D]/30 transition-all group"
          >
            <h2 className="font-heading text-lg text-[#0F3057] group-hover:text-[#1A365D] transition-colors">
              {p.painting}
            </h2>
            <p className="text-sm text-[#5C636A] mt-1">{p.artist}</p>
            <p className="text-sm text-[#0F3057]/80 mt-3 italic">"{p.simple}"</p>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// ============================================
// INDIVIDUAL GUIDE PAGES
// ============================================

// Simple Art Guide Page
export const SimpleArtGuidePage = () => {
  const { slug } = useParams();
  const guide = simpleArtGuides.find(g => g.slug === slug) || simpleArtGuides[0];
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`simple-guide-${slug}`}>
      <section className="bg-[#0F3057] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/beginner/read-art" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6">
            <ChevronLeft className="h-4 w-4" />
            How to Read Art
          </Link>
          <span className="block px-4 py-1.5 bg-white/10 text-white font-body text-xs tracking-[0.2em] uppercase mb-6 w-fit">
            {guide.level}
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{guide.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-2xl">{guide.description}</p>
        </div>
      </section>
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <div className="bg-[#F5F5F0] p-8 mb-10 border-l-4 border-[#E5A93C]">
              <p className="text-[#0F3057] font-heading text-xl italic mb-0">
                "The goal isn't to sound smart in a museum. It's to see more than you did before."
              </p>
            </div>

            <h2 className="font-heading text-2xl text-[#0F3057]">What This Guide Covers</h2>
            <p className="text-[#5C636A] leading-relaxed">
              This guide focuses on {guide.name.toLowerCase()}. It's designed for anyone who wants to 
              engage more deeply with art but doesn't know where to start. No prior knowledge assumed.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">The Simple Approach</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Art can seem intimidating because people make it complicated. But at its core, every painting 
              is a human being trying to communicate something to you. Your job is simply to receive that message.
            </p>
            <ul className="space-y-3 text-[#5C636A] mt-6">
              <li><strong className="text-[#0F3057]">Step 1:</strong> Look for at least 30 seconds before reading any labels</li>
              <li><strong className="text-[#0F3057]">Step 2:</strong> Notice what draws your eye first</li>
              <li><strong className="text-[#0F3057]">Step 3:</strong> Ask yourself how it makes you feel</li>
              <li><strong className="text-[#0F3057]">Step 4:</strong> Look for details you might have missed</li>
              <li><strong className="text-[#0F3057]">Step 5:</strong> Trust your response — there are no wrong answers</li>
            </ul>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Why This Works</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Artists spend months or years on a single work. They make deliberate choices about every 
              element — color, composition, subject matter. When you slow down and really look, you start 
              to see these choices. And when you see the choices, you start to understand the meaning.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Practice Exercise</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Next time you're in a gallery or looking at art online, try this: Pick one painting and 
              spend 5 full minutes with it. Don't read anything about it first. Just look and feel. 
              Then, read the description and see what you discovered on your own.
            </p>
          </div>

          <div className="mt-16 p-8 bg-[#0F3057] text-white">
            <h3 className="font-heading text-xl">Keep Learning</h3>
            <p className="text-white/70 mt-2">Explore more guides to build your art appreciation toolkit.</p>
            <Link to="/education/beginner/read-art">
              <Button className="mt-6 bg-[#E5A93C] text-[#0A1015] rounded-none hover:bg-[#E5A93C]/90">
                View All Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// Artist Intentions Page
export const ArtistIntentionsPage = () => {
  const { slug } = useParams();
  const intent = artistIntentions.find(i => i.slug === slug) || artistIntentions[0];
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`artist-intent-${slug}`}>
      <section className="bg-[#B64E33] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/beginner/artist-intent" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Artist Intentions
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{intent.name}</h1>
          <p className="font-body text-lg text-white/80 mt-6 italic">"{intent.question}"</p>
        </div>
      </section>
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-2xl text-[#0F3057]">The Question Everyone Asks</h2>
            <p className="text-[#5C636A] leading-relaxed">
              "{intent.question}" — This is one of the most common questions people have about art, 
              and it's a great question. It shows you're engaging with the work, not just passively looking.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">The Simple Answer</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Artists make choices that seem strange for a reason. Sometimes it's to express emotion that 
              "normal" representation can't capture. Sometimes it's to make you see something familiar in 
              a new way. Sometimes it's to challenge what art can be.
            </p>

            <div className="bg-[#B64E33]/10 p-8 my-10">
              <h3 className="font-heading text-xl text-[#B64E33] mt-0">The Key Insight</h3>
              <p className="text-[#5C636A] mb-0">
                When something looks "wrong" or "strange" in a painting by a trained artist, it's almost 
                always intentional. The question isn't "why couldn't they do it right?" but "what were they 
                trying to communicate by doing it this way?"
              </p>
            </div>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Examples to Consider</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Think about how you might exaggerate when telling a story — making your gestures bigger, 
              your voice more dramatic. Artists do the same thing visually. They exaggerate, distort, 
              simplify, or complicate to make their point land harder.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">What to Take Away</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Next time you see something in a painting that confuses you, pause and ask: "What might 
              the artist be trying to say by doing this?" You might not always find the "right" answer, 
              but you'll start seeing art as intentional communication rather than decoration.
            </p>
          </div>

          <div className="mt-16 p-8 bg-[#B64E33]">
            <h3 className="font-heading text-xl text-white">More Questions Answered</h3>
            <p className="text-white/80 mt-2">Explore other common questions about artist choices.</p>
            <Link to="/education/beginner/artist-intent">
              <Button className="mt-6 bg-white text-[#B64E33] rounded-none hover:bg-white/90">
                View All Questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// Five Questions Page
export const FiveQuestionsPage = () => {
  const { slug } = useParams();
  const questionSet = fiveQuestions.find(q => q.slug === slug) || fiveQuestions[0];
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`five-questions-${slug}`}>
      <section className="bg-[#2D5A43] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/beginner/five-questions" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            5 Questions Guides
          </Link>
          <span className="block px-4 py-1.5 bg-white/10 text-white font-body text-xs tracking-[0.2em] uppercase mb-6 w-fit">
            {questionSet.type}
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{questionSet.name}</h1>
        </div>
      </section>
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#5C636A] text-lg leading-relaxed">
              Standing in front of a {questionSet.type.toLowerCase()} and not sure what to think? 
              These five questions will help you unlock its meaning.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">The 5 Questions</h2>
            <div className="space-y-8 mt-8">
              {questionSet.questions.map((question, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="text-4xl font-heading text-[#2D5A43] shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="font-heading text-xl text-[#0F3057] mt-0">{question}</h3>
                    <p className="text-[#5C636A] mt-2">
                      Take your time with this question. There's no right answer — it's about what you observe and feel.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#2D5A43]/10 p-8 my-10">
              <h3 className="font-heading text-xl text-[#2D5A43] mt-0">How to Use These Questions</h3>
              <p className="text-[#5C636A] mb-0">
                Don't rush through them. Spend at least a minute on each question. Write down your thoughts 
                if it helps. The goal is to slow down and really engage with what you're seeing.
              </p>
            </div>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Why This Works</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Most people glance at art for a few seconds and move on. These questions force you to slow 
              down and look more carefully. And when you look more carefully, you start to see things 
              you would have missed.
            </p>
          </div>

          <div className="mt-16 p-8 bg-[#2D5A43]">
            <h3 className="font-heading text-xl text-white">Questions for Other Art Types</h3>
            <p className="text-white/80 mt-2">Every type of art has its own set of questions to ask.</p>
            <Link to="/education/beginner/five-questions">
              <Button className="mt-6 bg-white text-[#2D5A43] rounded-none hover:bg-white/90">
                View All Art Types
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// Emotions Page
export const EmotionsPage = () => {
  const { slug } = useParams();
  const emotion = emotionsInArt.find(e => e.slug === slug) || emotionsInArt[0];
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`emotion-${slug}`}>
      <section className="bg-[#7C3A5A] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/beginner/emotions" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Emotions in Art
          </Link>
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white font-body text-sm mb-6">
            {emotion.emotion}
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{emotion.name}</h1>
        </div>
      </section>
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <div className="bg-[#7C3A5A]/10 p-8 mb-10">
              <h3 className="font-heading text-xl text-[#7C3A5A] mt-0">What to Look For</h3>
              <p className="text-[#5C636A] text-lg mb-0">{emotion.clues}</p>
            </div>

            <h2 className="font-heading text-2xl text-[#0F3057]">Understanding {emotion.emotion}</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Artists have developed a visual vocabulary for expressing {emotion.emotion.toLowerCase()}. 
              Once you know what to look for, you'll start recognizing it everywhere.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Visual Clues Explained</h2>
            <p className="text-[#5C636A] leading-relaxed">
              The visual elements listed above aren't arbitrary — they're based on how humans naturally 
              associate certain visual qualities with emotional states. Bright colors feel different than 
              dark ones. Rising lines feel different than falling ones. These associations are nearly 
              universal.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Practice Recognizing It</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Next time you're looking at art, before reading any description, try to identify the 
              primary emotion the artist is conveying. Look for the visual clues: color temperature, 
              line direction, figure positioning, light quality. You might be surprised how accurate 
              your instincts are.
            </p>
          </div>

          <div className="mt-16 p-8 bg-[#7C3A5A]">
            <h3 className="font-heading text-xl text-white">Explore More Emotions</h3>
            <p className="text-white/80 mt-2">Learn how artists express different feelings.</p>
            <Link to="/education/beginner/emotions">
              <Button className="mt-6 bg-white text-[#7C3A5A] rounded-none hover:bg-white/90">
                View All Emotions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// Symbols Page
export const SymbolsPage = () => {
  const { slug } = useParams();
  const symbol = commonSymbols.find(s => s.slug === slug) || commonSymbols[0];
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`symbol-${slug}`}>
      <section className="bg-[#4A5568] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/beginner/symbols" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Common Symbols
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{symbol.name}</h1>
          <p className="font-body text-lg text-white/80 mt-6">{symbol.meaning}</p>
        </div>
      </section>
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-2xl text-[#0F3057]">The Symbol: {symbol.symbol}</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Throughout art history, {symbol.symbol.toLowerCase()} has carried deep meaning. 
              When you see it in a painting, the artist is often trying to communicate something 
              beyond the literal.
            </p>

            <div className="bg-[#4A5568]/10 p-8 my-10">
              <h3 className="font-heading text-xl text-[#4A5568] mt-0">Common Meanings</h3>
              <p className="text-[#5C636A] text-lg mb-0">{symbol.meaning}</p>
            </div>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Why Symbols Matter</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Before most people could read, art was how stories and ideas were communicated. 
              Artists developed a shared visual language — symbols that viewers would recognize. 
              Many of these symbols are so deeply embedded in culture that we still respond to 
              them instinctively.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Context Matters</h2>
            <p className="text-[#5C636A] leading-relaxed">
              The same symbol can mean different things in different contexts. A skull in a Dutch 
              still life means something different than a skull in Mexican folk art. Always consider 
              when and where the art was made.
            </p>
          </div>

          <div className="mt-16 p-8 bg-[#4A5568]">
            <h3 className="font-heading text-xl text-white">Discover More Symbols</h3>
            <p className="text-white/80 mt-2">Build your visual vocabulary with more common symbols.</p>
            <Link to="/education/beginner/symbols">
              <Button className="mt-6 bg-white text-[#4A5568] rounded-none hover:bg-white/90">
                View All Symbols
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// Art History Simple Page
export const ArtHistorySimplePage = () => {
  const { slug } = useParams();
  const era = artHistorySimple.find(e => e.slug === slug) || artHistorySimple[0];
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`history-simple-${slug}`}>
      <section className="bg-[#744210] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/beginner/history-simple" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Simple Art History
          </Link>
          <span className="block px-4 py-1.5 bg-white/10 text-white font-body text-xs tracking-[0.2em] uppercase mb-6 w-fit">
            {era.era}
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{era.name}</h1>
          <p className="font-body text-lg text-white/80 mt-6 italic">"{era.simple}"</p>
        </div>
      </section>
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <div className="bg-[#744210]/10 p-8 mb-10">
              <h3 className="font-heading text-xl text-[#744210] mt-0">The One Big Idea</h3>
              <p className="text-[#5C636A] text-lg mb-0">{era.simple}</p>
            </div>

            <h2 className="font-heading text-2xl text-[#0F3057]">What Was Happening</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Every art era emerged from specific historical circumstances. Understanding what was 
              happening in the world helps explain why artists made the choices they did. Art doesn't 
              happen in a vacuum.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">What Made It Different</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Each new era was a reaction to what came before. Artists either built on previous 
              traditions or rebelled against them. Knowing this progression helps you see how art 
              evolved and why.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">How to Recognize It</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Once you know the key characteristics of an era, you'll start recognizing them in 
              museums, galleries, and everyday life. It becomes a fun game — spotting the telltale 
              signs of different artistic periods.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Why It Still Matters</h2>
            <p className="text-[#5C636A] leading-relaxed">
              The innovations of every era echo forward through art history. Contemporary artists 
              still reference, remix, and react to historical movements. Understanding the past 
              enriches your experience of art today.
            </p>
          </div>

          <div className="mt-16 p-8 bg-[#744210]">
            <h3 className="font-heading text-xl text-white">Continue the Journey</h3>
            <p className="text-white/80 mt-2">Explore other eras in art history.</p>
            <Link to="/education/beginner/history-simple">
              <Button className="mt-6 bg-white text-[#744210] rounded-none hover:bg-white/90">
                View All Eras
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// Famous Paintings Simple Page
export const FamousPaintingsSimplePage = () => {
  const { slug } = useParams();
  const painting = famousPaintingsSimple.find(p => p.slug === slug) || famousPaintingsSimple[0];
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`famous-simple-${slug}`}>
      <section className="bg-[#1A365D] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/beginner/famous-simple" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Famous Paintings
          </Link>
          <span className="block text-[#E5A93C] font-body text-sm tracking-wider mb-4">{painting.artist}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{painting.painting}</h1>
          <p className="font-body text-lg text-white/80 mt-6 italic">"{painting.simple}"</p>
        </div>
      </section>
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <div className="bg-[#1A365D]/10 p-8 mb-10">
              <h3 className="font-heading text-xl text-[#1A365D] mt-0">In One Sentence</h3>
              <p className="text-[#5C636A] text-lg mb-0">{painting.simple}</p>
            </div>

            <h2 className="font-heading text-2xl text-[#0F3057]">Why It's Famous</h2>
            <p className="text-[#5C636A] leading-relaxed">
              "{painting.painting}" by {painting.artist} isn't just famous because art experts say so. 
              It resonated with people across generations because it captures something universal about 
              human experience.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">What You're Really Looking At</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Beyond the subject matter, pay attention to how the artist chose to present it. The 
              composition, the colors, the brushwork — these technical choices are what make the 
              difference between a good painting and a masterpiece.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">What to Notice</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Next time you see this painting (in person or reproduced), try spending a few minutes 
              just looking. Notice where your eye goes. Notice the details in the background. Notice 
              how the light falls. The more you look, the more you'll see.
            </p>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">The Human Connection</h2>
            <p className="text-[#5C636A] leading-relaxed">
              Remember: {painting.artist} was a person, just like you. They had good days and bad days, 
              doubts and triumphs. This painting represents their attempt to communicate something 
              meaningful. Your job is simply to be open to receiving it.
            </p>
          </div>

          <div className="mt-16 p-8 bg-[#1A365D]">
            <h3 className="font-heading text-xl text-white">Explore More Masterpieces</h3>
            <p className="text-white/80 mt-2">Discover what makes other famous paintings special.</p>
            <Link to="/education/beginner/famous-simple">
              <Button className="mt-6 bg-white text-[#1A365D] rounded-none hover:bg-white/90">
                View All Paintings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
