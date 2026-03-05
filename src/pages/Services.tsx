import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Crown,
  Sparkles,
  Scissors,
  Shirt,
  Flower2,
  Baby,
  Wrench,
  ArrowRight,
  Check,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = {
  en: [
    {
      icon: Crown,
      title: "Bridal Lehengas",
      description:
        "Complete bridal lehenga sets with heavy embroidery, zardozi work, and custom designs. Perfect for your special day.",
      features: [
        "Custom Design",
        "Premium Fabrics",
        "Heavy Embroidery",
        "Multiple Fittings",
      ],
      image: "/images/services/bridal-lehenga.png",
      popular: true,
    },
    {
      icon: Sparkles,
      title: "Designer Blouses",
      description:
        "Exquisite designer blouses with intricate patterns, perfect fit, and modern or traditional designs.",
      features: [
        "Custom Patterns",
        "Perfect Fit",
        "Embroidery Options",
        "Matching Work",
      ],
      image: "/images/services/designer-blouse.png",
      popular: true,
    },
    {
      icon: Flower2,
      title: "Gowns",
      description:
        "Elegant gowns for parties, receptions, and special occasions. Western and Indo-western styles available.",
      features: [
        "Modern Designs",
        "Premium Materials",
        "Custom Styling",
        "Alteration Support",
      ],
      image: "/images/services/gowns.png",
    },
    {
      icon: Scissors,
      title: "Saree Blouses",
      description:
        "Traditional and modern saree blouses. Plain, embroidered, or with heavy work to match your saree.",
      features: [
        "Quick Delivery",
        "Pattern Matching",
        "Back Design Options",
        "Piping Work",
      ],
      image: "/images/services/saree-blouse.png",
    },
    {
      icon: Shirt,
      title: "Kurtis & Suits",
      description:
        "Comfortable daily wear kurtis and salwar suits. Simple stitching to designer patterns.",
      features: [
        "Comfort Fit",
        "Various Styles",
        "Affordable",
        "Quick Turnaround",
      ],
      image: "/images/services/kurtis.png",
    },
    {
      icon: Baby,
      title: "Kids Wear",
      description:
        "Cute and comfortable outfits for kids. Lehengas, frocks, and traditional wear for little ones.",
      features: [
        "Child-Friendly",
        "Comfortable",
        "Cute Designs",
        "Safe Fabrics",
      ],
      image: "/images/services/kids-wear.png",
    },
    {
      icon: Wrench,
      title: "Alterations",
      description:
        "Expert alterations for all types of garments. Perfect fit adjustments and repairs.",
      features: ["Quick Service", "Expert Work", "All Garments", "Affordable"],
      image: "/images/services/saree-blouse.png",
    },
  ],
  te: [
    {
      icon: Crown,
      title: "బ్రైడల్ లెహెంగాలు",
      description:
        "హెవీ ఎంబ్రాయిడరీ, జర్దోజీ వర్క్ మరియు కస్టమ్ డిజైన్‌లతో పూర్తి బ్రైడల్ లెహెంగా సెట్‌లు. మీ ప్రత్యేక రోజుకు సరిపోతుంది.",
      features: [
        "కస్టమ్ డిజైన్",
        "ప్రీమియం ఫ్యాబ్రిక్స్",
        "హెవీ ఎంబ్రాయిడరీ",
        "మల్టిపుల్ ఫిట్టింగ్‌లు",
      ],
      image: "/images/services/bridal-lehenga.png",
      popular: true,
    },
    {
      icon: Sparkles,
      title: "డిజైనర్ బ్లౌజ్‌లు",
      description:
        "సంక్లిష్టమైన ప్యాటర్న్‌లు, పర్ఫెక్ట్ ఫిట్ మరియు ఆధునిక లేదా సాంప్రదాయ డిజైన్‌లతో అద్భుతమైన డిజైనర్ బ్లౌజ్‌లు.",
      features: [
        "కస్టమ్ ప్యాటర్న్‌లు",
        "పర్ఫెక్ట్ ఫిట్",
        "ఎంబ్రాయిడరీ ఆప్షన్‌లు",
        "మ్యాచింగ్ వర్క్",
      ],
      image: "/images/services/designer-blouse.png",
      popular: true,
    },
    {
      icon: Flower2,
      title: "పార్టీ వేర్ గౌన్లు",
      description:
        "పార్టీలు, రిసెప్షన్లు మరియు ప్రత్యేక సందర్భాల కోసం ఎలిగెంట్ గౌన్లు. వెస్ట్రన్ మరియు ఇండో-వెస్ట్రన్ స్టైల్స్.",
      features: [
        "మోడర్న్ డిజైన్‌లు",
        "ప్రీమియం మెటీరియల్స్",
        "కస్టమ్ స్టైలింగ్",
        "అల్టరేషన్ సపోర్ట్",
      ],
      image: "/images/services/gowns.png",
    },
    {
      icon: Scissors,
      title: "చీర బ్లౌజ్‌లు",
      description:
        "సాంప్రదాయ మరియు ఆధునిక చీర బ్లౌజ్‌లు. మీ చీరకు సరిపోయేలా ప్లెయిన్, ఎంబ్రాయిడరీ లేదా హెవీ వర్క్.",
      features: [
        "త్వరిత డెలివరీ",
        "ప్యాటర్న్ మ్యాచింగ్",
        "బ్యాక్ డిజైన్ ఆప్షన్‌లు",
        "పైపింగ్ వర్క్",
      ],
      image: "/images/services/saree-blouse.png",
    },
    {
      icon: Shirt,
      title: "కుర్తీలు & సూట్లు",
      description:
        "సౌకర్యవంతమైన రోజువారీ వేర్ కుర్తీలు మరియు సల్వార్ సూట్లు. సింపుల్ స్టిచింగ్ నుండి డిజైనర్ ప్యాటర్న్‌ల వరకు.",
      features: [
        "కంఫర్ట్ ఫిట్",
        "వివిధ స్టైల్స్",
        "అందుబాటులో",
        "త్వరిత టర్నరౌండ్",
      ],
      image: "/images/services/kurtis.png",
    },
    {
      icon: Baby,
      title: "కిడ్స్ వేర్",
      description:
        "పిల్లల కోసం క్యూట్ మరియు కంఫర్టబుల్ దుస్తులు. చిన్నవారి కోసం లెహెంగాలు, ఫ్రాక్స్ మరియు సాంప్రదాయ దుస్తులు.",
      features: [
        "చైల్డ్-ఫ్రెండ్లీ",
        "కంఫర్టబుల్",
        "క్యూట్ డిజైన్‌లు",
        "సేఫ్ ఫ్యాబ్రిక్స్",
      ],
      image: "/images/services/kids-wear.png",
    },
    {
      icon: Wrench,
      title: "అల్టరేషన్లు",
      description:
        "అన్ని రకాల దుస్తులకు నిపుణుల అల్టరేషన్లు. పర్ఫెక్ట్ ఫిట్ సర్దుబాట్లు మరియు మరమ్మతులు.",
      features: ["త్వరిత సేవ", "నిపుణుల పని", "అన్ని దుస్తులు", "అందుబాటులో"],
      image: "/images/services/saree-blouse.png",
    },
  ],
};

const pageContent = {
  en: {
    subtitle: "Our Expertise",
    title: "Premium Tailoring Services",
    description:
      "From bridal elegance to everyday comfort, we craft every stitch with love and precision.",
    cta: "Book Your Appointment",
    whatsapp: "Chat on WhatsApp",
    call: "Call Now",
    getQuote: "Get Quote",
    bookNow: "Book Now",
    viewDetails: "View Details",
    popularBadge: "Most Popular",
  },
  te: {
    subtitle: "మా నైపుణ్యం",
    title: "ప్రీమియం టైలరింగ్ సేవలు",
    description:
      "బ్రైడల్ ఎలిగెన్స్ నుండి రోజువారీ సౌకర్యం వరకు, మేము ప్రతి కుట్టును ప్రేమ మరియు ఖచ్చితత్వంతో తయారు చేస్తాము.",
    cta: "మీ అపాయింట్‌మెంట్ బుక్ చేయండి",
    whatsapp: "WhatsApp లో చాట్ చేయండి",
    call: "ఇప్పుడు కాల్ చేయండి",
    getQuote: "ధర అడగండి",
    bookNow: "ఇప్పుడు బుక్ చేయండి",
    viewDetails: "వివరాలు చూడండి",
    popularBadge: "అత్యంత ప్రజాదరణ",
  },
};

import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { language, setLanguage } = useLanguage();
  const t = pageContent[language];
  const servicesList = services[language];

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
    <Layout language={language} onLanguageChange={setLanguage}>
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/80 via-background to-background" />

        {/* Dynamic Background Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 animate-pulse opacity-70"></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-maroon/20 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-6 shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
              {t.subtitle}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1]"
            >
              {t.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-muted-foreground text-lg md:text-xl md:leading-relaxed max-w-2xl mb-10"
            >
              {t.description}
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
            >
              <Button
                variant="default"
                size="xl"
                onClick={handleWhatsApp}
                className="group w-full sm:w-auto min-w-[200px] bg-[#25D366] hover:bg-[#20BE5A] text-white border-transparent shadow-lg shadow-[#25D366]/20 transition-all duration-300"
              >
                <div className="flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-base">{t.whatsapp}</span>
                </div>
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={handleCall}
                className="group w-full sm:w-auto min-w-[200px] border-accent/30 hover:border-accent text-accent hover:bg-accent/10 hover:text-accent shadow-sm backdrop-blur-sm transition-all duration-300"
              >
                <div className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold text-base">{t.call}</span>
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-28 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-maroon/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative">
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="group relative flex h-full"
              >
                {/* Service Card */}
                <div className="relative flex flex-col w-full h-full bg-card/40 backdrop-blur-xl border border-border/60 rounded-3xl overflow-hidden hover:border-accent/40 hover:bg-card/80 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">
                  {/* Image Section */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-80" />

                    {/* Badges */}
                    <div className="absolute top-5 left-5 md:top-6 md:left-6 flex flex-col gap-2 z-20">
                      {service.popular && (
                        <div className="bg-accent text-maroon-dark px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 w-max transform group-hover:scale-105 transition-transform duration-300">
                          <Crown className="w-3.5 h-3.5" />
                          {t.popularBadge}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6 md:p-8 pt-4 flex-1 flex flex-col">
                    {/* Floating Icon */}
                    <div className="absolute right-6 md:right-8 -top-8 w-16 h-16 rounded-2xl bg-card backdrop-blur-md border border-accent/20 flex items-center justify-center shadow-xl z-30 group-hover:-translate-y-2 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                      <service.icon className="w-7 h-7 text-accent group-hover:text-maroon-dark transition-colors duration-500" />
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3 mt-4 group-hover:text-accent transition-colors duration-300 pr-16 line-clamp-1">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-3 flex-1">
                      {service.description}
                    </p>

                    <div className="mt-auto flex flex-col gap-6">
                      {/* Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm group/feature"
                          >
                            <div className="mt-0.5 w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center group-hover/feature:bg-accent shadow-sm transition-colors duration-300">
                              <Check className="w-2.5 h-2.5 text-accent group-hover/feature:text-maroon-dark transition-colors duration-300" />
                            </div>
                            <span className="text-muted-foreground/90 font-medium group-hover/feature:text-foreground transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-border/50 via-border to-border/50" />

                      {/* Footer Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <Link to="/contact" className="w-full sm:w-auto flex-1">
                          <Button
                            variant="default"
                            className="w-full bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-maroon-dark border border-accent/30 text-foreground group/btn rounded-xl h-11 shadow-sm transition-all duration-300"
                          >
                            {t.getQuote}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:text-maroon-dark transition-all" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Dynamic Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark via-background to-maroon-dark/90"></div>

        {/* Ornate Pattern Overlay */}
        <div className="absolute inset-0 bg-pattern-ornate opacity-[0.05] mix-blend-overlay"></div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-4xl bg-card/10 backdrop-blur-2xl border border-accent/20 p-8 md:p-16 rounded-3xl text-center shadow-2xl relative overflow-hidden"
          >
            {/* Inner highlights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {language === "en"
                ? "Ready to Enhance Your Wardrobe?"
                : "మీ వార్డ్‌రోబ్‌ను మెరుగుపరచుకోవడానికి సిద్ధంగా ఉన్నారా?"}
            </h2>

            <p className="text-muted-foreground md:text-xl text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {language === "en"
                ? "Book your appointment today and experience the finest custom tailoring services crafted just for you."
                : "ఈరోజే మీ అపాయింట్‌మెంట్ బుక్ చేసుకోండి మరియు విజయవాడలో మీకు ప్రత్యేకంగా తయారుచేసిన అత్యుత్తమ టైలరింగ్ సేవలను అనుభవించండి."}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  variant="default"
                  size="xl"
                  className="w-full group bg-accent hover:bg-accent/90 text-maroon-dark font-bold text-lg h-14 px-8 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300"
                >
                  {t.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="xl"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto border-accent/30 text-accent hover:bg-accent/10 text-lg font-semibold h-14 backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t.whatsapp}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
