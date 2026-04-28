import { useState } from "react";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    title: "São João do Vale 2026",
    date: "Hoje • 19h",
    place: "Centro de Convenções",
    price: "Gratuito",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=500&fit=crop",
    filter: "hoje",
  },
  {
    title: "Festival do Vinho",
    date: "Sáb • 18h",
    place: "Vinícola Vale",
    price: "R$ 45",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=500&fit=crop",
    filter: "semana",
  },
  {
    title: "Forró na Orla",
    date: "Dom • 20h",
    place: "Orla de Petrolina",
    price: "Gratuito",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=500&fit=crop",
    filter: "gratis",
  },
  {
    title: "Show Sertanejo",
    date: "Sex • 22h",
    place: "Cangaço Music Hall",
    price: "R$ 80",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    filter: "semana",
  },
];

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
            <h2 className="text-2xl md:text-3xl font-black">🎉 Eventos em Petrolina</h2>
            <p className="text-sm text-muted-foreground">O que tá rolando agora 👀</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((e) => (
            <article key={e.title} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-river transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img src={e.image} alt={e.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0">
                  {e.price === "Gratuito" ? "🎁 Grátis" : <><Ticket className="h-3 w-3 mr-1" />{e.price}</>}
                </Badge>
                <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
                  <h3 className="font-bold text-lg leading-tight mb-1">{e.title}</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{e.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.place}</span>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <Button className="w-full gradient-river text-secondary-foreground border-0 rounded-xl font-semibold">
                  Ver agora
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
