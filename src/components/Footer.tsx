import { ArrowUp, Instagram, Send, Mail, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import BrandLogo from './BrandLogo';

interface FooterProps {
  onOpenWhatsApp: () => void;
}

export default function Footer({ onOpenWhatsApp }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#05070c] border-t border-white/[0.08] pt-16 pb-12 text-slate-400 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" />

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Modern websites for modern businesses. Creating high-performance digital presences tailored for ambitious brands.
            </p>

            <div className="pt-2 text-xs text-slate-400 font-mono">
              {siteConfig.brand.type}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Connect
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <a
                  href={siteConfig.contact.emailMailto}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>
              <div>
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>{siteConfig.contact.instagramHandle}</span>
                </a>
              </div>
              <div>
                <a
                  href={siteConfig.contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{siteConfig.contact.telegramHandle}</span>
                </a>
              </div>
              <div>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 text-left"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{siteConfig.contact.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {siteConfig.brand.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Independent web design & development studio.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
