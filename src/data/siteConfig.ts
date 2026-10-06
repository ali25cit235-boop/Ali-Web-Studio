/**
 * Central configuration file for Ali Web Studio.
 * Update all brand information, contact details, social links,
 * services, projects, and statistics from this single file.
 */

import apexAutoImg from '../assets/images/apex_car_detailing_1791213804660.jpg';
import lumiereDentalImg from '../assets/images/project_lumiere_dental_1791208413825.jpg';
import flavorsRestaurantImg from '../assets/images/flavors_dining_1791213825726.jpg';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  hasLiveDemo: boolean;
  image: string;
  tags: string[];
  deliverables: string[];
  featured: boolean;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
}

export interface StatItem {
  value: string;
  label: string;
  caption: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface ValuePillar {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const siteConfig = {
  brand: {
    name: "Ali Web Studio",
    shortName: "Ali Web Studio",
    type: "Independent web design & development studio",
    tagline: "Modern Websites. Built to Make Your Business Stand Out.",
    supportingLine: "Premium, responsive websites designed for businesses that want to look professional online.",
    heroDescription: "Ali Web Studio creates modern, responsive and conversion-focused websites for businesses that want a stronger online presence.",
    locationNote: "Available Worldwide · Remote Collaboration",
  },

  contact: {
    email: "aliwebstudio.co@gmail.com",
    emailMailto: "mailto:aliwebstudio.co@gmail.com",
    instagramHandle: "@aliwebstudio.co",
    instagramUrl: "https://www.instagram.com/aliwebstudio.co/",
    telegramHandle: "@aliwebstudio_co",
    telegramUrl: "https://t.me/aliwebstudio_co",
    /**
     * WHATSAPP CONFIGURATION:
     * International number: +92310-6449454 (Pakistan: +92 310 6449454)
     */
    whatsappNumber: "923106449454",
    whatsappDisplay: "+92 310 6449454",
    whatsappUrl: "https://wa.me/923106449454?text=Hi%20Ali%20Web%20Studio%2C%20I'd%20like%20to%20discuss%20a%20website%20project.",
    whatsappPlaceholderNotice: "+92 310 6449454",
  },

  trustStrip: [
    { title: "Modern Design", desc: "Contemporary aesthetic tailored to your brand" },
    { title: "Responsive", desc: "Pixel-perfect across phones, tablets & monitors" },
    { title: "Fast", desc: "Speed-optimized with zero bloated code" },
    { title: "Built for Business", desc: "Structured to drive clear inquiries & trust" },
  ],

  stats: [
    {
      value: "3",
      label: "Featured Concepts",
      caption: "Meticulously crafted website demos ready to explore",
    },
    {
      value: "100%",
      label: "Responsive & Mobile-First",
      caption: "Flawless rendering on every screen size",
    },
    {
      value: "24/7",
      label: "Online Presence",
      caption: "Always-on digital store for your business",
    },
    {
      value: "<1s",
      label: "Performance Optimized",
      caption: "Engineered for rapid loading & smooth motion",
    },
  ] as StatItem[],

  services: [
    {
      number: "01",
      title: "Business Websites",
      description: "Modern websites for local businesses and service providers that need to look credible and generate high-intent inquiries.",
      features: ["Custom tailored design", "Clear conversion funnels", "Contact & lead forms", "Google-ready structure"],
      iconName: "Briefcase",
    },
    {
      number: "02",
      title: "Restaurant Websites",
      description: "Elegant digital menus, high-impact culinary galleries, location details, and intuitive mobile-friendly dining experiences.",
      features: ["Visual menu showcase", "Reservation CTA integration", "Mobile-first ordering layout", "Hours & Google Map locator"],
      iconName: "Utensils",
    },
    {
      number: "03",
      title: "Landing Pages",
      description: "Focused single-page destinations engineered around a singular goal, product launch, or advertising campaign.",
      features: ["Hero value proposition", "Frictionless action steps", "Speed-tuned delivery", "Engaging scroll pacing"],
      iconName: "Zap",
    },
    {
      number: "04",
      title: "Portfolio Websites",
      description: "Professional personal and creative portfolios that showcase your craft, credentials, and achievements with refinement.",
      features: ["Editorial project showcases", "Interactive media previews", "Biography & credentials", "Direct client contact flow"],
      iconName: "LayoutGrid",
    },
    {
      number: "05",
      title: "Website Redesign",
      description: "Modernizing outdated websites with polished UI, clean mobile responsiveness, crisp typography, and streamlined hierarchy.",
      features: ["Full aesthetic overhaul", "Mobile overhaul", "Speed & performance uplift", "Content reorganization"],
      iconName: "Sparkles",
    },
    {
      number: "06",
      title: "Responsive Development",
      description: "Websites that work fluidly across smartphones, tablets, laptops, and ultra-wide screens with zero layout glitches.",
      features: ["Cross-browser testing", "Fluid responsive layout", "Touch-friendly controls", "Subtle micro-animations"],
      iconName: "Smartphone",
    },
  ] as ServiceItem[],

  projects: [
    {
      id: "apex-auto-detailing",
      title: "Apex Auto Detailing",
      category: "Automotive Services",
      tagline: "High-End Ceramic & Paint Protection",
      description: "Premium automotive detailing website concept with interactive sections, responsive design, service pricing tiers, and smooth animations.",
      url: "https://apex-auto-detailing-demo.pages.dev/",
      hasLiveDemo: true,
      image: apexAutoImg,
      tags: ["Dark Agency Theme", "Interactive Tiers", "Mobile Responsive"],
      deliverables: ["Visual Identity", "Interactive Packages", "Booking Flow Mockup", "Responsive Code"],
      featured: true,
    },
    {
      id: "lumiere-dental",
      title: "Lumiere Dental Demo",
      category: "Healthcare & Clinic",
      tagline: "Modern Gentle Dental Studio",
      description: "Modern dental website concept focused on clean visual design, patient trust, service transparency, and frictionless appointment contact.",
      url: "https://ali25cit235-boop.github.io/Lumiere-Dental-Demo/",
      hasLiveDemo: true,
      image: lumiereDentalImg,
      tags: ["Clean Medical Aesthetic", "Patient Trust", "Fast Contact Flow"],
      deliverables: ["Warm Scandinavian UI", "Treatment Catalog", "Doctor Showcase", "Responsive Layout"],
      featured: true,
    },
    {
      id: "flavors-restaurant",
      title: "FLAVORS Restaurant",
      category: "Culinary & Dining",
      tagline: "Artisanal Fine Dining Experience",
      description: "Premium restaurant website concept with food-focused visuals, interactive seasonal menu presentation, and modern bistro experience.",
      url: "https://flavourz-restaurant-demo.netlify.app/",
      hasLiveDemo: true,
      image: flavorsRestaurantImg,
      tags: ["Editorial Mood", "Interactive Menu", "Visual Storytelling"],
      deliverables: ["Atmospheric Dark UI", "Digital Menu Layout", "Table Reservation Hook", "Mobile First"],
      featured: true,
    },
  ] as ProjectItem[],

  process: [
    {
      step: "01",
      title: "Discover",
      subtitle: "Understanding your vision",
      description: "We discuss your business model, target audience, competitive landscape, and the core purpose of your new website.",
      deliverables: ["Scope Definition", "Target Audience Alignment", "Content Outline"],
    },
    {
      step: "02",
      title: "Design",
      subtitle: "Crafting the visual language",
      description: "Creating the bespoke design layout, typography pairings, color palette, and interactive components tailored to your industry.",
      deliverables: ["Custom Visual Direction", "Wireframe Architecture", "Interactive Prototype"],
    },
    {
      step: "03",
      title: "Build",
      subtitle: "Precision engineering",
      description: "Developing the responsive website with clean modern code, fast load times, and fluid micro-interactions across every device.",
      deliverables: ["Clean React Code", "Mobile-First Responsiveness", "Cross-Device Testing"],
    },
    {
      step: "04",
      title: "Launch",
      subtitle: "Deployment & handover",
      description: "Testing every link and contact trigger, deploying to fast cloud hosting, and delivering the finalized website ready for business.",
      deliverables: ["Production Cloud Deployment", "Quality Assurance Pass", "Client Handover"],
    },
  ] as ProcessStep[],

  whyChooseUs: [
    {
      title: "Modern Design",
      subtitle: "Designed to feel current and high-end",
      description: "Every website is crafted with fresh aesthetics, purposeful typography, and thoughtful hierarchy rather than generic pre-made templates.",
      iconName: "Palette",
    },
    {
      title: "Mobile First",
      subtitle: "Built for where your customers are",
      description: "Over 60% of modern visitors browse on smartphones. Your site will feel just as natural and responsive on a phone as on a desktop.",
      iconName: "Smartphone",
    },
    {
      title: "Clear Communication",
      subtitle: "Direct, transparent collaboration",
      description: "Work directly with the designer and builder. Simple, fast communication without agency bureaucracy or endless handoffs.",
      iconName: "MessageSquare",
    },
    {
      title: "Business Focused",
      subtitle: "Designed to generate inquiries",
      description: "Good design is more than decoration. We structure each page to guide visitors toward contacting you or exploring your offers.",
      iconName: "TrendingUp",
    },
    {
      title: "Fast & Lightweight",
      subtitle: "No unnecessary complexity",
      description: "Clean code and optimized assets guarantee swift loading times, giving your visitors an immediate, professional experience.",
      iconName: "Cpu",
    },
  ] as ValuePillar[],

  navigation: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
};
