import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Calendar, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/context/SearchContext";
import heroImg from "@/assets/hero-petrolina-real.jpg";

export const Hero = () => {
  const { query, setQuery, setCategory, scrollToResults, clearFilters } = useSearch();
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

  const bgScale = 1 + scrollProgress * 0.18;
  const bgTranslateY = scrollProgress * 80;
  const contentOpacity = 1 - scrollProgress * 1.4;
  const contentTranslateY = scrollProgress * 60;

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[88vh] md:min-h-[92vh] bg-[#0a0a0a]">
      {/* Foto de Petrolina */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${bgTranslateY}px, 0) scale(${bgScale})`,
          transition: "transform 60ms linear",
        }}
      >
        <img
          src={heroImg}
          alt="Skyline de Petrolina visto do Rio São Francisco"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlay escuro gradiente */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        {/* Grade de linhas sutis */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div
        className="relative container px-6 md:px-12 lg:px-16 pt-28 pb-20 md:pt-36 md:pb-28 will-change-transform"
        style={{
          opacity: Math.max(0, contentOpacity),
          transform: `translate3d(0, ${contentTranslateY}px, 0)`,
        }}
      >
        <div className="max-w-3xl text-white">
          {/* TAG */}
          <div
            className="inline-flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-sm bg-black/50 backdrop-blur-sm border border-white/10 text-[11px] font-semibold uppercase tracking-[0.18em] mb-6 opacity-0 animate-[heroFadeUp_0.6s_ease-out_0.1s_forwards] relative"
          >
            <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF6B00]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
            Petrolina • Vale do São Francisco
          </div>

          {/* TÍTULO */}
          <h1 className="font-display tracking-[0.02em] text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] mb-6 leading-[0.88] uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            <span className="block text-white opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.2s_forwards]">
              Descubra
            </span>
            <span className="block text-white opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.35s_forwards]">
              Petrolina
            </span>
            <span
              className="block opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.5s_forwards]"
              style={{ color: "#FF6B00" }}
            >
              Em segundos
            </span>
          </h1>

          {/* SUBTÍTULO */}
          <p
            className="text-base md:text-lg font-light text-white/85 mb-8 max-w-[420px] leading-relaxed opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.65s_forwards]"
          >
            O coração do Vale do São Francisco em um só lugar — eventos, sabores,
            experiências e oportunidades.
          </p>

          {/* BUSCA */}
          <div className="opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.8s_forwards]">
            <form
              onSubmit={handleSearch}
              className="max-w-xl flex items-stretch gap-0 mb-4"
              style={{ borderRadius: "4px" }}
            >
              <div
                className="flex-1 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 border border-white/15 border-r-0"
                style={{ borderRadius: "4px 0 0 4px" }}
              >
                <Search className="h-4 w-4 text-white/50 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pizza, barbearia, UNIVASF, Orla..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 py-3 outline-none text-sm md:text-base"
                />
              </div>
              <button
                type="submit"
                className="px-6 md:px-8 font-black uppercase tracking-[0.12em] text-black text-sm hover:brightness-110 transition"
                style={{ backgroundColor: "#FF6B00", borderRadius: "0 4px 4px 0" }}
              >
                Buscar
              </button>
            </form>

            {/* Chips */}
            <div className="flex flex-wrap items-center gap-2 max-w-xl">
              {[
                { label: "Eventos", icon: "🎉", action: () => quickFilter("Eventos") },
                { label: "Promoções", icon: "🔥", action: () => quickFilter(null, "promoção") },
                { label: "Perto de mim", icon: "📍", action: () => quickFilter(null, "Centro") },
              ].map((c) => (
                <button
                  key={c.label}
                  onClick={c.action}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/85 bg-white/5 border border-white/15 hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-black transition-colors"
                  style={{ borderRadius: "4px" }}
                >
                  <span>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] text-white/65 opacity-0 animate-[heroFadeUp_0.7s_ease-out_1s_forwards]"
          >
            <span><span className="text-[#FF6B00] font-black">500+</span> Estabelecimentos</span>
            <span className="text-white/25">·</span>
            <span><span className="text-[#FF6B00] font-black">120+</span> Eventos/mês</span>
            <span className="text-white/25">·</span>
            <span><span className="text-[#FF6B00] font-black">15K</span> Usuários</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-2 text-white/50 text-[10px] uppercase tracking-[0.25em]"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
        >
          <span>Explorar</span>
          <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
            <span className="w-0.5 h-1.5 rounded-full bg-white/70 animate-bounce" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
