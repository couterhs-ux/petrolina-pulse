import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Calendar, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/context/SearchContext";
import heroImg from "@/assets/hero-petrolina-real.jpg";

export const Hero = () => {
  const { query, setQuery, setCategory, scrollToResults, clearFilters } = useSearch();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll sincroniza: parallax + zoom + fade do conteúdo
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

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    scrollToResults();
  };

  const quickFilter = (cat: string | null, q: string = "") => {
    clearFilters();
    setQuery(q);
    setCategory(cat);
    scrollToResults();
  };

  // Transformações dinâmicas baseadas no scroll
  const bgScale = 1 + scrollProgress * 0.18;
  const bgTranslateY = scrollProgress * 80;
  const contentOpacity = 1 - scrollProgress * 1.4;
  const contentTranslateY = scrollProgress * 60;

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[88vh] md:min-h-[92vh]">
      {/* Camada de fundo com parallax + zoom */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${bgTranslateY}px, 0) scale(${bgScale})`,
          transition: "transform 60ms linear",
        }}
      >
        {/* Foto real do skyline de Petrolina às margens do Rio São Francisco */}
        <img
          src={heroImg}
          alt="Skyline de Petrolina visto do Rio São Francisco"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlay com gradiente da marca */}
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        {/* Vinheta inferior para legibilidade */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
      </div>

      {/* Brilhos ambientes animados */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)/0.6), transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, hsl(var(--secondary)/0.7), transparent 70%)" }} />

      <div
        className="relative container px-4 pt-12 pb-20 md:pt-24 md:pb-28 will-change-transform"
        style={{
          opacity: Math.max(0, contentOpacity),
          transform: `translate3d(0, ${contentTranslateY}px, 0)`,
        }}
      >
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/20 backdrop-blur-sm border border-primary-foreground/30 text-xs font-semibold mb-5 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Petrolina • Vale do São Francisco
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight animate-fade-in-up drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
            Descubra Petrolina
            <span className="block text-accent">em segundos</span>
          </h1>

          <p className="text-base md:text-lg text-primary-foreground/95 mb-8 animate-fade-in-up drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            O guia completo da cidade. Achados, eventos, promoções e muito mais 🔥
          </p>

          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-6 animate-scale-in">
            <div className="relative bg-card rounded-2xl shadow-sun p-2 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground ml-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pizza, barbearia, UNIVASF, Orla..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground py-3 outline-none text-sm md:text-base"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-xl gradient-sun text-primary-foreground border-0 font-semibold hidden sm:inline-flex"
              >
                Buscar
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up">
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickFilter("Eventos")}
              className="rounded-full bg-background/20 backdrop-blur-sm border-primary-foreground/40 text-primary-foreground hover:bg-background/30 hover:text-primary-foreground gap-2"
            >
              <Calendar className="h-4 w-4" /> Eventos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickFilter(null, "promoção")}
              className="rounded-full bg-background/20 backdrop-blur-sm border-primary-foreground/40 text-primary-foreground hover:bg-background/30 hover:text-primary-foreground gap-2"
            >
              <Flame className="h-4 w-4" /> Promoções
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickFilter(null, "Centro")}
              className="rounded-full bg-background/20 backdrop-blur-sm border-primary-foreground/40 text-primary-foreground hover:bg-background/30 hover:text-primary-foreground gap-2"
            >
              <MapPin className="h-4 w-4" /> Perto de mim
            </Button>
          </div>

          {/* Indicador de scroll */}
          <div
            className="mt-12 flex flex-col items-center gap-2 text-primary-foreground/80 text-xs"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
          >
            <span className="uppercase tracking-widest">Role para explorar</span>
            <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/60 flex items-start justify-center p-1">
              <span className="w-1 h-2 rounded-full bg-primary-foreground/90 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 50%, 0 0)" }} />
    </section>
  );
};
