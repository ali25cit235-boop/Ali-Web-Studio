import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Monitor, Smartphone, Zap, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import heroPreviewImg from '../assets/images/hero_agency_preview_1791208374639.jpg';
import awMonogramImg from '../assets/images/aw_monogram_icon_1791209636846.jpg';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Subtle grid layer */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left space-y-6"
          >
            {/* Studio intro kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-300 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{siteConfig.brand.type}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">Selected Work 2026</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] 2xl:text-6xl font-bold tracking-tight text-white font-display leading-[1.12] text-balance">
              Websites That Make Your Business{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-100 to-sky-300">
                Stand Out.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-[15px] xl:text-base text-slate-300 max-w-xl leading-relaxed font-sans font-normal">
              {siteConfig.brand.heroDescription}
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('work')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="px-6 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Availability signal */}
            <div className="pt-4 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for select client projects & website redesigns</span>
            </div>
          </motion.div>

          {/* Right Column: Visual Studio Mockup Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-white/0 shadow-2xl shadow-indigo-950/50">
              <div className="relative rounded-[14px] bg-[#0c101a] border border-white/10 overflow-hidden group">
                {/* Browser bar header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#080b12] border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 truncate max-w-[200px]">
                    <span className="text-indigo-400">https://</span>
                    <span>aliwebstudio.co</span>
                  </div>
                  <div className="w-4" />
                </div>

                {/* Hero preview image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={heroPreviewImg}
                    alt="Ali Web Studio preview interface"
                    onError={(e) => {
                      e.currentTarget.src = '/images/hero_agency_preview_1791208374639.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-transparent to-transparent opacity-60" />
                </div>

                {/* Micro preview status bar */}
                <div className="p-4 bg-[#0c101a] flex items-center justify-between border-t border-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={awMonogramImg}
                      alt="Logo icon"
                      onError={(e) => {
                        e.currentTarget.src = '/images/aw_monogram_icon_1791209636846.jpg';
                      }}
                      className="w-4 h-4 rounded-full object-cover ring-1 ring-indigo-500/30 shrink-0"
                    />
                    <span className="text-slate-300 font-medium">Bespoke Design Architecture</span>
                  </div>
                  <span className="text-slate-500 font-mono">React · Vite · 60fps</span>
                </div>
              </div>

              {/* Floating Feature Card 1: Top Left */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-6 -left-4 sm:-left-6 hidden sm:flex items-center gap-3 p-3 rounded-xl bg-[#0e1322]/90 backdrop-blur-md border border-white/10 shadow-xl shadow-black/40"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Modern UI & Motion</div>
                  <div className="text-[11px] text-slate-400">Custom Typography & Layouts</div>
                </div>
              </motion.div>

              {/* Floating Feature Card 2: Bottom Right */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="absolute -bottom-5 -right-4 sm:-right-6 hidden sm:flex items-center gap-3 p-3 rounded-xl bg-[#0e1322]/90 backdrop-blur-md border border-white/10 shadow-xl shadow-black/40"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Mobile-First Build</div>
                  <div className="text-[11px] text-slate-400">100% Fluid Device Scaling</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
