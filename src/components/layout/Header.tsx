import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", nameTE: "హోమ్", href: "/" },
  { name: "About", nameTE: "గురించి", href: "/about" },
  { name: "Services", nameTE: "సేవలు", href: "/services" },
  { name: "Products", nameTE: "ఉత్పత్తులు", href: "/products" },
  { name: "Gallery", nameTE: "గ్యాలరీ", href: "/gallery" },
  { name: "Book", nameTE: "బుక్", href: "/booking" },
  { name: "Contact", nameTE: "సంప్రదించండి", href: "/contact" },
];

interface HeaderProps {
  language: "en" | "te";
  onLanguageChange: (lang: "en" | "te") => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/919876543210?text=Hi! I'm interested in your tailoring services.", "_blank");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-card border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="font-heading text-maroon-dark text-lg md:text-xl font-bold">L</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-cream text-lg md:text-xl font-semibold leading-tight">
                Lakshmi Fashion
              </h1>
              <p className="text-accent text-xs">& Designers</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-accent",
                  location.pathname === link.href
                    ? "text-accent"
                    : "text-cream/80"
                )}
              >
                {language === "en" ? link.name : link.nameTE}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => onLanguageChange(language === "en" ? "te" : "en")}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-accent/50 text-accent hover:bg-accent/10 transition-colors"
            >
              {language === "en" ? "తెలుగు" : "English"}
            </button>

            {/* WhatsApp Button - Desktop */}
            <Button
              variant="whatsapp"
              size="sm"
              className="hidden md:flex"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-cream hover:text-accent transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    location.pathname === link.href
                      ? "bg-accent/10 text-accent"
                      : "text-cream/80 hover:bg-secondary hover:text-cream"
                  )}
                >
                  {language === "en" ? link.name : link.nameTE}
                </Link>
              ))}
              <Button
                variant="whatsapp"
                className="mt-4 mx-4"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-5 h-5" />
                {language === "en" ? "Chat on WhatsApp" : "WhatsApp లో చాట్ చేయండి"}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
