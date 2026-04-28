import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Marcos Silva", business: "Burger do Sertão", text: "Em 2 semanas no Guia PNZ dobrei meus pedidos pelo WhatsApp. Tá valendo cada centavo!", avatar: "MS" },
  { name: "Joana Lima", business: "Flores do Vale", text: "Dia das Mães foi o melhor da minha história. O Guia PNZ levou clientes que eu nunca alcançaria.", avatar: "JL" },
  { name: "Pedro Costa", business: "Studio Barba & Cia", text: "Agenda lotada toda semana. Hoje eu não vivo sem o Guia PNZ na minha estratégia.", avatar: "PC" },
];

export const Social = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary mb-2">PROVA SOCIAL</p>
          <h2 className="text-2xl md:text-4xl font-black mb-2">
            Empresas já estão vendendo com o <span className="text-gradient-sun">Guia PNZ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <article key={t.name} className="bg-card rounded-2xl p-6 shadow-card hover:shadow-sun transition-all relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/15" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full gradient-sun flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.business}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
