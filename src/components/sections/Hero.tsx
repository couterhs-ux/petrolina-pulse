import { Search, MapPin, Calendar, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/context/SearchContext";
import heroImg from "@/assets/hero-petrolina.jpg";

export const Hero = () => {
  const { query, setQuery, setCategory, scrollToResults, clearFilters } = useSearch();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    scrollToResults();
  };

  const quickFilter = (cat: string | null, q: string = "") => {
    clearFilters();
    setQuery(q);
    setCategory(cat);
    scrollToResults();
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Vista aérea de Petrolina ao pôr do sol no Vale do São Francisco"
          width={1536}
          height={1024}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="relative container px-4 pt-10 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/20 backdrop-blur-sm border border-primary-foreground/30 text-xs font-semibold mb-5 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Petrolina • Vale do São Francisco
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight animate-fade-in-up">
            Descubra Petrolina
            <span className="block text-accent">em segundos</span>
          </h1>

          <p className="text-base md:text-lg text-primary-foreground/90 mb-8 animate-fade-in-up">
            O guia completo da cidade. Achados, eventos, promoções e muito mais 🔥
          </p>

          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-6 animate-scale-in">
            <div className="relative bg-card rounded-2xl shadow-sun p-2 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground ml-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pizza, barbearia, UNIVASF, Orla..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground py-3 outline-none text-sm md:text-base"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-xl gradient-sun text-primary-foreground border-0 font-semibold hidden sm:inline-flex"
              >
                Buscar
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up">
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickFilter("Eventos")}
              className="rounded-full bg-background/20 backdrop-blur-sm border-primary-foreground/40 text-primary-foreground hover:bg-background/30 hover:text-primary-foreground gap-2"
            >
              <Calendar className="h-4 w-4" /> Eventos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickFilter(null, "promoção")}
              className="rounded-full bg-background/20 backdrop-blur-sm border-primary-foreground/40 text-primary-foreground hover:bg-background/30 hover:text-primary-foreground gap-2"
            >
              <Flame className="h-4 w-4" /> Promoções
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickFilter(null, "Centro")}
              className="rounded-full bg-background/20 backdrop-blur-sm border-primary-foreground/40 text-primary-foreground hover:bg-background/30 hover:text-primary-foreground gap-2"
            >
              <MapPin className="h-4 w-4" /> Perto de mim
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 50%, 0 0)" }} />
    </section>
  );
};
