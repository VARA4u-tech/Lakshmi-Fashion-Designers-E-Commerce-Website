import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface GalleryItem {
  id: string;
  title_en: string;
  title_te: string;
  category: string;
  image_url: string;
  cluster_id: number;
}

interface AICollectionsProps {
  language: "en" | "te";
}

const clusterTitles = {
  en: ["Curated Collection", "Premium Picks", "Essentials"],
  te: ["క్యూరేటెడ్ కలెక్షన్", "ప్రీమియం పిక్స్", "ఎసెన్షియల్స్"],
};

const sectionContent = {
  en: {
    title: "AI Curated Gallery",
    subtitle: "Recommended Visuals",
    description: "Our AI engine has grouped our works based on design patterns and categories.",
    viewMore: "View Gallery",
  },
  te: {
    title: "AI క్యూరేటెడ్ గ్యాలరీ",
    subtitle: "సిఫార్సు చేయబడినవి",
    description: "డిజైన్ నమూనాలు మరియు వర్గాల ఆధారంగా మా AI ఇంజిన్ మా పనులను సమూహపరిచింది.",
    viewMore: "గ్యాలరీని చూడండి",
  },
};

export function AICollections({ language }: AICollectionsProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [clusters, setClusters] = useState<{ [key: number]: GalleryItem[] }>({});
  const [loading, setLoading] = useState(true);
  const t = sectionContent[language];

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery/clusters`);
        const data = await response.json();
        if (data.success) {
          const grouped = data.clusters.reduce(
            (acc: Record<number, GalleryItem[]>, item: GalleryItem) => {
              if (!acc[item.cluster_id]) acc[item.cluster_id] = [];
              acc[item.cluster_id].push(item);
              return acc;
            },
            {},
          );
          setClusters(grouped);
        }
      } catch (error) {
        console.error("Error fetching AI clusters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();
  }, []);

  const toggleWishlist = (item: GalleryItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
      toast.info(language === "en" ? "Removed from wishlist" : "కోరికల జాబితా నుండి తీసివేయబడింది");
    } else {
      addToWishlist({
        id: item.id,
        type: "gallery",
        name: language === "en" ? item.title_en : item.title_te,
        image_url: item.image_url,
        category: item.category,
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

  if (Object.keys(clusters).length === 0) return null;

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              <p className="text-accent font-medium tracking-wider uppercase text-sm">
                {t.subtitle}
              </p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 italic">{t.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.description}</p>
          </div>
        </ScrollReveal>

        {Object.entries(clusters).map(([clusterId, items], index) => (
          <div key={clusterId} className="mb-20 last:mb-0">
            <ScrollReveal direction="left" delay={index * 0.1}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 bg-accent rounded-full" />
                  <h3 className="text-2xl font-bold font-heading">
                    {clusterTitles[language][parseInt(clusterId)] || clusterTitles[language][0]}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-accent border-accent/30 lowercase font-medium"
                  >
                    {items.length} {language === "en" ? "items" : "ఐటెమ్స్"}
                  </Badge>
                </div>
                <Link
                  to="/gallery"
                  className="text-accent hover:underline flex items-center gap-1 text-sm font-medium"
                >
                  {t.viewMore} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {items.slice(0, 5).map((item, pIndex) => (
                <ScrollReveal key={item.id} direction="up" delay={pIndex * 0.05}>
                  <Card className="group h-full overflow-hidden border-border/30 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={language === "en" ? item.title_en : item.title_te}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                        <Link to="/gallery">
                          <Badge className="bg-white text-black hover:bg-white/90 cursor-pointer">
                            View Gallery
                          </Badge>
                        </Link>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(item);
                        }}
                        className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 z-20 ${
                          isInWishlist(item.id)
                            ? "bg-accent text-accent-foreground shadow-lg scale-110 opacity-100"
                            : "bg-background/60 backdrop-blur-md text-accent hover:bg-accent hover:text-white opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${isInWishlist(item.id) ? "fill-current" : ""}`}
                        />
                      </button>
                    </div>
                    <CardContent className="p-4 bg-secondary/10">
                      <h4 className="font-medium text-sm line-clamp-1 mb-1 group-hover:text-accent transition-colors">
                        {language === "en" ? item.title_en : item.title_te}
                      </h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.category}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
