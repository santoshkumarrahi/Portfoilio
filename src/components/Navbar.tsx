import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { AjrakStar } from './AjrakPattern.tsx';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { isAdminLoggedIn, setShowAdminModal, setShowAdminDashboard } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Me', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Web Projects', href: '#web-projects', id: 'web-projects' },
    { label: 'Graphic Design', href: '#graphic-design', id: 'graphic-design' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3'
            : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand wordmark in deep navy */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center gap-2.5 text-xl sm:text-2xl font-extrabold tracking-wider text-slate-900 whitespace-nowrap shrink-0"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 group-hover:border-teal-500 transition-colors shadow-xs">
                <AjrakStar size={16} className="text-teal-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-heading tracking-widest uppercase text-slate-900">
                SANTOSH
              </span>
            </a>

            {/* Zone 2: Navigation Links (desktop) in crisp navy slate */}
            <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-slate-600">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                      isActive
                        ? 'text-teal-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-600 to-teal-500 rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Admin trigger */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Admin quick toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isAdminLoggedIn) {
                    setShowAdminDashboard(true);
                  } else {
                    setShowAdminModal(true);
                  }
                }}
                title={isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Lock size={12} className={isAdminLoggedIn ? 'text-teal-600' : 'text-slate-500'} />
                <span className="text-[11px] font-mono">{isAdminLoggedIn ? 'Admin Panel' : 'Admin'}</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg shadow-xs hover:shadow-sm transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Hire Me</span>
                <ChevronRight size={14} />
              </a>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white border-l border-slate-200 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
                    <AjrakStar size={15} className="text-teal-400" />
                  </div>
                  <span className="font-heading font-bold text-lg text-slate-900 tracking-wider">
                    SANTOSH
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-teal-50 text-teal-800 border border-teal-200/80 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <CheckCircle2 size={14} className="text-teal-600" />}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
              >
                Hire Me
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAdminLoggedIn) setShowAdminDashboard(true);
                  else setShowAdminModal(true);
                }}
                className="w-full py-2 text-center text-xs text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Lock size={12} />
                <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
