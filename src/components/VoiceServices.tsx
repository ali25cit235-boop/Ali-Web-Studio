import { 
  Bot, 
  UserCheck, 
  CalendarClock, 
  Headphones, 
  Moon, 
  Cpu, 
  ArrowUpRight, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { siteConfig, VoiceAgentService } from '../data/siteConfig';

interface VoiceServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function VoiceServices({ onSelectService }: VoiceServicesProps) {
  const iconMap: Record<string, React.ElementType> = {
    'ai-receptionist': Bot,
    'lead-capture': UserCheck,
    'appointment-assistant': CalendarClock,
    'customer-support': Headphones,
    'after-hours': Moon,
    'custom-agent': Cpu,
  };

  return (
    <section id="voice-agents" className="py-24 relative overflow-hidden bg-[#080B14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/08 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-blue-600/08 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-[#4F8CFF]">
            <span>PRIMARY SOLUTIONS &bull; AI VOICE AUTOMATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            Intelligent Voice Agents Built for <span className="text-gradient-electric">Every Business Need.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From greeting inbound callers to collecting qualified estimate requests and triage outside office hours, our voice architectures provide responsive, consistent customer service.
          </p>
        </div>

        {/* 6 Grid Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.voiceServices.map((service: VoiceAgentService) => {
            const Icon = iconMap[service.id] || Bot;

            return (
              <div
                key={service.id}
                className="rounded-2xl p-6 sm:p-7 bg-[#111827] border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#131C30] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-blue-500/10 relative overflow-hidden"
              >
                {/* Top card bar with icon & category */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 text-[#4F8CFF] flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-500/20 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/5">
                      {service.idealFor.split(',')[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display group-hover:text-blue-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400 mt-1 mb-3">
                    {service.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Benefit Points */}
                  <div className="space-y-2.5 pt-2 border-t border-white/[0.06] mb-6">
                    {service.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Section */}
                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-400">
                    {service.capabilities.map((cap, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
                        {cap}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-white/[0.06] hover:bg-[#4F8CFF] border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:bg-blue-600/90 active:scale-95"
                  >
                    <span>Discuss This Solution</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Transparency Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-slate-400 max-w-2xl mx-auto text-center sm:text-left">
          <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mx-auto sm:mx-0" />
          <p>
            <strong className="text-slate-300">Provider &amp; Telephony Notice:</strong> Specific features such as direct live transfers, calendar bookings, and CRM writes depend on the telephony platform selected and available software integrations.
          </p>
        </div>
      </div>
    </section>
  );
}
