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
  
  const localItems = [
    { name: 'Mahogany Dining Table', nameSi: 'මහෝගනී ආහාර මේසය', price: 85000, priceLabel: 'Rs. 85,000', origin: 'Moratuwa' },
    { name: 'Teak Almirah', nameSi: 'ටීක් අල්මාරිය', price: 125000, priceLabel: 'Rs. 125,000', origin: 'Galle' },
    { name: 'Jackwood Bed Frame', nameSi: 'කොස් ලී ඇඳ රාමුව', price: 95000, priceLabel: 'Rs. 95,000', origin: 'Kandy' },
    { name: 'Coconut Wood Chair Set', nameSi: 'පොල් ලී පුටු කට්ටලය', price: 45000, priceLabel: 'Rs. 45,000', origin: 'Kurunegala' },
    { name: 'Ebony Coffee Table', nameSi: 'කළුවර කෝපි මේසය', price: 65000, priceLabel: 'Rs. 65,000', origin: 'Ratnapura' },
    { name: 'Satinwood Wardrobe', nameSi: 'බුරුත ඇඳුම් අල්මාරිය', price: 175000, priceLabel: 'Rs. 175,000', origin: 'Matara' }
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
            Handcrafted furniture from Sri Lankan artisans. Quality pieces at local prices for Sri Lankan homes.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {localItems.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F0] mb-4">
                  <img 
                    src={furnitureImages.classic[i % furnitureImages.classic.length]} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading text-lg text-[#0F3057] group-hover:text-[#B64E33] transition-colors">{item.name}</h3>
                <p className="text-[#5C636A] text-sm">{item.nameSi}</p>
                <p className="text-[#5C636A] text-sm">Origin: {item.origin}</p>
                <p className="text-[#B64E33] font-bold text-xl mt-2">{item.priceLabel}</p>
                <Button className="mt-3 bg-[#B64E33] text-white rounded-none w-full hover:bg-[#8B3A27]">
                  Inquire Now
                </Button>
              </div>
            ))}
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
