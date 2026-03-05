import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Award, Heart, Clock, Users, Scissors, Star } from "lucide-react";

const content = {
  en: {
    pageTitle: "About Us",
    subtitle: "Our Story",
    title: "20+ Years of Fashion Excellence",
    intro:
      "Lakshmi Fashion & Designers was founded with a simple vision: to make every woman feel beautiful and confident in her attire. What started as a small tailoring shop has grown into one of the most trusted names in women's fashion in Vijayawada.",
    storyTitle: "Our Journey",
    story: [
      "Started in 2004 with a passion for perfect stitching and attention to detail.",
      "Expanded to include designer blouses and bridal wear in 2016.",
      "Opened our fancy store section with curated accessories in 2018.",
      "Served over 5000+ happy customers and counting.",
      "Now a one-stop destination for all women's fashion needs.",
    ],
    valuesTitle: "Our Values",
    values: [
      {
        icon: Heart,
        title: "Customer First",
        description:
          "Your satisfaction is our top priority. We listen, understand, and deliver exactly what you envision.",
      },
      {
        icon: Award,
        title: "Quality Craftsmanship",
        description:
          "Every stitch is made with precision. We use only premium materials and time-tested techniques.",
      },
      {
        icon: Clock,
        title: "Timely Delivery",
        description:
          "We understand the importance of your special occasions. Your outfit will be ready when promised.",
      },
      {
        icon: Users,
        title: "Women's Comfort",
        description:
          "Our space is designed for women by women. Feel comfortable during all fittings and consultations.",
      },
    ],
    milestones: [
      { number: "20+", label: "Years Experience" },
      { number: "5000+", label: "Happy Customers" },
      { number: "1000+", label: "Bridal Outfits" },
      { number: "50+", label: "Design Patterns" },
    ],
  },
  te: {
    pageTitle: "మా గురించి",
    subtitle: "మా కథ",
    title: "20+ సంవత్సరాల ఫ్యాషన్ శ్రేష్ఠత",
    intro:
      "లక్ష్మి ఫ్యాషన్ & డిజైనర్స్ ఒక సాధారణ దృష్టితో స్థాపించబడింది: ప్రతి స్త్రీని తన దుస్తులలో అందంగా మరియు నమ్మకంగా అనుభవించేలా చేయడం. చిన్న టైలరింగ్ షాప్‌గా ప్రారంభమైనది విజయవాడలో మహిళల ఫ్యాషన్‌లో అత్యంత విశ్వసనీయ పేర్లలో ఒకటిగా మారింది.",
    storyTitle: "మా ప్రయాణం",
    story: [
      "2004లో పర్ఫెక్ట్ స్టిచింగ్ మరియు వివరాలపై శ్రద్ధతో ప్రారంభించాము.",
      "2016లో డిజైనర్ బ్లౌజ్‌లు మరియు బ్రైడల్ వేర్‌ను చేర్చడానికి విస్తరించాము.",
      "2018లో క్యూరేటెడ్ యాక్సెసరీలతో మా ఫ్యాన్సీ స్టోర్ సెక్షన్‌ను ప్రారంభించాము.",
      "5000+ సంతోషకరమైన కస్టమర్లకు సేవ చేసాము.",
      "ఇప్పుడు అన్ని మహిళల ఫ్యాషన్ అవసరాలకు వన్-స్టాప్ గమ్యస్థానం.",
    ],
    valuesTitle: "మా విలువలు",
    values: [
      {
        icon: Heart,
        title: "కస్టమర్ మొదట",
        description:
          "మీ సంతృప్తి మా అగ్ర ప్రాధాన్యత. మేము వింటాము, అర్థం చేసుకుంటాము మరియు మీరు ఊహించినది ఖచ్చితంగా అందిస్తాము.",
      },
      {
        icon: Award,
        title: "నాణ్యమైన క్రాఫ్ట్‌మాన్‌షిప్",
        description:
          "ప్రతి కుట్టు ఖచ్చితత్వంతో చేయబడుతుంది. మేము ప్రీమియం మెటీరియల్స్ మరియు సమయ-పరీక్షించిన టెక్నిక్‌లను మాత్రమే ఉపయోగిస్తాము.",
      },
      {
        icon: Clock,
        title: "సమయానికి డెలివరీ",
        description:
          "మీ ప్రత్యేక సందర్భాల ప్రాముఖ్యతను మేము అర్థం చేసుకుంటాము. వాగ్దానం చేసినప్పుడు మీ దుస్తులు సిద్ధంగా ఉంటాయి.",
      },
      {
        icon: Users,
        title: "మహిళల సౌకర్యం",
        description:
          "మా స్థలం మహిళల కోసం మహిళలచే రూపొందించబడింది. అన్ని ఫిట్టింగ్‌లు మరియు సంప్రదింపుల సమయంలో సౌకర్యంగా అనుభవించండి.",
      },
    ],
    milestones: [
      { number: "20+", label: "సంవత్సరాల అనుభవం" },
      { number: "5000+", label: "సంతోషకరమైన కస్టమర్లు" },
      { number: "1000+", label: "బ్రైడల్ దుస్తులు" },
      { number: "50+", label: "డిజైన్ ప్యాటర్న్‌లు" },
    ],
  },
};

import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { language, setLanguage } = useLanguage();
  const t = content[language];

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/50 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium mb-2">{t.subtitle}</p>
            <h1 className="font-heading text-3xl md:text-6xl font-bold text-foreground mb-6">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.intro}</p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-12 bg-secondary/30 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.milestones.map((milestone, index) => (
              <div key={index} className="text-center">
                <p className="font-heading text-4xl md:text-5xl font-bold text-accent mb-2">
                  {milestone.number}
                </p>
                <p className="text-muted-foreground text-sm">{milestone.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t.storyTitle}
          </h2>
          <div className="max-w-2xl mx-auto">
            {t.story.map((item, index) => (
              <div key={index} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                  </div>
                  {index < t.story.length - 1 && <div className="w-0.5 flex-1 bg-accent/30 mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-foreground">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.values.map((value, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border/50 hover:border-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
