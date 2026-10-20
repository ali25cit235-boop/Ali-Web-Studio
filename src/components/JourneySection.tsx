import { Calendar, CheckCircle2, Milestone } from 'lucide-react';
import { journeyMilestones } from '../data/portfolioData';

export default function JourneySection() {
  return (
    <section id="journey" className="py-20 md:py-28 relative border-t border-slate-800/80 bg-[#070912]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-blue-400">
            <span>MY JOURNEY</span>
            <span aria-hidden="true">·</span>
            <span>LEARNING TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-white tracking-tight">
            How I Got Here & What I'm Learning
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From fixing desktop computers and diagnosing hardware issues to enrolling in CIT and developing native Android applications.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {journeyMilestones.map((milestone, idx) => (
            <div key={milestone.year} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#070912] border-2 border-blue-500 group-hover:scale-125 group-hover:bg-blue-500 transition-all shadow-sm shadow-blue-500/50" />

              {/* Milestone Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 group-hover:border-slate-700 transition-all">
                {/* Year & Period Header */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-2">
                  <span className="font-semibold text-blue-400">{milestone.year}</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-slate-400 uppercase tracking-wider">{milestone.period}</span>
                </div>

                {/* Milestone Title & Tagline */}
                <h3 className="text-xl font-bold font-outfit text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-xs font-medium text-slate-300 mb-4">
                  {milestone.tagline}
                </p>

                {/* Narrative */}
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {milestone.description}
                </p>

                {/* Key Learnings List */}
                <div className="pt-4 border-t border-slate-800/60">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2.5">
                    Milestone Takeaways
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {milestone.learnings.map((learning, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{learning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
