import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function FreeDemoSection() {
  return (
    <section id="demo-request" className="py-24 relative overflow-hidden bg-[#080B14] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-blue-600/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl p-1 bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-transparent shadow-2xl shadow-black/80"
        >
          <div className="rounded-[22px] bg-[#0D1220] border border-white/[0.08] p-8 sm:p-12 lg:p-16 text-center space-y-8">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono text-[#4F8CFF]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>FREE PERSONALIZED DEMO</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white max-w-3xl mx-auto text-balance">
              See What an AI Voice Agent Could Do for Your Business
            </h2>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Request a free personalized demo built around your business, services, and customer enquiries. Explore the experience first, then decide whether you'd like to move forward.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={siteConfig.contact.whatsappDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] hover:from-[#3B7CFF] hover:to-[#7C3AED] shadow-xl shadow-blue-500/30 hover:shadow-blue-500/45 transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Request My Free Demo on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </motion.a>

              {/* Supporting Trust Bullet Points */}
              <p className="text-xs font-mono text-slate-400 flex flex-wrap items-center justify-center gap-2 pt-2">
                <span>Personalized demo</span>
                <span className="text-slate-600" aria-hidden="true">&bull;</span>
                <span>No obligation to purchase</span>
                <span className="text-slate-600" aria-hidden="true">&bull;</span>
                <span>Setup requirements discussed before deployment</span>
              </p>
            </div>

            {/* Prefilled message preview card */}
            <div className="mt-8 pt-8 border-t border-white/[0.06] max-w-xl mx-auto text-left">
              <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
                <span>PRE-FILLED WHATSAPP MESSAGE TEMPLATE:</span>
                <span className="text-emerald-400 font-semibold">{siteConfig.contact.whatsappDisplay}</span>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-300 leading-relaxed select-all">
                &ldquo;Hi Ali AI Solutions! I'd like to request a free personalized AI Voice Agent demo for my business. My business name is: ____. My business type is: ____. I'd like the agent to help with: ____.&rdquo;
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
