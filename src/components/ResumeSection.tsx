import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle2,
  Cpu,
  Terminal,
  Languages,
  Keyboard,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'skills' | 'workingStyle'>('education');

  return (
    <section id="resume" className="py-20 md:py-28 relative border-t border-slate-800/80 bg-[#060812]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header & Resume Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-blue-400">
              <Award className="w-4 h-4 text-blue-400" />
              <span>ACADEMIC & TECHNICAL CREDENTIALS</span>
              <span aria-hidden="true">·</span>
              <span>RESUME OVERVIEW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-white tracking-tight">
              Education, Experience & Qualifications
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Top-tier academic standing (87.5% in DAE CIT at GCT Kamalia), real-world troubleshooting at our family computer shop, and project-driven development.
            </p>
          </div>

          {/* Action Buttons for PDF */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={portfolioConfig.resumePdfUrl}
              download="Ali_Abbas_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-md shadow-blue-600/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>

            <a
              href={portfolioConfig.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 transition-all cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>View Official PDF</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* 4 Summary Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>1st-Year Result</span>
            </div>
            <p className="text-xl font-bold font-outfit text-white">87.5%</p>
            <p className="text-[11px] text-slate-400">1065 / 1200 · GCT Kamalia</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Hands-On Work</span>
            </div>
            <p className="text-xl font-bold font-outfit text-white">Shop Support</p>
            <p className="text-[11px] text-slate-400">Family Computer Shop</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-400">
              <Keyboard className="w-3.5 h-3.5" />
              <span>Typing Speed</span>
            </div>
            <p className="text-xl font-bold font-outfit text-white">42 WPM</p>
            <p className="text-[11px] text-slate-400">Certified Speed & Accuracy</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Target Role</span>
            </div>
            <p className="text-xl font-bold font-outfit text-white truncate">IT / Android</p>
            <p className="text-[11px] text-slate-400">Entry-Level Internships</p>
          </div>
        </div>

        {/* Credentials Tabbed Content Container */}
        <div className="rounded-3xl border border-slate-800 bg-[#080B16] shadow-xl overflow-hidden">
          {/* Tab Selector Bar */}
          <div className="flex items-center gap-2 p-3 bg-slate-950/70 border-b border-slate-800/80 overflow-x-auto text-xs font-mono">
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'education'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education & Certification</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'experience'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Shop Experience</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'skills'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Skill Matrix & Languages</span>
            </button>

            <button
              onClick={() => setActiveTab('workingStyle')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'workingStyle'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Working Style & Philosophy</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* Tab 1: Education */}
              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioConfig.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-xs font-mono text-blue-400 font-semibold">{edu.timeline}</span>
                            <h3 className="text-base font-bold font-outfit text-white mt-0.5">{edu.degree}</h3>
                            <p className="text-xs text-slate-300">{edu.institution}</p>
                          </div>
                          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold whitespace-nowrap">
                            {edu.percentage}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-slate-800/60">
                          <p className="text-[11px] font-mono text-slate-400 mb-2">Key Academic Highlights:</p>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {edu.highlights.map((hl, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Certified Courses */}
                  <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/60 space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Formal Certifications & Active Learning
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/70">
                        <span className="text-emerald-400 font-semibold block mb-0.5">Office Management (Completed)</span>
                        <p className="text-slate-400 text-[11px]">GCT Kamalia · MS Word, Excel, PowerPoint, AI Tools</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/70">
                        <span className="text-blue-400 font-semibold block mb-0.5">Python Programming (In Progress)</span>
                        <p className="text-slate-400 text-[11px]">Independent study · Systems scripting & sockets</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/70">
                        <span className="text-indigo-400 font-semibold block mb-0.5">Operating Systems (In Progress)</span>
                        <p className="text-slate-400 text-[11px]">Independent study · Processes, memory, kernel APIs</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Shop Experience */}
              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {portfolioConfig.experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-6 sm:p-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/70 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950/70 border border-blue-800/40 text-blue-300 font-medium">
                              {exp.company}
                            </span>
                            <span className="text-xs text-slate-400">· {exp.location}</span>
                          </div>
                          <h3 className="text-lg font-bold font-outfit text-white mt-1">{exp.role}</h3>
                        </div>
                        <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">{exp.description}</p>

                      <div className="pt-2">
                        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                          Daily Practical Responsibilities:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {exp.bulletPoints.map((bullet, bIdx) => (
                            <div
                              key={bIdx}
                              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tab 3: Skills Matrix & Languages */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-sm font-bold font-outfit text-white mb-3">
                      Technical Skills & Proficiency Levels
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {portfolioConfig.skillLevels.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs"
                        >
                          <span className="font-medium text-slate-200">{skill.name}</span>
                          <span
                            className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
                              skill.level === 'Advanced'
                                ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                                : skill.level === 'Intermediate'
                                ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                                : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Languages Spoken */}
                  <div className="pt-4 border-t border-slate-800/70">
                    <h4 className="text-sm font-bold font-outfit text-white mb-3 flex items-center gap-2">
                      <Languages className="w-4 h-4 text-blue-400" />
                      <span>Languages</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {portfolioConfig.languages.map((lang, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs font-mono"
                        >
                          <span className="text-slate-200 font-semibold">{lang.name}</span>
                          <span className="text-slate-400">{lang.fluency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Working Style */}
              {activeTab === 'workingStyle' && (
                <motion.div
                  key="workingStyle"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {portfolioConfig.workingStyle.map((style, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
                      >
                        <span className="text-xs font-mono text-blue-400 font-semibold uppercase">
                          0{sIdx + 1}. Principle
                        </span>
                        <h4 className="text-base font-bold font-outfit text-white">{style.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{style.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Career Objective Banner */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/30 via-slate-900/50 to-indigo-950/30 border border-blue-900/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase">
                      <Sparkles className="w-4 h-4" />
                      <span>Career Objective</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-outfit">
                      {portfolioConfig.careerObjective}
                    </p>
                    <p className="text-xs font-mono text-emerald-400 pt-1">
                      Motto: "{portfolioConfig.tagline}"
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
