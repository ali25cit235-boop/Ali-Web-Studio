import { motion } from 'framer-motion';
import { MessageSquare, UserCheck, CalendarCheck, Headphones, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function ReceptionistCapabilities() {
  const capabilities = [
    {
      id: 'questions',
      icon: MessageSquare,
      title: 'Answer Customer Questions',
      subtitle: 'Knowledge-Grounded Inquiries',
      description:
        'Provides accurate information about your services, operating hours, service areas, and approved FAQs without confusing callers.',
      points: [
        'Explains pricing ranges & package details',
        'Answers location, directions & hours FAQs',
        'Follows your approved business guidelines',
      ],
      tag: 'Accurate Information',
    },
    {
      id: 'leads',
      icon: UserCheck,
      title: 'Capture Enquiries and Leads',
      subtitle: 'Structured Inbound Qualification',
      description:
        'Politely collects caller names, phone numbers, and job details with consent so your team never loses an opportunity to follow up.',
      points: [
        'Collects caller name & callback number',
        'Records service requirements & urgency',
        'Delivers structured inquiry summaries',
      ],
      tag: 'Lead Capture',
    },
    {
      id: 'appointments',
      icon: CalendarCheck,
      title: 'Assist With Appointment Requests',
      subtitle: 'Frictionless Scheduling Support',
      description:
        'Guides customers through booking inquiries by checking preferred days, times, and service types to streamline front-desk triage.',
      points: [
        'Collects customer preferred dates & times',
        'Logs service type & attendee details',
        'Supports calendar sync when configured',
      ],
      tag: 'Booking Support',
    },
    {
      id: 'support',
      icon: Headphones,
      title: 'Provide Consistent Customer Support',
      subtitle: 'Reliable Front-Desk Presence',
      description:
        'Maintains a patient, professional brand tone on every call, handling repetitive questions and gracefully escalating complex requests.',
      points: [
        'Consistent, polite brand voice every time',
        'Gracefully escalates priority callers to staff',
        'Reduces phone stress for in-office teams',
      ],
      tag: 'Consistent Service',
    },
  ];

  return (
    <section id="capabilities" className="py-24 relative overflow-hidden bg-[#080B14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/06 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4F8CFF]">
            <Sparkles className="w-3.5 h-3.5 text-[#4F8CFF]" />
            <span>SERVICE CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            Your AI Receptionist.{' '}
            <span className="text-gradient-electric">Your Business Rules.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Every AI Voice Agent is customized around your unique operational rules, verified service information, and brand tone.
          </p>
        </div>

        {/* 4 Elegant Visual Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="rounded-2xl p-7 sm:p-8 bg-[#0D1220] border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#10172A] transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                {/* Subtle top corner gradient accent */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/05 rounded-full blur-2xl group-hover:bg-blue-500/15 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & Clean Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#4F8CFF] flex items-center justify-center group-hover:bg-[#4F8CFF] group-hover:text-white group-hover:scale-110 transition-all shadow-md shadow-blue-500/10">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full group-hover:border-blue-500/25 transition-colors">
                      Capability 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-1 group-hover:text-blue-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400 mb-4">
                    {item.subtitle}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Key Points */}
                <div className="pt-5 border-t border-white/[0.06] space-y-2.5">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] group-hover:scale-125 transition-transform shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust & Verification Note */}
        <div className="mt-12 p-5 rounded-2xl bg-[#0B101D] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Configured strictly to your approved business rules. Agent capabilities depend on your workflow, model selection, and telephony integration.
            </span>
          </div>

          <a
            href={siteConfig.contact.whatsappDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#4F8CFF] hover:text-white whitespace-nowrap transition-colors"
          >
            <span>Request custom demo on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
