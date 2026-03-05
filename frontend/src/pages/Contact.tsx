import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, MapPin, Clock, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pageContent = {
  en: {
    subtitle: "Get in Touch",
    title: "Contact Us",
    description: "Have a question or want to book an appointment? We'd love to hear from you.",
    form: {
      name: "Your Name",
      phone: "Phone Number",
      message: "What do you need? (Blouse, Lehenga, etc.)",
      submit: "Send Message",
      sending: "Sending...",
    },
    info: {
      title: "Visit Our Store",
      address:
        "Old Check Post Center, Krishna Nagar, Yanamalakuduru Road, Near Commercial Tax Office, Vijayawada",
      phone: "+91 93814 87134",
      email: "9381487134pl@gmail.com",
      hours: "Monday - Saturday: 10 AM - 8 PM",
      closed: "Sunday: Closed",
    },
    whatsapp: "Chat on WhatsApp",
    call: "Call Now",
    success: "Message sent successfully! We'll get back to you soon.",
  },
  te: {
    subtitle: "సంప్రదించండి",
    title: "మమ్మల్ని సంప్రదించండి",
    description:
      "ఏదైనా ప్రశ్న ఉందా లేదా అపాయింట్‌మెంట్ బుక్ చేయాలనుకుంటున్నారా? మీ నుండి వినడానికి ఇష్టపడతాము.",
    form: {
      name: "మీ పేరు",
      phone: "ఫోన్ నంబర్",
      message: "మీకు ఏమి కావాలి? (బ్లౌజ్, లెహెంగా, మొదలైనవి)",
      submit: "మెసేజ్ పంపండి",
      sending: "పంపుతోంది...",
    },
    info: {
      title: "మా స్టోర్‌ను సందర్శించండి",
      address:
        "ఓల్డ్ చెక్ పోస్ట్ సెంటర్, కృష్ణ నగర్, యనమలకుదురు రోడ్, కమర్షియల్ టాక్స్ ఆఫీస్ దగ్గర, విజయవాడ",
      phone: "+91 93814 87134",
      email: "9381487134pl@gmail.com",
      hours: "సోమవారం - శనివారం: 10 AM - 8 PM",
      closed: "ఆదివారం: క్లోజ్డ్",
    },
    whatsapp: "WhatsApp లో చాట్ చేయండి",
    call: "ఇప్పుడు కాల్ చేయండి",
    success: "మెసేజ్ విజయవంతంగా పంపబడింది! మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాము.",
  },
};

import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { language, setLanguage } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();
  const t = pageContent[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Send via WhatsApp
    const whatsappMessage = `New Enquiry from Website:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/919381487134?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

    toast({
      title: language === "en" ? "Success!" : "విజయం!",
      description: t.success,
    });

    setFormData({ name: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919381487134?text=Hi! I'm interested in your tailoring services.",
      "_blank",
    );
  };

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      {/* Hero Section */}
      <section className="pt-24 pb-10 md:pt-32 md:pb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/50 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium mb-2">{t.subtitle}</p>
            <h1 className="font-heading text-3xl md:text-6xl font-bold text-foreground mb-6">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card variant="gold">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.form.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.form.message}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-foreground resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t.form.sending : t.form.submit}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card variant="glass">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                    {t.info.title}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{t.info.address}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                      <a
                        href="tel:+919381487134"
                        className="text-foreground hover:text-accent transition-colors"
                      >
                        {t.info.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                      <a
                        href="mailto:info@lakshmifashion.com"
                        className="text-foreground hover:text-accent transition-colors"
                      >
                        {t.info.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-foreground">{t.info.hours}</p>
                        <p className="text-muted-foreground">{t.info.closed}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="whatsapp" size="lg" className="w-full" onClick={handleWhatsApp}>
                  <MessageCircle className="w-5 h-5" />
                  {t.whatsapp}
                </Button>
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={() => (window.location.href = "tel:+919381487134")}
                >
                  <Phone className="w-5 h-5" />
                  {t.call}
                </Button>
              </div>

              {/* Map */}
              <Card variant="default" className="overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3825.725330251716!2d80.66871207514487!3d16.489439984252638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDI5JzIyLjAiTiA4MMKwNDAnMTYuNiJF!5e0!3m2!1sen!2sin!4v1765174658376!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
