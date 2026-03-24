import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Tag, User, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { blogPosts } from '../data/pagesData';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];
  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.slug !== slug).slice(0, 3);

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid={`blog-post-${slug}`}>
      <article className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#5C636A] hover:text-[#0F3057] mb-8"><ChevronLeft className="h-4 w-4" />Back to Blog</Link>
        <span className="inline-block px-3 py-1 bg-[#0F3057]/10 text-[#0F3057] text-xs uppercase tracking-wider mb-4">{post.category}</span>
        <h1 className="font-heading text-4xl lg:text-5xl font-medium text-[#0F3057] leading-tight">{post.title}</h1>
        <div className="flex items-center gap-6 mt-6 text-sm text-[#5C636A]">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{post.date}</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime} read</span>
        </div>
        <div className="aspect-video bg-[#F5F5F0] mt-10 mb-10" />
        <div className="prose prose-lg max-w-none">
          <p className="font-body text-[#5C636A] leading-relaxed">This comprehensive guide explores everything you need to know about {post.title.toLowerCase()}. Whether you're a seasoned collector or just beginning your journey into the world of art, understanding these concepts is essential for making informed decisions.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10 mb-4">Understanding the Basics</h2>
          <p className="font-body text-[#5C636A] leading-relaxed">The art market has evolved significantly over the past decade, with new platforms and technologies transforming how collectors discover, evaluate, and acquire artworks. Sri Lankan art, in particular, represents a unique opportunity for collectors seeking both cultural significance and investment potential.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10 mb-4">Key Considerations</h2>
          <p className="font-body text-[#5C636A] leading-relaxed">When approaching this subject, there are several critical factors to consider. Authentication, provenance, condition, and market trends all play crucial roles in determining value and making sound collecting decisions.</p>
          <h2 className="font-heading text-2xl text-[#0F3057] mt-10 mb-4">Expert Recommendations</h2>
          <p className="font-body text-[#5C636A] leading-relaxed">Our team of art advisors recommends taking a measured approach, building relationships with trusted galleries and artists, and focusing on pieces that resonate with your personal aesthetic while also demonstrating strong fundamentals from an investment perspective.</p>
        </div>
        <div className="border-t border-[#E5E5DF] mt-16 pt-16">
          <h3 className="font-heading text-2xl text-[#0F3057] mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((related, i) => (
              <Link key={i} to={`/blog/${related.slug}`} className="group">
                <div className="aspect-video bg-[#F5F5F0] mb-4" />
                <span className="text-xs text-[#B64E33] uppercase">{related.category}</span>
                <h4 className="font-heading text-lg text-[#0F3057] group-hover:text-[#B64E33] mt-1">{related.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
};
export default BlogPostPage;
