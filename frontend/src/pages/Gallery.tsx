import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { X, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

interface GalleryItem {
  id: string;
  title_en: string;
  title_te: string;
  category: string;
  image_url: string;
}

const filters = {
  en: ["Tailoring"],
  te: ["టైలరింగ్"],
};

// No complex mapping needed if we just show everything or default to one
const filterMap: { [key: number]: string } = {
  0: "tailoring",
};

const pageContent = {
  en: {
    subtitle: "Our Work",
    title: "Gallery",
    description:
      "Browse through our collection of beautifully crafted outfits, accessories, and store ambiance.",
    noItems: "No items found yet.",
  },
  te: {
    subtitle: "మా పని",
    title: "గ్యాలరీ",
    description:
      "మా అందంగా తయారు చేసిన దుస్తులు, యాక్సెసరీలు మరియు స్టోర్ వాతావరణ సేకరణను బ్రౌజ్ చేయండి.",
    noItems: "ఇంకా ఏ ఐటమ్స్ కనుగొనబడలేదు.",
  },
};

const Gallery = () => {
  const { language, setLanguage } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Dynamic Data State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const t = pageContent[language];

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching gallery items:", error);
    } else {
      setGalleryItems(data || []);
    }
    setLoading(false);
  };

  // Show all items under the "Tailoring" heading
  const filteredItems = galleryItems;

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-40 md:pb-16 relative">
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

      {/* Filter */}
      <section className="py-6 border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center justify-center gap-6 py-4">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-accent opacity-80" />
                <span className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent font-medium tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {filters[language][0]}
                </span>
                <Sparkles className="w-5 h-5 text-accent opacity-80" />
              </div>
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">{t.noItems}</div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setSelectedImage(item.image_url)}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={item.image_url}
                      alt={language === "en" ? item.title_en : item.title_te}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="font-heading font-semibold text-foreground">
                        {language === "en" ? item.title_en : item.title_te}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
