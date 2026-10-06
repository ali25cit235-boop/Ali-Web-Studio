import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, MousePointerClick, Code } from 'lucide-react';
import apexAutoImg from '../assets/images/apex_car_detailing_1791213804660.jpg';
import lumiereDentalImg from '../assets/images/project_lumiere_dental_1791208413825.jpg';
import flavorsRestaurantImg from '../assets/images/flavors_dining_1791213825726.jpg';
import workspaceImg from '../assets/images/about_studio_workspace_1791208450961.jpg';

export default function ResultsPillars() {
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      id: "design",
      title: "Website Design",
      subtitle: "Bespoke Aesthetic & Visual Hierarchy",
      description: "Articulated typography, balanced white space, and dark modern aesthetics tuned to convey trust and authority from the very first second.",
      icon: Layout,
      image: apexAutoImg,
      fallback: "/images/apex_car_detailing_1791213804660.jpg",
      highlight: "Apex Auto Detailing Showcase",
      badge: "Visual Excellence",
    },
    {
      id: "responsive",
      title: "Responsive UI",
      subtitle: "Mobile-First Fluid Scalability",
      description: "Every component dynamically adapts from 320px smartphones to 4K monitors with zero horizontal overflow and comfortable touch targets.",
      icon: Smartphone,
      image: lumiereDentalImg,
      fallback: "/images/project_lumiere_dental_1791208413825.jpg",
      highlight: "Lumiere Dental Layout",
      badge: "100% Fluid Breakpoints",
    },
    {
      id: "interactive",
      title: "Interactive Experience",
      subtitle: "Engaging Micro-Interactions",
      description: "Subtle hover states, smooth menu reveals, and tasteful motion that delight users without bogging down device performance.",
      icon: MousePointerClick,
      image: flavorsRestaurantImg,
      fallback: "/images/flavors_dining_1791213825726.jpg",
      highlight: "FLAVORS Dining Concept",
      badge: "Framer Motion Powered",
    },
    {
      id: "development",
      title: "Modern Development",
      subtitle: "Clean, Lightweight Code Architecture",
      description: "Built with modern React and Vite standards, ensuring rapid time-to-first-byte and compatibility with platforms like GitHub and Cloudflare Pages.",
      icon: Code,
      image: workspaceImg,
      fallback: "/images/about_studio_workspace_1791208450961.jpg",
      highlight: "Modern Tech Foundation",
      badge: "Vite + Tailwind Architecture",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#07090e] border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>Design & Engineering Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
            What Makes an <span className="text-gradient">Ali Web Studio</span> Build Different
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Every website is custom engineered around four non-negotiable standards of modern digital presence.
          </p>
        </div>

        {/* Interactive Tab + Visual Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Tab Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = selectedPillar === idx;

              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all border cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-white/[0.07] border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Left accent indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="activePillarIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500"
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-white group-hover:text-indigo-200 transition-colors">
                          {pillar.title}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-400 font-mono">
                        {pillar.subtitle}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Preview Container */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedPillar}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative rounded-2xl p-1 bg-gradient-to-b from-white/15 to-transparent shadow-2xl overflow-hidden"
            >
              <div className="relative rounded-[14px] bg-[#0c101b] border border-white/10 overflow-hidden">
                {/* Header bar */}
                <div className="px-4 py-3 bg-[#080b12] border-b border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="font-mono text-slate-400 ml-2">
                      {pillars[selectedPillar].highlight}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-mono">
                    {pillars[selectedPillar].badge}
                  </span>
                </div>

                {/* Screenshot */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={pillars[selectedPillar].image}
                    alt={pillars[selectedPillar].title}
                    onError={(e) => {
                      e.currentTarget.src = pillars[selectedPillar].fallback;
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c101b] via-transparent to-transparent opacity-50" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
