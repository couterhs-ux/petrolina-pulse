import { Bed, Bath, Maximize, Home as HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { properties } from "@/data/businesses";

export const Properties = () => {
  return (
    <section className="py-10 md:py-14 bg-muted/30">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-river flex items-center justify-center">
            <HomeIcon className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black">🏠 Imóveis</h2>
            <p className="text-sm text-muted-foreground">Casas, apartamentos e aluguéis na cidade</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {properties.slice(0, 3).map((p) => (
            <article key={p.id} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-river transition-all hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <Badge className={`absolute top-3 left-3 border-0 ${p.type === "Venda" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {p.type}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base leading-tight mb-1">{p.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{p.area} • {p.company}</p>
                <p className="text-xl font-black text-primary mb-3">{p.price}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 pb-3 border-b border-border">
                  <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{p.beds}</span>
                  <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{p.baths}</span>
                  <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" />{p.size}</span>
                </div>
                <WhatsAppButton phone={p.phone} message={`Olá! Tenho interesse no imóvel: ${p.name}`} className="w-full" label="Quero visitar" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
