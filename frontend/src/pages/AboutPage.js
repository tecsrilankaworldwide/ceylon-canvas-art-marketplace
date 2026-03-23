import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Globe, Award } from 'lucide-react';
import { Button } from '../components/ui/button';

const AboutPage = () => {
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="about-page">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src="https://images.pexels.com/photos/2097218/pexels-photo-2097218.jpeg"
          alt="Art Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A1015]/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-[#E5A93C] font-semibold">
              About Us
            </span>
            <h1 className="font-heading text-4xl lg:text-5xl font-medium text-white mt-4">
              Connecting Sri Lankan Art<br />with the World
            </h1>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057]">Our Mission</h2>
          <p className="font-body text-lg text-[#5C636A] mt-6 leading-relaxed">
            Ceylon Canvas is dedicated to preserving and promoting Sri Lankan artistic heritage while 
            providing a global platform for both established and emerging artists. We believe art has 
            the power to connect cultures, tell stories, and create lasting value for collectors worldwide.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057]">What We Stand For</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0F3057] flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#E5A93C]" />
              </div>
              <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-2">Authenticity</h3>
              <p className="font-body text-sm text-[#5C636A]">
                Every artwork is verified and curated to ensure genuine Sri Lankan artistry.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0F3057] flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#E5A93C]" />
              </div>
              <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-2">Community</h3>
              <p className="font-body text-sm text-[#5C636A]">
                Supporting artists and collectors through a thriving creative community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0F3057] flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-[#E5A93C]" />
              </div>
              <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-2">Global Reach</h3>
              <p className="font-body text-sm text-[#5C636A]">
                Bringing Sri Lankan art to collectors across the world.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0F3057] flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[#E5A93C]" />
              </div>
              <h3 className="font-heading text-xl font-medium text-[#0F3057] mb-2">Heritage</h3>
              <p className="font-body text-sm text-[#5C636A]">
                Preserving and celebrating Ceylon's rich artistic traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-body text-xs tracking-[0.2em] uppercase text-[#B64E33] font-semibold">
                Our Story
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#0F3057] mt-2">
                From Colombo to the World
              </h2>
              <p className="font-body text-[#5C636A] mt-6 leading-relaxed">
                Founded with a passion for Sri Lankan art, Ceylon Canvas began as a dream to showcase 
                the incredible talent found across the island. From the bustling streets of Colombo 
                to the serene highlands of Kandy, our artists draw inspiration from a land rich in 
                history, culture, and natural beauty.
              </p>
              <p className="font-body text-[#5C636A] mt-4 leading-relaxed">
                Today, we've grown into a thriving marketplace connecting hundreds of artists with 
                collectors around the globe. Every purchase supports local artists and helps preserve 
                Sri Lanka's artistic heritage for future generations.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1720945489924-19b707539b3a?w=800"
                alt="Sri Lankan Art"
                className="w-full rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[#0F3057]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-medium text-white">
            Ready to Explore?
          </h2>
          <p className="font-body text-white/80 mt-4">
            Discover the beauty of Sri Lankan art or join our community of artists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/gallery">
              <Button className="bg-[#E5A93C] text-[#0A1015] hover:bg-[#d4992f] font-semibold tracking-wider uppercase text-xs px-8 py-4 rounded-sm">
                Browse Gallery
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0F3057] rounded-sm px-8 py-4">
                Become an Artist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl font-medium text-[#0F3057] mb-6">Get in Touch</h2>
          <p className="font-body text-[#5C636A] mb-8">
            Have questions? We'd love to hear from you.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#F5F5F0] p-6 rounded-sm">
              <h3 className="font-heading text-lg font-medium text-[#0F3057] mb-2">For Collectors</h3>
              <p className="font-body text-sm text-[#5C636A]">collectors@ceyloncanvas.com</p>
            </div>
            <div className="bg-[#F5F5F0] p-6 rounded-sm">
              <h3 className="font-heading text-lg font-medium text-[#0F3057] mb-2">For Artists</h3>
              <p className="font-body text-sm text-[#5C636A]">artists@ceyloncanvas.com</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
