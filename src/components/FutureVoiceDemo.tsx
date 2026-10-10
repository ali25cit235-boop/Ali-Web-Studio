import { useState } from 'react';
import { motion } from 'framer-motion';
import { MicOff, Play, Pause, RotateCcw, Lock, CheckCircle2, Shield, Bot, User } from 'lucide-react';

export default function FutureVoiceDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const sampleDialog = [
    {
      speaker: "caller",
      text: "Hi, do you have any appointments available this Thursday afternoon for teeth cleaning?",
      timestamp: "00:02",
    },
    {
      speaker: "agent",
      text: "Hello! Thanks for calling Lumiere Dental. Yes, we currently have openings this Thursday at 2:30 PM and 4:15 PM with Dr. Harris. Would either of those times work for you?",
      timestamp: "00:07",
    },
    {
      speaker: "caller",
      text: "4:15 PM would be perfect. My name is David Miller.",
      timestamp: "00:12",
    },
    {
      speaker: "agent",
      text: "Wonderful, David. I have penciled in 4:15 PM on Thursday. Can I confirm your mobile number so our front desk can text you the intake link?",
      timestamp: "00:18",
    },
    {
      speaker: "caller",
      text: "Sure, it is 555-019-2834.",
      timestamp: "00:22",
    },
    {
      speaker: "agent",
      text: "Thank you, David! You're all set. Our team looks forward to seeing you this Thursday at 4:15 PM. Have a great day!",
      timestamp: "00:27",
    },
  ];

  const handleNext = () => {
    if (activeStep < sampleDialog.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(0);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsPlaying(false);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0B101D] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-500/08 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4F8CFF]">
            <span>TECHNOLOGY PREVIEW &bull; CONVERSATIONAL SIMULATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            Experience the Future of <span className="text-gradient-electric">Business Conversations.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            In upcoming releases, visitors will be able to test live voice agents directly in-browser. Explore how our conversation state machines handle realistic customer dialog today.
          </p>
        </div>

        {/* Central Audio & Dialog Simulation Player */}
        <div className="max-w-4xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent shadow-2xl">
          <div className="rounded-[18px] bg-[#111827] border border-white/[0.08] p-6 sm:p-8 space-y-8">
            
            {/* Top Bar of the Player */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/[0.06] gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#4F8CFF] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Simulated Dental Clinic Receptionist</h4>
                  <p className="text-xs text-slate-400 font-mono">Sample Scenario: Booking Inquiry &amp; Contact Capture</p>
                </div>
              </div>

              {/* Visibly disabled "Voice Demo Coming Soon" button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-white/5 border border-white/10 opacity-70 cursor-not-allowed flex items-center gap-2"
                  title="Direct in-browser microphone connection will be activated in our upcoming live telephony release."
                >
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Voice Demo Coming Soon</span>
                </button>
              </div>
            </div>

            {/* Simulated Audio Waveform Bar */}
            <div className="bg-[#090C16] p-4 rounded-xl border border-white/5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Simulated Audio Stream</span>
              </div>

              {/* Dynamic waveform visualizer */}
              <div className="flex items-center gap-1.5 h-7">
                {[30, 65, 45, 85, 95, 60, 40, 75, 55, 90, 70, 35, 80, 50, 65, 40, 70, 85].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`],
                    }}
                    transition={{
                      duration: 1.2 + (i % 4) * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-[#4F8CFF]' : 'bg-[#8B5CF6]'}`}
                  />
                ))}
              </div>

              <div className="text-xs font-mono text-slate-400">
                {sampleDialog[activeStep].timestamp} / 00:30
              </div>
            </div>

            {/* Interactive Step-by-Step Dialog Feed */}
            <div className="space-y-3 min-h-[220px]">
              {sampleDialog.slice(0, activeStep + 1).map((msg, i) => {
                const isAgent = msg.speaker === 'agent';

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-3 p-3.5 rounded-xl text-xs sm:text-sm ${
                      isAgent
                        ? 'bg-blue-500/[0.08] border border-blue-500/20 text-slate-100 ml-4 sm:ml-8'
                        : 'bg-white/[0.04] border border-white/5 text-slate-300 mr-4 sm:mr-8'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center ${
                      isAgent ? 'bg-blue-500/20 text-[#4F8CFF]' : 'bg-white/10 text-slate-300'
                    }`}>
                      {isAgent ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className={isAgent ? 'text-[#4F8CFF] font-semibold' : 'text-slate-400 font-semibold'}>
                          {isAgent ? 'Ali AI Voice Agent' : 'Customer Caller'}
                        </span>
                        <span className="text-slate-500">{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Simulation Controls & Reset */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#4F8CFF] hover:bg-[#3B7CFF] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Step Next Message ({activeStep + 1}/{sampleDialog.length})</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  title="Reset dialog simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Simulated conversation workflow &bull; Zero microphone access required</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
