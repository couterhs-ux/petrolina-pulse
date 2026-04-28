import { Sun, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const menu = ["Início", "Serviços", "Eventos", "Promoções", "Floriculturas", "Faculdades", "Empregos", "Imóveis", "Delivery", "Anunciar"];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-lg border-b border-border">
      <div className="container px-4 h-14 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl gradient-sun flex items-center justify-center shadow-sun">
            <Sun className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <p className="font-black text-base leading-none">Guia PNZ</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Viva Petrolina</p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 justify-center">
          {menu.map((item) => (
            <a
              key={item}
              href="#"
              className="px-3 py-1.5 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-muted rounded-full transition-colors whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button size="sm" className="gradient-sun text-primary-foreground border-0 rounded-full font-bold hidden sm:inline-flex">
            Anunciar 🚀
          </Button>
          <Button size="icon" variant="ghost" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
