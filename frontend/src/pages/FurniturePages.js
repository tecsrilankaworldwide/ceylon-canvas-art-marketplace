import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Sofa, Clock, Sparkles, Globe, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

// Furniture images
const furnitureImages = {
  classic: [
    'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg?auto=compress&w=600'
  ],
  antique: [
    'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/6186812/pexels-photo-6186812.jpeg?auto=compress&w=600'
  ],
  contemporary: [
    'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/6969927/pexels-photo-6969927.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&w=600'
  ]
};

// Furniture Hub Page
export const FurnitureHubPage = () => {
  const { t } = useLanguage();
  
  const categories = [
    {
      id: 'classic',
      name: t('furniture.classic'),
      desc: t('furniture.classicDesc'),
      icon: Sofa,
      image: furnitureImages.classic[0],
      color: 'bg-[#0F3057]',
      path: '/furniture/classic'
    },
    {
      id: 'antique',
      name: t('furniture.antique'),
      desc: t('furniture.antiqueDesc'),
      icon: Clock,
      image: furnitureImages.antique[0],
      color: 'bg-[#8B4513]',
      path: '/furniture/antique'
    },
    {
      id: 'contemporary',
      name: t('furniture.contemporary'),
      desc: t('furniture.contemporaryDesc'),
      icon: Sparkles,
      image: furnitureImages.contemporary[0],
      color: 'bg-[#2D5A43]',
      path: '/furniture/contemporary'
    }
  ];

  const markets = [
    {
      id: 'local',
      name: 'Local Market',
      nameSi: 'දේශීය වෙළඳපොළ',
      nameTa: 'உள்ளூர் சந்தை',
      desc: 'Handcrafted furniture for Sri Lankan homes',
      icon: Home,
      color: 'bg-[#B64E33]',
      path: '/furniture/local'
    },
    {
      id: 'foreign',
      name: 'Export / Foreign Market',
      nameSi: 'අපනයන / විදේශ වෙළඳපොළ',
      nameTa: 'ஏற்றுமதி / வெளிநாட்டு சந்தை',
      desc: 'Premium Ceylon furniture for international collectors',
      icon: Globe,
      color: 'bg-[#0F3057]',
      path: '/furniture/export'
    }
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="furniture-hub">
      {/* Hero */}
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">
            {t('furniture.title')}
          </span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white mb-6">
            {t('furniture.title')}
          </h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            {t('furniture.subtitle')}
          </p>
        </div>
      </section>

      {/* Market Selection - Local vs Foreign */}
      <section className="py-16 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057] text-center mb-10">Choose Your Market</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {markets.map((market) => (
              <Link key={market.id} to={market.path} className="group">
                <div className={`${market.color} p-8 lg:p-12 text-center hover:scale-[1.02] transition-transform`}>
                  <market.icon className="h-16 w-16 text-white/80 mx-auto mb-6" />
                  <h3 className="font-heading text-2xl lg:text-3xl text-white mb-2">{market.name}</h3>
                  <p className="text-white/60 text-sm mb-1">{market.nameSi}</p>
                  <p className="text-white/60 text-sm mb-4">{market.nameTa}</p>
                  <p className="text-white/80 mb-6">{market.desc}</p>
                  <span className="inline-flex items-center text-[#E5A93C] font-medium">
                    Browse Collection <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057] text-center mb-10">Browse by Style</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link key={cat.id} to={cat.path} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F0]">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className={`inline-flex items-center gap-2 ${cat.color} text-white px-3 py-1 mb-3`}>
                      <cat.icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-heading text-2xl text-white mb-2">{cat.name}</h3>
                    <p className="text-white/70 text-sm mb-4">{cat.desc}</p>
                    <span className="inline-flex items-center text-[#E5A93C] font-medium group-hover:gap-3 transition-all">
                      {t('common.viewDetails')} <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Preview */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] text-center mb-12">Featured Pieces</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...furnitureImages.classic.slice(1,3), ...furnitureImages.antique.slice(1,3)].map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img src={img} alt={`Furniture ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// Local Market Page
export const LocalMarketPage = () => {
  const { t } = useLanguage();
  
  const categories = [
    {
      name: 'Contemporary Collection',
      nameSi: 'සමකාලීන එකතුව',
      nameTa: 'சமகால தொகுப்பு',
      desc: 'Modern designs for the new generation. Sleek, minimal, trendy.',
      color: 'bg-[#2D5A43]'
    },
    {
      name: 'Antique Replica Collection',
      nameSi: 'පුරාණ අනුරූප එකතුව',
      nameTa: 'பழங்கால பிரதி தொகுப்பு',
      desc: 'Masterfully crafted reproductions. Indistinguishable from originals.',
      color: 'bg-[#8B4513]'
    }
  ];

  const contemporaryItems = [
    { name: 'Modern Teak Dining Set', nameSi: 'නවීන ටීක් ආහාර කට්ටලය', price: 145000, priceLabel: 'Rs. 145,000', style: 'Minimalist' },
    { name: 'Scandinavian Coffee Table', nameSi: 'ස්කැන්ඩිනේවියානු කෝපි මේසය', price: 45000, priceLabel: 'Rs. 45,000', style: 'Nordic' },
    { name: 'Industrial TV Console', nameSi: 'කාර්මික TV කොන්සෝලය', price: 65000, priceLabel: 'Rs. 65,000', style: 'Urban' },
  ];

  const antiqueReplicaItems = [
    { name: 'Dutch Colonial Cabinet (Replica)', nameSi: 'ලන්දේසි යටත් විජිත අල්මාරිය (අනුරූපය)', price: 185000, priceLabel: 'Rs. 185,000', style: 'Colonial Era' },
    { name: 'Victorian Writing Desk (Replica)', nameSi: 'වික්ටෝරියානු ලිවීමේ මේසය (අනුරූපය)', price: 125000, priceLabel: 'Rs. 125,000', style: '19th Century' },
    { name: 'British Raj Planter Chair (Replica)', nameSi: 'බ්‍රිතාන්‍ය රාජ් වගා පුටුව (අනුරූපය)', price: 55000, priceLabel: 'Rs. 55,000', style: 'Heritage' },
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="furniture-local">
      <section className="bg-[#B64E33] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/furniture" className="text-white/60 hover:text-white text-sm mb-4 inline-block">← Back to Furniture</Link>
          <div className="flex items-center gap-4 mb-4">
            <Home className="h-10 w-10 text-white/80" />
            <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">Local Market</h1>
          </div>
          <p className="font-heading text-2xl text-white/80 mb-2">දේශීය වෙළඳපොළ</p>
          <p className="font-heading text-xl text-white/60 mb-6">உள்ளூர் சந்தை</p>
          <p className="font-body text-lg text-white/70 max-w-2xl">
            Quality furniture for Sri Lankan homes. From contemporary designs for the new generation to masterfully crafted antique replicas.
          </p>
        </div>
      </section>

      {/* Contemporary Collection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-[#2D5A43]"></div>
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">Contemporary Collection</h2>
              <p className="text-[#5C636A]">Modern designs for the new generation</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {contemporaryItems.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F0] mb-4 relative">
                  <img 
                    src={furnitureImages.contemporary[i % furnitureImages.contemporary.length]} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#2D5A43] text-white px-3 py-1 text-xs">{item.style}</span>
                </div>
                <h3 className="font-heading text-lg text-[#0F3057] group-hover:text-[#2D5A43] transition-colors">{item.name}</h3>
                <p className="text-[#5C636A] text-sm">{item.nameSi}</p>
                <p className="text-[#2D5A43] font-bold text-xl mt-2">{item.priceLabel}</p>
                <Button className="mt-3 bg-[#2D5A43] text-white rounded-none w-full hover:bg-[#1F4332]">
                  Inquire Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Antique Replica Collection */}
      <section className="py-16 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-[#8B4513]"></div>
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">Antique Replica Collection</h2>
              <p className="text-[#5C636A]">Masterfully crafted reproductions - Indistinguishable from originals</p>
            </div>
          </div>
          <p className="text-[#5C636A] mb-8 max-w-2xl">
            Our skilled craftsmen recreate heritage furniture with exact precision. Same wood types, same techniques, same timeless beauty - but brand new and built to last generations.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {antiqueReplicaItems.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-white mb-4 relative">
                  <img 
                    src={furnitureImages.antique[i % furnitureImages.antique.length]} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#8B4513] text-white px-3 py-1 text-xs">{item.style}</span>
                  <span className="absolute top-4 right-4 bg-[#E5A93C] text-[#0A1015] px-2 py-1 text-xs font-medium">REPLICA</span>
                </div>
                <h3 className="font-heading text-lg text-[#0F3057] group-hover:text-[#8B4513] transition-colors">{item.name}</h3>
                <p className="text-[#5C636A] text-sm">{item.nameSi}</p>
                <p className="text-[#8B4513] font-bold text-xl mt-2">{item.priceLabel}</p>
                <Button className="mt-3 bg-[#8B4513] text-white rounded-none w-full hover:bg-[#6B3410]">
                  Inquire Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Replicas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-2xl text-[#0F3057] mb-8">Why Choose Our Antique Replicas?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6">
              <div className="text-3xl mb-3">🪵</div>
              <h3 className="font-medium text-[#0F3057] mb-2">Same Materials</h3>
              <p className="text-sm text-[#5C636A]">Authentic teak, mahogany, satinwood from Sri Lanka</p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-3">🔨</div>
              <h3 className="font-medium text-[#0F3057] mb-2">Traditional Techniques</h3>
              <p className="text-sm text-[#5C636A]">Hand-carved by master craftsmen using heritage methods</p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-medium text-[#0F3057] mb-2">Indistinguishable</h3>
              <p className="text-sm text-[#5C636A]">Expert aging techniques for authentic vintage appearance</p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="font-medium text-[#0F3057] mb-2">Built to Last</h3>
              <p className="text-sm text-[#5C636A]">New construction means decades of durability</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Export / Foreign Market Page
export const ExportMarketPage = () => {
  const { t } = useLanguage();
  
  const exportItems = [
    { name: 'Colonial Mahogany Dining Set', price: 4500, origin: 'Galle', cert: 'Export Certified' },
    { name: 'Antique Teak Cabinet (1920s)', price: 8500, origin: 'Colombo', cert: 'Authenticated' },
    { name: 'Hand-Carved Ebony Sculpture', price: 3200, origin: 'Kandy', cert: 'Artisan Signed' },
    { name: 'Dutch Colonial Writing Desk', price: 6800, origin: 'Galle Fort', cert: 'Heritage Piece' },
    { name: 'British Era Planter Chair', price: 2800, origin: 'Nuwara Eliya', cert: 'Restored' },
    { name: 'Royal Satinwood Bed (King)', price: 12000, origin: 'Moratuwa', cert: 'Premium Export' }
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="furniture-export">
      <section className="bg-[#0F3057] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/furniture" className="text-white/60 hover:text-white text-sm mb-4 inline-block">← Back to Furniture</Link>
          <div className="flex items-center gap-4 mb-4">
            <Globe className="h-10 w-10 text-[#E5A93C]" />
            <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">Export Market</h1>
          </div>
          <p className="font-heading text-2xl text-white/80 mb-2">අපනයන / විදේශ වෙළඳපොළ</p>
          <p className="font-heading text-xl text-white/60 mb-6">ஏற்றுமதி / வெளிநாட்டு சந்தை</p>
          <p className="font-body text-lg text-white/70 max-w-2xl">
            Premium Ceylon furniture for international collectors. Export-grade quality with worldwide shipping and authentication certificates.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {exportItems.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F0] mb-4 relative">
                  <img 
                    src={furnitureImages.antique[i % furnitureImages.antique.length]} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#E5A93C] text-[#0A1015] px-3 py-1 text-xs font-medium">
                    {item.cert}
                  </span>
                </div>
                <h3 className="font-heading text-lg text-[#0F3057] group-hover:text-[#0F3057]/80 transition-colors">{item.name}</h3>
                <p className="text-[#5C636A] text-sm">Origin: {item.origin}</p>
                <p className="text-[#E5A93C] font-bold text-2xl mt-2">${item.price.toLocaleString()} USD</p>
                <p className="text-[#5C636A] text-xs">Worldwide shipping available</p>
                <Button className="mt-3 bg-[#0F3057] text-white rounded-none w-full hover:bg-[#0A1015]">
                  Request Quote
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// Category Page Component
const FurnitureCategoryPage = ({ category }) => {
  const { t } = useLanguage();
  const images = furnitureImages[category] || furnitureImages.classic;
  
  const categoryInfo = {
    classic: { name: t('furniture.classic'), desc: t('furniture.classicDesc'), color: 'bg-[#0F3057]' },
    antique: { name: t('furniture.antique'), desc: t('furniture.antiqueDesc'), color: 'bg-[#8B4513]' },
    contemporary: { name: t('furniture.contemporary'), desc: t('furniture.contemporaryDesc'), color: 'bg-[#2D5A43]' }
  };
  
  const info = categoryInfo[category] || categoryInfo.classic;

  const items = [
    { name: 'Mahogany Dining Table', price: 2500, origin: 'Galle' },
    { name: 'Teak Wood Cabinet', price: 1800, origin: 'Kandy' },
    { name: 'Rosewood Chair Set', price: 3200, origin: 'Colombo' },
    { name: 'Ebony Coffee Table', price: 1500, origin: 'Matara' },
    { name: 'Jackfruit Wood Bench', price: 900, origin: 'Kurunegala' },
    { name: 'Satinwood Desk', price: 2800, origin: 'Negombo' }
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`furniture-${category}`}>
      {/* Hero */}
      <section className={`${info.color} py-20 lg:py-28`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/furniture" className="text-white/60 hover:text-white text-sm mb-4 inline-block">
            ← Back to Furniture
          </Link>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">{info.name}</h1>
          <p className="font-body text-lg text-white/70 mt-4 max-w-2xl">{info.desc}</p>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {images.map((img, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F0] mb-4">
                  <img 
                    src={img} 
                    alt={items[i]?.name || `${info.name} ${i+1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading text-lg text-[#0F3057] group-hover:text-[#B64E33] transition-colors">
                  {items[i]?.name || `${info.name} Piece ${i+1}`}
                </h3>
                <p className="text-[#5C636A] text-sm">Origin: {items[i]?.origin || 'Sri Lanka'}</p>
                <p className="text-[#E5A93C] font-medium mt-1">${items[i]?.price || (1000 + i * 500)}</p>
                <Button className="mt-3 bg-[#0F3057] text-white rounded-none w-full">
                  {t('common.viewDetails')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// Export individual category pages
export const ClassicFurniturePage = () => <FurnitureCategoryPage category="classic" />;
export const AntiqueFurniturePage = () => <FurnitureCategoryPage category="antique" />;
export const ContemporaryFurniturePage = () => <FurnitureCategoryPage category="contemporary" />;
