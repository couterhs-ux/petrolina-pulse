import { Clock, Bike, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { delivery as items } from "@/data/businesses";

export const Delivery = () => {
  return (
    <section className="py-10 md:py-14 bg-muted/30">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-destructive flex items-center justify-center">
            <Bike className="h-5 w-5 text-destructive-foreground" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black">🍔 Delivery rápido</h2>
            <p className="text-sm text-muted-foreground">Entrega agora na sua porta</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {items.map((i) => (
            <article key={i.id} className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-sun transition-all">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={i.image} alt={i.name} loading="lazy" className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2 bg-success text-success-foreground border-0 text-[10px] gap-1">
                  <Clock className="h-2.5 w-2.5" />Entrega agora
                </Badge>
              </div>
              <div className="p-3">
                <p className="text-[10px] text-muted-foreground font-semibold uppercase">{i.company}</p>
                <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-1">{i.name}</h3>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{i.rating}</span>
                  <span className="text-muted-foreground">{i.description}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-primary">{i.price}</span>
                  <WhatsAppButton phone={i.phone} size="sm" className="text-[11px] h-7 px-3" label="Pedir" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
