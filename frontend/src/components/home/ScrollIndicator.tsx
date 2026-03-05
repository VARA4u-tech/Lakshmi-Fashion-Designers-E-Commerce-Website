import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScroll}
      className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-accent hover:text-accent/80 transition-colors group"
      aria-label="Scroll down"
    >
      <span className="text-sm font-medium opacity-75">Scroll Down</span>
      <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center animate-bounce group-hover:bg-accent/10 transition-colors">
        <ChevronDown className="w-5 h-5" />
      </div>
    </button>
  );
}
