import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { legalPages } from '../data/pagesData';

const LegalIndexPage = () => {
  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="legal-index-page">
      <section className="bg-[#0F3057] py-16">
        <div className="max-w-4xl mx-auto px-6"><h1 className="font-heading text-4xl text-white">Legal & Policies</h1><p className="text-white/70 mt-2">Important documents governing your use of Ceylon Canvas</p></div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {legalPages.map(page => (
              <Link key={page.slug} to={`/legal/${page.slug}`} className="flex items-center gap-4 p-6 border border-[#E5E5DF] hover:border-[#0F3057] hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-[#0F3057]/10 flex items-center justify-center"><FileText className="h-6 w-6 text-[#0F3057]" /></div>
                <div><h2 className="font-heading text-lg text-[#0F3057] group-hover:text-[#B64E33]">{page.title}</h2><p className="text-sm text-[#5C636A]">Last updated: Dec 2025</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default LegalIndexPage;
