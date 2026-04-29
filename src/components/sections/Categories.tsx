import { Utensils, Scissors, PartyPopper, Flower2, GraduationCap } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

const categories = [
  { icon: Utensils, name: "Restaurantes", color: "from-orange-500 to-red-500" },
  { icon: Scissors, name: "Barbearias", color: "from-amber-500 to-orange-600" },
  { icon: Flower2, name: "Floriculturas", color: "from-rose-400 to-pink-500" },
  { icon: PartyPopper, name: "Eventos", color: "from-pink-500 to-fuchsia-600" },
  { icon: GraduationCap, name: "Faculdades", color: "from-indigo-500 to-violet-600" },
];

export const Categories = () => {
  const { setCategory, setQuery, setNeighborhood, scrollToResults, category } = useSearch();

  const handleClick = (name: string) => {
    setQuery("");
    setNeighborhood("Todos");
    setCategory(category === name ? null : name);
    scrollToResults();
  };

  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">Explore a cidade</h2>
            <p className="text-sm text-muted-foreground">Tudo o que Petrolina oferece, num clique</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = category === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleClick(cat.name)}
                className="group flex flex-col items-center justify-center gap-2 p-3 sm:p-2 rounded-2xl bg-card hover:bg-muted/60 transition-colors min-w-0"
              >
                <div className={`w-14 h-14 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-card group-hover:scale-110 group-active:scale-95 transition-transform shrink-0 ${active ? "ring-4 ring-primary ring-offset-2" : ""}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-xs font-semibold text-center leading-tight truncate max-w-full ${active ? "text-primary" : "text-foreground"}`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
