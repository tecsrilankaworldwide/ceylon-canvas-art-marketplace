import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, Clock, ArrowLeft, ArrowRight, Skull, Paintbrush, Search, Swords, HelpCircle, Zap, Calendar, Award } from 'lucide-react';
import { artStories, storyCategories } from '../data/artStories';

// Category Icon Mapping
const categoryIcons = {
  'Stolen Masterpieces': Skull,
  'Famous Forgeries': Paintbrush,
  'Lost & Found': Search,
  'Artist Rivalries': Swords,
  'Art Mysteries': HelpCircle,
  'Art Scandals': Zap
};

// Main Hub Page
export const ArtStoriesHubPage = () => {
  const totalStories = artStories.length;
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="art-stories-hub">
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Education Hub
          </Link>
          <span className="inline-block px-4 py-1.5 bg-[#B64E33]/30 text-[#E07A5F] font-body text-xs tracking-[0.2em] uppercase mb-6">Art Stories & Mysteries</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">The Stories Behind <span className="text-[#E07A5F]">the Art</span></h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-3xl leading-relaxed">
            Heists, forgeries, feuds, and mysteries — the art world is full of fascinating stories that 
            read like thrillers. Discover the human drama behind history's greatest masterpieces.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/10">
              <span className="text-2xl font-heading text-[#E07A5F]">{totalStories}</span>
              <span className="text-white/70 ml-2 text-sm">Fascinating Stories</span>
            </div>
            <div className="px-4 py-2 bg-white/10">
              <span className="text-2xl font-heading text-[#E07A5F]">6</span>
              <span className="text-white/70 ml-2 text-sm">Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 lg:py-20 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057] mb-8">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyCategories.map((cat) => {
              const Icon = categoryIcons[cat.name] || BookOpen;
              return (
                <a 
                  key={cat.slug} 
                  href={`#${cat.slug}`}
                  className={`p-6 ${cat.color} text-white hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="h-8 w-8" />
                    <span className="text-3xl">{cat.icon}</span>
                  </div>
                  <h3 className="font-heading text-xl mb-2">{cat.name}</h3>
                  <p className="text-white/70 text-sm">{cat.count} stories</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stories by Category */}
      {storyCategories.map((cat) => {
        const Icon = categoryIcons[cat.name] || BookOpen;
        const categoryStories = artStories.filter(s => s.category === cat.name);
        return (
          <section key={cat.slug} id={cat.slug} className="py-16 lg:py-20 border-b border-[#E5E5DF]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 ${cat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">{cat.name}</h2>
                  <p className="text-[#5C636A]">{categoryStories.length} stories</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryStories.map((story) => (
                  <Link 
                    key={story.slug} 
                    to={`/art-stories/${story.slug}`}
                    className="bg-white border border-[#E5E5DF] hover:shadow-xl hover:border-[#B64E33]/30 transition-all group"
                    data-testid={`story-card-${story.slug}`}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4 text-sm text-[#5C636A]">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {story.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {story.readTime}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33] mb-3">{story.title}</h3>
                      <p className="text-[#5C636A] text-sm line-clamp-3">{story.teaser}</p>
                    </div>
                    <div className="px-6 py-4 bg-[#F5F5F0] border-t border-[#E5E5DF]">
                      <p className="text-xs text-[#7C3A5A] font-medium truncate">Related: {story.relatedArtwork}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 bg-[#B64E33]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Own a Piece of History</h2>
          <p className="text-white/70 mb-8">Every artwork has a story. Start your own collection journey today.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 bg-white text-[#B64E33] px-8 py-3 font-medium hover:bg-white/90 transition-colors"
          >
            Explore the Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

// Individual Story Page
export const ArtStoryPage = () => {
  const { slug } = useParams();
  const story = artStories.find(s => s.slug === slug);
  
  if (!story) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-[#0F3057] mb-4">Story Not Found</h1>
          <Link to="/art-stories" className="text-[#B64E33] hover:underline">Return to Art Stories</Link>
        </div>
      </main>
    );
  }

  const storyIndex = artStories.findIndex(s => s.slug === slug);
  const prevStory = storyIndex > 0 ? artStories[storyIndex - 1] : null;
  const nextStory = storyIndex < artStories.length - 1 ? artStories[storyIndex + 1] : null;
  const category = storyCategories.find(c => c.name === story.category);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`story-page-${slug}`}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1015] via-[#1A1A2E] to-[#0A1015] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Link to="/art-stories" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Art Stories
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className={`px-3 py-1 ${category?.color || 'bg-[#B64E33]'} text-white text-sm`}>{story.category}</span>
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {story.year}
            </span>
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" /> {story.readTime}
            </span>
          </div>
          <h1 className="font-heading text-3xl lg:text-5xl font-medium text-white mb-6">{story.title}</h1>
          <p className="text-xl text-white/70 italic leading-relaxed">{story.teaser}</p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <article className="prose prose-lg">
            <div className="bg-[#F5F5F0] p-8 border-l-4 border-[#B64E33] mb-12">
              <h2 className="font-heading text-2xl text-[#0F3057] mb-4 mt-0">The Story</h2>
              <p className="text-[#3D3D3D] leading-relaxed m-0">{story.story}</p>
            </div>

            <div className="bg-[#0F3057] text-white p-8 mb-12">
              <h2 className="font-heading text-2xl mb-4 mt-0">The Outcome</h2>
              <p className="text-white/80 leading-relaxed m-0">{story.outcome}</p>
            </div>

            <div className="border border-[#E5E5DF] p-6 flex items-center gap-4">
              <Award className="h-8 w-8 text-[#E5A93C] flex-shrink-0" />
              <div>
                <p className="text-sm text-[#5C636A] mb-1">Related Artwork</p>
                <p className="font-heading text-lg text-[#0F3057]">{story.relatedArtwork}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-[#F5F5F0] border-t border-[#E5E5DF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {prevStory ? (
              <Link to={`/art-stories/${prevStory.slug}`} className="flex items-center gap-3 text-[#0F3057] hover:text-[#B64E33] transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <div>
                  <p className="text-sm text-[#5C636A]">Previous Story</p>
                  <p className="font-medium line-clamp-1">{prevStory.title}</p>
                </div>
              </Link>
            ) : <div />}
            {nextStory ? (
              <Link to={`/art-stories/${nextStory.slug}`} className="flex items-center gap-3 text-[#0F3057] hover:text-[#B64E33] transition-colors text-right">
                <div>
                  <p className="text-sm text-[#5C636A]">Next Story</p>
                  <p className="font-medium line-clamp-1">{nextStory.title}</p>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl text-[#0F3057] mb-8">More from {story.category}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {artStories
              .filter(s => s.category === story.category && s.slug !== story.slug)
              .slice(0, 3)
              .map((s) => (
                <Link 
                  key={s.slug} 
                  to={`/art-stories/${s.slug}`}
                  className="bg-white border border-[#E5E5DF] p-6 hover:shadow-lg transition-shadow"
                >
                  <p className="text-sm text-[#5C636A] mb-2">{s.year} • {s.readTime}</p>
                  <h3 className="font-heading text-lg text-[#0F3057] hover:text-[#B64E33]">{s.title}</h3>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#B64E33]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Every Artwork Has a Story</h2>
          <p className="text-white/70 mb-8">Start your own collection and create your own art narrative.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 bg-white text-[#B64E33] px-8 py-3 font-medium hover:bg-white/90 transition-colors"
          >
            Explore the Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};
