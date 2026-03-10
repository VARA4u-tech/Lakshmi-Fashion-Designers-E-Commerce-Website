import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, Filter, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Heart } from "lucide-react";

interface Product {
  id: string;
  name_en: string;
  name_te: string;
  category: string;
  category_te: string;
  price: number;
  image_url: string;
  in_stock: boolean;
}

const pageContent = {
  en: {
    title: "Our Collections",
    subtitle: "Premium Tailoring & Accessories",
    description:
      "Discover our curated selection of high-quality fabrics, designer accessories, and custom-tailored masterpieces.",
    searchPlaceholder: "Search collections...",
    allCategories: "All Items",
    noProducts: "No products found matching your criteria.",
    buyNow: "Enquire Now",
  },
  te: {
    title: "మా సేకరణలు",
    subtitle: "ప్రీమియం టైలరింగ్ & యాక్సెసరీలు",
    description:
      "అధిక-నాణ్యత ఫ్యాబ్రిక్స్, డిజైనర్ యాక్సెసరీలు మరియు కస్టమ్-టైలర్డ్ మాస్టర్‌పీస్‌ల మా ఎంపికను కనుగొనండి.",
    searchPlaceholder: "సేకరణలను శోధించండి...",
    allCategories: "అన్ని రకాలు",
    noProducts: "మీ ప్రమాణాలకు సరిపోయే ఉత్పత్తులు ఏవీ కనుగొనబడలేదు.",
    buyNow: "ఇప్పుడే విచారించండి",
  },
};

const Products = () => {
  const { language, setLanguage } = useLanguage();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<{ en: string; te: string }[]>([]);

  const t = pageContent[language];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/products`),
          fetch(`${import.meta.env.VITE_API_URL}/api/products/categories`),
        ]);

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        if (prodData.success) setProducts(prodData.products);
        if (catData.success) setCategories(catData.categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name_te.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <section className="pt-24 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/50 to-background z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 px-4 py-1">
                {t.subtitle}
              </Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                {t.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.description}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-6 border-y border-border/20 sticky top-[72px] z-30 transition-all duration-300 glass-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80 group">
              <div className="absolute inset-0 bg-accent/5 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/70 transition-colors group-focus-within:text-accent" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full bg-background/50 border border-border/30 rounded-full py-2.5 pl-11 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all backdrop-blur-sm relative z-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories Scroller */}
            <div className="relative w-full overflow-hidden flex-1 group">
              {/* Left mask for horizontal scroll indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/90 to-transparent z-10 pointer-events-none" />

              <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar px-4 scroll-smooth">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border shadow-sm ${
                    selectedCategory === "all"
                      ? "bg-accent text-accent-foreground border-accent shadow-accent/20 scale-105"
                      : "bg-background/40 text-muted-foreground border-border/30 hover:border-accent/40 hover:bg-background/60"
                  }`}
                >
                  {t.allCategories}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.en}
                    onClick={() => setSelectedCategory(cat.en)}
                    className={`px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border shadow-sm ${
                      selectedCategory === cat.en
                        ? "bg-accent text-white border-accent shadow-accent/20 scale-105"
                        : "bg-background/40 text-muted-foreground border-border/30 hover:border-accent/40 hover:bg-background/60"
                    }`}
                  >
                    {language === "en" ? cat.en : cat.te}
                  </button>
                ))}
              </div>

              {/* Right mask for horizontal scroll indicator */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/90 to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-accent" />
              <p className="text-muted-foreground animate-pulse">Designing your collection...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-border/50">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <p className="text-muted-foreground text-lg">{t.noProducts}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((p, idx) => (
                <ScrollReveal key={p.id} direction="up" delay={idx * 0.05}>
                  <Card className="group h-full overflow-hidden border-border/30 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2 bg-background flex flex-col">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={p.image_url}
                        alt={language === "en" ? p.name_en : p.name_te}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {!p.in_stock && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                          <Badge
                            variant="destructive"
                            className="uppercase tracking-widest px-4 py-1"
                          >
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                        <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none shadow-sm uppercase text-[10px] tracking-tighter">
                          {language === "en" ? p.category : p.category_te}
                        </Badge>
                      </div>

                      {/* Wishlist Toggle Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(p);
                        }}
                        className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-30 ${
                          isInWishlist(p.id)
                            ? "bg-accent text-accent-foreground shadow-lg scale-110"
                            : "bg-background/60 backdrop-blur-md text-accent hover:bg-accent hover:text-white"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(p.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="font-heading text-xl font-bold mb-1 group-hover:text-accent transition-colors line-clamp-1">
                          {language === "en" ? p.name_en : p.name_te}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Sparkles className="w-3 h-3 text-accent" />
                            <span>Authentic Design</span>
                          </div>
                        </div>
                      </div>

                      <Link to="/contact" className="mt-auto">
                        <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-full group-hover:shadow-lg transition-all flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          {t.buyNow}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
