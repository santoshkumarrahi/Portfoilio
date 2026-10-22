import React, { useState } from 'react';
import { 
  Palette, 
  Eye, 
  Layers, 
  Sparkles, 
  Image as ImageIcon,
  SlidersHorizontal
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { GraphicDesignItem } from '../types/portfolio.ts';
import { Lightbox } from './Lightbox.tsx';
import { AjrakDivider, AjrakStar } from './AjrakPattern.tsx';

export const GraphicPortfolio: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GraphicDesignItem | null>(null);

  const designs = data?.graphicDesigns || [];

  const categories = [
    'All',
    'Logo Design',
    'Brand Identity',
    'Posters',
    'Flyers',
    'YouTube Thumbnails',
    'Social Media Designs',
    'Promotional Banners',
    'Other Creative Designs'
  ];

  const filteredDesigns = designs.filter((design) => {
    if (selectedCategory === 'All') return true;
    return design.category === selectedCategory;
  });

  return (
    <section id="graphic-design" className="relative py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            <AjrakStar size={14} className="text-teal-600" />
            <span>Visual Arts & Brand Graphics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-3">
            Graphic Design <span className="text-teal-700">Portfolio</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            High-conversion brand identities, logos, print marketing posters, YouTube thumbnails, and social creatives.
          </p>
          <AjrakDivider />
        </div>

        {/* Categories Bar */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1 rounded-xl bg-slate-50 border border-slate-200 gap-1 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDesigns.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-teal-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Category kicker */}
                <div className="absolute top-3 left-3">
                  <span className="bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                {/* Inspect hover indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/40 backdrop-blur-xs">
                  <span className="px-3.5 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <Eye size={14} className="text-teal-600" /> View Artwork
                  </span>
                </div>
              </div>

              {/* Caption & Specs */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-heading mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal mb-3">
                    {item.description}
                  </p>
                </div>

                {/* Tools & Specs (Zero-Pill clean typography) */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[150px] font-medium">
                    {item.toolsUsed && item.toolsUsed.length > 0 ? item.toolsUsed.join(' · ') : 'Design'}
                  </span>
                  <span className="text-teal-700 font-semibold group-hover:underline">
                    Inspect ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            No designs found in this category. Use the admin panel to add artwork.
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </section>
  );
};
