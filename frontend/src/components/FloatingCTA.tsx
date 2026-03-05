import { useState } from "react";
import { Phone, MessageCircle, X, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingCTAProps {
  language: "en" | "te";
}

export function FloatingCTA({ language }: FloatingCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919381487134?text=Hi! I'm interested in your tailoring services.",
      "_blank",
    );
  };

  const handleCall = () => {
    window.location.href = "tel:+919381487134";
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-center gap-3 md:hidden">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-destructive rotate-90" : "bg-accent hover:scale-110"
        }`}
        aria-label="Contact options"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageSquareText className="w-5 h-5 text-accent-foreground" />
        )}
      </button>

      {/* Options */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-10 invisible"
        }`}
      >
        <button
          onClick={handleWhatsApp}
          className="w-10 h-10 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center transition-transform hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleCall}
          className="w-10 h-10 rounded-full bg-accent shadow-gold-lg flex items-center justify-center transition-transform hover:scale-110"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5 text-accent-foreground" />
        </button>
      </div>
    </div>
  );
}
