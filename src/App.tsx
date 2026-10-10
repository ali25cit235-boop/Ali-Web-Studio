import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemsSection from './components/ProblemsSection';
import VoiceServices from './components/VoiceServices';
import HowItWorks from './components/HowItWorks';
import SolutionFinder from './components/SolutionFinder';
import WebsiteDevSection from './components/WebsiteDevSection';
import DemoGallery from './components/DemoGallery';
import FutureVoiceDemo from './components/FutureVoiceDemo';
import WhyAliAI from './components/WhyAliAI';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppModal from './components/WhatsAppModal';
import ProjectModal from './components/ProjectModal';
import { WebsiteDemoItem, siteConfig } from './data/siteConfig';

export default function App() {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<WebsiteDemoItem | null>(null);

  // States to pre-fill the contact form based on user actions in other sections
  const [preselectedService, setPreselectedService] = useState<string>('AI Voice Agent');
  const [preselectedBusinessType, setPreselectedBusinessType] = useState<string>('');

  const scrollToContact = (service?: string, bizType?: string) => {
    if (service) setPreselectedService(service);
    if (bizType) setPreselectedBusinessType(bizType);

    const el = document.getElementById('contact');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToDemos = () => {
    const el = document.getElementById('demos');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToSolutionFinder = () => {
    const el = document.getElementById('solution-finder');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handlePreviewDemoById = (demoId: string) => {
    const found = siteConfig.websiteDemos.find((d) => d.id === demoId);
    if (found) {
      setSelectedDemo(found);
    } else {
      scrollToDemos();
    }
  };

  return (
    <div className="min-h-screen bg-[#080B14] text-slate-200 selection:bg-blue-500/30 selection:text-white font-sans relative antialiased">
      {/* Subtle desktop interactive cursor */}
      <CustomCursor />

      {/* Section A: Primary Sticky Navigation */}
      <Navbar
        onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
        onContactClick={(service) => scrollToContact(service)}
      />

      {/* Main Content Landmark */}
      <main id="main-content">
        {/* Section B: Hero Section */}
        <Hero onContactClick={() => scrollToContact()} />

        {/* Section C: Problem & Value Proposition */}
        <ProblemsSection onSolutionFinderClick={scrollToSolutionFinder} />

        {/* Section D: AI Voice Agent Services (Primary) */}
        <VoiceServices onSelectService={(service) => scrollToContact(service)} />

        {/* Section E: How It Works */}
        <HowItWorks />

        {/* Section F: Business-Specific Solution Finder */}
        <SolutionFinder
          onDiscussSolution={(bizType, goal) => scrollToContact(goal, bizType)}
          onPreviewDemo={handlePreviewDemoById}
        />

        {/* Section G: Website Development */}
        <WebsiteDevSection onExploreDemos={scrollToDemos} />

        {/* Section H: Website Demo Gallery */}
        <DemoGallery
          onSelectDemo={(demo) => setSelectedDemo(demo)}
          onRequestSimilar={(title) => scrollToContact(`Website: Similar to ${title}`)}
        />

        {/* Section I: Future Voice Agent Demo Area */}
        <FutureVoiceDemo />

        {/* Section J: Why Ali AI Solutions */}
        <WhyAliAI />

        {/* Section K: Frequently Asked Questions */}
        <FAQSection />

        {/* Section L: Contact & Project Enquiry Form */}
        <ContactSection
          preselectedService={preselectedService}
          preselectedBusinessType={preselectedBusinessType}
          onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
        />
      </main>

      {/* Clean Quiet Footer */}
      <Footer />

      {/* WhatsApp Modal Dialog */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      {/* Project / Demo Preview Modal */}
      <ProjectModal
        demo={selectedDemo}
        onClose={() => setSelectedDemo(null)}
        onContactClick={(title) => {
          setSelectedDemo(null);
          scrollToContact(title ? `Website Demo: ${title}` : 'Website Development');
        }}
      />
    </div>
  );
}
