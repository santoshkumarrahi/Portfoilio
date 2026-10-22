import React from 'react';
import { Heart, Lock, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { AjrakStar } from './AjrakPattern.tsx';

export const Footer: React.FC = () => {
  const { data, isAdminLoggedIn, setShowAdminModal, setShowAdminDashboard } = usePortfolio();
  const profile = data?.profile;
  const settings = data?.settings;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0b132b] border-t border-slate-800 pt-16 pb-12 text-slate-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand & Narrative */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                <AjrakStar size={16} className="text-teal-400" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-wider">
                SANTOSH KUMAR BHEEL
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
              Full-Stack Web Developer, Graphic Designer, and BSCS student combining software engineering logic with creative graphic design and visual brand identities.
            </p>

            <div className="text-[11px] text-teal-400 font-mono">
              Sindh, Pakistan · 03313101886
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-heading">
                Navigation
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="text-slate-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-slate-300 hover:text-white transition-colors">About Me</a></li>
                <li><a href="#skills" className="text-slate-300 hover:text-white transition-colors">Skills & Tech</a></li>
                <li><a href="#services" className="text-slate-300 hover:text-white transition-colors">Services</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-heading">
                Portfolios
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#web-projects" className="text-slate-300 hover:text-white transition-colors">Web Projects</a></li>
                <li><a href="#graphic-design" className="text-slate-300 hover:text-white transition-colors">Graphic Design</a></li>
                <li><a href="#experience" className="text-slate-300 hover:text-white transition-colors">Experience</a></li>
                <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Hire Me</a></li>
              </ul>
            </div>
          </div>

          {/* Admin & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => {
                  if (isAdminLoggedIn) setShowAdminDashboard(true);
                  else setShowAdminModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
              >
                <Lock size={12} className={isAdminLoggedIn ? 'text-teal-400' : 'text-slate-400'} />
                <span>{isAdminLoggedIn ? 'Admin Portal Active' : 'Admin Login'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Santosh Kumar Bheel. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span>{settings?.footerQuote || 'Crafted with precision, code, and creative passion. Based in Pakistan.'}</span>
            <AjrakStar size={12} className="text-amber-400/80" />
          </div>
        </div>
      </div>
    </footer>
  );
};
