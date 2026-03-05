import { Award, Clock, Heart, Shield, Users, Gem } from "lucide-react";

interface WhyChooseUsProps {
  language: "en" | "te";
}

const features = {
  en: [
    {
      icon: Award,
      title: "20+ Years Experience",
      description: "Decade of expertise in women's fashion tailoring",
    },
    {
      icon: Heart,
      title: "Women-Only Comfort",
      description: "Safe and comfortable space for all fittings",
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "We respect your timelines and special dates",
    },
    {
      icon: Gem,
      title: "Premium Quality",
      description: "Only the finest fabrics and embellishments",
    },
    {
      icon: Users,
      title: "5000+ Happy Customers",
      description: "Trusted by brides and fashion lovers",
    },
    {
      icon: Shield,
      title: "Satisfaction Guaranteed",
      description: "Free alterations until you're 100% happy",
    },
  ],
  te: [
    {
      icon: Award,
      title: "20+ సంవత్సరాల అనుభవం",
      description: "మహిళల ఫ్యాషన్ టైలరింగ్‌లో దశాబ్దం అనుభవం",
    },
    {
      icon: Heart,
      title: "మహిళల కోసం సౌకర్యం",
      description: "అన్ని ఫిట్టింగ్‌లకు సురక్షితమైన మరియు సౌకర్యవంతమైన స్థలం",
    },
    {
      icon: Clock,
      title: "సమయానికి డెలివరీ",
      description: "మీ టైమ్‌లైన్‌లు మరియు ప్రత్యేక తేదీలను మేము గౌరవిస్తాము",
    },
    {
      icon: Gem,
      title: "ప్రీమియం నాణ్యత",
      description: "అత్యుత్తమ ఫ్యాబ్రిక్‌లు మరియు అలంకరణలు మాత్రమే",
    },
    {
      icon: Users,
      title: "5000+ సంతోషకరమైన కస్టమర్లు",
      description: "వధువులు మరియు ఫ్యాషన్ ప్రేమికులచే విశ్వసించబడింది",
    },
    {
      icon: Shield,
      title: "సంతృప్తి హామీ",
      description: "మీరు 100% సంతోషంగా ఉండే వరకు ఉచిత మార్పులు",
    },
  ],
};

const sectionContent = {
  en: {
    subtitle: "Why Choose Us",
    title: "Crafting Excellence Since 2004",
    description:
      "We combine traditional craftsmanship with modern designs to create timeless pieces.",
  },
  te: {
    subtitle: "మమ్మల్ని ఎందుకు ఎంచుకోవాలి",
    title: "2004 నుండి శ్రేష్ఠతను రూపొందిస్తున్నాము",
    description:
      "సమకాలీన డిజైన్‌లతో సాంప్రదాయ క్రాఫ్ట్‌మాన్‌షిప్‌ను కలిపి శాశ్వత ముక్కలను సృష్టిస్తాము.",
  },
};

export function WhyChooseUs({ language }: WhyChooseUsProps) {
  const t = sectionContent[language];
  const featuresList = features[language];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-medium mb-2">{t.subtitle}</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuresList.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
