import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Scissors, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Particles (Optional, can reuse ParticleBackground if needed, but keeping it simple/light here) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-maroon-dark/50 to-background opacity-50" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-6 relative inline-block"
        >
          {/* Animated 404 Text */}
          <h1 className="text-[8rem] md:text-[12rem] font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold-dark/20 opacity-20 select-none">
            404
          </h1>

          {/* Floating Icon Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Scissors className="w-24 h-24 md:w-32 md:h-32 text-accent drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-heading text-cream mb-4">Details Missing?</h2>
          <p className="text-cream/60 max-w-md mx-auto mb-8 text-lg">
            It seems the page you're looking for hasn't been stitched together yet. Let's get you
            back to the collection.
          </p>

          <Link to="/">
            <Button
              size="lg"
              className="bg-gradient-gold text-maroon-dark hover:shadow-gold hover:scale-105 transition-all duration-300 font-semibold group"
            >
              Return Home
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
