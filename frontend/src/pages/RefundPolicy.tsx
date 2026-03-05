import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { BadgeIndianRupee } from "lucide-react";

const pageContent = {
  en: {
    title: "Refund Policy",
    subtitle: "Understanding our returns and cancellation process",
    lastUpdated: "Last updated: October 2023",
    sections: [
      {
        heading: "1. Custom Tailoring Returns",
        body: "Because custom tailoring involves garments cut and stitched precisely to a customer's unique body measurements and design choices, we do not offer direct refunds or returns on any tailored apparel. Once a garment has been cut, the order cannot be completely canceled.",
      },
      {
        heading: "2. Alteration Guarantee",
        body: "If a custom-made outfit does not fit perfectly due to an error on our part regarding the initial measurements, we offer complimentary alterations within 14 days of delivery. The outfit must be unwashed, unworn (besides fitting), and in its original condition.",
      },
      {
        heading: "3. Store Item Returns",
        body: "Ready-made products such as bangles, earrings, and beauty items may not be returned after purchase, provided they are in their original packaging, unused, and accompanied by the receipt. For hygiene reasons, cosmetics and pierced earrings are completely non-returnable once opened.",
      },
      {
        heading: "4. Cancellation Policy",
        body: "If you wish to cancel a tailoring order, you must do so within 24 hours of placing the order (before the fabric is cut). For canceled orders within this timeframe, a full refund of any advance deposit will be processed. Any requests after the fabric has been cut or stitching has commenced will not be eligible for a refund.",
      },
      {
        heading: "5. Contacting Us For Refunds",
        body: "For all return or exchange inquiries, please visit our store in person with your receipt or contact us via WhatsApp: \nEmail: 9381487134pl@gmail.com \nPhone: +91 93814 87134",
      },
    ],
  },
  te: {
    title: "వాపసు విధానం (రీఫండ్)",
    subtitle: "రిటర్న్స్ మరియు క్యాన్సిలేషన్ల ప్రక్రియ అవగాహన",
    lastUpdated: "చివరిగా నవీకరించబడినది: అక్టోబర్ 2023",
    sections: [
      {
        heading: "1. కస్టమ్ టైలరింగ్ రిటర్న్‌లు",
        body: "కస్టమ్ టైలరింగ్‌లో కస్టమర్ యొక్క ప్రత్యేక శరీర కొలతలు మరియు డిజైన్ ఎంపికల ప్రకారం వస్త్రాలను కత్తిరించడం మరియు కుట్టడం జరుగుతుంది కాబట్టి, మేము ఏ కుట్టిన దుస్తులపైన ప్రత్యక్ష వాపసులను (రీఫండ్) ఆఫర్ చేయము. ఫాబ్రిక్ కటింగ్ పూర్తి అయిన తర్వాత ఆర్డర్ క్యాన్సల్ చేయబడదు.",
      },
      {
        heading: "2. అల్టరేషన్ గ్యారెంటీ",
        body: "ప్రాథమిక కొలతలలో మా వైపు నుండి జరిగిన లోపం కారణంగా కస్టమ్-మేడ్ దుస్తులు సరిగ్గా సరిపోకపోతే, డెలివరీ జరిగిన 14 రోజులలోపు ఉచిత అల్టరేషన్‌ను ఆఫర్ చేస్తాము. దుస్తులను ధరించకుండా మరియు ఉతకకుండా దాని అసలైన స్థితిలో ఉంచాలి.",
      },
      {
        heading: "3. స్టోర్ వస్తువుల రిటర్న్",
        body: "బ్యాంగిల్స్, చెవిపోగులు మరియు బ్యూటీ ఉత్పత్తులు వంటి రెడీమేడ్ వస్తువులు కొనుగోలు చేసిన తర్వాత సాధారణంగా తిరిగి తీసుకోబడవు. అవి తమ అసలు ప్యాకేజింగ్‌లో, ఉపయోగించకుండా ఉండి, రసీదు (receipt) తో పాటు ఉంటే మాత్రమే పరిగణించబడవచ్చు. పరిశుభ్రత కారణాల వల్ల, కాస్మెటిక్స్ మరియు చెవులకు పొడిచే చెవిపోగులు ఒకసారి తెరిచిన తర్వాత పూర్తిగా తిరిగి స్వీకరించబడవు.",
      },
      {
        heading: "4. క్యాన్సిలేషన్ విధానం",
        body: "మీరు టైలరింగ్ ఆర్డర్‌ను రద్దు చేయాలనుకుంటే, ఆర్డర్ చేసిన 24 గంటలలోపు (ఫాబ్రిక్ కత్తిరించక ముందు) చేయాలి. ఈ సమయం లోపల క్యాన్సల్ చేసిన ఆర్డర్‌లకు అడ్వాన్స్ మొత్తాన్ని పూర్తిగా రీఫండ్ చేస్తాము. ఫాబ్రిక్ కట్ చేసిన తర్వాత లేదా కుట్టడం ప్రారంభించిన తర్వాత, రీఫండ్‌కు అర్హత ఉండదు.",
      },
      {
        heading: "5. విచారణలు కొరకు",
        body: "అన్ని రిటర్న్ లేదా ఎక్స్ఛేంజ్ విచారణల కోసం, దయచేసి మీ రసీదుతో వ్యక్తిగతంగా మా దుకాణాన్ని సందర్శించండి లేదా WhatsApp ద్వారా సంప్రదించండి: \nఇమెయిల్: 9381487134pl@gmail.com \nఫోన్: +91 93814 87134",
      },
    ],
  },
};

const RefundPolicy = () => {
  const { language, setLanguage } = useLanguage();
  const t = pageContent[language];

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <section className="pt-24 pb-12 md:pt-40 md:pb-16 relative min-h-screen bg-background">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-maroon/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-accent/20">
              <BadgeIndianRupee className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-2">{t.subtitle}</p>
            <p className="text-xs text-muted-foreground/60">{t.lastUpdated}</p>
          </div>

          <div className="bg-card/90 backdrop-blur-2xl border border-border/50 rounded-2xl p-6 md:p-10 shadow-card space-y-8 relative overflow-hidden">
            {t.sections.map((section, index) => (
              <div key={index} className="space-y-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center text-sm border-2 border-border/50 shadow-sm">
                    {index + 1}
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground border-b border-border/30 pb-2 flex-grow">
                    {section.heading.replace(/^\d+\.\s*/, "")}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line pl-11">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefundPolicy;
