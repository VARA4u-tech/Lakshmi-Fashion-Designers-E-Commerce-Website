import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  language: "en" | "te";
}

const content = {
  en: {
    badge: "10+ Years of Excellence",
    title: "Lakshmi Fashion",
    subtitle: "& Designers",
    tagline: "Tailoring is not just about making clothes, it's about making people.",
    description: "Premium women's tailoring and fancy store. Specializing in bridal wear, designer blouses, lehengas, and exclusive fashion accessories.",
    cta: "Book Appointment",
    secondary: "View Our Work",
  },
  te: {
    badge: "10+ సంవత్సరాల అనుభవం",
    title: "లక్ష్మి ఫ్యాషన్",
    subtitle: "& డిజైనర్స్",
    tagline: "టైలరింగ్ అనేది బట్టలు తయారు చేయడం మాత్రమే కాదు, మనుషులను తయారు చేయడం.",
    description: "ప్రీమియం మహిళల టైలరింగ్ మరియు ఫ్యాన్సీ స్టోర్. బ్రైడల్ వేర్, డిజైనర్ బ్లౌజ్‌లు, లెహెంగాలు మరియు ప్రత్యేక ఫ్యాషన్ యాక్సెసరీలలో ప్రత్యేకత.",
    cta: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    secondary: "మా పనిని చూడండి",
  },
};

export function HeroSection({ language }: HeroSectionProps) {
  const t = content[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      
      {/* Gold ornamental line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>{t.badge}</span>
            <Star className="w-4 h-4 fill-accent" />
          </div>

          {/* Title */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-2 animate-fade-in-up">
            <span className="text-gradient-gold">{t.title}</span>
          </h1>
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-accent mb-6 animate-fade-in-up animation-delay-100">
            {t.subtitle}
          </p>

          {/* Tagline */}
          <p className="font-heading text-lg md:text-xl text-cream/90 italic mb-4 animate-fade-in-up animation-delay-200">
            "{t.tagline}"
          </p>

          {/* Description */}
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-300">
            {t.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link to="/booking">
              <Button variant="hero" size="xl">
                {t.cta}
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="outline" size="xl" className="border-accent text-accent hover:bg-accent/10">
                {t.secondary}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto animate-fade-in-up animation-delay-500">
            <div className="text-center">
              <p className="font-heading text-3xl md:text-4xl font-bold text-accent">10+</p>
              <p className="text-muted-foreground text-sm">{language === "en" ? "Years Experience" : "సంవత్సరాల అనుభవం"}</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-3xl md:text-4xl font-bold text-accent">5000+</p>
              <p className="text-muted-foreground text-sm">{language === "en" ? "Happy Customers" : "సంతోషకరమైన కస్టమర్లు"}</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-3xl md:text-4xl font-bold text-accent">100+</p>
              <p className="text-muted-foreground text-sm">{language === "en" ? "Bridal Dresses" : "బ్రైడల్ డ్రస్సులు"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
