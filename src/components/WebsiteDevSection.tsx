import { Smartphone, Zap, MessageSquare, MapPin, Gauge, Shield, ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface WebsiteDevSectionProps {
  onExploreDemos: () => void;
}

export default function WebsiteDevSection({ onExploreDemos }: WebsiteDevSectionProps) {
  const websiteTypes = [
    { title: "Restaurant & Cafe Websites", desc: "Digital seasonal menus, table reservation hooks & opening hours." },
    { title: "Clinic & Healthcare Websites", desc: "Treatment catalogs, practitioner credentials & patient intake forms." },
    { title: "Salon & Grooming Websites", desc: "Styling galleries, treatment schedules & quick WhatsApp booking." },
    { title: "Auto & Detailing Websites", desc: "Service tier packages, before/after showcases & quote request flows." },
    { title: "Home Services & Contractors", desc: "Emergency service highlights, coverage maps & estimate requests." },
    { title: "Conversion Landing Pages", desc: "Focused single-page layouts structured for paid marketing campaigns." },
  ];

  return (
    <section id="websites" className="py-20 relative overflow-hidden bg-[#090D18] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-purple-600/06 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-purple-400">
            <span>SECONDARY SERVICE &bull; DIGITAL PRESENCE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white text-balance">
            Need a Website Too?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Alongside AI Voice Agents, we can help businesses establish a professional online presence.
          </p>
        </div>

        {/* 2-Column Split: Website Sectors vs Technical Standard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Sectors Grid */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Industry Website Solutions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {websiteTypes.map((type, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#111827] border border-white/[0.07] hover:border-purple-500/30 transition-colors"
                >
                  <h4 className="text-sm font-semibold text-white mb-1">{type.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Standards Card */}
          <div className="lg:col-span-5 rounded-2xl p-6 bg-[#0E1424] border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-bold text-white font-display">Modern Web Standards</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every website is mobile-first, responsive, and lightweight, built to represent your brand clearly and direct visitors to your WhatsApp or call line.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span>Mobile-optimized for smartphone traffic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span>Fast loading speeds on React &amp; modern Vite</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span>Seamless WhatsApp click-to-chat hooks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span>Deployable to Cloudflare Pages or your preferred host</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={onExploreDemos}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-slate-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-purple-400/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>View Sample Website Demos</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
