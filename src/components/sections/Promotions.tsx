import { Clock, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { promotions as promos } from "@/data/businesses";

export const Promotions = () => {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-background to-accent/10">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-destructive flex items-center justify-center animate-pulse-glow">
            <Flame className="h-5 w-5 text-destructive-foreground" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black">💸 Promoções ao vivo</h2>
            <p className="text-sm text-muted-foreground">Achados da cidade 🔥 corre que tá acabando</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {promos.map((p) => (
            <article key={p.id} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-sun transition-all hover:-translate-y-1">
              <div className="relative aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground border-0 font-black text-xs">
                  -{p.off}
                </Badge>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-2">
                  <div className="flex items-center gap-1 text-primary-foreground text-[10px] font-semibold">
                    <Clock className="h-3 w-3" />
                    {p.ends}
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-[10px] text-muted-foreground font-semibold uppercase mb-0.5">{p.company}</p>
                <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2">{p.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg font-black text-primary">{p.price}</span>
                  <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>
                </div>
                <WhatsAppButton phone={p.phone} className="w-full text-xs" label="Pegar oferta" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
