import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MessageCircle, Copy, Check, Terminal, Sparkles, MapPin, Shield, FileText } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

interface HeroProps {
  onExploreClick: () => void;
  onConnectClick: () => void;
}

export default function Hero({ onExploreClick, onConnectClick }: HeroProps) {
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeSnippet = portfolioConfig.terminalSnippets[activeSnippetIndex];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-violet-600/15 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic & Brand Hierarchy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Status & Intro Label */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono font-medium tracking-wider uppercase text-blue-400">
                HELLO, I'M ALI ABBAS
              </span>
              <span className="text-slate-600 text-xs" aria-hidden="true">·</span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/40 border border-blue-800/40 text-[11px] font-medium text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>{portfolioConfig.statusBadge}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-outfit leading-[1.1] text-balance">
              Learning.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                Building.
              </span>{' '}
              Exploring.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {portfolioConfig.heroDescription}
            </p>

            {/* Location & Academic marker */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Kamalia, Punjab, Pakistan</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>DAE CIT · GCT Kamalia (87.5% Result)</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-mono">42 WPM Typing</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer whitespace-nowrap group"
              >
                <span>Explore My Journey</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href={portfolioConfig.resumePdfUrl}
                download="Ali_Abbas_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Download Resume (PDF)</span>
              </a>

              <button
                onClick={onConnectClick}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Connect</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual & Interactive Code Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Interactive Terminal Window */}
            <div className="rounded-2xl border border-slate-800 bg-[#0A0D18]/90 backdrop-blur-md shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/60">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-slate-600 text-xs ml-1" aria-hidden="true">|</span>
                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>{activeSnippet.filename}</span>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
                  title="Copy snippet"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Tabs */}
              <div className="flex items-center gap-1 px-3 py-2 bg-slate-900/40 border-b border-slate-800/60 overflow-x-auto text-xs font-mono">
                {portfolioConfig.terminalSnippets.map((snippet, idx) => (
                  <button
                    key={snippet.id}
                    onClick={() => setActiveSnippetIndex(idx)}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      activeSnippetIndex === idx
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    {snippet.label}
                  </button>
                ))}
              </div>

              {/* Code Editor Body */}
              <div className="p-4 overflow-x-auto max-h-[300px] text-xs font-mono leading-relaxed bg-[#070912]">
                <pre className="text-slate-300">
                  <code>{activeSnippet.code}</code>
                </pre>
              </div>

              {/* Terminal Footer info */}
              <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Ali Abbas · CIT Builder Environment</span>
                <span className="text-blue-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Hands-on learning
                </span>
              </div>
            </div>

            {/* Small Workstation Photo Pill */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/70 bg-slate-900/40 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-700/60">
                <img
                  src="/src/assets/images/ali_hero_workspace_1792478730711.jpg"
                  alt="Ali Abbas developer workspace"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs">
                <p className="font-medium text-slate-200">Where the building happens</p>
                <p className="text-slate-400 text-[11px]">Dual-monitor setup · Android Studio · VS Code · Hardware bench</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4-Item Milestone Strip Below Hero Split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {portfolioConfig.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold font-outfit text-white tabular-nums">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
