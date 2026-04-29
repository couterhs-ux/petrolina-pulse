import { Link } from "react-router-dom";
import { ArrowLeft, Check, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

const ADVERTISER_PHONE = "5587900000000"; // (87) 9XXXX-XXXX

const openWhatsApp = (plano: string) => {
  const msg = `Olá! Quero anunciar no Guia PNZ no plano ${plano}. Pode me passar mais informações?`;
  const url = `https://wa.me/${ADVERTISER_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: "Básico",
    price: "97",
    description: "Para começar a aparecer no Guia PNZ.",
    features: [
      "Listagem simples na categoria",
      "1 foto do estabelecimento",
      "Contato telefônico visível",
      "Botão direto para WhatsApp",
    ],
  },
  {
    name: "Destaque",
    price: "197",
    description: "Apareça antes da concorrência na sua categoria.",
    highlight: true,
    badge: "Mais popular",
    features: [
      "Tudo do plano Básico",
      "Posição prioritária na categoria",
      'Selo "Destaque" no card',
      "Galeria com até 6 fotos",
      "Estatísticas de visualizações",
    ],
  },
  {
    name: "Premium",
    price: "397",
    description: "Máxima exposição — vire referência na cidade.",
    features: [
      "Tudo do plano Destaque",
      "Banner rotativo na home",
      "1 post mensal nas redes do PNZ",
      "Página exclusiva do negócio",
      "Suporte dedicado por WhatsApp",
    ],
  },
];

const testimonials = [
  {
    name: "Marcos Andrade",
    role: "Proprietário · Sabor do Sertão",
    initials: "MA",
    quote:
      "Desde que entrei no Guia PNZ, meu movimento no almoço dobrou. As pessoas chegam dizendo que viram a gente lá. Vale cada centavo.",
  },
  {
    name: "Juliana Lima",
    role: "Sócia · Studio Bella Beleza",
    initials: "JL",
    quote:
      "Em 30 dias no plano Destaque enchi minha agenda. O atendimento é rápido e o investimento volta na primeira semana.",
  },
  {
    name: "Ricardo Souza",
    role: "Diretor · Vale Fitness",
    initials: "RS",
    quote:
      "Já testei várias formas de divulgação aqui em Petrolina. Nenhuma trouxe tantos alunos novos quanto o Premium do Guia PNZ.",
  },
];

const Anuncie = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28 bg-background">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,107,0,0.18) 0%, transparent 60%)",
            }}
          />

          <div className="relative container px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-syne uppercase text-xs font-semibold mb-10 hover:text-foreground transition"
              style={{ color: "#999", letterSpacing: "0.2em" }}
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Link>

            <div className="max-w-5xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-px" style={{ backgroundColor: "#FF6B00" }} />
                <span
                  className="font-syne uppercase text-xs font-semibold"
                  style={{ letterSpacing: "0.25em", color: "#FF6B00" }}
                >
                  Anuncie no Guia PNZ
                </span>
              </div>

              <h1
                className="font-display leading-[0.9] text-foreground tracking-tight"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                SEU NEGÓCIO NA FRENTE
                <span
                  className="block"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                  }}
                >
                  DE TODA PETROLINA
                </span>
              </h1>

              <p
                className="mt-8 md:mt-10 font-light text-base md:text-lg max-w-xl leading-relaxed"
                style={{ color: "#999" }}
              >
                Mais de <strong style={{ color: "#FF6B00" }}>15.000 petrolinenses</strong>{" "}
                usam o Guia PNZ todo mês para encontrar restaurantes, serviços e eventos.
                Esteja onde a cidade procura.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  asChild
                  className="border-0 font-syne uppercase tracking-[0.15em] text-xs font-bold text-black hover:brightness-110 h-12 px-8"
                  style={{ backgroundColor: "#FF6B00", borderRadius: "2px" }}
                >
                  <a href="#planos">Ver planos</a>
                </Button>
                <Button
                  onClick={() => openWhatsApp("personalizado")}
                  variant="ghost"
                  className="font-syne uppercase tracking-[0.15em] text-xs font-bold text-foreground hover:bg-white/5 h-12 px-6 inline-flex items-center gap-2"
                  style={{ borderRadius: "2px" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* PLANOS */}
        <section
          id="planos"
          className="py-20 md:py-28"
          style={{ backgroundColor: "#0f0f0f" }}
        >
          <div className="container px-4">
            <div className="mb-12 md:mb-16 max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px" style={{ backgroundColor: "#FF6B00" }} />
                <span
                  className="font-syne uppercase text-xs font-semibold"
                  style={{ letterSpacing: "0.25em", color: "#FF6B00" }}
                >
                  Escolha seu plano
                </span>
              </div>
              <h2
                className="font-display leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                PLANOS PARA CRESCER
              </h2>
              <p className="mt-5 font-light text-sm md:text-base" style={{ color: "#999" }}>
                Sem fidelidade. Cancele quando quiser. Comece hoje e veja resultado já no
                primeiro mês.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className="relative flex flex-col p-8 md:p-10 transition-colors"
                  style={{
                    backgroundColor: plan.highlight ? "#141414" : "#080808",
                    border: plan.highlight ? "1px solid #FF6B00" : "1px solid transparent",
                    margin: plan.highlight ? "-1px" : 0,
                    zIndex: plan.highlight ? 1 : 0,
                  }}
                >
                  {plan.badge && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 font-syne uppercase text-[10px] font-bold text-black px-3 py-1.5"
                      style={{
                        backgroundColor: "#FF6B00",
                        letterSpacing: "0.2em",
                        borderRadius: "2px",
                      }}
                    >
                      {plan.badge}
                    </span>
                  )}

                  <h3
                    className="font-display text-foreground leading-none mb-2"
                    style={{ fontSize: "2.5rem" }}
                  >
                    {plan.name.toUpperCase()}
                  </h3>

                  <p className="text-sm font-light min-h-[2.5rem]" style={{ color: "#999" }}>
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 my-7">
                    <span
                      className="font-syne text-base font-bold"
                      style={{ color: "#FF6B00" }}
                    >
                      R$
                    </span>
                    <span
                      className="font-display leading-none text-foreground tabular-nums"
                      style={{ fontSize: "5rem" }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="font-syne uppercase text-xs font-semibold"
                      style={{ color: "#666", letterSpacing: "0.2em" }}
                    >
                      /mês
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: "#FF6B00" }}
                          strokeWidth={2.5}
                        />
                        <span className="font-light" style={{ color: "#f0ece4" }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => openWhatsApp(plan.name)}
                    className="w-full font-syne uppercase tracking-[0.15em] text-xs font-bold text-white border-0 h-12 inline-flex items-center justify-center gap-2 hover:brightness-110"
                    style={{ backgroundColor: "#22C55E", borderRadius: "2px" }}
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    Quero esse plano
                  </Button>
                </article>
              ))}
            </div>

            <p
              className="text-center text-xs mt-10 font-light"
              style={{ color: "#666" }}
            >
              Pagamento via Pix, boleto ou cartão · Sem taxa de adesão · Cancele quando quiser
            </p>
          </div>
        </section>

        {/* WHATSAPP CTA */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container px-4">
            <div
              className="relative overflow-hidden p-10 md:p-16 text-center"
              style={{
                backgroundColor: "#FF6B00",
                borderRadius: "2px",
              }}
            >
              <h2
                className="font-display leading-[0.9] text-black"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                FALE COM A GENTE
              </h2>
              <p
                className="mt-5 font-light max-w-xl mx-auto"
                style={{ color: "rgba(0,0,0,0.7)" }}
              >
                Tire dúvidas, peça uma proposta personalizada ou comece seu anúncio hoje.
                Atendimento humano das 8h às 18h.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4">
                <Button
                  onClick={() => openWhatsApp("personalizado")}
                  className="font-syne uppercase tracking-[0.15em] text-xs font-bold text-white border-0 h-12 px-8 inline-flex items-center gap-2 hover:brightness-110"
                  style={{ backgroundColor: "#080808", borderRadius: "2px" }}
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  Falar no WhatsApp
                </Button>
                <p
                  className="font-syne uppercase text-xs font-bold"
                  style={{ color: "rgba(0,0,0,0.7)", letterSpacing: "0.2em" }}
                >
                  (87) 9XXXX-XXXX
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="py-20 md:py-28" style={{ backgroundColor: "#0f0f0f" }}>
          <div className="container px-4">
            <div className="mb-12 md:mb-16 max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px" style={{ backgroundColor: "#FF6B00" }} />
                <span
                  className="font-syne uppercase text-xs font-semibold"
                  style={{ letterSpacing: "0.25em", color: "#FF6B00" }}
                >
                  Quem anuncia, recomenda
                </span>
              </div>
              <h2
                className="font-display leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                DEPOIMENTOS
              </h2>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{
                gap: "1px",
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {testimonials.map((t) => (
                <article
                  key={t.name}
                  className="flex flex-col p-8 md:p-10 transition-colors hover:bg-[#141414]"
                  style={{ backgroundColor: "#080808" }}
                >
                  <div
                    className="flex items-center gap-1 mb-5"
                    style={{ color: "#FF6B00" }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p
                    className="leading-relaxed mb-8 flex-1 font-light text-foreground"
                    style={{ fontSize: "0.95rem" }}
                  >
                    "{t.quote}"
                  </p>
                  <div
                    className="flex items-center gap-3 pt-5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center font-syne font-bold text-black shrink-0"
                      style={{
                        backgroundColor: "#FF6B00",
                        borderRadius: "2px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-syne font-bold text-sm text-foreground truncate">
                        {t.name}
                      </p>
                      <p
                        className="font-syne uppercase text-[10px] font-semibold mt-0.5 truncate"
                        style={{ color: "#666", letterSpacing: "0.15em" }}
                      >
                        {t.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Anuncie;
