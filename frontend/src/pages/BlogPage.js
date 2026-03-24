import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/pagesData';

const BlogPage = () => {
  const categories = [...new Set(blogPosts.map(p => p.category))];
  const featured = blogPosts[0];

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="blog-page">
      <section className="bg-[#0A1015] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h1 className="font-heading text-4xl lg:text-6xl font-medium text-white">Art Insights & Guides</h1>
          <p className="font-body text-lg text-white/70 mt-4">Expert knowledge for collectors and enthusiasts</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link to={`/blog/${featured.slug}`} className="grid lg:grid-cols-2 gap-8 group">
            <div className="aspect-video bg-[#F5F5F0]" />
            <div className="flex flex-col justify-center">
              <span className="text-[#B64E33] text-sm uppercase tracking-wider">{featured.category}</span>
              <h2 className="font-heading text-3xl text-[#0F3057] group-hover:text-[#B64E33] mt-2">{featured.title}</h2>
              <div className="flex gap-4 mt-4 text-sm text-[#5C636A]">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{featured.readTime}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section className="py-16 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button key={cat} className="px-4 py-2 bg-white border border-[#E5E5DF] text-sm whitespace-nowrap hover:border-[#0F3057]">{cat}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, i) => (
              <Link key={i} to={`/blog/${post.slug}`} className="bg-white border border-[#E5E5DF] group">
                <div className="aspect-video bg-[#F5F5F0]" />
                <div className="p-6">
                  <span className="text-xs text-[#B64E33] uppercase">{post.category}</span>
                  <h3 className="font-heading text-xl text-[#0F3057] group-hover:text-[#B64E33] mt-2">{post.title}</h3>
                  <div className="flex justify-between items-center mt-4 text-sm text-[#5C636A]">
                    <span>{post.readTime}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default BlogPage;
