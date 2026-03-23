import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Camera, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../components/ui/dialog';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { getArtworkReviews, createReview, markReviewHelpful } from '../services/api';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const ReviewSection = ({ artworkId, artworkTitle }) => {
  const { isAuthenticated, token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const [form, setForm] = useState({
    rating: 5,
    title: '',
    content: '',
    photos: []
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API}/upload/image`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return `${API}/files/${response.data.path}`;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
      return null;
    }
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (form.photos.length + files.length > 5) {
      toast.error('Maximum 5 photos allowed per review');
      return;
    }

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        continue;
      }

      const url = await uploadPhoto(file);
      if (url) {
        uploadedUrls.push(url);
      }
    }

    if (uploadedUrls.length > 0) {
      setForm(prev => ({ ...prev, photos: [...prev.photos, ...uploadedUrls] }));
      toast.success(`${uploadedUrls.length} photo(s) uploaded`);
    }
    setUploading(false);
  };

  const removePhoto = (index) => {
    setForm(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
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
        content: form.content,
        photos: form.photos
      });
      toast.success('Review submitted successfully!');
      setForm({ rating: 5, title: '', content: '', photos: [] });
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

  const reviewsWithPhotos = reviews.filter(r => r.photos && r.photos.length > 0).length;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-heading text-2xl font-medium text-[#0F3057]">Customer Reviews</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-2">
                <StarRating rating={Math.round(parseFloat(averageRating))} />
                <span className="font-body text-sm font-medium text-[#0F3057]">
                  {averageRating}
                </span>
              </div>
              <span className="font-body text-sm text-[#5C636A]">
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </span>
              {reviewsWithPhotos > 0 && (
                <span className="flex items-center gap-1 font-body text-sm text-[#2D5A43]">
                  <Camera className="h-4 w-4" />
                  {reviewsWithPhotos} with photos
                </span>
              )}
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
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">Share Your Experience</DialogTitle>
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
                
                {/* Photo Upload Section */}
                <div>
                  <label className="form-label mb-2 block">
                    Add Photos <span className="text-[#5C636A] font-normal">(optional)</span>
                  </label>
                  <p className="font-body text-xs text-[#5C636A] mb-3">
                    Share how the artwork looks in your home! This helps other buyers visualize the piece.
                  </p>
                  
                  {/* Uploaded Photos */}
                  {form.photos.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-3">
                      {form.photos.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Review photo ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-sm border border-[#E5E5DF]"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 p-1 bg-white border border-[#E5E5DF] rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3 text-[#9E2A2B]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Upload Button */}
                  {form.photos.length < 5 && (
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                        data-testid="photo-upload-input"
                      />
                      <div className={`border-2 border-dashed border-[#E5E5DF] rounded-sm p-4 text-center hover:border-[#0F3057] transition-colors ${uploading ? 'opacity-50' : ''}`}>
                        {uploading ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin text-[#0F3057]" />
                            <span className="font-body text-sm text-[#5C636A]">Uploading...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Camera className="h-5 w-5 text-[#0F3057]" />
                            <span className="font-body text-sm text-[#0F3057]">Add Photos</span>
                            <span className="font-body text-xs text-[#5C636A]">({form.photos.length}/5)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleSubmit} 
                  disabled={submitting || uploading}
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
              
              {/* Review Photos */}
              {review.photos && review.photos.length > 0 && (
                <div className="mt-4">
                  <p className="font-body text-xs text-[#5C636A] mb-2 flex items-center gap-1">
                    <Camera className="h-3 w-3" />
                    Photos from {review.user_name}'s home
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {review.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPhoto(photo)}
                        className="relative overflow-hidden rounded-sm border border-[#E5E5DF] hover:border-[#0F3057] transition-colors"
                      >
                        <img
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="w-24 h-24 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#E5E5DF]">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-1 font-body text-xs text-[#5C636A] hover:text-[#0F3057] transition-colors"
                  data-testid={`helpful-${review.id}`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({review.helpful_count})
                </button>
                {review.photos && review.photos.length > 0 && (
                  <span className="flex items-center gap-1 font-body text-xs text-[#2D5A43]">
                    <ImageIcon className="h-4 w-4" />
                    {review.photos.length} photo{review.photos.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="sm:max-w-3xl p-0">
            <div className="relative">
              <img
                src={selectedPhoto}
                alt="Review photo"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReviewSection;
