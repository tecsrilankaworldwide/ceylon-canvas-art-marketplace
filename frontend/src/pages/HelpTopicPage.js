import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { helpTopics } from '../data/pagesData';

const HelpTopicPage = () => {
  const { slug } = useParams();
  const topic = helpTopics.find(t => t.slug === slug) || helpTopics[0];
  const categoryTopics = helpTopics.filter(t => t.category === topic.category && t.slug !== slug);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`help-topic-${slug}`}>
      <section className="bg-[#0F3057] py-12">
        <div className="max-w-4xl mx-auto px-6"><h1 className="font-heading text-3xl text-white">Help Center</h1></div>
      </section>
      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1">
          <h3 className="font-heading text-lg text-[#0F3057] mb-4">{topic.category}</h3>
          <ul className="space-y-2">
            {helpTopics.filter(t => t.category === topic.category).map(t => (
              <li key={t.slug}><Link to={`/help/${t.slug}`} className={`text-sm ${t.slug === slug ? 'text-[#0F3057] font-medium' : 'text-[#5C636A] hover:text-[#0F3057]'}`}>{t.title}</Link></li>
            ))}
          </ul>
        </aside>
        <article className="lg:col-span-3">
          <Link to="/help" className="inline-flex items-center gap-2 text-sm text-[#5C636A] hover:text-[#0F3057] mb-6"><ChevronLeft className="h-4 w-4" />All Topics</Link>
          <h1 className="font-heading text-3xl text-[#0F3057]">{topic.title}</h1>
          <div className="mt-8 prose max-w-none">
            <p className="text-[#5C636A] leading-relaxed">This guide covers everything you need to know about {topic.title.toLowerCase()}. Follow the steps below to get started.</p>
            <h2 className="font-heading text-xl text-[#0F3057] mt-8 mb-4">Getting Started</h2>
            <p className="text-[#5C636A] leading-relaxed">Begin by navigating to the relevant section of your account. Our platform is designed to make this process as straightforward as possible.</p>
            <h2 className="font-heading text-xl text-[#0F3057] mt-8 mb-4">Step-by-Step Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-[#5C636A]">
              <li>Log in to your Ceylon Canvas account</li>
              <li>Navigate to your dashboard</li>
              <li>Select the appropriate option from the menu</li>
              <li>Follow the on-screen prompts</li>
              <li>Confirm your changes</li>
            </ol>
            <h2 className="font-heading text-xl text-[#0F3057] mt-8 mb-4">Need More Help?</h2>
            <p className="text-[#5C636A] leading-relaxed">If you're still experiencing issues, please <Link to="/help/contact-support" className="text-[#0F3057] underline">contact our support team</Link>. We're here to help 24/7.</p>
          </div>
        </article>
      </div>
    </main>
  );
};
export default HelpTopicPage;
