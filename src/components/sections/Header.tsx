import { useEffect, useState } from "react";
import { Menu, Zap, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import logoPnz from "@/assets/logo-pnz.png";

const menu = ["Categorias", "Eventos", "Promoções", "Anunciar"];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toast.success("Você saiu da sua conta.");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg ${
        scrolled
          ? "bg-[#0a0a0a]/90 border-b border-white/10 shadow-soft"
          : "bg-[#0a0a0a]/70 border-b border-white/5"
      }`}
    >
      <div className="container px-4 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
        <a href="/" className="flex items-center gap-2.5 shrink-0 min-w-0">
          <img
            src={logoPnz}
            alt="Guia PNZ - Viva Petrolina"
            width={64}
            height={64}
            className="w-12 h-12 md:w-16 md:h-16 rounded-2xl object-cover shadow-sun bg-white p-0.5 ring-2 ring-[#FF6B00]/40 shrink-0"
          />
          <div className="hidden sm:block min-w-0 leading-none">
            <p className="font-display tracking-[0.08em] text-2xl md:text-3xl font-bold uppercase text-white truncate">
              GUIA PNZ
            </p>
            <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white/55 mt-1">
              Viva Petrolina
            </p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {menu.map((item) => {
            const href = item === "Anunciar" ? "/anuncie" : "#";
            return (
              <a
                key={item}
                href={href}
                className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] rounded-sm transition-colors whitespace-nowrap text-white/70 hover:text-white hover:bg-white/5"
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* AO VIVO indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-green-500/30 bg-green-500/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-green-400">
              Ao vivo
            </span>
          </div>

          {user ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="hidden sm:inline-flex text-white/70 hover:text-white hover:bg-white/5 text-[11px] uppercase tracking-wider"
            >
              <LogOut className="h-3.5 w-3.5" /> Sair
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="hidden sm:inline-flex text-white/70 hover:text-white hover:bg-white/5 text-[11px] uppercase tracking-wider"
            >
              <a href="/auth"><LogIn className="h-3.5 w-3.5" /> Entrar</a>
            </Button>
          )}

          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex border-0 font-black uppercase tracking-[0.12em] text-black hover:brightness-110 shadow-sun text-xs px-4 h-9"
            style={{ backgroundColor: "#FF6B00", borderRadius: "4px" }}
          >
            <a href="/anuncie">
              <Zap className="h-3.5 w-3.5 fill-black" /> Anunciar
            </a>
          </Button>

          {/* Hamburguer mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Abrir menu"
                className="lg:hidden text-white hover:bg-white/10 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-0 flex flex-col bg-[#0a0a0a] border-white/10">
              <SheetHeader className="p-5 border-b border-white/10">
                <SheetTitle className="flex items-center gap-3 text-white">
                  <img
                    src={logoPnz}
                    alt=""
                    className="w-10 h-10 rounded-xl object-cover bg-white p-0.5"
                  />
                  <span className="font-display tracking-[0.08em] text-2xl font-bold uppercase">GUIA PNZ</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                {menu.map((item) => {
                  const href = item === "Anunciar" ? "/anuncie" : "#";
                  return (
                    <a
                      key={item}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3.5 text-xs font-bold uppercase tracking-[0.18em] rounded-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/10 space-y-2">
                {!user && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white text-xs uppercase tracking-wider"
                    onClick={() => setOpen(false)}
                  >
                    <a href="/auth"><LogIn className="h-4 w-4" /> Entrar</a>
                  </Button>
                )}
                <Button
                  asChild
                  className="w-full border-0 font-black uppercase tracking-[0.12em] text-black hover:brightness-110 shadow-sun"
                  style={{ backgroundColor: "#FF6B00", borderRadius: "4px" }}
                  onClick={() => setOpen(false)}
                >
                  <a href="/anuncie"><Zap className="h-4 w-4 fill-black" /> Anunciar</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
