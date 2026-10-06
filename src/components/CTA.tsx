import { motion } from 'framer-motion';
import { Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface CTAProps {
  onOpenWhatsApp: () => void;
}

export default function CTA({ onOpenWhatsApp }: CTAProps) {
  const handleWhatsAppAction = () => {
    if (siteConfig.contact.whatsappNumber) {
      window.open(siteConfig.contact.whatsappUrl, '_blank');
    } else {
      onOpenWhatsApp();
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#070a12]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400">
            <span>GET IN TOUCH</span>
            <span className="text-slate-600">/</span>
            <span>NEXT STEPS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display text-balance">
            Have a Business That Deserves a Better Website?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-sans">
            Let's create a modern online presence that makes your business look professional and easy to contact.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="px-7 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all inline-flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Me</span>
            </button>

            <a
              href={siteConfig.contact.emailMailto}
              className="px-7 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all inline-flex items-center gap-2 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
            </a>
          </div>

          <p className="text-xs text-slate-400 pt-2">
            No commitment required. Tell me about your business and get an honest assessment.
          </p>
        </div>
      </div>
    </section>
  );
}
