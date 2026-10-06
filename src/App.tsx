/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import About from './components/About';
import Stats from './components/Stats';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import ResultsPillars from './components/ResultsPillars';
import Process from './components/Process';
import WhyChoose from './components/WhyChoose';
import SocialProof from './components/SocialProof';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppModal from './components/WhatsAppModal';
import ProjectModal from './components/ProjectModal';
import { ProjectItem } from './data/siteConfig';

export default function App() {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 selection:bg-indigo-500/30 selection:text-white font-sans relative">
      {/* Subtle desktop interactive cursor */}
      <CustomCursor />

      {/* Primary Sticky Navigation */}
      <Navbar onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />

      {/* Main Content Landmark */}
      <main id="main-content">
        {/* Fullscreen Hero Section */}
        <Hero />

        {/* Trust & Capability Strip */}
        <TrustStrip />

        {/* Editorial About Studio Section */}
        <About />

        {/* Honest Portfolio-Based Stats */}
        <Stats />

        {/* Core Services Section */}
        <Services />

        {/* Selected Work Portfolio Showcase */}
        <Portfolio onSelectProject={(project) => setSelectedProject(project)} />

        {/* Results Pillars Showcase */}
        <ResultsPillars />

        {/* How I Work Methodology */}
        <Process />

        {/* Why Work With Me Section */}
        <WhyChoose />

        {/* Honest Social Proof / Portfolio Builder */}
        <SocialProof onStartProject={scrollToContact} />

        {/* High-Intent Conversion CTA */}
        <CTA onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />

        {/* Full Contact Channels & Inquiry Form */}
        <Contact onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />
      </main>

      {/* Studio Footer */}
      <Footer onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />

      {/* Modals */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={scrollToContact}
      />
    </div>
  );
}
