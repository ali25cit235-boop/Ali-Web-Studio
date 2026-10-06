import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Check, Sparkles, Monitor, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../data/siteConfig';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactClick: () => void;
}

export default function ProjectModal({ project, onClose, onContactClick }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-3xl bg-[#0c101c] border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden text-left z-10 my-8"
        >
          {/* Top Bar with mock browser controls and close */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#080b12] border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">
                {project.category} · Concept Showcase
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Image Banner */}
          <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              onError={(e) => {
                const target = e.currentTarget;
                if (project.id === 'apex-auto-detailing') {
                  target.src = '/images/apex_car_detailing_1791213804660.jpg';
                } else if (project.id === 'flavors-restaurant') {
                  target.src = '/images/flavors_dining_1791213825726.jpg';
                } else if (project.id === 'lumiere-dental') {
                  target.src = '/images/project_lumiere_dental_1791208413825.jpg';
                }
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c101c] via-transparent to-transparent opacity-80" />
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 tracking-wide uppercase">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">{project.tagline}</p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                {project.hasLiveDemo && project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/30"
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="px-3.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                    Concept Preview Ready
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>

            {/* Deliverables / Scope */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Project Deliverables & Architecture
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.deliverables.map((item) => (
                  <div
                    key={item}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom prompt */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Interested in a custom website with similar polish?
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
              >
                <span>Request a quote for your business</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
