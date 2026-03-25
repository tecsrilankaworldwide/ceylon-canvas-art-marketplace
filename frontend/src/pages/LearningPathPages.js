import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sprout, Flame, Crown, Clock, BookOpen, Target, Check, ArrowRight, Play, FileText, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/button';
import { learningPaths, pathStats } from '../data/learningPaths';

// ============================================
// LEARNING PATHS HUB
// ============================================
export const LearningPathsHubPage = () => {
  const pathIcons = { Sprout, Flame, Crown };

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="learning-paths-hub">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1015] via-[#0F3057] to-[#0A1015] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E5A93C] blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-[#B64E33] blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <Link to="/education" className="inline-flex items-center gap-2 text-[#E5A93C] hover:underline mb-6">
            <ChevronLeft className="h-4 w-4" />
            Education Hub
          </Link>
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C] text-[#0A1015] font-body text-xs tracking-[0.2em] uppercase mb-6 font-bold">
            Guided Learning
          </span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">
            Your Art Education <span className="text-[#E5A93C]">Journey</span>
          </h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-2xl leading-relaxed">
            Not sure where to start? Our curated learning paths guide you through art appreciation 
            step by step, from curious beginner to confident collector.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-3xl font-heading text-[#E5A93C]">{pathStats.paths}</span>
              <span className="text-white/70 ml-2">Learning Paths</span>
            </div>
            <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-3xl font-heading text-white">{pathStats.totalLessons}</span>
              <span className="text-white/70 ml-2">Curated Lessons</span>
            </div>
            <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-3xl font-heading text-white">{pathStats.totalTime}</span>
              <span className="text-white/70 ml-2">Total Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-8">How Learning Paths Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F3057] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-heading">1</div>
              <h3 className="font-heading text-xl text-[#0F3057]">Choose Your Level</h3>
              <p className="text-[#5C636A] mt-2">Pick a path based on your current experience and goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#B64E33] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-heading">2</div>
              <h3 className="font-heading text-xl text-[#0F3057]">Follow the Sequence</h3>
              <p className="text-[#5C636A] mt-2">Work through modules in order — each builds on the last</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2D5A43] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-heading">3</div>
              <h3 className="font-heading text-xl text-[#0F3057]">Complete the Project</h3>
              <p className="text-[#5C636A] mt-2">Apply what you learned with a real-world final project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Paths */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-4">Choose Your Path</h2>
          <p className="text-[#5C636A] max-w-2xl mb-12">
            Each path is designed for a specific stage of your art journey. Not sure which one? 
            Start with The Curious Beginner — you can always progress to the next level.
          </p>

          <div className="space-y-8">
            {learningPaths.map((path, i) => {
              const Icon = pathIcons[path.icon] || Sprout;
              return (
                <Link 
                  key={path.slug} 
                  to={`/education/paths/${path.slug}`}
                  className="block group"
                >
                  <div className={`bg-gradient-to-br ${path.color} p-8 lg:p-12 hover:shadow-2xl transition-all`}>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                      <div className="shrink-0">
                        <div className="w-20 h-20 bg-white/20 flex items-center justify-center">
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-white/20 text-white text-sm">{path.level}</span>
                          <span className="text-white/70 text-sm flex items-center gap-1">
                            <Clock className="h-4 w-4" />{path.duration}
                          </span>
                        </div>
                        <h3 className="font-heading text-3xl text-white">{path.name}</h3>
                        <p className="text-white/80 text-lg italic mt-1">{path.tagline}</p>
                        <p className="text-white/70 mt-4 max-w-2xl">{path.description}</p>
                        <p className="text-white mt-6 font-medium group-hover:underline">
                          {path.modules.length} modules · {path.modules.reduce((sum, m) => sum + m.lessons.length, 0)} lessons →
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0F3057]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Not Sure Which Path?</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Everyone starts somewhere. The Curious Beginner path is perfect for anyone who enjoys art 
            but wants to understand it better. You can always progress from there.
          </p>
          <Link to="/education/paths/curious-beginner">
            <Button className="bg-[#E5A93C] text-[#0A1015] rounded-none px-8 py-6 text-lg hover:bg-[#E5A93C]/90">
              Start with The Curious Beginner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

// ============================================
// INDIVIDUAL LEARNING PATH PAGE
// ============================================
export const LearningPathPage = () => {
  const { slug } = useParams();
  const path = learningPaths.find(p => p.slug === slug) || learningPaths[0];
  const [openModule, setOpenModule] = useState(0);
  
  const pathIcons = { Sprout, Flame, Crown };
  const Icon = pathIcons[path.icon] || Sprout;
  
  const lessonIcons = {
    guide: BookOpen,
    exercise: Play,
    reference: FileText
  };

  const totalLessons = path.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`path-${slug}`}>
      {/* Hero */}
      <section className={`bg-gradient-to-br ${path.color} py-16 lg:py-24`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education/paths" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ChevronLeft className="h-4 w-4" />
            Learning Paths
          </Link>
          
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-white/20 flex items-center justify-center shrink-0 hidden lg:flex">
              <Icon className="h-10 w-10 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-white/20 text-white text-sm">{path.level}</span>
                <span className="text-white/70 text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" />{path.duration}
                </span>
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl text-white">{path.name}</h1>
              <p className="text-white/80 text-xl italic mt-2">{path.tagline}</p>
              <p className="text-white/70 mt-4 max-w-2xl">{path.description}</p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/10">
                  <span className="text-2xl font-heading text-white">{path.modules.length}</span>
                  <span className="text-white/70 ml-2">Modules</span>
                </div>
                <div className="px-4 py-2 bg-white/10">
                  <span className="text-2xl font-heading text-white">{totalLessons}</span>
                  <span className="text-white/70 ml-2">Lessons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-12 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl text-[#0F3057] mb-6 flex items-center gap-3">
            <Target className="h-6 w-6 text-[#E5A93C]" />
            What Youll Achieve
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {path.outcomes.map((outcome, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-white">
                <Check className="h-5 w-5 text-[#2D5A43] shrink-0 mt-0.5" />
                <p className="text-[#5C636A]">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-8">Your Learning Journey</h2>
          
          <div className="space-y-4">
            {path.modules.map((module, i) => (
              <div key={i} className="border border-[#E5E5DF]">
                <button
                  onClick={() => setOpenModule(openModule === i ? -1 : i)}
                  className="w-full p-6 flex items-center justify-between bg-white hover:bg-[#F5F5F0] transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-12 h-12 flex items-center justify-center font-heading text-xl ${openModule === i ? 'bg-[#0F3057] text-white' : 'bg-[#F5F5F0] text-[#0F3057]'}`}>
                      {module.week}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl text-[#0F3057]">{module.title}</h3>
                      <p className="text-[#5C636A] text-sm mt-1">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#5C636A] text-sm">{module.lessons.length} lessons</span>
                    <ChevronRight className={`h-5 w-5 text-[#5C636A] transition-transform ${openModule === i ? 'rotate-90' : ''}`} />
                  </div>
                </button>
                
                {openModule === i && (
                  <div className="border-t border-[#E5E5DF] bg-[#FDFDFB]">
                    {module.lessons.map((lesson, j) => {
                      const LessonIcon = lessonIcons[lesson.type] || BookOpen;
                      return (
                        <Link
                          key={j}
                          to={lesson.path}
                          className="flex items-center gap-4 p-4 border-b border-[#E5E5DF] last:border-b-0 hover:bg-[#F5F5F0] transition-colors"
                        >
                          <div className="w-10 h-10 bg-[#0F3057]/10 flex items-center justify-center shrink-0">
                            <LessonIcon className="h-5 w-5 text-[#0F3057]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[#0F3057] font-medium">{lesson.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-[#5C636A] capitalize">{lesson.type}</span>
                              <span className="text-xs text-[#E5A93C]">{lesson.time}</span>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#5C636A]" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Project */}
      <section className="py-16 bg-[#0F3057]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="h-8 w-8 text-[#E5A93C]" />
            <h2 className="font-heading text-3xl text-white">Final Project</h2>
          </div>
          <h3 className="font-heading text-2xl text-[#E5A93C] mb-4">{path.finalProject.title}</h3>
          <p className="text-white/80 text-lg mb-8">{path.finalProject.description}</p>
          
          <div className="space-y-4">
            {path.finalProject.prompts.map((prompt, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-white/10">
                <span className="w-8 h-8 bg-[#E5A93C] text-[#0A1015] flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                <p className="text-white/90">{prompt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Path */}
      {slug !== 'aspiring-collector' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-heading text-2xl text-[#0F3057] mb-4">Ready for the Next Level?</h2>
            <p className="text-[#5C636A] mb-8">
              Once you complete this path, continue your journey with the next level.
            </p>
            <Link to={`/education/paths/${slug === 'curious-beginner' ? 'active-learner' : 'aspiring-collector'}`}>
              <Button className="bg-[#0F3057] text-white rounded-none px-8 py-4 hover:bg-[#0F3057]/90">
                View Next Path: {slug === 'curious-beginner' ? 'The Active Learner' : 'The Aspiring Collector'}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};
