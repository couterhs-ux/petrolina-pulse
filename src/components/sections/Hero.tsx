import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Calendar, Flame } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { useLiveUsers } from "@/hooks/useLiveUsers";
import heroImg from "@/assets/hero-petrolina-real.jpg";

export const Hero = () => {
  const { query, setQuery, setCategory, scrollToResults, clearFilters } = useSearch();
  const liveUsers = useLiveUsers();
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
    <section ref={sectionRef} className="relative overflow-hidden min-h-[88vh] md:min-h-[92vh]">
      {/* Foto de Petrolina + overlays */}
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
          className="w-full h-full object-cover animate-[kenBurns_24s_ease-in-out_infinite_alternate]"
          style={{ filter: "saturate(1.25) contrast(1.08) brightness(0.85)" }}
          loading="eager"
        />
        {/* Overlay dramático: escuro + quente vibrante */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(40,15,0,0.55) 35%, rgba(255,107,0,0.28) 65%, rgba(0,0,0,0.78) 100%)",
          }}
        />
        {/* Tinta laranja por cima para dar calor */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(255,140,0,0.55), transparent 60%)",
          }}
        />
        {/* Grid sutil */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Vinheta inferior para legibilidade */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      </div>

      {/* Brilho pulsante atrás do título */}
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-60 animate-[heroGlow_5s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,140,0,0.55) 0%, rgba(255,90,0,0.25) 30%, transparent 65%)",
        }}
      />

      {/* Sparkles flutuantes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { l: "12%", t: "22%", d: "0s", s: "6px" },
          { l: "85%", t: "30%", d: "1.2s", s: "8px" },
          { l: "20%", t: "70%", d: "2.4s", s: "5px" },
          { l: "78%", t: "65%", d: "0.6s", s: "7px" },
          { l: "50%", t: "18%", d: "3s", s: "4px" },
          { l: "92%", t: "50%", d: "1.8s", s: "6px" },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-[sparkle_3.5s_ease-in-out_infinite]"
            style={{
              left: p.l,
              top: p.t,
              width: p.s,
              height: p.s,
              background: "rgba(255,200,80,0.9)",
              boxShadow: "0 0 18px rgba(255,180,50,0.85)",
              animationDelay: p.d,
            }}
          />
        ))}
      </div>

      <div
        className="relative container px-4 pt-24 pb-20 md:pt-32 md:pb-28 will-change-transform"
        style={{
          opacity: Math.max(0, contentOpacity),
          transform: `translate3d(0, ${contentTranslateY}px, 0)`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* TAG */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] mb-6 opacity-0 animate-[heroFadeDown_0.6s_ease-out_0.05s_forwards]"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,179,0,0.5)",
              boxShadow: "0 0 24px rgba(255,140,0,0.35), inset 0 0 12px rgba(255,179,0,0.1)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: "#FF6B00" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#FF6B00" }} />
            </span>
            <span className="text-white">Petrolina • Vale do São Francisco</span>
          </div>

          {/* TÍTULO */}
          <h1 className="font-display tracking-wide text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] mb-5 md:mb-6 leading-[0.9] uppercase">
            <span
              className="block text-white opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.2s_forwards]"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.45)" }}
            >
              Descubra
            </span>
            <span
              className="block text-white opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.35s_forwards]"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.45)" }}
            >
              Petrolina
            </span>
            <span
              className="block opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.5s_forwards] bg-clip-text text-transparent animate-[shine_4s_linear_infinite]"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #FFB300 0%, #FFE680 25%, #FF8A00 50%, #FFE680 75%, #FFB300 100%)",
                backgroundSize: "200% 100%",
                filter: "drop-shadow(0 0 32px rgba(255,179,0,0.55)) drop-shadow(0 4px 18px rgba(255,107,0,0.45))",
              }}
            >
              Em segundos
            </span>
          </h1>

          {/* SUBTÍTULO */}
          <p className="text-base sm:text-lg md:text-xl font-light text-white/95 mb-8 max-w-[600px] mx-auto leading-[1.7] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.65s_forwards]">
            O coração do Vale do São Francisco em um só lugar — eventos, sabores, experiências e oportunidades. <span className="font-semibold" style={{ color: "#FFB300" }}>🔥</span>
          </p>

          {/* BUSCA */}
          <div className="opacity-0 animate-[heroFadeUp_0.7s_ease-out_0.8s_forwards]">
            <form
              onSubmit={handleSearch}
              className="relative max-w-2xl mx-auto mb-6 group/search"
            >
              <div
                className="relative bg-card rounded-2xl p-2 flex items-center gap-2 border-2 border-transparent transition-all duration-300 focus-within:border-transparent"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)" }}
              >
                {/* Borda gradiente no focus */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-focus-within/search:opacity-100 transition-opacity"
                  style={{
                    padding: "2px",
                    background: "linear-gradient(90deg, #FF6B00, #FFB347)",
                    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <Search className="h-5 w-5 text-muted-foreground ml-3 shrink-0 transition-transform duration-500 group-hover/search:rotate-[18deg] group-focus-within/search:rotate-[18deg]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pizza, barbearia, UNIVASF, Orla..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground py-3.5 outline-none text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="hidden sm:inline-flex items-center justify-center rounded-xl px-6 py-3 font-black uppercase tracking-wider text-black text-sm hover:brightness-110 transition"
                  style={{
                    background: "linear-gradient(90deg, #FF6B00, #FFB347)",
                    boxShadow: "0 6px 18px rgba(255,107,0,0.45)",
                  }}
                >
                  Buscar
                </button>
              </div>
            </form>

            {/* Chips */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-2 max-w-xs sm:max-w-none mx-auto">
              <button
                onClick={() => quickFilter("Eventos")}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-background/20 backdrop-blur-sm border border-white/40 text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-black transition-colors"
              >
                <Calendar className="h-4 w-4" /> Eventos
              </button>
              <button
                onClick={() => quickFilter(null, "promoção")}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-background/20 backdrop-blur-sm border border-white/40 text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-black transition-colors"
              >
                <Flame className="h-4 w-4" /> Promoções
              </button>
              <button
                onClick={() => quickFilter(null, "Centro")}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-background/20 backdrop-blur-sm border border-white/40 text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-black transition-colors"
              >
                <MapPin className="h-4 w-4" /> Perto de mim
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:text-sm font-semibold uppercase tracking-[0.12em] text-white/80 opacity-0 animate-[heroFadeUp_0.7s_ease-out_1s_forwards]">
            <span><span className="font-black" style={{ color: "#FFB300" }}>500+</span> Estabelecimentos</span>
            <span className="text-white/35">·</span>
            <span><span className="font-black" style={{ color: "#FFB300" }}>120+</span> Eventos/mês</span>
            <span className="text-white/35">·</span>
            <span><span className="font-black tabular-nums" style={{ color: "#FFB300" }}>{liveUsers.toLocaleString("pt-BR")}</span> Usuários online</span>
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-12 flex flex-col items-center gap-2 text-white/70 text-[10px] uppercase tracking-[0.25em]"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
          >
            <span>Role para explorar</span>
            <div className="w-5 h-9 rounded-full border border-white/50 flex items-start justify-center p-1">
              <span className="w-0.5 h-1.5 rounded-full bg-white/80 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 50%, 0 0)" }} />

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes kenBurns {
          0%   { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.12) translate(-1.5%, -1%); }
        }
        @keyframes heroGlow {
          0%, 100% { opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.75; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50%      { opacity: 1; transform: scale(1.2); }
        }
        @keyframes shine {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  );
};
