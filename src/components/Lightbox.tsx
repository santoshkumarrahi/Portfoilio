import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, Layers, Sparkles, Tag, Maximize2 } from 'lucide-react';
import { GraphicDesignItem } from '../types/portfolio.ts';
import { AjrakStar } from './AjrakPattern.tsx';

interface LightboxProps {
  item: GraphicDesignItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext]);

  useEffect(() => {
    setScale(1);
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Lightbox Container */}
      <div className="relative w-full max-w-5xl max-h-[94vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-900">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <AjrakStar size={16} className="text-teal-600" />
            <span className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md font-heading">
              {item.title}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-teal-700 font-semibold">{item.category}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.7, s - 0.2))}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-200 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              type="button"
              onClick={() => setScale(1)}
              className="px-2 py-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-200 transition-colors"
              title="Reset Zoom"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-200 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="ml-2 p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Media Preview Area */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-100/70 min-h-[350px]">
          <div 
            className="transition-transform duration-200 origin-center max-w-full max-h-[62vh] flex items-center justify-center"
            style={{ transform: `scale(${scale})` }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-w-full max-h-[62vh] object-contain rounded-lg shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Bottom Details Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-normal">
              {item.description}
            </p>

            {/* Unboxed Metadata (Zero-Pill discipline) */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-2 font-medium">
              {item.dimensions && (
                <span>Dimensions: <strong className="text-slate-800 font-mono">{item.dimensions}</strong></span>
              )}
              {item.dimensions && <span aria-hidden="true">·</span>}
              <span>
                Tools: {item.toolsUsed && item.toolsUsed.length > 0 ? item.toolsUsed.join(' · ') : 'Design Software'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={item.imageUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Maximize2 size={13} />
              <span>Full File</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
