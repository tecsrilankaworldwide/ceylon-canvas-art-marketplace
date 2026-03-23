import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const ImageUpload = ({ 
  onUpload, 
  maxFiles = 5, 
  existingImages = [],
  onRemove 
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const uploadFile = async (file) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please sign in to upload images');
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API}/upload/image`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.detail || 'Failed to upload image');
      return null;
    }
  };

  const handleFiles = useCallback(async (files) => {
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    if (existingImages.length + validFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed`);
      return;
    }

    if (validFiles.length === 0) return;

    setUploading(true);
    
    for (const file of validFiles) {
      const result = await uploadFile(file);
      if (result) {
        // Create the full URL for the uploaded image
        const imageUrl = `${API}/files/${result.path}`;
        onUpload(imageUrl);
        toast.success(`${file.name} uploaded`);
      }
    }
    
    setUploading(false);
  }, [existingImages.length, maxFiles, onUpload]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-4" data-testid="image-upload">
      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {existingImages.map((url, index) => (
            <div key={index} className="relative group aspect-square bg-[#F5F5F0] rounded-sm overflow-hidden">
              <img
                src={url}
                alt={`Artwork ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {onRemove && (
                <button
                  onClick={() => onRemove(index)}
                  className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  data-testid={`remove-image-${index}`}
                >
                  <X className="h-4 w-4 text-[#9E2A2B]" />
                </button>
              )}
              {index === 0 && (
                <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wider uppercase bg-[#0F3057] text-white px-2 py-1">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {existingImages.length < maxFiles && (
        <div
          className={`relative border-2 border-dashed rounded-sm p-8 text-center transition-colors ${
            dragActive 
              ? 'border-[#0F3057] bg-[#F5F5F0]' 
              : 'border-[#E5E5DF] hover:border-[#0F3057]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
            data-testid="file-input"
          />
          
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-[#0F3057] animate-spin mb-4" />
              <p className="font-body text-sm text-[#5C636A]">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#F5F5F0] flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-[#0F3057]" />
              </div>
              <p className="font-body text-sm text-[#1A1D20] mb-1">
                <span className="font-semibold text-[#0F3057]">Click to upload</span> or drag and drop
              </p>
              <p className="font-body text-xs text-[#5C636A]">
                PNG, JPG, GIF, WEBP up to 10MB
              </p>
              <p className="font-body text-xs text-[#5C636A] mt-1">
                {existingImages.length} of {maxFiles} images uploaded
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
