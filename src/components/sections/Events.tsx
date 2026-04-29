import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { events } from "@/data/businesses";

export const Events = () => {
  const list = events.slice(0, 5);
  const [featured, ...rest] = list;

  if (!featured) return null;

  return (
    <section
      className="py-20 md:py-28 reveal"
      style={{ backgroundColor: "#0f0f0f" }}
      aria-label="Eventos em destaque"
    >
      <div className="container px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px" style={{ backgroundColor: "#FF6B00" }} />
              <span
                className="font-syne uppercase text-xs font-semibold"
                style={{ letterSpacing: "0.25em", color: "#FF6B00" }}
              >
                Agenda
              </span>
            </div>
            <h2
              className="font-display leading-[0.9] text-foreground"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              EVENTOS EM DESTAQUE
            </h2>
          </div>

          <a
            href="#agenda"
            className="font-syne uppercase text-xs font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all shrink-0"
            style={{ letterSpacing: "0.2em", color: "#FF6B00" }}
          >
            Ver todos os eventos <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Grid: featured (col-span 2 rows) + 4 normais */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5">
          {/* FEATURED */}
          <EventCard event={featured} featured />

          {/* normais */}
          {rest.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
};

type EventItem = (typeof events)[number];

const EventCard = ({ event, featured = false }: { event: EventItem; featured?: boolean }) => {
  const isInternalLink = event.website && event.website.startsWith("/");
  const href = isInternalLink ? event.website! : "#";

  const Wrapper: React.ElementType = isInternalLink ? Link : "a";
  const wrapperProps = isInternalLink ? { to: href } : { href };

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative block overflow-hidden transition-colors duration-300 ${
        featured ? "md:row-span-2 md:col-span-1" : ""
      }`}
      style={{
        backgroundColor: "#141414",
        border: "1px solid rgba(255,255,255,0.07)",
        minHeight: featured ? 480 : 220,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#1a1a1a";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#141414";
      }}
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <img
          src={event.image}
          alt={event.name}
          loading="lazy"
          className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
        />
        {/* Escurecimento */}
        <div
          className="absolute inset-0"
          style={{
            background: featured
              ? "linear-gradient(180deg, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.85) 55%, rgba(255,107,0,0.35) 100%)"
              : "linear-gradient(180deg, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.92) 100%)",
          }}
        />
      </div>

      {/* Badge featured */}
      {featured && (
        <div className="absolute top-5 left-5 z-10">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-syne uppercase text-[10px] font-bold text-black"
            style={{ backgroundColor: "#FF6B00", letterSpacing: "0.2em", borderRadius: "2px" }}
          >
            🔥 Destaque
          </span>
        </div>
      )}

      {/* Conteúdo alinhado ao bottom */}
      <div className="relative h-full w-full flex flex-col justify-end p-6 md:p-8" style={{ minHeight: "inherit" }}>
        <p
          className="font-display uppercase tracking-wide leading-none mb-3"
          style={{
            color: "#FF6B00",
            fontSize: featured ? "clamp(1.75rem, 3vw, 2.5rem)" : "1.5rem",
          }}
        >
          {event.date || "Em breve"}
        </p>

        <h3
          className={`font-syne font-bold text-foreground leading-tight mb-2 ${
            featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
          }`}
        >
          {event.name}
        </h3>

        <p className="text-sm font-light flex items-center gap-1.5" style={{ color: "#999" }}>
          <span aria-hidden>📍</span>
          {event.area}
        </p>

        {/* Seta diagonal hover */}
        <span
          aria-hidden
          className="absolute top-5 right-5 inline-flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <ArrowRight
            className="h-5 w-5 -rotate-45 transition-colors"
            style={{ color: "#666" }}
            strokeWidth={1.5}
          />
        </span>
      </div>
    </Wrapper>
  );
};
