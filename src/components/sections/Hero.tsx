import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/context/SearchContext";

export const Hero = () => {
  const { scrollToResults } = useSearch();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const h = rect.height || 1;
        const p = Math.min(1, Math.max(0, -rect.top / h));
        setScrollProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[100vh] flex items-center bg-background"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      {/* Radial orange glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,107,0,0.18) 0%, transparent 60%)",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

      <div
        className="relative container px-4 sm:px-6 pt-32 pb-24 md:pt-40 md:pb-32 w-full"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 1.4),
          transform: `translate3d(0, ${scrollProgress * 60}px, 0)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow tag */}
          <div
            className="flex items-center gap-3 mb-6 md:mb-8 opacity-0"
            style={{ animation: "fade-up 0.7s ease-out 0.1s forwards" }}
          >
            <span className="w-10 h-px" style={{ backgroundColor: "#FF6B00" }} />
            <span
              className="font-syne uppercase text-xs font-semibold"
              style={{ letterSpacing: "0.25em", color: "#FF6B00" }}
            >
              Petrolina, Pernambuco
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display leading-[0.85] tracking-tight">
            <span
              className="block text-foreground text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] opacity-0"
              style={{ animation: "fade-up 0.8s ease-out 0.3s forwards" }}
            >
              VIVA
            </span>
            <span
              className="block text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] opacity-0"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                animation: "fade-up 0.8s ease-out 0.45s forwards",
              }}
            >
              PETROLINA
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-8 md:mt-10 font-light text-base md:text-lg max-w-[480px] leading-relaxed opacity-0"
            style={{ color: "#999", animation: "fade-up 0.7s ease-out 0.7s forwards" }}
          >
            O guia definitivo para descobrir o que vibra na cidade — eventos, sabores,
            serviços e oportunidades, num só lugar.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md sm:max-w-none opacity-0"
            style={{ animation: "fade-up 0.7s ease-out 0.9s forwards" }}
          >
            <Button
              onClick={scrollToResults}
              className="border-0 font-syne uppercase tracking-[0.15em] text-xs font-bold text-black hover:brightness-110 h-12 px-8"
              style={{ backgroundColor: "#FF6B00", borderRadius: "2px" }}
            >
              Explorar a cidade
            </Button>
            <Button
              asChild
              variant="ghost"
              className="font-syne uppercase tracking-[0.15em] text-xs font-bold text-foreground hover:bg-white/5 h-12 px-6 group"
              style={{ borderRadius: "2px" }}
            >
              <a href="/anuncie" className="inline-flex items-center gap-2">
                Anuncie aqui
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
        style={{
          animation: "fade-up 0.7s ease-out 1.2s forwards",
          opacity: Math.max(0, 1 - scrollProgress * 3),
        }}
      >
        <Mouse
          className="h-5 w-5 animate-bounce"
          style={{ color: "#FF6B00", animationDuration: "2s" }}
        />
        <span
          className="font-syne uppercase text-[10px] font-semibold"
          style={{ letterSpacing: "0.3em", color: "#666" }}
        >
          Role para explorar
        </span>
      </div>
    </section>
  );
};
