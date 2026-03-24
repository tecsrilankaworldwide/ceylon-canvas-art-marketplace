import React from 'react';
import { Link } from 'react-router-dom';
import { events, techniques, artPeriods, priceGuides, collectorProfiles, galleryPartners, artMaterials, careerResources } from '../data/pagesData';

const EventsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="events-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Events & Exhibitions</h1><p className="text-white/70 mt-2">{events.length} upcoming events worldwide</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{events.map(e => (<Link key={e.slug} to={`/events/${e.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><span className="text-xs text-[#B64E33] uppercase">{e.type}</span><h2 className="font-heading text-xl text-[#0F3057] mt-2">{e.name}</h2><p className="text-sm text-[#5C636A] mt-1">{e.location} • {e.date}</p></Link>))}</div></section>
  </main>
);

const TechniquesIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="techniques-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Art Techniques & Tutorials</h1><p className="text-white/70 mt-2">Learn {techniques.length} artistic techniques</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{techniques.map(t => (<Link key={t.slug} to={`/techniques/${t.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><span className="text-xs text-[#E5A93C] uppercase">{t.level}</span><h2 className="font-heading text-xl text-[#0F3057] mt-2">{t.name}</h2><p className="text-sm text-[#5C636A] mt-1">{t.duration}</p></Link>))}</div></section>
  </main>
);

const ArtPeriodsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="periods-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Art History & Movements</h1><p className="text-white/70 mt-2">Explore {artPeriods.length} art periods</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{artPeriods.map(p => (<Link key={p.slug} to={`/art-history/${p.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><h2 className="font-heading text-xl text-[#0F3057]">{p.name}</h2><p className="text-sm text-[#5C636A] mt-1">{p.era} • {p.region}</p></Link>))}</div></section>
  </main>
);

const PriceGuidesIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="price-guides-index">
    <section className="bg-[#0F3057] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Price Guides & Valuations</h1><p className="text-white/70 mt-2">{priceGuides.length} pricing resources</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">{priceGuides.map(g => (<Link key={g.slug} to={`/price-guides/${g.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><h2 className="font-heading text-lg text-[#0F3057]">{g.name}</h2><p className="text-sm text-[#5C636A] mt-1">{g.range}</p></Link>))}</div></section>
  </main>
);

const CollectorProfilesIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="collector-profiles-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Collector Guides</h1><p className="text-white/70 mt-2">{collectorProfiles.length} collecting strategies</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{collectorProfiles.map(p => (<Link key={p.slug} to={`/collector-guides/${p.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><span className="text-xs text-[#B64E33] uppercase">{p.type}</span><h2 className="font-heading text-xl text-[#0F3057] mt-2">{p.name}</h2></Link>))}</div></section>
  </main>
);

const GalleryPartnersIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="gallery-partners-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Gallery Partners</h1><p className="text-white/70 mt-2">{galleryPartners.length} partner galleries worldwide</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{galleryPartners.map(g => (<Link key={g.slug} to={`/galleries/${g.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><h2 className="font-heading text-xl text-[#0F3057]">{g.name}</h2><p className="text-sm text-[#5C636A] mt-1">{g.city} • {g.specialty}</p></Link>))}</div></section>
  </main>
);

const ArtMaterialsIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="materials-index">
    <section className="bg-[#0F3057] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Art Materials Guide</h1><p className="text-white/70 mt-2">{artMaterials.length} material guides</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">{artMaterials.map(m => (<Link key={m.slug} to={`/materials/${m.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><span className="text-xs text-[#E5A93C] uppercase">{m.category}</span><h2 className="font-heading text-lg text-[#0F3057] mt-2">{m.name}</h2></Link>))}</div></section>
  </main>
);

const CareerResourcesIndexPage = () => (
  <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="career-resources-index">
    <section className="bg-[#0A1015] py-16"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Artist Career Resources</h1><p className="text-white/70 mt-2">{careerResources.length} career guides</p></div></section>
    <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{careerResources.map(r => (<Link key={r.slug} to={`/artist-resources/${r.slug}`} className="p-6 border border-[#E5E5DF] hover:shadow-lg"><span className="text-xs text-[#B64E33] uppercase">{r.topic}</span><h2 className="font-heading text-xl text-[#0F3057] mt-2">{r.name}</h2></Link>))}</div></section>
  </main>
);

export { EventsIndexPage, TechniquesIndexPage, ArtPeriodsIndexPage, PriceGuidesIndexPage, CollectorProfilesIndexPage, GalleryPartnersIndexPage, ArtMaterialsIndexPage, CareerResourcesIndexPage };
