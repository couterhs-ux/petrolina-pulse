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
  const loop = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-5"
      style={{
        backgroundColor: "#0f0f0f",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
      aria-label="Categorias do Guia PNZ"
    >
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-syne text-sm md:text-base font-semibold uppercase inline-flex items-center"
            style={{ letterSpacing: "0.25em", color: "#666" }}
          >
            <span className="mx-8 md:mx-12">{item}</span>
            <span style={{ color: "#FF6B00" }}>★</span>
          </span>
        ))}
      </div>
    </div>
  );
};
