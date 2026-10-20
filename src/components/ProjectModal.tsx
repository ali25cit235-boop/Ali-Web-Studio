import { useEffect } from 'react';
import { X, ExternalLink, Code2, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click listener */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#090D18] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-400">{project.status}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Title & Subtitle */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              {project.subtitle}
            </p>
          </div>

          {/* Project Image Banner if exists */}
          {project.image && (
            <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-slate-800/80 relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}

          {/* Problem & Approach */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-1.5">
                Overview & Purpose
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/70">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                The Practical Problem Solved
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problemSolved}
              </p>
            </div>
          </div>

          {/* What I Learned */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>What I Learned While Building</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.whatILearned.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-3 rounded-lg bg-slate-900/30 border border-slate-800/50 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet if present */}
          {project.codeSnippet && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Code Excerpt ({project.codeSnippet.language})</span>
              </h4>
              <div className="p-4 rounded-xl bg-[#060810] border border-slate-800 overflow-x-auto text-xs font-mono text-slate-300">
                <pre>
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tech Stack Unboxed Tags */}
          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
              Technologies & Tools
            </p>
            <p className="text-xs text-slate-300">
              {project.techStack.map((tech, idx) => (
                <span key={tech}>
                  {tech}
                  {idx < project.techStack.length - 1 && (
                    <span className="text-slate-600 mx-2" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs font-mono text-slate-500">
            Personal Builder Project · Ali Abbas
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
