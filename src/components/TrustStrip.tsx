import { Palette, Smartphone, Zap, Briefcase } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function TrustStrip() {
  const icons = [Palette, Smartphone, Zap, Briefcase];

  return (
    <div className="relative border-y border-white/[0.08] bg-[#090d16]/60 backdrop-blur-md py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {siteConfig.trustStrip.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={item.title} className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:text-white group-hover:bg-indigo-600/20 group-hover:border-indigo-500/30 transition-all shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white tracking-tight truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
