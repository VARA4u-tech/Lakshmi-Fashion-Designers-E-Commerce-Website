import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, Scissors, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { ParticleBackground } from "./ParticleBackground";
import { TypingAnimation } from "./TypingAnimation";
import { ScrollIndicator } from "./ScrollIndicator";
import { ParallaxWrapper } from "@/components/ui/ParallaxWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface HeroSectionProps {
  language: "en" | "te";
}

const content = {
  en: {
    badge: "20+ Years of Excellence",
    title: "Lakshmi Fashion",
    subtitle: "& Designers",
    tagline: "Tailoring is not just about making clothes, it's about making people.",
    description:
      "Premium women's tailoring and fancy store. Specializing in bridal wear, designer blouses, lehengas, and exclusive fashion accessories.",
    cta: "Book Appointment",
    secondary: "View Our Work",
  },
  te: {
    badge: "20+ సంవత్సరాల అనుభవం",
    title: "లక్ష్మి ఫ్యాషన్",
    subtitle: "& డిజైనర్స్",
    tagline: "టైలరింగ్ అనేది బట్టలు తయారు చేయడం మాత్రమే కాదు, మనుషులను తయారు చేయడం.",
    description:
      "ప్రీమియం మహిళల టైలరింగ్ మరియు ఫ్యాన్సీ స్టోర్. బ్రైడల్ వేర్, డిజైనర్ బ్లౌజ్‌లు, లెహెంగాలు మరియు ప్రత్యేక ఫ్యాషన్ యాక్సెసరీలలో ప్రత్యేకత.",
    cta: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    secondary: "మా పనిని చూడండి",
  },
};

export function HeroSection({ language }: HeroSectionProps) {
  const t = content[language];

  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-screen pt-24 pb-20 md:pt-32 md:pb-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
      </div>
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-maroon-dark/80 to-background/95" />

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-pattern-ornate opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Particle Effects */}
      <ParticleBackground />

      {/* Gold ornamental line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <ParallaxWrapper offset={-30}>
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <ScrollReveal direction="down" duration={0.8} width="100%">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                <span>{t.badge}</span>
                <Star className="w-4 h-4 fill-accent" />
              </div>
            </ScrollReveal>

            {/* Title */}
            <ScrollReveal direction="up" delay={0.2} duration={0.8} width="100%">
              <h1 className="font-heading text-4xl md:text-7xl lg:text-8xl font-bold mb-2">
                <span className="text-gradient-gold">{t.title}</span>
              </h1>
              <p className="font-heading text-xl md:text-3xl lg:text-4xl text-accent mb-3">
                {t.subtitle}
              </p>
            </ScrollReveal>

            {/* Tagline with Typing Animation */}
            <ScrollReveal direction="up" delay={0.4} duration={0.8} width="100%">
              <div className="h-12 flex items-center justify-center mb-2">
                <p className="font-heading text-base md:text-xl text-cream/90 italic">
                  "<TypingAnimation text={t.tagline} speed={30} />"
                </p>
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={0.6} duration={0.8} width="100%">
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto mb-6 px-4">
                {t.description}
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={0.8} duration={0.8} width="100%">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="hero"
                    size="lg"
                    className="group w-full sm:w-auto md:h-14 md:text-lg"
                  >
                    {t.cta}
                    <Scissors className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
                  </Button>
                </Link>
                <Link to="/gallery" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-accent text-accent hover:bg-accent/10 group w-full sm:w-auto md:h-14 md:text-lg"
                  >
                    {t.secondary}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </ParallaxWrapper>

        {/* Stats */}
        <ParallaxWrapper offset={-15} className="mt-8 w-full pb-12 md:pb-0">
          <ScrollReveal direction="up" delay={1.0} duration={0.8} width="100%">
            <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-2xl mx-auto border-t border-white/10 pt-8">
              <div className="text-center group cursor-default">
                <p className="font-heading text-2xl md:text-4xl font-bold text-accent group-hover:scale-110 transition-transform duration-300">
                  20+
                </p>
                <p className="text-muted-foreground text-xs md:text-sm group-hover:text-cream transition-colors break-words">
                  {language === "en" ? "Years Exp." : "అనుభవం"}
                </p>
              </div>
              <div className="text-center group cursor-default">
                <p className="font-heading text-2xl md:text-4xl font-bold text-accent group-hover:scale-110 transition-transform duration-300">
                  5k+
                </p>
                <p className="text-muted-foreground text-xs md:text-sm group-hover:text-cream transition-colors break-words">
                  {language === "en" ? "Customers" : "కస్టమర్లు"}
                </p>
              </div>
              <div className="text-center group cursor-default">
                <p className="font-heading text-2xl md:text-4xl font-bold text-accent group-hover:scale-100 transition-transform duration-300">
                  100+
                </p>
                <p className="text-muted-foreground text-xs md:text-sm group-hover:text-cream transition-colors break-words">
                  {language === "en" ? "Dresses" : "డ్రస్సులు"}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </ParallaxWrapper>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden md:block">
        <ScrollIndicator />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
