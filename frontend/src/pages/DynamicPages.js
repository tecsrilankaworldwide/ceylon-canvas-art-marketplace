import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users, Image } from 'lucide-react';
import { Button } from '../components/ui/button';
import { events } from '../data/pagesData';

const EventPage = () => {
  const { slug } = useParams();
  const event = events.find(e => e.slug === slug) || events[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`event-page-${slug}`}>
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="inline-block px-4 py-1.5 bg-[#E5A93C]/20 text-[#E5A93C] font-body text-xs tracking-[0.2em] uppercase mb-6">{event.type}</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">{event.name}</h1>
          <div className="flex gap-6 mt-6 text-white/70">
            <span className="flex items-center gap-2"><MapPin className="h-5 w-5" />{event.location}</span>
            <span className="flex items-center gap-2"><Calendar className="h-5 w-5" />{event.date}</span>
          </div>
          <Link to="/gallery"><Button className="mt-8 bg-[#E5A93C] text-[#0A1015] rounded-none px-8 py-6">View Featured Art<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
        </div>
      </section>
      <section className="py-20"><div className="max-w-4xl mx-auto px-6 prose"><h2 className="font-heading text-2xl text-[#0F3057]">About This Event</h2><p className="text-[#5C636A]">Join us at {event.name} in {event.location}. This {event.type.toLowerCase()} brings together leading artists, collectors, and galleries from around the world.</p></div></section>
    </main>
  );
};

const TechniquePage = () => {
  const { slug } = useParams();
  const { techniques } = require('../data/pagesData');
  const technique = techniques.find(t => t.slug === slug) || techniques[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`technique-page-${slug}`}>
      <section className="bg-[#0A1015] py-20"><div className="max-w-7xl mx-auto px-6"><span className="text-[#E5A93C] text-xs uppercase tracking-wider">{technique.level} • {technique.duration}</span><h1 className="font-heading text-4xl lg:text-5xl text-white mt-4">{technique.name}</h1></div></section>
      <section className="py-16"><div className="max-w-4xl mx-auto px-6 prose"><p className="text-[#5C636A]">Master the art of {technique.name.toLowerCase()} with our comprehensive guide covering fundamentals to advanced techniques.</p></div></section>
    </main>
  );
};

const ArtPeriodPage = () => {
  const { slug } = useParams();
  const { artPeriods } = require('../data/pagesData');
  const period = artPeriods.find(p => p.slug === slug) || artPeriods[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`period-page-${slug}`}>
      <section className="bg-[#0A1015] py-20"><div className="max-w-7xl mx-auto px-6"><span className="text-[#E5A93C] text-xs uppercase tracking-wider">{period.era} • {period.region}</span><h1 className="font-heading text-4xl lg:text-5xl text-white mt-4">{period.name}</h1></div></section>
      <section className="py-16"><div className="max-w-4xl mx-auto px-6 prose"><p className="text-[#5C636A]">Explore the rich history of {period.name}, one of the most influential movements in art history originating from {period.region}.</p></div></section>
    </main>
  );
};

const PriceGuidePage = () => {
  const { slug } = useParams();
  const { priceGuides } = require('../data/pagesData');
  const guide = priceGuides.find(g => g.slug === slug) || priceGuides[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`price-guide-${slug}`}>
      <section className="bg-[#0F3057] py-20"><div className="max-w-7xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">{guide.name}</h1><p className="text-white/70 mt-4">Price Range: {guide.range}</p></div></section>
      <section className="py-16"><div className="max-w-4xl mx-auto px-6 prose"><p className="text-[#5C636A]">Understanding {guide.name.toLowerCase()} is essential for making informed collecting decisions.</p></div></section>
    </main>
  );
};

const CollectorProfilePage = () => {
  const { slug } = useParams();
  const { collectorProfiles } = require('../data/pagesData');
  const profile = collectorProfiles.find(p => p.slug === slug) || collectorProfiles[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`collector-profile-${slug}`}>
      <section className="bg-[#0A1015] py-20"><div className="max-w-7xl mx-auto px-6"><span className="text-[#E5A93C] text-xs uppercase tracking-wider">{profile.type}</span><h1 className="font-heading text-4xl lg:text-5xl text-white mt-4">{profile.name}</h1></div></section>
      <section className="py-16"><div className="max-w-4xl mx-auto px-6 prose"><p className="text-[#5C636A]">Learn about {profile.name.toLowerCase()} and discover strategies for building a meaningful collection.</p></div></section>
    </main>
  );
};

const GalleryPartnerPage = () => {
  const { slug } = useParams();
  const { galleryPartners } = require('../data/pagesData');
  const gallery = galleryPartners.find(g => g.slug === slug) || galleryPartners[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`gallery-partner-${slug}`}>
      <section className="bg-[#0A1015] py-20"><div className="max-w-7xl mx-auto px-6"><span className="text-[#E5A93C] text-xs uppercase tracking-wider">{gallery.city} • {gallery.specialty}</span><h1 className="font-heading text-4xl lg:text-5xl text-white mt-4">{gallery.name}</h1></div></section>
      <section className="py-16"><div className="max-w-4xl mx-auto px-6 prose"><p className="text-[#5C636A]">{gallery.name} is a leading gallery in {gallery.city} specializing in {gallery.specialty.toLowerCase()} art.</p></div></section>
    </main>
  );
};

const ArtMaterialPage = () => {
  const { slug } = useParams();
  const { artMaterials } = require('../data/pagesData');
  const material = artMaterials.find(m => m.slug === slug) || artMaterials[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`material-page-${slug}`}>
      <section className="bg-[#0F3057] py-20"><div className="max-w-7xl mx-auto px-6"><span className="text-[#E5A93C] text-xs uppercase tracking-wider">{material.category}</span><h1 className="font-heading text-4xl text-white mt-4">{material.name}</h1></div></section>
      <section className="py-16"><div className="max-w-4xl mx-auto px-6 prose"><p className="text-[#5C636A]">Everything you need to know about {material.name.toLowerCase()} for your artistic practice.</p></div></section>
    </main>
  );
};

const CareerResourcePage = () => {
  const { slug } = useParams();
  const { careerResources } = require('../data/pagesData');
  const resource = careerResources.find(r => r.slug === slug) || careerResources[0];
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`career-resource-${slug}`}>
      <section className="bg-[#0A1015] py-20"><div className="max-w-7xl mx-auto px-6"><span className="text-[#E5A93C] text-xs uppercase tracking-wider">{resource.topic}</span><h1 className="font-heading text-4xl lg:text-5xl text-white mt-4">{resource.name}</h1></div></section>
      <section className="py-16"><div className="max-w-4xl mx-auto px-6 prose"><p className="text-[#5C636A]">A comprehensive guide to {resource.name.toLowerCase()} for artists at any stage of their career.</p></div></section>
    </main>
  );
};

export { EventPage, TechniquePage, ArtPeriodPage, PriceGuidePage, CollectorProfilePage, GalleryPartnerPage, ArtMaterialPage, CareerResourcePage };
