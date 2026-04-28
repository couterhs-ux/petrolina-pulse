import { Rocket, TrendingUp, Users, Zap, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADVERTISER_PHONE = "16981043343";

const openWhatsApp = (plano: string) => {
  const msg = `Olá! Quero anunciar no Guia PNZ no plano ${plano}. Pode me passar mais informações?`;
  const url = `https://wa.me/55${ADVERTISER_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const plans = [
  {
    name: "Semanal",
    price: "R$ 49",
    period: "/semana",
    tag: "Pra testar",
    features: [
      "Anúncio ativo por 7 dias",
      "Aparece na sua categoria",
      "Botão direto de WhatsApp",
      "1 foto do estabelecimento",
    ],
    highlight: false,
    key: "Semanal",
  },
  {
    name: "Mensal",
    price: "R$ 149",
    period: "/mês",
    tag: "Mais escolhido",
    features: [
      "Anúncio ativo por 30 dias",
      "Destaque na home + categoria",
      "Aparece em 'Perto de você'",
      "Até 5 fotos + descrição completa",
      "Suporte prioritário no WhatsApp",
    ],
    highlight: true,
    key: "Mensal",
  },
];

export const CTA = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-vale" />
      <div className="absolute inset-0 pattern-vale opacity-20" />

      <div className="container px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-background/20 backdrop-blur-sm items-center justify-center mb-5 animate-float">
            <Rocket className="h-8 w-8" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Quer mais clientes?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
            Anuncie no <strong>Guia PNZ</strong> e apareça pra cidade inteira 🚀
          </p>

          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10 max-w-xl mx-auto">
            <div className="bg-background/15 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-primary-foreground/20">
              <Users className="h-6 w-6 mx-auto mb-1" />
              <p className="text-xl md:text-2xl font-black">+50k</p>
              <p className="text-[10px] md:text-xs opacity-90">visitas/mês</p>
            </div>
            <div className="bg-background/15 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-primary-foreground/20">
              <TrendingUp className="h-6 w-6 mx-auto mb-1" />
              <p className="text-xl md:text-2xl font-black">+300</p>
              <p className="text-[10px] md:text-xs opacity-90">empresas</p>
            </div>
            <div className="bg-background/15 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-primary-foreground/20">
              <Zap className="h-6 w-6 mx-auto mb-1" />
              <p className="text-xl md:text-2xl font-black">24h</p>
              <p className="text-[10px] md:text-xs opacity-90">pra ativar</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 text-left">
            {plans.map((p) => (
              <div
                key={p.key}
                className={`relative rounded-3xl p-6 md:p-7 border-2 transition-transform hover:-translate-y-1 ${
                  p.highlight
                    ? "bg-card text-foreground border-card shadow-sun"
                    : "bg-background/15 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground"
                }`}
              >
                {p.tag && (
                  <span
                    className={`absolute -top-3 left-6 text-xs font-bold px-3 py-1 rounded-full ${
                      p.highlight ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
                    }`}
                  >
                    {p.tag}
                  </span>
                )}
                <h3 className="text-2xl font-black mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-4xl font-black">{p.price}</span>
                  <span className={`text-sm ${p.highlight ? "text-muted-foreground" : "opacity-80"}`}>
                    {p.period}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`h-4 w-4 mt-0.5 shrink-0 ${
                          p.highlight ? "text-primary" : "text-primary-foreground"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => openWhatsApp(p.key)}
                  className={`w-full rounded-full font-bold gap-2 ${
                    p.highlight
                      ? "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                      : "bg-card text-foreground hover:bg-card/90"
                  }`}
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  Quero esse plano
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              size="lg"
              onClick={() => openWhatsApp("personalizado")}
              className="bg-card text-foreground hover:bg-card/90 font-bold rounded-full text-base shadow-sun gap-2"
            >
              <MessageCircle className="h-5 w-5 fill-current" />
              Falar no WhatsApp
            </Button>
            <span className="text-sm opacity-90">
              ou ligue: <strong>(16) 98104-3343</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
