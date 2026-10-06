import { motion } from 'framer-motion';
import { Palette, Smartphone, MessageSquare, TrendingUp, Cpu, CheckCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function WhyChoose() {
  const iconMap: Record<string, React.ElementType> = {
    Palette,
    Smartphone,
    MessageSquare,
    TrendingUp,
    Cpu,
  };

  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[400px] bg-purple-950/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left sticky column */}
          <div className="lg:col-span-4 text-left lg:sticky lg:top-28 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>05</span>
              <span className="text-slate-600">/</span>
              <span>STUDIO ADVANTAGES</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-white font-display leading-tight">
              Why Work With Me?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              When you hire Ali Web Studio, you partner directly with the person designing and writing every line of code. No bloated agency retainers, no junior handoffs, and no template shortcuts.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <div className="text-xs font-semibold text-white">Direct Studio Commitment:</div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Honest scope & transparent pricing</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Clean handover with full code ownership</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Post-launch support & walkthrough</span>
              </div>
            </div>
          </div>

          {/* Right Cards Column */}
          <div className="lg:col-span-8 space-y-4">
            {siteConfig.whyChooseUs.map((pillar, index) => {
              const Icon = iconMap[pillar.iconName] || Palette;

              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="p-6 sm:p-7 rounded-2xl bg-[#0b0f1a] border border-white/[0.08] hover:border-white/20 transition-all duration-200 text-left flex flex-col sm:flex-row sm:items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-all shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-lg font-bold text-white font-display group-hover:text-indigo-200 transition-colors">
                        {pillar.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        {pillar.subtitle}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
