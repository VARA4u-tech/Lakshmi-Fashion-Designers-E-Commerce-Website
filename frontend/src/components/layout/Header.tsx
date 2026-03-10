import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { name: "Home", nameTE: "హోమ్", href: "/" },
  { name: "About", nameTE: "గురించి", href: "/about" },
  { name: "Services", nameTE: "సేవలు", href: "/services" },
  { name: "Products", nameTE: "ఉత్పత్తులు", href: "/products" },
  { name: "Gallery", nameTE: "గ్యాలరీ", href: "/gallery" },
  { name: "Contact", nameTE: "సంప్రదించండి", href: "/contact" },
];

interface HeaderProps {
  language: "en" | "te";
  onLanguageChange: (lang: "en" | "te") => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const { wishlist } = useWishlist();
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
    window.open(
      "https://wa.me/919381487134?text=Hi! I'm interested in your tailoring services.",
      "_blank",
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isOpen
          ? "bg-background/95 backdrop-blur-md shadow-card border-b border-border/50 transition-colors"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Lakshmi Fashion & Designers"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="font-heading text-cream text-lg md:text-xl font-semibold leading-tight">
                Lakshmi Fashion
              </h1>
              <p className="text-accent text-xs">& Designers</p>
            </div>
          </Link>

          {/* Mobile Language Toggle - Centered */}
          <div className="absolute left-1/2 right-2/3 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
            <button
              onClick={() => onLanguageChange(language === "en" ? "te" : "en")}
              className="px-4 py-1.5 rounded-full border border-accent text-accent hover:bg-accent/10 transition-colors text-sm font-medium pt-2 pb-2"
            >
              {language === "en" ? "తెలుగు" : "English"}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-accent",
                  location.pathname === link.href ? "text-accent" : "text-cream/80",
                )}
              >
                {language === "en" ? link.name : link.nameTE}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-accent hover:text-accent/80 transition-colors"
            >
              <Heart
                className={cn("w-5 h-5", location.pathname === "/wishlist" && "fill-current")}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Language Toggle - Desktop */}
            <button
              onClick={() => onLanguageChange(language === "en" ? "te" : "en")}
              className="hidden lg:block text-xs font-medium px-3 py-1.5 rounded-full border border-accent/50 text-accent hover:bg-accent/10 transition-colors"
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
              className="lg:hidden p-2 text-accent hover:text-accent/80 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden absolute top-16 left-0 w-full bg-background border-b border-border/50 shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-accent/10 text-accent"
                    : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                )}
              >
                {language === "en" ? link.name : link.nameTE}
              </Link>
            ))}
            <Button variant="whatsapp" className="mt-4 mx-4" onClick={handleWhatsApp}>
              <MessageCircle className="w-5 h-5" />
              {language === "en" ? "Chat on WhatsApp" : "WhatsApp లో చాట్ చేయండి"}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
