import { useState, useEffect } from "react";
import {
  CheckCircle2,
  MessageSquare,
  Ruler,
  Scissors,
  Sparkles,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowWeWorkProps {
  language: "en" | "te";
}

const content = {
  en: {
    subtitle: "Our Process",
    title: "How We Work",
    description: "Experience excellence through our proven 6-step process",
    steps: [
      {
        icon: MessageSquare,
        title: "Consultation",
        description:
          "Discuss your vision, preferences, and requirements with our expert designers.",
        details:
          "We listen carefully to understand your style, occasion, and budget to create the perfect design plan.",
      },
      {
        icon: Ruler,
        title: "Measurement",
        description: "Precise measurements taken to ensure a perfect fit for your body type.",
        details:
          "Our experienced tailors take detailed measurements using professional techniques for accuracy.",
      },
      {
        icon: Scissors,
        title: "Design & Cutting",
        description: "Expert cutting and pattern making based on your chosen design.",
        details:
          "Premium fabrics are carefully cut following traditional and modern tailoring methods.",
      },
      {
        icon: Sparkles,
        title: "Stitching & Embroidery",
        description: "Meticulous stitching with attention to every detail and embellishment.",
        details:
          "Skilled artisans bring your design to life with precision stitching and beautiful embroidery work.",
      },
      {
        icon: CheckCircle2,
        title: "Fitting & Adjustments",
        description: "Trial fitting to ensure perfect fit with necessary adjustments.",
        details:
          "We fine-tune every detail during fitting sessions to guarantee your complete satisfaction.",
      },
      {
        icon: Package,
        title: "Final Delivery",
        description: "Your masterpiece is ready! Delivered with care and quality assurance.",
        details: "Receive your beautifully finished garment, carefully packaged and ready to wear.",
      },
    ],
  },
  te: {
    subtitle: "మా ప్రక్రియ",
    title: "మేము ఎలా పనిచేస్తాము",
    description: "మా నిరూపితమైన 6-దశల ప్రక్రియ ద్వారా అద్భుతాన్ని అనుభవించండి",
    steps: [
      {
        icon: MessageSquare,
        title: "సంప్రదింపు",
        description: "మా నిపుణుల డిజైనర్లతో మీ దృష్టి, ప్రాధాన్యతలు మరియు అవసరాలను చర్చించండి.",
        details:
          "పర్ఫెక్ట్ డిజైన్ ప్లాన్ సృష్టించడానికి మీ స్టైల్, సందర్భం మరియు బడ్జెట్ అర్థం చేసుకోవడానికి మేము జాగ్రత్తగా వింటాము.",
      },
      {
        icon: Ruler,
        title: "కొలతలు",
        description: "మీ శరీర రకానికి సరిపోయే ఖచ్చితమైన కొలతలు తీసుకోబడతాయి.",
        details:
          "మా అనుభవజ్ఞులైన టైలర్లు ఖచ్చితత్వం కోసం వృత్తిపరమైన పద్ధతులను ఉపయోగించి వివరణాత్మక కొలతలు తీసుకుంటారు.",
      },
      {
        icon: Scissors,
        title: "డిజైన్ & కట్టింగ్",
        description: "మీరు ఎంచుకున్న డిజైన్ ఆధారంగా నిపుణుల కట్టింగ్ మరియు ప్యాటర్న్ తయారీ.",
        details:
          "సాంప్రదాయ మరియు ఆధునిక టైలరింగ్ పద్ధతులను అనుసరించి ప్రీమియం ఫాబ్రిక్స్ జాగ్రత్తగా కత్తిరించబడతాయి.",
      },
      {
        icon: Sparkles,
        title: "స్టిచింగ్ & ఎంబ్రాయిడరీ",
        description: "ప్రతి వివరాలు మరియు అలంకరణకు శ్రద్ధతో జాగ్రత్తగా కుట్టడం.",
        details:
          "నైపుణ్యం కలిగిన కళాకారులు ఖచ్చితమైన కుట్టు మరియు అందమైన ఎంబ్రాయిడరీ పనితో మీ డిజైన్‌కు జీవం పోస్తారు.",
      },
      {
        icon: CheckCircle2,
        title: "ఫిట్టింగ్ & సర్దుబాట్లు",
        description: "అవసరమైన సర్దుబాట్లతో పర్ఫెక్ట్ ఫిట్ నిర్ధారించడానికి ట్రయల్ ఫిట్టింగ్.",
        details:
          "మీ పూర్తి సంతృప్తిని హామీ ఇవ్వడానికి ఫిట్టింగ్ సెషన్లలో మేము ప్రతి వివరాన్ని చక్కగా సర్దుబాటు చేస్తాము.",
      },
      {
        icon: Package,
        title: "ఫైనల్ డెలివరీ",
        description:
          "మీ మాస్టర్‌పీస్ సిద్ధంగా ఉంది! శ్రద్ధ మరియు నాణ్యత హామీతో డెలివరీ చేయబడుతుంది.",
        details:
          "మీ అందంగా పూర్తి చేసిన దుస్తులను స్వీకరించండి, జాగ్రత్తగా ప్యాక్ చేయబడి ధరించడానికి సిద్ధంగా ఉంది.",
      },
    ],
  },
};

export function HowWeWork({ language }: HowWeWorkProps) {
  const t = content[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Track screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % t.steps.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, t.steps.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + t.steps.length) % t.steps.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % t.steps.length);
  };

  const handleStepClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/10 via-background to-maroon-dark/10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-medium mb-2">{t.subtitle}</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>

        {/* 3D Card Carousel */}
        <div className="relative max-w-5xl mx-auto mb-12">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground shadow-lg"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground shadow-lg"
            onClick={handleNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* 3D Card Container */}
          <div className="relative h-[500px] sm:h-[450px] md:h-[450px] flex items-center justify-center md:perspective-1000 overflow-hidden">
            {t.steps.map((step, index) => {
              const offset = index - currentIndex;
              const absOffset = Math.abs(offset);

              // Calculate position and styling based on offset
              const isActive = offset === 0;

              // On mobile, only show active card
              const isVisible = isMobile ? isActive : absOffset <= 2;

              // Simplified positioning for mobile
              const translateX = isMobile ? 0 : offset * 35; // Percentage
              const scale = isMobile ? 1 : isActive ? 1 : 0.85 - absOffset * 0.1;
              const opacity = isMobile ? 1 : isActive ? 1 : 0.4 - absOffset * 0.15;
              const rotateY = isMobile ? 0 : offset * -15; // Degrees
              const zIndex = 10 - absOffset;

              return (
                <div
                  key={index}
                  className="absolute w-full max-w-md px-4 sm:px-0 transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity: isVisible ? opacity : 0,
                    zIndex,
                    pointerEvents: isVisible ? "auto" : "none",
                    visibility: isVisible ? "visible" : "hidden",
                  }}
                  onClick={() => !isActive && handleStepClick(index)}
                >
                  <div
                    className={`bg-card border-2 ${isActive ? "border-accent shadow-2xl shadow-accent/20" : "border-border/50"} rounded-2xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${isActive ? "bg-accent" : "bg-accent/10"} flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300`}
                    >
                      <step.icon
                        className={`w-7 h-7 sm:w-8 sm:h-8 ${isActive ? "text-accent-foreground" : "text-accent"}`}
                      />
                    </div>

                    {/* Step Number */}
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <span className="text-accent font-heading text-xs sm:text-sm font-semibold">
                        STEP {index + 1}
                      </span>
                      <div className="flex-1 h-px bg-accent/20" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details (only show on active card) */}
                    {isActive && (
                      <p className="text-xs sm:text-sm text-foreground/70 italic border-l-2 border-accent pl-3 sm:pl-4 animate-fade-in">
                        {step.details}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Progress */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-2">
            {t.steps.map((step, index) => (
              <button key={index} onClick={() => handleStepClick(index)} className="flex-1 group">
                <div className="flex flex-col items-center gap-2">
                  {/* Timeline dot */}
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-accent scale-150 shadow-lg shadow-accent/50"
                        : index < currentIndex
                          ? "bg-accent/60"
                          : "bg-muted-foreground/30"
                    }`}
                  />

                  {/* Timeline line */}
                  {index < t.steps.length - 1 && (
                    <div
                      className="absolute left-1/2 w-full h-0.5 -z-10"
                      style={{ maxWidth: `calc(100% / ${t.steps.length})` }}
                    >
                      <div
                        className={`h-full transition-all duration-500 ${
                          index < currentIndex ? "bg-accent" : "bg-muted-foreground/20"
                        }`}
                      />
                    </div>
                  )}

                  {/* Step label */}
                  <span
                    className={`text-xs font-medium transition-colors hidden md:block ${
                      index === currentIndex
                        ? "text-accent"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
