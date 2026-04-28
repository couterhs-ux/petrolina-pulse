import { Clock, Flame, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const promos = [
  { title: "Pizza Grande + Refri", store: "Pizzaria do Chico", price: "R$ 39,90", old: "R$ 69,90", off: "43%", ends: "Termina hoje", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", phone: "87999990010" },
  { title: "Corte + Barba", store: "Barba & Cia", price: "R$ 35", old: "R$ 60", off: "42%", ends: "2 dias", image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop", phone: "87999990011" },
  { title: "Buquê de Rosas", store: "Flores do Vale", price: "R$ 79", old: "R$ 120", off: "34%", ends: "Termina hoje", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=300&fit=crop", phone: "87999990012" },
  { title: "Plano Mensal", store: "Smart Fit Petrolina", price: "R$ 59", old: "R$ 99", off: "40%", ends: "5 dias", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop", phone: "87999990013" },
];

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
            <article key={p.title} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-sun transition-all hover:-translate-y-1">
              <div className="relative aspect-square overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
                <p className="text-[10px] text-muted-foreground font-semibold uppercase mb-0.5">{p.store}</p>
                <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2">{p.title}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg font-black text-primary">{p.price}</span>
                  <span className="text-xs text-muted-foreground line-through">{p.old}</span>
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
