import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Loader2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface Product {
  id: string;
  name_en: string;
  name_te: string;
  category: string;
  category_te: string;
  price: number;
  image_url: string;
}

interface ProductsPreviewProps {
  language: "en" | "te";
}

const content = {
  en: {
    title: "New Collections",
    subtitle: "Just Arrived",
    description:
      "Explore our latest arrivals of designer fabrics and custom-tailored masterpieces.",
    viewAll: "Explore Collection",
    enquire: "View Details",
  },
  te: {
    title: "కొత్త సేకరణలు",
    subtitle: "ఇప్పుడే చేరుకున్నాయి",
    description:
      "డిజైనర్ ఫ్యాబ్రిక్స్ మరియు మా కస్టమ్-టైలర్డ్ మాస్టర్‌పీస్‌ల తాజా రాకను అన్వేషించండి.",
    viewAll: "అన్నీ చూడండి",
    enquire: "మరిన్ని వివరాలు",
  },
};

export function ProductsPreview({ language }: ProductsPreviewProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const t = content[language];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.products.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleWishlist = (p: Product) => {
    if (isInWishlist(p.id)) {
      removeFromWishlist(p.id);
      toast.info(language === "en" ? "Removed from wishlist" : "కోరికల జాబితా నుండి తీసివేయబడింది");
    } else {
      addToWishlist({
        id: p.id,
        type: "product",
        name: language === "en" ? p.name_en : p.name_te,
        image_url: p.image_url,
        category: language === "en" ? p.category : p.category_te,
      });
      toast.success(language === "en" ? "Added to wishlist" : "కోరికల జాబితాకు జోడించబడింది");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-secondary/5 relative overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -ml-32 -mt-32" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mb-32" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <ScrollReveal direction="left">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-accent" />
                <p className="text-accent font-medium uppercase tracking-widest text-xs">
                  {t.subtitle}
                </p>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 italic">{t.title}</h2>
              <p className="text-muted-foreground text-lg">{t.description}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <Link to="/products">
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white rounded-full group"
              >
                {t.viewAll}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} direction="up" delay={index * 0.1}>
              <Card className="group h-full overflow-hidden border-border/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 hover:-translate-y-2 bg-background flex flex-col">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={language === "en" ? product.name_en : product.name_te}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center translate-y-4 group-hover:translate-y-0 duration-300">
                    <Link to="/products">
                      <Button className="bg-white text-black hover:bg-white/90">{t.enquire}</Button>
                    </Link>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-20 ${
                      isInWishlist(product.id)
                        ? "bg-accent text-accent-foreground shadow-lg scale-110 opacity-100"
                        : "bg-background/60 backdrop-blur-md text-accent hover:bg-accent hover:text-white opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                    />
                  </button>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-accent text-white border-none text-[10px] uppercase font-bold">
                      {language === "en" ? product.category : product.category_te}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-accent transition-colors">
                      {language === "en" ? product.name_en : product.name_te}
                    </h3>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[10px] uppercase text-muted-foreground font-medium tracking-wider">
                      New Arrival
                    </span>
                    <ShoppingBag className="w-4 h-4 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
