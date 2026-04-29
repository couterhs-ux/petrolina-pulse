import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { events } from "@/data/businesses";

const filters = [
  { id: "todos", label: "Todos" },
  { id: "hoje", label: "Hoje" },
  { id: "semana", label: "Essa semana" },
  { id: "gratis", label: "Gratuitos" },
];

export const Events = () => {
  const [active, setActive] = useState("todos");
  const filtered = active === "todos" ? events : events.filter((e) => e.filter === active);

  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container px-4">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">🎉 São João de Petrolina 2026</h2>
            <p className="text-sm text-muted-foreground">Mais de 100 atrações • 19 a 27 de junho 👀</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          {filters.map((f) => (
            <Button
              key={f.id}
              size="sm"
              variant={active === f.id ? "default" : "outline"}
              onClick={() => setActive(f.id)}
              className={`rounded-full shrink-0 ${active === f.id ? "gradient-sun text-primary-foreground border-0" : ""}`}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">Nenhum evento neste filtro.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((e) => (
              <article key={e.id} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-river transition-all">
                <div className="relative aspect-video overflow-hidden">
                  <img src={e.image} alt={e.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0">
                    {e.price === "Gratuito" ? "🎁 Grátis" : <><Ticket className="h-3 w-3 mr-1" />{e.price}</>}
                  </Badge>
                  <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
                    <h3 className="font-bold text-lg leading-tight mb-1">{e.name}</h3>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{e.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.area}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  {e.website && e.website.startsWith("/") ? (
                    <Button asChild className="w-full rounded-full gradient-sun text-white border-0 font-semibold gap-2">
                      <Link to={e.website}>
                        Ver página do evento <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <WhatsAppButton phone={e.phone} message={`Olá! Quero saber mais sobre o evento ${e.name}`} className="w-full" label="Mais informações" />
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
