// =============================================
// LEARNING PATHS DATA
// Curated sequences for different experience levels
// =============================================

export const learningPaths = [
  {
    slug: 'curious-beginner',
    name: 'The Curious Beginner',
    tagline: 'From "I like art" to "I understand art"',
    level: 'Beginner',
    duration: '2-3 weeks',
    description: 'Perfect for anyone who enjoys art but wants to understand it better. No prior knowledge needed.',
    outcomes: [
      'Confidently look at any painting and know where to start',
      'Understand basic art vocabulary without feeling intimidated',
      'Recognize emotional content in artwork',
      'Know the major art movements at a glance',
      'Feel comfortable in any gallery or museum'
    ],
    color: 'from-[#2D5A43] to-[#1E3D2E]',
    icon: 'Sprout',
    modules: [
      {
        week: 1,
        title: 'Learning to See',
        description: 'Build the foundation of art appreciation',
        lessons: [
          { name: 'How to Read a Painting in 5 Minutes', path: '/education/beginner/read-art/how-to-read-painting', type: 'guide', time: '5 min' },
          { name: 'What to Look at First', path: '/education/beginner/read-art/what-to-look-first', type: 'guide', time: '5 min' },
          { name: 'Colors Tell Stories', path: '/education/beginner/read-art/colors-tell-stories', type: 'guide', time: '5 min' },
          { name: 'Practice: Look at Starry Night', path: '/education/practice/look-at/starry-night-exercise', type: 'exercise', time: '10 min' },
          { name: 'Joy in Paintings', path: '/education/beginner/emotions/joy-in-paintings', type: 'guide', time: '5 min' },
          { name: 'Sadness in Paintings', path: '/education/beginner/emotions/sadness-in-paintings', type: 'guide', time: '5 min' }
        ]
      },
      {
        week: 2,
        title: 'Understanding Artists',
        description: 'Learn why artists make the choices they do',
        lessons: [
          { name: 'Why Do Artists Distort Faces?', path: '/education/beginner/artist-intent/why-distort-faces', type: 'guide', time: '5 min' },
          { name: 'Why So Dark?', path: '/education/beginner/artist-intent/why-so-dark', type: 'guide', time: '5 min' },
          { name: 'Why Bright Colors?', path: '/education/beginner/artist-intent/why-bright-colors', type: 'guide', time: '5 min' },
          { name: 'Practice: Look at Mona Lisa', path: '/education/practice/look-at/mona-lisa-exercise', type: 'exercise', time: '8 min' },
          { name: 'Compare: Mystery Portraits', path: '/education/practice/compare/portraits-compare', type: 'exercise', time: '10 min' },
          { name: 'Mona Lisa Explained Simply', path: '/education/beginner/famous-simple/mona-lisa-simple', type: 'guide', time: '5 min' }
        ]
      },
      {
        week: 3,
        title: 'Gallery Ready',
        description: 'Everything you need for confident gallery visits',
        lessons: [
          { name: 'Art Movements Cheat Sheet', path: '/education/reference/movements-cheatsheet', type: 'reference', time: '10 min' },
          { name: 'Art Terms Pocket Guide', path: '/education/reference/terms-pocket-guide', type: 'reference', time: '8 min' },
          { name: 'Symbol: Light', path: '/education/beginner/symbols/symbol-light', type: 'guide', time: '5 min' },
          { name: 'Symbol: Water', path: '/education/beginner/symbols/symbol-water', type: 'guide', time: '5 min' },
          { name: 'How to Talk About Art at Galleries', path: '/education/collector/talk-about-art', type: 'guide', time: '8 min' },
          { name: 'Art by Mood: Finding Calm', path: '/education/practice/mood/art-for-calm', type: 'guide', time: '5 min' }
        ]
      }
    ],
    finalProject: {
      title: 'Your First Gallery Visit',
      description: 'Visit a local gallery or museum. Spend 30 minutes with just 3 paintings. Use what you learned to really see them.',
      prompts: [
        'Pick three paintings that draw you in',
        'Spend 10 minutes with each',
        'Notice colors, light, composition',
        'Identify the emotion the artist is conveying',
        'Ask yourself: why did the artist make these choices?'
      ]
    }
  },
  {
    slug: 'active-learner',
    name: 'The Active Learner',
    tagline: 'From appreciation to deep understanding',
    level: 'Intermediate',
    duration: '4-6 weeks',
    description: 'For those who already enjoy art and want to develop a more sophisticated eye and deeper knowledge.',
    outcomes: [
      'Analyze composition and technique like an art student',
      'Understand art history well enough to date paintings',
      'Compare and contrast artworks meaningfully',
      'Recognize the signature styles of major artists',
      'Engage in informed conversations about art'
    ],
    color: 'from-[#B64E33] to-[#8B3A28]',
    icon: 'Flame',
    modules: [
      {
        week: 1,
        title: 'Mastering Composition',
        description: 'Learn to see how artists organize visual elements',
        lessons: [
          { name: 'Composition Rules at a Glance', path: '/education/reference/composition-rules', type: 'reference', time: '10 min' },
          { name: 'Follow the Lines', path: '/education/beginner/read-art/follow-the-lines', type: 'guide', time: '5 min' },
          { name: 'Spot: Golden Ratio', path: '/education/practice/spot-technique/spot-golden-ratio', type: 'exercise', time: '10 min' },
          { name: 'Spot: Rule of Thirds', path: '/education/practice/spot-technique/spot-rule-thirds', type: 'exercise', time: '10 min' },
          { name: 'Walkthrough: Reading Guernica', path: '/education/practice/walkthroughs/walkthrough-guernica', type: 'exercise', time: '15 min' }
        ]
      },
      {
        week: 2,
        title: 'Technical Eye',
        description: 'Learn to identify and appreciate artistic techniques',
        lessons: [
          { name: 'Reading Brush Strokes', path: '/education/reference/brush-strokes-guide', type: 'reference', time: '8 min' },
          { name: 'Spot: Chiaroscuro', path: '/education/practice/spot-technique/spot-chiaroscuro', type: 'exercise', time: '10 min' },
          { name: 'Spot: Sfumato', path: '/education/practice/spot-technique/spot-sfumato', type: 'exercise', time: '10 min' },
          { name: 'Spot: Impasto', path: '/education/practice/spot-technique/spot-impasto', type: 'exercise', time: '10 min' },
          { name: 'Compare: Impressionism vs Post-Impressionism', path: '/education/practice/compare/impressionist-vs-post', type: 'exercise', time: '12 min' }
        ]
      },
      {
        week: 3,
        title: 'Art History Journey',
        description: 'Understand how art evolved through time',
        lessons: [
          { name: 'Renaissance Simple', path: '/education/beginner/history-simple/renaissance-simple', type: 'guide', time: '5 min' },
          { name: 'Baroque Simple', path: '/education/beginner/history-simple/baroque-simple', type: 'guide', time: '5 min' },
          { name: 'Impressionism Simple', path: '/education/beginner/history-simple/impressionism-simple', type: 'guide', time: '5 min' },
          { name: 'Expressionism Simple', path: '/education/beginner/history-simple/expressionism-simple', type: 'guide', time: '5 min' },
          { name: 'Famous Artists Timeline', path: '/education/reference/famous-timeline', type: 'reference', time: '10 min' },
          { name: 'Compare: Madonna Through Time', path: '/education/practice/compare/madonna-compare', type: 'exercise', time: '12 min' }
        ]
      },
      {
        week: 4,
        title: 'Masterpiece Deep Dives',
        description: 'Comprehensive analysis of iconic works',
        lessons: [
          { name: 'Walkthrough: Starry Night', path: '/education/practice/walkthroughs/walkthrough-starry-night', type: 'exercise', time: '15 min' },
          { name: 'Walkthrough: Mona Lisa', path: '/education/practice/walkthroughs/walkthrough-mona-lisa', type: 'exercise', time: '12 min' },
          { name: 'Walkthrough: Persistence of Memory', path: '/education/practice/walkthroughs/walkthrough-persistence', type: 'exercise', time: '12 min' },
          { name: 'Compare: Two Starry Nights', path: '/education/practice/compare/starry-nights-compare', type: 'exercise', time: '10 min' },
          { name: 'Compare: Art Against War', path: '/education/practice/compare/war-compare', type: 'exercise', time: '12 min' }
        ]
      }
    ],
    finalProject: {
      title: 'Comparative Analysis Essay',
      description: 'Choose two artworks from different periods that share a theme. Write a 500-word comparison.',
      prompts: [
        'How does each artwork approach the theme?',
        'What techniques does each artist use?',
        'How does historical context affect the work?',
        'Which is more effective and why?',
        'What would each artist think of the others work?'
      ]
    }
  },
  {
    slug: 'aspiring-collector',
    name: 'The Aspiring Collector',
    tagline: 'From admirer to informed collector',
    level: 'Advanced',
    duration: '6-8 weeks',
    description: 'For those considering art collecting or wanting to engage with the art market professionally.',
    outcomes: [
      'Evaluate artwork quality and authenticity',
      'Understand art market dynamics and pricing',
      'Build meaningful relationships with galleries',
      'Start and maintain a personal collection',
      'Navigate auctions and art fairs confidently'
    ],
    color: 'from-[#0F3057] to-[#1A365D]',
    icon: 'Crown',
    modules: [
      {
        week: 1,
        title: 'Collector Foundations',
        description: 'Essential knowledge before your first purchase',
        lessons: [
          { name: 'Building Your First Collection', path: '/education/collector/building-first-collection', type: 'guide', time: '10 min' },
          { name: 'Understanding Art Pricing', path: '/education/collector/understanding-pricing', type: 'guide', time: '15 min' },
          { name: 'Art as Investment: Reality Check', path: '/education/collector/art-as-investment', type: 'guide', time: '15 min' },
          { name: 'Questions to Ask Before Buying', path: '/education/collector/questions-before-buying', type: 'guide', time: '12 min' }
        ]
      },
      {
        week: 2,
        title: 'The Art World',
        description: 'Navigate galleries, fairs, and auctions',
        lessons: [
          { name: 'How to Talk About Art at Galleries', path: '/education/collector/talk-about-art', type: 'guide', time: '8 min' },
          { name: 'Navigating Art Fairs Like a Pro', path: '/education/collector/art-fairs-guide', type: 'guide', time: '10 min' },
          { name: 'Auctions Explained for Beginners', path: '/education/collector/auctions-explained', type: 'guide', time: '15 min' },
          { name: 'Buying Art Online Safely', path: '/education/collector/online-buying', type: 'guide', time: '10 min' }
        ]
      },
      {
        week: 3,
        title: 'Finding Your Artists',
        description: 'Discover and evaluate emerging talent',
        lessons: [
          { name: 'Spotting Emerging Talent', path: '/education/collector/spotting-emerging-talent', type: 'guide', time: '12 min' },
          { name: 'Color Psychology in Art', path: '/education/reference/color-psychology', type: 'reference', time: '10 min' },
          { name: 'Compare: Into Abstraction', path: '/education/practice/compare/abstraction-compare', type: 'exercise', time: '12 min' },
          { name: 'Art by Mood: For Deep Thinking', path: '/education/practice/mood/art-for-thinking', type: 'guide', time: '8 min' }
        ]
      },
      {
        week: 4,
        title: 'Care and Curation',
        description: 'Protect and display your collection',
        lessons: [
          { name: 'Caring for Your Art Collection', path: '/education/collector/caring-for-collection', type: 'guide', time: '12 min' },
          { name: 'Composition Rules at a Glance', path: '/education/reference/composition-rules', type: 'reference', time: '10 min' },
          { name: 'Spot: Glazing', path: '/education/practice/spot-technique/spot-glazing', type: 'exercise', time: '10 min' },
          { name: 'Spot: Lost and Found Edges', path: '/education/practice/spot-technique/spot-lost-edges', type: 'exercise', time: '10 min' }
        ]
      }
    ],
    finalProject: {
      title: 'Create Your Collection Plan',
      description: 'Develop a 12-month plan for starting or expanding your collection.',
      prompts: [
        'Define your budget (monthly and annual)',
        'Identify 3-5 artists or styles you want to collect',
        'List 5 galleries you will build relationships with',
        'Plan to attend 2 art fairs this year',
        'Set goals: first purchase, first relationship, first auction'
      ]
    }
  }
];

// Quick stats for display
export const pathStats = {
  totalLessons: 78,
  totalTime: '12-16 hours',
  paths: 3,
  levels: ['Beginner', 'Intermediate', 'Advanced']
};
