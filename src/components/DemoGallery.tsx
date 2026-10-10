import { useState } from 'react';
import { ExternalLink, Eye, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteConfig, WebsiteDemoItem } from '../data/siteConfig';

interface DemoGalleryProps {
  onSelectDemo: (demo: WebsiteDemoItem) => void;
  onRequestSimilar: (demoTitle: string) => void;
}

export default function DemoGallery({ onSelectDemo, onRequestSimilar }: DemoGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = [
    'All',
    'Automotive',
    'Clinics',
    'Restaurants',
    'Salons',
    'Home Services',
  ];

  const filteredDemos = activeFilter === 'All'
    ? siteConfig.websiteDemos
    : siteConfig.websiteDemos.filter((d) => d.category === activeFilter);

  return (
    <section id="demos" className="py-24 relative overflow-hidden bg-[#080B14]">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-blue-900/08 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#4F8CFF] mb-2">
              <span>PORTFOLIO &bull; INDUSTRY DEMOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
              Website Demo Gallery
            </h2>
          </div>

          <p className="text-slate-400 text-sm max-w-md">
            Interactive demonstrations built with clean modern architecture. Explore live layouts or inspect tailored concept previews.
          </p>
        </div>

        {/* Filter Bar (Segmented button tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar" role="tablist">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeFilter === filter
                  ? 'bg-[#4F8CFF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              {filter === 'All' ? 'All Demos' : filter}
            </button>
          ))}
        </div>

        {/* Grid of Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDemos.map((demo) => (
            <div
              key={demo.id}
              className="rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-blue-500/35 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-blue-500/10"
            >
              <div>
                {/* Browser-style address header bar */}
                <div className="bg-[#090C16] px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/5 truncate max-w-[200px]">
                    {demo.hasLiveDemo && demo.url ? demo.url.replace('https://', '') : `concept/${demo.id}`}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {demo.hasLiveDemo ? 'Live' : 'Concept'}
                  </span>
                </div>

                {/* Preview Image Slot */}
                <div
                  onClick={() => onSelectDemo(demo)}
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <img
                    src={demo.image}
                    alt={demo.title}
                    loading="eager"
                    onError={(e) => {
                      // Fallback in case of asset path issue
                      e.currentTarget.src = `/images/${demo.id}.jpg`;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-[#080B14]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-semibold shadow-lg flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Demo Architecture</span>
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-[#4F8CFF] font-semibold">{demo.category}</span>
                    <span>{demo.tagline}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display group-hover:text-blue-200 transition-colors">
                    {demo.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {demo.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-slate-400">
                    {demo.deliverables.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-6 pt-0 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-4">
                {demo.hasLiveDemo && demo.url ? (
                  <a
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#4F8CFF] hover:bg-[#3B7CFF] shadow-sm transition-all inline-flex items-center gap-1.5 active:scale-95"
                  >
                    <span>Preview Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectDemo(demo)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Concept Preview</span>
                    <Eye className="w-3 h-3 text-purple-400" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onRequestSimilar(demo.title)}
                  className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 group/btn"
                >
                  <span>Request Similar</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
