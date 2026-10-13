import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#0B101D] border-t border-white/[0.06]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/06 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4F8CFF]">
            <span>THE PROCESS &bull; 4 SIMPLE STEPS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            How It <span className="text-gradient-electric">Works.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From initial business discovery to private demo testing and phone line deployment.
          </p>
        </div>

        {/* 4-Step Process Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 -translate-y-12 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {siteConfig.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="rounded-2xl p-6 sm:p-7 bg-[#111827] border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#131D33] transition-all flex flex-col justify-between relative group shadow-xl"
              >
                <div>
                  {/* Step Number & Step Index */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/25 text-[#4F8CFF] font-mono font-bold text-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4F8CFF] group-hover:text-white transition-all shadow-md group-hover:shadow-blue-500/30">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-purple-300 transition-colors">
                      STEP 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-blue-100 transition-colors">
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
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-[#4F8CFF] shrink-0 transition-colors" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 text-center">
          <a
            href={siteConfig.contact.whatsappDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-500/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ready to Begin? Message Us on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
