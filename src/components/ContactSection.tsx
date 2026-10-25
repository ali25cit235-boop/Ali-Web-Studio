import { useState } from 'react';
import { MessageCircle, Mail, MapPin, Copy, Check, Send, Sparkles, ArrowRight } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    topic: 'Tech Chat / General',
    message: '',
  });
  const [emailCopied, setEmailCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.contact.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(portfolioConfig.contact.whatsappMessage);
    const url = `https://wa.me/${portfolioConfig.contact.whatsappCleanNumber}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    // Simulate instant sending
    setSubmitted(true);
  };

  const handleForwardToWhatsApp = () => {
    const msg = `Hi Ali! My name is ${formData.name}. Regarding [${formData.topic}]: ${formData.message}`;
    const url = `https://wa.me/${portfolioConfig.contact.whatsappCleanNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative border-t border-slate-800/80 bg-[#060810]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-blue-400">
            <span>GET IN TOUCH</span>
            <span aria-hidden="true">·</span>
            <span>CONNECT WITH ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-white tracking-tight">
            Let's Talk Technology
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you have a question about my Android or Python projects, want to discuss computer hardware, or share advice for a CIT student, my inbox and WhatsApp are always open.
          </p>
        </div>

        {/* 2-Column Split: Contact Channels + Interactive Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-5">
            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-slate-900/40 to-slate-900/60 border border-emerald-900/30 hover:border-emerald-700/50 transition-all space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-mono font-medium">
                <MessageCircle className="w-4 h-4" />
                <span>FASTEST WAY TO REACH ME</span>
              </div>
              <h3 className="text-lg font-bold font-outfit text-white">Chat on WhatsApp</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Send a direct message on WhatsApp to discuss projects, ideas, or questions.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp ({portfolioConfig.contact.whatsappNumber})</span>
                </button>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2.5 text-blue-400 text-xs font-mono font-medium">
                <Mail className="w-4 h-4" />
                <span>EMAIL COMMUNICATION</span>
              </div>
              <h3 className="text-base font-bold font-outfit text-white">Send an Email</h3>
              <p className="text-xs text-slate-400 font-mono">
                {portfolioConfig.contact.email}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${portfolioConfig.contact.email}`}
                  className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  <span>Open Mail</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2.5 text-purple-400 text-xs font-mono font-medium">
                <Sparkles className="w-4 h-4" />
                <span>OPEN SOURCE CODE</span>
              </div>
              <h3 className="text-base font-bold font-outfit text-white">GitHub Profile & Repos</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Check out the full source code for <span className="text-emerald-400 font-semibold">NetShield DNS Guard</span>, Android apps, and system scripts on GitHub.
              </p>
              <div className="pt-1">
                <a
                  href={portfolioConfig.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <span>Explore github.com/ali25cit235-boop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Location & Timezone info */}
            <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/60 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Pakistan · Timezone: PKT (UTC+5)</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed pl-6">
                Active daily. Happy to connect with builders, mentors, and fellow learners globally.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            {submitted ? (
              <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-white">
                  Message Prepared!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="font-semibold text-white">{formData.name}</span>. You can also forward this directly to WhatsApp to get an instant reply:
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleForwardToWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Message on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', contactInfo: '', topic: 'Tech Chat / General', message: '' });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Usman / Sarah"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Email or WhatsApp
                    </label>
                    <input
                      type="text"
                      value={formData.contactInfo}
                      onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                      placeholder="e.g. email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    What would you like to discuss?
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="Android / Kotlin App">Android / Kotlin Development</option>
                    <option value="Python & Automation">Python Automation & Scripting</option>
                    <option value="Computer Hardware & Troubleshooting">Computer Hardware / PC Diagnostics</option>
                    <option value="Web Project / Collaboration">Web Development & Prototyping</option>
                    <option value="Tech Chat / General">General Tech Discussion / Advice</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      Message <span className="text-blue-400">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-600">
                      {formData.message.length} chars
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me what you're building, have questions on, or would like to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    No spam. Quick response guaranteed.
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
