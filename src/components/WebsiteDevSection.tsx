import { Smartphone, Zap, MessageSquare, MapPin, Gauge, Shield, ArrowDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface WebsiteDevSectionProps {
  onExploreDemos: () => void;
}

export default function WebsiteDevSection({ onExploreDemos }: WebsiteDevSectionProps) {
  const websiteTypes = [
    { title: "Restaurant & Cafe Websites", desc: "Digital seasonal menus, table reservation hooks & opening hours." },
    { title: "Clinic & Healthcare Websites", desc: "Treatment catalogs, doctor credentials & patient enquiry forms." },
    { title: "Salon & Grooming Websites", desc: "Styling galleries, treatment schedules & quick WhatsApp booking." },
    { title: "Automotive & Detailer Websites", desc: "Service tier packages, before/after showcases & quote request flows." },
    { title: "Home & Contractor Websites", desc: "Emergency hotline banners, service areas & instant estimate forms." },
    { title: "Professional Landing Pages", desc: "High-conversion one-pagers structured for marketing and ad traffic." },
  ];

  const features = [
    { icon: Smartphone, label: "Mobile-First Design", desc: "Tailored for smartphones where >70% of inbound customers browse." },
    { icon: Zap, label: "Fast Loading Speeds", desc: "Lightweight codebases built on modern React and Vite without heavy bloat." },
    { icon: MessageSquare, label: "WhatsApp & Direct Contact", desc: "Frictionless direct-to-chat hooks connecting callers to your team." },
    { icon: MapPin, label: "Location & Directions", desc: "Clear Google Maps and transport instructions for easy customer visits." },
    { icon: Gauge, label: "Clean Content Structure", desc: "Clear visual hierarchy guiding visitors smoothly to your call-to-action." },
    { icon: Shield, label: "Zero Black-Box Lock-in", desc: "Clean static files deployable to Cloudflare Pages, Netlify, or your host." },
  ];

  return (
    <section id="websites" className="py-24 relative overflow-hidden bg-[#0B101D] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-purple-600/08 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-purple-400">
            <span>SECONDARY SERVICE &bull; DIGITAL PRESENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            A Website That Works as Hard as <span className="text-gradient-electric">Your Business.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Modern, responsive websites designed to explain your services clearly and help customers contact your business.
          </p>
        </div>

        {/* 2-Column Split: Website Sectors vs Technical Standard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Sectors Grid */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-2">
              Industry-Specific Website Layouts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {websiteTypes.map((type, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#111827] border border-white/[0.07] hover:border-purple-500/30 transition-colors"
                >
                  <h4 className="text-xs font-bold text-white font-display mb-1">{type.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Feature Pillars */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-2">
              Engineering Standards Built In
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#111827] border border-white/[0.07] space-y-1.5"
                  >
                    <Icon className="w-4 h-4 text-[#4F8CFF]" />
                    <h4 className="text-xs font-bold text-white font-display">{feat.label}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* CTA to Demo Gallery */}
        <div className="text-center">
          <button
            type="button"
            onClick={onExploreDemos}
            className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-purple-400/40 transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Explore Website Demos</span>
            <ArrowDown className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
