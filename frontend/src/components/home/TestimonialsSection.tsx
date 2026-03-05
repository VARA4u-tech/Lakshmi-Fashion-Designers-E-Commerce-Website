import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TestimonialsSectionProps {
  language: "en" | "te";
}

const testimonials = [
  {
    id: 1,
    name: { en: "syamala", te: "శ్యమాల" },
    text: {
      en: "Lakshmi Fashion made my bridal lehenga exactly as I dreamed. The attention to detail was incredible!",
      te: "లక్ష్మి ఫ్యాషన్ నా బ్రైడల్ లెహెంగాను నేను కలలు కన్నట్లుగానే తయారు చేసింది. వివరాలపై శ్రద్ధ అద్భుతం!",
    },
    rating: 5,
    type: { en: "Bridal Customer", te: "బ్రైడల్ కస్టమర్" },
  },
  {
    id: 2,
    name: { en: "Ammaji", te: "అమ్మజి" },
    text: {
      en: "Best tailoring shop in the city! They understand exactly what you want and deliver perfection.",
      te: "నగరంలో అత్యుత్తమ టైలరింగ్ షాప్! మీకు ఏమి కావాలో వారు సరిగ్గా అర్థం చేసుకుంటారు.",
    },
    rating: 5,
    type: { en: "Regular Customer", te: "రెగ్యులర్ కస్టమర్" },
  },
  {
    id: 3,
    name: { en: "kala", te: "కలా" },
    text: {
      en: "I've been getting all my blouses stitched here for 5 years. Consistent quality every time!",
      te: "నేను 5 సంవత్సరాలుగా ఇక్కడ నా అన్ని బ్లౌజ్‌లను కుట్టించుకుంటున్నాను. ప్రతిసారి స్థిరమైన నాణ్యత!",
    },
    rating: 5,
    type: { en: "Loyal Customer", te: "నమ్మకమైన కస్టమర్" },
  },
  {
    id: 4,
    name: { en: "Lavnaya", te: "లవన్యా" },
    text: {
      en: "The designer blouses are absolutely stunning! Perfect fit and beautiful embroidery work.",
      te: "డిజైనర్ బ్లౌజ్‌లు పూర్తిగా అద్భుతంగా ఉన్నాయి! పర్ఫెక్ట్ ఫిట్ మరియు అందమైన ఎంబ్రాయిడరీ పని.",
    },
    rating: 5,
    type: { en: "Fashion Enthusiast", te: "ఫ్యాషన్ ఔత్సాహికురాలు" },
  },
  {
    id: 5,
    name: { en: "Meera Krishna", te: "మీరా కృష్ణ" },
    text: {
      en: "Excellent service and beautiful designs. They made my daughter's wedding outfit perfect!",
      te: "అద్భుతమైన సేవ మరియు అందమైన డిజైన్లు. వారు నా కూతురి పెళ్లి దుస్తులను పర్ఫెక్ట్ గా చేశారు!",
    },
    rating: 5,
    type: { en: "Happy Mother", te: "సంతోషకరమైన తల్లి" },
  },
];

const sectionContent = {
  en: {
    subtitle: "Testimonials",
    title: "What Our Customers Say",
    description: "Join thousands of happy customers who trust us with their special occasions.",
  },
  te: {
    subtitle: "టెస్టిమోనియల్స్",
    title: "మా కస్టమర్లు ఏమి చెప్తున్నారు",
    description: "తమ ప్రత్యేక సందర్భాలకు మమ్మల్ని విశ్వసించే వేలాది సంతోషకరమైన కస్టమర్లలో చేరండి.",
  },
};

export function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const t = sectionContent[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Get visible testimonials (current and next 2 on desktop)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-medium mb-2">{t.subtitle}</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hidden md:flex"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hidden md:flex"
            onClick={handleNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Testimonials - Show 1 on mobile, 3 on desktop */}
          <div className="overflow-hidden">
            {/* Mobile View - Single Card */}
            <div className="md:hidden">
              <Card variant="glass" className="relative">
                <CardContent className="p-6">
                  <Quote className="w-10 h-10 text-accent/30 mb-4" />

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-foreground/90 mb-6 leading-relaxed">
                    "{testimonials[currentIndex].text[language]}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-semibold">
                        {testimonials[currentIndex].name[language].charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonials[currentIndex].name[language]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].type[language]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Desktop View - Three Cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 transition-all duration-500">
              {getVisibleTestimonials().map((testimonial, idx) => (
                <Card
                  key={testimonial.id}
                  variant="glass"
                  className={`relative transition-all duration-500 ${
                    idx === 0 ? "scale-105 shadow-xl" : "scale-95 opacity-75"
                  }`}
                >
                  <CardContent className="p-6">
                    <Quote className="w-10 h-10 text-accent/30 mb-4" />

                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>

                    <p className="text-foreground/90 mb-6 leading-relaxed">
                      "{testimonial.text[language]}"
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-semibold">
                          {testimonial.name[language].charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.name[language]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.type[language]}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-accent w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
