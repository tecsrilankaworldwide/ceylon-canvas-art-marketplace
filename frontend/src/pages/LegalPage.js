import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { legalPages } from '../data/pagesData';

const LegalPage = () => {
  const { slug } = useParams();
  const page = legalPages.find(p => p.slug === slug) || legalPages[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`legal-page-${slug}`}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/legal" className="inline-flex items-center gap-2 text-sm text-[#5C636A] hover:text-[#0F3057] mb-8"><ChevronLeft className="h-4 w-4" />All Legal Documents</Link>
        <h1 className="font-heading text-4xl text-[#0F3057]">{page.title}</h1>
        <p className="text-sm text-[#5C636A] mt-2">Last updated: December 1, 2025</p>
        <div className="mt-12 prose max-w-none">
          <h2 className="font-heading text-xl text-[#0F3057]">1. Introduction</h2>
          <p className="text-[#5C636A] leading-relaxed">Welcome to Ceylon Canvas. This {page.title.toLowerCase()} governs your use of our platform and services. By accessing or using our website, you agree to be bound by these terms.</p>
          <h2 className="font-heading text-xl text-[#0F3057] mt-8">2. Definitions</h2>
          <p className="text-[#5C636A] leading-relaxed">"Platform" refers to the Ceylon Canvas website and all associated services. "User" refers to any individual or entity accessing our platform. "Content" refers to all materials, including artwork, text, images, and user-generated content.</p>
          <h2 className="font-heading text-xl text-[#0F3057] mt-8">3. User Obligations</h2>
          <p className="text-[#5C636A] leading-relaxed">Users must provide accurate information, maintain account security, comply with all applicable laws, and respect intellectual property rights. Prohibited activities include fraud, harassment, and unauthorized commercial use.</p>
          <h2 className="font-heading text-xl text-[#0F3057] mt-8">4. Intellectual Property</h2>
          <p className="text-[#5C636A] leading-relaxed">All content on the platform is protected by copyright and other intellectual property laws. Artists retain ownership of their works while granting Ceylon Canvas limited license for display and marketing purposes.</p>
          <h2 className="font-heading text-xl text-[#0F3057] mt-8">5. Limitation of Liability</h2>
          <p className="text-[#5C636A] leading-relaxed">Ceylon Canvas provides the platform "as is" without warranties. We are not liable for indirect, incidental, or consequential damages arising from platform use.</p>
          <h2 className="font-heading text-xl text-[#0F3057] mt-8">6. Contact Information</h2>
          <p className="text-[#5C636A] leading-relaxed">For questions about this {page.title.toLowerCase()}, please contact us at legal@ceyloncanvas.com.</p>
        </div>
      </div>
    </main>
  );
};
export default LegalPage;
