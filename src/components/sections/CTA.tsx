import { Rocket, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-vale" />
      <div className="absolute inset-0 pattern-vale opacity-20" />

      <div className="container px-4 relative">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-background/20 backdrop-blur-sm items-center justify-center mb-5 animate-float">
            <Rocket className="h-8 w-8" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Quer mais clientes?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
            Anuncie no <strong>Guia PNZ</strong> e apareça pra cidade inteira 🚀
          </p>

          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 max-w-xl mx-auto">
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

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-bold rounded-full text-base shadow-sun">
              Quero anunciar agora
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full font-bold">
              Ver planos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
