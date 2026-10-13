import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ArrowDown, ShieldCheck, Sparkles, Volume2, Bot, User, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function Hero() {
  const [activeDialogIndex, setActiveDialogIndex] = useState(0);

  const dialogSequence = [
    {
      caller: "Hi! Do you have any openings for dental cleaning this Thursday?",
      agent: "Yes, we have 2:30 PM & 4:15 PM open with Dr. Harris. Which works best?",
      industry: "Dental Clinic",
    },
    {
      caller: "Can I get an estimate for full car detailing this weekend?",
      agent: "Certainly! Our ceramic package starts at $180. What vehicle model is it?",
      industry: "Auto Detailing",
    },
    {
      caller: "Our office air conditioning stopped working, is someone on call?",
      agent: "Yes! Our emergency team is on dispatch. Can I grab your property address?",
      industry: "HVAC & Repairs",
    },
    {
      caller: "Do you have haircut appointments available tomorrow at 5 PM?",
      agent: "Tomorrow at 5:15 PM is open with Sarah. Shall I hold that for you?",
      industry: "Salon & Grooming",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDialogIndex((prev) => (prev + 1) % dialogSequence.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [dialogSequence.length]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const currentDialog = dialogSequence[activeDialogIndex];

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#080B14]">
      {/* Dynamic ambient background motion lighting */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#4F8CFF]/15 rounded-full blur-[170px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.10, 0.18, 0.10],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#8B5CF6]/15 rounded-full blur-[150px] pointer-events-none -z-10"
      />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#06B6D4]/08 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-grid-tech pointer-events-none -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition with stagger animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Kicker label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4F8CFF] animate-pulse" />
              <span className="text-[#4F8CFF] font-semibold">AI VOICE AGENTS</span>
              <span className="text-slate-600" aria-hidden="true">&bull;</span>
              <span>BUSINESS AUTOMATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.65rem] font-bold tracking-tight text-white font-display leading-[1.1] text-balance">
              Meet Your Business's <span className="text-gradient-electric">AI Voice Assistant</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Answer customer enquiries, capture leads, and help your business stay responsive with a custom AI Voice Agent designed around your services and workflow.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={siteConfig.contact.whatsappDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] hover:from-[#3B7CFF] hover:to-[#7C3AED] shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get Your FREE Demo</span>
              </motion.a>

              <button
                type="button"
                onClick={() => scrollTo('how-it-works')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-blue-400/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <span>How It Works</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust badge note */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Personalized private demo prepared for your business &bull; Tested separately</span>
            </div>
          </motion.div>

          {/* Right Column: Advanced Illustrative Motion Graphics (Orb + Concentric Waves + Rotating Radar Ring) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-[#111827] via-[#0E1526] to-[#080B14] border border-white/[0.09] p-7 sm:p-8 flex flex-col items-center justify-between overflow-hidden shadow-2xl shadow-black/90">
              
              {/* Animated corner glow beam */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Central Motion Graphic Stage */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center my-auto">
                {/* Outermost pulsing radar ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.45, 1],
                    opacity: [0.25, 0.05, 0.25],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-6 rounded-full border border-sky-400/25 pointer-events-none"
                />

                {/* Secondary expanding wave ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.35, 0.1, 0.35],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-2 rounded-full border border-purple-400/35 pointer-events-none"
                />

                {/* Rotating orbital particle ring */}
                <div className="absolute -inset-4 rounded-full border border-dashed border-blue-400/20 animate-radar-spin pointer-events-none" />

                {/* Main Glowing Core Orb with dynamic breathing motion */}
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[3px] shadow-2xl shadow-blue-500/50 animate-orb-glow relative flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#090D18] flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial from-blue-500/25 via-purple-500/15 to-transparent pointer-events-none" />
                    
                    {/* Dynamic Equalizer Waveform Bars with individual wave offsets */}
                    <div className="flex items-center gap-1.5 h-11 z-10 px-2">
                      {[30, 65, 90, 45, 100, 75, 95, 50, 85, 40].map((h, i) => (
                        <motion.span
                          key={i}
                          animate={{
                            height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`],
                            opacity: [0.75, 1, 0.8],
                          }}
                          transition={{
                            duration: 0.9 + (i % 4) * 0.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="w-1.5 rounded-full bg-gradient-to-t from-blue-400 via-indigo-400 to-purple-300 shadow-sm shadow-blue-400/40"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 z-10">
                      <Volume2 className="w-3 h-3 text-[#4F8CFF] animate-pulse" />
                      <span className="text-[10px] font-mono text-blue-200 font-semibold tracking-wider uppercase">
                        AI Audio Stream
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Animated Conversation Turns with smooth AnimatePresence transition */}
              <div className="w-full relative min-h-[105px] mt-4 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDialogIndex}
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-2 text-left"
                  >
                    {/* Industry indicator label */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                      <span className="text-purple-400 font-semibold">Workflow: {currentDialog.industry}</span>
                      <span className="text-slate-500">Live Call Preview</span>
                    </div>

                    {/* Caller inquiry card */}
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 flex items-start gap-2 shadow-sm">
                      <User className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span className="leading-snug">&ldquo;{currentDialog.caller}&rdquo;</span>
                    </div>

                    {/* AI Agent instant response card */}
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-xs text-blue-100 flex items-start gap-2 shadow-sm">
                      <Bot className="w-3.5 h-3.5 text-[#4F8CFF] mt-0.5 shrink-0 animate-pulse" />
                      <span className="leading-snug">&ldquo;{currentDialog.agent}&rdquo;</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step indicator dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3 z-10">
                {dialogSequence.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDialogIndex(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === activeDialogIndex ? 'w-6 bg-[#4F8CFF]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Show dialog sample ${i + 1}`}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

