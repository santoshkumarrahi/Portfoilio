import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Layers, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { WebProject } from '../types/portfolio.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { AjrakDivider, AjrakStar } from './AjrakPattern.tsx';

export const WebProjects: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<WebProject | null>(null);

  const projects = data?.webProjects || [];
  
  const categories = ['All', 'Full-Stack', 'Front-End', 'Back-End'];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true;
    return project.category === selectedCategory;
  });

  return (
    <section id="web-projects" className="relative py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            <AjrakStar size={14} className="text-teal-600" />
            <span>Software & Web Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-3">
            Web Development <span className="text-teal-700">Projects</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Full-stack web applications, interactive front-ends, and scalable back-end API integrations.
          </p>
          <AjrakDivider />
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat} Projects
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-white border border-slate-200 hover:border-teal-500/60 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 shadow-xs hover:shadow-xl"
            >
              {/* Screenshot container */}
              <div 
                className="relative aspect-video bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setActiveModalProject(project)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Category & Status Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-slate-900/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs">
                    {project.category}
                  </span>
                  {project.isFeatured && (
                    <span className="bg-amber-50 text-amber-800 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-amber-300 shadow-xs backdrop-blur-xs">
                      Featured
                    </span>
                  )}
                </div>

                {/* Quick inspect button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/40 backdrop-blur-xs">
                  <span className="px-3.5 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <Eye size={14} className="text-teal-600" /> Quick View
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 
                    onClick={() => setActiveModalProject(project)}
                    className="text-base font-bold text-slate-900 font-heading group-hover:text-teal-700 transition-colors mb-2 cursor-pointer line-clamp-1"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2 font-normal">
                    {project.description}
                  </p>

                  {/* Clean unboxed tech list */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-5 text-[11px]">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-mono text-[11px] font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] text-slate-400">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card footer links */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight size={13} />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-slate-900 p-1"
                        title="GitHub Repository"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-700 hover:text-teal-900 p-1"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
