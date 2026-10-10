import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Mail, Send, ExternalLink, Check, Copy } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useState } from 'react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0D1220] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-blue-950/40 text-left z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white font-display">
                  WhatsApp Direct Inquiry
                </h3>
                <p className="text-xs text-emerald-400 font-mono">
                  {siteConfig.contact.whatsappDisplay}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Connect directly with Ali AI Solutions on WhatsApp to discuss your AI voice agent workflow, business automation, or website project.
            </p>

            <div className="space-y-3">
              {/* Primary WhatsApp Action */}
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-600/15 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-600/25 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      Start WhatsApp Chat
                    </div>
                    <div className="text-xs text-slate-400">
                      {siteConfig.contact.whatsappDisplay}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Telegram option */}
              <a
                href={siteConfig.contact.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-sky-500/40 hover:bg-sky-500/[0.06] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-sky-300 transition-colors">
                      Chat on Telegram
                    </div>
                    <div className="text-xs text-slate-400">
                      {siteConfig.contact.telegramHandle}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-300 transition-colors" />
              </a>

              {/* Email option */}
              <a
                href={siteConfig.contact.emailMailto}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/[0.06] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                      Send Direct Email
                    </div>
                    <div className="text-xs text-slate-400">
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-300 transition-colors" />
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleCopy(siteConfig.contact.whatsappDisplay, 'whatsapp')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors py-1 px-2 rounded hover:bg-white/5 cursor-pointer"
              >
                {copiedItem === 'whatsapp' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Number copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy WhatsApp number</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
