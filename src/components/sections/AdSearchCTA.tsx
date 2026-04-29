import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdSearchCTA = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/anuncie");
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-background">
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--accent) / 0.08), transparent 70%)",
        }}
      />

      <div className="container px-4 relative">
        <div className="max-w-2xl mx-auto">
          {/* Card contido em vez de fundo laranja sólido */}
          <div className="relative rounded-3xl border border-white/10 bg-[hsl(222_30%_10%)] p-8 md:p-12 overflow-hidden">
            {/* Glow laranja sutil dentro do card */}
            <div
              className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full blur-3xl opacity-40"
              style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.45), transparent 70%)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 w-64 h-64 rounded-full blur-3xl opacity-25"
              style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.3), transparent 70%)" }}
            />

            <div className="relative text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-accent mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Para empresários
              </span>

              <h2
                className="font-display tracking-wide text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-4 text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                SEU NEGÓCIO <span className="text-accent">NO MAPA</span>
              </h2>

              <p
                className="text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed text-white/60"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Apareça para milhares de petrolinenses todos os dias. Anuncie no Guia PNZ.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 p-1.5 rounded-full max-w-md mx-auto border border-white/10 bg-black/40 backdrop-blur transition focus-within:border-accent/50 focus-within:bg-black/60"
              >
                <Search className="h-4 w-4 ml-3 shrink-0 text-accent" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nome do seu negócio..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none px-1 min-w-0"
                />
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs md:text-sm bg-accent text-accent-foreground hover:brightness-110 transition"
                >
                  <span className="hidden sm:inline">Anunciar</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
