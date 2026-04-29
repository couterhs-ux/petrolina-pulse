import { MapPin, ExternalLink, Camera } from "lucide-react";
import orla from "@/assets/turismo-orla.jpg";
import catedral from "@/assets/turismo-catedral.jpg";
import vinicolas from "@/assets/turismo-vinicolas.jpg";
import ilhaFogo from "@/assets/turismo-ilha-fogo.jpg";
import vapor from "@/assets/turismo-vapor.jpg";

type Spot = {
  name: string;
  area: string;
  description: string;
  image: string;
  tag?: string;
  maps: string;
};

const spots: Spot[] = [
  {
    name: "Orla de Petrolina",
    area: "Centro",
    description: "Cartão-postal da cidade às margens do Rio São Francisco. Ideal para caminhar ao pôr do sol.",
    image: orla,
    tag: "Imperdível",
    maps: "https://www.google.com/maps/search/Orla+de+Petrolina",
  },
  {
    name: "Catedral Sagrado Coração de Jesus",
    area: "Centro",
    description: "Igreja-matriz histórica com arquitetura imponente no coração de Petrolina.",
    image: catedral,
    maps: "https://www.google.com/maps/search/Catedral+Sagrado+Coração+de+Jesus+Petrolina",
  },
  {
    name: "Vinícolas do Vale do São Francisco",
    area: "Zona rural",
    description: "Único polo de vinhos tropicais do mundo. Tours, degustações e enoturismo o ano todo.",
    image: vinicolas,
    tag: "Enoturismo",
    maps: "https://www.google.com/maps/search/Vinícolas+Vale+do+São+Francisco+Petrolina",
  },
  {
    name: "Ilha do Fogo",
    area: "Rio São Francisco",
    description: "Travessia rápida de barco para uma ilha com restaurantes flutuantes e prainha de água doce.",
    image: ilhaFogo,
    tag: "Aventura",
    maps: "https://www.google.com/maps/search/Ilha+do+Fogo+Petrolina",
  },
  {
    name: "Vapor do Vinho",
    area: "Juazeiro - BA",
    description: "Passeio clássico pelo Rio São Francisco a bordo do tradicional barco com música ao vivo e gastronomia regional.",
    image: vapor,
    tag: "Passeio",
    maps: "https://www.google.com/maps/search/Vapor+do+Vinho+Juazeiro",
  },
];

export const Tourism = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wide mb-2">
              <Camera className="h-3 w-3" /> Conheça Petrolina
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Pontos turísticos imperdíveis</h2>
            <p className="text-sm text-muted-foreground mt-1">Os lugares que todo morador e turista precisa visitar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spots.map((s) => (
            <a
              key={s.name}
              href={s.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-river hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                {s.tag && (
                  <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-1 rounded-full bg-primary text-primary-foreground uppercase tracking-wider">
                    {s.tag}
                  </span>
                )}
                <span className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition">
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-black text-base leading-tight mb-1">{s.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {s.area}
                  </div>
                </div>
              </div>
              <p className="p-4 text-xs text-muted-foreground leading-relaxed">{s.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
