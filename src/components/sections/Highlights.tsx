import { Star, MapPin, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { restaurants } from "@/data/businesses";

const highlights = restaurants;

export const Highlights = () => {
  return (
    <section className="py-10 md:py-14 bg-muted/30 pattern-vale">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-premium flex items-center justify-center shadow-sun">
            <Crown className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black">🔥 Destaques da semana</h2>
            <p className="text-sm text-muted-foreground">Os mais quentes de Petrolina agora</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {highlights.map((h) => (
            <article
              key={h.name}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-sun transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={h.image}
                  alt={h.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 gradient-sun text-primary-foreground border-0 font-bold shadow-soft">
                  {h.tag}
                </Badge>
                <div className="absolute top-3 right-3 bg-background/95 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1 shadow-soft">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <span className="text-xs font-bold">{h.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-primary font-semibold mb-1">{h.subcategory ?? h.category}</p>
                <h3 className="font-bold text-base mb-1 line-clamp-1">{h.name}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {h.area} • {h.reviews} avaliações
                </div>
                <WhatsAppButton phone={h.phone} className="w-full" label="Falar agora" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
