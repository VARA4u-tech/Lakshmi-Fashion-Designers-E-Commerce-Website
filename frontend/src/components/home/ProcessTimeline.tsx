import { CheckCircle2, MessageSquare, Ruler, Scissors, Sparkles, Package } from "lucide-react";

interface ProcessTimelineProps {
  language: "en" | "te";
}

const content = {
  en: {
    subtitle: "Our Process",
    title: "How We Work",
    description: "From consultation to delivery, we ensure perfection at every step.",
    steps: [
      {
        icon: MessageSquare,
        title: "Consultation",
        description:
          "Discuss your vision, preferences, and requirements with our expert designers.",
      },
      {
        icon: Ruler,
        title: "Measurement",
        description: "Precise measurements taken to ensure a perfect fit for your body type.",
      },
      {
        icon: Scissors,
        title: "Design & Cutting",
        description: "Expert cutting and pattern making based on your chosen design.",
      },
      {
        icon: Sparkles,
        title: "Stitching & Embroidery",
        description: "Meticulous stitching with attention to every detail and embellishment.",
      },
      {
        icon: CheckCircle2,
        title: "Fitting & Adjustments",
        description: "Trial fitting to ensure perfect fit with necessary adjustments.",
      },
      {
        icon: Package,
        title: "Final Delivery",
        description: "Your masterpiece is ready! Delivered with care and quality assurance.",
      },
    ],
  },
  te: {
    subtitle: "మా ప్రక్రియ",
    title: "మేము ఎలా పనిచేస్తాము",
    description: "సంప్రదింపు నుండి డెలివరీ వరకు, మేము ప్రతి దశలో పరిపూర్ణతను నిర్ధారిస్తాము.",
    steps: [
      {
        icon: MessageSquare,
        title: "సంప్రదింపు",
        description: "మా నిపుణుల డిజైనర్లతో మీ దృష్టి, ప్రాధాన్యతలు మరియు అవసరాలను చర్చించండి.",
      },
      {
        icon: Ruler,
        title: "కొలతలు",
        description: "మీ శరీర రకానికి సరిపోయే ఖచ్చితమైన కొలతలు తీసుకోబడతాయి.",
      },
      {
        icon: Scissors,
        title: "డిజైన్ & కట్టింగ్",
        description: "మీరు ఎంచుకున్న డిజైన్ ఆధారంగా నిపుణుల కట్టింగ్ మరియు ప్యాటర్న్ తయారీ.",
      },
      {
        icon: Sparkles,
        title: "స్టిచింగ్ & ఎంబ్రాయిడరీ",
        description: "ప్రతి వివరాలు మరియు అలంకరణకు శ్రద్ధతో జాగ్రత్తగా కుట్టడం.",
      },
      {
        icon: CheckCircle2,
        title: "ఫిట్టింగ్ & సర్దుబాట్లు",
        description: "అవసరమైన సర్దుబాట్లతో పర్ఫెక్ట్ ఫిట్ నిర్ధారించడానికి ట్రయల్ ఫిట్టింగ్.",
      },
      {
        icon: Package,
        title: "ఫైనల్ డెలివరీ",
        description:
          "మీ మాస్టర్‌పీస్ సిద్ధంగా ఉంది! శ్రద్ధ మరియు నాణ్యత హామీతో డెలివరీ చేయబడుతుంది.",
      },
    ],
  },
};

export function ProcessTimeline({ language }: ProcessTimelineProps) {
  const t = content[language];

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

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line - hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 via-accent to-accent/50 -translate-x-1/2" />

            {/* Steps */}
            <div className="space-y-12">
              {t.steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-card border border-border/50 rounded-xl p-6 hover-lift group">
                      <div
                        className={`flex items-center gap-4 mb-3 ${index % 2 === 0 ? "md:flex-row-reverse md:justify-end" : ""}`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <step.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg shadow-accent/50" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
