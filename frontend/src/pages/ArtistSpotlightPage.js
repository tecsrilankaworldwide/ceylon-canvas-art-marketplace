import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Award, Image, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { artistSpotlights } from '../data/pagesData';

const ArtistSpotlightPage = () => {
  const { slug } = useParams();
  const artist = artistSpotlights.find(a => a.slug === slug) || artistSpotlights[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`artist-spotlight-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">Featured Artist</span>
            <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">{artist.name}</h1>
            <p className="font-body text-lg text-white/70 mt-4 flex items-center gap-2"><MapPin className="h-5 w-5" />{artist.location}, Sri Lanka</p>
            <div className="flex items-center gap-2 mt-4"><Award className="h-5 w-5 text-[#E5A93C]" /><span className="text-white">{artist.specialty}</span></div>
            <p className="font-body text-white/60 mt-6 leading-relaxed">A master of {artist.specialty.toLowerCase()}, {artist.name} has been creating captivating works that blend traditional Sri Lankan aesthetics with contemporary vision for over two decades.</p>
            <div className="flex gap-4 mt-8">
              <Link to={`/gallery?artist=${slug}`}><Button className="bg-[#E5A93C] text-[#0A1015] rounded-none px-8 py-6">View Portfolio<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
              <Button variant="outline" className="rounded-none px-8 py-6 border-white/30 text-white"><MessageCircle className="mr-2 h-5 w-5" />Contact Artist</Button>
            </div>
          </div>
          <div className="aspect-square bg-[#1A1D20] flex items-center justify-center"><Image className="h-24 w-24 text-[#5C636A]" /></div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-8">Selected Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-[#F5F5F0] flex items-center justify-center mb-4"><Image className="h-12 w-12 text-[#E5E5DF]" /></div>
                <h3 className="font-heading text-lg text-[#0F3057] group-hover:text-[#B64E33]">Artwork Title {i}</h3>
                <p className="text-sm text-[#5C636A]">{artist.specialty} • 2024</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-8">About the Artist</h2>
          <div className="prose max-w-none">
            <p className="text-[#5C636A] leading-relaxed">{artist.name} began their artistic journey in the vibrant art scene of {artist.location}. Drawing inspiration from Sri Lanka's rich cultural heritage and natural beauty, their work has evolved into a distinctive style that has garnered international recognition.</p>
            <p className="text-[#5C636A] leading-relaxed mt-4">Their pieces have been exhibited in galleries across Asia and Europe, and are held in private collections worldwide. Each work represents a deep connection to Sri Lankan identity while speaking a universal visual language that resonates with collectors globally.</p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default ArtistSpotlightPage;
