import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-36 bg-background"
      aria-label="Anuncie seu negócio"
    >
      {/* Radial laranja sutil no centro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,107,0,0.18) 0%, transparent 65%)",
        }}
      />
      {/* Grid sutil */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="relative container px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <span className="w-10 h-px" style={{ backgroundColor: "#FF6B00" }} />
            <span
              className="font-syne uppercase text-xs font-semibold"
              style={{ letterSpacing: "0.25em", color: "#FF6B00" }}
            >
              Para Empresários
            </span>
            <span className="w-10 h-px" style={{ backgroundColor: "#FF6B00" }} />
          </div>

          {/* Título gigante */}
          <h2 className="font-display leading-[0.85] tracking-tight">
            <span
              className="block text-foreground"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
            >
              SEU NEGÓCIO
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
              }}
            >
              NO MAPA
            </span>
          </h2>

          {/* Subtítulo */}
          <p
            className="mt-8 md:mt-10 font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "#999" }}
          >
            Apareça para mais de 15.000 petrolinenses todo mês. Planos a partir de
            R$ 97/mês — sem fidelidade, sem taxa de adesão.
          </p>

          {/* Botões */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button
              asChild
              className="border-0 font-syne uppercase tracking-[0.15em] text-xs font-bold text-black hover:brightness-110 h-12 px-8"
              style={{ backgroundColor: "#FF6B00", borderRadius: "2px" }}
            >
              <Link to="/anuncie">Anunciar Agora</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="font-syne uppercase tracking-[0.15em] text-xs font-bold text-foreground hover:bg-white/5 h-12 px-6 group"
              style={{ borderRadius: "2px" }}
            >
              <Link to="/anuncie#planos" className="inline-flex items-center gap-2">
                Ver planos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
