import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Award, Sparkles } from "lucide-react";

interface StatsCounterProps {
  language: "en" | "te";
}

const stats = {
  en: [
    {
      icon: TrendingUp,
      value: 20,
      suffix: "+",
      label: "Years of Excellence",
      color: "text-accent",
    },
    {
      icon: Users,
      value: 5000,
      suffix: "+",
      label: "Happy Customers",
      color: "text-accent",
    },
    {
      icon: Award,
      value: 100,
      suffix: "+",
      label: "Bridal Dresses",
      color: "text-accent",
    },
    {
      icon: Sparkles,
      value: 50,
      suffix: "+",
      label: "Designer Collections",
      color: "text-accent",
    },
  ],
  te: [
    {
      icon: TrendingUp,
      value: 20,
      suffix: "+",
      label: "సంవత్సరాల అనుభవం",
      color: "text-accent",
    },
    {
      icon: Users,
      value: 5000,
      suffix: "+",
      label: "సంతోషకరమైన కస్టమర్లు",
      color: "text-accent",
    },
    {
      icon: Award,
      value: 100,
      suffix: "+",
      label: "బ్రైడల్ డ్రస్సులు",
      color: "text-accent",
    },
    {
      icon: Sparkles,
      value: 50,
      suffix: "+",
      label: "డిజైనర్ కలెక్షన్లు",
      color: "text-accent",
    },
  ],
};

function CountUpAnimation({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsCounter({ language }: StatsCounterProps) {
  const currentStats = stats[language];

  return (
    <section className="py-10 md:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-maroon-dark/20 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {currentStats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                <stat.icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color}`} />
              </div>

              <div className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-2">
                <CountUpAnimation end={stat.value} />
                <span className="text-accent">{stat.suffix}</span>
              </div>

              <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
