import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, addDays, isSunday } from "date-fns";
import { CalendarIcon, Clock, User, Phone, Scissors, MessageCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const services = {
  en: [
    { id: "bridal", name: "Bridal Lehenga", duration: "60 min" },
    { id: "blouse", name: "Designer Blouse", duration: "30 min" },
    { id: "gown", name: "Party Gown", duration: "45 min" },
    { id: "saree-blouse", name: "Saree Blouse", duration: "20 min" },
    { id: "kurti", name: "Kurti/Suit", duration: "20 min" },
    { id: "alteration", name: "Alterations", duration: "15 min" },
    { id: "consultation", name: "Design Consultation", duration: "30 min" },
  ],
  te: [
    { id: "bridal", name: "బ్రైడల్ లెహెంగా", duration: "60 నిమి" },
    { id: "blouse", name: "డిజైనర్ బ్లౌజ్", duration: "30 నిమి" },
    { id: "gown", name: "పార్టీ గౌన్", duration: "45 నిమి" },
    { id: "saree-blouse", name: "చీర బ్లౌజ్", duration: "20 నిమి" },
    { id: "kurti", name: "కుర్తీ/సూట్", duration: "20 నిమి" },
    { id: "alteration", name: "అల్టరేషన్లు", duration: "15 నిమి" },
    { id: "consultation", name: "డిజైన్ కన్సల్టేషన్", duration: "30 నిమి" },
  ],
};

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM"
];

const pageContent = {
  en: {
    subtitle: "Schedule a Visit",
    title: "Book Appointment",
    description: "Book your fitting, consultation, or measurement session. We'll confirm your appointment via WhatsApp.",
    steps: {
      service: "Select Service",
      date: "Choose Date",
      time: "Pick Time",
      details: "Your Details",
    },
    form: {
      service: "Service Type",
      selectService: "Select a service",
      date: "Appointment Date",
      selectDate: "Select a date",
      time: "Time Slot",
      selectTime: "Select a time",
      name: "Your Name",
      namePlaceholder: "Enter your full name",
      phone: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      notes: "Special Requests (Optional)",
      notesPlaceholder: "Any specific requirements or notes...",
    },
    cta: "Book via WhatsApp",
    booking: "Sending...",
    closedSunday: "Closed on Sundays",
    success: "Booking request sent! Check WhatsApp to confirm.",
    validation: {
      service: "Please select a service",
      date: "Please select a date",
      time: "Please select a time slot",
      name: "Please enter your name",
      phone: "Please enter your phone number",
    },
  },
  te: {
    subtitle: "సందర్శనను షెడ్యూల్ చేయండి",
    title: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    description: "మీ ఫిట్టింగ్, కన్సల్టేషన్ లేదా మెజర్‌మెంట్ సెషన్‌ను బుక్ చేయండి. మేము మీ అపాయింట్‌మెంట్‌ను WhatsApp ద్వారా నిర్ధారిస్తాము.",
    steps: {
      service: "సేవను ఎంచుకోండి",
      date: "తేదీని ఎంచుకోండి",
      time: "సమయాన్ని ఎంచుకోండి",
      details: "మీ వివరాలు",
    },
    form: {
      service: "సేవ రకం",
      selectService: "సేవను ఎంచుకోండి",
      date: "అపాయింట్‌మెంట్ తేదీ",
      selectDate: "తేదీని ఎంచుకోండి",
      time: "సమయ స్లాట్",
      selectTime: "సమయాన్ని ఎంచుకోండి",
      name: "మీ పేరు",
      namePlaceholder: "మీ పూర్తి పేరును నమోదు చేయండి",
      phone: "ఫోన్ నంబర్",
      phonePlaceholder: "మీ ఫోన్ నంబర్‌ను నమోదు చేయండి",
      notes: "ప్రత్యేక అభ్యర్థనలు (ఐచ్ఛికం)",
      notesPlaceholder: "ఏదైనా నిర్దిష్ట అవసరాలు లేదా గమనికలు...",
    },
    cta: "WhatsApp ద్వారా బుక్ చేయండి",
    booking: "పంపుతోంది...",
    closedSunday: "ఆదివారం క్లోజ్డ్",
    success: "బుకింగ్ అభ్యర్థన పంపబడింది! నిర్ధారించడానికి WhatsApp చెక్ చేయండి.",
    validation: {
      service: "దయచేసి సేవను ఎంచుకోండి",
      date: "దయచేసి తేదీని ఎంచుకోండి",
      time: "దయచేసి సమయ స్లాట్‌ను ఎంచుకోండి",
      name: "దయచేసి మీ పేరును నమోదు చేయండి",
      phone: "దయచేసి మీ ఫోన్ నంబర్‌ను నమోదు చేయండి",
    },
  },
};

const Booking = () => {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: "",
  });
  const { toast } = useToast();
  const t = pageContent[language];
  const serviceList = services[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedService) {
      toast({ title: t.validation.service, variant: "destructive" });
      return;
    }
    if (!selectedDate) {
      toast({ title: t.validation.date, variant: "destructive" });
      return;
    }
    if (!selectedTime) {
      toast({ title: t.validation.time, variant: "destructive" });
      return;
    }
    if (!formData.name.trim()) {
      toast({ title: t.validation.name, variant: "destructive" });
      return;
    }
    if (!formData.phone.trim()) {
      toast({ title: t.validation.phone, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const serviceName = serviceList.find(s => s.id === selectedService)?.name || selectedService;
    const formattedDate = format(selectedDate, "EEEE, MMMM d, yyyy");
    
    const message = `🗓️ *NEW APPOINTMENT BOOKING*

📋 *Service:* ${serviceName}
📅 *Date:* ${formattedDate}
⏰ *Time:* ${selectedTime}

👤 *Customer Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
${formData.notes ? `• Notes: ${formData.notes}` : ""}

---
_Sent from Lakshmi Fashion & Designers Website_`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, "_blank");

    toast({
      title: language === "en" ? "Success!" : "విజయం!",
      description: t.success,
    });

    // Reset form
    setSelectedService("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setFormData({ name: "", phone: "", notes: "" });
    setIsSubmitting(false);
  };

  const disabledDays = (date: Date) => {
    // Disable past dates and Sundays
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isSunday(date);
  };

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative">
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

      {/* Booking Form */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Step 1: Service Selection */}
                <Card variant="gold">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <Scissors className="w-4 h-4 text-accent" />
                      </div>
                      {t.steps.service}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="w-full bg-input border-border">
                        <SelectValue placeholder={t.form.selectService} />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceList.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            <div className="flex items-center justify-between w-full gap-4">
                              <span>{service.name}</span>
                              <span className="text-muted-foreground text-sm">
                                ({service.duration})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Step 2: Date Selection */}
                <Card variant="gold">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <CalendarIcon className="w-4 h-4 text-accent" />
                      </div>
                      {t.steps.date}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-input border-border",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "EEEE, MMMM d, yyyy")
                          ) : (
                            <span>{t.form.selectDate}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={disabledDays}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                          fromDate={new Date()}
                          toDate={addDays(new Date(), 60)}
                        />
                        <p className="px-4 pb-3 text-xs text-muted-foreground">
                          * {t.closedSunday}
                        </p>
                      </PopoverContent>
                    </Popover>
                  </CardContent>
                </Card>

                {/* Step 3: Time Selection */}
                <Card variant="gold">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-accent" />
                      </div>
                      {t.steps.time}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                            selectedTime === time
                              ? "bg-accent text-accent-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Step 4: Customer Details */}
                <Card variant="gold">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-accent" />
                      </div>
                      {t.steps.details}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.form.name}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.form.namePlaceholder}
                        className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.form.phone}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.form.phonePlaceholder}
                          className="w-full pl-12 pr-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-foreground"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.form.notes}
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder={t.form.notesPlaceholder}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-foreground resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="whatsapp"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t.booking
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      {t.cta}
                    </>
                  )}
                </Button>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>{language === "en" ? "Instant Confirmation" : "తక్షణ నిర్ధారణ"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>{language === "en" ? "Free Consultation" : "ఉచిత సంప్రదింపు"}</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
