import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const LanguageSelector = ({ variant = 'default' }) => {
  const { language, setLanguage, languageNames } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`flex items-center gap-2 font-body text-sm ${
        variant === 'footer' ? 'text-white/70 hover:text-white' : 'text-[#5C636A] hover:text-[#0F3057]'
      } transition-colors cursor-pointer`}>
        <Globe className="h-4 w-4" />
        <span>{currentLang.flag} {currentLang.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? 'bg-[#E5A93C]/10 text-[#0F3057]' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
