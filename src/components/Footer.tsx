import { Phone, Mail, MessageCircle, ArrowUp } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <footer className="bg-[#05080F] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1 (5 cols): Brand Information */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <BrandLogo size="md" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm pt-2">
              {siteConfig.brand.supportingStatement}
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Empowering local brands &amp; growing enterprises through practical conversational AI.
            </div>
          </div>

          {/* Col 2 (3 cols): Primary Solutions */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              AI Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('voice-agents')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  AI Receptionist
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('voice-agents')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Lead Capture Voice Agent
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('voice-agents')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Appointment Enquiry Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('voice-agents')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  After-Hours Call Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('solution-finder')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Industry Solution Finder
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 (2 cols): Websites & Agency */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Digital Studio
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('websites')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('demos')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Website Demo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Core Principles
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faqs')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 (2 cols): Quick Contact */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href={siteConfig.contact.emailMailto}
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Email Us</span>
              </a>
              <a
                href={siteConfig.contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-sky-400 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved. Professional AI voice agent engineering.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
