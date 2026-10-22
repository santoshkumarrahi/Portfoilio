import React, { useState } from 'react';
import { 
  Code, 
  Palette, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { AjrakDivider, AjrakStar } from './AjrakPattern.tsx';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'web-dev' | 'graphic-design'>('all');

  const allSkills = data?.skills || [];
  const filteredSkills = allSkills.filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  const webSkillsCount = allSkills.filter((s) => s.category === 'web-dev').length;
  const designSkillsCount = allSkills.filter((s) => s.category === 'graphic-design').length;

  return (
    <section id="skills" className="relative py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            <AjrakStar size={14} className="text-teal-600" />
            <span>Technical & Creative Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-3">
            Skills & <span className="text-teal-700">Technologies</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Proficiencies across full-stack software development and professional graphic design software.
          </p>
          <AjrakDivider />
        </div>

        {/* Interactive Category Filter (Clean segmented buttons) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders size={14} />
              <span>All Capabilities ({allSkills.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter('web-dev')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                filter === 'web-dev'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code size={14} />
              <span>Web Development ({webSkillsCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter('graphic-design')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                filter === 'graphic-design'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette size={14} />
              <span>Graphic Design ({designSkillsCount})</span>
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const isWeb = skill.category === 'web-dev';
            return (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-teal-500/60 shadow-xs hover:shadow-md transition-all duration-200 group hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        isWeb
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {isWeb ? <Code size={14} /> : <Palette size={14} />}
                    </div>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                      {skill.name}
                    </span>
                  </div>

                  <span className="text-xs font-mono tabular-nums text-slate-500 font-semibold">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isWeb
                        ? 'bg-gradient-to-r from-teal-600 to-teal-500'
                        : 'bg-gradient-to-r from-amber-600 to-amber-500'
                    }`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Unboxed Metadata (Zero-Pill Discipline) */}
                <div className="flex items-center gap-2 mt-2.5 text-[11px] text-slate-500">
                  <span>{isWeb ? 'Engineering' : 'Creative Studio'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{skill.level >= 90 ? 'Advanced' : 'Proficient'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
