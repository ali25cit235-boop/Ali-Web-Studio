import { useState, useMemo } from 'react';
import { 
  Utensils, 
  Stethoscope, 
  Scissors, 
  Wrench, 
  Sparkles, 
  Home, 
  Building2, 
  ShoppingBag, 
  GraduationCap, 
  Briefcase, 
  Check, 
  ArrowRight, 
  ExternalLink,
  Bot,
  Globe
} from 'lucide-react';
import { siteConfig, BusinessTypeOption, SolutionGoalOption } from '../data/siteConfig';

interface SolutionFinderProps {
  onDiscussSolution: (businessType: string, goal: string) => void;
  onPreviewDemo: (demoId: string) => void;
}

export default function SolutionFinder({ onDiscussSolution, onPreviewDemo }: SolutionFinderProps) {
  const [selectedType, setSelectedType] = useState<string>('automotive');
  const [selectedGoal, setSelectedGoal] = useState<string>('both');

  const iconMap: Record<string, React.ElementType> = {
    restaurant: Utensils,
    clinic: Stethoscope,
    salon: Scissors,
    automotive: Wrench,
    cleaning: Sparkles,
    roofing: Home,
    'real-estate': Building2,
    retail: ShoppingBag,
    education: GraduationCap,
    other: Briefcase,
  };

  // Compute recommendation dynamically based on selections
  const recommendation = useMemo(() => {
    const biz = siteConfig.businessTypes.find((b) => b.id === selectedType);
    const goal = siteConfig.solutionGoals.find((g) => g.id === selectedGoal);

    // Business-specific voice solution recommendation
    let voiceSolution = "";
    let voiceReason = "";
    let matchingDemoId = "";
    let demoTitle = "";

    switch (selectedType) {
      case 'restaurant':
        voiceSolution = "AI Receptionist & Menu FAQ Voice Agent";
        voiceReason = "Handles opening hours questions, directions, table reservation inquiries, and seasonal menu FAQs without pulling kitchen or waitstaff from service.";
        matchingDemoId = "flavors-restaurant";
        demoTitle = "FLAVORS Restaurant Live Demo";
        break;
      case 'clinic':
        voiceSolution = "Appointment Enquiry Assistant & Approved FAQ Triage";
        voiceReason = "Answers inquiries about clinic office hours, accepted payment plans, doctor credentials, and captures appointment time requests. (Strictly follows approved clinic guidelines; never gives medical advice).";
        matchingDemoId = "lumiere-dental";
        demoTitle = "Lumiere Dental Demo";
        break;
      case 'salon':
        voiceSolution = "Styling Service FAQ & Appointment Enquiry Assistant";
        voiceReason = "Explains treatment pricing tiers, collects preferred date/stylist requests, and handles repetitive rescheduling questions during active styling appointments.";
        matchingDemoId = "elara-salon";
        demoTitle = "Elara Salon Concept Preview";
        break;
      case 'automotive':
        voiceSolution = "Service Lead Capture & Quote Request Voice Agent";
        voiceReason = "Gathers vehicle make, model, desired service (detailing, ceramic coating, brake check), and logs clean summaries for your technicians to price.";
        matchingDemoId = "apex-auto-detailing";
        demoTitle = "Apex Auto Detailing Live Demo";
        break;
      case 'cleaning':
        voiceSolution = "Service-Area Triage & Estimate Capture Agent";
        voiceReason = "Verifies caller zip code against your operating service boundaries and collects square footage details to prepare accurate residential or commercial estimates.";
        matchingDemoId = "";
        demoTitle = "";
        break;
      case 'roofing':
        voiceSolution = "Urgent Repair Lead Capture & Estimate Triage";
        voiceReason = "Prioritizes storm damage inquiries, collects property address and leak urgency, and alerts your field estimators for rapid quotation.";
        matchingDemoId = "elite-roofing";
        demoTitle = "Elite Roofing Concept Preview";
        break;
      case 'real-estate':
        voiceSolution = "Property Inquiry Capture & Tour Request Assistant";
        voiceReason = "Collects buyer/renter criteria, logs viewing availability, and qualifies inbound calls on featured listings for your licensed agents.";
        matchingDemoId = "";
        demoTitle = "";
        break;
      case 'retail':
        voiceSolution = "Store Hours, Location & Product FAQ Assistant";
        voiceReason = "Answers frequent calls about holiday hours, parking directions, and returns policy, freeing front counter staff for in-store shoppers.";
        matchingDemoId = "";
        demoTitle = "";
        break;
      case 'education':
        voiceSolution = "Course Curriculum & Enrollment Inquiry Agent";
        voiceReason = "Answers syllabus and prerequisite FAQs, explains fee structures, and captures prospective student contact information.";
        matchingDemoId = "";
        demoTitle = "";
        break;
      default:
        voiceSolution = "Custom AI Receptionist & Inbound Lead Agent";
        voiceReason = "Tailored conversation script designed specifically around your operational phone call types and communication rules.";
        matchingDemoId = "";
        demoTitle = "";
        break;
    }

    const matchingDemo = siteConfig.websiteDemos.find((d) => d.id === matchingDemoId);

    return {
      biz,
      goal,
      voiceSolution,
      voiceReason,
      matchingDemo,
      demoTitle,
    };
  }, [selectedType, selectedGoal]);

  return (
    <section id="solution-finder" className="py-24 relative overflow-hidden bg-[#080B14] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/3 w-[550px] h-[550px] bg-blue-600/08 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4F8CFF]">
            <span>INTERACTIVE TOOL &bull; RECOMMENDATION ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            What Kind of Business <span className="text-gradient-electric">Do You Run?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Tell us a little about your business and discover which AI voice agent workflow or website demo fits your needs.
          </p>
        </div>

        {/* 2-Step Interactive Grid + Dynamic Live Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols): Step 1 & Step 2 Selectors */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Business Type */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-2 font-bold text-white">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-[#4F8CFF] flex items-center justify-center text-[10px]">1</span>
                  Select Your Business Type
                </span>
                <span className="text-slate-400">10 Industries</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {siteConfig.businessTypes.map((biz: BusinessTypeOption) => {
                  const Icon = iconMap[biz.id] || Briefcase;
                  const isSelected = selectedType === biz.id;

                  return (
                    <button
                      key={biz.id}
                      type="button"
                      onClick={() => setSelectedType(biz.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-500 shadow-md shadow-blue-500/10'
                          : 'bg-[#111827] border-white/[0.07] hover:border-white/20 hover:bg-[#141E33]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#4F8CFF]' : 'text-slate-400 group-hover:text-slate-200'}`} />
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#4F8CFF]" />}
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {biz.label}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {biz.category}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: What would you like help with? */}
            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-2 font-bold text-white">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-[#8B5CF6] flex items-center justify-center text-[10px]">2</span>
                  What Would You Like Help With?
                </span>
                <span className="text-slate-400">7 Core Objectives</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {siteConfig.solutionGoals.map((goal: SolutionGoalOption) => {
                  const isSelected = selectedGoal === goal.id;

                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3 group ${
                        isSelected
                          ? 'bg-purple-600/20 border-purple-500 shadow-md shadow-purple-500/10'
                          : 'bg-[#111827] border-white/[0.07] hover:border-white/20 hover:bg-[#141E33]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                        isSelected ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-600'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {goal.label}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {goal.shortDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Dynamic Live Recommendation Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-2xl p-6 sm:p-7 bg-[#111827] border border-blue-500/30 shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                <span className="font-mono text-[#4F8CFF] uppercase font-semibold">
                  Tailored Recommendation
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Instant Match</span>
              </div>

              {/* Selections Summary */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-slate-400">Target Industry:</div>
                <div className="text-sm font-semibold text-white">
                  {recommendation.biz?.label}
                </div>
                <div className="text-xs text-slate-400">
                  Goal: {recommendation.goal?.label}
                </div>
              </div>

              {/* Recommended Voice Solution Cardlet */}
              <div className="p-4 rounded-xl bg-blue-500/[0.06] border border-blue-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
                  <Bot className="w-4 h-4 text-[#4F8CFF]" />
                  <span>Recommended Voice Agent Concept:</span>
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  {recommendation.voiceSolution}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {recommendation.voiceReason}
                </p>
              </div>

              {/* Website Solution Recommendation */}
              <div className="p-4 rounded-xl bg-purple-500/[0.06] border border-purple-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                  <Globe className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Website Recommendation:</span>
                </div>

                {recommendation.matchingDemo ? (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-300">
                      We have a working demonstration layout tuned for this sector:
                    </p>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-xs font-semibold text-white truncate max-w-[190px]">
                        {recommendation.matchingDemo.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => onPreviewDemo(recommendation.matchingDemo!.id)}
                        className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <span>Preview Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 leading-relaxed">
                    We can prepare a tailored demo concept and wireframe structure specifically for your {recommendation.biz?.label} requirements.
                  </p>
                )}
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onDiscussSolution(
                      recommendation.biz?.label || 'General Business',
                      recommendation.goal?.label || 'AI Voice Agent'
                    )
                  }
                  className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] hover:from-[#3B7CFF] hover:to-[#7C3AED] shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Discuss My Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
