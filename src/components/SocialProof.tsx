import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface SocialProofProps {
  onStartProject: () => void;
}

export default function SocialProof({ onStartProject }: SocialProofProps) {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#06080e] to-[#090d18] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#0c1120] border border-white/10 overflow-hidden shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Craft & Production Standards</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display text-balance">
              Building the Portfolio, One Great Website at a Time.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
              Rather than relying on inflated claims or fabricated reviews, Ali Web Studio lets the work speak. Every website is built with genuine dedication to craftsmanship, clean code, and business clarity.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Transparent Collaboration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                No Cookie-Cutter Layouts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Full Code Handover
              </span>
            </div>

            <div className="pt-6">
              <div className="text-sm font-medium text-slate-300 mb-3">
                Want your business to have a website like these?
              </div>
              <button
                type="button"
                onClick={onStartProject}
                className="px-8 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
