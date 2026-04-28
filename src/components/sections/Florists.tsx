import { Flower2, Clock, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const florists = [
  { name: "Buquê Romântico", store: "Flores do Vale", price: "R$ 89", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop", phone: "87999990060" },
  { name: "Cesta de Café da Manhã", store: "Flora Petrolina", price: "R$ 149", image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=400&h=400&fit=crop", phone: "87999990061" },
  { name: "Arranjo Tropical", store: "Flores do Vale", price: "R$ 119", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop", phone: "87999990062" },
  { name: "Coroa de Condolências", store: "Flora Petrolina", price: "R$ 350", image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop", phone: "87999990063" },
];

export const Florists = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center shadow-soft">
            <Flower2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black">🌸 Floriculturas</h2>
            <p className="text-sm text-muted-foreground">Presentes e datas especiais com entrega no mesmo dia</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {florists.map((f) => (
            <article key={f.name} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-sun transition-all">
              <div className="relative aspect-square overflow-hidden">
                <img src={f.image} alt={f.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <Badge className="absolute top-2 left-2 bg-success text-success-foreground border-0 text-[10px] gap-1">
                  <Clock className="h-2.5 w-2.5" />Entrega hoje
                </Badge>
                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors">
                  <Heart className="h-4 w-4 text-destructive" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[10px] text-muted-foreground font-semibold uppercase">{f.store}</p>
                <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-1">{f.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-primary">{f.price}</span>
                  <WhatsAppButton phone={f.phone} size="sm" className="text-[11px] h-7 px-3" label="Encomendar" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
