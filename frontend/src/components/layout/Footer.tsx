import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";

interface FooterProps {
  language: "en" | "te";
}

const content = {
  en: {
    tagline: "Tailoring is not just about making clothes, it's about making people.",
    services: "Services",
    servicesList: ["Designer Blouses", "Bridal Lehengas", "Gowns & Dresses", "Alterations"],
    quickLinks: "Quick Links",
    linksList: [
      { name: "About Us", path: "/about" },
      { name: "Gallery", path: "/gallery" },
      { name: "Contact", path: "/contact" },
    ],
    legal: "Legal Info",
    legalList: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/terms-of-service" },
      { name: "Refund Policy", path: "/refund-policy" },
    ],
    contact: "Contact Us",
    hours: "Mon - Sat: 10 AM - 8 PM",
    rights: "All rights reserved.",
  },
  te: {
    tagline: "టైలరింగ్ అనేది బట్టలు తయారు చేయడం మాత్రమే కాదు, మనుషులను తయారు చేయడం.",
    services: "సేవలు",
    servicesList: ["డిజైనర్ బ్లౌజ్‌లు", "బ్రైడల్ లెహెంగాలు", "గౌన్లు & డ్రస్సులు", "అల్టరేషన్లు"],
    quickLinks: "త్వరిత లింక్‌లు",
    linksList: [
      { name: "మా గురించి", path: "/about" },
      { name: "గ్యాలరీ", path: "/gallery" },
      { name: "సంప్రదించండి", path: "/contact" },
    ],
    legal: "చట్టపరమైన సమాచారం",
    legalList: [
      { name: "గోప్యతా విధానం", path: "/privacy-policy" },
      { name: "సేవా నిబంధనలు", path: "/terms-of-service" },
      { name: "వాపసు విధానం", path: "/refund-policy" },
    ],
    contact: "మమ్మల్ని సంప్రదించండి",
    hours: "సోమ - శని: 10 AM - 8 PM",
    rights: "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
  },
};

export function Footer({ language }: FooterProps) {
  const t = content[language];

  return (
    <footer className="bg-maroon-dark border-t border-border/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Lakshmi Fashion & Designers"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-heading text-cream text-xl font-semibold">Lakshmi Fashion</h3>
                <p className="text-accent text-sm">& Designers</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.tagline}"</p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919381487134"
                className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="tel:+919381487134"
                className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-cream text-lg font-semibold mb-4">{t.services}</h4>
            <ul className="space-y-3">
              {t.servicesList.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-cream text-lg font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-3">
              {t.linksList.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-heading text-cream text-lg font-semibold mb-4">{t.legal}</h4>
            <ul className="space-y-3">
              {t.legalList.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-cream text-lg font-semibold mb-4">{t.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Old Check Post Center, Krishna Nagar,
                  <br />
                  Yanamalakuduru Road, Vijayawada
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+919381487134"
                  className="text-muted-foreground hover:text-accent transition-colors text-sm"
                >
                  +91 93814 87134
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:9381487134pl@gmail.com"
                  className="text-muted-foreground hover:text-accent transition-colors text-sm"
                >
                  9381487134pl@gmail.com
                </a>
              </li>
            </ul>
            <p className="text-accent text-sm mt-4 font-medium">{t.hours}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Lakshmi Fashion & Designers. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
