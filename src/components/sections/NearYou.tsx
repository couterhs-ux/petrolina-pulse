import { MapPin, Star, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const places = [
  { name: "Padaria Central", category: "Padaria", distance: "350m", rating: 4.7, open: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop", phone: "87999990020" },
  { name: "Auto Posto Vale", category: "Posto", distance: "500m", rating: 4.5, open: true, image: "https://images.unsplash.com/photo-1545262810-77515befe149?w=300&h=300&fit=crop", phone: "87999990021" },
  { name: "Drogaria São João", category: "Farmácia", distance: "700m", rating: 4.8, open: true, image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=300&h=300&fit=crop", phone: "87999990022" },
  { name: "Mercadinho do Bairro", category: "Mercado", distance: "900m", rating: 4.6, open: false, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop", phone: "87999990023" },
];

export const NearYou = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-river flex items-center justify-center shadow-river">
            <Navigation className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black">📍 Perto de você</h2>
            <p className="text-sm text-muted-foreground">Negócios locais ordenados pela proximidade</p>
          </div>
        </div>

        <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {places.map((p) => (
            <article key={p.name} className="shrink-0 w-64 md:w-auto bg-card rounded-2xl overflow-hidden shadow-card flex">
              <img src={p.image} alt={p.name} loading="lazy" className="w-24 h-full object-cover" />
              <div className="p-3 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={p.open ? "default" : "secondary"} className={`text-[10px] ${p.open ? "bg-success text-success-foreground" : ""}`}>
                    {p.open ? "● Aberto" : "Fechado"}
                  </Badge>
                </div>
                <h3 className="font-bold text-sm leading-tight mb-0.5 truncate">{p.name}</h3>
                <p className="text-[11px] text-muted-foreground mb-1">{p.category}</p>
                <div className="flex items-center gap-2 text-[11px] mb-2">
                  <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-accent text-accent" />{p.rating}</span>
                  <span className="flex items-center gap-0.5 text-muted-foreground"><MapPin className="h-3 w-3" />{p.distance}</span>
                </div>
                <WhatsAppButton phone={p.phone} size="sm" className="w-full text-[11px] h-7" label="Chamar" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
