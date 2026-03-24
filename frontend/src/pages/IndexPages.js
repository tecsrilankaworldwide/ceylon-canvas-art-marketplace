import React from 'react';
import { Link } from 'react-router-dom';
import { artStyles, regions, collections, artistSpotlights } from '../data/pagesData';

const StylesIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="styles-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Art Styles & Movements</h1><p className="text-white/70 mt-2">Explore {artStyles.length} artistic styles</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {artStyles.map(s => (<Link key={s.slug} to={`/styles/${s.slug}`} className="p-6 border border-[#E5E5DF] hover:border-[#0F3057] hover:shadow-lg"><h2 className="font-heading text-lg text-[#0F3057]">{s.name}</h2><p className="text-sm text-[#5C636A] mt-1">{s.artists} artists</p></Link>))}
    </div></section>
  </main>
);

const RegionsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="regions-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Art Destinations</h1><p className="text-white/70 mt-2">Explore art scenes in {regions.length} locations</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6"><h2 className="font-heading text-2xl text-[#0F3057] mb-6">Sri Lanka</h2><div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
      {regions.filter(r => r.country === 'Sri Lanka').map(r => (<Link key={r.slug} to={`/regions/${r.slug}`} className="p-6 border border-[#E5E5DF] hover:border-[#0F3057]"><h3 className="font-heading text-lg text-[#0F3057]">{r.name}</h3><p className="text-sm text-[#5C636A]">{r.artists} artists</p></Link>))}
    </div><h2 className="font-heading text-2xl text-[#0F3057] mb-6">International Markets</h2><div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
      {regions.filter(r => r.country !== 'Sri Lanka').map(r => (<Link key={r.slug} to={`/regions/${r.slug}`} className="p-6 border border-[#E5E5DF] hover:border-[#0F3057]"><h3 className="font-heading text-lg text-[#0F3057]">{r.name}</h3><p className="text-sm text-[#5C636A]">{r.country}</p></Link>))}
    </div></div></section>
  </main>
);

const CollectionsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="collections-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Curated Collections</h1><p className="text-white/70 mt-2">Browse {collections.length} themed collections</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {collections.map(c => (<Link key={c.slug} to={`/collections/${c.slug}`} className="border border-[#E5E5DF] hover:shadow-lg"><div className="aspect-video bg-[#F5F5F0]" /><div className="p-6"><h2 className="font-heading text-xl text-[#0F3057]">{c.name}</h2><p className="text-sm text-[#5C636A] mt-1">{c.works} works • {c.priceRange}</p></div></Link>))}
    </div></section>
  </main>
);

const ArtistSpotlightsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="spotlights-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Artist Spotlights</h1><p className="text-white/70 mt-2">Meet {artistSpotlights.length} featured artists</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artistSpotlights.map(a => (<Link key={a.slug} to={`/spotlights/${a.slug}`} className="group"><div className="aspect-square bg-[#F5F5F0] mb-4" /><h2 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33]">{a.name}</h2><p className="text-sm text-[#5C636A]">{a.specialty} • {a.location}</p></Link>))}
    </div></section>
  </main>
);

export { StylesIndexPage, RegionsIndexPage, CollectionsIndexPage, ArtistSpotlightsIndexPage };
