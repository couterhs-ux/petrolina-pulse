import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-[hsl(222_35%_7%)]">
      {/* Radial laranja sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,107,0,0.25) 0%, rgba(255,107,0,0.08) 35%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 pattern-vale opacity-10 pointer-events-none" />

      <div className="container px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-5"
            style={{ color: "#FF6B00" }}
          >
            Para empresários
          </span>

          <h2
            className="font-display leading-[0.85] mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wide">
              SEU NEGÓCIO
            </span>
            <span
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide"
              style={{
                WebkitTextStroke: "2px #FF6B00",
                color: "transparent",
              }}
            >
              NO MAPA
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/55 max-w-xl mx-auto mb-10 leading-relaxed">
            Coloque seu estabelecimento na frente de mais de 15.000 petrolinenses
            que buscam serviços, restaurantes e eventos todos os meses.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Button
              asChild
              size="lg"
              className="rounded-full font-black uppercase tracking-wide text-black hover:brightness-110 shadow-sun border-0 px-8"
              style={{ backgroundColor: "#FF6B00" }}
            >
              <Link to="/anuncie">
                <Rocket className="h-5 w-5 mr-1" />
                Anunciar Agora
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full font-bold text-white hover:bg-white/10 hover:text-white border border-white/20 px-8"
            >
              <Link to="/anuncie#planos">
                Ver planos <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
