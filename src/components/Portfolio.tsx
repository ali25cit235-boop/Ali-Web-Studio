import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteConfig, ProjectItem } from '../data/siteConfig';

interface PortfolioProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function Portfolio({ onSelectProject }: PortfolioProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
              <span>03</span>
              <span className="text-slate-600">/</span>
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
              Selected Work
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md">
            Explorations and production concepts developed to demonstrate clean structure, typography, responsive fidelity, and purposeful interaction.
          </p>
        </div>

        {/* Featured Project Cards */}
        <div className="space-y-16">
          {siteConfig.projects.map((project, index) => {
            const isHovered = hoveredId === project.id;
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-3xl bg-[#0a0e19] border border-white/10 hover:border-indigo-500/30 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/60"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10 ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Visual Preview / Browser Frame */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:col-start-6' : ''}`}>
                    <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-xl overflow-hidden">
                      {/* Browser header chrome */}
                      <div className="bg-[#090c15] px-4 py-2.5 rounded-t-[14px] border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 bg-white/5 px-3 py-0.5 rounded border border-white/5 truncate max-w-[220px]">
                          {project.hasLiveDemo ? project.url.replace('https://', '') : 'aliwebstudio.co/concepts/' + project.id}
                        </div>
                        <div className="w-4" />
                      </div>

                      {/* Image Preview Container */}
                      <div
                        onClick={() => onSelectProject(project)}
                        className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="eager"
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
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <span className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect Concept</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className={`lg:col-span-5 text-left space-y-4 ${isEven ? 'lg:col-start-1' : ''}`}>
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400">
                      <span>{project.category}</span>
                      <span className="text-slate-600">/</span>
                      <span className="text-slate-400 font-sans">{project.tagline}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-white font-display">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 pt-2">
                      {project.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Buttons row */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      {project.hasLiveDemo && project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/25 transition-all inline-flex items-center gap-1.5 active:scale-95"
                        >
                          <span>View Live Website</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600/80 hover:bg-indigo-600 rounded-xl transition-all inline-flex items-center gap-1.5"
                        >
                          <span>Explore Concept</span>
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Project Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
