import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";

interface ParallaxWrapperProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  horizontal?: boolean;
}

export function ParallaxWrapper({
  children,
  offset = 50,
  className = "",
  horizontal = false,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Create transformed value based on scroll progress
  // We map 0-1 progress to -offset to +offset range
  const transformValue = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  const springValue = useSpring(transformValue, springConfig);

  // Disable parallax on mobile for performance
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={horizontal ? { x: springValue } : { y: springValue }}>
        {children}
      </motion.div>
    </div>
  );
}
