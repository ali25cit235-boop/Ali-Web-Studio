import { useState, useEffect } from 'react';
import { Send, Phone, Mail, MessageCircle, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface ContactSectionProps {
  preselectedService?: string;
  preselectedBusinessType?: string;
  onOpenWhatsApp: () => void;
}

export default function ContactSection({
  preselectedService = '',
  preselectedBusinessType = '',
  onOpenWhatsApp,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [businessType, setBusinessType] = useState(preselectedBusinessType || '');
  const [interestedService, setInterestedService] = useState(preselectedService || 'AI Voice Agent');
  const [description, setDescription] = useState('');
  const [consent, setConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Sync props if user clicked a service card or solution finder recommendation
  useEffect(() => {
    if (preselectedService) {
      setInterestedService(preselectedService);
    }
    if (preselectedBusinessType) {
      setBusinessType(preselectedBusinessType);
    }
  }, [preselectedService, preselectedBusinessType]);

  const serviceOptions = [
    "AI Voice Agent",
    "Business Automation",
    "Website Development",
    "AI Voice Agent + Website",
    "Not Sure Yet",
  ];

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please provide your name';
    if (!businessName.trim()) newErrors.businessName = 'Please provide your business or project name';
    if (!contactMethod.trim()) {
      newErrors.contactMethod = 'Please provide an email or phone number';
    } else if (
      contactMethod.includes('@') &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactMethod)
    ) {
      newErrors.contactMethod = 'Please enter a valid email address';
    }
    if (!description.trim()) {
      newErrors.description = 'Please describe what you would like your solution to do';
    }
    if (!consent) {
      newErrors.consent = 'Consent is required to submit this enquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate clean dispatch with client-side mailto / summary delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        name,
        businessName,
        contactMethod,
        businessType: businessType || 'General Business',
        interestedService,
        description,
      });
    }, 700);
  };

  const handleResetForm = () => {
    setName('');
    setBusinessName('');
    setContactMethod('');
    setBusinessType('');
    setDescription('');
    setSubmittedData(null);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#080B14] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/08 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-600/06 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4F8CFF]">
            <span>GET IN TOUCH &bull; CONSULTATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            Let's Build a <span className="text-gradient-electric">Smarter Business Experience.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Tell us about your customer calls, frequent inquiries, or website vision. We will review your requirements and outline a tailored proposal.
          </p>
        </div>

        {/* 2-Column Split: Interactive Form vs Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (7 cols): Validated Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 bg-[#111827] border border-white/[0.08] shadow-2xl relative overflow-hidden">
              
              {submittedData ? (
                // Success Confirmation State
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white font-display">
                      Enquiry Prepared Successfully!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{submittedData.name}</strong>. Your enquiry for <strong className="text-[#4F8CFF]">{submittedData.businessName}</strong> regarding <strong className="text-white">{submittedData.interestedService}</strong> is ready.
                    </p>
                  </div>

                  {/* Immediate Direct Dispatch Actions */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 max-w-md mx-auto text-left space-y-3 text-xs text-slate-300">
                    <div className="font-semibold text-white">Recommended Next Step:</div>
                    <p>
                      You can instantly send this prepared brief to our team via WhatsApp or Email for a same-day response:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <a
                        href={`https://wa.me/923106449454?text=${encodeURIComponent(
                          `Hi Ali AI Solutions, my name is ${submittedData.name} from ${submittedData.businessName}. We are looking for ${submittedData.interestedService}. Requirement: ${submittedData.description}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-lg text-center font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Send via WhatsApp</span>
                      </a>

                      <a
                        href={`mailto:aliwebstudio.co@gmail.com?subject=${encodeURIComponent(
                          `Ali AI Solutions Enquiry: ${submittedData.businessName} - ${submittedData.interestedService}`
                        )}&body=${encodeURIComponent(
                          `Name: ${submittedData.name}\nBusiness: ${submittedData.businessName}\nContact: ${submittedData.contactMethod}\nIndustry: ${submittedData.businessType}\nService: ${submittedData.interestedService}\n\nProject Requirement:\n${submittedData.description}`
                        )}`}
                        className="flex-1 py-2.5 px-3 rounded-lg text-center font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Direct Email</span>
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Submit another requirement
                  </button>
                </div>
              ) : (
                // Active Form State
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Your Name */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300">
                        Your Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="e.g. David Miller"
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#0B101D] border text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all ${
                          errors.name
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-white/[0.08] focus:border-blue-500 focus:ring-blue-500'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-rose-400">{errors.name}</p>}
                    </div>

                    {/* Business Name */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-business" className="block text-xs font-medium text-slate-300">
                        Business Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        id="contact-business"
                        type="text"
                        value={businessName}
                        onChange={(e) => {
                          setBusinessName(e.target.value);
                          if (errors.businessName) setErrors({ ...errors, businessName: '' });
                        }}
                        placeholder="e.g. Apex Detailing Studio"
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#0B101D] border text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all ${
                          errors.businessName
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-white/[0.08] focus:border-blue-500 focus:ring-blue-500'
                        }`}
                      />
                      {errors.businessName && <p className="text-[11px] text-rose-400">{errors.businessName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred Contact (Email / Phone) */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-method" className="block text-xs font-medium text-slate-300">
                        Email or Mobile Number <span className="text-blue-400">*</span>
                      </label>
                      <input
                        id="contact-method"
                        type="text"
                        value={contactMethod}
                        onChange={(e) => {
                          setContactMethod(e.target.value);
                          if (errors.contactMethod) setErrors({ ...errors, contactMethod: '' });
                        }}
                        placeholder="email@company.com or phone"
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#0B101D] border text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all ${
                          errors.contactMethod
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-white/[0.08] focus:border-blue-500 focus:ring-blue-500'
                        }`}
                      />
                      {errors.contactMethod && <p className="text-[11px] text-rose-400">{errors.contactMethod}</p>}
                    </div>

                    {/* Business Type */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-biztype" className="block text-xs font-medium text-slate-300">
                        Industry / Business Type
                      </label>
                      <input
                        id="contact-biztype"
                        type="text"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        placeholder="e.g. Dental Clinic, Roofing, Restaurant"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B101D] border border-white/[0.08] text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Interested Service Selection */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-medium text-slate-300">
                      Primary Service of Interest
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {serviceOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setInterestedService(opt)}
                          className={`p-2.5 rounded-xl text-[11px] font-medium border text-left transition-all cursor-pointer truncate ${
                            interestedService === opt
                              ? 'bg-blue-600/25 border-blue-500 text-white shadow-sm'
                              : 'bg-[#0B101D] border-white/[0.07] text-slate-300 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Requirement Description */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-desc" className="block text-xs font-medium text-slate-300">
                      Short Description of Requirement <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      id="contact-desc"
                      rows={4}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        if (errors.description) setErrors({ ...errors, description: '' });
                      }}
                      placeholder="e.g. We get 25 calls a day asking for pricing and weekend hours. We need an AI agent to answer FAQs and log caller details."
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#0B101D] border text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all ${
                        errors.description
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-white/[0.08] focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                    {errors.description && <p className="text-[11px] text-rose-400">{errors.description}</p>}
                  </div>

                  {/* Consent statement */}
                  <div className="flex items-start gap-2.5 text-left pt-1">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (errors.consent) setErrors({ ...errors, consent: '' });
                      }}
                      className="mt-0.5 rounded border-white/10 bg-[#0B101D] text-blue-500 focus:ring-blue-500 shrink-0"
                    />
                    <label htmlFor="contact-consent" className="text-[11px] text-slate-400 leading-relaxed cursor-pointer">
                      I agree that Ali AI Solutions may use this submitted information to review my requirements and respond to this project enquiry.
                    </label>
                  </div>
                  {errors.consent && <p className="text-[11px] text-rose-400 text-left">{errors.consent}</p>}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] hover:from-[#3B7CFF] hover:to-[#7C3AED] shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Preparing your brief...</span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

          {/* Right Column (5 cols): Direct Instant Channels */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="rounded-2xl p-6 sm:p-7 bg-[#111827] border border-white/[0.08] space-y-6 shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Direct Contact Channels
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Prefer direct messaging or an immediate voice discovery chat? Connect with our team directly.
                </p>
              </div>

              {/* WhatsApp Card */}
              <div className="p-4 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">WhatsApp Direct</div>
                      <div className="text-[11px] text-emerald-400">{siteConfig.contact.whatsappDisplay}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(siteConfig.contact.whatsappDisplay, 'whatsapp')}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Copy WhatsApp number"
                  >
                    {copiedField === 'whatsapp' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 py-2 px-3 rounded-lg text-center font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Official Email</div>
                      <div className="text-[11px] text-slate-400">{siteConfig.contact.email}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(siteConfig.contact.email, 'email')}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Copy Email address"
                  >
                    {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a
                  href={siteConfig.contact.emailMailto}
                  className="w-full mt-2 py-2 px-3 rounded-lg text-center font-semibold text-xs text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Send Direct Email</span>
                </a>
              </div>

              {/* Telegram Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Telegram Channel</div>
                      <div className="text-[11px] text-slate-400">{siteConfig.contact.telegramHandle}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(siteConfig.contact.telegramHandle, 'telegram')}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Copy Telegram Handle"
                  >
                    {copiedField === 'telegram' ? <Check className="w-3.5 h-3.5 text-sky-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a
                  href={siteConfig.contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 py-2 px-3 rounded-lg text-center font-semibold text-xs text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Telegram</span>
                </a>
              </div>
            </div>

            {/* Response Time Guarantee Notice */}
            <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Prompt Discovery Response:</div>
              <p>
                All inquiries submitted during business hours are reviewed within 4 business hours. We review your requirements and reply with clear next steps.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
