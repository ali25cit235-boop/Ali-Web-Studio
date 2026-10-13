import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Wrench, 
  Scissors, 
  Flame, 
  Home, 
  Building, 
  Stethoscope, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function BusinessUseCases() {
  const industries = [
    {
      id: 'cleaning',
      title: 'Cleaning Companies',
      icon: Sparkles,
      color: 'from-sky-500/20 to-blue-500/05',
      borderColor: 'hover:border-sky-500/40',
      useCase: 'Address checks, recurring cleaning estimates & service FAQs',
      description:
        'Answers caller questions about residential vs commercial rates, checks service area zip codes, and collects square-footage details for quote follow-up.',
      typicalInquiries: ['Service area availability', 'Hourly vs flat-rate quotes', 'Supplies provided vs needed'],
    },
    {
      id: 'auto',
      title: 'Auto Repair & Auto Detailing',
      icon: Wrench,
      color: 'from-amber-500/20 to-orange-500/05',
      borderColor: 'hover:border-amber-500/40',
      useCase: 'Vehicle drop-off info, package pricing & estimate requests',
      description:
        'Explains standard service packages (ceramic coating, brake inspections, full detail), captures vehicle make/model/year, and logs caller callback details.',
      typicalInquiries: ['Package pricing & duration', 'Vehicle drop-off & pickup times', 'Specific symptom description'],
    },
    {
      id: 'salons',
      title: 'Salons & Spas',
      icon: Scissors,
      color: 'from-rose-500/20 to-pink-500/05',
      borderColor: 'hover:border-rose-500/40',
      useCase: 'Treatment inquiries, stylist availability & appointment requests',
      description:
        'Politely fields questions on haircut, coloring, or spa pricing, checks requested dates with staff availability, and logs customer booking requests.',
      typicalInquiries: ['Service price ranges', 'Preferred stylist availability', 'Cancellation & deposit policy'],
    },
    {
      id: 'hvac',
      title: 'HVAC & Plumbing Services',
      icon: Flame,
      color: 'from-blue-500/20 to-indigo-500/05',
      borderColor: 'hover:border-blue-500/40',
      useCase: 'Emergency call triage, diagnostic rates & dispatch intake',
      description:
        'Triage urgent furnace or pipe leaks with immediate call pickup, records address and symptom details, and alerts on-call technicians based on your rules.',
      typicalInquiries: ['Emergency dispatch availability', 'Diagnostic inspection fee', 'Next available service window'],
    },
    {
      id: 'roofing',
      title: 'Roofing Contractors',
      icon: Home,
      color: 'from-emerald-500/20 to-teal-500/05',
      borderColor: 'hover:border-emerald-500/40',
      useCase: 'Storm damage triage, roof inspection requests & lead capture',
      description:
        'Captures property address, roof age, and storm damage details while qualifying high-intent insurance claim leads for swift sales team follow-up.',
      typicalInquiries: ['Free inspection qualification', 'Insurance claim guidance', 'Commercial vs residential inquiry'],
    },
    {
      id: 'property',
      title: 'Property Management',
      icon: Building,
      color: 'from-purple-500/20 to-indigo-500/05',
      borderColor: 'hover:border-purple-500/40',
      useCase: 'Tenant maintenance intake & prospective tenant screening',
      description:
        'Separates urgent tenant repair requests from leasing inquiries, collecting unit numbers and lease requirements with accurate call summaries.',
      typicalInquiries: ['Maintenance request logging', 'Rental availability & pet policy', 'Viewing tour inquiries'],
    },
    {
      id: 'clinics',
      title: 'Clinics & Appointment-Based Practices',
      icon: Stethoscope,
      color: 'from-teal-500/20 to-cyan-500/05',
      borderColor: 'hover:border-teal-500/40',
      useCase: 'New patient intake, opening hours & approved medical FAQs',
      description:
        'Explains accepted insurance lists, clinic directions, and consultation hours while collecting new patient intake details for staff review.',
      typicalInquiries: ['Accepted insurance providers', 'Consultation scheduling windows', 'Required intake documentation'],
    },
  ];

  return (
    <section id="use-cases" className="py-24 relative overflow-hidden bg-[#0B101D] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-blue-600/06 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4F8CFF]">
            <span>BUSINESS USE CASES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            Tailored for High-Touch{' '}
            <span className="text-gradient-electric">Service Industries.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            See how custom AI Voice Agents answer common questions, capture qualified inquiries with consent, and help businesses stay responsive.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`rounded-2xl p-6 sm:p-7 bg-[#111827] border border-white/[0.08] ${ind.borderColor} hover:bg-[#131D33] transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden`}
              >
                <div>
                  {/* Top Bar with Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4F8CFF] transition-all shadow-md">
                      <Icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                      Industry 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-1 group-hover:text-blue-100 transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs font-mono text-[#4F8CFF] mb-3">
                    {ind.useCase}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {ind.description}
                  </p>
                </div>

                {/* Common questions list */}
                <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Common Call Workflows:
                  </div>
                  {ind.typicalInquiries.map((q, qIdx) => (
                    <div key={qIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      <span className="truncate">{q}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call-to-action bar */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-400 mb-4">
            Don't see your specific field? We build custom workflows for any appointment- or enquiry-driven business.
          </p>
          <a
            href={siteConfig.contact.whatsappDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-blue-400/40 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all"
          >
            <span>Ask About Your Industry on WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
