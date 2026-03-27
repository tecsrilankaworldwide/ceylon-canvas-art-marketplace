import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Palette, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { artStyles } from '../data/pagesData';

// Art style images from Pexels/Unsplash
const styleImages = {
  'impressionism': [
    'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/2911544/pexels-photo-2911544.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/2824173/pexels-photo-2824173.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&w=600'
  ],
  'abstract-expressionism': [
    'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&w=600',
    'https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&w=600'
  ],
  'default': [
    'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/2824173/pexels-photo-2824173.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&w=600',
    'https://images.pexels.com/photos/3059658/pexels-photo-3059658.jpeg?auto=compress&w=600',
    'https://images.pexels.com/photos/12047518/pexels-photo-12047518.jpeg?auto=compress&w=600'
  ]
};

const StylePage = () => {
  const { slug } = useParams();
  const style = artStyles.find(s => s.slug === slug) || artStyles[0];
  const images = styleImages[slug] || styleImages['default'];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`style-page-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">Art Style</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">{style.name}</h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-2xl">{style.description}</p>
          <div className="flex gap-8 mt-8">
            <div><span className="text-[#E5A93C] font-heading text-2xl">{style.artists}</span><p className="text-white/60 text-sm">Artists</p></div>
            <div><span className="text-white font-heading text-2xl">{style.origin}</span><p className="text-white/60 text-sm">Origin</p></div>
          </div>
          <Link to={`/gallery?style=${slug}`}><Button className="mt-8 bg-[#E5A93C] text-[#0A1015] rounded-none px-8 py-6">Browse {style.name} Art<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-[#0F3057] mb-8">Featured {style.name} Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {images.map((img, i) => (
              <div key={i} className="aspect-[3/4] bg-[#F5F5F0] overflow-hidden group cursor-pointer">
                <img src={img} alt={`${style.name} artwork ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default StylePage;
