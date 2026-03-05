import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsCounter } from "@/components/home/StatsCounter";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HowWeWork } from "@/components/home/HowWeWork";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

const Index = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <HeroSection language={language} />
      <StatsCounter language={language} />
      <ServicesPreview language={language} />
      <WhyChooseUs language={language} />
      <FeaturedWork language={language} />
      <HowWeWork language={language} />
      <ProductsPreview language={language} />
      <TestimonialsSection language={language} />
    </Layout>
  );
};

export default Index;
