import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

type Category = {
  emoji: string;
  name: string;
  count: string;
};

const categories: Category[] = [
  { emoji: "🍽️", name: "Restaurantes", count: "120+ lugares" },
  { emoji: "💈", name: "Beleza & Estética", count: "85+ lugares" },
  { emoji: "🎉", name: "Eventos", count: "40+ neste mês" },
  { emoji: "🌸", name: "Floriculturas", count: "18+ lugares" },
  { emoji: "🎓", name: "Faculdades", count: "12+ instituições" },
  { emoji: "🏥", name: "Saúde", count: "60+ lugares" },
  { emoji: "🛍️", name: "Lojas", count: "200+ lugares" },
  { emoji: "🏋️", name: "Academias", count: "32+ lugares" },
  { emoji: "🏨", name: "Hotéis & Turismo", count: "25+ lugares" },
];

export const Categories = () => {
  const { setCategory, setQuery, setNeighborhood, scrollToResults, category: activeCat } = useSearch();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleClick = (name: string) => {
    setQuery("");
    setNeighborhood("Todos");
    setCategory(activeCat === name ? null : name);
    scrollToResults();
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
      aria-label="Categorias"
    >
      <div className="container px-4">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px" style={{ backgroundColor: "#FF6B00" }} />
            <span
              className="font-syne uppercase text-xs font-semibold"
              style={{ letterSpacing: "0.25em", color: "#FF6B00" }}
            >
              Explorar
            </span>
          </div>
          <h2
            className="font-display leading-[0.9] text-foreground"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            CATEGORIAS
          </h2>
        </div>

        {/* Grid 3x3 com bordas via gap + bg */}
        <div
          className="grid grid-cols-2 md:grid-cols-3"
          style={{
            gap: "1px",
            backgroundColor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {categories.map((cat, i) => {
            const active = activeCat === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleClick(cat.name)}
                className="group relative text-left p-6 md:p-10 transition-colors duration-300 overflow-hidden opacity-0"
                style={{
                  backgroundColor: active ? "#141414" : "#080808",
                  animation: visible
                    ? `fade-up 0.6s ease-out ${0.05 * i + 0.1}s forwards`
                    : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = "#141414";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = "#080808";
                }}
              >
                {/* Glow laranja sutil no canto inferior esquerdo (hover) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 0% 100%, rgba(255,107,0,0.15), transparent 55%)",
                  }}
                />

                {/* Seta diagonal */}
                <ArrowUpRight
                  className="absolute top-5 right-5 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: "#666" }}
                  strokeWidth={1.5}
                />
                <span
                  aria-hidden
                  className="absolute top-5 right-5 h-5 w-5 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <ArrowUpRight className="h-5 w-5" style={{ color: "#FF6B00" }} strokeWidth={1.5} />
                </span>

                {/* Conteúdo */}
                <div className="relative">
                  <div className="text-[2rem] md:text-[2.25rem] leading-none mb-6 md:mb-8">
                    {cat.emoji}
                  </div>
                  <h3
                    className="font-syne font-bold text-base md:text-lg text-foreground mb-1"
                    style={{ letterSpacing: "0.01em" }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-xs md:text-sm" style={{ color: "#666" }}>
                    {cat.count}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
