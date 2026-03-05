"use client";

import * as React from "react";
// import Image from "next/image"; // Replaced with img tag for React + Vite
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  image: string;
}

const OFFSET_FACTOR = 4;
const SCALE_FACTOR = 0.03;
const OPACITY_FACTOR = 0.1;
const AUTO_PLAY_INTERVAL = 4000;

export function ServiceStack({ services }: { services: Service[] }) {
  // Initial stack has services reversed so first service is on top (last in array)
  const [stack, setStack] = React.useState<Service[]>(() => [...services].reverse());
  const [isPaused, setIsPaused] = React.useState(false);
  const cardCount = stack.length;

  // Auto-play logic
  React.useEffect(() => {
    if (isPaused || cardCount === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, cardCount, stack]); // Depend on stack to reset timer on change

  const handleNext = () => {
    // Move Top (Last) to Bottom (First)
    setStack((prev) => {
      if (prev.length < 2) return prev;
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, -1);
      return [last, ...rest];
    });
  };

  const handlePrev = () => {
    // Move Bottom (First) to Top (Last)
    setStack((prev) => {
      if (prev.length < 2) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  if (cardCount === 0) return null;

  return (
    <div
      className="group relative overflow-hidden px-3 pb-3 pt-8 min-h-[600px] md:min-h-[750px] flex items-center justify-center"
      data-active={true}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <>
        <button
          onClick={handlePrev}
          className={cn(
            "hidden md:block absolute left-4 lg:left-8 top-[25%] -translate-y-1/2 z-20 p-3 rounded-full border transition-all duration-300",
            "bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-accent hover:border-accent hover:scale-110",
          )}
          aria-label="Previous Service"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className={cn(
            "hidden md:block absolute right-4 lg:right-8 top-[25%] -translate-y-1/2 z-20 p-3 rounded-full border transition-all duration-300",
            "bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-accent hover:border-accent hover:scale-110",
          )}
          aria-label="Next Service"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </>

      <div className="relative size-full max-w-sm md:max-w-md lg:max-w-xl">
        {/* Auto-play Progress Bar */}
        {!isPaused && (
          <div className="absolute top-[-20px] left-0 w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              key={stack[stack.length - 1].title}
              className="h-full bg-accent animate-progress origin-left"
              style={{
                animationDuration: `${AUTO_PLAY_INTERVAL}ms`,
                animationTimingFunction: "linear",
              }}
            />
          </div>
        )}

        {/* 
                   Stack Rendering:
                   stack array: [Bottom, ..., Top]
                   Map renders in order. Last element is visually on top (z-index).
                   We map directly.
                */}
        {stack.map((service, idx) => (
          <div
            key={service.title}
            className={cn(
              "absolute left-0 top-0 size-full scale-[var(--scale)] transition-[opacity,transform] duration-500 ease-in-out", // Slower transition for smooth shuffle
              // Logic: idx is position in stack.
              // stack.length - 1 is Top (Active).
              // index from top = (stack.length - 1) - idx.
              stack.length - 1 - idx > 3
                ? "opacity-0 translate-y-[var(--y)]"
                : "translate-y-[var(--y)] opacity-[var(--opacity)]",
            )}
            style={
              {
                "--y": `-${(stack.length - 1 - idx) * OFFSET_FACTOR}%`,
                "--scale": 1 - (stack.length - 1 - idx) * SCALE_FACTOR,
                "--opacity":
                  stack.length - 1 - idx >= 6 ? 0 : 1 - (stack.length - 1 - idx) * OPACITY_FACTOR,
                zIndex: idx, // Explicit z-index
              } as React.CSSProperties
            }
            aria-hidden={idx !== stack.length - 1}
          >
            <ServiceStackCard
              service={service}
              hideContent={stack.length - 1 - idx > 2}
              active={idx === stack.length - 1}
              onDismiss={handleNext}
            />
          </div>
        ))}

        {/* Placeholder for layout stability */}
        <div className="pointer-events-none invisible h-[600px] md:h-[750px]" aria-hidden>
          <ServiceStackCard title="Placeholder" description="Description" service={services[0]} />
        </div>
      </div>
    </div>
  );
}

function ServiceStackCard({
  service,
  onDismiss,
  hideContent,
  active,
  title, // Optional overrides
  description,
}: {
  service: Service;
  onDismiss?: () => void;
  hideContent?: boolean;
  active?: boolean;
  title?: string;
  description?: string;
}) {
  const { isMobile } = useMediaQuery();

  const ref = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<{
    start: number;
    delta: number;
    startTime: number;
    maxDelta: number;
  }>({
    start: 0,
    delta: 0,
    startTime: 0,
    maxDelta: 0,
  });
  const animation = React.useRef<Animation>();
  const [dragging, setDragging] = React.useState(false);

  // Reset logic: If card becomes inactive (moved to bottom), clear any lingering transforms
  React.useEffect(() => {
    if (!active && ref.current) {
      // Cancel any running animations to prevent conflicts
      ref.current.getAnimations().forEach((a) => a.cancel());
      // Clear inline styles set by drag/dismiss
      ref.current.style.transform = "";
      ref.current.style.opacity = "";
      ref.current.style.removeProperty("--dx");
    }
  }, [active]);

  const onDragMove = (e: PointerEvent) => {
    if (!ref.current) return;
    const { clientX } = e;
    const dx = clientX - drag.current.start;
    drag.current.delta = dx;
    drag.current.maxDelta = Math.max(drag.current.maxDelta, Math.abs(dx));
    ref.current.style.setProperty("--dx", dx.toString());
  };

  const dismiss = () => {
    if (!ref.current) return;

    const cardWidth = ref.current.getBoundingClientRect().width;
    const translateX = Math.sign(drag.current.delta) * cardWidth;

    // Dismiss card
    animation.current = ref.current.animate(
      { opacity: 0, transform: `translateX(${translateX}px)` },
      { duration: 150, easing: "ease-in-out", fill: "forwards" },
    );
    animation.current.onfinish = () => onDismiss?.();
  };

  const stopDragging = (cancelled: boolean) => {
    if (!ref.current) return;
    unbindListeners();
    setDragging(false);

    const dx = drag.current.delta;
    if (Math.abs(dx) > ref.current.clientWidth / (cancelled ? 2 : 3)) {
      dismiss();
      return;
    }

    // Animate back to original position
    animation.current = ref.current.animate(
      { transform: "translateX(0)" },
      { duration: 150, easing: "ease-in-out" },
    );
    animation.current.onfinish = () => ref.current?.style.setProperty("--dx", "0");

    drag.current = { start: 0, delta: 0, startTime: 0, maxDelta: 0 };
  };

  const onDragEnd = () => stopDragging(false);
  const onDragCancel = () => stopDragging(true);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!active || !ref.current || animation.current?.playState === "running") return;

    bindListeners();
    setDragging(true);
    drag.current.start = e.clientX;
    drag.current.startTime = Date.now();
    drag.current.delta = 0;
    ref.current.style.setProperty("--w", ref.current.clientWidth.toString());
  };

  const onClick = () => {
    if (!ref.current) return;
    if (
      isMobile &&
      drag.current.maxDelta < ref.current.clientWidth / 10 &&
      (!drag.current.startTime || Date.now() - drag.current.startTime < 250)
    ) {
      // Handle click if needed
    }
  };

  const bindListeners = () => {
    document.addEventListener("pointermove", onDragMove);
    document.addEventListener("pointerup", onDragEnd);
    document.addEventListener("pointercancel", onDragCancel);
  };

  const unbindListeners = () => {
    document.removeEventListener("pointermove", onDragMove);
    document.removeEventListener("pointerup", onDragEnd);
    document.removeEventListener("pointercancel", onDragCancel);
  };

  return (
    <Card
      ref={ref}
      className={cn(
        "relative select-none gap-2 p-0 h-[600px] md:h-[750px] flex flex-col text-[0.8125rem] overflow-hidden border-border/50 bg-card",
        "translate-x-[calc(var(--dx)*1px)] rotate-[calc(var(--dx)*0.05deg)] opacity-[calc(1-max(var(--dx),-1*var(--dx))/var(--w)/2)]",
        "transition-shadow data-[dragging=true]:shadow-md hover:shadow-gold/20",
      )}
      data-dragging={dragging}
      onPointerDown={onPointerDown}
      onClick={onClick}
    >
      <div className={cn("size-full flex flex-col", hideContent && "invisible")}>
        {/* Image Section */}
        <div className="relative w-full h-1/2 shrink-0 overflow-hidden bg-muted">
          {service.image && (
            <img
              src={service.image}
              alt={service.title}
              className="object-cover object-top w-full h-full"
              draggable={false}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <h3 className="text-2xl font-heading font-bold text-white drop-shadow-md">
              {service.title}
            </h3>
            <div className="w-10 h-10 rounded-xl bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center shrink-0">
              {(() => {
                const Icon = service.icon;
                return <Icon className="w-5 h-5 text-accent" />;
              })()}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col gap-4 relative">
          <p className="line-clamp-3 text-foreground/90 text-base font-medium leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {service.features.slice(0, 3).map((feature: string, i: number) => (
              <span
                key={i}
                className="text-[11px] uppercase tracking-wider px-2 py-1 rounded bg-secondary/80 border border-border/50 text-foreground/90 font-medium"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="border-t border-border/50 pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-accent font-bold tracking-wide">Pricing</p>
              <p className="font-semibold text-lg text-foreground">{service.price}</p>
            </div>
            <Link to="/contact">
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-gold"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Expandable Footer (Swipe Hint) */}
        <div
          className={cn(
            "h-0 overflow-hidden opacity-0 transition-[height,opacity] duration-200 bg-secondary/30",
            "sm:group-has-[*[data-dragging=true]]:h-8 sm:group-has-[*[data-dragging=true]]:opacity-100 sm:group-hover:group-data-[active=true]:h-8 sm:group-hover:group-data-[active=true]:opacity-100",
          )}
        >
          <div className="flex items-center justify-between px-4 h-full text-xs">
            <span className="text-muted-foreground">Swipe to dismiss</span>
            <button
              type="button"
              onClick={dismiss}
              className="text-accent hover:text-accent-foreground transition-colors duration-75 font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
