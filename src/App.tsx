import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Services } from './components/Services.tsx';
import { WebProjects } from './components/WebProjects.tsx';
import { GraphicPortfolio } from './components/GraphicPortfolio.tsx';
import { TimelineSection } from './components/TimelineSection.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminLoginModal } from './components/admin/AdminLoginModal.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';
import { AjrakStar } from './components/AjrakPattern.tsx';

const PortfolioContent: React.FC = () => {
  const { data, loading, error, refetchData } = usePortfolio();
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track active section for top bar indicator
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'skills',
      'services',
      'web-projects',
      'graphic-design',
      'experience',
      'education',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-900">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xl mb-4 animate-pulse">
          <AjrakStar size={32} className="text-teal-600" />
        </div>
        <h2 className="text-base font-bold font-heading tracking-widest text-slate-900 uppercase">
          Santosh Kumar Bheel
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-mono">Loading Portfolio...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-900 px-4 text-center">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl max-w-md">
          <h2 className="text-lg font-bold text-rose-600 mb-2">Connection Notice</h2>
          <p className="text-xs text-slate-600 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => refetchData()}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-teal-600 selection:text-white">
      {/* Sticky Responsive Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Services />
        <WebProjects />
        <GraphicPortfolio />
        <TimelineSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Modals */}
      <AdminLoginModal />
      <AdminDashboard />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
