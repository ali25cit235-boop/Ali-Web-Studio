import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Utensils, 
  Zap, 
  LayoutGrid, 
  Sparkles, 
  Smartphone,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function Services() {
  const [activeService, setActiveService] = useState<number>(0);

  const iconMap: Record<string, React.ElementType> = {
    Briefcase,
    Utensils,
    Zap,
    LayoutGrid,
    Sparkles,
    Smartphone,
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
              <span>02</span>
              <span className="text-slate-600">/</span>
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
              What I Can Build For You
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md">
            Purpose-built websites designed from scratch to highlight your business advantages and engage customers across every touchpoint.
          </p>
        </div>

        {/* Services Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, index) => {
            const Icon = iconMap[service.iconName] || Briefcase;
            const isSelected = activeService === index;

            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setActiveService(index)}
                className={`relative rounded-2xl p-7 text-left transition-all duration-300 cursor-pointer group ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#13192c] to-[#0c101d] border border-indigo-500/40 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500/20'
                    : 'bg-[#0b0e18]/80 hover:bg-[#0f1424] border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Header row: Number and Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-medium text-slate-400 group-hover:text-indigo-400 transition-colors">
                    {service.number}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-indigo-200 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables / Features list */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom micro action */}
                <div className="mt-6 pt-2 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-indigo-300 transition-colors">
                  <span>Inquire for this service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Custom request bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0d121f] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-semibold text-white font-display">
              Have a tailored website requirement or custom specification?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Every project can be customized with special sections, booking tools, or custom branding.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors shrink-0 whitespace-nowrap cursor-pointer"
          >
            Discuss Custom Scope
          </button>
        </div>
      </div>
    </section>
  );
}
