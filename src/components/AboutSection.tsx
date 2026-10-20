import { Cpu, Terminal, Wrench, Heart, Compass, Lightbulb } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export default function AboutSection() {
  const pillars = [
    {
      icon: Compass,
      title: 'Curiosity-Driven Learning',
      description:
        'I prefer building a small prototype to test an idea rather than waiting until I feel "ready." Doing is the fastest teacher.',
    },
    {
      icon: Wrench,
      title: 'Root-Cause Troubleshooting',
      description:
        'Whether it is a corrupted memory address in hardware or a state flow glitch in Jetpack Compose, I take time to understand why it broke.',
    },
    {
      icon: Lightbulb,
      title: 'Modern Tool Adoption',
      description:
        'I embrace modern AI developer tools and documentation as active learning partners, accelerating how fast I grasp complex architectures.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-blue-400">
            <span>ABOUT ME</span>
            <span aria-hidden="true">·</span>
            <span>MY BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-white tracking-tight">
            Learning by Building. Growing Through Technology.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A look into how I discovered computer systems, why I love Android development, and how I approach continuous learning.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Prose Card */}
          <div className="lg:col-span-7 space-y-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white font-outfit">
              From Hardware Screwdrivers to Kotlin & Code
            </h3>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>{portfolioConfig.aboutStory.p1}</p>
              <p>{portfolioConfig.aboutStory.p2}</p>
              <p>{portfolioConfig.aboutStory.p3}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/70 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>CIT Student</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Kotlin · Python · Web</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Tech Enthusiast</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Learning Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/80 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/30">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold text-white font-outfit">{pillar.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-11">{pillar.description}</p>
                </div>
              );
            })}

            {/* Quote Box */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-950/20 to-indigo-950/20 border border-blue-900/30 text-xs text-slate-300 leading-relaxed italic">
              "You don't learn how an engine works just by reading the manual—you learn by opening the hood, seeing what's connected, and understanding why each part matters."
              <span className="block mt-2 not-italic font-mono text-[11px] text-blue-400 font-medium">
                — Ali Abbas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
