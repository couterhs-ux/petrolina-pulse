import { Link } from "react-router-dom";
import { ArrowLeft, Check, Crown, Star, Sparkles, TrendingUp, Users, Zap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

const ADVERTISER_PHONE = "87 9XXXX-XXXX";

const plans = [
  {
    name: "Básico",
    price: "97",
    icon: Zap,
    highlight: false,
    description: "Ideal para começar a aparecer no Guia PNZ.",
    features: [
      "Listagem simples na categoria",
      "1 foto de capa do estabelecimento",
      "Contato telefônico visível",
      "Botão direto para WhatsApp",
      "Endereço com link no mapa",
    ],
    cta: "Começar com Básico",
  },
  {
    name: "Destaque",
    price: "197",
    icon: Star,
    highlight: true,
    description: "O mais escolhido — apareça antes da concorrência.",
    features: [
      "Tudo do plano Básico",
      "Posição prioritária na categoria",
      'Selo "Destaque" no card',
      "Galeria com até 6 fotos",
      "Estatísticas de visualizações",
    ],
    cta: "Quero Destaque",
  },
  {
    name: "Premium",
    price: "397",
    icon: Crown,
    highlight: false,
    description: "Máxima exposição — vire referência na cidade.",
    features: [
      "Tudo do plano Destaque",
      "Banner rotativo na home",
      "1 post mensal nas redes do PNZ",
      "Página exclusiva do negócio",
      "Suporte dedicado por WhatsApp",
    ],
    cta: "Assinar Premium",
  },
];

const testimonials = [
  {
    name: "Marcos Andrade",
    role: "Proprietário · Sabor do Sertão Restaurante",
    initials: "MA",
    quote:
      "Desde que entrei no Guia PNZ, meu movimento no almoço dobrou. As pessoas chegam dizendo que viram a gente lá. Vale cada centavo.",
  },
  {
    name: "Juliana Lima",
    role: "Sócia · Studio Bella Beleza",
    initials: "JL",
    quote:
      "Em 30 dias no plano Destaque enchi minha agenda. O atendimento da equipe é rápido, e o investimento volta na primeira semana.",
  },
  {
    name: "Ricardo Souza",
    role: "Diretor · Academia Vale Fitness",
    initials: "RS",
    quote:
      "Já testei várias formas de divulgação aqui em Petrolina. Nenhuma trouxe tantos alunos novos quanto o Premium do Guia PNZ.",
  },
];

const stats = [
  { value: "15.000+", label: "Petrolinenses ativos por mês" },
  { value: "500+", label: "Negócios já anunciam" },
  { value: "4.8★", label: "Avaliação dos anunciantes" },
];

const Anuncie = () => {
  return (
    <div className="min-h-screen bg-[hsl(222_35%_7%)] text-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-vale)" }}
          />
          <div className="absolute inset-0 bg-black/35 dark:bg-black/55" />
          <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, hsl(var(--accent)/0.6), transparent 70%)" }} />
          <div className="pointer-events-none absolute -bottom-24 -right-16 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, hsl(var(--secondary)/0.7), transparent 70%)" }} />

          <div className="relative container px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para o início
            </Link>

            <div className="max-w-3xl mx-auto text-center text-white">
              <Badge className="bg-accent text-accent-foreground border-0 font-bold mb-5 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> Anuncie no Guia PNZ
              </Badge>

              <h1 className="font-display tracking-wide text-5xl sm:text-6xl md:text-7xl mb-5 leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                Seu negócio na frente
                <span className="block text-accent">de toda Petrolina</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl font-light text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                Mais de <span className="font-bold text-accent">15.000 petrolinenses</span> usam o Guia PNZ todo mês para encontrar restaurantes, serviços e eventos. Esteja onde a cidade procura.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
                <Button
                  asChild
                  size="lg"
                  className="border-0 rounded-md font-black uppercase tracking-wide text-black hover:brightness-110 shadow-sun w-full sm:w-auto"
                  style={{ backgroundColor: "#FF6B00" }}
                >
                  <a href="#planos">Ver planos</a>
                </Button>
                <WhatsAppButton
                  phone={ADVERTISER_PHONE}
                  message="Olá! Quero anunciar meu negócio no Guia PNZ 👋"
                  label="Falar no WhatsApp"
                  size="lg"
                  className="rounded-md w-full sm:w-auto"
                />
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mt-12 pt-8 border-t border-white/20">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display tracking-wide text-3xl md:text-5xl text-accent leading-none">
                      {s.value}
                    </p>
                    <p className="text-[11px] sm:text-xs text-white/85 mt-2 font-semibold leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Planos */}
        <section id="planos" className="py-16 md:py-24 bg-background">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-primary/10 text-primary border-0 font-bold mb-3 uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5 mr-1" /> Escolha seu plano
              </Badge>
              <h2 className="font-display tracking-wide text-4xl md:text-6xl leading-tight mb-4">
                Planos pensados para <span className="text-primary">crescer junto com você</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Sem fidelidade. Cancele quando quiser. Comece hoje e veja o resultado já no primeiro mês.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <article
                    key={plan.name}
                    className={`relative flex flex-col rounded-3xl p-7 md:p-8 transition-all ${
                      plan.highlight
                        ? "bg-card border-2 border-primary shadow-sun md:-translate-y-4"
                        : "bg-card border border-border shadow-card hover:shadow-soft"
                    }`}
                  >
                    {plan.highlight && (
                      <Badge
                        className="absolute -top-3 left-1/2 -translate-x-1/2 border-0 font-black uppercase tracking-wider text-black px-4 py-1"
                        style={{ backgroundColor: "#FF6B00" }}
                      >
                        ⭐ Mais escolhido
                      </Badge>
                    )}

                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          plan.highlight ? "gradient-sun shadow-sun" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 ${
                            plan.highlight ? "text-primary-foreground" : "text-primary"
                          }`}
                        />
                      </div>
                      <h3 className="font-display tracking-wide text-3xl">{plan.name}</h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 min-h-[2.5rem]">
                      {plan.description}
                    </p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-2xl font-bold text-foreground">R$</span>
                      <span className="font-display tracking-wide text-6xl md:text-7xl text-primary leading-none">
                        {plan.price}
                      </span>
                      <span className="text-base text-muted-foreground font-semibold">/mês</span>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <span
                            className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                              plan.highlight ? "gradient-sun" : "bg-primary/10"
                            }`}
                          >
                            <Check
                              className={`h-3 w-3 ${
                                plan.highlight ? "text-primary-foreground" : "text-primary"
                              }`}
                              strokeWidth={3}
                            />
                          </span>
                          <span className="text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <WhatsAppButton
                      phone={ADVERTISER_PHONE}
                      message={`Olá! Tenho interesse no plano ${plan.name} (R$ ${plan.price}/mês) do Guia PNZ.`}
                      label={plan.cta}
                      size="lg"
                      className={`w-full rounded-md font-bold ${
                        plan.highlight
                          ? "text-black hover:brightness-110 border-0 shadow-sun"
                          : ""
                      }`}
                      style={plan.highlight ? { backgroundColor: "#FF6B00" } : undefined}
                    />
                  </article>
                );
              })}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-10">
              💳 Pagamento via Pix, boleto ou cartão · 🔒 Sem taxa de adesão · ❌ Cancele quando quiser
            </p>
          </div>
        </section>

        {/* CTA WhatsApp */}
        <section className="py-14 md:py-20">
          <div className="container px-4">
            <div
              className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-center text-white"
              style={{ background: "var(--gradient-sun)" }}
            >
              <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-12 w-72 h-72 rounded-full bg-black/10 blur-3xl" />

              <div className="relative max-w-2xl mx-auto">
                <Badge className="bg-white/20 backdrop-blur text-white border-0 font-bold mb-4 uppercase tracking-wider">
                  <Users className="h-3.5 w-3.5 mr-1" /> Atendimento humano
                </Badge>
                <h2 className="font-display tracking-wide text-4xl md:text-6xl leading-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
                  Quer tirar dúvidas antes de assinar?
                </h2>
                <p className="text-base md:text-lg text-white/95 mb-7 max-w-xl mx-auto">
                  Fale agora com nossa equipe pelo WhatsApp. Resposta em poucos minutos, segunda a sábado.
                </p>

                <div className="flex flex-col items-center gap-3">
                  <WhatsAppButton
                    phone={ADVERTISER_PHONE}
                    message="Olá! Quero saber mais sobre como anunciar no Guia PNZ."
                    label={`Falar com a equipe · (55) ${ADVERTISER_PHONE}`}
                    size="lg"
                    className="rounded-md text-base font-bold px-6 py-6"
                  />
                  <p className="text-xs text-white/85 font-semibold">
                    📞 (55) {ADVERTISER_PHONE} · Atendimento das 8h às 18h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 md:py-24 bg-muted/60 dark:bg-card border-y border-border">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-secondary/15 text-secondary border-0 font-bold mb-3 uppercase tracking-wider">
                <Star className="h-3.5 w-3.5 mr-1 fill-current" /> Quem anuncia, recomenda
              </Badge>
              <h2 className="font-display tracking-wide text-4xl md:text-6xl leading-tight mb-4">
                Donos de negócio que <span className="text-primary">venderam mais</span> com o PNZ
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((t) => (
                <article
                  key={t.name}
                  className="bg-card rounded-3xl p-7 border border-border shadow-card hover:shadow-sun transition-shadow flex flex-col"
                >
                  <div className="flex items-center gap-1 mb-4 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground/90 leading-relaxed mb-6 flex-1">
                    “{t.quote}”
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-11 h-11 rounded-full gradient-sun flex items-center justify-center text-primary-foreground font-black shadow-sun shrink-0">
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">{t.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{t.role}</p>
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
