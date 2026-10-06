import { motion } from 'framer-motion';
import { Layers, Smartphone, Sparkles, Zap, Target, Gauge } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import workspaceImg from '../assets/images/about_studio_workspace_1791208450961.jpg';

export default function About() {
  const coreStrengths = [
    {
      title: "Modern UI & Aesthetic",
      desc: "Tailored visual identity avoiding cookie-cutter templates.",
      icon: Sparkles,
    },
    {
      title: "Mobile-First Experience",
      desc: "Crafted specifically for smartphones where most visitors land.",
      icon: Smartphone,
    },
    {
      title: "Smooth Animations",
      desc: "Thoughtful micro-interactions that elevate brand perception.",
      icon: Layers,
    },
    {
      title: "Clear Calls to Action",
      desc: "Intentional pathways guiding visitors toward reaching out.",
      icon: Target,
    },
    {
      title: "Performance Focused",
      desc: "Lightweight architectures that load swiftly and effortlessly.",
      icon: Gauge,
    },
    {
      title: "Responsive Development",
      desc: "Tested across multiple viewports for consistent presentation.",
      icon: Zap,
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle ambient blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Workspace Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/15 to-white/5 shadow-2xl">
              <div className="rounded-[14px] overflow-hidden bg-[#0c101a] border border-white/10 group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={workspaceImg}
                    alt="Ali Web Studio creative development workspace"
                    onError={(e) => {
                      e.currentTarget.src = '/images/about_studio_workspace_1791208450961.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-black/20 to-transparent" />
                </div>
                {/* Caption bar */}
                <div className="p-4 bg-[#0c101a] border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400">Independent Studio</span>
                  <span className="text-xs text-slate-400">Focus on Quality & Craft</span>
                </div>
              </div>

              {/* Detail badge */}
              <div className="absolute -bottom-4 -right-4 p-3.5 rounded-xl bg-[#0e1322] border border-white/15 shadow-xl">
                <div className="text-xs font-semibold text-white">Direct Collaboration</div>
                <div className="text-[11px] text-slate-400">Zero middleman overhead</div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>01</span>
              <span className="text-slate-600">/</span>
              <span>ABOUT ALI WEB STUDIO</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-4xl font-bold tracking-tight text-white font-display text-balance leading-tight">
              Designing Digital Experiences That Feel Different.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              <strong className="text-white font-medium">Ali Web Studio</strong> focuses on creating modern, high-impact websites for small businesses, local businesses, startups, and personal brands that want to stand out in their market.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Too many business websites feel generic, clunky, or neglected. I craft focused digital presences combining contemporary UI aesthetics, responsive mobile-first architecture, clean micro-interactions, and clear conversion calls to action so your business earns immediate credibility.
            </p>

            {/* Strengths grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreStrengths.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                      <h4 className="text-xs font-semibold text-white tracking-wide">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal pl-6.5">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
