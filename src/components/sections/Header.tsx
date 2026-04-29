import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const menu = ["Categorias", "Eventos", "Promoções"];

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
          ? "bg-background/70 backdrop-blur-xl border-b border-white/[0.07]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0 min-w-0">
          <span className="font-display text-2xl md:text-3xl tracking-wide text-foreground leading-none">
            GUIA <span style={{ color: "#FF6B00" }}>PNZ</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {menu.map((item) => {
            const href = "#";
            return (
              <a
                key={item}
                href={href}
                className="font-syne text-xs uppercase tracking-[0.2em] font-semibold text-foreground/70 hover:text-foreground transition-colors"
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex border-0 font-syne uppercase tracking-[0.15em] text-xs font-bold text-black hover:brightness-110 px-5 py-5"
            style={{ backgroundColor: "#FF6B00", borderRadius: "2px" }}
          >
            <a href="/anuncie">Anunciar</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Abrir menu"
                className="lg:hidden text-foreground hover:bg-white/5"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-0 flex flex-col bg-background border-l border-white/[0.07]">
              <SheetHeader className="p-5 border-b border-white/[0.07]">
                <SheetTitle className="font-display text-3xl tracking-wide text-left">
                  GUIA <span style={{ color: "#FF6B00" }}>PNZ</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                {menu.map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setOpen(false)}
                    className="px-4 py-4 font-syne uppercase tracking-[0.2em] text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="p-4 border-t border-white/[0.07]">
                <Button
                  asChild
                  className="w-full border-0 font-syne uppercase tracking-[0.15em] text-xs font-bold text-black hover:brightness-110"
                  style={{ backgroundColor: "#FF6B00", borderRadius: "2px" }}
                  onClick={() => setOpen(false)}
                >
                  <a href="/anuncie">Anunciar</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
