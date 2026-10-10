import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Phone, Bot, CheckCircle, Sparkles, Volume2, Mic, Activity } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface HeroProps {
  onContactClick: () => void;
}

type AgentState = 'idle' | 'listening' | 'processing' | 'speaking';

export default function Hero({ onContactClick }: HeroProps) {
  const [agentState, setAgentState] = useState<AgentState>('speaking');

  // Cycle state periodically for ambient life if user doesn't click
  useEffect(() => {
    const states: AgentState[] = ['idle', 'listening', 'processing', 'speaking'];
    let idx = 3;
    const interval = setInterval(() => {
      idx = (idx + 1) % states.length;
      setAgentState(states[idx]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

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

  const stateDetails = {
    idle: {
      label: "Standby Mode",
      status: "Waiting for incoming caller",
      color: "border-slate-500/40 text-slate-300 bg-slate-500/10",
      waveformSpeed: "opacity-30 scale-y-50",
    },
    listening: {
      label: "Active Listening",
      status: "Capturing customer speech with noise filtering",
      color: "border-sky-500/40 text-sky-300 bg-sky-500/10",
      waveformSpeed: "opacity-80 scale-y-90",
    },
    processing: {
      label: "Knowledge Retrieval",
      status: "Analyzing request against approved business rules",
      color: "border-purple-500/40 text-purple-300 bg-purple-500/10",
      waveformSpeed: "opacity-60 scale-y-75 animate-pulse",
    },
    speaking: {
      label: "Voice Synthesizing",
      status: "Responding naturally in friendly brand tone",
      color: "border-blue-500/50 text-blue-300 bg-blue-500/15 shadow-sm shadow-blue-500/20",
      waveformSpeed: "opacity-100 scale-y-100",
    },
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#080B14]">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#4F8CFF]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#8B5CF6]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#06B6D4]/08 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-grid-tech pointer-events-none -z-10 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tasteful small kicker label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
              <span className="text-[#4F8CFF] font-semibold">AI VOICE AGENTS</span>
              <span className="text-slate-600" aria-hidden="true">&bull;</span>
              <span>BUSINESS AUTOMATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.65rem] font-bold tracking-tight text-white font-display leading-[1.1] text-balance">
              Never Miss an Opportunity to <span className="text-gradient-electric">Connect.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              AI voice agents that help businesses handle customer calls, answer common questions, capture enquiries, and stay responsive — even when your team is busy.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('demo-console')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] hover:from-[#3B7CFF] hover:to-[#7C3AED] shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <Mic className="w-4 h-4" />
                <span>Test Voice Agent</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('solution-finder')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-blue-400/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Find a Solution for My Business</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Subtle secondary link */}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => scrollTo('websites')}
                className="text-xs text-slate-400 hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                <span>Looking for a website instead?</span>
                <span className="text-[#4F8CFF] font-medium group-hover:underline">Explore website solutions &rarr;</span>
              </button>
            </div>

            {/* Value checklist snippet */}
            <div className="pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#4F8CFF] shrink-0" />
                <span>Zero Busy Signals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span>Structured Lead Logging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>Human Escalation Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Voice AI Interactive Orb & Simulated Call Flow */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent shadow-2xl shadow-black/80">
              <div className="rounded-[18px] bg-[#0D1220] border border-white/[0.08] p-6 space-y-6 relative overflow-hidden">
                
                {/* Header of the AI Simulation Box */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-mono text-slate-300 font-medium">Ali AI Voice Core</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">Model: Latency &le; 600ms</span>
                </div>

                {/* Central Glowing AI Voice Orb Visualizer */}
                <div className="relative py-8 flex flex-col items-center justify-center">
                  {/* Concentric sound wave pulse rings */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: agentState === 'speaking' ? [1, 1.25, 1] : [1, 1.08, 1],
                        opacity: agentState === 'speaking' ? [0.4, 0.1, 0.4] : [0.25, 0.1, 0.25],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full border border-blue-400/40"
                    />
                    <motion.div
                      animate={{
                        scale: agentState === 'speaking' ? [1, 1.45, 1] : [1, 1.15, 1],
                        opacity: agentState === 'speaking' ? [0.25, 0.05, 0.25] : [0.15, 0.05, 0.15],
                      }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -inset-4 rounded-full border border-purple-400/30"
                    />

                    {/* Central Orb Core */}
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#0A0E1A] border border-blue-500/30 p-1 shadow-inner flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/30 blur-sm" />
                      
                      {/* Dynamic Voice Waveform Bars inside core */}
                      <div className="relative z-10 flex items-center gap-1 h-12">
                        {[40, 75, 55, 90, 60, 100, 70, 45, 80, 50, 30].map((h, i) => (
                          <motion.span
                            key={i}
                            animate={{
                              height: agentState === 'speaking' 
                                ? [`${h * 0.35}%`, `${h}%`, `${h * 0.4}%`]
                                : agentState === 'listening'
                                ? [`${h * 0.6}%`, `${h * 0.9}%`, `${h * 0.5}%`]
                                : [`${h * 0.25}%`, `${h * 0.35}%`, `${h * 0.25}%`],
                            }}
                            transition={{
                              duration: 0.8 + (i % 3) * 0.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className={`w-1 rounded-full ${
                              i % 2 === 0 ? 'bg-[#4F8CFF]' : 'bg-[#8B5CF6]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active state description banner */}
                  <div className="mt-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${stateDetails[agentState].color}`}>
                      {stateDetails[agentState].label}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                      {stateDetails[agentState].status}
                    </p>
                  </div>
                </div>

                {/* State selector controls for interactive exploration */}
                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span>Simulate Conversation State:</span>
                    <span className="font-mono text-blue-400">Interactive</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5">
                    {(['idle', 'listening', 'processing', 'speaking'] as AgentState[]).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setAgentState(st)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all capitalize cursor-pointer ${
                          agentState === st
                            ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Call Flow Step Visualization */}
                <div className="bg-black/30 rounded-xl p-3 border border-white/5 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Standard Call Pipeline</span>
                    <span className="text-emerald-400">Frictionless</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                      <Phone className="w-3.5 h-3.5 text-sky-400 mx-auto" />
                      <div className="font-semibold text-slate-200">1. Inbound Ring</div>
                      <div className="text-slate-400">&lt;1 sec pickup</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                      <Bot className="w-3.5 h-3.5 text-blue-400 mx-auto" />
                      <div className="font-semibold text-slate-200">2. AI Dialog</div>
                      <div className="text-slate-400">Approved FAQs</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mx-auto" />
                      <div className="font-semibold text-slate-200">3. Logged Lead</div>
                      <div className="text-slate-400">Instant summary</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
