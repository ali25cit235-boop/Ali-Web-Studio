import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

export default function Stats() {
  return (
    <section className="py-16 relative border-y border-white/[0.08] bg-[#080b13]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
          {siteConfig.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`pt-6 lg:pt-0 ${index !== 0 ? 'lg:pl-8' : ''} text-left`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight tabular-nums">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
                  {stat.value}
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-200">
                {stat.label}
              </div>
              <p className="mt-1 text-xs text-slate-400 leading-normal">
                {stat.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
