import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Instagram, MessageSquare, ExternalLink, Check, Copy } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface ContactProps {
  onOpenWhatsApp: () => void;
}

export default function Contact({ onOpenWhatsApp }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    message: '',
  });

  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleCopy = (text: string, channel: string) => {
    navigator.clipboard.writeText(text);
    setCopiedChannel(channel);
    setTimeout(() => setCopiedChannel(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSubmittedStatus('Please fill in your name, email, and message.');
      return;
    }

    // Compose formatted inquiry for mailto
    const subject = encodeURIComponent(`Website Inquiry from ${formData.name}${formData.business ? ` (${formData.business})` : ''}`);
    const body = encodeURIComponent(
      `Hi Ali Web Studio,\n\nMy Name: ${formData.name}\nEmail: ${formData.email}\nBusiness / Project: ${formData.business || 'N/A'}\n\nProject Details:\n${formData.message}\n\nSent from Ali Web Studio Portfolio.`
    );

    const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setSubmittedStatus('Opening your default email client with your message prepared...');
    setTimeout(() => setSubmittedStatus(null), 5000);
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      setSubmittedStatus('Please enter at least your name and message before opening WhatsApp.');
      return;
    }
    const text = encodeURIComponent(
      `Hi Ali Web Studio,\n\nName: ${formData.name}\nEmail: ${formData.email || 'N/A'}\nBusiness: ${formData.business || 'N/A'}\n\nProject Goals:\n${formData.message}`
    );
    window.open(`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07090e] border-t border-white/[0.08]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
            <span>07</span>
            <span className="text-slate-600">/</span>
            <span>CONTACT & INQUIRIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
            Let's Build Something Great.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Tell me about your business, vision, or upcoming project. Reach out via email, WhatsApp, social channels, or submit the inquiry form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h3 className="text-base font-semibold text-white font-display mb-4">
              Direct Contact Channels
            </h3>

            {/* WhatsApp card */}
            <div className="p-4 rounded-2xl bg-[#0b0e19] border border-white/10 hover:border-emerald-500/30 transition-all flex items-center justify-between group">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-xs text-slate-400">WhatsApp Direct</div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {siteConfig.contact.whatsappDisplay}
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleCopy(siteConfig.contact.whatsappDisplay, 'whatsapp')}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  title="Copy WhatsApp number"
                >
                  {copiedChannel === 'whatsapp' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  title="Chat on WhatsApp"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Email card */}
            <div className="p-4 rounded-2xl bg-[#0b0e19] border border-white/10 hover:border-indigo-500/30 transition-all flex items-center justify-between group">
              <a
                href={siteConfig.contact.emailMailto}
                className="flex items-center gap-3.5 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-xs text-slate-400">Direct Email</div>
                  <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {siteConfig.contact.email}
                  </div>
                </div>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(siteConfig.contact.email, 'email')}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Copy email address"
              >
                {copiedChannel === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Telegram card */}
            <div className="p-4 rounded-2xl bg-[#0b0e19] border border-white/10 hover:border-sky-500/30 transition-all flex items-center justify-between group">
              <a
                href={siteConfig.contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-xs text-slate-400">Telegram Direct</div>
                  <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors truncate">
                    {siteConfig.contact.telegramHandle}
                  </div>
                </div>
              </a>
              <a
                href={siteConfig.contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Open Telegram"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Instagram card */}
            <div className="p-4 rounded-2xl bg-[#0b0e19] border border-white/10 hover:border-pink-500/30 transition-all flex items-center justify-between group">
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-xs text-slate-400">Instagram</div>
                  <div className="text-sm font-semibold text-white group-hover:text-pink-300 transition-colors truncate">
                    {siteConfig.contact.instagramHandle}
                  </div>
                </div>
              </a>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Open Instagram"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 leading-relaxed">
              <span className="text-slate-300 font-medium">Remote studio collaboration:</span> I work with clients across time zones with direct updates via Telegram, Email, and scheduled Google Meet calls.
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 bg-[#0b0f1c] border border-white/10 shadow-2xl text-left">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-display">
                  Project Inquiry Form
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in your details below. Clicking submit prepares and launches your message directly to our studio inbox.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
                    Business / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Studio, Local Cafe, Dental Practice"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
                    Message / Project Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe what kind of website you need, target launch date, and any reference sites you like..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-colors resize-none"
                  />
                </div>

                {submittedStatus && (
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
                    {submittedStatus}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/30 transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md shadow-emerald-600/30 transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 text-center sm:text-right">
                    Direct reply within 24h
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
