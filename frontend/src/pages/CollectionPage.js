import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Tag, DollarSign, Image } from 'lucide-react';
import { Button } from '../components/ui/button';
import { collections } from '../data/pagesData';

const CollectionPage = () => {
  const { slug } = useParams();
  const collection = collections.find(c => c.slug === slug) || collections[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`collection-page-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">Collection</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">{collection.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-2xl">{collection.description}</p>
          <div className="flex gap-8 mt-8">
            <div><span className="text-[#E5A93C] font-heading text-2xl">{collection.works}</span><p className="text-white/60 text-sm">Artworks</p></div>
            <div><span className="text-white font-heading text-2xl">{collection.priceRange}</span><p className="text-white/60 text-sm">Price Range</p></div>
          </div>
          <Link to={`/gallery?collection=${slug}`}><Button className="mt-8 bg-[#E5A93C] text-[#0A1015] rounded-none px-8 py-6">Browse Collection<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
        </div>
      </section>
      <section className="py-20"><div className="max-w-7xl mx-auto px-6 lg:px-12"><h2 className="font-heading text-3xl text-[#0F3057] mb-8">Featured in {collection.name}</h2><div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">{[1,2,3,4,5,6,7,8].map(i => (<div key={i} className="group"><div className="aspect-[3/4] bg-[#F5F5F0] flex items-center justify-center mb-3"><Image className="h-12 w-12 text-[#E5E5DF]" /></div><h3 className="font-heading text-sm text-[#0F3057]">Artwork Title</h3><p className="text-xs text-[#5C636A]">Artist Name</p></div>))}</div></div></section>
    </main>
  );
};
export default CollectionPage;
