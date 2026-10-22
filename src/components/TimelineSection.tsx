import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { TimelineEntry } from '../types/portfolio.ts';
import { AjrakDivider, AjrakStar } from './AjrakPattern.tsx';

export const TimelineSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education' | 'certification'>('all');

  const timeline = data?.timeline || [];

  const filteredEntries = timeline.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const experienceItems = timeline.filter((t) => t.type === 'experience');
  const educationItems = timeline.filter((t) => t.type === 'education');
  const certificationItems = timeline.filter((t) => t.type === 'certification');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experience': return Briefcase;
      case 'education': return GraduationCap;
      case 'certification': return Award;
      default: return Briefcase;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'experience': return 'Experience';
      case 'education': return 'Education';
      case 'certification': return 'Certification';
      default: return 'Milestone';
    }
  };

  return (
    <section id="experience" className="relative py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            <AjrakStar size={14} className="text-teal-600" />
            <span>Career Milestones & Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-3">
            Experience & <span className="text-teal-700">Education</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Professional background, academic foundation in Computer Science, and specialized credentials.
          </p>
          <AjrakDivider />
        </div>

        {/* Tab Controls */}
        <div id="education" className="flex justify-center mb-16">
          <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Milestones ({timeline.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'experience'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase size={13} />
              <span>Experience ({experienceItems.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'education'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap size={13} />
              <span>Education ({educationItems.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('certification')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'certification'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award size={13} />
              <span>Certifications ({certificationItems.length})</span>
            </button>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8 border-l-2 border-slate-300 space-y-10">
          {filteredEntries.map((item) => {
            const Icon = getTypeIcon(item.type);
            const isExp = item.type === 'experience';
            const isEdu = item.type === 'education';

            return (
              <div key={item.id} className="relative group">
                {/* Node icon on vertical line */}
                <div
                  className={`absolute -left-[37px] sm:-left-[45px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white ${
                    isExp
                      ? 'text-teal-700 border-teal-600 group-hover:scale-110 shadow-xs'
                      : isEdu
                      ? 'text-amber-700 border-amber-500 group-hover:scale-110 shadow-xs'
                      : 'text-slate-700 border-slate-400 group-hover:scale-110 shadow-xs'
                  }`}
                >
                  <Icon size={14} />
                </div>

                {/* Entry Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500/60 shadow-xs hover:shadow-md transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-700 whitespace-nowrap bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/80">
                      <Calendar size={13} />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Organization & Location unboxed metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3.5 font-medium">
                    <span className="text-slate-800 font-semibold">{item.organization}</span>
                    {item.location && <span aria-hidden="true">·</span>}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-teal-600" />
                        {item.location}
                      </span>
                    )}
                    <span aria-hidden="true">·</span>
                    <span className="text-teal-800 capitalize">{getTypeLabel(item.type)}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-1.5 pt-3 border-t border-slate-100">
                      {item.highlights.map((high, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 size={13} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{high}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
