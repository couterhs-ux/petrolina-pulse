import { useEffect, useState } from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoPnz from "@/assets/logo-pnz.png";

const menu = ["Categorias", "Eventos", "Promoções", "Anunciar"];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border shadow-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src={logoPnz}
            alt="Guia PNZ - Viva Petrolina"
            width={56}
            height={56}
            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover shadow-sun bg-white p-0.5 dark:ring-2 dark:ring-primary/40"
          />
          <div className="hidden sm:block">
            <p
              className={`font-display tracking-wide text-2xl md:text-3xl leading-none ${
                scrolled ? "text-foreground" : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              }`}
            >
              Guia PNZ
            </p>
            <p
              className={`text-[11px] md:text-xs leading-tight mt-0.5 ${
                scrolled ? "text-muted-foreground" : "text-white/85"
              }`}
            >
              Viva Petrolina
            </p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {menu.map((item) => (
            <a
              key={item}
              href="#"
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                scrolled
                  ? "text-foreground/80 hover:text-primary hover:bg-muted"
                  : "text-white/90 hover:text-white hover:bg-white/15"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className={`lg:hidden ${scrolled ? "" : "text-white hover:bg-white/15 hover:text-white"}`}
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden sm:inline-flex border-0 rounded-md font-black uppercase tracking-wide text-black hover:brightness-110 shadow-sun"
            style={{ backgroundColor: "#FF6B00" }}
          >
            Anunciar 🚀
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={`lg:hidden ${scrolled ? "" : "text-white hover:bg-white/15 hover:text-white"}`}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
