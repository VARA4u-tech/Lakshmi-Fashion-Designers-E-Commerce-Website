import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollText } from "lucide-react";

const pageContent = {
  en: {
    title: "Terms of Service",
    subtitle: "Rules and guidelines for using our services",
    lastUpdated: "Last updated: October 2023",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing this website and utilizing our tailoring and store services, you accept and agree to be bound by the terms and provision of this agreement. Every time you purchase our products or use our tailoring facilities, you agree to abide by these guidelines.",
      },
      {
        heading: "2. Tailoring Services",
        body: "All measurements taken during fitting sessions are considered final. If subsequent adjustments are required due to changes in body size, they may incur an additional fee. Estimated turnaround times (e.g., 2 weeks for bridal wear) are estimates and may vary slightly during peak seasons or due to unforeseen availability of specific fabrics.",
      },
      {
        heading: "3. Pricing and Payments",
        body: "Prices for products and services are subject to change without notice. We reserve the right to modify or discontinue a service at any time. Advance payments are generally required for custom tailoring orders to secure the service order and cover initial fabric processing.",
      },
      {
        heading: "4. User Store Content",
        body: "The products displayed on the online portal are representations of our stock and designs. Slight differences in color, embroidery texture, or fabric fall may occur due to screen lighting and digital rendering. We guarantee high-quality craftsmanship to the best of our ability.",
      },
      {
        heading: "5. Contact & Support",
        body: "For questions about the Terms of Service, reach out to our team at \nEmail: 9381487134pl@gmail.com \nPhone: +91 93814 87134",
      },
    ],
  },
  te: {
    title: "సేవా నిబంధనలు",
    subtitle: "మా సేవలను ఉపయోగించడం కోసం నియమాలు మరియు మార్గదర్శకాలు",
    lastUpdated: "చివరిగా నవీకరించబడినది: అక్టోబర్ 2023",
    sections: [
      {
        heading: "1. షరతుల అంగీకారం",
        body: "ఈ వెబ్‌సైట్‌ను యాక్సెస్ చేయడం ద్వారా మరియు మా టైలరింగ్ మరియు స్టోర్ సేవలను ఉపయోగించడం ద్వారా, ఈ ఒప్పందంలోని నిబంధనలకు కట్టుబడి ఉండటానికి మీరు అంగీకరిస్తున్నారు. మీరు మా ఉత్పత్తులను కొనుగోలు చేసిన ప్రతిసారి లేదా టైలరింగ్ సౌకర్యాలను ఉపయోగించిన ప్రతిసారీ, ఈ మార్గదర్శకాలకు కట్టుబడి ఉండటానికి మీరు అంగీకరిస్తున్నారు.",
      },
      {
        heading: "2. టైలరింగ్ సేవలు",
        body: "ఫిట్టింగ్ సెషన్లలో తీసుకున్న అన్ని కొలతలు తుదిగా పరిగణించబడతాయి. శరీర పరిమాణంలో మార్పుల కారణంగా తదుపరి అల్టరేషన్లు అవసరమైతే, వాటికి అదనపు రుసుము చెల్లించాల్సి రావచ్చు. అంచనా వ్యవధి (ఉదా: పెళ్లి దుస్తుల కోసం 2 వారాలు) కేవలం అంచనాలు మాత్రమే మరియు పండుగ సమయాల్లో లేదా నిర్దిష్ట బట్టలు అందుబాటులో లేనందున మారవచ్చు.",
      },
      {
        heading: "3. ధర మరియు చెల్లింపులు",
        body: "ఉత్పత్తులు మరియు సేవల ధరలు ముందస్తు నోటీసు లేకుండానే మారవచ్చు. ఎప్పుడైనా సేవను సవరించే లేదా నిలిపివేసే హక్కు మాకు ఉంది. కస్టమ్ టైలరింగ్ ఆర్డర్‌ల కోసం సాధారణంగా సర్వీస్ ఆర్డర్‌ను సురక్షితం చేయడానికి మరియు ప్రాథమిక ఫాబ్రిక్ ప్రాసెసింగ్‌ను కవర్ చేయడానికి అడ్వాన్స్ చెల్లింపులు అవసరం.",
      },
      {
        heading: "4. యూజర్ స్టోర్ కంటెంట్",
        body: "ఆన్‌లైన్ పోర్టల్‌లో ప్రదర్శించబడే ఉత్పత్తులు మా స్టాక్ మరియు డిజైన్‌ల యొక్క ప్రతినిధులుగా ఉంటాయి. స్క్రీన్ లైటింగ్ మరియు డిజిటల్ రెండరింగ్ కారణంగా రంగు, ఎంబ్రాయిడరీ ఆకృతి లేదా ఫాబ్రిక్ ఫాల్‌లో స్వల్ప వ్యత్యాసాలు ఉండవచ్చు. మా అత్యుత్తమ సామర్థ్యంతో అధిక నాణ్యత గల హస్తకళకు మేము హామీ ఇస్తున్నాము.",
      },
      {
        heading: "5. సంప్రదించండి & మద్దతు",
        body: "సేవా నిబంధనల గురించి ప్రశ్నల కొరకు, మా బృందాన్ని సంప్రదించండి: \nఇమెయిల్: 9381487134pl@gmail.com \nఫోన్: +91 93814 87134",
      },
    ],
  },
};

const TermsOfService = () => {
  const { language, setLanguage } = useLanguage();
  const t = pageContent[language];

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <section className="pt-24 pb-12 md:pt-40 md:pb-16 relative min-h-screen bg-background">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial-gold opacity-[0.03] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-accent/20">
              <ScrollText className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-2">{t.subtitle}</p>
            <p className="text-xs text-muted-foreground/60">{t.lastUpdated}</p>
          </div>

          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 md:p-10 shadow-elevated space-y-8">
            {t.sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground border-b border-border/50 pb-2 flex items-center gap-2">
                  <span className="text-accent no-underline font-bold text-lg md:text-xl">§</span>
                  {section.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line pl-6">
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

export default TermsOfService;
