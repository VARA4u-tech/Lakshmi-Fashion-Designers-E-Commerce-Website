import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface FeaturedWorkProps {
  language: "en" | "te";
}

const content = {
  en: {
    subtitle: "Our Portfolio",
    title: "Featured Work",
    description: "Explore our finest creations and see the artistry in every stitch.",
    categories: ["All", "Bridal", "Blouses", "Gowns", "Lehengas"],
    viewAll: "View Gallery",
  },
  te: {
    subtitle: "మా పోర్ట్‌ఫోలియో",
    title: "ఫీచర్డ్ వర్క్",
    description: "మా అత్యుత్తమ సృష్టులను అన్వేషించండి మరియు ప్రతి కుట్టులో కళను చూడండి.",
    categories: ["అన్నీ", "బ్రైడల్", "బ్లౌజ్‌లు", "గౌన్లు", "లెహెంగాలు"],
    viewAll: "గ్యాలరీ చూడండి",
  },
};

// Sample featured work data (replace with actual images)
const featuredWorks = [
  {
    id: 1,
    category: "Bridal",
    image: "https://i.ibb.co/xKHL2ZBk/IMG-20251207-WA0025.jpg",
    title: { en: "Royal Bridal Saree Work", te: "రాయల్ బ్రైడల్ సారీ వర్క్" },
  },
  {
    id: 2,
    category: "Blouses",
    image: "https://i.ibb.co/zWgGwhDp/download-2.jpg",
    title: { en: "Designer Blouse", te: "డిజైనర్ బ్లౌజ్" },
  },
  {
    id: 3,
    category: "Gowns",
    image: "https://i.ibb.co/PGdb5qWZ/image00002-16.webp",
    title: { en: "Evening Gown", te: "ఈవినింగ్ గౌన్" },
  },
  {
    id: 4,
    category: "Lehengas",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&h=1000&fit=crop",
    title: { en: "Party Lehenga", te: "పార్టీ లెహెంగా" },
  },
  {
    id: 5,
    category: "Bridal",
    image: "https://i.ibb.co/WWTV7dmM/download-3.jpg",
    title: { en: "Traditional Bridal", te: "సాంప్రదాయ బ్రైడల్" },
  },
  {
    id: 6,
    category: "Blouses",
    image: "https://i.ibb.co/WRvfgjt/IMG-20251207-WA0020.jpg",
    title: { en: "Embroidered Blouse", te: "ఎంబ్రాయిడరీ బ్లౌజ్" },
  },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

// ... existing imports ...

export function FeaturedWork({ language }: FeaturedWorkProps) {
  const t = content[language];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredWorks =
    selectedCategory === "All" || selectedCategory === "అన్నీ"
      ? featuredWorks
      : featuredWorks.filter((work) => work.category === selectedCategory);

  const handlePrevImage = () => {
    if (lightboxImage !== null) {
      const currentIndex = featuredWorks.findIndex((w) => w.id === lightboxImage);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : featuredWorks.length - 1;
      setLightboxImage(featuredWorks[prevIndex].id);
    }
  };

  const handleNextImage = () => {
    if (lightboxImage !== null) {
      const currentIndex = featuredWorks.findIndex((w) => w.id === lightboxImage);
      const nextIndex = currentIndex < featuredWorks.length - 1 ? currentIndex + 1 : 0;
      setLightboxImage(featuredWorks[nextIndex].id);
    }
  };

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-maroon-dark/10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.6} width="100%">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-accent font-medium mb-2">{t.subtitle}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h2>
            <p className="text-muted-foreground">{t.description}</p>
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal direction="up" delay={0.2} duration={0.6}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {t.categories.map((category, index) => (
              <Button
                key={index}
                variant={
                  selectedCategory === category ||
                  (selectedCategory === "All" && category === "అన్నీ")
                    ? "gold"
                    : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-8">
          {filteredWorks.map((work, index) => (
            <ScrollReveal
              key={work.id}
              direction="up"
              delay={index * 0.1}
              duration={0.5}
              width="100%"
            >
              <Card
                className="group relative overflow-hidden cursor-pointer hover-lift aspect-[3/4]"
                onClick={() => setLightboxImage(work.id)}
              >
                <img
                  src={work.image}
                  alt={work.title[language]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/90 via-maroon-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading text-cream text-lg font-semibold">
                      {work.title[language]}
                    </h3>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal direction="up" delay={0.4} duration={0.6}>
          <div className="text-center">
            <Button variant="gold-outline" size="lg" asChild>
              <a href="/gallery">{t.viewAll}</a>
            </Button>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <img
            src={featuredWorks.find((w) => w.id === lightboxImage)?.image}
            alt="Featured work"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
