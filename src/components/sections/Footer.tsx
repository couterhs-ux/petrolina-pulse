import { Sun } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-12 pb-24 md:pb-12">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl gradient-sun flex items-center justify-center">
                <Sun className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-black text-lg leading-none">Guia PNZ</p>
                <p className="text-xs opacity-70">Viva Petrolina</p>
              </div>
            </div>
            <p className="text-sm opacity-80 max-w-sm">
              O hub digital de Petrolina. Tudo da cidade num só lugar — serviços, eventos, promoções e muito mais.
            </p>
          </div>

          <div>
            <p className="font-bold mb-3 text-sm">Explore</p>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Serviços</li>
              <li>Eventos</li>
              <li>Promoções</li>
              <li>Empregos</li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-3 text-sm">Para empresas</p>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Anunciar</li>
              <li>Planos</li>
              <li>Destaque pago</li>
              <li>Fale conosco</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-background/10 text-center text-xs opacity-60">
          © 2026 Guia PNZ • Feito com 🧡 no Vale do São Francisco
        </div>
      </div>
    </footer>
  );
};
