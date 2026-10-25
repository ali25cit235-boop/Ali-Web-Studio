import { ArrowUp, Heart, MessageCircle } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-[#04060B] text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Identity */}
          <div className="space-y-1 text-center md:text-left">
            <p className="font-outfit font-semibold text-white text-sm">
              {portfolioConfig.name}
            </p>
            <p className="text-slate-500 text-xs">
              CIT Student & Technology Enthusiast · Pakistan
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-slate-400 text-xs font-medium">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#focus-areas" className="hover:text-white transition-colors">
              Focus Areas
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#journey" className="hover:text-white transition-colors">
              Journey
            </a>
            <a
              href={portfolioConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={`https://wa.me/${portfolioConfig.contact.whatsappCleanNumber}?text=${encodeURIComponent(portfolioConfig.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quiet Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Ali Abbas. Learning by building.</p>
          <p className="flex items-center gap-1">
            Built with React 19, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
