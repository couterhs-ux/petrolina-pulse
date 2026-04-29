const items = [
  "Restaurantes",
  "Eventos",
  "Beleza",
  "Saúde",
  "Lojas",
  "Academia",
  "Hotéis",
  "Delivery",
  "Turismo",
  "Empregos",
];

export const CategoryTicker = () => {
  const loop = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.07] py-5 bg-background"
      aria-label="Categorias do Guia PNZ"
    >
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-8 md:mx-12 font-syne text-sm md:text-base font-semibold uppercase tracking-[0.25em] text-foreground/80 inline-flex items-center gap-8 md:gap-12"
          >
            {item}
            <span style={{ color: "#FF6B00" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
