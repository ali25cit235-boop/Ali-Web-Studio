import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface ProblemsSectionProps {
  onSolutionFinderClick: () => void;
}

export default function ProblemsSection({ onSolutionFinderClick }: ProblemsSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0B101D] border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/08 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4F8CFF]">
            <span>BUSINESS COMMUNICATION GAP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            Your Business Deserves a <span className="text-gradient-electric">Smarter Way to Respond.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Every day, small and growing companies miss valuable leads simply because the phone rings when their team is already serving an in-person client or off the clock.
          </p>
        </div>

        {/* Side-by-Side Reality Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Traditional Friction Card */}
          <div className="rounded-2xl p-7 bg-[#111827] border border-rose-500/20 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">The Traditional Communication Bottleneck</h3>
                <p className="text-xs text-rose-300 font-mono">Costly in missed revenue and frustrated callers</p>
              </div>
            </div>

            <div className="space-y-3.5 pt-2">
              {siteConfig.problemComparisons.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-rose-400 font-bold text-sm shrink-0 mt-0.5">&times;</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Voice Agent Potential Outcomes Card */}
          <div className="rounded-2xl p-7 bg-[#111827] border border-blue-500/30 shadow-xl shadow-blue-500/5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#4F8CFF] shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">How an AI Voice Agent Solves This</h3>
                <p className="text-xs text-[#4F8CFF] font-mono">Configured to reflect your real business rules</p>
              </div>
            </div>

            <div className="space-y-3.5 pt-2">
              {siteConfig.problemComparisons.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/[0.04] border border-blue-500/15">
                  <CheckCircle2 className="w-4 h-4 text-[#4F8CFF] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {item.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Callout & Quick Pivot to Solution Finder */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-white">Find the exact right workflow for your industry</h4>
            <p className="text-xs text-slate-400">
              Every business has unique call types. Try our interactive business selector to see tailored solutions.
            </p>
          </div>
          <button
            type="button"
            onClick={onSolutionFinderClick}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#4F8CFF] hover:bg-[#3B7CFF] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95 shrink-0"
          >
            <span>Launch Solution Finder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
