import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  onOpenWhatsApp: () => void;
}

export default function Navbar({ onOpenWhatsApp }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'services', 'work', 'process', 'why-us', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40 py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark with authentic circular logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="group flex items-center focus:outline-none"
              aria-label="Ali Web Studio Home"
            >
              <BrandLogo size="md" />
            </a>

            {/* Zone 2: 4-6 clean text navigation links */}
            <nav className="hidden md:flex items-center gap-8">
              {siteConfig.navigation.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative text-sm font-medium transition-colors py-1 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: 1-2 primary actions */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg shadow-sm hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 hover:shadow-indigo-500/25 hover:shadow-md active:scale-95 whitespace-nowrap"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-80" />
              </a>
            </div>

            {/* Mobile menu toggle button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600/90 rounded-md"
              >
                Let's Talk
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#0a0d17]/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden shadow-2xl shadow-black/80"
          >
            <div className="flex flex-col space-y-4">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-base font-medium text-slate-200 hover:text-indigo-400 transition-colors py-2 border-b border-white/5"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                >
                  Let's Talk
                </a>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/25 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp ({siteConfig.contact.whatsappDisplay})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
