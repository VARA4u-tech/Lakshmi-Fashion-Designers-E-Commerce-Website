import { motion } from "framer-motion";
import { useEffect, ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  title?: string;
}

export const PageTransition = ({ children, title }: PageTransitionProps) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Lakshmi Fashion & Designers`;
    } else {
      document.title = "Lakshmi Fashion & Designers | Premium Women's Tailoring";
    }

    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <>
      {/* Wipe Effect Overlays */}
      <motion.div
        className="fixed inset-0 z-[100] bg-maroon pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
      />
      <motion.div
        className="fixed inset-0 z-[100] bg-accent/20 pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ originY: 0 }}
      />

      {/* Main Content Fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full min-h-screen relative"
      >
        {children}
      </motion.div>
    </>
  );
};
