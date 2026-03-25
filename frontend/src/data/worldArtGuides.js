// =============================================
// WORLD ART SCENE GUIDES
// City-by-city guides for art lovers
// =============================================

export const worldArtGuides = [
  // EUROPE
  { 
    slug: 'paris-art-guide', 
    city: 'Paris', 
    country: 'France', 
    region: 'Europe',
    tagline: 'The eternal capital of art',
    description: 'From the Louvre to Montmartre, Paris remains the heart of the art world.',
    mustSee: ['Louvre Museum', 'Musée d\'Orsay', 'Centre Pompidou', 'Musée de l\'Orangerie', 'Musée Rodin'],
    hiddenGems: ['Musée Jacquemart-André', 'Atelier des Lumières', 'Palais de Tokyo', 'La Maison Rouge'],
    neighborhoods: ['Le Marais - Contemporary galleries', 'Saint-Germain - Classic dealers', 'Belleville - Emerging artists'],
    bestTime: 'September-November for gallery openings',
    insiderTip: 'Visit the Louvre on Wednesday or Friday evenings when it stays open until 9:45 PM with smaller crowds.'
  },
  { 
    slug: 'london-art-guide', 
    city: 'London', 
    country: 'United Kingdom', 
    region: 'Europe',
    tagline: 'Where tradition meets contemporary',
    description: 'London offers everything from Old Masters to cutting-edge contemporary in world-class institutions.',
    mustSee: ['National Gallery', 'Tate Modern', 'Tate Britain', 'Victoria & Albert Museum', 'British Museum'],
    hiddenGems: ['Whitechapel Gallery', 'Serpentine Galleries', 'Wallace Collection', 'Dulwich Picture Gallery'],
    neighborhoods: ['Mayfair - Blue-chip galleries', 'Shoreditch - Street art & emerging', 'South Bank - Museums mile'],
    bestTime: 'October for Frieze London art fair',
    insiderTip: 'Most major museums are free. Start at the National Gallery for Old Masters, walk across the Millennium Bridge to Tate Modern for contemporary.'
  },
  { 
    slug: 'florence-art-guide', 
    city: 'Florence', 
    country: 'Italy', 
    region: 'Europe',
    tagline: 'Birthplace of the Renaissance',
    description: 'Walk the same streets as Michelangelo and Leonardo in this open-air museum of Renaissance art.',
    mustSee: ['Uffizi Gallery', 'Accademia Gallery', 'Palazzo Pitti', 'Bargello Museum', 'Duomo'],
    hiddenGems: ['Brancacci Chapel', 'San Marco Museum', 'Palazzo Medici Riccardi', 'Museo dell\'Opera del Duomo'],
    neighborhoods: ['Centro Storico - Major museums', 'Oltrarno - Artisan workshops', 'San Lorenzo - Art markets'],
    bestTime: 'March-May or September-October to avoid summer crowds',
    insiderTip: 'Book Uffizi tickets months in advance. Visit the Accademia early morning to see David without crowds.'
  },
  { 
    slug: 'amsterdam-art-guide', 
    city: 'Amsterdam', 
    country: 'Netherlands', 
    region: 'Europe',
    tagline: 'Dutch Masters and Van Gogh',
    description: 'Home to Rembrandt, Vermeer, and Van Gogh, Amsterdam is essential for art lovers.',
    mustSee: ['Rijksmuseum', 'Van Gogh Museum', 'Stedelijk Museum', 'Rembrandt House', 'Anne Frank House'],
    hiddenGems: ['Foam Photography Museum', 'Hermitage Amsterdam', 'Museum Het Schip', 'NDSM Wharf galleries'],
    neighborhoods: ['Museum Quarter - The big three', 'Jordaan - Small galleries', 'NDSM - Industrial art spaces'],
    bestTime: 'April-May for tulip season and lighter crowds',
    insiderTip: 'Get the Museumkaart for unlimited access to 400+ museums if staying more than 3 days.'
  },
  { 
    slug: 'berlin-art-guide', 
    city: 'Berlin', 
    country: 'Germany', 
    region: 'Europe',
    tagline: 'Raw, edgy, and always evolving',
    description: 'Berlin\'s turbulent history created a unique art scene that\'s constantly reinventing itself.',
    mustSee: ['Museum Island', 'Hamburger Bahnhof', 'Neue Nationalgalerie', 'East Side Gallery', 'KW Institute'],
    hiddenGems: ['Sammlung Boros', 'Urban Nation Museum', 'me Collectors Room', 'Künstlerhaus Bethanien'],
    neighborhoods: ['Mitte - Established galleries', 'Kreuzberg - Street art', 'Wedding - Artist studios'],
    bestTime: 'September for Berlin Art Week',
    insiderTip: 'Book the Sammlung Boros bunker tour weeks in advance - it\'s a private collection in a WWII bunker.'
  },
  { 
    slug: 'madrid-art-guide', 
    city: 'Madrid', 
    country: 'Spain', 
    region: 'Europe',
    tagline: 'The Golden Triangle of Art',
    description: 'Three world-class museums within walking distance make Madrid an art lover\'s paradise.',
    mustSee: ['Prado Museum', 'Reina Sofía', 'Thyssen-Bornemisza', 'Royal Palace', 'CaixaForum'],
    hiddenGems: ['Sorolla Museum', 'Lázaro Galdiano Museum', 'Real Academia de Bellas Artes', 'Matadero Madrid'],
    neighborhoods: ['Paseo del Arte - Museum mile', 'Malasaña - Alternative galleries', 'Lavapiés - Street art'],
    bestTime: 'February for ARCO art fair',
    insiderTip: 'The Prado is free Mon-Sat 6-8 PM and Sundays 5-7 PM. Arrive 30 minutes early to queue.'
  },
  { 
    slug: 'vienna-art-guide', 
    city: 'Vienna', 
    country: 'Austria', 
    region: 'Europe',
    tagline: 'Imperial splendor and Klimt\'s gold',
    description: 'From Habsburg collections to Klimt and Schiele, Vienna bridges classical and modern.',
    mustSee: ['Kunsthistorisches Museum', 'Belvedere Palace', 'Leopold Museum', 'Albertina', 'mumok'],
    hiddenGems: ['Secession Building', 'Liechtenstein Garden Palace', 'Bank Austria Kunstforum', 'Kunst Haus Wien'],
    neighborhoods: ['MuseumsQuartier - Contemporary hub', 'Innere Stadt - Classical', 'Leopoldstadt - Emerging'],
    bestTime: 'June-September for outdoor events',
    insiderTip: 'The Belvedere has The Kiss by Klimt - visit at opening time before tour groups arrive.'
  },
  { 
    slug: 'rome-art-guide', 
    city: 'Rome', 
    country: 'Italy', 
    region: 'Europe',
    tagline: 'The Eternal City of art',
    description: 'Ancient, Renaissance, and Baroque masterpieces at every turn in this open-air museum.',
    mustSee: ['Vatican Museums', 'Sistine Chapel', 'Borghese Gallery', 'Capitoline Museums', 'MAXXI'],
    hiddenGems: ['Palazzo Doria Pamphilj', 'Galleria Spada', 'Palazzo Barberini', 'Palazzo Altemps'],
    neighborhoods: ['Vatican - Renaissance treasures', 'Centro Storico - Baroque churches', 'Testaccio - Contemporary'],
    bestTime: 'November-March for fewer tourists',
    insiderTip: 'Book Borghese Gallery 30 days ahead - only 360 visitors allowed per 2-hour slot.'
  },
  { 
    slug: 'barcelona-art-guide', 
    city: 'Barcelona', 
    country: 'Spain', 
    region: 'Europe',
    tagline: 'Gaudí, Picasso, and Miró',
    description: 'Catalan creativity shines through modernist architecture and world-class art museums.',
    mustSee: ['Picasso Museum', 'Fundació Joan Miró', 'MACBA', 'Sagrada Família', 'Park Güell'],
    hiddenGems: ['Fundació Antoni Tàpies', 'CaixaForum Barcelona', 'MNAC', 'Recinte Modernista Sant Pau'],
    neighborhoods: ['El Born - Picasso territory', 'Raval - Contemporary scene', 'Eixample - Modernist architecture'],
    bestTime: 'May or October for pleasant weather',
    insiderTip: 'The Picasso Museum is free Thursday evenings 6-9:30 PM and first Sunday of month.'
  },
  { 
    slug: 'venice-art-guide', 
    city: 'Venice', 
    country: 'Italy', 
    region: 'Europe',
    tagline: 'Biennale capital of the world',
    description: 'The Venice Biennale makes this floating city the center of contemporary art every two years.',
    mustSee: ['Peggy Guggenheim Collection', 'Gallerie dell\'Accademia', 'Palazzo Grassi', 'Punta della Dogana', 'Doge\'s Palace'],
    hiddenGems: ['Ca\' Pesaro', 'Scuola Grande di San Rocco', 'Fondazione Querini Stampalia', 'Naval History Museum'],
    neighborhoods: ['Dorsoduro - Museum quarter', 'Giardini - Biennale pavilions', 'Arsenale - Industrial art spaces'],
    bestTime: 'May-November during Biennale years (odd years)',
    insiderTip: 'During Biennale, buy the full pass to access both Giardini and Arsenale - it\'s worth every euro.'
  },

  // NORTH AMERICA
  { 
    slug: 'new-york-art-guide', 
    city: 'New York', 
    country: 'USA', 
    region: 'North America',
    tagline: 'The art capital of the Western world',
    description: 'More galleries than any city on Earth, plus museums that define art history.',
    mustSee: ['Metropolitan Museum of Art', 'MoMA', 'Guggenheim', 'Whitney Museum', 'Frick Collection'],
    hiddenGems: ['The Cloisters', 'Neue Galerie', 'Noguchi Museum', 'Dia:Beacon', 'Storm King Art Center'],
    neighborhoods: ['Chelsea - Gallery central (500+ galleries)', 'Lower East Side - Emerging', 'Upper East Side - Museums'],
    bestTime: 'March for Armory Show, September for gallery openings',
    insiderTip: 'Thursday nights Chelsea galleries stay open late with openings. Start at 24th Street and work your way down.'
  },
  { 
    slug: 'los-angeles-art-guide', 
    city: 'Los Angeles', 
    country: 'USA', 
    region: 'North America',
    tagline: 'West Coast art powerhouse',
    description: 'From Getty\'s hilltop fortress to downtown\'s emerging scene, LA is redefining American art.',
    mustSee: ['Getty Center', 'LACMA', 'The Broad', 'MOCA', 'Getty Villa'],
    hiddenGems: ['Hammer Museum', 'Marciano Art Foundation', 'Institute of Contemporary Art', 'Hauser & Wirth'],
    neighborhoods: ['Downtown - Museum row', 'Culver City - Galleries', 'Hollywood - Emerging spaces'],
    bestTime: 'January-March for LA Art Week',
    insiderTip: 'The Getty Center is free (just pay parking). Go at sunset for incredible views and Impressionist gardens.'
  },
  { 
    slug: 'chicago-art-guide', 
    city: 'Chicago', 
    country: 'USA', 
    region: 'North America',
    tagline: 'America\'s architectural art',
    description: 'World-class museums and architecture tours make Chicago essential for visual culture.',
    mustSee: ['Art Institute of Chicago', 'Museum of Contemporary Art', 'Millennium Park', 'Architecture River Cruise', 'Driehaus Museum'],
    hiddenGems: ['Smart Museum', 'Intuit Center', 'Wrightwood 659', 'Chicago Cultural Center'],
    neighborhoods: ['River North - Gallery district', 'West Loop - Emerging', 'Pilsen - Street art'],
    bestTime: 'September for EXPO Chicago',
    insiderTip: 'Art Institute is free for Illinois residents. Chicago residents under 18 always free.'
  },
  { 
    slug: 'mexico-city-art-guide', 
    city: 'Mexico City', 
    country: 'Mexico', 
    region: 'North America',
    tagline: 'Frida, Diego, and contemporary fire',
    description: 'From ancient murals to Frida Kahlo\'s blue house, Mexico City pulses with artistic energy.',
    mustSee: ['Museo Frida Kahlo', 'Palacio de Bellas Artes', 'Museo Nacional de Antropología', 'MUAC', 'Museo Soumaya'],
    hiddenGems: ['Museo Jumex', 'Museo Tamayo', 'Anahuacalli Museum', 'Casa Luis Barragán'],
    neighborhoods: ['Coyoacán - Frida territory', 'Roma/Condesa - Contemporary galleries', 'Centro Histórico - Murals'],
    bestTime: 'February for Zona Maco art fair',
    insiderTip: 'Book Frida Kahlo museum tickets online 2 weeks ahead. Go early on weekdays.'
  },
  { 
    slug: 'toronto-art-guide', 
    city: 'Toronto', 
    country: 'Canada', 
    region: 'North America',
    tagline: 'Canada\'s cultural capital',
    description: 'A growing art scene with major institutions and diverse emerging voices.',
    mustSee: ['Art Gallery of Ontario', 'Royal Ontario Museum', 'Bata Shoe Museum', 'Aga Khan Museum', 'Power Plant'],
    hiddenGems: ['Museum of Contemporary Art', 'Textile Museum', 'Gardiner Museum', 'Evergreen Brick Works'],
    neighborhoods: ['Yorkville - High-end galleries', 'Queen West - Emerging', 'Distillery District - Arts hub'],
    bestTime: 'September for Toronto International Art Fair',
    insiderTip: 'AGO is free Wednesday evenings 6-9 PM. The Gehry-designed expansion is worth the visit alone.'
  },

  // ASIA
  { 
    slug: 'tokyo-art-guide', 
    city: 'Tokyo', 
    country: 'Japan', 
    region: 'Asia',
    tagline: 'Where tradition meets future',
    description: 'From ancient scrolls to digital art labs, Tokyo bridges centuries of visual culture.',
    mustSee: ['TeamLab Borderless', 'Mori Art Museum', 'National Art Center', 'Tokyo National Museum', 'Nezu Museum'],
    hiddenGems: ['21_21 Design Sight', 'Yayoi Kusama Museum', 'Artizon Museum', 'Tokyo Metropolitan Teien Art Museum'],
    neighborhoods: ['Roppongi - Art Triangle', 'Ginza - Established galleries', 'Shibuya - Pop culture art'],
    bestTime: 'March-April for cherry blossoms or November for autumn',
    insiderTip: 'TeamLab requires advance tickets. Book 2 weeks ahead. Go on weekday evenings for smaller crowds.'
  },
  { 
    slug: 'hong-kong-art-guide', 
    city: 'Hong Kong', 
    country: 'China', 
    region: 'Asia',
    tagline: 'Asia\'s auction capital',
    description: 'Art Basel Hong Kong put this city on the global map as Asia\'s art market hub.',
    mustSee: ['M+ Museum', 'Hong Kong Museum of Art', 'Tai Kwun', 'Asia Society Hong Kong', 'PMQ'],
    hiddenGems: ['Para Site', 'Blindspot Gallery', 'Duddell\'s', 'Spring Workshop'],
    neighborhoods: ['Central - Blue chip galleries', 'Wong Chuk Hang - Industrial spaces', 'West Kowloon - M+ district'],
    bestTime: 'March for Art Basel Hong Kong',
    insiderTip: 'M+ is free on Fridays. Take the ferry to West Kowloon for the best approach to the museum.'
  },
  { 
    slug: 'singapore-art-guide', 
    city: 'Singapore', 
    country: 'Singapore', 
    region: 'Asia',
    tagline: 'Southeast Asia\'s art hub',
    description: 'A compact city with world-class museums and a thriving gallery scene.',
    mustSee: ['National Gallery Singapore', 'ArtScience Museum', 'Singapore Art Museum', 'Gillman Barracks', 'STPI'],
    hiddenGems: ['NUS Museum', 'The Private Museum', 'ION Art', 'Objectifs'],
    neighborhoods: ['Gillman Barracks - Gallery cluster', 'Bras Basah - Museum district', 'Little India - Street art'],
    bestTime: 'January for Singapore Art Week',
    insiderTip: 'National Gallery is in the former Supreme Court and City Hall - the architecture alone is worth visiting.'
  },
  { 
    slug: 'seoul-art-guide', 
    city: 'Seoul', 
    country: 'South Korea', 
    region: 'Asia',
    tagline: 'K-Art rises',
    description: 'Contemporary art powerhouse with stunning museum architecture and emerging Korean artists.',
    mustSee: ['Leeum Museum', 'MMCA Seoul', 'Dongdaemun Design Plaza', 'Arario Museum', 'Seoul Museum of Art'],
    hiddenGems: ['Bukchon traditional galleries', 'Pibi Gallery', 'Art Sonje Center', 'Ilmin Museum of Art'],
    neighborhoods: ['Samcheong-dong - Traditional meets contemporary', 'Hannam-dong - Blue chip', 'Seongsu-dong - Emerging'],
    bestTime: 'September for Frieze Seoul',
    insiderTip: 'Leeum has one of Asia\'s best collections. Book a docent tour to understand Korean art history.'
  },
  { 
    slug: 'beijing-art-guide', 
    city: 'Beijing', 
    country: 'China', 
    region: 'Asia',
    tagline: 'Ancient capital, contemporary explosion',
    description: 'From the Forbidden City to 798, Beijing spans millennia of Chinese art.',
    mustSee: ['798 Art District', 'Palace Museum', 'National Art Museum', 'UCCA Center', 'Pace Gallery Beijing'],
    hiddenGems: ['Red Gate Gallery', 'Caochangdi art village', 'Today Art Museum', 'Ullens Center'],
    neighborhoods: ['798 - Factory galleries', 'Caochangdi - Artist studios', 'Dashilan - Traditional arts'],
    bestTime: 'September-October for clear skies and art season',
    insiderTip: '798 can be overwhelming. Start at UCCA, then explore surrounding galleries. Plan a full day.'
  },

  // MIDDLE EAST
  { 
    slug: 'dubai-art-guide', 
    city: 'Dubai', 
    country: 'UAE', 
    region: 'Middle East',
    tagline: 'Desert oasis of global art',
    description: 'Mega-collectors and stunning architecture make Dubai a rising art destination.',
    mustSee: ['Louvre Abu Dhabi', 'Alserkal Avenue', 'Dubai Opera', 'Museum of the Future', 'Jameel Arts Centre'],
    hiddenGems: ['Tashkeel', 'Ishara Art Foundation', 'Warehouse421', 'Manarat Al Saadiyat'],
    neighborhoods: ['Alserkal Avenue - Gallery hub', 'DIFC - Art Nights', 'Al Quoz - Industrial arts'],
    bestTime: 'March for Art Dubai fair',
    insiderTip: 'Day trip to Louvre Abu Dhabi is essential. Go at sunset when Jean Nouvel\'s dome creates magical light patterns.'
  },
  { 
    slug: 'tel-aviv-art-guide', 
    city: 'Tel Aviv', 
    country: 'Israel', 
    region: 'Middle East',
    tagline: 'Mediterranean contemporary',
    description: 'A young, vibrant art scene with Bauhaus architecture and Mediterranean light.',
    mustSee: ['Tel Aviv Museum of Art', 'Design Museum Holon', 'Bauhaus Center', 'Ilana Goor Museum', 'Nahum Gutman Museum'],
    hiddenGems: ['CCA Tel Aviv', 'Sommer Contemporary', 'Dvir Gallery', 'Gordon Gallery'],
    neighborhoods: ['South Tel Aviv - Emerging', 'Jaffa - Historic galleries', 'White City - Bauhaus tours'],
    bestTime: 'May for Fresh Paint art fair',
    insiderTip: 'Take a Bauhaus architecture tour in the White City UNESCO area. End at the museum\'s sculpture garden.'
  },

  // OCEANIA
  { 
    slug: 'sydney-art-guide', 
    city: 'Sydney', 
    country: 'Australia', 
    region: 'Oceania',
    tagline: 'Where the Pacific meets contemporary',
    description: 'Indigenous art meets international contemporary in this harbor city.',
    mustSee: ['Art Gallery of NSW', 'Museum of Contemporary Art', 'White Rabbit Gallery', 'Carriageworks', 'Taronga Zoo sculpture trail'],
    hiddenGems: ['Brett Whiteley Studio', 'National Art School', 'Artspace', 'Firstdraft'],
    neighborhoods: ['Chippendale - Gallery cluster', 'Paddington - Established', 'Marrickville - Emerging'],
    bestTime: 'March for Sydney Biennale',
    insiderTip: 'MCA is free and has a rooftop sculpture terrace with harbor views. Visit at sunset.'
  },
  { 
    slug: 'melbourne-art-guide', 
    city: 'Melbourne', 
    country: 'Australia', 
    region: 'Oceania',
    tagline: 'Street art capital of the South',
    description: 'Laneways covered in street art and institutions celebrating Indigenous culture.',
    mustSee: ['NGV International', 'NGV Australia', 'ACCA', 'Heide Museum', 'Hosier Lane'],
    hiddenGems: ['Gertrude Contemporary', 'Sutton Gallery', 'TarraWarra Museum', 'Buxton Contemporary'],
    neighborhoods: ['CBD Laneways - Street art', 'Collingwood - Alternative', 'St Kilda - Emerging'],
    bestTime: 'November-March for summer exhibitions',
    insiderTip: 'Take a street art walking tour through the laneways. The art changes constantly, so repeat visits reveal new works.'
  },

  // SOUTH AMERICA
  { 
    slug: 'buenos-aires-art-guide', 
    city: 'Buenos Aires', 
    country: 'Argentina', 
    region: 'South America',
    tagline: 'The Paris of South America',
    description: 'Passionate art scene with European influences and Latin American fire.',
    mustSee: ['MALBA', 'Museo Nacional de Bellas Artes', 'Fundación Proa', 'Centro Cultural Kirchner', 'Usina del Arte'],
    hiddenGems: ['MACBA', 'Colección Fortabat', 'Fundación Costantini', 'Ruth Benzacar'],
    neighborhoods: ['La Boca - Street art', 'Palermo - Contemporary galleries', 'Recoleta - Classical'],
    bestTime: 'September for arteBA fair',
    insiderTip: 'La Boca is famous for colorful houses but visit Fundación Proa for serious contemporary art with harbor views.'
  },
  { 
    slug: 'sao-paulo-art-guide', 
    city: 'São Paulo', 
    country: 'Brazil', 
    region: 'South America',
    tagline: 'Brazil\'s concrete art jungle',
    description: 'Home to the world\'s second-oldest biennale and a massive contemporary scene.',
    mustSee: ['MASP', 'Pinacoteca', 'Instituto Tomie Ohtake', 'Biennale Pavilion', 'Instituto Inhotim (day trip)'],
    hiddenGems: ['Casa de Vidro', 'Galeria Vermelho', 'Mendes Wood DM', 'A Gentil Carioca'],
    neighborhoods: ['Jardins - High-end galleries', 'Vila Madalena - Street art', 'Centro - Historic institutions'],
    bestTime: 'September-November for São Paulo Biennale (even years)',
    insiderTip: 'Day trip to Inhotim is unmissable - a massive outdoor contemporary art park. Plan to spend the whole day.'
  }
];

// Region summaries
export const artRegions = [
  { slug: 'europe', name: 'Europe', count: 10, highlight: 'Renaissance to Contemporary', icon: '🏛️' },
  { slug: 'north-america', name: 'North America', count: 5, highlight: 'New York to Mexico City', icon: '🗽' },
  { slug: 'asia', name: 'Asia', count: 5, highlight: 'Tokyo to Beijing', icon: '🏯' },
  { slug: 'middle-east', name: 'Middle East', count: 2, highlight: 'Dubai to Tel Aviv', icon: '🕌' },
  { slug: 'oceania', name: 'Oceania', count: 2, highlight: 'Sydney to Melbourne', icon: '🦘' },
  { slug: 'south-america', name: 'South America', count: 2, highlight: 'Buenos Aires to São Paulo', icon: '🎭' }
];
