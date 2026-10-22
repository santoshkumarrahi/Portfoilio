import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Calendar, CheckCircle2 } from 'lucide-react';
import { WebProject } from '../types/portfolio.ts';
import { AjrakStar } from './AjrakPattern.tsx';

interface ProjectModalProps {
  project: WebProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog in crisp white */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-900">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <AjrakStar size={16} className="text-teal-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
              Web Development Project
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-600 font-medium">{project.category}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main preview image */}
          <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video shadow-xs">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {project.isFeatured && (
              <div className="absolute top-3 left-3 bg-white/95 text-amber-800 text-xs font-semibold px-3 py-1 rounded-md border border-amber-300 shadow-xs backdrop-blur-xs">
                Featured Work
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-1.5">
              {project.title}
            </h2>
            <p className="text-teal-700 text-sm font-semibold mb-4">
              {project.tagline}
            </p>

            <div className="text-slate-600 text-sm leading-relaxed mb-6 space-y-3 font-normal">
              <p>{project.description}</p>
              {project.fullDetails && <p>{project.fullDetails}</p>}
            </div>

            {/* Tech Stack Unboxed */}
            <div className="pt-4 border-t border-slate-100 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <Layers size={14} className="text-teal-600" />
                <span>Technologies & Frameworks</span>
              </h4>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-md font-mono text-[11px] text-slate-700 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links and Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                >
                  <ExternalLink size={14} />
                  <span>View Live Demo</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Github size={14} />
                  <span>Source Code</span>
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="ml-auto px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
