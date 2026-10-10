import { 
  Target, 
  MessageSquare, 
  Sliders, 
  FileText, 
  CheckCircle, 
  UserCheck 
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function WhyAliAI() {
  const iconList = [
    Target,
    MessageSquare,
    Sliders,
    FileText,
    CheckCircle,
    UserCheck,
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#080B14] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-600/08 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4F8CFF]">
            <span>ENGINEERING PRINCIPLES &bull; TRUST &amp; TRANSPARENCY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            Technology Should Solve <span className="text-gradient-electric">Real Business Problems.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            We partner with business owners who value clarity, reliability, and human-friendly design over empty artificial intelligence hype.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.principles.map((p, idx) => {
            const Icon = iconList[idx % iconList.length];

            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#111827] border border-white/[0.07] hover:border-blue-500/30 transition-all space-y-3 group shadow-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#4F8CFF] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#4F8CFF] group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-white font-display group-hover:text-blue-200 transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Statement */}
        <div className="mt-12 text-center text-xs text-slate-400 font-mono">
          <span>Ali AI Solutions &bull; Focused on practical business outcomes, reliable telephony workflows, and clean code.</span>
        </div>
      </div>
    </section>
  );
}
