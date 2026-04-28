import { Star, MapPin, X, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useSearch, filterBusinesses } from "@/context/SearchContext";
import { restaurants, barbershops, florists, colleges, events, jobs, promotions, NEIGHBORHOODS, Business } from "@/data/businesses";

const ALL: Business[] = [...restaurants, ...barbershops, ...florists, ...colleges, ...events, ...jobs, ...promotions];

export const SearchResults = () => {
  const { query, neighborhood, category, sortBy, setNeighborhood, setSortBy, clearFilters, resultsRef } = useSearch();
  const isActive = query.trim() !== "" || neighborhood !== "Todos" || category !== null;

  if (!isActive) return <div ref={resultsRef} />;

  const results = filterBusinesses(ALL, { query, neighborhood, category, sortBy });

  return (
    <section ref={resultsRef} className="py-8 md:py-12 bg-background border-b border-border">
      <div className="container px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-black">
              {results.length} {results.length === 1 ? "resultado" : "resultados"}
              {query && <> para "<span className="text-primary">{query}</span>"</>}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {category && (
                <Badge variant="secondary" className="gap-1">
                  {category}
                </Badge>
              )}
              {neighborhood !== "Todos" && (
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" /> {neighborhood}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Select value={neighborhood} onValueChange={setNeighborhood}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue placeholder="Bairro" />
              </SelectTrigger>
              <SelectContent>
                {NEIGHBORHOODS.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="rating">Melhor avaliados</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
              </SelectContent>
            </Select>

            <Button size="sm" variant="ghost" onClick={clearFilters} className="gap-1">
              <X className="h-4 w-4" /> Limpar
            </Button>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-2xl">
            <p className="text-lg font-bold mb-1">Nenhum resultado encontrado</p>
            <p className="text-sm text-muted-foreground mb-4">
              Tente outro termo de busca ou remova os filtros
            </p>
            <Button onClick={clearFilters} className="gradient-sun text-primary-foreground border-0">
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((b) => (
              <article
                key={b.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-sun transition-all hover:-translate-y-1"
              >
                {b.image && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={b.image}
                      alt={b.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-2 left-2 bg-background/95 text-foreground border-0 text-[10px]">
                      {b.category}
                    </Badge>
                    {b.rating && (
                      <div className="absolute top-2 right-2 bg-background/95 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span className="text-xs font-bold">{b.rating}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  {b.subcategory && (
                    <p className="text-[10px] text-primary font-semibold uppercase mb-0.5">
                      {b.subcategory}
                    </p>
                  )}
                  <h3 className="font-bold text-base mb-1 line-clamp-1">{b.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3" />
                    {b.area}
                    {b.price && <span className="ml-auto font-bold text-foreground">{b.price}</span>}
                  </div>
                  <WhatsAppButton
                    phone={b.phone}
                    message={`Olá! Vim pelo Guia PNZ e quero saber sobre ${b.name}`}
                    className="w-full"
                    label="Falar agora"
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
