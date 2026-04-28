import { Home, Search, Calendar, Flame, Rocket } from "lucide-react";

const items = [
  { icon: Home, label: "Início", active: true },
  { icon: Search, label: "Buscar" },
  { icon: Calendar, label: "Eventos" },
  { icon: Flame, label: "Promos" },
  { icon: Rocket, label: "Anunciar" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border md:hidden">
      <div className="grid grid-cols-5 h-16">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${item.active ? "fill-primary/10" : ""}`} />
              <span className="text-[10px] font-semibold">{item.label}</span>
              {item.active && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
