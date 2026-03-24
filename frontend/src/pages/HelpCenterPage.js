import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, HelpCircle, CreditCard, Truck, Gavel, Palette, Shield, MessageCircle } from 'lucide-react';
import { helpTopics } from '../data/pagesData';

const HelpCenterPage = () => {
  const categories = [...new Set(helpTopics.map(t => t.category))];
  const categoryIcons = { Account: HelpCircle, Payments: CreditCard, Shipping: Truck, Auctions: Gavel, Artists: Palette, Trust: Shield, Support: MessageCircle };

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="help-center-page">
      <section className="bg-[#0F3057] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl text-white">How can we help?</h1>
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C636A]" />
            <input type="text" placeholder="Search help articles..." className="w-full pl-12 pr-4 py-4 rounded-none border-0" />
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => {
              const Icon = categoryIcons[category] || HelpCircle;
              const catTopics = helpTopics.filter(t => t.category === category);
              return (
                <div key={category} className="border border-[#E5E5DF] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#0F3057]/10 flex items-center justify-center"><Icon className="h-5 w-5 text-[#0F3057]" /></div>
                    <h2 className="font-heading text-xl text-[#0F3057]">{category}</h2>
                  </div>
                  <ul className="space-y-2">
                    {catTopics.slice(0, 5).map(topic => (
                      <li key={topic.slug}><Link to={`/help/${topic.slug}`} className="text-sm text-[#5C636A] hover:text-[#0F3057] flex items-center justify-between group">{topic.title}<ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100" /></Link></li>
                    ))}
                  </ul>
                  {catTopics.length > 5 && <Link to={`/help?category=${category}`} className="text-sm text-[#0F3057] mt-4 inline-block">View all {catTopics.length} articles</Link>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl text-[#0F3057]">Still need help?</h2>
          <p className="text-[#5C636A] mt-2">Our support team is available 24/7</p>
          <Link to="/help/contact-support" className="inline-block mt-6 px-8 py-3 bg-[#0F3057] text-white">Contact Support</Link>
        </div>
      </section>
    </main>
  );
};
export default HelpCenterPage;
