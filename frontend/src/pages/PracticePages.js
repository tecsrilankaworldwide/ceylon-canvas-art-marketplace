import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Eye, Lightbulb, BookOpen, ArrowRight, Clock, Play, Sparkles, Heart, Zap, Brain, Coffee } from 'lucide-react';
import { Button } from '../components/ui/button';
import { lookAtPaintingGuides, compareArtworksGuides, spotTechniqueGuides, readingWalkthroughs, artByMood } from '../data/practiceGuides';

// ============================================
// PRACTICE & INTERACTIVE HUB
// ============================================
export const PracticeHubPage = () => {
  const sections = [
    { name: 'Look at This Painting', count: lookAtPaintingGuides.length, path: '/education/practice/look-at', icon: Eye, color: 'bg-[#B64E33]', desc: 'Guided analysis exercises with famous artworks' },
    { name: 'Compare Two Artworks', count: compareArtworksGuides.length, path: '/education/practice/compare', icon: Sparkles, color: 'bg-[#0F3057]', desc: 'Side-by-side analysis that reveals new insights' },
    { name: 'Spot the Technique', count: spotTechniqueGuides.length, path: '/education/practice/spot-technique', icon: Lightbulb, color: 'bg-[#2D5A43]', desc: 'Visual challenges to train your eye' },
    { name: 'Step-by-Step Walkthroughs', count: readingWalkthroughs.length, path: '/education/practice/walkthroughs', icon: Play, color: 'bg-[#744210]', desc: 'Complete guided tours of masterpieces' },
    { name: 'Art by Mood', count: artByMood.length, path: '/education/practice/mood', icon: Heart, color: 'bg-[#7C3A5A]', desc: 'Find art that matches how you want to feel' },
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="practice-hub">
      <section className="bg-gradient-to-br from-[#B64E33] to-[#8B3A28] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/beginner" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Beginner Guides
          </Link>
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white font-body text-xs tracking-[0.2em] uppercase mb-6">
            Interactive Learning
          </span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">
            Practice Your <span className="text-[#FCD9B4]">Art Eye</span>
          </h1>
          <p className="font-body text-lg text-white/80 mt-6 max-w-2xl">
            Looking at art is a skill that improves with practice. These interactive exercises 
            help you see more, notice details, and understand what makes great art work.
          </p>
          <div className="mt-10 flex gap-8">
            <div className="text-center">
              <p className="text-4xl font-heading text-white">{lookAtPaintingGuides.length + compareArtworksGuides.length + spotTechniqueGuides.length + readingWalkthroughs.length + artByMood.length}</p>
              <p className="text-white/70 text-sm">Exercises</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-heading text-white">5</p>
              <p className="text-white/70 text-sm">Practice Types</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, i) => (
              <Link key={i} to={section.path} className="group border border-[#E5E5DF] hover:shadow-xl transition-all overflow-hidden">
                <div className={`${section.color} p-8`}>
                  <section.icon className="h-12 w-12 text-white" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33]">{section.name}</h3>
                  <p className="text-[#5C636A] mt-2 text-sm">{section.desc}</p>
                  <p className="text-[#E5A93C] font-medium mt-4">{section.count} exercises</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// LOOK AT THIS PAINTING - INDEX
// ============================================
export const LookAtPaintingIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="look-at-painting-index">
    <section className="bg-[#B64E33] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/practice" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ChevronLeft className="h-4 w-4" />
          Practice Hub
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <Eye className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">Look at This Painting</h1>
            <p className="text-white/70 mt-1">{lookAtPaintingGuides.length} guided exercises</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Each exercise guides you through a famous painting with specific prompts. 
          Take your time — theres no rush.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lookAtPaintingGuides.map(guide => (
          <Link key={guide.slug} to={`/education/practice/look-at/${guide.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg transition-all group bg-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-[#B64E33]/10 text-[#B64E33] text-xs uppercase">{guide.level}</span>
              <span className="text-[#5C636A] text-xs flex items-center gap-1"><Clock className="h-3 w-3" />{guide.duration}</span>
            </div>
            <h2 className="font-heading text-lg text-[#0F3057] group-hover:text-[#B64E33]">{guide.name}</h2>
            <p className="text-sm text-[#5C636A] mt-1">{guide.artist}, {guide.year}</p>
            <p className="text-xs text-[#E5A93C] mt-3">{guide.prompts.length} guided prompts</p>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// ============================================
// LOOK AT THIS PAINTING - DETAIL PAGE
// ============================================
export const LookAtPaintingPage = () => {
  const { slug } = useParams();
  const guide = lookAtPaintingGuides.find(g => g.slug === slug) || lookAtPaintingGuides[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`look-at-${slug}`}>
      <section className="bg-[#B64E33] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/practice/look-at" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Look at This Painting
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-white/20 text-white text-sm">{guide.level}</span>
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm flex items-center gap-1"><Clock className="h-4 w-4" />{guide.duration}</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{guide.name}</h1>
          <p className="text-white/80 mt-4 text-lg">{guide.artist}, {guide.year}</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-[#F5F5F0] p-8 mb-12">
            <h2 className="font-heading text-xl text-[#0F3057]">Before You Begin</h2>
            <p className="text-[#5C636A] mt-3">
              Find an image of "{guide.painting}" — a high-quality version you can study closely. 
              Then work through each prompt below, spending at least 30 seconds on each.
            </p>
          </div>

          <div className="space-y-8">
            {guide.prompts.map((prompt, i) => (
              <div key={i} className="flex gap-6 items-start p-6 border-l-4 border-[#B64E33] bg-white shadow-sm">
                <span className="text-4xl font-heading text-[#B64E33]/30 shrink-0">{i + 1}</span>
                <div>
                  <p className="text-[#0F3057] text-lg font-medium">{prompt}</p>
                  <p className="text-[#5C636A] mt-2 text-sm">Take your time. There is no wrong answer.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-[#0F3057] text-white">
            <h3 className="font-heading text-xl">What Did You Discover?</h3>
            <p className="text-white/70 mt-2">
              Congratulations on completing this exercise. The more you practice looking closely, 
              the more youll see in every artwork you encounter.
            </p>
            <Link to="/education/practice/look-at">
              <Button className="mt-6 bg-[#E5A93C] text-[#0A1015] rounded-none hover:bg-[#E5A93C]/90">
                Try Another Painting
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
// COMPARE ARTWORKS - INDEX
// ============================================
export const CompareArtworksIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="compare-artworks-index">
    <section className="bg-[#0F3057] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/practice" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-4">
          <ChevronLeft className="h-4 w-4" />
          Practice Hub
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">Compare Two Artworks</h1>
            <p className="text-white/70 mt-1">{compareArtworksGuides.length} comparisons</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Comparing artworks reveals what makes each one unique. These side-by-side analyses 
          help you see connections and differences you might otherwise miss.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-6">
        {compareArtworksGuides.map(guide => (
          <Link key={guide.slug} to={`/education/practice/compare/${guide.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg transition-all group bg-white">
            <span className="px-2 py-1 bg-[#0F3057]/10 text-[#0F3057] text-xs uppercase mb-3 inline-block">{guide.theme}</span>
            <h2 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33]">{guide.name}</h2>
            <div className="mt-4 text-sm text-[#5C636A]">
              <p>{guide.artwork1.title} ({guide.artwork1.artist})</p>
              <p className="text-[#E5A93C]">vs</p>
              <p>{guide.artwork2.title} ({guide.artwork2.artist})</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// ============================================
// COMPARE ARTWORKS - DETAIL
// ============================================
export const CompareArtworksPage = () => {
  const { slug } = useParams();
  const guide = compareArtworksGuides.find(g => g.slug === slug) || compareArtworksGuides[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`compare-${slug}`}>
      <section className="bg-[#0F3057] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/practice/compare" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6">
            <ChevronLeft className="h-4 w-4" />
            Compare Artworks
          </Link>
          <span className="px-3 py-1 bg-white/20 text-white text-sm mb-4 inline-block">{guide.theme}</span>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{guide.name}</h1>
        </div>
      </section>

      <section className="py-8 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-white">
              <h3 className="font-heading text-xl text-[#0F3057]">{guide.artwork1.title}</h3>
              <p className="text-[#5C636A]">{guide.artwork1.artist}, {guide.artwork1.year}</p>
            </div>
            <div className="text-center p-6 bg-white">
              <h3 className="font-heading text-xl text-[#0F3057]">{guide.artwork2.title}</h3>
              <p className="text-[#5C636A]">{guide.artwork2.artist}, {guide.artwork2.year}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-[#E5A93C]/10 p-6 mb-10">
            <p className="text-[#0F3057] italic">{guide.insights}</p>
          </div>

          <h2 className="font-heading text-2xl text-[#0F3057] mb-6">Questions to Consider</h2>
          <div className="space-y-6">
            {guide.questions.map((q, i) => (
              <div key={i} className="flex gap-4 items-start p-4 border-l-4 border-[#0F3057] bg-white">
                <span className="text-2xl font-heading text-[#0F3057]/30">{i + 1}</span>
                <p className="text-[#0F3057]">{q}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-[#0F3057]">
            <h3 className="font-heading text-xl text-white">Keep Comparing</h3>
            <p className="text-white/70 mt-2">Every comparison teaches you something new about art.</p>
            <Link to="/education/practice/compare">
              <Button className="mt-6 bg-[#E5A93C] text-[#0A1015] rounded-none">
                Try Another Comparison
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// SPOT THE TECHNIQUE - INDEX
// ============================================
export const SpotTechniqueIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="spot-technique-index">
    <section className="bg-[#2D5A43] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/practice" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ChevronLeft className="h-4 w-4" />
          Practice Hub
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <Lightbulb className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">Spot the Technique</h1>
            <p className="text-white/70 mt-1">{spotTechniqueGuides.length} visual challenges</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Train your eye to recognize the techniques that make great art work. 
          Each challenge teaches you what to look for.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spotTechniqueGuides.map(guide => (
          <Link key={guide.slug} to={`/education/practice/spot-technique/${guide.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg transition-all group bg-white">
            <h2 className="font-heading text-xl text-[#0F3057] group-hover:text-[#2D5A43]">{guide.name}</h2>
            <p className="text-[#2D5A43] font-medium mt-1">{guide.technique}</p>
            <p className="text-sm text-[#5C636A] mt-2">{guide.description}</p>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// ============================================
// SPOT THE TECHNIQUE - DETAIL
// ============================================
export const SpotTechniquePage = () => {
  const { slug } = useParams();
  const guide = spotTechniqueGuides.find(g => g.slug === slug) || spotTechniqueGuides[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`spot-${slug}`}>
      <section className="bg-[#2D5A43] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/practice/spot-technique" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Spot the Technique
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{guide.name}</h1>
          <p className="text-white/80 mt-4 text-lg">{guide.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-[#2D5A43]/10 p-8 mb-10">
            <h2 className="font-heading text-xl text-[#2D5A43]">What to Look For</h2>
            <p className="text-[#0F3057] text-lg mt-2">{guide.whatToLook}</p>
          </div>

          <h2 className="font-heading text-2xl text-[#0F3057] mb-6">Famous Examples</h2>
          <div className="space-y-4 mb-10">
            {guide.examples.map((example, i) => (
              <div key={i} className="p-4 bg-white border-l-4 border-[#2D5A43]">
                <p className="text-[#0F3057]">{example}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#E5A93C] p-8">
            <h3 className="font-heading text-xl text-[#0A1015]">Your Challenge</h3>
            <p className="text-[#0A1015]/80 mt-2 text-lg">{guide.challenge}</p>
          </div>

          <div className="mt-16 p-8 bg-[#2D5A43]">
            <Link to="/education/practice/spot-technique">
              <Button className="bg-white text-[#2D5A43] rounded-none">
                Try Another Technique
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// WALKTHROUGHS - INDEX
// ============================================
export const WalkthroughsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="walkthroughs-index">
    <section className="bg-[#744210] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/education/practice" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ChevronLeft className="h-4 w-4" />
          Practice Hub
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
            <Play className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-4xl text-white">Step-by-Step Walkthroughs</h1>
            <p className="text-white/70 mt-1">{readingWalkthroughs.length} complete guides</p>
          </div>
        </div>
        <p className="text-white/80 max-w-2xl">
          Complete guided tours through masterpieces. Each step builds on the last, 
          teaching you how to read a painting from start to finish.
        </p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-6">
        {readingWalkthroughs.map(guide => (
          <Link key={guide.slug} to={`/education/practice/walkthroughs/${guide.slug}`} className="p-8 border border-[#E5E5DF] hover:shadow-lg transition-all group bg-white">
            <h2 className="font-heading text-2xl text-[#0F3057] group-hover:text-[#744210]">{guide.name}</h2>
            <p className="text-[#5C636A] mt-2">{guide.artist}</p>
            <p className="text-[#E5A93C] font-medium mt-4">{guide.steps.length} steps to mastery</p>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

// ============================================
// WALKTHROUGHS - DETAIL
// ============================================
export const WalkthroughPage = () => {
  const { slug } = useParams();
  const guide = readingWalkthroughs.find(g => g.slug === slug) || readingWalkthroughs[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`walkthrough-${slug}`}>
      <section className="bg-[#744210] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/practice/walkthroughs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Walkthroughs
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{guide.name}</h1>
          <p className="text-white/80 mt-4">{guide.artist}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {guide.steps.map((step) => (
              <div key={step.step} className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 bg-[#744210] flex items-center justify-center">
                  <span className="text-white font-heading text-xl">{step.step}</span>
                </div>
                <div className="bg-white p-6 border border-[#E5E5DF]">
                  <h3 className="font-heading text-xl text-[#0F3057]">{step.title}</h3>
                  <p className="text-[#0F3057] mt-3 text-lg">{step.instruction}</p>
                  <div className="mt-4 p-4 bg-[#744210]/10">
                    <p className="text-[#5C636A] text-sm italic">{step.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-[#744210]">
            <h3 className="font-heading text-xl text-white">Journey Complete</h3>
            <p className="text-white/70 mt-2">You now know this masterpiece more deeply than most gallery visitors ever will.</p>
            <Link to="/education/practice/walkthroughs">
              <Button className="mt-6 bg-white text-[#744210] rounded-none">
                Explore Another Masterpiece
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============================================
// ART BY MOOD - INDEX
// ============================================
export const ArtByMoodIndexPage = () => {
  const moodIcons = {
    'Peaceful': Coffee, 'Energizing': Zap, 'Contemplative': Brain, 'Romantic': Heart,
    'Melancholic': Coffee, 'Wondrous': Sparkles, 'Empowering': Zap, 'Joyful': Heart
  };

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="art-by-mood-index">
      <section className="bg-[#7C3A5A] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/practice" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ChevronLeft className="h-4 w-4" />
            Practice Hub
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-4xl text-white">Art by Mood</h1>
              <p className="text-white/70 mt-1">{artByMood.length} mood collections</p>
            </div>
          </div>
          <p className="text-white/80 max-w-2xl">
            Sometimes you know how you want to feel but not what to look at. 
            These collections match art to emotional needs.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artByMood.map(mood => {
            const Icon = moodIcons[mood.mood] || Heart;
            return (
              <Link key={mood.slug} to={`/education/practice/mood/${mood.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg transition-all group bg-white text-center">
                <Icon className="h-10 w-10 mx-auto text-[#7C3A5A] mb-4" />
                <h2 className="font-heading text-lg text-[#0F3057] group-hover:text-[#7C3A5A]">{mood.name}</h2>
                <p className="text-sm text-[#5C636A] mt-2">{mood.purpose}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

// ============================================
// ART BY MOOD - DETAIL
// ============================================
export const ArtByMoodPage = () => {
  const { slug } = useParams();
  const mood = artByMood.find(m => m.slug === slug) || artByMood[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`mood-${slug}`}>
      <section className="bg-[#7C3A5A] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/practice/mood" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Art by Mood
          </Link>
          <span className="px-3 py-1 bg-white/20 text-white text-sm mb-4 inline-block">{mood.mood}</span>
          <h1 className="font-heading text-4xl lg:text-5xl text-white">{mood.name}</h1>
          <p className="text-white/80 mt-4 text-lg">{mood.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl text-[#0F3057] mb-8">Recommended Artworks</h2>
          <div className="space-y-6">
            {mood.artworks.map((artwork, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-[#7C3A5A]">
                <h3 className="font-heading text-xl text-[#0F3057]">{artwork.title}</h3>
                <p className="text-[#5C636A]">{artwork.artist}</p>
                <p className="text-[#7C3A5A] mt-3 italic">{artwork.why}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-[#F5F5F0]">
            <h3 className="font-heading text-xl text-[#0F3057]">Viewing Tips</h3>
            <p className="text-[#5C636A] mt-3">{mood.viewingTips}</p>
          </div>

          <div className="mt-16 p-8 bg-[#7C3A5A]">
            <Link to="/education/practice/mood">
              <Button className="bg-white text-[#7C3A5A] rounded-none">
                Explore Other Moods
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
