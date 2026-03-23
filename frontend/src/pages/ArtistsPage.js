import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArtistCard } from '../components/ArtistCard';
import { getArtists } from '../services/api';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');

  useEffect(() => {
    const loadArtists = async () => {
      setLoading(true);
      try {
        const params = { limit: 50 };
        if (specialty) params.specialty = specialty;
        const data = await getArtists(params);
        setArtists(data);
      } catch (error) {
        console.error('Error loading artists:', error);
      } finally {
        setLoading(false);
      }
    };
    loadArtists();
  }, [specialty]);

  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(search.toLowerCase()) ||
    artist.location?.toLowerCase().includes(search.toLowerCase())
  );

  const specialties = ['painting', 'sculpture', 'digital', 'photography', 'traditional', 'mixed-media', 'ceramics', 'textile'];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="artists-page">
      {/* Header */}
      <section className="bg-[#0A1015] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-[#E5A93C] font-semibold">
            Meet The Creators
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white mt-2">
            Our Artists
          </h1>
          <p className="font-body text-base text-white/70 mt-4 max-w-xl">
            Discover talented Sri Lankan artists creating exceptional works from traditional to contemporary.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b border-[#E5E5DF]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C636A]" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search artists..."
              className="pl-10"
              data-testid="search-artists"
            />
          </div>
          
          <Select value={specialty || 'all'} onValueChange={(val) => setSpecialty(val === 'all' ? '' : val)}>
            <SelectTrigger className="w-48" data-testid="specialty-select">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((spec) => (
                <SelectItem key={spec} value={spec} className="capitalize">
                  {spec.replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Artists Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton h-72 rounded-sm" />
            ))}
          </div>
        ) : filteredArtists.length === 0 ? (
          <div className="empty-state py-20">
            <h3 className="font-heading text-2xl text-[#0F3057] mb-2">No Artists Found</h3>
            <p className="font-body text-[#5C636A]">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <p className="font-body text-sm text-[#5C636A] mb-6">{filteredArtists.length} artists</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ArtistsPage;
