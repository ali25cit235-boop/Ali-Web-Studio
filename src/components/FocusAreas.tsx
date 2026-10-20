import { Smartphone, Globe, Terminal, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { focusAreas } from '../data/portfolioData';

interface FocusAreasProps {
  onSelectCategory?: (category: string) => void;
}

export default function FocusAreas({ onSelectCategory }: FocusAreasProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      default:
        return <Terminal className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="focus-areas" className="py-20 md:py-28 relative border-t border-slate-800/80 bg-[#070912]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-blue-400">
            <span>WHAT I DO & EXPLORE</span>
            <span aria-hidden="true">·</span>
            <span>TECHNICAL INTERESTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-white tracking-tight">
            Areas of Interest & Learning Focus
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            I divide my time between formal CIT coursework, building native Android apps with Kotlin, writing automation scripts in Python, and diagnosing PC hardware.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area) => (
            <div
              key={area.id}
              className="rounded-2xl p-6 bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header with Icon & Unboxed Status */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 group-hover:scale-105 transition-transform">
                    {getIcon(area.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{area.level}</span>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-lg font-semibold font-outfit text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {area.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {area.shortDesc}
                </p>

                {/* Detailed Note */}
                <p className="text-xs text-slate-400 leading-relaxed mb-5 border-l-0 pl-0">
                  {area.details}
                </p>
              </div>

              <div>
                {/* Clean Unboxed Skills List (Zero-Pill Discipline) */}
                <div className="pt-4 border-t border-slate-800/70">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Key Topics & Skills
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {area.skills.map((skill, idx) => (
                      <span key={skill}>
                        {skill}
                        {idx < area.skills.length - 1 && <span className="text-slate-600 mx-1.5" aria-hidden="true">·</span>}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Current Focus Note */}
                <div className="mt-4 pt-3 border-t border-slate-800/50 text-[11px] text-blue-400 font-mono">
                  <span className="text-slate-500">Currently: </span>
                  {area.currentFocus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
