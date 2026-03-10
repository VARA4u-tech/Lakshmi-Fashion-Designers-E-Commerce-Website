/** Wishlist Page */
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist, WishlistItem } from "@/contexts/WishlistContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const content = {
  en: {
    title: "My Wishlist",
    subtitle: "Your Saved Inspirations",
    empty: "Your wishlist is empty.",
    emptyDesc: "Save your favorite designs and products here to view them later.",
    browse: "Browse collections",
    items: "Items",
    remove: "Remove",
    enquire: "Enquire Now",
  },
  te: {
    title: "నా కోరికల జాబితా",
    subtitle: "మీరు సేవ్ చేసిన ప్రేరణలు",
    empty: "మీ కోరికల జాబితా ఖాళీగా ఉంది.",
    emptyDesc: "మీకు ఇష్టమైన డిజైన్‌లు మరియు ఉత్పత్తులను తర్వాత చూడటానికి ఇక్కడ సేవ్ చేయండి.",
    browse: "సేకరణలను బ్రౌజ్ చేయండి",
    items: "వస్తువులు",
    remove: "తొలగించు",
    enquire: "ఇప్పుడే విచారించండి",
  },
};

const Wishlist = () => {
  const { language, setLanguage } = useLanguage();
  const { wishlist, removeFromWishlist } = useWishlist();
  const t = content[language];

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    toast.success(
      language === "en" ? "Removed from wishlist" : "కోరికల జాబితా నుండి తీసివేయబడింది",
    );
  };

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <section className="pt-24 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-background z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 px-4 py-1">
                {wishlist.length} {t.items}
              </Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                {t.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.subtitle}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 min-h-[400px]">
        <div className="container mx-auto px-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-20 bg-secondary/5 rounded-3xl border border-dashed border-border/30">
              <Heart className="w-16 h-16 text-accent/20 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">{t.empty}</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t.emptyDesc}</p>
              <Link to="/products">
                <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8">
                  {t.browse}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlist.map((item, idx) => (
                <ScrollReveal key={item.id} direction="up" delay={idx * 0.1}>
                  <Card className="group h-full overflow-hidden border-border/30 bg-background flex flex-col hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge className="bg-accent text-white border-none uppercase text-[10px] tracking-tighter">
                          {item.type === "product" ? "Product" : "Gallery"}
                        </Badge>
                        <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none shadow-sm uppercase text-[10px] tracking-tighter">
                          {item.category}
                        </Badge>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg z-20 group-hover:scale-110"
                        title={t.remove}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col justify-between">
                      <h3 className="font-heading text-xl font-bold mb-4 line-clamp-1">
                        {item.name}
                      </h3>
                      <Link to="/contact">
                        <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-full flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          {t.enquire}
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

export default Wishlist;
