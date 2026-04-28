import { useMemo, useState } from "react";
import { MapPin, Star, Navigation, LocateFixed, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { nearby, NEIGHBORHOOD_COORDS } from "@/data/businesses";
import {
  useGeolocation,
  haversineKm,
  formatDistance,
  type GeoCoords,
} from "@/hooks/useGeolocation";

const FALLBACK: GeoCoords = { lat: -9.3891, lng: -40.5030 }; // Centro de Petrolina

export const NearYou = () => {
  const { coords, status, request } = useGeolocation();
  const [fallbackArea, setFallbackArea] = useState<string>("Centro");

  const origin: GeoCoords =
    coords ?? NEIGHBORHOOD_COORDS[fallbackArea] ?? FALLBACK;

  const places = useMemo(() => {
    return nearby
      .map((p) => ({
        ...p,
        distanceKm: haversineKm(origin, { lat: p.lat, lng: p.lng }),
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 8);
  }, [origin]);

  const usingGps = status === "granted" && coords;

  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-river flex items-center justify-center shadow-river">
              <Navigation className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black">📍 Perto de você</h2>
              <p className="text-sm text-muted-foreground">
                {usingGps
                  ? "Ordenado pela sua localização real"
                  : `Mostrando perto de: ${fallbackArea}`}
              </p>
            </div>
          </div>

          <Button
            onClick={request}
            disabled={status === "loading"}
            size="sm"
            className="gradient-sun text-primary-foreground border-0 rounded-full font-bold"
          >
            {status === "loading" ? (
              <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Localizando…</>
            ) : usingGps ? (
              <><LocateFixed className="h-4 w-4 mr-1" /> Atualizar GPS</>
            ) : (
              <><LocateFixed className="h-4 w-4 mr-1" /> Usar minha localização</>
            )}
          </Button>
        </div>

        {!usingGps && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-4">
            {Object.keys(NEIGHBORHOOD_COORDS).map((area) => (
              <button
                key={area}
                onClick={() => setFallbackArea(area)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  fallbackArea === area
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground/80 border-border hover:bg-muted"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        )}

        {status === "denied" && (
          <p className="text-xs text-muted-foreground mb-3">
            Sem permissão de GPS — escolha um bairro acima para ver os mais próximos.
          </p>
        )}

        <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {places.map((p) => (
            <article key={p.id} className="shrink-0 w-64 md:w-auto bg-card rounded-2xl overflow-hidden shadow-card flex">
              <img src={p.image} alt={p.name} loading="lazy" width={96} height={96} className="w-24 h-full object-cover" />
              <div className="p-3 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={p.open ? "default" : "secondary"} className={`text-[10px] ${p.open ? "bg-success text-success-foreground" : ""}`}>
                    {p.open ? "● Aberto" : "Fechado"}
                  </Badge>
                </div>
                <h3 className="font-bold text-sm leading-tight mb-0.5 truncate">{p.name}</h3>
                <p className="text-[11px] text-muted-foreground mb-1">{p.subcategory} • {p.area}</p>
                <div className="flex items-center gap-2 text-[11px] mb-2">
                  {p.rating && (
                    <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-accent text-accent" />{p.rating}</span>
                  )}
                  <span className="flex items-center gap-0.5 text-muted-foreground">
                    <MapPin className="h-3 w-3" />{formatDistance(p.distanceKm)}
                  </span>
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
