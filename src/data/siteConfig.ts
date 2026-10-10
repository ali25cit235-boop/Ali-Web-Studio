/**
 * Central configuration file for Ali AI Solutions.
 * Professional AI Voice Agents, Business Automation & Modern Websites.
 */

import apexAutoImg from '../assets/images/apex_car_detailing_1791213804660.jpg';
import lumiereDentalImg from '../assets/images/project_lumiere_dental_1791208413825.jpg';
import flavorsRestaurantImg from '../assets/images/flavors_dining_1791213825726.jpg';
import salonImg from '../assets/images/salon_concept_ui_1791616090812.jpg';
import homeServiceImg from '../assets/images/homeservice_ui_1791616126875.jpg';

export interface VoiceAgentService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  capabilities: string[];
  idealFor: string;
}

export interface WebsiteDemoItem {
  id: string;
  title: string;
  category: string;
  businessType: string;
  tagline: string;
  description: string;
  url: string;
  hasLiveDemo: boolean;
  image: string;
  deliverables: string[];
  featured: boolean;
}

export interface BusinessTypeOption {
  id: string;
  label: string;
  category: string;
  typicalNeeds: string;
}

export interface SolutionGoalOption {
  id: string;
  label: string;
  shortDesc: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const siteConfig = {
  brand: {
    name: "Ali AI Solutions",
    shortName: "Ali AI",
    tagline: "AI Voice Agents. Smarter Business. Better Experiences.",
    supportingStatement:
      "Helping businesses handle customer calls, capture leads, answer common questions, and build a stronger online presence with AI-powered solutions.",
    heroHeadline: "Never Miss an Opportunity to Connect.",
    heroSubheadline:
      "AI voice agents that help businesses handle customer calls, answer common questions, capture enquiries, and stay responsive — even when your team is busy.",
    problemHeadline: "Your Business Deserves a Smarter Way to Respond.",
    websiteHeadline: "A Website That Works as Hard as Your Business.",
    whyHeadline: "Technology Should Solve Real Business Problems.",
    contactHeadline: "Let's Build a Smarter Business Experience.",
  },

  contact: {
    email: "aliwebstudio.co@gmail.com",
    emailMailto: "mailto:aliwebstudio.co@gmail.com",
    instagramHandle: "@aliwebstudio.co",
    instagramUrl: "https://www.instagram.com/aliwebstudio.co/",
    telegramHandle: "@aliwebstudio_co",
    telegramUrl: "https://t.me/aliwebstudio_co",
    whatsappNumber: "923106449454",
    whatsappDisplay: "+92 310 6449454",
    whatsappUrl:
      "https://wa.me/923106449454?text=Hi%20Ali%20AI%20Solutions%2C%20I'd%20like%20to%20discuss%20an%20AI%20voice%20agent%20or%20website%20solution.",
  },

  // Section C: Problems vs AI Voice Agent Solutions
  problemComparisons: [
    {
      challenge: "Missed customer calls during rush hours or staff meetings",
      outcome: "24/7 polite greeting with instant call pickup without busy tones",
    },
    {
      challenge: "Staff answering the same opening hours & pricing questions 30x a day",
      outcome: "Consistent, accurate FAQ answers pulled directly from your approved knowledge base",
    },
    {
      challenge: "High ad spend wasted because callers abandon before leaving contact details",
      outcome: "Polite, conversational lead capture collecting caller name and intent with consent",
    },
    {
      challenge: "Enquiries arriving after-hours or over weekends left unanswered until Monday",
      outcome: "Immediate after-hours triage explaining next steps and logging customer details",
    },
    {
      challenge: "Unstructured voicemails requiring minutes of manual playback and transcribing",
      outcome: "Clean, organized summaries delivered directly for your team's follow-up",
    },
  ],

  // Section D: AI Voice Agent Services (The primary offerings)
  voiceServices: [
    {
      id: "ai-receptionist",
      title: "AI Receptionist",
      subtitle: "First-Line Front Desk Call Management",
      description:
        "Welcomes every caller warmly, answers approved frequently asked questions, collects enquiry details, and routes priority requests.",
      benefits: [
        "Welcomes callers with custom branded greeting",
        "Answers approved FAQs (location, hours, services)",
        "Captures caller name, request & call-back number",
        "Transfers urgent callers to staff when configured",
      ],
      capabilities: ["Custom Script Flow", "FAQ Knowledge Base", "Call Routing Hooks"],
      idealFor: "Clinics, salons, restaurants & professional offices",
    },
    {
      id: "lead-capture",
      title: "Lead Capture Voice Agent",
      subtitle: "High-Intent Inbound Inquiry Qualification",
      description:
        "Collects caller names and contact information with consent, asks relevant qualification questions, and prepares structured follow-up summaries.",
      benefits: [
        "Asks targeted qualification questions smoothly",
        "Captures accurate contact details with caller consent",
        "Filters spam and low-intent callers politely",
        "Delivers structured inquiry summaries for swift follow-up",
      ],
      capabilities: ["Caller Verification", "Qualification Rules", "CRM & Webhook Ready"],
      idealFor: "Roofing, auto repair, contractors & real estate",
    },
    {
      id: "appointment-assistant",
      title: "Appointment Enquiry Assistant",
      subtitle: "Frictionless Scheduling & Availability Info",
      description:
        "Handles appointment-related questions, collects preferred dates and time slots, and supports booking workflows when a real calendar integration is configured.",
      benefits: [
        "Explains available service appointment windows",
        "Collects customer preferred dates, times & service types",
        "Integrates with calendars when booking hooks are set up",
        "Sends confirmation details or flags requests for approval",
      ],
      capabilities: ["Time Window Parsing", "Calendar Sync (Optional)", "Reschedule Inquiries"],
      idealFor: "Dental clinics, med spas, barbershops & salons",
    },
    {
      id: "customer-support",
      title: "Customer Support Voice Assistant",
      subtitle: "Knowledge-Based Inquiry Resolution",
      description:
        "Answers customer questions from your approved business knowledge base, explains services and policies, and escalates uncertain requests to human staff.",
      benefits: [
        "Resolves repetitive inquiries in natural conversational tone",
        "Strictly adheres to approved business information",
        "Gracefully escalates complex cases to your staff",
        "Maintains consistent brand tone without fatigue",
      ],
      capabilities: ["Strict Hallucination Guards", "Human Transfer Fallback", "Multi-Topic Handling"],
      idealFor: "Retail stores, service providers & course academies",
    },
    {
      id: "after-hours",
      title: "After-Hours Call Assistant",
      subtitle: "24/7 Night & Weekend Inquiry Protection",
      description:
        "Helps businesses collect customer enquiries outside normal working hours and explains available next steps using approved business guidelines.",
      benefits: [
        "Never lets a night or weekend lead go cold",
        "Explains operating hours and next working-day timelines",
        "Collects customer urgency and contact preferences",
        "Delivers morning summary ready for your first shift",
      ],
      capabilities: ["Time-Conditioned Routing", "Urgency Detection", "Morning Briefing Reports"],
      idealFor: "Emergency repairs, home services, clinics & hospitality",
    },
    {
      id: "custom-agent",
      title: "Custom AI Voice Agent",
      subtitle: "Tailored Architecture for Unique Operations",
      description:
        "A fully tailored conversation workflow built around your company's proprietary operational steps, external software systems, and communication rules.",
      benefits: [
        "Custom dialog flows matching your exact operational workflow",
        "Integrates with your existing phone trunks or VoIP system",
        "Custom tone, accent, and compliance guidelines",
        "Multi-stage validation and edge-case handling",
      ],
      capabilities: ["Proprietary Logic", "Custom API Integrations", "Dedicated Quality Audits"],
      idealFor: "Growing businesses with bespoke workflows",
    },
  ] as VoiceAgentService[],

  // Section E: How It Works
  process: [
    {
      step: "01",
      title: "Understand Your Business",
      subtitle: "Call Audit & Goal Alignment",
      description:
        "We identify your typical call types, most frequent customer questions, peak hours, and desired operational outcomes.",
      details: ["Call volume audit", "FAQ inventory", "Desired escalation rules"],
    },
    {
      step: "02",
      title: "Design the Agent",
      subtitle: "Conversation Flow & Guardrails",
      description:
        "We map out polite, natural conversation flows, approved company information, tone of voice, and human transfer criteria.",
      details: ["Script architecture", "Edge-case safeguards", "Tone & pacing alignment"],
    },
    {
      step: "03",
      title: "Configure and Test",
      subtitle: "Provider Setup & Scenario Testing",
      description:
        "The voice agent is configured on the chosen platform and thoroughly tested across realistic customer call scenarios before going near callers.",
      details: ["Platform configuration", "Multi-voice stress testing", "Webhook & calendar checks"],
    },
    {
      step: "04",
      title: "Launch and Improve",
      subtitle: "Controlled Rollout & Refinement",
      description:
        "After agreed setup and verification, the solution is launched in a controlled manner and continually refined based on real caller feedback.",
      details: ["Controlled activation", "Transcript review", "Ongoing prompt refinement"],
    },
  ] as ProcessStep[],

  // Section F: Business-Specific Solution Finder options & recommendation logic
  businessTypes: [
    { id: "restaurant", label: "Restaurant or Cafe", category: "Culinary & Dining", typicalNeeds: "Hours, menu FAQs, reservations & location questions" },
    { id: "clinic", label: "Dental or Medical Clinic", category: "Healthcare", typicalNeeds: "Appointment inquiries, approved service FAQs & intake details" },
    { id: "salon", label: "Salon or Barbershop", category: "Personal Care", typicalNeeds: "Stylist availability, service pricing & booking questions" },
    { id: "automotive", label: "Auto Repair or Detailing", category: "Automotive Services", typicalNeeds: "Quote requests, service inquiries & vehicle drop-off notes" },
    { id: "cleaning", label: "Cleaning Service", category: "Home & Facility Care", typicalNeeds: "Service area checks, estimate requests & recurring schedules" },
    { id: "roofing", label: "Roofing or Home Services", category: "Contractors & Trade", typicalNeeds: "Urgent storm repair leads, estimate requests & address capture" },
    { id: "real-estate", label: "Real Estate", category: "Property & Leasing", typicalNeeds: "Listing inquiries, open-house times & buyer/seller qualification" },
    { id: "retail", label: "Retail Shop", category: "Commerce", typicalNeeds: "Stock availability, directions, holiday hours & return policy FAQs" },
    { id: "education", label: "Education or Coaching", category: "Learning & Academy", typicalNeeds: "Course syllabus questions, schedule details & lead enrollment" },
    { id: "other", label: "Other Business", category: "Commercial Enterprise", typicalNeeds: "Custom inquiry workflows & specialized customer communications" },
  ] as BusinessTypeOption[],

  solutionGoals: [
    { id: "incoming-calls", label: "Handle incoming calls", shortDesc: "Answer calls consistently without busy signals" },
    { id: "answer-faqs", label: "Answer common customer questions", shortDesc: "Free staff from answering repetitive pricing/hours questions" },
    { id: "capture-leads", label: "Capture leads and enquiries", shortDesc: "Collect caller name and contact details with consent" },
    { id: "manage-appointments", label: "Manage appointment enquiries", shortDesc: "Collect preferred dates and service requests" },
    { id: "get-website", label: "Get a professional business website", shortDesc: "Build a fast, modern digital storefront" },
    { id: "both", label: "Both AI voice agents and a website", shortDesc: "Complete digital presence & automated call handling" },
    { id: "not-sure", label: "I am not sure yet", shortDesc: "Help me explore what fits my current workflow best" },
  ] as SolutionGoalOption[],

  // Section H: Website Demos (Real verified links + polished concept previews)
  websiteDemos: [
    {
      id: "apex-auto-detailing",
      title: "Apex Auto Detailing",
      category: "Automotive",
      businessType: "automotive",
      tagline: "High-End Ceramic & Paint Protection",
      description:
        "Premium automotive detailing website with interactive service pricing tiers, booking inquiry hook, responsive layout, and dark agency aesthetic.",
      url: "https://apex-auto-detailing-demo.pages.dev/",
      hasLiveDemo: true,
      image: apexAutoImg,
      deliverables: ["Visual Identity", "Interactive Tiers", "Booking Flow", "Cloudflare Pages Ready"],
      featured: true,
    },
    {
      id: "lumiere-dental",
      title: "Lumiere Dental Demo",
      category: "Clinics",
      businessType: "clinic",
      tagline: "Modern Gentle Dental Studio",
      description:
        "Modern healthcare website concept focused on patient trust, treatment transparency, doctor credentials, and frictionless appointment contact.",
      url: "https://ali25cit235-boop.github.io/Lumiere-Dental-Demo/",
      hasLiveDemo: true,
      image: lumiereDentalImg,
      deliverables: ["Warm Scandinavian UI", "Treatment Catalog", "Doctor Showcase", "Responsive Layout"],
      featured: true,
    },
    {
      id: "flavors-restaurant",
      title: "FLAVORS Restaurant",
      category: "Restaurants",
      businessType: "restaurant",
      tagline: "Artisanal Fine Dining Experience",
      description:
        "Atmospheric restaurant website featuring culinary visual storytelling, interactive seasonal menu presentation, and table reservation hooks.",
      url: "https://flavourz-restaurant-demo.netlify.app/",
      hasLiveDemo: true,
      image: flavorsRestaurantImg,
      deliverables: ["Atmospheric Dark UI", "Digital Menu Layout", "Table Reservation Hook", "Netlify Deployed"],
      featured: true,
    },
    {
      id: "elara-salon",
      title: "Elara Luxury Salon Concept",
      category: "Salons",
      businessType: "salon",
      tagline: "Boutique Hair Styling & Grooming",
      description:
        "Concept preview for a high-end salon and barbershop website with stylist showcases, treatment menus, and appointment inquiry layout.",
      url: "",
      hasLiveDemo: false,
      image: salonImg,
      deliverables: ["Concept Preview", "Styling Gallery", "Service Schedule", "Custom Color Grading"],
      featured: false,
    },
    {
      id: "elite-roofing",
      title: "Elite Roofing & Home Services Concept",
      category: "Home Services",
      businessType: "roofing",
      tagline: "Residential & Commercial Contractor",
      description:
        "Concept preview designed for contractor lead generation with instant estimate calculator, emergency storm damage banner, and trust badges.",
      url: "",
      hasLiveDemo: false,
      image: homeServiceImg,
      deliverables: ["Concept Preview", "Estimate Calculator", "Emergency Hotline Hook", "Lead Gen Focus"],
      featured: false,
    },
  ] as WebsiteDemoItem[],

  // Section J: Why Ali AI Solutions Principles
  principles: [
    {
      title: "Business-First Planning",
      description:
        "We never build technology for the sake of buzzwords. Every voice flow and website component starts by understanding how your business actually makes money and serves customers.",
    },
    {
      title: "Clear, Honest Communication",
      description:
        "We speak plain English, not technical jargon. You'll always know what an AI agent can do, what depends on third-party integrations, and where humans should stay in the loop.",
    },
    {
      title: "Tailored Conversation Workflows",
      description:
        "No generic robotic scripts. We configure conversation patterns to reflect your business's real hours, real policies, and preferred tone of voice.",
    },
    {
      title: "Transparent Project Scope",
      description:
        "Before starting, we outline exactly what will be built, tested, and handed over — with no hidden surprises, inflated claims, or locked-in black boxes.",
    },
    {
      title: "Rigorously Tested Before Callers Connect",
      description:
        "Every prompt and fallback rule undergoes multi-scenario testing to minimize awkward pauses, misheard requests, or unhelpful answers.",
    },
    {
      title: "Human Escalation by Design",
      description:
        "When a caller is uncertain, frustrated, or has a complex request, our architectures are designed to gracefully log the request or route to your team.",
    },
  ],

  // Section K: Frequently Asked Questions
  faqs: [
    {
      question: "What is an AI voice agent?",
      answer:
        "An AI voice agent is a software assistant that answers and conducts phone conversations in natural spoken language. It can understand what a caller is asking, answer approved questions using your business information, collect customer contact details, and route requests according to your rules.",
    },
    {
      question: "Can an AI voice agent answer calls for my business?",
      answer:
        "Yes, when properly configured with a compatible phone provider or call forwarding rule, an AI voice agent can answer incoming calls when your lines are busy, after business hours, or as your primary front-desk receptionist.",
    },
    {
      question: "Can it collect customer enquiries?",
      answer:
        "Absolutely. The agent can ask for the caller's name, phone number, reason for calling, and specific details (such as preferred service or vehicle model) with caller consent, and organize that information into an email or CRM summary.",
    },
    {
      question: "Can it book appointments?",
      answer:
        "It can collect preferred appointment dates and times out of the box. Direct real-time calendar booking requires integrating with your specific scheduling software (such as Google Calendar, Calendly, or your industry CRM), which can be configured during the project.",
    },
    {
      question: "Does it work with my existing phone number?",
      answer:
        "In most cases, businesses use simple conditional call forwarding: if your primary line is unanswered after three rings or when you are closed, your phone carrier automatically forwards the call to the AI agent's dedicated number.",
    },
    {
      question: "Can I connect it to my CRM or calendar?",
      answer:
        "Yes. Depending on your chosen voice platform and tools, we can connect captured enquiries to email notifications, Google Sheets, webhooks, or popular CRMs. Integration capabilities depend on your specific software stack.",
    },
    {
      question: "How much does an AI voice agent cost?",
      answer:
        "Pricing depends on the complexity of the conversation flow, expected monthly call volume, required integrations (CRM, calendar), and the chosen telephony platform. Contact us to discuss your specific requirements and receive a clear proposal.",
    },
    {
      question: "Can you also build my website?",
      answer:
        "Yes. While AI voice agents are our primary specialty, we also build clean, fast, high-performance business websites designed to complement your voice workflows and explain your services clearly.",
    },
    {
      question: "How long does a project take?",
      answer:
        "A standard voice agent setup or business website typically takes between 1 to 3 weeks depending on the clarity of your business FAQs, required integrations, and testing scope.",
    },
    {
      question: "Can I test a demo before committing?",
      answer:
        "Yes! We walk you through simulated conversation flows and business-specific demos so you can hear and see how the workflow handles realistic customer questions before full deployment.",
    },
  ] as FAQItem[],
};
