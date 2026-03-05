import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function WelcomePage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation on mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleStartJourney = () => {
    // Fade out and navigate to home
    setIsVisible(false);
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-maroon-dark/80 to-background">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-pattern-ornate opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-gold" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-gold animation-delay-500" />

      {/* Gold ornamental lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
            <img
              src={logo}
              alt="Lakshmi Fashion & Designers"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-accent shadow-2xl shadow-accent/30 relative z-10"
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          <span className="text-gradient-gold">Lakshmi Fashion</span>
        </h1>
        <p className="font-heading text-2xl md:text-3xl text-accent mb-6">& Designers</p>

        {/* Caption */}
        <p className="text-cream/90 text-lg md:text-xl italic mb-4 max-w-2xl mx-auto px-4">
          "Tailoring is not just about making clothes, it's about making people."
        </p>

        {/* Tagline */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <Sparkles className="w-5 h-5 text-accent" />
          <p className="text-muted-foreground text-sm md:text-base">
            Premium Women's Tailoring & Fancy Store
          </p>
          <Sparkles className="w-5 h-5 text-accent" />
        </div>

        {/* CTA Button */}
        <Button
          variant="hero"
          size="xl"
          onClick={handleStartJourney}
          className="group animate-pulse-gold"
        >
          Start Your Journey
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto px-4">
          <div className="text-center">
            <p className="font-heading text-3xl md:text-4xl font-bold text-accent">20+</p>
            <p className="text-muted-foreground text-xs md:text-sm">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-3xl md:text-4xl font-bold text-accent">5000+</p>
            <p className="text-muted-foreground text-xs md:text-sm">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-3xl md:text-4xl font-bold text-accent">100+</p>
            <p className="text-muted-foreground text-xs md:text-sm">Bridal Dresses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
