import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck } from "lucide-react";

const pageContent = {
  en: {
    title: "Privacy Policy",
    subtitle: "Your privacy is important to us",
    lastUpdated: "Last updated: October 2023",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "We collect information from you when you visit our store, register on our site, place an order, or subscribe to our newsletter. The collected information includes your name, email address, phone number, and mailing address. We may also safely record your sizing and measurement details to provide premium tailoring services.",
      },
      {
        heading: "2. How We Use Your Information",
        body: "Any of the information we collect from you may be used in one of the following ways: To personalize your experience, to improve our website, to improve customer service, to process transactions for tailoring and retail, and to send periodic emails or WhatsApp messages regarding your order status.",
      },
      {
        heading: "3. Information Protection",
        body: "We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.",
      },
      {
        heading: "4. Information Sharing",
        body: "We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.",
      },
      {
        heading: "5. Contact Us",
        body: "If there are any questions regarding this privacy policy, you may contact us using the information below: \nEmail: 9381487134pl@gmail.com \nPhone: +91 93814 87134",
      },
    ],
  },
  te: {
    title: "గోప్యతా విధానం",
    subtitle: "మీ గోప్యత మాకు ముఖ్యం",
    lastUpdated: "చివరిగా నవీకరించబడినది: అక్టోబర్ 2023",
    sections: [
      {
        heading: "1. మేము సేకరించే సమాచారం",
        body: "మీరు మా స్టోర్‌ను సందర్శించినప్పుడు, మా సైట్‌లో నమోదు చేసుకున్నప్పుడు, ఆర్డర్ చేసినప్పుడు లేదా మా వార్తాలేఖకు సభ్యత్వం పొందినప్పుడు మేము మీ నుండి సమాచారాన్ని సేకరిస్తాము. సేకరించిన సమాచారంలో మీ పేరు, ఇమెయిల్ చిరునామా, ఫోన్ నంబర్ మరియు మెయిలింగ్ చిరునామా ఉంటాయి. ప్రీమియం టైలరింగ్ సేవలను అందించడానికి మేము మీ సైజింగ్ మరియు కొలత వివరాలను కూడా సురక్షితంగా రికార్డ్ చేయవచ్చు.",
      },
      {
        heading: "2. మీ సమాచారాన్ని మేము ఎలా ఉపయోగిస్తాము",
        body: "మేము మీ నుండి సేకరించే ఏదైనా సమాచారం కింది మార్గాలలో ఒకదానిలో ఉపయోగించవచ్చు: మీ అనుభవాన్ని వ్యక్తిగతీకరించడానికి, మా వెబ్‌సైట్‌ను మెరుగుపరచడానికి, కస్టమర్ సేవను మెరుగుపరచడానికి, టైలరింగ్ మరియు రిటైల్ కోసం లావాదేవీలను ప్రాసెస్ చేయడానికి మరియు మీ ఆర్డర్ స్థితికి సంబంధించి ఆవర్తన ఇమెయిల్‌లు లేదా WhatsApp సందేశాలను పంపడానికి.",
      },
      {
        heading: "3. సమాచార రక్షణ",
        body: "మీరు ఆర్డర్ చేసినప్పుడు లేదా మీ వ్యక్తిగత సమాచారాన్ని నమోదు చేసినప్పుడు, సమర్పించినప్పుడు లేదా యాక్సెస్ చేసినప్పుడు మీ వ్యక్తిగత సమాచారం యొక్క భద్రతను నిర్వహించడానికి మేము పలు భద్రతా చర్యలను అమలు చేస్తాము.",
      },
      {
        heading: "4. సమాచార భాగస్వామ్యం",
        body: "మేము మీ వ్యక్తిగతంగా గుర్తించదగిన సమాచారాన్ని విక్రయించము, వ్యాపారం చేయము లేదా బయటి పక్షాలకు బదిలీ చేయము. ఇందులో మా వెబ్‌సైట్‌ను నిర్వహించడంలో, మా వ్యాపారాన్ని నిర్వహించడంలో లేదా మీకు సేవలందించడంలో మాకు సహాయపడే విశ్వసనీయ మూడవ పక్షాలు ఉండవు.",
      },
      {
        heading: "5. మమ్మల్ని సంప్రదించండి",
        body: "ఈ గోప్యతా విధానానికి సంబంధించి ఏవైనా ప్రశ్నలు ఉంటే, మీరు దిగువ సమాచారాన్ని ఉపయోగించి మమ్మల్ని సంప్రదించవచ్చు: \nఇమెయిల్: 9381487134pl@gmail.com \nఫోన్: +91 93814 87134",
      },
    ],
  },
};

const PrivacyPolicy = () => {
  const { language, setLanguage } = useLanguage();
  const t = pageContent[language];

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <section className="pt-24 pb-12 md:pt-40 md:pb-16 relative min-h-screen bg-background">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-maroon opacity-5 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-accent/20">
              <ShieldCheck className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-2">{t.subtitle}</p>
            <p className="text-xs text-muted-foreground/60">{t.lastUpdated}</p>
          </div>

          <div className="bg-card backdrop-blur-md border border-border/50 rounded-2xl p-6 md:p-10 shadow-elevated space-y-8">
            {t.sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground border-b border-border/50 pb-2">
                  {section.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
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

export default PrivacyPolicy;
