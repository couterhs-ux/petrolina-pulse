import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket, Sparkles, ArrowRight, Music2 } from "lucide-react";
import vaquejadaImg from "@/assets/vaquejada-petrolina.jpg";

export const VaquejadaHighlight = () => {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-secondary/5 via-background to-primary/5">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container px-4 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Texto */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wide mb-3">
              <Sparkles className="h-3 w-3" /> Evento em Destaque • 2026
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-3">
              41ª <span className="text-primary">Vaquejada</span> de Petrolina
            </h2>
            <p className="text-muted-foreground max-w-xl mb-5">
              Tradição, emoção e grandes shows no coração do sertão. Uma das maiores vaquejadas do Brasil, reunindo vaqueiros de diversos estados.
            </p>

            {/* Info cards */}
            <div className="grid grid-cols-3 gap-2 max-w-md mb-5">
              <div className="rounded-2xl bg-card border border-border/60 px-3 py-3 text-center shadow-card">
                <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
                <div className="text-sm font-black">30 mai</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sábado</div>
              </div>
              <div className="rounded-2xl bg-card border border-border/60 px-3 py-3 text-center shadow-card">
                <MapPin className="h-5 w-5 text-secondary mx-auto mb-1" />
                <div className="text-sm font-black">Pq. Estrela</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Local</div>
              </div>
              <div className="rounded-2xl bg-card border border-border/60 px-3 py-3 text-center shadow-card">
                <Ticket className="h-5 w-5 text-accent mx-auto mb-1" />
                <div className="text-sm font-black">Grátis</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Entrada</div>
              </div>
            </div>

            {/* Atrações */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <Music2 className="h-3 w-3" /> Rey Vaqueiro
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
                <Music2 className="h-3 w-3" /> Tarcísio do Acordeon
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold">
                🐎 Competições
              </span>
            </div>

            <Link
              to="/vaquejada"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-sun text-primary-foreground font-bold shadow-card hover:shadow-river transition-all"
            >
              Ver página do evento <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Imagem */}
          <div className="relative rounded-3xl overflow-hidden shadow-river border-2 border-border/60 aspect-[4/3] order-first lg:order-last">
            <img
              src={vaquejadaImg}
              alt="41ª Vaquejada de Petrolina"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
              <div className="text-xs font-bold uppercase tracking-widest opacity-90">Parque Doutor Geraldo Estrela</div>
              <div className="text-lg font-black">Vaquejada • Shows • Cultura Nordestina</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
