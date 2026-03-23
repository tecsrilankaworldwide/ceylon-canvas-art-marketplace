import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { ImageUpload } from '../components/ImageUpload';
import { createArtwork, updateArtwork, getArtwork, deleteArtwork, getCategories } from '../services/api';

const ArtworkFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, isArtist } = useAuth();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    medium: '',
    dimensions: '',
    year_created: new Date().getFullYear(),
    images: [],
    is_digital: false,
    is_auction: false,
    price: '',
    reserve_price: '',
    auction_end_date: '',
    tags: ''
  });

  useEffect(() => {
    const loadData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData.categories || []);
      
      if (isEditing) {
        setLoading(true);
        try {
          const artwork = await getArtwork(id);
          setForm({
            title: artwork.title || '',
            description: artwork.description || '',
            category: artwork.category || '',
            medium: artwork.medium || '',
            dimensions: artwork.dimensions || '',
            year_created: artwork.year_created || new Date().getFullYear(),
            images: artwork.images || [],
            is_digital: artwork.is_digital || false,
            is_auction: artwork.is_auction || false,
            price: artwork.price?.toString() || '',
            reserve_price: artwork.reserve_price?.toString() || '',
            auction_end_date: artwork.auction_end_date?.split('T')[0] || '',
            tags: artwork.tags?.join(', ') || ''
          });
        } catch (error) {
          toast.error('Failed to load artwork');
          navigate('/dashboard');
        } finally {
          setLoading(false);
        }
      }
    };
    loadData();
  }, [id, isEditing, navigate]);

  // Redirect if not authenticated or not an artist
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isArtist) {
      toast.error('Only artists can create artworks');
      navigate('/dashboard');
    }
  }, [isAuthenticated, isArtist, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.description || !form.category || !form.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (form.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setSaving(true);
    try {
      const artworkData = {
        title: form.title,
        description: form.description,
        category: form.category,
        medium: form.medium || null,
        dimensions: form.dimensions || null,
        year_created: form.year_created ? parseInt(form.year_created) : null,
        images: form.images,
        is_digital: form.is_digital,
        is_auction: form.is_auction,
        price: parseFloat(form.price),
        reserve_price: form.is_auction && form.reserve_price ? parseFloat(form.reserve_price) : null,
        auction_end_date: form.is_auction && form.auction_end_date ? new Date(form.auction_end_date).toISOString() : null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t) : [],
        is_available: true
      };

      if (isEditing) {
        await updateArtwork(id, artworkData);
        toast.success('Artwork updated successfully');
      } else {
        const result = await createArtwork(artworkData);
        toast.success('Artwork created successfully');
        navigate(`/artwork/${result.id}`);
        return;
      }
      
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save artwork');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) return;
    
    try {
      await deleteArtwork(id);
      toast.success('Artwork deleted');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to delete artwork');
    }
  };

  const handleImageUpload = (imageUrl) => {
    setForm(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
  };

  const handleImageRemove = (index) => {
    setForm(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }));
  };

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-[#FDFDFB]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/3 bg-[#F5F5F0] rounded" />
            <div className="h-64 bg-[#F5F5F0] rounded" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB]" data-testid="artwork-form-page">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 font-body text-sm text-[#5C636A] hover:text-[#0F3057] mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <h1 className="font-heading text-3xl font-medium text-[#0F3057]">
              {isEditing ? 'Edit Artwork' : 'Add New Artwork'}
            </h1>
          </div>
          {isEditing && (
            <Button 
              variant="outline" 
              onClick={handleDelete}
              className="text-[#9E2A2B] border-[#9E2A2B] hover:bg-red-50"
              data-testid="delete-artwork"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images */}
          <div className="bg-white border border-[#E5E5DF] rounded-sm p-6">
            <h2 className="font-heading text-xl font-medium text-[#0F3057] mb-4">Artwork Images</h2>
            <p className="font-body text-sm text-[#5C636A] mb-4">
              Upload high-quality images of your artwork. The first image will be the primary display image.
            </p>
            <ImageUpload 
              onUpload={handleImageUpload}
              existingImages={form.images}
              onRemove={handleImageRemove}
              maxFiles={5}
            />
          </div>

          {/* Basic Info */}
          <div className="bg-white border border-[#E5E5DF] rounded-sm p-6">
            <h2 className="font-heading text-xl font-medium text-[#0F3057] mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter artwork title"
                  className="mt-1"
                  data-testid="artwork-title-input"
                />
              </div>

              <div>
                <label className="form-label">Description *</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your artwork, its inspiration, technique..."
                  rows={5}
                  className="mt-1"
                  data-testid="artwork-description-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Category *</label>
                  <Select 
                    value={form.category} 
                    onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-1" data-testid="category-select">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="form-label">Medium</label>
                  <Input
                    value={form.medium}
                    onChange={(e) => setForm(prev => ({ ...prev, medium: e.target.value }))}
                    placeholder="e.g., Oil on Canvas"
                    className="mt-1"
                    data-testid="artwork-medium-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Dimensions</label>
                  <Input
                    value={form.dimensions}
                    onChange={(e) => setForm(prev => ({ ...prev, dimensions: e.target.value }))}
                    placeholder="e.g., 120cm x 80cm"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="form-label">Year Created</label>
                  <Input
                    type="number"
                    value={form.year_created}
                    onChange={(e) => setForm(prev => ({ ...prev, year_created: e.target.value }))}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Tags (comma separated)</label>
                <Input
                  value={form.tags}
                  onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="e.g., landscape, oil, ceylon, traditional"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Checkbox 
                  id="is_digital" 
                  checked={form.is_digital} 
                  onCheckedChange={(checked) => setForm(prev => ({ ...prev, is_digital: checked }))}
                  data-testid="is-digital-checkbox"
                />
                <label htmlFor="is_digital" className="font-body text-sm cursor-pointer">
                  This is a digital artwork (NFT-ready, prints, etc.)
                </label>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border border-[#E5E5DF] rounded-sm p-6">
            <h2 className="font-heading text-xl font-medium text-[#0F3057] mb-4">Pricing & Sale Type</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="is_auction" 
                  checked={form.is_auction} 
                  onCheckedChange={(checked) => setForm(prev => ({ ...prev, is_auction: checked }))}
                  data-testid="is-auction-checkbox"
                />
                <label htmlFor="is_auction" className="font-body text-sm cursor-pointer">
                  List as auction (bidding enabled)
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">
                    {form.is_auction ? 'Starting Bid *' : 'Price *'} (USD)
                  </label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="mt-1"
                    data-testid="artwork-price-input"
                  />
                </div>

                {form.is_auction && (
                  <div>
                    <label className="form-label">Reserve Price (USD)</label>
                    <Input
                      type="number"
                      value={form.reserve_price}
                      onChange={(e) => setForm(prev => ({ ...prev, reserve_price: e.target.value }))}
                      placeholder="Minimum acceptable price"
                      min="0"
                      step="0.01"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {form.is_auction && (
                <div>
                  <label className="form-label">Auction End Date</label>
                  <Input
                    type="date"
                    value={form.auction_end_date}
                    onChange={(e) => setForm(prev => ({ ...prev, auction_end_date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1"
                    data-testid="auction-end-date"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={saving}
              className="btn-primary rounded-sm flex items-center gap-2"
              data-testid="save-artwork"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : (isEditing ? 'Update Artwork' : 'Create Artwork')}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ArtworkFormPage;
