// =============================================
// ART STORIES & MYSTERIES
// Fascinating narratives that make art come alive
// =============================================

export const artStories = [
  // STOLEN MASTERPIECES
  { 
    slug: 'mona-lisa-theft', 
    title: 'The Day Mona Lisa Vanished',
    category: 'Stolen Masterpieces',
    year: 1911,
    readTime: '8 min',
    teaser: 'An Italian handyman walked out of the Louvre with the world\'s most famous painting under his coat.',
    story: 'On August 21, 1911, Vincenzo Peruggia hid in a closet overnight, removed the Mona Lisa from the wall, hid it under his coat, and simply walked out. The theft wasn\'t discovered until the next day. For two years, the painting hung in his apartment near the Louvre. Peruggia believed he was returning the painting to Italy. He was caught trying to sell it to a gallery in Florence.',
    outcome: 'The painting was returned to the Louvre in 1914. The theft actually made the Mona Lisa the most famous painting in the world.',
    relatedArtwork: 'Mona Lisa by Leonardo da Vinci'
  },
  { 
    slug: 'gardner-heist', 
    title: 'The $500 Million Museum Heist',
    category: 'Stolen Masterpieces',
    year: 1990,
    readTime: '10 min',
    teaser: 'Two men dressed as police officers pulled off the largest art theft in history. The works are still missing.',
    story: 'On March 18, 1990, two thieves disguised as Boston police officers talked their way into the Isabella Stewart Gardner Museum. They tied up the guards and spent 81 minutes selecting 13 works worth $500 million, including Vermeer\'s The Concert and Rembrandt\'s Storm on the Sea of Galilee.',
    outcome: 'Despite a $10 million reward, none of the 13 works have been recovered. The empty frames still hang in the museum, waiting.',
    relatedArtwork: 'The Concert by Johannes Vermeer'
  },
  { 
    slug: 'scream-stolen', 
    title: 'The Scream: Stolen Twice',
    category: 'Stolen Masterpieces',
    year: '1994 & 2004',
    readTime: '7 min',
    teaser: 'Munch\'s iconic painting was stolen not once, but twice from Norwegian museums.',
    story: 'In 1994, thieves broke through a window during the Winter Olympics opening ceremony while all of Norway was distracted. They left a note: "Thanks for the poor security." In 2004, armed gunmen took both The Scream and Madonna in broad daylight from the Munch Museum.',
    outcome: 'Both paintings were recovered. The 1994 version in a sting operation. The 2004 version two years later with some damage.',
    relatedArtwork: 'The Scream by Edvard Munch'
  },
  { 
    slug: 'nazi-looting', 
    title: 'Hitler\'s Art Obsession',
    category: 'Stolen Masterpieces',
    year: '1933-1945',
    readTime: '12 min',
    teaser: 'The Nazis systematically looted over 650,000 artworks. Many are still missing.',
    story: 'Hitler, a failed artist himself, planned a massive museum in Linz, Austria. The Nazis established special units to confiscate art from Jewish families, museums, and churches across Europe. The Monuments Men raced to save what they could.',
    outcome: 'While many works were recovered, an estimated 100,000 are still missing. Families continue to fight for restitution today.',
    relatedArtwork: 'Portrait of Adele Bloch-Bauer I by Gustav Klimt'
  },
  { 
    slug: 'theft-to-ransom', 
    title: 'The Picasso Ransom',
    category: 'Stolen Masterpieces',
    year: 2010,
    readTime: '6 min',
    teaser: 'A thief stole five masterpieces from the Paris Museum of Modern Art, then tried to throw them in the trash.',
    story: 'Vjeran Tomic, known as "Spider-Man" for his climbing abilities, broke through a window and stole five paintings including works by Picasso, Matisse, and Modigliani worth €100 million. When he couldn\'t sell them, he panicked and tried to dispose of them.',
    outcome: 'The paintings were found in a suitcase. All were recovered, though some were damaged.',
    relatedArtwork: 'Le pigeon aux petits pois by Pablo Picasso'
  },

  // ART FORGERIES
  { 
    slug: 'van-meegeren-vermeer', 
    title: 'The Man Who Fooled the Nazis',
    category: 'Famous Forgeries',
    year: 1945,
    readTime: '10 min',
    teaser: 'Han van Meegeren sold a fake Vermeer to Hermann Göring. To avoid execution for collaboration, he had to prove he was a forger.',
    story: 'Dutch artist Han van Meegeren was so bitter about critics that he decided to fool them. He created fake Vermeers so convincing that museums and experts fought to buy them. When one was found in Göring\'s collection after the war, van Meegeren was arrested for selling Dutch heritage to the enemy.',
    outcome: 'Van Meegeren had to paint another "Vermeer" in front of witnesses to prove his forgery skills. He became a folk hero for tricking the Nazis.',
    relatedArtwork: 'Christ at Emmaus (forgery)'
  },
  { 
    slug: 'beltracchi-forgeries', 
    title: 'The Forger Who Invented Artists',
    category: 'Famous Forgeries',
    year: 2011,
    readTime: '8 min',
    teaser: 'Wolfgang Beltracchi didn\'t just copy paintings — he created "lost works" by famous artists that had never existed.',
    story: 'Beltracchi and his wife created over 300 forgeries worth $45 million. He invented entire periods of artists\' careers, creating works they might have made but never did. His downfall? Using a white paint with titanium dioxide that wasn\'t available until after WWII.',
    outcome: 'He served three years in prison. His own paintings now sell for high prices. He gives lectures on how to spot fakes.',
    relatedArtwork: 'Red Picture with Horses (fake Max Ernst)'
  },
  { 
    slug: 'elmyr-de-hory', 
    title: 'The Greatest Art Forger of the 20th Century',
    category: 'Famous Forgeries',
    year: '1946-1976',
    readTime: '9 min',
    teaser: 'Elmyr de Hory forged over 1,000 works by Picasso, Matisse, and Modigliani. Many still hang in museums today.',
    story: 'Hungarian-born de Hory could reproduce the styles of modern masters so perfectly that experts couldn\'t agree on which works were fake. He lived lavishly in Ibiza, became the subject of an Orson Welles documentary, and maintained that he was simply a better artist than those who rejected his original work.',
    outcome: 'He committed suicide when faced with extradition. No one knows how many of his forgeries remain in collections.',
    relatedArtwork: 'Various Picasso and Matisse forgeries'
  },

  // LOST AND FOUND
  { 
    slug: 'caravaggio-attic', 
    title: 'The $100 Million Attic Discovery',
    category: 'Lost & Found',
    year: 2014,
    readTime: '7 min',
    teaser: 'A family found a Caravaggio worth $100 million in their attic in France.',
    story: 'When water leaked through the ceiling, a family in Toulouse discovered a dusty painting they\'d never noticed. Experts believe it\'s Caravaggio\'s Judith Beheading Holofernes, painted around 1607 and lost for centuries.',
    outcome: 'The painting was classified as a national treasure by France. The family was able to sell it privately for an undisclosed sum estimated at over $100 million.',
    relatedArtwork: 'Judith Beheading Holofernes by Caravaggio'
  },
  { 
    slug: 'klimt-hidden-wall', 
    title: 'The Klimt Hidden in Plain Sight',
    category: 'Lost & Found',
    year: 2019,
    readTime: '6 min',
    teaser: 'A gardener clearing ivy found a Klimt stolen 20 years earlier — hidden in the museum\'s own wall.',
    story: 'In 1997, Portrait of a Lady by Klimt was stolen from the Ricci Oddi Gallery in Piacenza. Twenty-two years later, a gardener clearing a wall found a hidden panel. Behind it: the stolen painting, stored in the gallery\'s own exterior wall all along.',
    outcome: 'The painting, worth €60-100 million, was authenticated and returned to the gallery. Who hid it there remains unknown.',
    relatedArtwork: 'Portrait of a Lady by Gustav Klimt'
  },
  { 
    slug: 'michelangelo-drawing', 
    title: 'The $100 Michelangelo Drawing',
    category: 'Lost & Found',
    year: 2019,
    readTime: '5 min',
    teaser: 'A collector bought a drawing for under $100 at an estate sale. Experts believe it\'s by Michelangelo.',
    story: 'An anonymous collector purchased a small pen-and-ink drawing at an estate sale. After years of research, specialists at the Met attributed it to Michelangelo — a study for the Sistine Chapel ceiling.',
    outcome: 'The drawing is now valued at potentially millions. It demonstrates why art experts always check estate sales.',
    relatedArtwork: 'Study for Sistine Chapel by Michelangelo (attributed)'
  },

  // ARTIST RIVALRIES
  { 
    slug: 'picasso-matisse', 
    title: 'Picasso vs. Matisse: The Rivalry That Changed Art',
    category: 'Artist Rivalries',
    year: '1906-1954',
    readTime: '10 min',
    teaser: 'Two artists pushing each other to greater heights while publicly downplaying each other\'s work.',
    story: 'When Picasso and Matisse met in 1906, modern art was born from their competition. Picasso would paint a revolutionary work, Matisse would respond. They collected each other\'s art, visited each other\'s studios, and drove each other to ever more radical experiments.',
    outcome: 'Their rivalry produced Cubism, Fauvism, and the foundations of modern art. When Matisse died, Picasso was devastated.',
    relatedArtwork: 'Les Demoiselles d\'Avignon by Picasso / The Joy of Life by Matisse'
  },
  { 
    slug: 'michelangelo-raphael', 
    title: 'The Vatican Showdown',
    category: 'Artist Rivalries',
    year: '1508-1512',
    readTime: '8 min',
    teaser: 'While Michelangelo painted the Sistine ceiling, his rival Raphael painted the rooms below. They despised each other.',
    story: 'Pope Julius II hired both artists to work in the Vatican simultaneously. Michelangelo accused Raphael of stealing his ideas. Raphael painted a caricature of Michelangelo as the gloomy philosopher Heraclitus in The School of Athens.',
    outcome: 'Both artists created masterpieces driven by competition. Michelangelo outlived Raphael by 44 years but never forgot the rivalry.',
    relatedArtwork: 'Sistine Chapel Ceiling vs. The School of Athens'
  },
  { 
    slug: 'caravaggio-baglione', 
    title: 'The Lawsuit Between Artists',
    category: 'Artist Rivalries',
    year: 1603,
    readTime: '7 min',
    teaser: 'Caravaggio wrote obscene poems about a rival artist and ended up in court for libel.',
    story: 'Giovanni Baglione painted a Divine Love in response to Caravaggio\'s profane works. Caravaggio and his friends responded with vulgar poems calling Baglione\'s work worthless. Baglione sued for libel, and the trial records give us rare insight into the Roman art world.',
    outcome: 'Caravaggio avoided serious punishment but made enemies who may have contributed to his later troubles.',
    relatedArtwork: 'Divine Love by Baglione / Love Victorious by Caravaggio'
  },

  // MYSTERIES
  { 
    slug: 'girl-pearl-mystery', 
    title: 'Who Was the Girl With a Pearl Earring?',
    category: 'Art Mysteries',
    year: 1665,
    readTime: '7 min',
    teaser: 'Vermeer\'s most famous painting shows a girl we cannot identify. Was she his daughter, maid, or lover?',
    story: 'Unlike traditional portraits, this painting has no documented subject. The pearl is impossibly large — real pearls this size didn\'t exist. Some believe she was Vermeer\'s daughter Maria, others his maid. The novel and film invented a romance.',
    outcome: 'We will never know her identity. The mystery is part of the painting\'s enduring fascination.',
    relatedArtwork: 'Girl with a Pearl Earring by Johannes Vermeer'
  },
  { 
    slug: 'mona-lisa-smile', 
    title: 'Why Is the Mona Lisa Smiling?',
    category: 'Art Mysteries',
    year: 1503,
    readTime: '8 min',
    teaser: 'The most analyzed smile in history still defies explanation.',
    story: 'Leonardo used sfumato technique to make the corners of her mouth disappear into shadow. Depending on where you look, she seems happy, sad, or knowing. Scientists have used facial recognition software, but the mystery persists.',
    outcome: 'The ambiguity is intentional. Leonardo wanted viewers to project their own emotions onto her face.',
    relatedArtwork: 'Mona Lisa by Leonardo da Vinci'
  },
  { 
    slug: 'van-gogh-ear', 
    title: 'Why Did Van Gogh Cut Off His Ear?',
    category: 'Art Mysteries',
    year: 1888,
    readTime: '9 min',
    teaser: 'The famous story may not be what really happened that night in Arles.',
    story: 'The traditional story: Van Gogh, in a fit of madness after arguing with Gauguin, cut off his own ear. But some historians believe Gauguin, a skilled fencer, actually severed it during a confrontation, and both agreed to keep it secret.',
    outcome: 'We may never know the truth. What we do know is that Van Gogh painted some of his greatest works in the months after.',
    relatedArtwork: 'Self-Portrait with Bandaged Ear by Vincent van Gogh'
  },
  { 
    slug: 'nighthawks-location', 
    title: 'Does the Nighthawks Diner Exist?',
    category: 'Art Mysteries',
    year: 1942,
    readTime: '6 min',
    teaser: 'Hopper said the diner was based on a real place in Greenwich Village. But there\'s no door.',
    story: 'Hopper claimed Nighthawks was inspired by a diner on Greenwich Avenue in Manhattan. But the painting shows no entrance — only continuous glass. The diner is a trap with no escape, reflecting wartime anxiety.',
    outcome: 'The specific diner was probably demolished. The painting captures a feeling, not a place.',
    relatedArtwork: 'Nighthawks by Edward Hopper'
  },

  // SCANDALS
  { 
    slug: 'whistlers-mother-scandal', 
    title: 'The Painting No One Wanted',
    category: 'Art Scandals',
    year: 1871,
    readTime: '6 min',
    teaser: 'Whistler\'s Mother was almost rejected from the Royal Academy and called "vulgar."',
    story: 'When Whistler submitted his portrait, the Royal Academy nearly refused it. Critics called it dull and unfinished. Whistler fought for its acceptance, insisting the title was "Arrangement in Grey and Black No.1" — it was about form, not sentiment.',
    outcome: 'It became one of the most recognized American paintings, bought by France and considered a national treasure.',
    relatedArtwork: 'Arrangement in Grey and Black No.1 (Whistler\'s Mother)'
  },
  { 
    slug: 'duchamp-urinal', 
    title: 'When a Urinal Became Art',
    category: 'Art Scandals',
    year: 1917,
    readTime: '7 min',
    teaser: 'Marcel Duchamp submitted a urinal to an art exhibition. It changed everything.',
    story: 'Duchamp purchased a standard urinal, signed it "R. Mutt," and submitted it to the Society of Independent Artists exhibition (which claimed to accept all works). When they rejected it, he resigned from the board and sparked a debate about what art can be.',
    outcome: 'Fountain is now considered one of the most influential artworks of the 20th century. The original was lost; replicas sell for millions.',
    relatedArtwork: 'Fountain by Marcel Duchamp'
  },
  { 
    slug: 'manet-olympia', 
    title: 'The Painting That Caused a Riot',
    category: 'Art Scandals',
    year: 1865,
    readTime: '8 min',
    teaser: 'Manet\'s Olympia was so shocking that guards had to protect it from angry viewers.',
    story: 'Olympia depicted a nude woman (clearly a prostitute) staring boldly at the viewer. Her confrontational gaze, rather than the coy poses of traditional nudes, scandalized Paris. Critics called it "vulgar" and "immoral."',
    outcome: 'The painting is now seen as a pivotal moment in modern art — the birth of the artist challenging viewers rather than pleasing them.',
    relatedArtwork: 'Olympia by Édouard Manet'
  }
];

// Story categories
export const storyCategories = [
  { slug: 'stolen-masterpieces', name: 'Stolen Masterpieces', count: 5, icon: '🎭', color: 'bg-[#B64E33]' },
  { slug: 'famous-forgeries', name: 'Famous Forgeries', count: 3, icon: '🖌️', color: 'bg-[#7C3A5A]' },
  { slug: 'lost-and-found', name: 'Lost & Found', count: 3, icon: '🔍', color: 'bg-[#2D5A43]' },
  { slug: 'artist-rivalries', name: 'Artist Rivalries', count: 3, icon: '⚔️', color: 'bg-[#0F3057]' },
  { slug: 'art-mysteries', name: 'Art Mysteries', count: 4, icon: '❓', color: 'bg-[#744210]' },
  { slug: 'art-scandals', name: 'Art Scandals', count: 3, icon: '💥', color: 'bg-[#4A5568]' }
];
