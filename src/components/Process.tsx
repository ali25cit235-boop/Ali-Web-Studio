import { motion } from 'framer-motion';
import { Compass, PenTool, Code2, Rocket, Check } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function Process() {
  const stepIcons = [Compass, PenTool, Code2, Rocket];

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#080b13]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
              <span>04</span>
              <span className="text-slate-600">/</span>
              <span>METHODOLOGY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
              How I Work
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md">
            A structured four-step process that eliminates guesswork and delivers a finished website on time and aligned with your goals.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {siteConfig.process.map((item, index) => {
            const Icon = stepIcons[index % stepIcons.length];

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative rounded-2xl p-6 sm:p-7 bg-[#0b0f1b] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                {/* Step indicator and icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                      Step {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-indigo-600/20 text-slate-400 group-hover:text-indigo-300 transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-1 group-hover:text-indigo-200 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-slate-400 mb-3 font-medium">
                    {item.subtitle}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables summary */}
                <div className="pt-4 border-t border-white/5 space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Key Outputs
                  </span>
                  {item.deliverables.map((deliv) => (
                    <div key={deliv} className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
