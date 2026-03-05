import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface ProductsPreviewProps {
  language: "en" | "te";
}

const products = [
  {
    id: 1,
    name: { en: "Traditional Jhumkas", te: "సాంప్రదాయ జుమ్కాలు" },
    category: { en: "Earrings", te: "చెవి పోగులు" },
    price: 850,
    image: "https://i.ibb.co/zhxJ9ZYQ/IMG-20251207-WA0032.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: { en: "saree linings", te: "సారీ లింగీంగ్" },
    category: { en: "linings", te: "లింగీంగ్" },
    price: 2500,
    image: "https://i.ibb.co/zhGJNkSG/handbag-linings.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: { en: "Handmade Bangles", te: "హాండ్ మెడ్ బ్యాగ్" },
    category: { en: "Handmade Bangles", te: "హాండ్ మెడ్ బ్యాగ్" },
    price: 1800,
    image: "https://i.ibb.co/wZg22x5k/IMG-20251207-WA0002.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: { en: "Gold Bangles Set", te: "గోల్డ్ గాజుల సెట్" },
    category: { en: "Bangles", te: "గాజులు" },
    price: 3200,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    inStock: false,
  },
];

const sectionContent = {
  en: {
    subtitle: "Fancy Store",
    title: "Beautiful Accessories",
    description:
      "Complete your look with our curated collection of jewelry, bangles, and fashion accessories.",
    cta: "Explore All Products",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
  },
  te: {
    subtitle: "ఫ్యాన్సీ స్టోర్",
    title: "అందమైన యాక్సెసరీలు",
    description:
      "మా క్యూరేటెడ్ జ్యువెలరీ, బ్యాగులు మరియు ఫ్యాషన్ యాక్సెసరీల సేకరణతో మీ లుక్పు పూర్తి చేయండి.",
    cta: "అన్ని ప్రొడక్ట్‌లను ప్రోదేశించండి",
    inStock: "స్టాక్‌లో ఉంది",
    outOfStock: "స్టాక్ అయిపోయింది",
  },
};

import { ScrollReveal } from "@/components/ui/ScrollReveal";

// ... existing imports ...

export function ProductsPreview({ language }: ProductsPreviewProps) {
  const t = sectionContent[language];

  return (
    <section className="py-12 md:py-20 bg-secondary/30 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.6} width="100%">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-accent font-medium mb-2">{t.subtitle}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h2>
            <p className="text-muted-foreground">{t.description}</p>
          </div>
        </ScrollReveal>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ScrollReveal
              key={product.id}
              direction="up"
              delay={index * 0.1}
              duration={0.5}
              width="100%"
            >
              <Card variant="elevated" className="group overflow-hidden hover-lift h-full">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Stock Badge */}
                  <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {product.inStock ? t.inStock : t.outOfStock}
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-accent text-xs font-medium mb-1">
                    {product.category[language]}
                  </p>
                  <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-1">
                    {product.name[language]}
                  </h3>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.4} duration={0.6}>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="gold" size="lg">
                <ShoppingBag className="w-4 h-4 mr-2" />
                {t.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
