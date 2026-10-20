import { useState } from 'react';
import { ArrowUpRight, Smartphone, Globe, Terminal, Cpu, Layers } from 'lucide-react';
import { projectsList, ProjectItem } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'android', label: 'Android / Kotlin' },
    { id: 'web', label: 'Web & Prototypes' },
    { id: 'python', label: 'Python Scripts' },
    { id: 'hardware', label: 'Hardware & Systems' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projectsList
      : projectsList.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'android':
        return <Smartphone className="w-3.5 h-3.5 text-blue-400" />;
      case 'web':
        return <Globe className="w-3.5 h-3.5 text-cyan-400" />;
      case 'python':
        return <Terminal className="w-3.5 h-3.5 text-emerald-400" />;
      case 'hardware':
        return <Cpu className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-blue-400">
              <span>FEATURED WORK</span>
              <span aria-hidden="true">·</span>
              <span>PROJECTS & EXPERIMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-white tracking-tight">
              Things I've Built & Explored
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every project here was built to solve a personal friction, practice a new library, or understand how systems fit together.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-x-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/90 overflow-hidden flex flex-col justify-between transition-all group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              {/* Card Thumbnail Container */}
              <div className="relative w-full h-48 bg-slate-950/70 overflow-hidden border-b border-slate-800/80">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Stylized CSS Fallback for projects without static photo */
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-[#0B0F1C] to-slate-900">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-2">
                      {getCategoryIcon(project.category)}
                    </div>
                    <span className="text-xs font-mono text-slate-400">{project.categoryLabel}</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with separators (Zero-Pill discipline) */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(project.category)}
                      <span>{project.categoryLabel}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-blue-400">{project.status}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-semibold font-outfit text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {project.subtitle}
                  </p>
                </div>

                <div>
                  {/* Tech stack line */}
                  <div className="pt-3 border-t border-slate-800/60 mb-4">
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {project.techStack.join(' · ')}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-slate-200 hover:text-white bg-slate-800/70 hover:bg-blue-600 rounded-xl transition-all cursor-pointer group/btn"
                  >
                    <span>View Project Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
