import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useRef, useEffect, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function ScrollReveal({
  children,
  width = "fit-content",
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  // Define motion variants based on direction
  const getHiddenVariant = (): { x: number; y: number; opacity: number; scale: number } => {
    switch (direction) {
      case "up":
        return { x: 0, y: 75, opacity: 0, scale: 1 };
      case "down":
        return { x: 0, y: -75, opacity: 0, scale: 1 };
      case "left":
        return { x: 75, y: 0, opacity: 0, scale: 1 };
      case "right":
        return { x: -75, y: 0, opacity: 0, scale: 1 };
      case "none":
        return { x: 0, y: 0, opacity: 0, scale: 0.8 }; // Scale effect
      default:
        return { x: 0, y: 75, opacity: 0, scale: 1 };
    }
  };

  return (
    <div ref={ref} style={{ width }} className={`relative overflow-hidden ${className}`}>
      <motion.div
        variants={{
          hidden: getHiddenVariant(),
          visible: { x: 0, y: 0, opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay, ease: "easeOut" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
