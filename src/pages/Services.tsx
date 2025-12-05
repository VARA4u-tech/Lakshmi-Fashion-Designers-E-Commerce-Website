import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Sparkles, Scissors, Shirt, Flower2, Baby, Wrench, MessageCircle } from "lucide-react";

const services = {
  en: [
    {
      icon: Crown,
      title: "Bridal Lehengas",
      description: "Complete bridal lehenga sets with heavy embroidery, zardozi work, and custom designs. Perfect for your special day.",
      price: "₹15,000 - ₹1,00,000",
      duration: "4-6 weeks",
      features: ["Custom Design", "Premium Fabrics", "Heavy Embroidery", "Multiple Fittings"],
    },
    {
      icon: Sparkles,
      title: "Designer Blouses",
      description: "Exquisite designer blouses with intricate patterns, perfect fit, and modern or traditional designs.",
      price: "₹1,500 - ₹15,000",
      duration: "1-2 weeks",
      features: ["Custom Patterns", "Perfect Fit", "Embroidery Options", "Matching Work"],
    },
    {
      icon: Flower2,
      title: "Party Wear Gowns",
      description: "Elegant gowns for parties, receptions, and special occasions. Western and Indo-western styles available.",
      price: "₹8,000 - ₹50,000",
      duration: "2-3 weeks",
      features: ["Modern Designs", "Premium Materials", "Custom Styling", "Alteration Support"],
    },
    {
      icon: Scissors,
      title: "Saree Blouses",
      description: "Traditional and modern saree blouses. Plain, embroidered, or with heavy work to match your saree.",
      price: "₹800 - ₹5,000",
      duration: "3-5 days",
      features: ["Quick Delivery", "Pattern Matching", "Back Design Options", "Piping Work"],
    },
    {
      icon: Shirt,
      title: "Kurtis & Suits",
      description: "Comfortable daily wear kurtis and salwar suits. Simple stitching to designer patterns.",
      price: "₹500 - ₹3,000",
      duration: "2-4 days",
      features: ["Comfort Fit", "Various Styles", "Affordable", "Quick Turnaround"],
    },
    {
      icon: Baby,
      title: "Kids Wear",
      description: "Cute and comfortable outfits for kids. Lehengas, frocks, and traditional wear for little ones.",
      price: "₹500 - ₹5,000",
      duration: "3-5 days",
      features: ["Child-Friendly", "Comfortable", "Cute Designs", "Safe Fabrics"],
    },
    {
      icon: Wrench,
      title: "Alterations",
      description: "Expert alterations for all types of garments. Perfect fit adjustments and repairs.",
      price: "₹200 - ₹1,000",
      duration: "1-2 days",
      features: ["Quick Service", "Expert Work", "All Garments", "Affordable"],
    },
  ],
  te: [
    {
      icon: Crown,
      title: "బ్రైడల్ లెహెంగాలు",
      description: "హెవీ ఎంబ్రాయిడరీ, జర్దోజీ వర్క్ మరియు కస్టమ్ డిజైన్‌లతో పూర్తి బ్రైడల్ లెహెంగా సెట్‌లు. మీ ప్రత్యేక రోజుకు సరిపోతుంది.",
      price: "₹15,000 - ₹1,00,000",
      duration: "4-6 వారాలు",
      features: ["కస్టమ్ డిజైన్", "ప్రీమియం ఫ్యాబ్రిక్స్", "హెవీ ఎంబ్రాయిడరీ", "మల్టిపుల్ ఫిట్టింగ్‌లు"],
    },
    {
      icon: Sparkles,
      title: "డిజైనర్ బ్లౌజ్‌లు",
      description: "సంక్లిష్టమైన ప్యాటర్న్‌లు, పర్ఫెక్ట్ ఫిట్ మరియు ఆధునిక లేదా సాంప్రదాయ డిజైన్‌లతో అద్భుతమైన డిజైనర్ బ్లౌజ్‌లు.",
      price: "₹1,500 - ₹15,000",
      duration: "1-2 వారాలు",
      features: ["కస్టమ్ ప్యాటర్న్‌లు", "పర్ఫెక్ట్ ఫిట్", "ఎంబ్రాయిడరీ ఆప్షన్‌లు", "మ్యాచింగ్ వర్క్"],
    },
    {
      icon: Flower2,
      title: "పార్టీ వేర్ గౌన్లు",
      description: "పార్టీలు, రిసెప్షన్లు మరియు ప్రత్యేక సందర్భాల కోసం ఎలిగెంట్ గౌన్లు. వెస్ట్రన్ మరియు ఇండో-వెస్ట్రన్ స్టైల్స్.",
      price: "₹8,000 - ₹50,000",
      duration: "2-3 వారాలు",
      features: ["మోడర్న్ డిజైన్‌లు", "ప్రీమియం మెటీరియల్స్", "కస్టమ్ స్టైలింగ్", "అల్టరేషన్ సపోర్ట్"],
    },
    {
      icon: Scissors,
      title: "చీర బ్లౌజ్‌లు",
      description: "సాంప్రదాయ మరియు ఆధునిక చీర బ్లౌజ్‌లు. మీ చీరకు సరిపోయేలా ప్లెయిన్, ఎంబ్రాయిడరీ లేదా హెవీ వర్క్.",
      price: "₹800 - ₹5,000",
      duration: "3-5 రోజులు",
      features: ["త్వరిత డెలివరీ", "ప్యాటర్న్ మ్యాచింగ్", "బ్యాక్ డిజైన్ ఆప్షన్‌లు", "పైపింగ్ వర్క్"],
    },
    {
      icon: Shirt,
      title: "కుర్తీలు & సూట్లు",
      description: "సౌకర్యవంతమైన రోజువారీ వేర్ కుర్తీలు మరియు సల్వార్ సూట్లు. సింపుల్ స్టిచింగ్ నుండి డిజైనర్ ప్యాటర్న్‌ల వరకు.",
      price: "₹500 - ₹3,000",
      duration: "2-4 రోజులు",
      features: ["కంఫర్ట్ ఫిట్", "వివిధ స్టైల్స్", "అందుబాటులో", "త్వరిత టర్నరౌండ్"],
    },
    {
      icon: Baby,
      title: "కిడ్స్ వేర్",
      description: "పిల్లల కోసం క్యూట్ మరియు కంఫర్టబుల్ దుస్తులు. చిన్నవారి కోసం లెహెంగాలు, ఫ్రాక్స్ మరియు సాంప్రదాయ దుస్తులు.",
      price: "₹500 - ₹5,000",
      duration: "3-5 రోజులు",
      features: ["చైల్డ్-ఫ్రెండ్లీ", "కంఫర్టబుల్", "క్యూట్ డిజైన్‌లు", "సేఫ్ ఫ్యాబ్రిక్స్"],
    },
    {
      icon: Wrench,
      title: "అల్టరేషన్లు",
      description: "అన్ని రకాల దుస్తులకు నిపుణుల అల్టరేషన్లు. పర్ఫెక్ట్ ఫిట్ సర్దుబాట్లు మరియు మరమ్మతులు.",
      price: "₹200 - ₹1,000",
      duration: "1-2 రోజులు",
      features: ["త్వరిత సేవ", "నిపుణుల పని", "అన్ని దుస్తులు", "అందుబాటులో"],
    },
  ],
};

const pageContent = {
  en: {
    subtitle: "Our Expertise",
    title: "Tailoring Services",
    description: "From bridal elegance to everyday comfort, we craft every stitch with love and precision.",
    price: "Price Range",
    duration: "Delivery Time",
    cta: "Book This Service",
  },
  te: {
    subtitle: "మా నైపుణ్యం",
    title: "టైలరింగ్ సేవలు",
    description: "బ్రైడల్ ఎలిగెన్స్ నుండి రోజువారీ సౌకర్యం వరకు, మేము ప్రతి కుట్టును ప్రేమ మరియు ఖచ్చితత్వంతో తయారు చేస్తాము.",
    price: "ధర పరిధి",
    duration: "డెలివరీ సమయం",
    cta: "ఈ సేవను బుక్ చేయండి",
  },
};

const Services = () => {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const t = pageContent[language];
  const servicesList = services[language];

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/50 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium mb-2">{t.subtitle}</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, index) => (
              <Card key={index} variant="gold" className="group hover-lift">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* Price & Duration */}
                  <div className="border-t border-border/50 pt-4 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t.price}:</span>
                      <span className="text-accent font-semibold">{service.price}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">{t.duration}:</span>
                      <span className="text-foreground">{service.duration}</span>
                    </div>
                  </div>
                  
                  <Link to="/booking">
                    <Button variant="gold-outline" className="w-full">
                      <MessageCircle className="w-4 h-4" />
                      {t.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
