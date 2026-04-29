import { useEffect, useState } from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import logoPnz from "@/assets/logo-pnz.png";

const menu = ["Categorias", "Eventos", "Promoções", "Anunciar"];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <div className="container px-4 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0 min-w-0">
          <img
            src={logoPnz}
            alt="Guia PNZ - Viva Petrolina"
            width={56}
            height={56}
            className="w-11 h-11 md:w-14 md:h-14 rounded-2xl object-cover shadow-sun bg-white p-0.5 dark:ring-2 dark:ring-primary/40 shrink-0"
          />
          <div className="hidden sm:block min-w-0">
            <p
              className={`font-display tracking-wide text-2xl md:text-3xl leading-none truncate ${
                scrolled ? "text-foreground" : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              }`}
            >
              Guia PNZ
            </p>
            <p
              className={`text-[11px] md:text-xs leading-tight mt-0.5 truncate ${
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

        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden sm:inline-flex border-0 rounded-md font-black uppercase tracking-wide text-black hover:brightness-110 shadow-sun"
            style={{ backgroundColor: "#FF6B00" }}
          >
            Anunciar 🚀
          </Button>

          {/* Hamburguer mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Abrir menu"
                className={`lg:hidden ${scrolled ? "" : "text-white hover:bg-white/15 hover:text-white"}`}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-0 flex flex-col">
              <SheetHeader className="p-5 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <img
                    src={logoPnz}
                    alt=""
                    className="w-10 h-10 rounded-xl object-cover bg-white p-0.5"
                  />
                  <span className="font-display tracking-wide text-2xl">Guia PNZ</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                {menu.map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3.5 text-base font-semibold rounded-xl text-foreground hover:bg-muted active:bg-muted/80 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="p-4 border-t border-border">
                <Button
                  className="w-full border-0 rounded-md font-black uppercase tracking-wide text-black hover:brightness-110 shadow-sun"
                  style={{ backgroundColor: "#FF6B00" }}
                  onClick={() => setOpen(false)}
                >
                  Anunciar 🚀
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
