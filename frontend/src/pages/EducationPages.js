import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Award, Image, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { artFundamentals, masterpieceAnalysis, artHistoryComprehensive, artTheoryDeep, artistsDeepStudy, museumStudies, artAppreciationCourses } from '../data/educationData';

// Art Fundamentals Page
export const FundamentalPage = () => {
  const { slug } = useParams();
  const topic = artFundamentals.find(f => f.slug === slug) || artFundamentals[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`fundamental-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/fundamentals" className="inline-flex items-center gap-2 text-[#E5A93C] hover:text-[#E5A93C]/80 mb-6"><ChevronLeft className="h-4 w-4" />All Fundamentals</Link>
          <span className="block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6 w-fit">{topic.level}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{topic.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-3xl">{topic.description}</p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#5C636A] leading-relaxed text-lg">Art is not merely about instinct or natural talent—it is a profound discipline built upon centuries of accumulated knowledge, theory, and practice. Understanding {topic.name.toLowerCase()} is essential for anyone seeking to truly appreciate or create meaningful art.</p>
            
            <h2 className="font-heading text-2xl text-[#0F3057] mt-12 mb-6">Why This Matters</h2>
            <p className="text-[#5C636A] leading-relaxed">Every masterpiece you admire—from the Mona Lisa to Starry Night—was created by an artist who deeply understood these fundamental principles. What appears as "natural talent" is actually the result of rigorous study and deliberate application of artistic knowledge.</p>
            
            <div className="bg-[#F5F5F0] p-8 my-10 border-l-4 border-[#E5A93C]">
              <p className="text-[#0F3057] font-heading text-xl italic">"Art is not what you see, but what you make others see."</p>
              <p className="text-[#5C636A] mt-2">— Edgar Degas</p>
            </div>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12 mb-6">The Science Behind Art</h2>
            <p className="text-[#5C636A] leading-relaxed">Behind every brushstroke lies an understanding of optics, geometry, psychology, and physics. Renaissance masters studied anatomy for years before painting the human form. Impressionists understood how light particles interact with pigments. Color field painters explored how adjacent colors affect our perception.</p>
            
            <h2 className="font-heading text-2xl text-[#0F3057] mt-12 mb-6">Key Concepts</h2>
            <ul className="space-y-4 text-[#5C636A]">
              <li className="flex gap-3"><span className="text-[#E5A93C] font-bold">1.</span> Understanding the theoretical foundation</li>
              <li className="flex gap-3"><span className="text-[#E5A93C] font-bold">2.</span> Recognizing how masters applied these principles</li>
              <li className="flex gap-3"><span className="text-[#E5A93C] font-bold">3.</span> Training your eye to identify these elements</li>
              <li className="flex gap-3"><span className="text-[#E5A93C] font-bold">4.</span> Applying knowledge to appreciate art more deeply</li>
            </ul>

            <h2 className="font-heading text-2xl text-[#0F3057] mt-12 mb-6">Historical Context</h2>
            <p className="text-[#5C636A] leading-relaxed">The principles we study today were formalized during the Renaissance, when artists like Alberti and Leonardo codified the rules of perspective, proportion, and composition. These weren't arbitrary—they were discovered through careful observation of nature and human perception.</p>
          </div>
          
          <div className="mt-16 p-8 bg-[#0F3057] text-white">
            <h3 className="font-heading text-xl">Continue Your Education</h3>
            <p className="text-white/70 mt-2">Explore more fundamentals to build a complete understanding of visual art.</p>
            <Link to="/education/fundamentals"><Button className="mt-6 bg-[#E5A93C] text-[#0A1015] rounded-none">View All Fundamentals<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// Masterpiece Analysis Page
export const MasterpiecePage = () => {
  const { slug } = useParams();
  const work = masterpieceAnalysis.find(m => m.slug === slug) || masterpieceAnalysis[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`masterpiece-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/masterpieces" className="inline-flex items-center gap-2 text-[#E5A93C] hover:text-[#E5A93C]/80 mb-6"><ChevronLeft className="h-4 w-4" />All Masterpieces</Link>
          <span className="block text-[#E5A93C] font-body text-sm tracking-wider mb-4">{work.artist} • {work.year}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{work.name}</h1>
          <p className="font-body text-lg text-white/70 mt-4">{work.museum}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-[3/4] bg-[#F5F5F0] flex items-center justify-center"><Image className="h-24 w-24 text-[#E5E5DF]" /></div>
            <div>
              <h2 className="font-heading text-2xl text-[#0F3057] mb-6">Understanding This Masterpiece</h2>
              <p className="text-[#5C636A] leading-relaxed">This work by {work.artist} represents far more than meets the eye. Created in {work.year}, it embodies centuries of artistic development and introduces innovations that would influence generations of artists.</p>
              
              <h3 className="font-heading text-xl text-[#0F3057] mt-8 mb-4">Composition Analysis</h3>
              <p className="text-[#5C636A] leading-relaxed">Notice how the artist guides your eye through the composition. Nothing is accidental—every element serves the whole.</p>
              
              <h3 className="font-heading text-xl text-[#0F3057] mt-8 mb-4">Technical Mastery</h3>
              <p className="text-[#5C636A] leading-relaxed">The techniques employed here required years of training. From the handling of light to the subtle gradations of color, every brushstroke demonstrates deliberate skill.</p>
              
              <h3 className="font-heading text-xl text-[#0F3057] mt-8 mb-4">Historical Significance</h3>
              <p className="text-[#5C636A] leading-relaxed">This work didn't emerge from a vacuum. It responds to artistic traditions while pushing boundaries in ways that changed the course of art history.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Art History Comprehensive Page
export const ArtHistoryPage = () => {
  const { slug } = useParams();
  const period = artHistoryComprehensive.find(p => p.slug === slug) || artHistoryComprehensive[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`art-history-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/art-history" className="inline-flex items-center gap-2 text-[#E5A93C] hover:text-[#E5A93C]/80 mb-6"><ChevronLeft className="h-4 w-4" />All Periods</Link>
          <span className="block text-[#E5A93C] font-body text-sm tracking-wider mb-4">{period.era}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{period.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-3xl">{period.description}</p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 prose prose-lg max-w-none">
          <h2 className="font-heading text-2xl text-[#0F3057]">Historical Context</h2>
          <p className="text-[#5C636A] leading-relaxed">The {period.name} period ({period.era}) represents a pivotal moment in the evolution of human artistic expression. Understanding this era is essential for comprehending how art developed and why artists made the choices they did.</p>
          
          <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Key Characteristics</h2>
          <p className="text-[#5C636A] leading-relaxed">Every artistic movement develops distinctive characteristics that set it apart. These aren't arbitrary stylistic choices—they reflect the philosophical, social, and technological conditions of their time.</p>
          
          <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Major Artists</h2>
          <p className="text-[#5C636A] leading-relaxed">The masters of this period didn't simply have "talent"—they built upon centuries of accumulated knowledge while pushing boundaries in revolutionary ways.</p>
          
          <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Legacy & Influence</h2>
          <p className="text-[#5C636A] leading-relaxed">The innovations of the {period.name} period continue to influence artists today. Understanding this lineage helps us appreciate both historical and contemporary art more deeply.</p>
        </div>
      </section>
    </main>
  );
};

// Art Theory Page
export const ArtTheoryPage = () => {
  const { slug } = useParams();
  const theory = artTheoryDeep.find(t => t.slug === slug) || artTheoryDeep[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`art-theory-${slug}`}>
      <section className="bg-[#0F3057] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/theory" className="inline-flex items-center gap-2 text-[#E5A93C] hover:text-[#E5A93C]/80 mb-6"><ChevronLeft className="h-4 w-4" />All Theory</Link>
          <span className="block text-[#E5A93C] font-body text-sm tracking-wider mb-4">{theory.category}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{theory.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-3xl">{theory.description}</p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 prose prose-lg max-w-none">
          <p className="text-[#5C636A] leading-relaxed text-lg">Art theory provides the intellectual framework for understanding why art matters and how it functions in human culture. {theory.name} offers crucial insights into how we create, interpret, and value artistic works.</p>
          
          <div className="bg-[#F5F5F0] p-8 my-10">
            <h3 className="font-heading text-xl text-[#0F3057] mt-0">Why Study Art Theory?</h3>
            <p className="text-[#5C636A] mb-0">Without theoretical understanding, we're left with only subjective reactions. Theory gives us vocabulary, context, and analytical tools to engage with art on a deeper level.</p>
          </div>
          
          <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Core Concepts</h2>
          <p className="text-[#5C636A] leading-relaxed">Understanding {theory.name.toLowerCase()} requires grasping several interconnected ideas that have developed through centuries of philosophical inquiry and artistic practice.</p>
        </div>
      </section>
    </main>
  );
};

// Artist Deep Study Page
export const ArtistStudyPage = () => {
  const { slug } = useParams();
  const artist = artistsDeepStudy.find(a => a.slug === slug) || artistsDeepStudy[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`artist-study-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link to="/education/artists" className="inline-flex items-center gap-2 text-[#E5A93C] hover:text-[#E5A93C]/80 mb-6"><ChevronLeft className="h-4 w-4" />All Artists</Link>
            <span className="block text-[#E5A93C] font-body text-sm tracking-wider mb-4">{artist.era}</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{artist.name}</h1>
            <p className="font-body text-lg text-white/70 mt-6">{artist.known}</p>
          </div>
          <div className="aspect-square bg-[#1A1D20] flex items-center justify-center"><Image className="h-24 w-24 text-[#5C636A]" /></div>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 prose prose-lg max-w-none">
          <h2 className="font-heading text-2xl text-[#0F3057]">The Artist's Journey</h2>
          <p className="text-[#5C636A] leading-relaxed">{artist.name}'s artistic development wasn't accidental—it was the product of rigorous training, constant experimentation, and deep engagement with the artistic traditions that preceded them.</p>
          
          <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Technical Innovation</h2>
          <p className="text-[#5C636A] leading-relaxed">What distinguished {artist.name} from contemporaries was a unique synthesis of technical mastery and innovative vision. Understanding their techniques reveals the depth of knowledge required to create seemingly effortless masterpieces.</p>
          
          <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Influences & Legacy</h2>
          <p className="text-[#5C636A] leading-relaxed">No artist works in isolation. {artist.name} absorbed influences from predecessors and contemporaries, then transformed these into something new that would influence generations of artists to come.</p>
        </div>
      </section>
    </main>
  );
};

// Museum Study Page
export const MuseumStudyPage = () => {
  const { slug } = useParams();
  const museum = museumStudies.find(m => m.slug === slug) || museumStudies[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`museum-study-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/museums" className="inline-flex items-center gap-2 text-[#E5A93C] hover:text-[#E5A93C]/80 mb-6"><ChevronLeft className="h-4 w-4" />All Museums</Link>
          <span className="block text-[#E5A93C] font-body text-sm tracking-wider mb-4">{museum.city}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{museum.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6">Highlights: {museum.highlights}</p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 prose prose-lg max-w-none">
          <h2 className="font-heading text-2xl text-[#0F3057]">Collection Overview</h2>
          <p className="text-[#5C636A] leading-relaxed">{museum.name} houses one of the world's most significant art collections. Understanding what to look for and why these works matter transforms a museum visit from passive viewing into active learning.</p>
          
          <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Must-See Works</h2>
          <p className="text-[#5C636A] leading-relaxed">While every work in a major museum merits attention, certain pieces are essential for understanding the development of art history.</p>
          
          <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Visiting Tips</h2>
          <p className="text-[#5C636A] leading-relaxed">To truly appreciate a museum's collection, preparation is key. Study before you visit, take your time with individual works, and don't try to see everything in one visit.</p>
        </div>
      </section>
    </main>
  );
};

// Art Course Page
export const ArtCoursePage = () => {
  const { slug } = useParams();
  const course = artAppreciationCourses.find(c => c.slug === slug) || artAppreciationCourses[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`course-${slug}`}>
      <section className="bg-[#0F3057] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/courses" className="inline-flex items-center gap-2 text-[#E5A93C] hover:text-[#E5A93C]/80 mb-6"><ChevronLeft className="h-4 w-4" />All Courses</Link>
          <div className="flex gap-4 mb-6">
            <span className="px-3 py-1 bg-[#E5A93C]/20 text-[#E5A93C] text-sm">{course.level}</span>
            <span className="px-3 py-1 bg-white/10 text-white text-sm">{course.duration}</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{course.name}</h1>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-2xl text-[#0F3057]">Course Overview</h2>
            <p className="text-[#5C636A] leading-relaxed">This course will transform how you engage with visual art. You'll develop the knowledge and vocabulary to understand what makes art meaningful—not as a matter of subjective taste, but through informed appreciation.</p>
            
            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">What You'll Learn</h2>
            <ul className="space-y-3 text-[#5C636A]">
              <li>The theoretical foundations underlying all visual art</li>
              <li>How to analyze composition, color, and technique</li>
              <li>Historical context that gives art its meaning</li>
              <li>Vocabulary for discussing art intelligently</li>
            </ul>
            
            <h2 className="font-heading text-2xl text-[#0F3057] mt-12">Why This Matters</h2>
            <p className="text-[#5C636A] leading-relaxed">Art appreciation isn't about innate sensitivity—it's a skill that can be developed through study and practice. This course provides the foundation for a lifetime of deeper engagement with visual culture.</p>
          </div>
          
          <div className="mt-12">
            <Button className="bg-[#0F3057] text-white rounded-none px-8 py-6">Start Learning<ArrowRight className="ml-2 h-5 w-5" /></Button>
          </div>
        </div>
      </section>
    </main>
  );
};
