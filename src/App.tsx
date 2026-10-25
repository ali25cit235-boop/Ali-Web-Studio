import CustomCursor from './components/CustomCursor';
import MotionBackground from './components/MotionBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FocusAreas from './components/FocusAreas';
import ProjectsSection from './components/ProjectsSection';
import ResumeSection from './components/ResumeSection';
import JourneySection from './components/JourneySection';
import TechSetupSection from './components/TechSetupSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const scrollToContact = () => {
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

  const scrollToJourney = () => {
    const el = document.getElementById('journey');
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

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-200 selection:bg-blue-600/30 selection:text-white font-sans relative antialiased overflow-x-hidden">
      {/* Dynamic ambient motion background */}
      <MotionBackground />

      {/* Subtle desktop cursor enhancement */}
      <CustomCursor />

      {/* Primary Sticky Top Bar Navigation */}
      <Navbar onConnectClick={scrollToContact} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onExploreClick={scrollToJourney}
          onConnectClick={scrollToContact}
        />

        {/* About Section & Personal Background */}
        <AboutSection />

        {/* Focus Areas & Technical Tracks */}
        <FocusAreas />

        {/* Projects & Experiments Showcase */}
        <ProjectsSection />

        {/* Official Credentials, Education & Shop Experience (Resume) */}
        <ResumeSection />

        {/* Learning Journey Timeline */}
        <JourneySection />

        {/* Hardware & Development Setup */}
        <TechSetupSection />

        {/* Contact & Connect Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
