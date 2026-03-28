import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Sofa, Clock, Sparkles, Globe, Home, Filter, Search, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Furniture Hub Page
export const FurnitureHubPage = () => {
  const { t } = useLanguage();
  const [featuredFurniture, setFeaturedFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ categories: [], regions: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, categoriesRes, regionsRes] = await Promise.all([
          fetch(`${API_URL}/api/furniture/featured?limit=8`),
          fetch(`${API_URL}/api/furniture/categories`),
          fetch(`${API_URL}/api/furniture/regions`)
        ]);
        
        if (featuredRes.ok) {
          const featuredData = await featuredRes.json();
          setFeaturedFurniture(featuredData);
        }
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setStats(prev => ({ ...prev, categories: categoriesData }));
        }
        if (regionsRes.ok) {
          const regionsData = await regionsRes.json();
          setStats(prev => ({ ...prev, regions: regionsData }));
        }
      } catch (error) {
        console.error('Error fetching furniture data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = [
    { id: 'antique', name: 'Antique', desc: 'Vintage & colonial era pieces', icon: Clock, color: 'bg-[#8B4513]', path: '/furniture/category/antique' },
    { id: 'contemporary', name: 'Contemporary', desc: 'Modern designs for today', icon: Sparkles, color: 'bg-[#2D5A43]', path: '/furniture/category/contemporary' },
    { id: 'export_quality', name: 'Export Quality', desc: 'Premium international grade', icon: Globe, color: 'bg-[#0F3057]', path: '/furniture/category/export_quality' },
    { id: 'handcrafted_unique', name: 'Handcrafted Unique', desc: 'One-of-a-kind artisan pieces', icon: Sofa, color: 'bg-[#B64E33]', path: '/furniture/category/handcrafted_unique' }
  ];

  const markets = [
    { id: 'local', name: 'Local Market', nameSi: 'දේශීය වෙළඳපොළ', nameTa: 'உள்ளூர் சந்தை', desc: 'Handcrafted furniture for Sri Lankan homes', icon: Home, color: 'bg-[#B64E33]', path: '/furniture/local' },
    { id: 'asian', name: 'Asian Market', nameSi: 'ආසියානු වෙළඳපොළ', nameTa: 'ஆசிய சந்தை', desc: 'Premium exports for India, China, Japan & more', icon: Globe, color: 'bg-[#E5A93C]', path: '/furniture/export/asian' },
    { id: 'european', name: 'European Market', nameSi: 'යුරෝපීය වෙළඳපොළ', nameTa: 'ஐரோப்பிய சந்தை', desc: 'Classic Ceylon furniture for UK, Germany, France', icon: Globe, color: 'bg-[#0F3057]', path: '/furniture/export/european' },
    { id: 'american', name: 'American Market', nameSi: 'ඇමරිකානු වෙළඳපොළ', nameTa: 'அமெரிக்க சந்தை', desc: 'Exotic furniture for USA, Canada & Americas', icon: Globe, color: 'bg-[#2D5A43]', path: '/furniture/export/american' }
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="furniture-hub">
      {/* Hero */}
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">
            Ceylon Canvas Furniture
          </span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white mb-6">
            Premium Sri Lankan Furniture
          </h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            From antique colonial pieces to contemporary designs. Export-quality craftsmanship for local and international markets.
          </p>
        </div>
      </section>

      {/* Market Selection */}
      <section className="py-16 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057] text-center mb-10">Choose Your Market</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {markets.map((market) => (
              <Link key={market.id} to={market.path} className="group">
                <div className={`${market.color} p-6 lg:p-8 text-center hover:scale-[1.02] transition-transform h-full`}>
                  <market.icon className="h-12 w-12 text-white/80 mx-auto mb-4" />
                  <h3 className="font-heading text-xl lg:text-2xl text-white mb-2">{market.name}</h3>
                  <p className="text-white/60 text-xs mb-1">{market.nameSi}</p>
                  <p className="text-white/60 text-xs mb-3">{market.nameTa}</p>
                  <p className="text-white/80 text-sm mb-4">{market.desc}</p>
                  <span className="inline-flex items-center text-white font-medium text-sm">
                    Browse <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
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
          <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057] text-center mb-10">Browse by Category</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} to={cat.path} className="group">
                <div className={`${cat.color} p-6 text-center hover:scale-[1.02] transition-transform`}>
                  <cat.icon className="h-10 w-10 text-white/80 mx-auto mb-4" />
                  <h3 className="font-heading text-lg text-white mb-2">{cat.name}</h3>
                  <p className="text-white/70 text-sm">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] text-center mb-12">Featured Pieces</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#E5A93C]" />
            </div>
          ) : featuredFurniture.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredFurniture.slice(0, 8).map((item) => (
                <Link key={item.id} to={`/furniture/${item.id}`} className="group">
                  <div className="aspect-square overflow-hidden bg-white">
                    <img 
                      src={item.images?.[0] || 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&w=400'} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-heading text-sm mt-2 text-[#0F3057] group-hover:text-[#E5A93C] truncate">{item.title}</h3>
                  <p className="text-[#E5A93C] font-bold">${item.price?.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#5C636A]">No featured furniture yet. Check back soon!</p>
          )}
          <div className="text-center mt-8">
            <Link to="/furniture/all">
              <Button className="bg-[#0F3057] text-white rounded-none px-8 hover:bg-[#0A1015]">
                View All Furniture <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// All Furniture Page with Filters
export const AllFurniturePage = () => {
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', furniture_type: '', region: '', search: '' });
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchFurniture = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.furniture_type) params.append('furniture_type', filters.furniture_type);
        if (filters.region) params.append('region', filters.region);
        if (filters.search) params.append('search', filters.search);
        params.append('limit', '50');

        const res = await fetch(`${API_URL}/api/furniture?${params}`);
        if (res.ok) {
          const data = await res.json();
          setFurniture(data);
          setTotalCount(data.length);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFurniture();
  }, [filters]);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="furniture-all">
      <section className="bg-[#0F3057] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/furniture" className="text-white/60 hover:text-white text-sm mb-4 inline-block">← Back to Furniture Hub</Link>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">All Furniture</h1>
          <p className="text-white/70 mt-2">Browse our complete collection</p>
        </div>
      </section>

      <section className="py-8 bg-[#F5F5F0] border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search className="h-5 w-5 text-[#5C636A]" />
              <Input 
                placeholder="Search furniture..." 
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="border-[#D4B896] rounded-none"
              />
            </div>
            <Select value={filters.category} onValueChange={(v) => setFilters(prev => ({ ...prev, category: v }))}>
              <SelectTrigger className="w-[160px] rounded-none border-[#D4B896]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="antique">Antique</SelectItem>
                <SelectItem value="contemporary">Contemporary</SelectItem>
                <SelectItem value="export_quality">Export Quality</SelectItem>
                <SelectItem value="handcrafted_unique">Handcrafted Unique</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.furniture_type} onValueChange={(v) => setFilters(prev => ({ ...prev, furniture_type: v }))}>
              <SelectTrigger className="w-[160px] rounded-none border-[#D4B896]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="wooden">Wooden</SelectItem>
                <SelectItem value="brass_metal">Brass/Metal</SelectItem>
                <SelectItem value="cane_rattan">Cane/Rattan</SelectItem>
                <SelectItem value="carved_decorative">Carved Decorative</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.region} onValueChange={(v) => setFilters(prev => ({ ...prev, region: v }))}>
              <SelectTrigger className="w-[160px] rounded-none border-[#D4B896]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Regions</SelectItem>
                <SelectItem value="local">Local (Sri Lanka)</SelectItem>
                <SelectItem value="asian">Asian</SelectItem>
                <SelectItem value="european">European</SelectItem>
                <SelectItem value="american">American</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-[#5C636A] mt-4">{totalCount} items found</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#E5A93C]" />
            </div>
          ) : furniture.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {furniture.map((item) => (
                <FurnitureCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#5C636A] py-20">No furniture found matching your filters.</p>
          )}
        </div>
      </section>
    </main>
  );
};

// Furniture Card Component
const FurnitureCard = ({ item }) => {
  const regionColors = {
    local: 'bg-[#B64E33]',
    asian: 'bg-[#E5A93C]',
    european: 'bg-[#0F3057]',
    american: 'bg-[#2D5A43]'
  };

  return (
    <Link to={`/furniture/${item.id}`} className="group" data-testid={`furniture-card-${item.id}`}>
      <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F0] mb-4 relative">
        <img 
          src={item.images?.[0] || 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&w=600'} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 ${regionColors[item.region] || 'bg-[#0F3057]'} text-white px-2 py-1 text-xs uppercase`}>
          {item.region}
        </span>
        {item.is_negotiable && (
          <span className="absolute top-3 right-3 bg-[#E5A93C] text-[#0A1015] px-2 py-1 text-xs">Negotiable</span>
        )}
      </div>
      <h3 className="font-heading text-lg text-[#0F3057] group-hover:text-[#E5A93C] transition-colors truncate">{item.title}</h3>
      <p className="text-[#5C636A] text-sm">{item.origin} • {item.material}</p>
      <p className="text-[#5C636A] text-xs capitalize">{item.category?.replace('_', ' ')} • {item.condition}</p>
      <p className="text-[#E5A93C] font-bold text-xl mt-2">${item.price?.toLocaleString()}</p>
    </Link>
  );
};

// Local Market Page
export const LocalMarketPage = () => {
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const res = await fetch(`${API_URL}/api/furniture/local?limit=30`);
        if (res.ok) setFurniture(await res.json());
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocal();
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="furniture-local">
      <section className="bg-[#B64E33] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/furniture" className="text-white/60 hover:text-white text-sm mb-4 inline-block">← Back to Furniture</Link>
          <div className="flex items-center gap-4 mb-4">
            <Home className="h-10 w-10 text-white/80" />
            <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">Local Market</h1>
          </div>
          <p className="font-heading text-2xl text-white/80 mb-2">දේශීය වෙළඳපොළ</p>
          <p className="font-heading text-xl text-white/60 mb-6">உள்ளூர் சந்தை</p>
          <p className="font-body text-lg text-white/70 max-w-2xl">
            Quality furniture for Sri Lankan homes. From contemporary designs to masterfully crafted antique replicas.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#E5A93C]" />
            </div>
          ) : furniture.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {furniture.map((item) => (
                <FurnitureCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#5C636A] mb-4">No local furniture available yet.</p>
              <Link to="/furniture">
                <Button className="bg-[#B64E33] text-white rounded-none">Browse All Furniture</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// Export Market Page (Regional)
export const ExportMarketPage = () => {
  const { region } = useParams();
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);

  const regionInfo = {
    asian: { name: 'Asian Market', nameSi: 'ආසියානු වෙළඳපොළ', nameTa: 'ஆசிய சந்தை', color: 'bg-[#E5A93C]', desc: 'Premium furniture exports for India, China, Japan, Singapore, and Southeast Asia' },
    european: { name: 'European Market', nameSi: 'යුරෝපීය වෙළඳපොළ', nameTa: 'ஐரோப்பிய சந்தை', color: 'bg-[#0F3057]', desc: 'Classic Ceylon furniture for United Kingdom, Germany, France, and European collectors' },
    american: { name: 'American Market', nameSi: 'ඇමරිකානු වෙළඳපොළ', nameTa: 'அமெரிக்க சந்தை', color: 'bg-[#2D5A43]', desc: 'Exotic handcrafted furniture for USA, Canada, and the Americas' }
  };

  const info = regionInfo[region] || regionInfo.asian;

  useEffect(() => {
    const fetchExport = async () => {
      if (!region || !['asian', 'european', 'american'].includes(region)) return;
      try {
        const res = await fetch(`${API_URL}/api/furniture/export/${region}?limit=30`);
        if (res.ok) setFurniture(await res.json());
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExport();
  }, [region]);

  if (!region || !['asian', 'european', 'american'].includes(region)) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-[#0F3057] mb-4">Invalid Region</h1>
          <Link to="/furniture">
            <Button className="bg-[#0F3057] text-white rounded-none">Back to Furniture</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`furniture-export-${region}`}>
      <section className={`${info.color} py-20`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/furniture" className="text-white/60 hover:text-white text-sm mb-4 inline-block">← Back to Furniture</Link>
          <div className="flex items-center gap-4 mb-4">
            <Globe className="h-10 w-10 text-white/80" />
            <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{info.name}</h1>
          </div>
          <p className="font-heading text-2xl text-white/80 mb-2">{info.nameSi}</p>
          <p className="font-heading text-xl text-white/60 mb-6">{info.nameTa}</p>
          <p className="font-body text-lg text-white/70 max-w-2xl">{info.desc}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#E5A93C]" />
            </div>
          ) : furniture.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {furniture.map((item) => (
                <FurnitureCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#5C636A] mb-4">No {region} export furniture available yet.</p>
              <Link to="/furniture">
                <Button className={`${info.color} text-white rounded-none`}>Browse All Furniture</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Export Features */}
      <section className="py-16 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl text-[#0F3057] text-center mb-10">Export Services</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-medium text-[#0F3057] mb-2">Worldwide Shipping</h3>
              <p className="text-sm text-[#5C636A]">Secure packaging & international delivery</p>
            </div>
            <div className="p-6 bg-white">
              <div className="text-3xl mb-3">📜</div>
              <h3 className="font-medium text-[#0F3057] mb-2">Authentication</h3>
              <p className="text-sm text-[#5C636A]">Certificates of authenticity included</p>
            </div>
            <div className="p-6 bg-white">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-medium text-[#0F3057] mb-2">Insurance</h3>
              <p className="text-sm text-[#5C636A]">Full coverage during transit</p>
            </div>
            <div className="p-6 bg-white">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-medium text-[#0F3057] mb-2">Customs Support</h3>
              <p className="text-sm text-[#5C636A]">Documentation & clearance assistance</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Category Page
export const FurnitureCategoryPage = () => {
  const { category } = useParams();
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryInfo = {
    antique: { name: 'Antique Furniture', desc: 'Vintage & colonial era pieces with history', color: 'bg-[#8B4513]' },
    contemporary: { name: 'Contemporary Furniture', desc: 'Modern designs for today\'s lifestyle', color: 'bg-[#2D5A43]' },
    export_quality: { name: 'Export Quality', desc: 'Premium international grade furniture', color: 'bg-[#0F3057]' },
    handcrafted_unique: { name: 'Handcrafted Unique', desc: 'One-of-a-kind artisan masterpieces', color: 'bg-[#B64E33]' }
  };

  const info = categoryInfo[category] || categoryInfo.antique;

  useEffect(() => {
    const fetchCategory = async () => {
      if (!category) return;
      try {
        const res = await fetch(`${API_URL}/api/furniture?category=${category}&limit=30`);
        if (res.ok) setFurniture(await res.json());
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [category]);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`furniture-category-${category}`}>
      <section className={`${info.color} py-20`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/furniture" className="text-white/60 hover:text-white text-sm mb-4 inline-block">← Back to Furniture</Link>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white">{info.name}</h1>
          <p className="text-white/70 mt-4 max-w-2xl">{info.desc}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#E5A93C]" />
            </div>
          ) : furniture.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {furniture.map((item) => (
                <FurnitureCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#5C636A] mb-4">No furniture in this category yet.</p>
              <Link to="/furniture">
                <Button className={`${info.color} text-white rounded-none`}>Browse All Furniture</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// Furniture Detail Page
export const FurnitureDetailPage = () => {
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/api/furniture/${id}`);
        if (res.ok) setFurniture(await res.json());
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#E5A93C]" />
      </main>
    );
  }

  if (!furniture) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-[#0F3057] mb-4">Furniture Not Found</h1>
          <Link to="/furniture">
            <Button className="bg-[#0F3057] text-white rounded-none">Back to Furniture</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="furniture-detail">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <Link to="/furniture" className="text-[#5C636A] hover:text-[#0F3057] text-sm mb-6 inline-block">← Back to Furniture</Link>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F0]">
              <img 
                src={furniture.images?.[0] || 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&w=800'} 
                alt={furniture.title}
                className="w-full h-full object-cover"
              />
            </div>
            {furniture.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {furniture.images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-square overflow-hidden bg-[#F5F5F0]">
                    <img src={img} alt={`${furniture.title} ${i+2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="inline-block px-3 py-1 bg-[#E5A93C]/20 text-[#E5A93C] text-xs uppercase mb-4">
              {furniture.category?.replace('_', ' ')}
            </span>
            <h1 className="font-heading text-3xl lg:text-4xl text-[#0F3057] mb-4">{furniture.title}</h1>
            <p className="text-[#5C636A] mb-6">{furniture.description}</p>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[#E5A93C] font-bold text-3xl">${furniture.price?.toLocaleString()}</span>
              {furniture.is_negotiable && <span className="text-[#2D5A43] text-sm">Price Negotiable</span>}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-[#F5F5F0]">
                <p className="text-[#5C636A] text-xs uppercase">Origin</p>
                <p className="text-[#0F3057] font-medium">{furniture.origin}</p>
              </div>
              <div className="p-4 bg-[#F5F5F0]">
                <p className="text-[#5C636A] text-xs uppercase">Material</p>
                <p className="text-[#0F3057] font-medium">{furniture.material}</p>
              </div>
              <div className="p-4 bg-[#F5F5F0]">
                <p className="text-[#5C636A] text-xs uppercase">Dimensions</p>
                <p className="text-[#0F3057] font-medium">{furniture.dimensions}</p>
              </div>
              <div className="p-4 bg-[#F5F5F0]">
                <p className="text-[#5C636A] text-xs uppercase">Condition</p>
                <p className="text-[#0F3057] font-medium capitalize">{furniture.condition}</p>
              </div>
              {furniture.year_made && (
                <div className="p-4 bg-[#F5F5F0]">
                  <p className="text-[#5C636A] text-xs uppercase">Year Made</p>
                  <p className="text-[#0F3057] font-medium">{furniture.year_made}</p>
                </div>
              )}
              {furniture.weight && (
                <div className="p-4 bg-[#F5F5F0]">
                  <p className="text-[#5C636A] text-xs uppercase">Weight</p>
                  <p className="text-[#0F3057] font-medium">{furniture.weight}</p>
                </div>
              )}
            </div>

            <Button className="w-full bg-[#0F3057] text-white rounded-none py-6 text-lg hover:bg-[#0A1015]">
              Inquire About This Piece
            </Button>
            <p className="text-center text-[#5C636A] text-sm mt-3">
              Contact us for pricing, shipping quotes, and availability
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

// Legacy exports for compatibility
export const ClassicFurniturePage = () => <FurnitureCategoryPage />;
export const AntiqueFurniturePage = () => <FurnitureCategoryPage />;
export const ContemporaryFurniturePage = () => <FurnitureCategoryPage />;
