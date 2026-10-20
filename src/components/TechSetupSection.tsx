import { Monitor, Laptop, Wrench, Terminal, Cpu, HardDrive } from 'lucide-react';
import { techSetup } from '../data/portfolioData';

export default function TechSetupSection() {
  return (
    <section id="tech-setup" className="py-20 md:py-28 relative border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-blue-400">
            <span>MY WORKSPACE</span>
            <span aria-hidden="true">·</span>
            <span>WHAT I USE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-white tracking-tight">
            Everyday Setup & Tech Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The hardware bench, development tools, and software environment I use to write code and test projects every day.
          </p>
        </div>

        {/* 2-Column Grid: Hardware & Software */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hardware Column */}
          <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/40 border border-slate-800/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/40">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-outfit text-white">Physical Hardware & Bench</h3>
                <p className="text-xs text-slate-400">Where assemblies and hardware diagnostics happen</p>
              </div>
            </div>

            <div className="space-y-4">
              {techSetup.hardware.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1"
                >
                  <p className="text-xs font-mono font-medium text-blue-300">{item.title}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.specs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Software Column */}
          <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/40 border border-slate-800/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-outfit text-white">Software, IDEs & OS</h3>
                <p className="text-xs text-slate-400">Tooling for Android, Python, and Web development</p>
              </div>
            </div>

            <div className="space-y-4">
              {techSetup.software.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1"
                >
                  <p className="text-xs font-mono font-medium text-indigo-300">{item.title}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.specs}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
