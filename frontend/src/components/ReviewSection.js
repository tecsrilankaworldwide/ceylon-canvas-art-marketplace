import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../components/ui/dialog';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { getArtworkReviews, createReview, markReviewHelpful } from '../services/api';

export const ReviewSection = ({ artworkId, artworkTitle }) => {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [form, setForm] = useState({
    rating: 5,
    title: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [artworkId]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await getArtworkReviews(artworkId);
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      await createReview({
        artwork_id: artworkId,
        rating: form.rating,
        title: form.title,
        content: form.content
      });
      toast.success('Review submitted successfully!');
      setForm({ rating: 5, title: '', content: '' });
      setShowForm(false);
      loadReviews();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpful = async (reviewId) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to mark reviews as helpful');
      return;
    }

    try {
      await markReviewHelpful(reviewId);
      setReviews(prev => prev.map(r => 
        r.id === reviewId ? { ...r, helpful_count: r.helpful_count + 1 } : r
      ));
      toast.success('Marked as helpful');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to mark as helpful');
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StarRating = ({ rating, onSelect, interactive = false }) => {
    const [hover, setHover] = useState(0);
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onSelect && onSelect(star)}
            onMouseEnter={() => interactive && setHover(star)}
            onMouseLeave={() => interactive && setHover(0)}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            disabled={!interactive}
          >
            <Star
              className={`h-5 w-5 ${
                (interactive ? (hover || rating) : rating) >= star
                  ? 'fill-[#E5A93C] text-[#E5A93C]'
                  : 'text-[#E5E5DF]'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-12 pt-8 border-t border-[#E5E5DF]" data-testid="review-section">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading text-2xl font-medium text-[#0F3057]">Reviews</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(parseFloat(averageRating))} />
              <span className="font-body text-sm text-[#5C636A]">
                {averageRating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}
        </div>
        
        {isAuthenticated && (
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button className="btn-primary rounded-sm" data-testid="write-review-btn">
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">Write a Review</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="form-label mb-2 block">Your Rating</label>
                  <StarRating 
                    rating={form.rating} 
                    onSelect={(rating) => setForm(prev => ({ ...prev, rating }))}
                    interactive
                  />
                </div>
                <div>
                  <label className="form-label">Review Title</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Summarize your experience"
                    className="mt-1"
                    data-testid="review-title-input"
                  />
                </div>
                <div>
                  <label className="form-label">Your Review</label>
                  <Textarea
                    value={form.content}
                    onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Share your thoughts about this artwork..."
                    rows={4}
                    className="mt-1"
                    data-testid="review-content-input"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleSubmit} 
                  disabled={submitting}
                  className="btn-primary rounded-sm"
                  data-testid="submit-review-btn"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="skeleton h-32 rounded-sm" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-[#F5F5F0] rounded-sm">
          <Star className="h-10 w-10 text-[#E5E5DF] mx-auto mb-3" />
          <p className="font-body text-[#5C636A]">No reviews yet</p>
          <p className="font-body text-sm text-[#5C636A] mt-1">
            Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white border border-[#E5E5DF] rounded-sm p-6"
              data-testid={`review-${review.id}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0F3057] flex items-center justify-center">
                    <span className="font-heading text-sm text-white">
                      {review.user_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-[#1A1D20]">
                      {review.user_name}
                    </p>
                    <p className="font-body text-xs text-[#5C636A]">
                      {formatDate(review.created_at)}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              
              <h4 className="font-body font-semibold text-[#1A1D20] mt-4">
                {review.title}
              </h4>
              <p className="font-body text-sm text-[#5C636A] mt-2 leading-relaxed">
                {review.content}
              </p>
              
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#E5E5DF]">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-1 font-body text-xs text-[#5C636A] hover:text-[#0F3057] transition-colors"
                  data-testid={`helpful-${review.id}`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({review.helpful_count})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
