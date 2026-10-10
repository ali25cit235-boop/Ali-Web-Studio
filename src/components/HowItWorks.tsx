import { siteConfig } from '../data/siteConfig';

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0B101D] border-t border-white/[0.06]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/06 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4F8CFF]">
            <span>METHODOLOGY &bull; 4-STEP PROCESS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            How We Build Your <span className="text-gradient-electric">AI Voice Workflow.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            A structured, disciplined engineering path ensuring your agent represents your brand with accuracy, polite tone, and safe escalation boundaries.
          </p>
        </div>

        {/* 4-Step Process Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 -translate-y-12 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {siteConfig.process.map((step, index) => (
              <div
                key={step.step}
                className="rounded-2xl p-6 bg-[#111827] border border-white/[0.08] hover:border-blue-500/30 transition-all flex flex-col justify-between relative group shadow-xl"
              >
                <div>
                  {/* Step Number & Step Index */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 text-[#4F8CFF] font-mono font-bold text-sm flex items-center justify-center group-hover:scale-105 group-hover:bg-[#4F8CFF] group-hover:text-white transition-all">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Phase 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-blue-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400 mb-3">
                    {step.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {step.description}
                  </p>
                </div>

                {/* Scope Details */}
                <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
