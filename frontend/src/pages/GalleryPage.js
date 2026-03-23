import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Slider } from '../components/ui/slider';
import { ArtworkCard } from '../components/ArtworkCard';
import { getArtworks, getCategories } from '../services/api';

const GalleryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState('large');
  
  // Filters
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [isAuction, setIsAuction] = useState(searchParams.get('is_auction') === 'true');
  const [isDigital, setIsDigital] = useState(searchParams.get('is_digital') === 'true');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data.categories || []);
    };
    loadCategories();
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
        if (isAuction) params.is_auction = true;
        if (isDigital) params.is_digital = true;
        if (priceRange[0] > 0) params.min_price = priceRange[0];
        if (priceRange[1] < 50000) params.max_price = priceRange[1];
        if (search) params.search = search;
        
        const data = await getArtworks(params);
        setArtworks(data);
      } catch (error) {
        console.error('Error loading artworks:', error);
      } finally {
        setLoading(false);
      }
    };
    loadArtworks();
  }, [category, isAuction, isDigital, priceRange, sortBy, sortOrder, search]);

  const handleCategoryChange = (value) => {
    setCategory(value === 'all' ? '' : value);
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setCategory('');
    setIsAuction(false);
    setIsDigital(false);
    setPriceRange([0, 50000]);
    setSearch('');
    setSearchParams({});
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <label className="form-label">Category</label>
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
      </div>

      {/* Type Filters */}
      <div>
        <label className="form-label mb-4 block">Type</label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="auction" 
              checked={isAuction} 
              onCheckedChange={setIsAuction}
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
              onCheckedChange={setIsDigital}
              data-testid="filter-digital"
            />
            <label htmlFor="digital" className="font-body text-sm cursor-pointer">
              Digital Art
            </label>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="form-label mb-4 block">Price Range</label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={50000}
          step={100}
          className="mb-2"
          data-testid="price-slider"
        />
        <div className="flex justify-between font-body text-sm text-[#5C636A]">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        onClick={clearFilters} 
        className="w-full"
        data-testid="clear-filters"
      >
        Clear Filters
      </Button>
    </div>
  );

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
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-8 border-b border-[#E5E5DF]">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search artworks..."
              className="w-full px-4 py-2 border border-[#E5E5DF] rounded-sm font-body text-sm focus:outline-none focus:border-[#0F3057]"
              data-testid="search-input"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden flex items-center gap-2" data-testid="mobile-filter-btn">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-heading text-xl">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
              const [by, order] = value.split('-');
              setSortBy(by);
              setSortOrder(order);
            }}>
              <SelectTrigger className="w-44" data-testid="sort-select">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at-desc">Newest First</SelectItem>
                <SelectItem value="created_at-asc">Oldest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="views-desc">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            {/* Grid Toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-[#E5E5DF] rounded-sm p-1">
              <button
                onClick={() => setGridView('large')}
                className={`p-2 rounded-sm ${gridView === 'large' ? 'bg-[#F5F5F0]' : ''}`}
                data-testid="grid-large"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridView('small')}
                className={`p-2 rounded-sm ${gridView === 'small' ? 'bg-[#F5F5F0]' : ''}`}
                data-testid="grid-small"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-[#0F3057]" />
                <h2 className="font-heading text-xl font-medium text-[#0F3057]">Filters</h2>
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
                <h3 className="font-heading text-2xl text-[#0F3057] mb-2">No Artworks Found</h3>
                <p className="font-body text-[#5C636A] mb-6">Try adjusting your filters or search terms.</p>
                <Button onClick={clearFilters} variant="outline" data-testid="empty-clear-filters">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="font-body text-sm text-[#5C636A] mb-6">{artworks.length} artworks found</p>
                <div className={`grid gap-6 ${gridView === 'large' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
                  {artworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;
