import { Search } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

export const CTASearch = () => {
  const { query, setQuery, scrollToResults } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToResults();
  };

  return (
    <section
      className="py-20 md:py-32"
      style={{ backgroundColor: "#FF6B00" }}
      aria-label="Busque seu negócio no mapa"
    >
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow preto */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-black" />
            <span
              className="font-syne uppercase text-xs font-bold text-black"
              style={{ letterSpacing: "0.25em" }}
            >
              Encontre · Descubra · Anuncie
            </span>
            <span className="w-10 h-px bg-black" />
          </div>

          {/* Título */}
          <h2
            className="font-display leading-[0.9] text-black mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            SEU NEGÓCIO NO MAPA
          </h2>

          {/* Subtítulo */}
          <p
            className="font-light text-base md:text-lg max-w-xl mx-auto mb-10"
            style={{ color: "rgba(0,0,0,0.6)" }}
          >
            Busque restaurantes, serviços e eventos — ou cadastre o seu negócio para
            ser encontrado por toda Petrolina.
          </p>

          {/* Search bar preta */}
          <form
            onSubmit={handleSubmit}
            className="relative max-w-2xl mx-auto p-2 flex items-center gap-2"
            style={{ backgroundColor: "#080808", borderRadius: "2px" }}
          >
            <Search className="h-5 w-5 ml-3 shrink-0" style={{ color: "#FF6B00" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pizza, barbearia, UNIVASF, eventos..."
              className="flex-1 bg-transparent text-foreground placeholder:text-[#666] py-3 outline-none text-sm md:text-base font-light"
            />
            <button
              type="submit"
              className="font-syne uppercase text-xs font-bold text-black hover:brightness-110 transition px-5 py-3 shrink-0"
              style={{
                backgroundColor: "#FF6B00",
                borderRadius: "2px",
                letterSpacing: "0.15em",
              }}
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
