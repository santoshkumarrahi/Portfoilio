import React, { useState } from 'react';
import { 
  Layout, 
  Server, 
  Layers, 
  Smartphone, 
  Globe, 
  Wrench, 
  Database, 
  PenTool, 
  Sparkles, 
  FileText, 
  Video, 
  Share2, 
  Image as ImageIcon, 
  Package, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { AjrakDivider, AjrakStar } from './AjrakPattern.tsx';

export const Services: React.FC = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'web-dev' | 'graphic-design'>('all');

  const services = data?.services || [];
  const filtered = services.filter((s) => {
    if (activeTab === 'all') return true;
    return s.category === activeTab;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return Layout;
      case 'Server': return Server;
      case 'Layers': return Layers;
      case 'Smartphone': return Smartphone;
      case 'Globe': return Globe;
      case 'Wrench': return Wrench;
      case 'Database': return Database;
      case 'PenTool': return PenTool;
      case 'Sparkles': return Sparkles;
      case 'FileText': return FileText;
      case 'Video': return Video;
      case 'Share2': return Share2;
      case 'Image': return ImageIcon;
      case 'Package': return Package;
      default: return Layers;
    }
  };

  const handleInquire = (serviceTitle: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const subjectInput = document.getElementById('contact-subject') as HTMLInputElement | null;
      if (subjectInput) {
        subjectInput.value = `Inquiry: ${serviceTitle}`;
        subjectInput.focus();
      }
    }
  };

  return (
    <section id="services" className="relative py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            <AjrakStar size={14} className="text-teal-600" />
            <span>Professional Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-3">
            Services & <span className="text-teal-700">Expertise</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Full-stack web development and creative graphic design services tailored to launch and scale your business.
          </p>
          <AjrakDivider />
        </div>

        {/* Category Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Services ({services.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('web-dev')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'web-dev'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Web Development ({services.filter((s) => s.category === 'web-dev').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('graphic-design')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'graphic-design'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Graphic Design ({services.filter((s) => s.category === 'graphic-design').length})
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => {
            const Icon = getIcon(service.icon);
            const isWeb = service.category === 'web-dev';

            return (
              <div
                key={service.id}
                className="rounded-2xl p-6 bg-slate-50/80 border border-slate-200 hover:border-teal-500/60 hover:bg-white transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xs hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isWeb
                          ? 'bg-teal-50 text-teal-700 border border-teal-200 group-hover:bg-teal-600 group-hover:text-white'
                          : 'bg-amber-50 text-amber-700 border border-amber-200 group-hover:bg-amber-600 group-hover:text-white'
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    {/* Unboxed category label */}
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {isWeb ? 'Engineering' : 'Creative Studio'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-teal-700 transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                    {service.description}
                  </p>

                  {/* Feature deliverables list */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6 pt-4 border-t border-slate-200/80">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 size={13} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Call to action button */}
                <button
                  type="button"
                  onClick={() => handleInquire(service.title)}
                  className="w-full mt-2 py-2.5 px-4 text-xs font-semibold text-slate-700 group-hover:text-white bg-white group-hover:bg-slate-900 border border-slate-200 group-hover:border-slate-900 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Inquire For This Service</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
