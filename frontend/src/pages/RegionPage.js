import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Building2, Users, Image } from 'lucide-react';
import { Button } from '../components/ui/button';
import { regions } from '../data/pagesData';

const RegionPage = () => {
  const { slug } = useParams();
  const region = regions.find(r => r.slug === slug) || regions[0];
  const isSriLanka = region.country === 'Sri Lanka';

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`region-page-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">{region.country}</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">{region.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-2xl">{region.description}</p>
          <div className="flex gap-8 mt-8">
            {isSriLanka ? (
              <><div><span className="text-[#E5A93C] font-heading text-2xl">{region.galleries}</span><p className="text-white/60 text-sm">Galleries</p></div>
              <div><span className="text-white font-heading text-2xl">{region.artists}</span><p className="text-white/60 text-sm">Artists</p></div></>
            ) : (
              <><div><span className="text-[#E5A93C] font-heading text-2xl">{region.collectors}</span><p className="text-white/60 text-sm">Collectors</p></div>
              <div><span className="text-white font-heading text-2xl">{region.galleries}</span><p className="text-white/60 text-sm">Galleries</p></div></>
            )}
          </div>
          <Link to={`/gallery?region=${slug}`}><Button className="mt-8 bg-[#E5A93C] text-[#0A1015] rounded-none px-8 py-6">Explore Art from {region.name}<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
        </div>
      </section>
      <section className="py-20"><div className="max-w-7xl mx-auto px-6 lg:px-12"><h2 className="font-heading text-3xl text-[#0F3057] mb-8">{isSriLanka ? `Artists from ${region.name}` : `Art Collectors in ${region.name}`}</h2><div className="grid md:grid-cols-4 gap-6">{[1,2,3,4].map(i => (<div key={i} className="p-6 border border-[#E5E5DF]"><div className="w-16 h-16 bg-[#F5F5F0] rounded-full mb-4" /><h3 className="font-heading text-lg text-[#0F3057]">Featured {isSriLanka ? 'Artist' : 'Collector'}</h3></div>))}</div></div></section>
    </main>
  );
};
export default RegionPage;
