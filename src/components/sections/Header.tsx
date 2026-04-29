import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoPnz from "@/assets/logo-pnz.png";

const menu = ["Início", "Restaurantes", "Eventos", "Promoções", "Floriculturas", "Faculdades"];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-lg border-b border-border">
      <div className="container px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logoPnz} alt="Guia PNZ - Viva Petrolina" width={56} height={56} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover shadow-sun" />
          <div className="hidden sm:block">
            <p className="font-black text-lg md:text-xl leading-none">Guia PNZ</p>
            <p className="text-[11px] md:text-xs text-muted-foreground leading-tight mt-0.5">Viva Petrolina</p>
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
