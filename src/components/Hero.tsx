import React from 'react';
import { 
  Download, 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Palette, 
  GraduationCap, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { AjrakStar } from './AjrakPattern.tsx';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;
  const settings = data?.settings;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const photoUrl = profile?.avatarUrl || '/assets/aistudio/Santosh_Profile_Image_814470b2.png';

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 overflow-hidden border-b border-slate-200/70">
      {/* Subtle background ambient accents */}
      <div className="absolute top-12 left-1/4 -translate-x-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Layout: Typographic Intro (Left) & Profile Photo (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Information Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Identity Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-medium text-slate-700 mb-5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-50 text-teal-600">
                <AjrakStar size={12} className="text-teal-600" />
              </span>
              <span className="font-semibold text-slate-800">Sindh, Pakistan</span>
              <span className="text-slate-300">·</span>
              <span className="text-teal-700 font-medium">BSCS Student & Developer</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </div>

            {/* Full Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-heading leading-[1.1] mb-3 text-balance">
              Santosh Kumar <span className="text-teal-700">Bheel</span>
            </h1>

            {/* Professional Titles */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-base sm:text-lg font-semibold text-slate-800 mb-5">
              <span className="text-teal-700">Graphic Designer</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-800">Front-End Developer</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-800">Back-End Developer</span>
              <span className="text-slate-300">·</span>
              <span className="text-amber-700 font-medium">BSCS Scholar</span>
            </div>

            {/* Core Narrative / Introduction */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-7 font-normal">
              "{settings?.heroSubheadline || 'Combining technology and creativity to build modern websites, powerful digital experiences, and visually compelling designs.'}"
            </p>

            {/* Action Buttons: 3 Buttons as requested */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-7">
              {/* View My Work */}
              <button
                type="button"
                onClick={() => scrollTo('web-projects')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight size={16} />
              </button>

              {/* Hire Me */}
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} className="text-teal-600" />
                <span>Hire Me</span>
              </button>

              {/* Download CV */}
              <a
                href={profile?.cvUrl || '/api/download-cv'}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all duration-200 flex items-center gap-2"
              >
                <Download size={16} className="text-teal-600" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links & Trust Row */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 pt-5 border-t border-slate-200/80 w-full">
              <span className="font-medium text-slate-600">Connect Online:</span>
              <div className="flex items-center gap-2.5">
                {profile?.socials?.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-xs transition-colors"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                )}
                {profile?.socials?.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-slate-300 shadow-xs transition-colors"
                  >
                    <Linkedin size={14} />
                    <span>LinkedIn</span>
                  </a>
                )}
                <div className="flex items-center gap-1 text-slate-500 text-[11px] ml-2">
                  <MapPin size={13} className="text-teal-600" />
                  <span>Sindh, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Profile Image (Large, Sharp, Clear, Unobstructed) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Subtle back ambient glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-teal-500/10 via-slate-200/50 to-blue-500/10 rounded-3xl blur-xl opacity-80" />

              {/* Clean White Profile Container */}
              <div className="relative rounded-2xl p-3 bg-white border border-slate-200 shadow-xl shadow-slate-200/60">
                {/* Profile Photograph: High-Resolution, Perfectly Preserved, Face Fully Visible */}
                <div className="relative rounded-xl overflow-hidden bg-slate-50 aspect-[3/4] flex items-center justify-center">
                  <img
                    src={photoUrl}
                    alt="Santosh Kumar Bheel — Full-Stack Developer & Graphic Designer"
                    className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-500"
                    loading="eager"
                  />
                </div>

                {/* Bottom Identifier Card (Clean, unboxed, not covering face) */}
                <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">
                      Santosh Kumar Bheel
                    </h3>
                    <p className="text-xs text-teal-700 font-medium">
                      Developer & Graphic Designer
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width Metrics Strip Below Split (Crisp white cards on soft background) */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tabular-nums text-teal-700">
              {profile?.yearsExperience || '4+'}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Years Experience</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tabular-nums text-slate-900">
              {profile?.projectsCompleted || '35+'}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Web Projects Completed</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tabular-nums text-teal-700">
              {profile?.designDeliveries || '80+'}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Graphic Designs Delivered</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tabular-nums text-amber-700">
              {profile?.satisfactionRate || '100%'}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};
