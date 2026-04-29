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
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--accent) / 0.08), transparent 70%)",
        }}
      />

      <div className="container px-4 relative">
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-3xl border border-border bg-card p-8 md:p-12 overflow-hidden shadow-lg">
            {/* Glow laranja sutil */}
            <div
              className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full blur-3xl opacity-30"
              style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.5), transparent 70%)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.35), transparent 70%)" }}
            />

            <div className="relative text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-accent mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Para empresários
              </span>

              <h2
                className="font-display tracking-wide text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-4 text-foreground"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                SEU NEGÓCIO <span className="text-accent">NO MAPA</span>
              </h2>

              <p
                className="text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed text-muted-foreground"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Apareça para milhares de petrolinenses todos os dias. Anuncie no Guia PNZ.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 p-1.5 rounded-full max-w-md mx-auto border border-border bg-background/80 backdrop-blur transition focus-within:border-accent/60 focus-within:ring-2 focus-within:ring-accent/20"
              >
                <Search className="h-4 w-4 ml-3 shrink-0 text-accent" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nome do seu negócio..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/70 text-sm outline-none px-1 min-w-0"
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
