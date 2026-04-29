import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdSearchCTA = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/anuncie");
  };

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "#FF6B00" }}
    >
      <div className="absolute inset-0 pattern-vale opacity-20 mix-blend-multiply" />

      <div className="container px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: "rgba(0,0,0,0.55)" }}
          >
            Para empresários
          </span>

          <h2
            className="font-display tracking-wide text-5xl sm:text-6xl md:text-7xl leading-[0.9] mb-5"
            style={{ color: "#000", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            SEU NEGÓCIO NO MAPA
          </h2>

          <p
            className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(0,0,0,0.6)", fontFamily: "'Poppins', sans-serif" }}
          >
            Descubra como milhares de petrolinenses podem encontrar o seu estabelecimento
            todos os dias no Guia PNZ.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-2 rounded-full max-w-xl mx-auto shadow-2xl"
            style={{ backgroundColor: "#000" }}
          >
            <Search className="h-5 w-5 ml-3 shrink-0" style={{ color: "#FF6B00" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Qual é o nome do seu negócio?"
              className="flex-1 bg-transparent text-white placeholder:text-white/50 text-sm md:text-base outline-none px-1 min-w-0"
            />
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-bold text-sm md:text-base text-black hover:brightness-110 transition"
              style={{ backgroundColor: "#FF6B00" }}
            >
              <span className="hidden sm:inline">Anunciar</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
