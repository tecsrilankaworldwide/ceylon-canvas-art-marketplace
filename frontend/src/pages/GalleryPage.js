import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, LayoutGrid, SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { ArtworkCard } from '../components/ArtworkCard';
import { getArtworks, getCategories, getMediums, getArtists } from '../services/api';

const GalleryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState('large');
  const [totalResults, setTotalResults] = useState(0);
  
  // Filters
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [medium, setMedium] = useState(searchParams.get('medium') || '');
  const [artistId, setArtistId] = useState(searchParams.get('artist') || '');
  const [isAuction, setIsAuction] = useState(searchParams.get('is_auction') === 'true');
  const [isDigital, setIsDigital] = useState(searchParams.get('is_digital') === 'true');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  
  // Collapsible state
  const [openSections, setOpenSections] = useState({
    category: true,
    medium: false,
    artist: false,
    type: true,
    price: true
  });

  // Count active filters
  const activeFiltersCount = [
    category,
    medium,
    artistId,
    isAuction,
    isDigital,
    priceRange[0] > 0 || priceRange[1] < 50000,
    search
  ].filter(Boolean).length;

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [catData, medData, artistData] = await Promise.all([
          getCategories(),
          getMediums(),
          getArtists({ limit: 50 })
        ]);
        setCategories(catData.categories || []);
        setMediums(medData.mediums || []);
        setArtists(artistData || []);
      } catch (error) {
        console.error('Error loading filter options:', error);
      }
    };
    loadFilterOptions();
  }, []);

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const params = {
          skip: 0,
          limit: 50,
          sort_by: sortBy,
          sort_order: sortOrder
        };
        
        if (category) params.category = category;
        if (medium) params.medium = medium;
        if (artistId) params.artist_id = artistId;
        if (isAuction) params.is_auction = true;
        if (isDigital) params.is_digital = true;
        if (priceRange[0] > 0) params.min_price = priceRange[0];
        if (priceRange[1] < 50000) params.max_price = priceRange[1];
        if (search) params.search = search;
        
        const data = await getArtworks(params);
        setArtworks(data);
        setTotalResults(data.length);
      } catch (error) {
        console.error('Error loading artworks:', error);
      } finally {
        setLoading(false);
      }
    };
    loadArtworks();
  }, [category, medium, artistId, isAuction, isDigital, priceRange, sortBy, sortOrder, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    updateSearchParams({ search: searchInput || null });
  };

  const updateSearchParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

  const handleCategoryChange = (value) => {
    const newCategory = value === 'all' ? '' : value;
    setCategory(newCategory);
    updateSearchParams({ category: newCategory || null });
  };

  const handleMediumChange = (value) => {
    const newMedium = value === 'all' ? '' : value;
    setMedium(newMedium);
    updateSearchParams({ medium: newMedium || null });
  };

  const handleArtistChange = (value) => {
    const newArtist = value === 'all' ? '' : value;
    setArtistId(newArtist);
    updateSearchParams({ artist: newArtist || null });
  };

  const clearFilters = () => {
    setCategory('');
    setMedium('');
    setArtistId('');
    setIsAuction(false);
    setIsDigital(false);
    setPriceRange([0, 50000]);
    setSearch('');
    setSearchInput('');
    setSearchParams({});
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'category':
        setCategory('');
        updateSearchParams({ category: null });
        break;
      case 'medium':
        setMedium('');
        updateSearchParams({ medium: null });
        break;
      case 'artist':
        setArtistId('');
        updateSearchParams({ artist: null });
        break;
      case 'auction':
        setIsAuction(false);
        updateSearchParams({ is_auction: null });
        break;
      case 'digital':
        setIsDigital(false);
        updateSearchParams({ is_digital: null });
        break;
      case 'price':
        setPriceRange([0, 50000]);
        break;
      case 'search':
        setSearch('');
        setSearchInput('');
        updateSearchParams({ search: null });
        break;
      default:
        break;
    }
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const FilterSection = ({ id, title, children }) => (
    <Collapsible open={openSections[id]} onOpenChange={() => toggleSection(id)}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b border-[#E5E5DF]">
        <span className="font-body text-sm font-medium text-[#1A1D20]">{title}</span>
        <ChevronDown className={`h-4 w-4 text-[#5C636A] transition-transform ${openSections[id] ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4 pb-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  const FilterContent = () => (
    <div className="space-y-2">
      {/* Category */}
      <FilterSection id="category" title="Category">
        <Select value={category || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full" data-testid="category-select">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Medium */}
      <FilterSection id="medium" title="Medium">
        <Select value={medium || 'all'} onValueChange={handleMediumChange}>
          <SelectTrigger className="w-full" data-testid="medium-select">
            <SelectValue placeholder="All Mediums" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Mediums</SelectItem>
            {mediums.map((med) => (
              <SelectItem key={med.id} value={med.id}>{med.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Artist */}
      <FilterSection id="artist" title="Artist">
        <Select value={artistId || 'all'} onValueChange={handleArtistChange}>
          <SelectTrigger className="w-full" data-testid="artist-select">
            <SelectValue placeholder="All Artists" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Artists</SelectItem>
            {artists.map((artist) => (
              <SelectItem key={artist.id} value={artist.id}>{artist.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Type Filters */}
      <FilterSection id="type" title="Artwork Type">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="auction" 
              checked={isAuction} 
              onCheckedChange={(checked) => {
                setIsAuction(checked);
                updateSearchParams({ is_auction: checked || null });
              }}
              data-testid="filter-auction"
            />
            <label htmlFor="auction" className="font-body text-sm cursor-pointer">
              Auctions Only
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="digital" 
              checked={isDigital} 
              onCheckedChange={(checked) => {
                setIsDigital(checked);
                updateSearchParams({ is_digital: checked || null });
              }}
              data-testid="filter-digital"
            />
            <label htmlFor="digital" className="font-body text-sm cursor-pointer">
              Digital Art
            </label>
          </div>
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection id="price" title="Price Range">
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={50000}
          step={100}
          className="mb-4"
          data-testid="price-slider"
        />
        <div className="flex justify-between font-body text-sm text-[#5C636A]">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </FilterSection>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button 
          variant="outline" 
          onClick={clearFilters} 
          className="w-full mt-4"
          data-testid="clear-filters"
        >
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  const ActiveFilterBadges = () => {
    const badges = [];
    
    if (search) {
      badges.push({ key: 'search', label: `"${search}"`, type: 'search' });
    }
    if (category) {
      const cat = categories.find(c => c.id === category);
      badges.push({ key: 'category', label: cat?.name || category, type: 'category' });
    }
    if (medium) {
      const med = mediums.find(m => m.id === medium);
      badges.push({ key: 'medium', label: med?.name || medium, type: 'medium' });
    }
    if (artistId) {
      const artist = artists.find(a => a.id === artistId);
      badges.push({ key: 'artist', label: artist?.name || 'Artist', type: 'artist' });
    }
    if (isAuction) {
      badges.push({ key: 'auction', label: 'Auctions', type: 'auction' });
    }
    if (isDigital) {
      badges.push({ key: 'digital', label: 'Digital Art', type: 'digital' });
    }
    if (priceRange[0] > 0 || priceRange[1] < 50000) {
      badges.push({ key: 'price', label: `$${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`, type: 'price' });
    }

    if (badges.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {badges.map((badge) => (
          <Badge 
            key={badge.key} 
            variant="secondary" 
            className="pl-3 pr-1 py-1 bg-[#F5F5F0] hover:bg-[#E5E5DF] cursor-pointer"
            onClick={() => removeFilter(badge.type)}
            data-testid={`active-filter-${badge.type}`}
          >
            <span className="font-body text-sm">{badge.label}</span>
            <X className="h-3 w-3 ml-2" />
          </Badge>
        ))}
        {badges.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-[#5C636A] hover:text-[#1A1D20] text-xs"
          >
            Clear all
          </Button>
        )}
      </div>
    );
  };

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="gallery-page">
      {/* Header */}
      <section className="bg-[#0A1015] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C] font-semibold">
            Explore Our Collection
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white mt-2">
            Art Gallery
          </h1>
          <p className="font-body text-base text-white/70 mt-4 max-w-xl">
            Discover authentic Sri Lankan art from traditional paintings to contemporary digital pieces.
          </p>
          
          {/* Hero Search */}
          <form onSubmit={handleSearch} className="mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C636A]" />
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search artworks, artists, styles..."
                className="w-full pl-12 pr-24 py-6 bg-white border-0 rounded-sm font-body text-base"
                data-testid="hero-search-input"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary rounded-sm"
                data-testid="hero-search-btn"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E5E5DF]">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden flex items-center gap-2" data-testid="mobile-filter-btn">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-[#0F3057] text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="font-heading text-xl">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Results Count */}
            <p className="font-body text-sm text-[#5C636A]">
              <span className="font-semibold text-[#1A1D20]">{totalResults}</span> artworks found
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
              const [by, order] = value.split('-');
              setSortBy(by);
              setSortOrder(order);
            }}>
              <SelectTrigger className="w-48" data-testid="sort-select">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at-desc">Newest First</SelectItem>
                <SelectItem value="created_at-asc">Oldest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="views-desc">Most Popular</SelectItem>
                <SelectItem value="title-asc">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Grid Toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-[#E5E5DF] rounded-sm p-1">
              <button
                onClick={() => setGridView('large')}
                className={`p-2 rounded-sm transition-colors ${gridView === 'large' ? 'bg-[#F5F5F0]' : 'hover:bg-[#F5F5F0]'}`}
                data-testid="grid-large"
                title="Large grid"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridView('small')}
                className={`p-2 rounded-sm transition-colors ${gridView === 'small' ? 'bg-[#F5F5F0]' : 'hover:bg-[#F5F5F0]'}`}
                data-testid="grid-small"
                title="Small grid"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <ActiveFilterBadges />

        <div className="flex gap-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-[#0F3057]" />
                <h2 className="font-heading text-xl font-medium text-[#0F3057]">Filters</h2>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#0F3057] text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Artwork Grid */}
          <div className="flex-1">
            {loading ? (
              <div className={`grid gap-6 ${gridView === 'large' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="skeleton aspect-artwork rounded-sm" />
                ))}
              </div>
            ) : artworks.length === 0 ? (
              <div className="empty-state py-20">
                <div className="max-w-md mx-auto text-center">
                  <div className="w-16 h-16 bg-[#F5F5F0] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-8 w-8 text-[#5C636A]" />
                  </div>
                  <h3 className="font-heading text-2xl text-[#0F3057] mb-2">No Artworks Found</h3>
                  <p className="font-body text-[#5C636A] mb-6">
                    We couldn't find any artworks matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button onClick={clearFilters} className="btn-primary" data-testid="empty-clear-filters">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`grid gap-6 ${gridView === 'large' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
                {artworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} compact={gridView === 'small'} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;
