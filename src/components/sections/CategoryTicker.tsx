const items = [
  "🍽️ Restaurantes",
  "🎉 Eventos",
  "💈 Beleza",
  "🏥 Saúde",
  "🛍️ Lojas",
  "🏋️ Academia",
  "🏨 Hotéis",
];

export const CategoryTicker = () => {
  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y border-border/60 py-3 md:py-4"
      style={{ background: "var(--gradient-sun)" }}
      aria-label="Categorias do Guia PNZ"
    >
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-6 md:mx-10 text-sm md:text-base font-bold uppercase tracking-wider text-black/85"
          >
            {item}
            <span className="ml-6 md:ml-10 text-black/40">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
