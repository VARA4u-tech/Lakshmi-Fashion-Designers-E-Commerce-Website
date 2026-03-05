import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Crown, Sparkles, Shirt, ArrowRight } from "lucide-react";

interface ServicesPreviewProps {
  language: "en" | "te";
}

const services = {
  en: [
    {
      icon: Crown,
      title: "Bridal Wear",
      description: "Exquisite bridal lehengas, sarees, and complete trousseau tailoring",
    },
    {
      icon: Sparkles,
      title: "Designer Blouses",
      description: "Custom designer blouses with intricate embroidery and perfect fit",
    },
    {
      icon: Scissors,
      title: "Lehengas & Gowns",
      description: "Party wear lehengas and elegant gowns for every occasion",
    },
    {
      icon: Shirt,
      title: "Daily Wear",
      description: "Comfortable and stylish everyday clothing alterations",
    },
  ],
  te: [
    {
      icon: Crown,
      title: "బ్రైడల్ వేర్",
      description: "అద్భుతమైన బ్రైడల్ లెహెంగాలు, చీరలు మరియు పూర్తి ట్రోసో టైలరింగ్",
    },
    {
      icon: Sparkles,
      title: "డిజైనర్ బ్లౌజ్‌లు",
      description: "సంక్లిష్టమైన ఎంబ్రాయిడరీ మరియు పర్ఫెక్ట్ ఫిట్‌తో కస్టమ్ డిజైనర్ బ్లౌజ్‌లు",
    },
    {
      icon: Scissors,
      title: "లెహెంగాలు & గౌన్లు",
      description: "ప్రతి సందర్భానికి పార్టీ వేర్ లెహెంగాలు మరియు ఎలిగెంట్ గౌన్లు",
    },
    {
      icon: Shirt,
      title: "డైలీ వేర్",
      description: "సౌకర్యవంతమైన మరియు స్టైలిష్ రోజువారీ దుస్తుల మార్పులు",
    },
  ],
};

const sectionContent = {
  en: {
    subtitle: "Our Expertise",
    title: "Tailoring Services",
    description:
      "From bridal elegance to everyday comfort, we craft every stitch with love and precision.",
    cta: "View All Services",
  },
  te: {
    subtitle: "మా నైపుణ్యం",
    title: "టైలరింగ్ సేవలు",
    description:
      "బ్రైడల్ ఎలిగెన్స్ నుండి రోజువారీ సౌకర్యం వరకు, మేము ప్రతి కుట్టును ప్రేమ మరియు ఖచ్చితత్వంతో తయారు చేస్తాము.",
    cta: "అన్ని సేవలను చూడండి",
  },
};

import { ScrollReveal } from "@/components/ui/ScrollReveal";

// ... existing code ...

export function ServicesPreview({ language }: ServicesPreviewProps) {
  const t = sectionContent[language];
  const servicesList = services[language];

  return (
    <section className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.6} width="100%">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-accent font-medium mb-2">{t.subtitle}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h2>
            <p className="text-muted-foreground">{t.description}</p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 0.1}
              duration={0.5}
              width="100%"
            >
              <Card variant="gold" className="group hover-lift cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.4} duration={0.6}>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="gold" size="lg">
                {t.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
