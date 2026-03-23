import React from 'react';
import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export const ShareButton = ({ title, url, image, description }) => {
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out this artwork on Ceylon Canvas';
  const shareDescription = description || 'Discover authentic Sri Lankan art at Ceylon Canvas Art Marketplace';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareDescription)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareDescription}\n\n${shareUrl}`)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const openShare = (platform) => {
    if (platform === 'copy') {
      copyToClipboard();
      return;
    }
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" data-testid="share-dropdown-btn">
          <Link2 className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => openShare('facebook')} className="flex items-center gap-3 cursor-pointer">
          <Facebook className="h-4 w-4 text-[#1877F2]" />
          <span>Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShare('twitter')} className="flex items-center gap-3 cursor-pointer">
          <Twitter className="h-4 w-4 text-[#1DA1F2]" />
          <span>Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShare('linkedin')} className="flex items-center gap-3 cursor-pointer">
          <Linkedin className="h-4 w-4 text-[#0A66C2]" />
          <span>LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShare('email')} className="flex items-center gap-3 cursor-pointer">
          <Mail className="h-4 w-4 text-[#5C636A]" />
          <span>Email</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShare('copy')} className="flex items-center gap-3 cursor-pointer">
          <Link2 className="h-4 w-4 text-[#0F3057]" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
