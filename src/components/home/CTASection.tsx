import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin } from "lucide-react";

interface CTASectionProps {
  language: "en" | "te";
}

const content = {
  en: {
    title: "Ready to Look Your Best?",
    description: "Visit our store or reach out to discuss your tailoring needs. We'd love to create something beautiful for you.",
    cta: "Book Appointment",
    whatsapp: "Chat on WhatsApp",
    phone: "+91 98765 43210",
    address: "123 Fashion Street, Vijayawada",
  },
  te: {
    title: "మీ ఉత్తమంగా కనిపించడానికి సిద్ధంగా ఉన్నారా?",
    description: "మా స్టోర్‌ను సందర్శించండి లేదా మీ టైలరింగ్ అవసరాలను చర్చించడానికి సంప్రదించండి. మీ కోసం ఏదైనా అందమైనది సృష్టించడానికి మేము ఇష్టపడతాము.",
    cta: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    whatsapp: "WhatsApp లో చాట్ చేయండి",
    phone: "+91 98765 43210",
    address: "123 ఫ్యాషన్ స్ట్రీట్, విజయవాడ",
  },
};

export function CTASection({ language }: CTASectionProps) {
  const t = content[language];

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi! I'm interested in your tailoring services.",
      "_blank"
    );
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon-dark to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            {t.title}
          </h2>
          <p className="text-cream/80 text-lg mb-10 max-w-xl mx-auto">
            {t.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/booking">
              <Button variant="hero" size="xl">
                {t.cta}
              </Button>
            </Link>
            <Button
              variant="whatsapp"
              size="xl"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-5 h-5" />
              {t.whatsapp}
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-cream/80">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="w-5 h-5 text-accent" />
              {t.phone}
            </a>
            <span className="hidden sm:block text-accent">|</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              {t.address}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
