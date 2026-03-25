import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Clock, Star, Lightbulb, Building2, ArrowLeft, ArrowRight, Globe, Camera, Ticket, ChevronRight } from 'lucide-react';
import { worldArtGuides, artRegions } from '../data/worldArtGuides';

// Main Hub Page
export const WorldArtHubPage = () => {
  const totalCities = worldArtGuides.length;
  
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="world-art-hub">
      <section className="bg-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/education" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Education Hub
          </Link>
          <span className="inline-block px-4 py-1.5 bg-[#2D5A43]/30 text-[#7CB798] font-body text-xs tracking-[0.2em] uppercase mb-6">World Art Guide</span>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">Art Cities of the <span className="text-[#7CB798]">World</span></h1>
          <p className="font-body text-lg text-white/70 mt-6 max-w-3xl leading-relaxed">
            City-by-city guides for the discerning art traveler. Discover must-see museums, hidden gems, 
            gallery neighborhoods, and insider tips from {totalCities} world capitals of art.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/10">
              <span className="text-2xl font-heading text-[#7CB798]">{totalCities}</span>
              <span className="text-white/70 ml-2 text-sm">Art Cities</span>
            </div>
            <div className="px-4 py-2 bg-white/10">
              <span className="text-2xl font-heading text-[#7CB798]">6</span>
              <span className="text-white/70 ml-2 text-sm">Continents</span>
            </div>
          </div>
        </div>
      </section>

      {/* Region Navigation */}
      <section className="py-8 bg-[#F5F5F0] border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-4">
            {artRegions.map((region) => (
              <a 
                key={region.slug} 
                href={`#${region.slug}`}
                className="px-4 py-2 bg-white border border-[#E5E5DF] hover:border-[#2D5A43] hover:text-[#2D5A43] transition-colors text-sm font-medium"
              >
                {region.icon} {region.name} ({region.count})
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cities by Region */}
      {artRegions.map((region) => {
        const regionCities = worldArtGuides.filter(c => c.region === region.name);
        return (
          <section key={region.slug} id={region.slug} className="py-16 lg:py-20 border-b border-[#E5E5DF]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl">{region.icon}</span>
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">{region.name}</h2>
                  <p className="text-[#5C636A]">{region.highlight}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionCities.map((city) => (
                  <Link 
                    key={city.slug} 
                    to={`/world-art/${city.slug}`}
                    className="bg-white border border-[#E5E5DF] p-6 hover:shadow-xl hover:border-[#2D5A43]/30 transition-all group"
                    data-testid={`city-card-${city.slug}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#2D5A43]">{city.city}</h3>
                        <p className="text-sm text-[#5C636A]">{city.country}</p>
                      </div>
                      <Globe className="h-5 w-5 text-[#2D5A43]" />
                    </div>
                    <p className="text-[#0F3057] italic text-sm mb-4">"{city.tagline}"</p>
                    <p className="text-[#5C636A] text-sm line-clamp-2">{city.description}</p>
                    <div className="mt-4 pt-4 border-t border-[#E5E5DF]">
                      <p className="text-xs text-[#7CB798] font-medium">{city.mustSee.length} must-see spots</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 bg-[#2D5A43]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Planning an Art Trip?</h2>
          <p className="text-white/70 mb-8">Browse our curated collection of Sri Lankan art perfect for any space.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 bg-white text-[#2D5A43] px-8 py-3 font-medium hover:bg-white/90 transition-colors"
          >
            Explore the Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

// Individual City Guide Page
export const WorldArtCityPage = () => {
  const { slug } = useParams();
  const city = worldArtGuides.find(c => c.slug === slug);
  
  if (!city) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-[#0F3057] mb-4">City Guide Not Found</h1>
          <Link to="/world-art" className="text-[#2D5A43] hover:underline">Return to World Art Guide</Link>
        </div>
      </main>
    );
  }

  const cityIndex = worldArtGuides.findIndex(c => c.slug === slug);
  const prevCity = cityIndex > 0 ? worldArtGuides[cityIndex - 1] : null;
  const nextCity = cityIndex < worldArtGuides.length - 1 ? worldArtGuides[cityIndex + 1] : null;

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`city-page-${slug}`}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D5A43] via-[#1E3D2E] to-[#0A1015] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to="/world-art" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to World Art Guide
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm">{city.country}</span>
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm">{city.region}</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white mb-4">{city.city}</h1>
          <p className="text-[#7CB798] text-xl italic mb-6">"{city.tagline}"</p>
          <p className="font-body text-lg text-white/70 max-w-3xl leading-relaxed">{city.description}</p>
        </div>
      </section>

      {/* Best Time & Insider Tip */}
      <section className="py-8 bg-[#F5F5F0] border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-[#2D5A43] mt-1" />
              <div>
                <p className="font-medium text-[#0F3057]">Best Time to Visit</p>
                <p className="text-[#5C636A]">{city.bestTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Lightbulb className="h-6 w-6 text-[#E5A93C] mt-1" />
              <div>
                <p className="font-medium text-[#0F3057]">Insider Tip</p>
                <p className="text-[#5C636A]">{city.insiderTip}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Must See */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <Star className="h-6 w-6 text-[#E5A93C]" />
            <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">Must-See Destinations</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {city.mustSee.map((place, i) => (
              <div key={i} className="bg-white border border-[#E5E5DF] p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#E5A93C] text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <span className="font-medium text-[#0F3057]">{place}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden Gems */}
      <section className="py-16 lg:py-20 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <Camera className="h-6 w-6 text-[#2D5A43]" />
            <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">Hidden Gems</h2>
          </div>
          <p className="text-[#5C636A] mb-8 max-w-2xl">Beyond the famous names, these lesser-known spots reward the curious traveler.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {city.hiddenGems.map((gem, i) => (
              <div key={i} className="bg-white border border-[#E5E5DF] p-5 hover:border-[#2D5A43]/30 transition-colors">
                <p className="text-[#0F3057] font-medium">{gem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-6 w-6 text-[#B64E33]" />
            <h2 className="font-heading text-2xl lg:text-3xl text-[#0F3057]">Gallery Neighborhoods</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {city.neighborhoods.map((hood, i) => (
              <div key={i} className="bg-[#0F3057] p-6 text-white">
                <p className="text-white/90">{hood}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-[#F5F5F0] border-t border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {prevCity ? (
              <Link to={`/world-art/${prevCity.slug}`} className="flex items-center gap-3 text-[#0F3057] hover:text-[#2D5A43] transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <div>
                  <p className="text-sm text-[#5C636A]">Previous</p>
                  <p className="font-medium">{prevCity.city}</p>
                </div>
              </Link>
            ) : <div />}
            {nextCity ? (
              <Link to={`/world-art/${nextCity.slug}`} className="flex items-center gap-3 text-[#0F3057] hover:text-[#2D5A43] transition-colors text-right">
                <div>
                  <p className="text-sm text-[#5C636A]">Next</p>
                  <p className="font-medium">{nextCity.city}</p>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#2D5A43]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Bring {city.city} Home</h2>
          <p className="text-white/70 mb-8">Discover Sri Lankan art that captures the spirit of world masterpieces.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 bg-white text-[#2D5A43] px-8 py-3 font-medium hover:bg-white/90 transition-colors"
          >
            Explore the Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};
